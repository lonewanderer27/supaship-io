import { RealtimeChannel, Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

import { supaClient } from "@/supa-client";
import { useNavigate } from "react-router-dom";

export interface UserProfile {
  username: string;
  avatarUrl?: string;
}

export interface SupashipUserInfo {
  session: Session | null;
  profile: UserProfile | null;
}

export const setReturnPath = () => {
  localStorage.setItem("returnPath", window.location.pathname);
}

/**
 * Custom hook that manages the user session and profile information.
 * @returns {SupashipUserInfo} The user session and profile information.
 */
export function useSession(): SupashipUserInfo {
  const [userInfo, setUserInfo] = useState<SupashipUserInfo>({
    session: null,
    profile: null,
  });
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supaClient.auth.getSession().then(({ data: { session } }) => {
      setUserInfo({ ...userInfo, session: session });
      supaClient.auth.onAuthStateChange((_event, session) => {
        setUserInfo({ session, profile: null });
      })
    });
  }, [])

  useEffect(() => {
    if (userInfo.session?.user && !userInfo.profile) {
      // have a user but have no profile yet
      listenToUserProfileChanges(userInfo.session.user.id).then(
        (newChannel) => {
          if (channel) {
            channel.unsubscribe();
          }
          setChannel(newChannel);
        }
      )
    } else if (!userInfo.session?.user) {
      // user logged out
      channel?.unsubscribe();
      setChannel(null);
    }
  }, [userInfo.session])

  async function listenToUserProfileChanges(userId: string) {
    // fetch the user profile
    const { data } = await supaClient
      .from("user_profiles")
      .select("*")
      .filter("user_id", "eq", userId)
      .single();

    // set the user profile
    if (data) {
      setUserInfo({ ...userInfo, profile: data });
    } else {
      navigate("/welcome");
    }

    // listen to changes
    return supaClient
      .channel("public:user_profiles")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "user_profiles",
          filter: `user_id = eq.${userId}`,
        },
        (payload) => {
          setUserInfo({ ...userInfo, profile: payload.new as UserProfile });
        }
      )
      .subscribe();
  }

  return userInfo;
} 
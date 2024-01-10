import { UserContext } from './Layout';
import { supaClient } from '@/supa-client';
import { useContext } from 'react'

export default function UserMenu() {
  const { profile } = useContext(UserContext);

  return (
    <>
      <div className='flex flex-col'>
        <h2>Welcome {profile?.username || "yo"}.</h2>
        <button onClick={() => supaClient.auth.signOut()} className='user-menu-logout-button'>
          Logout
        </button>
      </div>
    </>
  )
}

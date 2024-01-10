import { SupashipUserInfo, useSession } from '@/hooks/use-session'

import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import { createContext } from 'react'

export default function Layout() {
  const supashipUserInfo = useSession();
  return (
    <>
      <UserContext.Provider value={supashipUserInfo}>
        <Navbar />
        <Outlet />
      </UserContext.Provider>
    </>
  )
}

export const UserContext = createContext<SupashipUserInfo>({
  session: null,
  profile: null
})
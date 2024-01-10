import { Link, Outlet } from 'react-router-dom'
import React, { useContext } from 'react'

import Login from './Login';
import { UserContext } from './Layout';

export default function MessageBoard() {
  const userProfile = useContext(UserContext);
  return (
    <div className='message-board-center'>
      <Link to='/1'>
        <h2 className='message-board-header-link'>
          Message Board
        </h2>
      </Link>
      {userProfile.session ? <></> : (
        <h2 className='message-board-login-message' data-e2e='message-board-login'>
          Awe man, you gotta <Login /> to join in the discussion!
        </h2>
      )}
      <Outlet />
    </div>
  )
}

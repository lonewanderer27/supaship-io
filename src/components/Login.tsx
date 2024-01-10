import React, { useContext, useEffect, useState } from 'react'

import { Auth } from '@supabase/auth-ui-react';
import Dialog from './Dialog';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { UserContext } from './Layout';
import { setReturnPath } from '@/hooks/use-session';
import { supaClient } from '@/supa-client';

export enum AuthMode {
  SignIn = 'sign_in',
  SignUp = 'sign_up',
}

export default function Login() {
  const [showModal, setShowModal] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>(AuthMode.SignIn);
  const { session } = useContext(UserContext);

  useEffect(() => {
    if (session?.user) {
      setShowModal(false);
    }
  }, [session])

  return (
    <>
      <div className='flex m-4 place-items-center'>
        <button
          className='login-button'
          onClick={() => {
            setAuthMode(AuthMode.SignIn);
            setShowModal(true);
          }}
        >
          login
        </button>{" "}
        <span className='p-2'>
          or
        </span>{" "}
        <button
          className='login-button'
          onClick={() => {
            setAuthMode(AuthMode.SignUp);
            setShowModal(true);
            setReturnPath();
          }}
        >
          sign up
        </button>
      </div>
      <Dialog
        open={showModal}
        dialogStateChange={(open) => setShowModal(open)}
        contents={
          <>
            <Auth
              supabaseClient={supaClient}
              appearance={{
                theme: ThemeSupa,
                className: {
                  container: 'login-form-container',
                  label: 'login-form-label',
                  button: 'login-form-button',
                  input: 'login-form-input',
                }
              }}
              view={authMode}
            />
            <button onClick={() => setShowModal(false)}>
              Close
            </button>
          </>
        }
      />
    </>
  )
}

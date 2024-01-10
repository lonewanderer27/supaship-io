import * as yup from 'yup';

import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { redirect, useNavigate } from 'react-router-dom';

import Dialog from '@/components/Dialog';
import { UserContext } from '@/components/Layout'
import { supaClient } from '@/supa-client';
import { useContext } from 'react'
import { yupResolver } from '@hookform/resolvers/yup';

export async function welcomeLoader() {
  const { data: { user } } = await supaClient.auth.getUser();
  if (!user) {
    return redirect("/");
  }
  const { data } = await supaClient
    .from("user_profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (data?.username) {
    return redirect("/");
  }
}

const schema = yup.object({
  username: yup.string().required()
    .min(4, "Username must be at least 4 characters long")
    .max(14, "Username must be less than 15 characters long")
    .matches(/^[a-zA-Z0-9_]*$/, "Username can only contain letters, numbers, and underscores")
})

export default function Welcome() {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isDirty }, setError, clearErrors } = useForm({
    defaultValues: {
      username: ''
    },
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<{ username: string }> = async (data) => {
    // clear username error
    clearErrors("username");

    const updatedUserProfile = await supaClient.from('user_profiles').insert([
      {
        user_id: user.session?.user.id || "",
        username: data.username
      }
    ]).select('*').single();

    if (updatedUserProfile.error) {
      console.error(updatedUserProfile.error);
      setError('username', {
        type: 'custom',
        message: 'Username already taken'
      })
      return;
    }

    const target = localStorage.getItem('returnPath') || '/';
    localStorage.removeItem('returnPath');
    navigate(target);
  }
  const onError: SubmitErrorHandler<{ username: string }> = (errors) => {
    console.error(errors);
  }

  return (
    <Dialog
      allowClose={false}
      open={true}
      contents={
        <>
          <h2 className='welcome-header'>Welcome to Supaship!!</h2>
          <p className='text-center'>
            Let's get started by creating a username:
          </p>
          <form className='welcome-name-form' onSubmit={handleSubmit(onSubmit, onError)}>
            <input
              placeholder='username'
              {...register('username')}
              className='welcome-name-input'
            />
            {isDirty && errors.username && (
              <p className='welcome-form-error-message validation-feedback'>
                {errors.username.message}
              </p>
            )}
            <p className='text-center'>
              This is the name people will see as on Message Board
            </p>
            <button type='submit'>Submit</button>
          </form>
        </>
      }
    />
  )
}

'use client'
import React from 'react'
import { useSelector } from 'react-redux'
import UserDetails from './userDetails';
import { UserAuth } from '@/context/AuthContext';
import { Button } from '@material-tailwind/react';

export default function Page() {
  const { googleSignIn } = UserAuth()
  const user = useSelector(state => state.user.userInfo)
  const handleSignIn = async () => {
    try {
      await googleSignIn()
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className='pt-[120px] container mx-auto px-[5%] lg:px-0'>
      {user ?
        <UserDetails user={user} />
        :
        <div className='w-full flex flex-col justify-center items-center mt-[50px]'>
          <p className='font-[600] text-[28px]'>Login to view Profile</p>
          <Button onClick={handleSignIn} className='mt-[30px] bg-[green]'>Login with Google</Button>
        </div>
      }
    </div>
  )
}

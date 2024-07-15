'use client'
import { UserAuth } from '@/context/AuthContext'
import { Button } from '@material-tailwind/react'
import Image from 'next/image'
import React from 'react'

export default function UserDetails({ user }) {
  const { logOut } = UserAuth()
  const handleSignOut = async () => {
    try {
      await logOut()
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className=''>
      <Image src={user?.photoURL} alt='profile' height={400} width={400} className='h-[140px] w-[140px] rounded-full' />
      <div className='flex gap-3 mt-[40px]'>
        <p>User Name:</p>
        <p>{user?.displayName}</p>
      </div>
      <div className='flex gap-3'>
        <p>Email:</p>
        <p>{user?.email}</p>
      </div>
      <Button className="bg-custom-red mt-[20px]" role="menuitem" onClick={handleSignOut}>
        Logout
      </Button>
    </div>
  )
}

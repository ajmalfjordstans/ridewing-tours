'use client'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import UserDetails from './userDetails';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter()
  const user = useSelector(state => state.user.userInfo)
  useEffect(() => {
    if (!user) router.push('/login')
  }, [user])
  return (
    <div className='pt-[120px] container mx-auto px-[5%] lg:px-0 pb-[150px]'>
      <UserDetails user={user} />
    </div>
  )
}
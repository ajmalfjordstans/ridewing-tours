'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { UserAuth } from '@/context/AuthContext'
import { Button } from '@material-tailwind/react'
import AdminHome from './admin-home'
import LoginForm from '@/components/forms/login-form'

export default function Page() {
  const [currentPage, setCurrentPage] = useState('banner')
  const [showMenu, setShowMenu] = useState('pages')
  const user = useSelector(state => state.user.userInfo)
  const router = useRouter()
  const { googleSignIn, setLoginType } = UserAuth()
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const mobile = /mobile/i.test(userAgent);
    setIsMobile(mobile);
  }, []);
  const handleSignIn = async () => {
    try {
      await googleSignIn()
      // router.push(`/profile?country=${country}`)
    } catch (err) {
      console.log(err);
    }
  }

  // If !admin route to profile
  useEffect(() => {
    if (user && user?.userRole !== 'admin') { router.push('/profile') }
  }, [user, router])

  // Scroll to 0,0 on loading
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (isMobile) {
    return (
      <div className='fixed top-0 left-0 h-[100vh] w-[100vw] bg-[red] flex justify-center items-center z-10'>
        <p className='text-[28px] md:text-[38px] text-white font-bold'>RIDEWING</p>
        <p>Continue with desktop</p>
      </div>
    )
  }
  else if (user?.userRole === 'admin') {
    return (
      <AdminHome />
    )
  }
  else if (user?.userRole === 'user' || user?.userRole === 'agent') {
    router.push('/')
  }
  else {
    return (
      <div className='fixed top-0 left-0 h-[100vh] w-[100vw] bg-[red] flex justify-center items-center z-10 flex-col'>
        <p className='text-[28px] md:text-[38px] text-white font-bold'>RIDEWING</p>
        <div className='w-[300px] mx-auto'>
          <LoginForm />
        </div>
        <Button className="bg-white text-custom-red w-[300px] mt-[40px] capitalize" role="menuitem" onClick={handleSignIn} >
          Continue with google
        </Button>
      </div>
    )
  }
}

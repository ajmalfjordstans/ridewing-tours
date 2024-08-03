'use client'
import React, { useEffect } from 'react'
import Cart from './cart'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { Button } from '@material-tailwind/react'
import { setLogin } from '@/components/store/userSlice'
import Image from 'next/image'

export default function Page() {
  const router = useRouter()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    if (!user.isLoggedIn) {
      router.back();
    }
  }, [user, router]);

  const loginButtonHandler = () => {
    dispatch(setLogin(true))
  }
  return (
    <>
      <div className='pt-[100px]'>
        <Image src={"/images/background/profile-banner.jpg"} alt='profile' height={800} width={1400} className='h-[260px] w-screen object-cover bg-bottom' />
        <div className='container mx-auto px-[5%] lg:px-0 translate-y-[-70px] flex gap-10'>
          <div className='flex gap-3 '>
            <Image src={user.userInfo?.photoURL} alt='profile' height={800} width={800} className='h-[250px] w-[250px] rounded-full border-[10px] border-white' />
          </div>
          <div className='flex gap-3 mt-[100px] text-[38px] font-[700] '>
            <p>{user.userInfo?.displayName}</p>
          </div>
        </div>
      </div>
      <div className='mt-[10px]'>
        <Cart />
      </div>
      {!user.isLoggedIn &&
        <div className='absolute h-[100vh] w-[100vw] top-0 left-0 z-10 flex justify-center items-center'>
          <div className='shadow-md w-[400px] bg-white p-[20px] rounded-[5px] text-center flex flex-col items-center justify-center gap-4'>
            <p>Log in to continue</p>
            <Button onClick={loginButtonHandler}>Click to login</Button>
          </div>
        </div>
      }
    </>
  )
}

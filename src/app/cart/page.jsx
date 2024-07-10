'use client'
import React from 'react'
import Cart from './cart'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { Button } from '@material-tailwind/react'
import { setLogin } from '@/components/store/userSlice'

export default function Page() {
  const router = useRouter()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.isLoggedIn)
  if (!user) {
    // router.push('/profile')
  }
  const loginButtonHandler = () => {
    dispatch(setLogin(true))
  }
  return (
    <>
      <div className='pt-[100px] container mx-auto px-[5%] lg:px-0 mt-[30px]'>
        <Cart />
      </div>
      {!user &&
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

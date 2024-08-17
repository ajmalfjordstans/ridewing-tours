'use client'
import React, { useEffect } from 'react'
import Cart from './cart'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { Button } from '@material-tailwind/react'
import { setLogin } from '@/components/store/userSlice'
import Image from 'next/image'
import Link from 'next/link'

export default function Page() {
  const router = useRouter()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    // if (!user.isLoggedIn) {
    //   router.back();
    // }
    // console.log(user);
  }, [user, router]);

  const loginButtonHandler = () => {
    // dispatch(setLogin(true))
  }
  return (
    <>
      <div className='pt-[100px]'>
        <Image src={"/images/background/profile-banner.jpg"} alt='profile' height={800} width={1400} className='h-[260px] w-screen object-cover bg-bottom' />
        {!user.isLoggedIn ?
          <div className='fixed h-[100vh] w-[100vw] top-[100px] left-0 z-10 flex justify-center  bg-black bg-opacity-50'>
            <div className='shadow-md w-[400px] h-[200px] mt-[20vh] bg-white p-[20px] rounded-[5px] text-center flex flex-col items-center justify-center gap-4'>
              <p className='font-[600]'>Log in to continue to cart</p>
              <div className='flex flex-col gap-4'>
                <Link href={{ pathname: '/login/user', query: { country: user.selectedCountry } }}>
                  <Button className='bg-custom-red capitalize font-[500]'>Sign In as User</Button>
                </Link>
                <Link href={{ pathname: '/login/agent', query: { country: user.selectedCountry } }}>
                  <Button className='bg-custom-red capitalize font-[500]'>Sign In as Travel Agent</Button>
                </Link>
              </div>
            </div>
          </div>
          :
          <div className='container mx-auto px-[5%] lg:px-0 translate-y-[-70px] flex gap-10'>
            <div className='flex gap-3 '>
              <Image src={user.userInfo?.photoURL} alt='profile' height={800} width={800} className='h-[250px] w-[250px] rounded-full border-[10px] border-white' />
            </div>
            <div className='flex gap-3 mt-[100px] text-[38px] font-[700] '>
              <p>{user.userInfo?.displayName}</p>
            </div>
          </div>
        }
      </div>
      <div className='mt-[10px]'>
        <Cart />
      </div>

    </>
  )
}

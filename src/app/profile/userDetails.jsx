'use client'
import { UserAuth } from '@/context/AuthContext'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Loading from '../loading'
import { setUser } from '@/components/store/userSlice'
import { useDispatch } from 'react-redux'
import Profile from '@/components/profile/profile'
import Bookings from '@/components/profile/bookings'

export default function UserDetails({ user }) {
  const { logOut } = UserAuth()
  const router = useRouter()
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState("profile")
  const [loading, setLoading] = useState(false)

  const handleSignOut = async () => {
    try {
      await logOut()
      setLoading(true)
      router.push("/")
      location.reload(true);
      dispatch(setUser(null))
      setTimeout(() => {
        setLoading(false)
      }, 3000)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {loading ? <Loading />
        :
        <div className=''>
          <Image src={"/images/background/profile-banner.jpg"} alt='profile' height={800} width={1400} className='h-[300px] w-screen object-cover ' />
          <div className='container mx-auto px-[5%] pb-[30px] lg:px-0 translate-y-[-20px] md:translate-y-[-70px] flex flex-col md:flex-row gap-2 md:gap-10'>
            <div className='flex gap-3 '>
              {user?.photoURL ?
                <Image src={user?.photoURL} alt='profile' height={800} width={800} className='h-[100px] md:h-[250px] w-[100px] md:w-[250px] rounded-full border-[10px] border-white' />
                :
                <div className='h-[100px] md:h-[250px] w-[100px] md:w-[250px] rounded-full border-[10px] border-white bg-[green] flex justify-center items-center text-[36px] md:text-[90px] font-[600] text-white'>{user?.displayName[0]}</div>
              }
            </div>
            <div className='flex gap-3 md:mt-[100px] text-[20px] md:text-[38px] font-[600] md:font-[700] '>
              <p>{user?.displayName}</p>
            </div>
          </div>
          <div className='h-[77px] w-screen bg-custom-red py-[25px] translate-y-[-30px]'>
            <div className='container mx-auto px-[5%] lg:px-0 flex gap-10 text-[22px] font-[600] text-white'>
              <p className={`hover:cursor-pointer ${currentPage == 'profile' ? "text-secondary" : ""}`}
                onClick={() => setCurrentPage('profile')}
              >My Profile</p>
              <p className={`hover:cursor-pointer ${currentPage == 'bookings' ? "text-secondary" : ""}`}
                onClick={() => setCurrentPage('bookings')}
              >Bookings</p>
            </div>
          </div>
          {currentPage == "profile" &&
            <Profile user={user} handleSignOut={handleSignOut} />
          }
          {currentPage == "bookings" &&
            <div className='container mx-auto px-[5%] lg:px-0'>
              <Bookings booking={user.booking} />
            </div>
          }
        </div>
      }
    </>
  )
}

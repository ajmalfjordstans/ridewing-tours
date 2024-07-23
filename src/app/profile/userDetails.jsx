'use client'
import { UserAuth } from '@/context/AuthContext'
import { Button } from '@material-tailwind/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Loading from '../loading'
import { setUser } from '@/components/store/userSlice'
import { useDispatch } from 'react-redux'

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
      dispatch(setUser(null))
      setTimeout(() => {
        router.push("/")
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
          <Image src={"/images/background/profile-banner1.jpg"} alt='profile' height={800} width={1400} className='h-[300px] w-screen object-cover ' />
          <div className='container mx-auto px-[5%] lg:px-0 translate-y-[-70px] flex gap-10'>
            <div className='flex gap-3 '>
              <Image src={user?.photoURL} alt='profile' height={800} width={800} className='h-[250px] w-[250px] rounded-full border-[10px] border-white' />
            </div>
            <div className='flex gap-3 mt-[100px] text-[38px] font-[700] '>
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
              {/* <p className={`hover:cursor-pointer ${currentPage == 'saved' ? "text-secondary" : ""}`}
            onClick={() => setCurrentPage('saved')}
          >Saved</p> */}
            </div>
          </div>
          {currentPage == "profile" &&
            <div className='container mx-auto px-[5%] lg:px-0'>
              <div className='flex gap-3'>
                <p>Email:</p>
                <p>{user?.email}</p>
              </div>
              <div className='flex gap-3'>
                <p>User Id:</p>
                <p>{user?.uid}</p>
              </div>
              <div className='flex gap-3'>
                <p>User Role:</p>
                <p>{user?.userRole}</p>
              </div>
              <Button className="bg-custom-red my-[20px]" role="menuitem" onClick={handleSignOut}>
                Logout
              </Button>
            </div>
          }
          {currentPage == "bookings" &&
            <div className='container mx-auto px-[5%] lg:px-0'>
              <p>No Bookings</p>
            </div>
          }
        </div>
      }
    </>
  )
}

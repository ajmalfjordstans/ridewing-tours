'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Home from './home'
import { Button } from '@material-tailwind/react'
import { UserAuth } from '@/context/AuthContext'

function AdminMenu({ currentPage, setCurrentPage, showMenu, setShowMenu }) {
  const [showHome, setShowHome] = useState(true)
  return (
    <div className='bg-black h-screen text-white p-[20px] w-[300px] pb-[300px] flex flex-col sticky top-[100px]'>
      <div className='flex items-center gap-2 hover:cursor-pointer' onClick={() => setShowMenu("pages")}>
        <div className='flex items-center gap-2'>
          <Image src={'/icons/pages.svg'} height={100} width={100} alt='pages' className='size-4' />
          <p>Pages</p>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="#FFF" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
          {showMenu === 'pages' ?
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            :
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
          }
        </svg>
      </div>
      {showMenu === 'pages' &&
        <div className='pl-[10px] pt-[10px] transition-all duration-300'>
          <div className='flex items-center gap-2 hover:cursor-pointer' onClick={() => setShowHome(!showHome)}>
            <p>Home</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="#FFF" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
              {showHome ?
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                :
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
              }
            </svg>
          </div>
          {showHome &&
            <div className='pl-[10px] pt-[10px] transition-all duration-300 flex flex-col gap-1'>
              <div className={`flex gap-2 hover:cursor-pointer items-center ${currentPage === 'banner' ? "text-secondary" : ""}`} onClick={() => setCurrentPage('banner')}>
                <Image src={'/icons/banner.svg'} height={100} width={100} alt='pages' className='size-4' />
                <p>Banner</p>
              </div>
              <div className={`flex gap-2 hover:cursor-pointer items-center ${currentPage === 'place' ? "text-secondary" : ""}`} onClick={() => setCurrentPage('place')}>
                <Image src={'/icons/place.svg'} height={100} width={100} alt='pages' className='size-4' />
                <p>Place</p>
              </div>
              <div className={`flex gap-2 hover:cursor-pointer items-center ${currentPage === 'attractions' ? "text-secondary" : ""}`} onClick={() => setCurrentPage('attractions')}>
                <Image src={'/icons/attractions.svg'} height={100} width={100} alt='pages' className='size-4' />
                <p>Popular Attractions</p>
              </div>
              <div className={`flex gap-2 hover:cursor-pointer items-center ${currentPage === 'airports' ? "text-secondary" : ""}`} onClick={() => setCurrentPage('airports')}>
                <Image src={'/icons/destinations.svg'} height={100} width={100} alt='pages' className='size-4' />
                <p>Airports</p>
              </div>
              <div className={`flex gap-2 hover:cursor-pointer items-center ${currentPage === 'stations' ? "text-secondary" : ""}`} onClick={() => setCurrentPage('stations')}>
                <Image src={'/icons/destinations.svg'} height={100} width={100} alt='pages' className='size-4' />
                <p>Stations</p>
              </div>
              <div className={`flex gap-2 hover:cursor-pointer items-center ${currentPage === 'guides' ? "text-secondary" : ""}`} onClick={() => setCurrentPage('guides')}>
                <Image src={'/icons/guide.svg'} height={100} width={100} alt='pages' className='size-4' />
                <p>Guides</p>
              </div>
              <div className={`flex gap-2 hover:cursor-pointer items-center ${currentPage === 'blogs' ? "text-secondary" : ""}`} onClick={() => setCurrentPage('blogs')}>
                <Image src={'/icons/blogs.svg'} height={100} width={100} alt='pages' className='size-4' />
                <p>Blogs</p>
              </div>
            </div>
          }
        </div>
      }
      <div className='flex items-center gap-2 hover:cursor-pointer mt-[20px]' onClick={() => setShowMenu("users")}>
        <div className='flex items-center gap-2'>
          <Image src={'/icons/pages.svg'} height={100} width={100} alt='pages' className='size-4' />
          <p>Users</p>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="#FFF" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
          {showMenu === 'users' ?
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            :
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
          }
        </svg>
      </div>
    </div>
  )
}


export default function Page() {
  const [currentPage, setCurrentPage] = useState('banner')
  const [showMenu, setShowMenu] = useState('pages')
  const user = useSelector(state => state.user.userInfo)
  const router = useRouter()
  const { googleSignIn, setLoginType } = UserAuth()
  const pages = {
    pages: <Home currentPage={currentPage} />,
  };
  const handleSignIn = async () => {
    try {
      await googleSignIn()
      // router.push(`/profile?country=${country}`)
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    // console.log(user);
    // Turn back on after development
    // if (user?.userRole !== 'admin') { router.push('/profile') } 
  }, [user])
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentPage])
  if (user?.userRole === 'admin') {
    return (
      <div className='pb-[150px] mt-[100px] flex h-full'>
        <div className='w-[340px] '>
          <AdminMenu currentPage={currentPage} setCurrentPage={setCurrentPage} showMenu={showMenu} setShowMenu={setShowMenu} />
        </div>
        <div className='w-full'>{pages[showMenu]}</div>
      </div>
    )
  } else if (user?.userRole === 'user' || user?.userRole === 'agent') {
    router.push('/')
  }
  else {
    return (
      <div className='fixed top-0 left-0 h-[100vh] w-[100vw] bg-[red] flex justify-center items-center z-10 flex-col'>
        <p className='text-[28px] md:text-[38px] text-white font-bold'>RIDEWING</p>
        <Button className="bg-white text-custom-red w-[300px] mt-[40px] capitalize" role="menuitem" onClick={handleSignIn} >
          Login
        </Button>
      </div>
    )
  }
  // else {
  //   router.push('/')
  // }
}


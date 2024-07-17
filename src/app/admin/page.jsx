'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Banner from './banner'
import Attractions from './attractions'
import Blogs from './blogs'
import Destinations from './destinations'
import Place from './place'

function AdminMenu({ currentPage, setCurrentPage }) {
  const [showPages, setShowPages] = useState(true)
  const [showHome, setShowHome] = useState(true)

  return (
    <div className='bg-black h-screen text-white p-[20px] w-[300px] pb-[300px] flex flex-col'>
      <div className='flex items-center gap-2 hover:cursor-pointer' onClick={() => setShowPages(!showPages)}>
        <div className='flex items-center gap-2'>
          <Image src={'/icons/pages.svg'} height={100} width={100} alt='pages' className='size-4' />
          <p>Pages</p>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="#FFF" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
          {showPages ?
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            :
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
          }
        </svg>
      </div>
      {showPages &&
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
              <div className={`flex gap-2 hover:cursor-pointer items-center ${currentPage === 'popular' ? "text-secondary" : ""}`} onClick={() => setCurrentPage('popular')}>
                <Image src={'/icons/attractions.svg'} height={100} width={100} alt='pages' className='size-4' />
                <p>Popular Attractions</p>
              </div>
              <div className={`flex gap-2 hover:cursor-pointer items-center ${currentPage === 'destinations' ? "text-secondary" : ""}`} onClick={() => setCurrentPage('destinations')}>
                <Image src={'/icons/destinations.svg'} height={100} width={100} alt='pages' className='size-4' />
                <p>Destinations</p>
              </div>
              <div className={`flex gap-2 hover:cursor-pointer items-center ${currentPage === 'blogs' ? "text-secondary" : ""}`} onClick={() => setCurrentPage('blogs')}>
                <Image src={'/icons/blogs.svg'} height={100} width={100} alt='pages' className='size-4' />
                <p>Blogs & Articles</p>
              </div>
            </div>
          }
        </div>
      }
    </div>
  )
}

const pages = {
  attractions: <Attractions />,
  banner: <Banner />,
  blogs: <Blogs />,
  destinations: <Destinations />,
  place: <Place />
};

export default function Page() {
  const [currentPage, setCurrentPage] = useState('banner')
  const user = useSelector(state => state.user.userInfo)
  const router = useRouter()
  useEffect(() => {
    console.log(user);
    if (user?.userRole !== 'admin') { router.push('/profile') }
  }, [user])
  if (user?.userRole === 'admin')
    return (
      <div className='pb-[150px] mt-[100px] flex h-full'>
        <AdminMenu currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <p>{pages[currentPage]}</p>
      </div>
    )
}


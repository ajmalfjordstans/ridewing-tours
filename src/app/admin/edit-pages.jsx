'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button } from '@material-tailwind/react'
import { UserAuth } from '@/context/AuthContext'

// Edit pages components
import Banner from '@/components/admin/edit-page/banner';
import Blogs from '@/components/admin/edit-page/blogs';
import Place from '@/components/admin/edit-page/place';
import Destinations from '@/components/admin/edit-page/destinations';
import Attractions from '@/components/admin/edit-page/attractions';
import Airports from '@/components/admin/edit-page/airports';
import Stations from '@/components/admin/edit-page/stations';
import Guides from '@/components/admin/edit-page/guides';
import CountriesHandle from './countries-handle'

// Choose component to show
function Home({ currentPage }) {
  const pages = {
    attractions: <Attractions />,
    banner: <Banner />,
    blogs: <Blogs />,
    destinations: <Destinations />,
    place: <Place />,
    airports: <Airports />,
    stations: <Stations />,
    guides: <Guides />,
  };
  return (
    <div>
      <div>{pages[currentPage]}</div>
    </div>
  )
}

// Admin Menu
function AdminMenu({ currentPage, setCurrentPage, showMenu, setShowMenu, setShowSection }) {
  const [showHome, setShowHome] = useState(true)
  return (
    <div className='bg-black h-screen text-white p-[20px] w-[300px] pb-[300px] flex flex-col sticky top-[100px]'>
      <div
        onClick={() => setShowSection('home')}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:cursor-pointer">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
        </svg>

      </div>
      <div className='flex items-center gap-2 hover:cursor-pointer mt-[20px]' onClick={() => setShowMenu("pages")}>
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
      <div className='flex items-center gap-2 hover:cursor-pointer mt-[20px]' onClick={() => setShowMenu("countries")}>
        <div className='flex items-center gap-2'>
          <Image src={'/icons/pages.svg'} height={100} width={100} alt='pages' className='size-4' />
          <p>Countries</p>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="#FFF" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
          {showMenu === 'countries' ?
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            :
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
          }
        </svg>
      </div>
    </div>
  )
}

// Default 
export default function EditPage({ setShowSection }) {
  const [currentPage, setCurrentPage] = useState('banner')
  const [showMenu, setShowMenu] = useState('pages')
  const user = useSelector(state => state.user.userInfo)
  const pages = {
    pages: <Home currentPage={currentPage} />,
    countries: <CountriesHandle currentPage={currentPage} />,
  };

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentPage])

  return (
    <div className='pb-[150px] mt-[100px] flex h-full'>
      <div className='w-[340px] '>
        <AdminMenu currentPage={currentPage} setCurrentPage={setCurrentPage} showMenu={showMenu} setShowMenu={setShowMenu} setShowSection={setShowSection} />
      </div>
      <div className='w-full'>{pages[showMenu]}</div>
    </div>
  )


}


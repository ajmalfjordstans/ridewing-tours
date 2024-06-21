'use client'
import { Button } from '@material-tailwind/react'
import Link from 'next/link'
import React, { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };
  return (
    <div className='fixed top-0 w-full bg-[red] lg:h-[100px] text-white flex items-center z-10'>
      <div className='container mx-auto px-[5%] lg:px-0 flex justify-between py-[15px] items-center'>
        <Link href={'/'} >
          <div className='flex items-center md:gap-3'>
            {/* <Image src={'/logo/logo.png'} height={300} width={500} alt='logo' className='h-[40px] lg:h-[70px] w-auto' /> */}
            <p className='font-semibold text-[28px] uppercase'>Ridewing</p>
          </div>
        </Link>
        <div className="hidden lg:block font-semibold text-[16px]">
          <div className='flex gap-10 items-center'>
            <Link href={'/'} >
              <p className=''>HOME</p>
            </Link>
            <Link href={'/categories'} >
              <p className=''>CATEGORIES</p>
            </Link>
            <div
              className="relative inline-block text-left"
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
              onClick={() => setIsOpen(true)}
            >
              <div className='flex gap-1 items-center'>
                <p className='hover:cursor-pointer' id='download'>HELP
                </p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </div>
              {isOpen && (
                <div className='pt-2'>
                  <div className="origin-top-right absolute right-[-8px] w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      <Link href={'/contact'}>
                        <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                          CONTACT
                        </p>
                      </Link>
                      <Link href={'/faq'}>
                        <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                          FAQ
                        </p>
                      </Link>
                      <Link href={'/about'}>
                        <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                          ABOUT US
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <Button
              className='bg-[#FFCC00] px-3 py-2 text-white rounded-[10px] flex justify-center items-center gap-2 w-[120px] h-[50px] font-[800]'
            >
              CONTACT
            </Button>
          </div>
        </div>
        <div className='block lg:hidden text-black'>
          <div className='absolute top-7 right-4 z-[200]'>
            {showMenu ?
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer"
                onClick={handleMenuToggle}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
              :
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer"
                onClick={handleMenuToggle}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>

            }
          </div>
          <div className={`fixed top-0 right-0 h-full w-64 pt-12 px-6 bg-primary-light-1 shadow-lg transition-transform duration-300 ease-in-out transform bg-white ${showMenu ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className='flex flex-col gap-6 font-[500] text-[12px] lg:text-[16px]'>
              <Link href={'/'} onClick={handleMenuToggle}>
                <p className=''>HOME</p>
              </Link>
              <Link href={'/categories'} onClick={handleMenuToggle}>
                <p className=''>CATEGORIES</p>
              </Link>
              <Link href={'/contact'} onClick={handleMenuToggle}>
                <p className="" role="menuitem">
                  CONTACT
                </p>
              </Link>
              <Link href={'/faq'} onClick={handleMenuToggle}>
                <p className="" role="menuitem">
                  FAQ
                </p>
              </Link>
              <Link href={'/about'} onClick={handleMenuToggle}>
                <p className="" role="menuitem">
                  ABOUT US
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div >
    </div>
  )
}

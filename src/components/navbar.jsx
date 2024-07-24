'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCountry, setUrl, setUser } from './store/userSlice';
import { useRouter, useSearchParams } from 'next/navigation';
import { UserAuth } from '@/context/AuthContext';
import { Button } from '@material-tailwind/react';
import Image from 'next/image';
import { db } from '@/app/firebase';
import { collection } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Loading from '@/app/loading';

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [urlParams, setUrlParams] = useState({});
  const [countryNav, setCountryNav] = useState('Japan');
  const [isOpen, setIsOpen] = useState(false);
  // Set available countries
  const query = collection(db, "countries")
  const [docs, loading, error] = useCollectionData(query)
  const [countries, setCountries] = useState(null)

  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCountry = useSelector(state => state.user.selectedCountry);
  const cartCount = useSelector(state => state.cart.items.length);
  const { user, googleSignIn, logOut } = UserAuth()

  const handleSignIn = async () => {
    try {
      await googleSignIn()
    } catch (err) {
      console.log(err);
    }
  }
  const handleSignOut = async () => {
    try {
      await logOut()
      // setLoading(true)
      dispatch(setUser(null))
      setTimeout(() => {
        router.push("/")
        // setLoading(false)
      }, 3000)
    } catch (err) {
      console.log(err);
    }
  }

  const handleCountryChange = (event) => {
    const newCountry = event.target.value;
    setCountryNav(newCountry)
    setUrlParams(newCountry)
    dispatch(setCountry(newCountry));
    const newUrl = `?country=${newCountry}`;
    dispatch(setUrl(newUrl));
    router.push(newUrl, undefined, { shallow: true });
  };

  useEffect(() => {
    const country = searchParams.get("country")
    if (country === null || '') {
      setUrlParams("Japan")
      dispatch(setCountry("Japan"));
      const newUrl = `?country=Japan`;
      dispatch(setUrl(newUrl));
      router.push(newUrl, undefined, { shallow: true });
    }
    else {
      // handleData()
      setUrlParams(country)
      const newUrl = `?country=${country}`;
      dispatch(setCountry(country));
      dispatch(setUrl(newUrl));
      router.push(newUrl, undefined, { shallow: true });
    }
    console.log("Working", urlParams);
  }, []);

  useEffect(() => {
    setCountries(docs);
  }, [docs])

  // useEffect(() => {
  //   const params = {};
  //   searchParams.forEach((value, key) => {
  //     params[key] = value;
  //   });
  //   setUrlParams(params);
  // }, [searchParams]);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };
  return (
    <>
      {loading && countries != null ? <Loading /> :
        <div className='fixed top-0 w-full bg-[red] lg:h-[100px] text-white flex items-center z-10'>
          <div className='container mx-auto px-[5%] lg:px-0 flex justify-between py-[15px] items-center'>
            <Link href={{ pathname: '/', query: { "country": urlParams } }} >
              <div className='flex items-center md:gap-3'>
                {/* <Image src={'/logo/logo.png'} height={300} width={500} alt='logo' className='h-[40px] lg:h-[70px] w-auto' /> */}
                <p className='font-semibold text-[28px] uppercase'>Ridewing</p>
              </div>
            </Link>
            <div className="hidden lg:block font-semibold text-[16px] relative">
              <div className='flex gap-10 items-center'>
                <Link href={{ pathname: '/', query: { "country": urlParams } }} >
                  <p className='uppercase'>HOME</p>
                </Link>
                <Link href={{ pathname: '/categories', query: { "country": urlParams } }} >
                  <p className='uppercase'>categories</p>
                </Link>
                <Link href={{ pathname: '/contact', query: { "country": urlParams } }} >
                  <p className='uppercase'>CONTACT</p>
                </Link>
                <select className='text-custom-red rounded-[5px] font-[400] px-[10px] outline-none' value={selectedCountry} onChange={handleCountryChange}>
                  {countries && countries.map((country, id) => {
                    return (
                      <option key={id} value={country.name} className='p-[4px]'>{country.name}</option>
                    )
                  })}
                  {/* <option value="Japan" className='p-[4px]'>Japan</option>
                  <option value="UK" className='p-[4px]'>UK</option> */}
                </select>
                {!user ?
                  <Link href={{ pathname: '/login', query: { country: urlParams } }}>
                    <Button
                      className='bg-white text-custom-red py-[7px] px-[12px]'
                    // onClick={handleSignIn}
                    >Login</Button>
                  </Link>
                  : (<>
                    {user?.uid == 'mM4TGPln9aO8D3b2uk7j745yV8n2' || user?.uid == 'TvX2p5F8mvYc0quBAxVbaicM83t1' ?
                      <Link href={{ pathname: '/admin', query: { country: urlParams } }} className='relative'>
                        <p className='uppercase'>Admin</p>
                      </Link>
                      :
                      ""
                    }
                    <Link href={{ pathname: '/cart', query: { country: urlParams } }} className='relative'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                      </svg>
                      {cartCount !== 0 &&
                        <div className='bg-white text-custom-red flex justify-center items-center rounded-full absolute top-[-10px] right-[-10px] h-[20px] w-[20px]'>{cartCount}</div>
                      }
                    </Link>
                    <Link href={{ pathname: '/profile', query: { country: urlParams } }} className='relative'
                      onMouseEnter={() => setIsOpen(true)}
                      onMouseLeave={() => {
                        setTimeout(() => {
                          setIsOpen(false)
                        }, 2000)
                      }}
                    >
                      {user.photoURL ? <Image src={user.photoURL} alt='profile' height={40} width={40} className='size-7 rounded-full' /> :
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>}
                    </Link>
                    {isOpen && (
                      <div className="origin-top-right mt-2 absolute top-[30px] w-46 right-0 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                          <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" role="menuitem" onClick={handleSignOut}>
                            Logout
                          </p>
                        </div>
                      </div>
                    )}
                  </>)}
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
                  <Link href={{ pathname: '/', query: { "country": urlParams } }} onClick={handleMenuToggle}>
                    <p className=''>HOME</p>
                  </Link>
                  <Link href={{ pathname: '/categories', query: { "country": urlParams } }} onClick={handleMenuToggle}>
                    <p className=''>CATEGORIES</p>
                  </Link>
                  <Link href={{ pathname: '/contact', query: { "country": urlParams } }} onClick={handleMenuToggle}>
                    <p className="" role="menuitem">
                      CONTACT
                    </p>
                  </Link>
                  <Link href={{ pathname: '/cart', query: { "country": urlParams } }} onClick={handleMenuToggle}>
                    <p className="" role="menuitem">
                      CART
                    </p>
                  </Link>
                  <Link href={{ pathname: '/profile', query: { "country": urlParams } }} onClick={handleMenuToggle}>
                    <p className="" role="menuitem">
                      PROFILE
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div >
        </div>
      }
    </>
  )
}

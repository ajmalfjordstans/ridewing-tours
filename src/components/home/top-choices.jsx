'use client'
import React, { useEffect, useRef, useState } from 'react'
import TopChoicesCard from '../cards/top-choices-card'
import { Button } from '@material-tailwind/react'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import { readFirebaseCollection } from '@/app/firebase'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function TopChoices() {
  const swiperRef = useRef(null);
  const selectedCountry = useSelector(state => state.user.selectedCountry)
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true)

  const breakpoints = {
    320: { slidesPerView: 1, spaceBetween: 15, },
    530: { slidesPerView: 2, spaceBetween: 15, },
    780: { slidesPerView: 2, spaceBetween: 15, },
    960: { slidesPerView: 4, spaceBetween: 15, },
    // 1440: { slidesPerView: 4.1, spaceBetween: 15, },
  }

  const handleNextClick = () => {
    if (swiperRef.current !== null) {
      swiperRef.current.slideNext();
    }
  };
  const handlePrevClick = () => {
    if (swiperRef.current !== null) {
      swiperRef.current.slidePrev();
    }
  };

  const getData = async () => {
    try {
      const response = await (readFirebaseCollection(`countries/${selectedCountry}/top-choices`))
      setData(response);
      setLoading(false)
    } catch (error) {
      console.log("Error reading collection");
      setLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [selectedCountry]);

  return (
    <>
      {!loading && data !== null && data.length > 0 &&
        <section className='pt-[60px] container mx-auto flex flex-col items-center px-[5%] lg:px-0'>
          <div className='max-w-[738px] w-full flex flex-col items-center'>
            <p className='font-bold text-[32px] leading-[42px]'>Top Choices for You</p>
            <div className='h-[1px] w-full bg-[#00000080] flex justify-center mt-[20px]'>
              <div className='h-[3px] w-[180px] bg-[#E4322C] translate-y-[-1.5px]'></div>
            </div>
          </div>
          <div className='hidden lg:block'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[10px] md:gap-[30px] w-full mt-[48px]'>
              {data?.slice(0, 8).map((data, id) => {
                // console.log(data)
                return (
                  <Link href={{ pathname: '/tour', query: { "destination": data.url, "country": selectedCountry } }} key={id}>
                    <TopChoicesCard data={data} />
                  </Link>
                )
              })}
            </div>
            {data?.length > 4 &&
              <Link href={{ pathname: '/packages', query: { "country": selectedCountry } }} >
                <Button
                  className='h-[48px] w-[180px] border-[red] border-[2px] rounded-[10px] bg-transparent text-[red] mt-[40px]'
                >SEE MORE</Button>
              </Link>
            }
          </div>
          <div className='mx-auto container lg:hidden'>
            <div className='h-full flex justify-end items-center mt-[37px]'>
              <button onClick={handlePrevClick} className="h-[32px] w-[32px] md:h-[48px] md:w-[48px] bg-white rounded-full flex justify-center items-center transform translate-x-[-11px] md:translate-x-[-24px] border-[#EAEAEA] border-[2px] z-[2]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button onClick={handleNextClick} className="h-[32px] w-[32px] md:h-[48px] md:w-[48px] bg-white rounded-full flex justify-center items-center transform translate-x-[-5%] md:translate-x-[24px] border-[#EAEAEA] border-[2px] z-[2]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
            <div className='flex relative '>
              <Swiper
                // spaceBetween={1}
                slidesPerView={4}
                breakpoints={breakpoints}
                // onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                className='w-full'
              >
                <div className='px-[20px]'>
                  {data?.slice(0, 8).map((data, id) => {
                    return (
                      <SwiperSlide key={id} className='pt-[30px] px-[10px]'>
                        <Link href={{ pathname: '/tour', query: { "destination": data.url, "country": selectedCountry } }} key={id}>
                          <TopChoicesCard data={data} />
                        </Link>
                      </SwiperSlide>
                    )
                  })}
                  <SwiperSlide key={"viewmore"} className='py-[30px] px-[10px]'>
                    <Link href={{ pathname: '/packages', query: { "country": selectedCountry } }} >
                      <div className='h-full w-full flex justify-center items-center'>
                        <div className='px-[15px] py-[8px] rounded-full bg-secondary flex gap-2 text-white font-semibold'>
                          <p>View More</p>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                </div>
              </Swiper>
              {/* <div className='absolute w-full h-full flex justify-between items-center'>
                <button onClick={handlePrevClick} className="h-[32px] w-[32px] md:h-[48px] md:w-[48px] bg-white rounded-full flex justify-center items-center transform translate-x-[-11px] md:translate-x-[-24px] border-[#EAEAEA] border-[2px] z-[2]">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                  </svg>
                </button>
                <button onClick={handleNextClick} className="h-[32px] w-[32px] md:h-[48px] md:w-[48px] bg-white rounded-full flex justify-center items-center transform translate-x-[-5%] md:translate-x-[24px] border-[#EAEAEA] border-[2px] z-[2]">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div> */}
            </div>
          </div>

        </section>
      }</>
  )
}

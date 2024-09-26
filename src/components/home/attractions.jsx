'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import AttractionsCard from '../cards/attractions-card'
import { Button } from '@material-tailwind/react'
import { readFirebaseCollection } from '@/app/firebase';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion'
import { Autoplay, Pagination } from 'swiper/modules';

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

export default function Attractions() {
  const [showMore, setShowMore] = useState(false)
  const [data, setData] = useState(null);
  const [showDetails, setShowDetails] = useState(null);
  const currentCountry = useSelector(state => state.user.selectedCountry)
  const [loading, setLoading] = useState(true)
  const swiperRef = useRef(null);

  // SwiperCore.use([Autoplay]);

  const breakpoints = {
    320: { slidesPerView: 1, spaceBetween: 15, },
    530: { slidesPerView: 2, spaceBetween: 15, },
    780: { slidesPerView: 2, spaceBetween: 15, },
    960: { slidesPerView: 3, spaceBetween: 15, },
    1440: { slidesPerView: 4, spaceBetween: 15, },
  }

  const handleNextClick = () => {
    if (swiperRef.current !== null) {
      swiperRef.current.slideNext();
    }
  }
  const handlePrevClick = () => {
    if (swiperRef.current !== null) {
      swiperRef.current.slidePrev();
    }
  }
  const getData = async () => {
    try {
      const response = await (readFirebaseCollection(`countries/${currentCountry}/attractions`))
      setData(response);
      setLoading(false)
    } catch (error) {
      console.log("Error reading collection");
      setLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [currentCountry])
  return (
    <>
      {!loading && data !== null && data.length > 0 &&
        <section className='py-[50px] container mx-auto px-[5%] lg:px-0'>
          <div className=' w-full flex flex-col '>
            <p className='font-bold text-[32px] leading-[42px]'>Discover Popular Attractions</p>
            <div className='h-[1px] w-full bg-[#00000080] mt-[20px]'>
              <div className='h-[3px] w-[320px] bg-[#E4322C] translate-y-[-1.5px]'></div>
            </div>
          </div>
          {/* <div className='grid grid-cols-2 lg:grid-cols-4 gap-[10px] md:gap-[30px] w-full mt-[48px]'> */}
          <div className='mt-[37px] flex relative'>
            <Swiper
              spaceBetween={50}
              slidesPerView={4}
              breakpoints={breakpoints}
              // onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              className='!w-full'
              autoplay={{
                delay: 2000,
                pauseOnMouseEnter: true,
                disableOnInteraction: false
              }}
              loop
              modules={[Autoplay]}
            >
              {data?.map((data, id) => {
                return (
                  <SwiperSlide key={id}>
                    <div key={id} className='hover:cursor-pointer' onClick={() => setShowDetails(data)}>
                      <AttractionsCard data={data} />
                    </div>
                  </SwiperSlide>
                )
              })}
            </Swiper>
            <div className='absolute w-full h-full flex justify-between items-center'>
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
          </div>
          {/* {data?.length > 4 &&
          <div className='w-full flex justify-center'>
            <Button
              onClick={() => setShowMore(!showMore)}
              className='h-[48px] w-[180px] border-[red] border-[2px] rounded-[10px] bg-transparent text-[red] mt-[40px]'
            >SEE {showMore ? "LESS" : "MORE"}</Button>
          </div>
        } */}
        </section>
      }
      <AnimatePresence mode='wait'>
        {showDetails &&
          <div className='fixed h-full w-full top-0 left-0 backdrop-blur-md z-10 flex justify-center items-center shadow-lg '>
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4">
              <motion.div
                className="bg-white rounded-lg shadow-lg max-w-[1267px] w-full max-h-[80vh] p-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{
                  type: 'tween',
                  stiffness: 200,
                  damping: 20,
                  ease: 'easeInOut'
                }}
              >
                <div className='flex w-full justify-end'>
                  <motion.div
                    className='bg-custom-red p-[5px] cursor-pointer h-[40px] w-[40px] text-white font-[400] flex justify-center items-center rounded-[10px] text-[25px]'
                    onClick={() => setShowDetails(null)}
                    whiletap={{ scale: .9 }}
                  >
                    X
                  </motion.div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                  <Image src={showDetails.image ? showDetails.image : "/images/background/image-template.jpg"} alt="Popup Image" className="w-full h-auto rounded-lg mb-4" height={700} width={700} />
                  <div >
                    <h2 className="text-2xl font-bold mb-2">{showDetails.title}</h2>
                    <p className="text-gray-700 mb-4">{showDetails.description}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        }
      </AnimatePresence>
    </>
  )
}

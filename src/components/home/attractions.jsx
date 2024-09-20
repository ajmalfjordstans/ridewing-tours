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

const AttractionsData = [
  // Switzerland
  {
    title: 'Jungfraujoch',
    country: 'Switzerland',
    image: '/images/temp/carousel/jungfrau.jpg',
    description: 'Known as the "Top of Europe," Jungfraujoch offers stunning views of the Aletsch Glacier and surrounding peaks with year-round snow activities.'
  },
  {
    title: 'Mount Titlis Cable Car',
    country: 'Switzerland',
    image: '/images/temp/carousel/mount.jpg',
    description: 'The Mount Titlis Cable Car takes visitors on a scenic ride to the summit, offering panoramic views and featuring the world’s first revolving cable car.'
  },
  {
    title: 'Shinkansen Bullet Train',
    country: 'Japan',
    image: '/images/temp/carousel/shinkansen.jpeg',
    description: 'Japan’s high-speed bullet train offers a fast and efficient way to travel between major cities, providing comfort and scenic views along the route.'
  },
  {
    title: 'Swiss Travel Pass',
    country: 'Switzerland',
    image: '/images/temp/carousel/swiss_travel.jpeg',
    description: 'This all-in-one ticket provides unlimited travel on Switzerland’s public transportation network and offers free or discounted admission to many attractions.'
  },
  // United Kingdom
  {
    title: 'Hop On Hop Off Bus',
    country: 'United Kingdom, Switzerland, Japan, South Korea',
    image: 'https://images.unsplash.com/photo-1556704498-49037b3a4403?q=80&w=2011&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'This service allows visitors to hop on and off at various stops throughout the city, providing flexibility to explore London, Zurich/Geneva, Tokyo, and Seoul at their own pace.'
  },
  {
    title: 'London Eye',
    country: 'United Kingdom',
    image: '/images/temp/carousel/london_eye.jpeg',
    description: 'This iconic Ferris wheel on the South Bank of the River Thames offers breathtaking views of the city’s skyline.'
  },
  {
    title: 'Tower Bridge',
    country: 'United Kingdom',
    image: '/images/temp/carousel/tower_bridge.jpeg',
    description: 'A symbol of London, this combined bascule and suspension bridge spans the River Thames and features the Tower Bridge Exhibition.'
  },
  // Japan
  {
    title: 'Mount Fuji',
    country: 'Japan',
    image: '/images/temp/carousel/fuji.jpeg',
    description: 'Japan’s highest peak and a UNESCO World Heritage site, Mount Fuji is popular for climbing and offers stunning views.'
  },
  {
    title: 'Tea Ceremony',
    country: 'Japan',
    image: '/images/temp/carousel/tea_ceremony.jpeg',
    description: 'A traditional Japanese tea ceremony, or "chanoyu," is a cultural experience that emphasizes harmony, respect, purity, and tranquility.'
  },
  {
    title: 'Hakone Ropeway',
    country: 'Japan',
    image: '/images/temp/carousel/hakone.jpeg',
    description: 'This aerial lift in Hakone provides scenic views of Mount Fuji and the volcanic Owakudani Valley, part of the Hakone Round Course.'
  },
  {
    title: 'Lake Ashi Pirate Cruise',
    country: 'Japan',
    image: '/images/temp/carousel/pirate_cruise.jpeg',
    description: 'Enjoy a scenic cruise on Lake Ashi aboard a pirate-themed ship, offering beautiful views of Mount Fuji and the surrounding nature.'
  },
  {
    title: 'TeamLab Borderless',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1669794911682-4fded20a9cab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'An immersive digital art museum in Tokyo, where art installations change based on viewer interaction, creating a unique experience every visit.'
  },
  {
    title: 'Tokyo Sky Tree',
    country: 'Japan',
    image: '/images/temp/carousel/sky_tree.jpg',
    description: 'A broadcasting and observation tower in Tokyo, offering panoramic views of the city from its observation decks.'
  },
  // South Korea
  {
    title: 'Nami Island',
    country: 'South Korea',
    image: '/images/temp/carousel/nami_island.jpeg',
    description: 'A picturesque half-moon-shaped island known for its beautiful tree-lined roads, cultural events, and stunning autumn foliage.'
  },
  {
    title: 'Petite France',
    country: 'South Korea',
    image: '/images/temp/carousel/petite_france.jpeg',
    description: 'A French-themed village in Gapyeong, featuring colorful buildings, museums, galleries, and performances with European charm.'
  },
  {
    title: 'DMZ (Demilitarized Zone)',
    country: 'South Korea',
    image: '/images/temp/carousel/dmz.jpeg',
    description: 'A buffer zone between North and South Korea, offering guided tours to learn about the Korean conflict and see the Joint Security Area.'
  },
  {
    title: 'Seoul Tower',
    country: 'South Korea',
    image: 'https://images.unsplash.com/photo-1541694764078-df09dec4f9c8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Also known as Namsan Seoul Tower, this iconic structure provides panoramic views of Seoul from observation decks, restaurants, and cafes.'
  }
];

export default function Attractions() {
  const [showMore, setShowMore] = useState(false)
  const [data, setData] = useState(null);
  const [showDetails, setShowDetails] = useState(null);
  const currentCountry = useSelector(state => state.user.selectedCountry)
  const [loading, setLoading] = useState(true)
  const swiperRef = useRef(null);

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

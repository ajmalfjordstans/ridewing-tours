'use client'
import { readFirebaseCollection } from '@/app/firebase';
import AttractionsCard from '@/components/cards/attractions-card';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

export default function Page() {
  const [showDetails, setShowDetails] = useState(null);
  const [data, setData] = useState(null);
  const currentCountry = useSelector(state => state.user.selectedCountry)
  const [loading, setLoading] = useState(true)

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
      <div className='container mx-auto px-[5%] lg:px-0 mt-[80px] md:mt-[180px] pb-[150px]'>
        <div className=' w-full flex flex-col '>
          <p className='font-bold text-[26px] md:text-[32px] leading-[42px]'>Popular Attractions in Japan</p>
          <div className='h-[1px] w-full bg-[#00000080] mt-[20px]'>
            <div className='h-[3px] w-[320px] bg-[#E4322C] translate-y-[-1.5px]'></div>
          </div>
        </div>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-[10px] md:gap-[30px] w-full mt-[48px]'>
          {data?.map((data, id) => {
            return (
              <div key={id} className='hover:cursor-pointer' onClick={() => setShowDetails(data)}>
                <AttractionsCard data={data} />
              </div>
            )
          })}
        </div>
      </div>

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

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { doc } from 'firebase/firestore';
import { db } from '@/app/firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import Loading from '@/app/loading';
import { AnimatePresence, motion } from 'framer-motion';
import NextImage from 'next/image';

export default function Hero() {
  const dispatch = useDispatch()
  const selectedCountry = useSelector((state) => state.user.selectedCountry);
  const [queryPath, setQueryPath] = useState(`countries/${selectedCountry}/landing/hero`);
  const [query, setQuery] = useState(doc(db, queryPath));
  const [docs, loading, error] = useDocumentData(query);
  const [data, setData] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  useEffect(() => {
    const newPath = `countries/${selectedCountry}/landing/hero`;
    setQueryPath(newPath);
    setQuery(doc(db, newPath)); // Update the document reference when the path changes
  }, [selectedCountry]);

  useEffect(() => {
    if (!loading) {
      setData(docs);
    }
  }, [loading, docs]);

  // Preload image
  useEffect(() => {
    if (data?.background) {
      const img = new window.Image(); // Use native Image constructor
      img.src = data.background;
      img.onload = () => setImageLoaded(true);
    }
  }, [data?.background]);

  useEffect(() => {
    if (showAbout) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showAbout])
  return (
    <>
      {loading ? <Loading />
        :
        <motion.section
          className='pt-[100px] h-[80vh] w-full relative'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
         <div className='h-full'>
            <motion.div
              className='h-full flex items-center text-white'
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: 'spring', stiffness: 100 }}
            >
              <motion.div
                // className='flex flex-col h-full max-w-[800px] gap-[24px] bg-custom-red bg-opacity-70 p-[20px] lg:p-[50px] relative'
                className='flex flex-col h-full max-w-[800px] gap-[24px] bg-gradient-to-r from-custom-red to-transparent  p-[20px] lg:p-[50px] relative'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
              >
                <p className='font-bold text-[36px] lg:text-[75px] leading-[42px] lg:leading-[86px]'>
                  {data?.heading}
                </p>
                <p className='text-[16px] md:text-[18px] leading-[24px] md:leading-[34px] text-white'>
                  {data?.tagline}
                </p>
                <motion.div
                  className='w-[225px] h-[55px] bg-secondary rounded-[15px] absolute bottom-[-25px] flex items-center p-2 justify-center cursor-pointer'
                  onClick={() => setShowAbout(true)}
                  whileHover={{ scale: 1.1 }}
                >
                  <NextImage src={'/logo/i.svg'} height={28} width={28} alt='i' />
                  <p className='ml-2 text-[20px] text-custom-red'>About {selectedCountry}</p>
                </motion.div>
              </motion.div>
            </motion.div>
            {imageLoaded && (
              <motion.div
                className='absolute top-0 right-0 h-full w-full z-[-1] bg-cover'
                style={{ backgroundImage: `url(${data?.background})` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              ></motion.div>
            )}
          </div>
        </motion.section>
      }
      <AnimatePresence>
        {showAbout && (
          <motion.div className='fixed top-0 left-0 h-[100vh] w-[100vw] bg-black bg-opacity-50 z-10 flex justify-center items-center p-[5%]'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: .4 }}
          >
            <motion.div
              className='w-full h-[90vh] bg-white rounded-[15px] overflow-y-scroll'
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
              <div className='h-[77px] bg-secondary w-full flex items-center justify-between px-[20px] text-[40px] '>
                <p className='pl-[50px]'>About {selectedCountry}</p>
                <motion.div
                  className='bg-custom-red p-[5px] cursor-pointer h-[40px] w-[40px] text-white font-[400] flex justify-center items-center rounded-[10px] text-[25px]'
                  onClick={() => setShowAbout(false)}
                  whiletap={{ scale: .9 }}
                >
                  X
                </motion.div>
              </div>
              <div className='px-[70px] py-[25px]'>
                <div className='h-[167px] overflow-y-scroll px-[20px]'>
                  <p>{data?.description}</p>
                </div>
                <div className='flex'>
                  <div className='w-[70%]'>
                    <div className='w-full bg-secondary h-[50px] items-center flex px-[20px] text-[20px] rounded-[3px]'>
                      Local Weather
                    </div>
                    <div className='flex flex-col items-center mt-3'>
                      <div className='flex gap-2'>
                        {/* <Swiper
                          spaceBetween={20}
                          slidesPerView={4}
                          navigation
                          pagination={{ clickable: true }}
                          scrollbar={{ draggable: true }}
                        > */}
                        {data?.weather?.map((weather, id) => {
                          return (
                            // <SwiperSlide key={id}>
                            <div
                              style={{ boxShadow: '0px 4px 11.2px 0px #00000040' }}
                              className='rounded-[10px] p-[15px] h-[96px] w-[184px] flex items-center'
                              key={id}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="none"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fill="#000"
                                  d="M10 6.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5zM10 5a5 5 0 110 10 5 5 0 010-10zm0 15a.624.624 0 00.625-.625v-2.5a.624.624 0 10-1.25 0v2.5A.625.625 0 0010 20zm0-16.25a.625.625 0 00.625-.625v-2.5a.625.625 0 10-1.25 0v2.5A.625.625 0 0010 3.75zM20 10a.625.625 0 00-.625-.625h-2.5a.625.625 0 100 1.25h2.5A.624.624 0 0020 10zM3.75 10a.625.625 0 00-.625-.625h-2.5a.625.625 0 000 1.25h2.5A.625.625 0 003.75 10zm13.321 7.071a.625.625 0 000-.884l-1.767-1.768a.627.627 0 00-1.02.203.626.626 0 00.136.682l1.768 1.767a.625.625 0 00.883 0zM5.58 5.58a.625.625 0 000-.884L3.812 2.93a.625.625 0 00-.883.884L4.696 5.58a.625.625 0 00.884 0zm11.491-2.651a.625.625 0 00-.884 0L14.42 4.696a.625.625 0 00.884.884l1.767-1.768a.625.625 0 000-.883zM5.58 14.419a.625.625 0 00-.884 0L2.93 16.187a.625.625 0 10.884.884l1.767-1.767a.626.626 0 000-.885z"
                                ></path>
                              </svg>
                              <div className='pl-3'>
                                <p>{weather?.from} to {weather?.to}</p>
                                <p>{weather?.lowTemp} - {weather?.highTemp}°{weather?.degree === "Celsius" ? "C" : "F"}</p>
                              </div>
                            </div>
                            // {/* </SwiperSlide> */}
                          )
                        })}
                        {/* </Swiper> */}
                      </div>
                      <p className='mt-3'>How it feels now {data?.howItFeels}</p>
                    </div>
                    <div>
                      <p className='text-[24px]'>Don&apos;t Miss These Activities</p>
                      <ul className='list-disc pl-4 text-[16px] mt-[10px]'>
                        {data?.neverMiss?.map((things, id) => {
                          return (
                            <li key={id}>{things}</li>
                          )
                        })}
                      </ul>
                    </div>
                  </div>
                  <div className='flex flex-col justify-evenly items-center w-[30%] gap-3'>
                    <div className='flex flex-col justify-center items-center rounded-[10px] bg-secondary h-[116px] w-[181px]'>
                      <p>Timezone</p>
                      <p>{data?.timezone}</p>
                    </div>
                    <div className='flex flex-col justify-center items-center rounded-[10px] bg-secondary h-[116px] w-[181px]'>
                      <p>Currency</p>
                      <p>{data?.currency}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence >
    </>
  );
}

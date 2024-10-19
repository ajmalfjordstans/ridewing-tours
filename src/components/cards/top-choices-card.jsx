'use client'
import Image from 'next/image'
import Link from 'next/link';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

export default function TopChoicesCard({ data }) {
  const [loading, setLoading] = useState(true)

  // Handle image load event
  const handleImageLoad = () => {
    setLoading(false);
  };
  return (
    <div className='w-full h-full max-h-[603px] rounded-[10px] overflow-hidden font-semibold shadow-xl capitalize'
    >
      <div className='h-[305px] flex items-end relative'
      // style={{
      //   backgroundImage: `url(${data.gallery[0]})`, backgroundSize: 'cover', backgroundPosition: 'center'
      // }}
      >
        {loading &&
          <div className="bg-gray-200 absolute top-0 z-0 h-full w-full animate-pulse"></div>
        }
        <Image src={data?.gallery[0]} height={700} width={500} alt='top'
          className={`absolute top-0 h-full w-full object-cover z-0 `} //${loading ? "hidden" : ""}
          onLoadingComplete={handleImageLoad}
        />

        {data?.offers?.offerTitle &&
          <p className='absolute top-0 text-white text-right h-[40px] p-[10px] bg-[#FF0000]'>{data?.offers?.offerTitle} {data?.offers?.offerValue}{data?.offers?.isPercent ? "%" : ""} OFF</p>
        }
        <div className='flex w-full justify-between relative z-2'>
          <div className='text-[16px] flex items-center gap-3 p-[12px]'>
            {/* <div className='h-[33px] w-[33px] rounded-full bg-[#FFFFFF4D] flex justify-center items-center text-white'>
              <p className=''>4.8</p>
            </div>
            <p className='text-secondary'>Rating</p> */}
          </div>
          {data?.price &&
            <div className='flex items-center justify-end gap-2 p-[12px] bg-black bg-opacity-45 w-full'>
              <p className='text-secondary text-[14px]'>From</p>
              <div className='flex flex-col justify-end'>
                {data?.offers?.offerTitle &&
                  <p className='text-white line-through text-right'>{data?.offers?.bulkPrice}</p>
                }
                <p className='text-white text-[26px]'>{data?.currency} {data?.bulkPrice ? data?.bulkPrice.toLocaleString() : data?.price.toLocaleString()}</p>
              </div>
            </div>}
        </div>
      </div>
      <div className='p-[15px]'>
        {data?.tourType &&
          <div className='flex items-center gap-2 text-[#aeaeae] text-center text-[11px]'>
            <p className='whitespace-nowrap'>{data?.tourType}</p>
          </div>
        }
        {data.tag != '' &&
          <p className='text-secondary text-[14px] border-b-[2px] border-b-secondary w-auto pb-[5px]'>{data.tag}</p>
        }
        <p className='text-[18px] mt-[10px]'>{data.name}</p>
        <div className='grid grid-cols-2 mt-[10px] gap-[5px] text-[11px]'>
          {data?.details?.hours &&
            <div className='flex items-center gap-2 '>
              <Image src={'/logo/stopwatch.svg'} height={100} width={20} alt='stopwatch' className='h-[20px] w-[20px]' />
              <p>{data.details.hours} Hours</p>
            </div>
          }
          {/* <div className='flex items-center gap-2 '>
            <Image src={'/logo/large-group.svg'} height={100} width={100} alt='stopwatch' className='h-[20px] w-[30px]' />
            <p>{data.details.size}</p>
          </div> */}
          {data?.startLocation &&
            <div className='flex items-center gap-2 '>
              <Image src={'/logo/location.svg'} height={100} width={20} alt='stopwatch' className='h-[20px] w-[20px]' />
              <p>{data.startLocation}</p>
            </div>
          }
          {data?.details?.language && (
            <div className="flex items-center gap-2">
              <Image
                src="/logo/language.svg"
                height={100}
                width={100}
                alt="stopwatch"
                className="h-[20px] w-[30px]"
              />
              {Array.isArray(data?.details?.language) ?
                data.details.language.map((lang, id) => (
                  <p key={id}>{lang}</p>
                ))
                :
                <p>{data?.details?.language}</p>
              }
            </div>
          )}
          {data?.details?.availability ?
            <div className='flex items-center gap-2 bg-[#00FF29] rounded-[11px] px-[15px] py-[10px] text-center'>
              <p>Available</p>
            </div>
            :
            <div className='flex items-center gap-2 bg-[#FF0000] rounded-[11px] px-[15px] py-[10px] text-white text-center'>
              <p>Not Available</p>
            </div>
          }

          {data?.details?.highRated &&
            <div className='flex items-center gap-2 bg-[#00FF29] rounded-[11px] px-[15px] py-[10px] text-center'>
              <p>High Rated</p>
            </div>
          }
          {data?.details?.rating && (
            <div className="flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: data.details.rating }).map((_, index) => (
                  <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="none"
                    viewBox="0 0 12 12"
                  >
                    <path
                      fill="#FFA800"
                      d="M2.773 11.045l3.295-1.71 3.295 1.71-.63-3.65 2.653-2.585-3.677-.533L6.069.941 4.427 4.277.75 4.81l2.666 2.584-.643 3.65z"
                    ></path>
                  </svg>
                ))}
              </div>
            </div>
          )}
          {data?.details?.recommended &&
            <div className='flex items-center gap-2 bg-[#00FF29] rounded-[11px] px-[15px] py-[10px] text-center'>
              <p>Recommended</p>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

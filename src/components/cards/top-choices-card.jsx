'use client'
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { useSelector } from 'react-redux';

export default function TopChoicesCard({ data }) {

  // console.log(country);
  return (
    <div className='w-full h-[482px] rounded-[10px] overflow-hidden font-semibold shadow-xl capitalize'
    >
      <div className='h-[305px] p-[12px] flex items-end'
        style={{
          backgroundImage: `url(${data.gallery[0]})`, backgroundSize: 'cover', backgroundPosition: 'center'
        }}
      >
        <div className='flex w-full justify-between'>
          <div className='text-[16px] flex items-center gap-3'>
            <div className='h-[33px] w-[33px] rounded-full bg-[#FFFFFF4D] flex justify-center items-center text-white'>
              <p className=''>4.8</p>
            </div>
            <p className='text-secondary'>Rating</p>
          </div>
          {data?.price &&
            <div className='flex items-center gap-2'>
              <p className='text-secondary text-[14px]'>From</p>
              <p className='text-white text-[26px]'>{data.price}</p>
            </div>}
        </div>
      </div>
      <div className='p-[15px]'>
        {data.tag != '' &&
          <p className='text-secondary text-[14px] border-b-[2px] border-b-secondary w-auto pb-[5px]'>{data.tag}</p>
        }
        <p className='text-[18px] mt-[10px]'>{data.name}</p>
        <div className='grid grid-cols-2 mt-[10px] gap-[5px] text-[11px]'>
          {data?.details?.hours &&
            <div className='flex items-center gap-2 '>
              <Image src={'/logo/stopwatch.svg'} height={100} width={20} alt='stopwatch' className='h-[20px] w-[20px]' />
              <p>{data.details.hours}</p>
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
          {data?.details?.language &&
            <div className='flex items-center gap-2 '>
              <Image src={'/logo/language.svg'} height={100} width={100} alt='stopwatch' className='h-[20px] w-[30px]' />
              {data?.details?.language?.map((lang, id) => {
                return (
                  <p key={id}>{lang}</p>
                )
              })}
            </div>}
        </div>
      </div>
    </div>
  )
}

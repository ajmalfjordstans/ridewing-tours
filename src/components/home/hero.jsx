import React, { useEffect, useState } from 'react'
import Search from '../forms/search'
import { useSelector } from 'react-redux';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/app/firebase';

export default function Hero({ data }) {
  return (
    <section className='pt-[100px] h-[100vh] w-full relative'>
      <div className='container mx-auto px-[5%] lg:px-0 h-full '>
        <div className='h-full flex items-center text-white '>
          <div className='flex flex-col max-w-[800px] gap-[24px] bg-custom-red bg-opacity-70 p-[20px] lg:p-[50px]'>
            <p className='font-bold text-[36px] lg:text-[75px] leading-[42px] lg:leading-[86px]'>
              {data.heading}
            </p>
            <p className='text-[16px] md:text-[18px] leading-[24px] md:leading-[34px] text-white'>{data.tagline}</p>
            {/* <Search /> */}
          </div>
        </div>
        <div className={`absolute top-0 right-0 h-full w-full md:w-[75%] z-[-1]  bg-cover`}
          style={{ backgroundImage: `url(${data.background})` }}
        ></div>
      </div>
    </section >
  )
}

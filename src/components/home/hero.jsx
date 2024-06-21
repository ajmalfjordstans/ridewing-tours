import React from 'react'
import Search from '../forms/search'

export default function Hero() {
  return (
    <section className='pt-[100px] h-[100vh] w-full bg-hero bg-cover'>
      <div className='container mx-auto px-[5%] lg:px-0 h-full'>
        <div className='h-full flex items-center text-white'>
          <div className='flex flex-col max-w-[700px] gap-[24px]'>
            <p className='font-bold text-[42px] lg:text-[75px] leading-[58px] lg:leading-[86px]'>
              Desert Safari in <br /> Abu Dhabi
            </p>
            <p className='text-[16px] md:text-[18px] leading-[34px]'>Experience our ultimate Desert Safari in Abu Dhabi! Get ready for an
              unforgettable adventure in the Arabian desert.</p>
            <Search />
          </div>
        </div>
      </div>
    </section>
  )
}
             
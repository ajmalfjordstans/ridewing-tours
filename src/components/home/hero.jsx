import React from 'react'
import Search from '../forms/search'

export default function Hero() {
  return (
    <section className='pt-[100px] h-[100vh] w-full relative'>
      <div className='container mx-auto px-[5%] lg:px-0 h-full '>
        <div className='h-full flex items-center text-white '>
          <div className='flex flex-col max-w-[800px] gap-[24px] bg-custom-red bg-opacity-70 p-[20px] lg:p-[50px]'>
            <p className='font-bold text-[36px] lg:text-[75px] leading-[42px] lg:leading-[86px]'>
              Discover Japan&apos;s <br />Hidden Gems
            </p>
            <p className='text-[16px] md:text-[18px] leading-[24px] md:leading-[34px] text-white'>Embark on an unforgettable journey through the heart of Japan with our expertly curated tours. From the serene temples of Kyoto to the bustling streets of Tokyo, experience the perfect blend of tradition and modernity.</p>
            {/* <Search /> */}
          </div>
        </div>
        <div className='absolute top-0 right-0 h-full w-full md:w-[75%] z-[-1] bg-japan bg-cover'></div>
      </div>
    </section>
  )
}

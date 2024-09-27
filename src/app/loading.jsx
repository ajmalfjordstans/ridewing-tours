import React from 'react'
import 'ldrs/quantum'
import Image from 'next/image'

export default function Loading() {
  return (
    <div className='fixed top-0 left-0 h-[100vh] w-[100vw] bg-[red] flex justify-center items-center z-10'>
      {/* <p className='text-[28px] md:text-[38px] text-white font-bold'>RIDEWING</p> */}
      <Image src={'/logo/kh-logo.png'} height={300} width={500} alt='logo' className='h-[60px] lg:h-[200px] w-auto' />
      <l-quantum
        size="45"
        speed="1.75"
        color="black"
      ></l-quantum>
    </div>
  )
}

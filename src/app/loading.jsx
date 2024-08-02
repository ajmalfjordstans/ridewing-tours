import React from 'react'
import 'ldrs/quantum'

export default function Loading() {
  return (
    <div className='fixed top-0 left-0 h-[100vh] w-[100vw] bg-[red] flex justify-center items-center z-10'>
      <p className='text-[28px] md:text-[38px] text-white font-bold'>RIDEWING</p>
      <l-quantum
        size="45"
        speed="1.75"
        color="black"
      ></l-quantum>
    </div>
  )
}

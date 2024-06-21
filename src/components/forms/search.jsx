'use client'
import { Button } from '@material-tailwind/react'
import React, { useState } from 'react'

export default function Search() {
  const [city, setCity] = useState('')
  return (
    <div className='w-full max-w-[693px] h-[61px] rounded-[40px] overflow-hidden bg-white flex justify-between items-center text-black p-[3px]'>
      <div className='py-[20px] pl-[20px]'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="h-[23px] w-[23px]">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      </div>
      <input type="text" className='outline-none bg-white p-[15px] w-full font-bold text-[14px] lg:text-[17px]' onChange={(e) => setCity(e.target.value)} placeholder='Abu Dhabi city tour' />
      <Button
        className='rounded-[40px] h-full w-[182px] bg-[#FFCC00]'
        onClick={() => { alert(city) }}
      >
        Search
      </Button>
    </div>
  )
}

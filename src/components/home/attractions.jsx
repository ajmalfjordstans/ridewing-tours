'use client'
import React from 'react'
import AttractionsCard from '../cards/attractions-card'
import { Button } from '@material-tailwind/react'

const AttractionsData = [
  {
    title: "Liwa Overnight Desert Safari From Abu Dhabi",
    image: "/images/temp/attractions.jpg"
  },
  {
    title: "Liwa Overnight Desert Safari From Abu Dhabi",
    image: "/images/temp/attractions.jpg"
  },
  {
    title: "Liwa Overnight Desert Safari From Abu Dhabi",
    image: "/images/temp/attractions.jpg"
  },
  {
    title: "Liwa Overnight Desert Safari From Abu Dhabi",
    image: "/images/temp/attractions.jpg"
  },
]

export default function Attractions() {
  return (
    <section className='py-[50px] container mx-auto px-[5%] lg:px-0'>
      <div className=' w-full flex flex-col '>
        <p className='font-bold text-[32px] leading-[42px]'>Discover Popular Attractions</p>
        <div className='h-[1px] w-full bg-[#00000080] mt-[20px]'>
          <div className='h-[3px] w-[320px] bg-[#E4322C] translate-y-[-1.5px]'></div>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px] w-full mt-[48px]'>
        {AttractionsData.map((data, id) => {
          return (
            <AttractionsCard key={id} data={data} />
          )
        })}
      </div>
      <div className='w-full flex justify-center'>
        <Button
          className='h-[48px] w-[180px] border-[red] border-[2px] rounded-[10px] bg-transparent text-[red] mt-[40px]'
        >SEE MORE</Button>
      </div>
    </section>
  )
}

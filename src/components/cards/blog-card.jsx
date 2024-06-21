import Image from 'next/image'
import React from 'react'

export default function BlogCard({ data }) {
  return (
    <div className='w-full lg:h-[220px] border-b-[1px] border-[red] mt-[24px] pb-[10px] flex justify-between flex-col-reverse md:flex-row gap-[10px]'>
      <div className='w-full text-[15px] flex flex-col gap-[24px]'>
        <p className='font-semibold'>{data.date}</p>
        <p className=''>{data.description}</p>
        <div className='flex items-center text-[#E4322C] gap-1'>
          <p className='font-semibold'>Read More</p>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#E4322C" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>

        </div>
      </div>
      <Image src={data.image} height={400} width={600} className='h-[200px] w-full md:w-[313px] object-cover' />
    </div>
  )
}

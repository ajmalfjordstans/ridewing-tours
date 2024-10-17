'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function CategoriesCard({ data }) {
  return (
    <div className='w-full h-[250px] md:h-[368px] rounded-[10px] font-bold shadow-xl overflow-hidden flex flex-col items-end border-[2px] border-[#C9C8C8]'
    // style={{
    //   backgroundImage: `url(${data.image})`, backgroundSize: 'cover', backgroundPosition: 'center'
    // }}
    >
      <div className='relative h-[90%] w-full'>
        <Image src={data?.image} height={700} width={500} alt='top' className='absolute left-0 top-0 h-full w-full object-cover z-0' />
      </div>
      <div className='h-[76px] w-full py-[15px] p-[10px] md:p-[15px] bg-[#FFFFFF] text-black'>
        <p className='capitalize text-[16px] md:text-[20px] font-[500]'>{data.title}</p>
      </div>
    </div>
  )
}

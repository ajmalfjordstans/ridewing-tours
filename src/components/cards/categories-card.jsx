'use client'
import Link from 'next/link'
import React from 'react'

export default function CategoriesCard({ data }) {
  return (
    <div className='w-full h-[250px] md:h-[368px] rounded-[10px] font-bold shadow-xl overflow-hidden flex items-end border-[2px] border-[#C9C8C8]'
      style={{
        backgroundImage: `url(${data.image})`, backgroundSize: 'cover', backgroundPosition: 'center'
      }}
    >
      <div className='h-[76px] w-full py-[15px] p-[10px] md:p-[15px] bg-[#FFFFFF] text-black'>
        <p className='capitalize text-[16px] md:text-[20px] font-[500]'>{data.title}</p>
      </div>
    </div>
  )
}

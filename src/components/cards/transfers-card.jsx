'use client'
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { useSelector } from 'react-redux';

export default function TransfersCard({ data }) {
  const selectedCountry = useSelector(state => state.user.selectedCountry)
  return (
    <Link href={{ pathname: `/${data.url}`, query: { country: selectedCountry } }}>
      <div className='w-full h-[400px] rounded-[10px] overflow-hidden font-semibold shadow-xl capitalize'
      >
        <div className='h-[305px] p-[12px] flex items-end'
          style={{
            backgroundImage: `url(${data.image})`, backgroundSize: 'cover', backgroundPosition: 'center'
          }}
        >
        </div>
        <div className='p-[15px]'>
          {data.tag != '' &&
            <p className='text-secondary text-[14px] border-b-[2px] border-b-secondary w-auto pb-[5px]'>{data.tag}</p>
          }
          <p className='text-[22px] text-center mt-[10px]'>{data.name}</p>
        </div>
      </div>
    </Link >
  )
}

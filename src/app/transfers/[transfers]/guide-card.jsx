'use client'
import React, { useState } from 'react';

export default function TransferGuideCard({ data }) {

  return (
    <div className='w-full h-[200px] md:h-[368px] rounded-[10px] font-bold overflow-hidden flex items-end relative'>

      <img
        src={data.image}
        alt={data.name}
        className={`w-full h-full object-cover `}
      />

      <div className='absolute bottom-0 h-[100px] w-full p-[15px] bg-[#00000080] text-white'>
        <p className='uppercase'>{data.name}</p>
        <p className='uppercase'>{data?.title}</p>

      </div>

    </div>
  );
}

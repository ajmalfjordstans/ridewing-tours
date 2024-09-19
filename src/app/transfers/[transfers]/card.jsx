'use client'
import Image from 'next/image';
import React, { useState } from 'react';

export default function TransferCard({ data }) {

  return (
    <div className='w-full h-[200px] md:h-[368px] rounded-[10px] overflow-hidden flex items-end relative'>

      <Image
        src={data.image ? data.image : "/images/background/image-template.jpg"}
        alt={data.name}
        className={`w-full h-full object-cover `}
        height={600}
        width={600}
      />

      <div className='absolute bottom-0 h-[100px] w-full p-[15px] bg-[#00000080] text-white'>
        <p className='uppercase whitespace-nowrap text-ellipsis text-[14px] font-[600]'>{data.name}</p>
        {data?.price &&
          <p className='text-[12px]'>Price starting from: {data?.price.toLocaleString()} {data?.currency}</p>
        }
      </div>

    </div>
  );
}

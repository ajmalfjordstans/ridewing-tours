'use client'
import Image from 'next/image';
import React, { useState } from 'react';

export default function TransferGuideCard({ data }) {


  return (
    <div className='w-full h-[200px] md:h-[368px] rounded-[10px]  overflow-hidden flex items-end relative'>

      <Image
        src={data.image ? data.image : "/images/background/image-template.jpg"}
        alt={data?.name ? data.name : "image"}
        className={`w-full h-full object-cover `}
        height={600}
        width={600}
      />

      <div className='absolute bottom-0 h-[100px] w-full p-[15px] bg-[#00000080] text-white'>
        <p className='uppercase'>{data.name}</p>
        <p className='uppercase'>{data?.title}</p>
        {data?.price &&
          <p className='text-[14px]'>Hourly Rate: {data?.price} {data?.currency != undefined ? data?.currency : ""}</p>
        }
        <div className='flex items-center'>
          {Array.isArray(data?.languages) && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
          </svg>
          }
          <div className='flex gap-3'>
            {data?.languages?.map((language, id) =>
              <span className='text-[12px]' key={id}>{language}</span>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}

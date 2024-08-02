'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export default function PackageCard({ data }) {
  const [count, setCount] = useState(4);

  const increment = () => setCount(count + 1);
  const decrement = () => {
    if (count > 4) {
      setCount(count - 1);
    }
  };
  useEffect(() => {
    console.log(data);
    console.log(data.price, count);
  }, [])
  return (
    <div className='w-full border border-solid border-[rgba(255, 218, 50, 0.5)] shadow-[0px_-1px_6.9px_0px_rgba(0,0,0,0.25)] rounded-[20px] p-[25px] mt-[60px] flex gap-[20px]'>
      <div className='h-[176px] w-[215px] rounded-[20px] overflow-hidden translate-y-[-48px]'>
        <Image src={data.gallery[0]} height={800} width={800} alt='package image' className='h-full w-full object-cover' />
      </div>
      <div className='w-full'>
        <div className='flex justify-between gap-2 w-full'>
          <div className='col-span-2'>
            <p className='font-[600] text-[24px] leading-[42px]'>{data.name}</p>
          </div>
          <div className='' >
            <div className='flex gap-5'>
              <div>

                <p className='text-[38px] leading-[42px]'>{data.currency + " " + data?.price * count}</p>
              </div>
              <div className='flex items-center gap-4'>
                <span className="text-[32px]">{count}</span>
                <div className="flex flex-col items-center gap-2">
                  <button
                    className="text-green-500 px-4 py-2 rounded-full shadow hover:bg-gray-200 "
                    onClick={increment}
                  >
                    +
                  </button>
                  <button
                    className="text-red-500 px-4 py-2 rounded-full shadow hover:bg-gray-200"
                    onClick={decrement}
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

'use client'
import React, { useEffect, useState } from 'react'
import TransfersCard from '../cards/transfers-card';

export default function Transfer() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/json/transfers.json');
      const result = await response.json();
      setData(result);
    };

    fetchData();
  }, []);
  return (
    <section className='py-[50px] container mx-auto px-[5%] lg:px-0'>
      <div className=' w-full flex flex-col '>
        <p className='font-bold text-[32px] leading-[42px]'>Transfers</p>
        <div className='h-[1px] w-full bg-[#00000080] mt-[20px]'>
          <div className='h-[3px] w-[320px] bg-[#E4322C] translate-y-[-1.5px]'></div>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[10px] md:gap-[30px] w-full mt-[48px]'>
        {data?.map((data, id) => {
          // console.log(data)
          return (
            <TransfersCard key={id} data={data} />
          )
        })}
      </div>
    </section>
  )
}

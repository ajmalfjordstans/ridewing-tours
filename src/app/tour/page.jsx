'use client'
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import TourHero from './hero';

export default function Page() {
  const searchParams = useSearchParams();
  const [urlParams, setUrlParams] = useState({});
  const [data, setData] = useState(null);
  const [currentData, setCurrentData] = useState(null);

  useEffect(() => {
    const params = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });

    const fetchData = async () => {
      const response = await fetch('/json/japan.json');
      const result = await response.json();
      setData(result);
    };
    fetchData();
    setUrlParams(params);
  }, [searchParams]);

  useEffect(() => {
    const result = data?.find((obj) => {
      if (obj.url === urlParams.destination) {
        setCurrentData(obj)
      }
    });
  }, [data])
  console.log("data", currentData);
  return (
    <div className='text-black mt-[80px] md:mt-[180px] container mx-auto px-[5%] lg:px-0'>
      {
        data != null ?
          <div className=''>
            <TourHero data={currentData} />
          </div>
          :
          <div className='w-full h-[400px] flex justify-center items-center font-bold text-[32px]'>Loading</div>
      }
    </div>
  )
}

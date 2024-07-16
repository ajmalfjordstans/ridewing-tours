'use client'
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import TourHero from './hero';

export default function Page() {
  const searchParams = useSearchParams();
  const [urlParams, setUrlParams] = useState({});
  const [currentData, setCurrentData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch('/json/japan.json');
      const result = await response.json();
      // console.log("3", result);
      return result; // Return the fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const findData = (data, params) => {
    // console.log(data);
    const selectedResult = data?.destinations?.find((obj) => {
      console.log("1", obj.url, "===", params);
      if (obj.url === params.destination) {
        setCurrentData(obj);
      }
    });
  };

  useEffect(() => {
    const params = {}
    searchParams.forEach((value, key) => {
      params[key] = value;
    })
    // console.log(params);
    const initialize = async () => {
      if (Object.keys(params).length === 0) {
        return;
      }
      setUrlParams(params); // Set URL params
      const result = await fetchData();
      findData(result, params); // Pass the fetched data and params to findData
    };

    initialize();
  }, [searchParams]);
  console.log(currentData);
  return (
    <div className='text-black mt-[80px] md:mt-[180px] container mx-auto px-[5%] lg:px-0'>
      {
        currentData !== null ?
          <div className=''>
            <TourHero data={currentData} />
          </div>
          :
          <div className='w-full h-[400px] flex justify-center items-center font-bold text-[32px]'>Loading</div>
      }
    </div>
  )
}

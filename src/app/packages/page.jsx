'use client'
import CommonHero from '@/components/common-hero'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { readFirebaseCollection } from '../firebase';
import Link from 'next/link';
import TopChoicesCard from '@/components/cards/top-choices-card';

export default function Page() {
  const selectedCountry = useSelector(state => state.user.selectedCountry)
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true)

  const getData = async () => {
    try {
      const response = await (readFirebaseCollection(`countries/${selectedCountry}/top-choices`))
      setData(response);
      setLoading(false)
    } catch (error) {
      console.log("Error reading collection");
      setLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [selectedCountry]);
  return (
    <div className='pb-[150px]'>
      <CommonHero title={"Packages"} bg={'/images/background/categories.jpg'} />
      <div className='mx-auto container'>
        <div className='mt-[80px] flex relative '>
          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10'>
            {data?.map((data, id) => {
              return (
                <Link href={{ pathname: '/tour', query: { "destination": data.url, "country": selectedCountry } }} key={id}>
                  <TopChoicesCard data={data} />
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

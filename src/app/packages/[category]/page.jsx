'use client'
import { readFirebaseCollection } from '@/app/firebase';
import TopChoicesCard from '@/components/cards/top-choices-card';
import CommonHero from '@/components/common-hero'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

export default function page({ params }) {
  const category = decodeURIComponent(params.category)
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
    <div>
      <CommonHero title={category} bg={'/images/background/categories.jpg'} />
      <div className='mx-auto container pb-[100px]'>
        <div className='my-[80px] flex relative '>
          <div className='grid grid-cols-3 gap-10'>
            {data?.filter((item) => item.category === category).map((data, id) => {
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

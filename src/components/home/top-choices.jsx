'use client'
import React, { useEffect, useState } from 'react'
import TopChoicesCard from '../cards/top-choices-card'
import { Button } from '@material-tailwind/react'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import { db, readFirebaseCollection } from '@/app/firebase'

export default function TopChoices() {
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
    <>
      {!loading && data !== null &&
        <section className='py-[60px] container mx-auto flex flex-col items-center px-[5%] lg:px-0'>
          <div className='max-w-[738px] w-full flex flex-col items-center'>
            <p className='font-bold text-[32px] leading-[42px]'>Top Choices for You</p>
            <div className='h-[1px] w-full bg-[#00000080] flex justify-center mt-[20px]'>
              <div className='h-[3px] w-[180px] bg-[#E4322C] translate-y-[-1.5px]'></div>
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[10px] md:gap-[30px] w-full mt-[48px]'>
            {data?.map((data, id) => {
              // console.log(data)
              return (
                <Link href={{ pathname: '/tour', query: { "destination": data.url, "country": selectedCountry } }} key={id}>
                  <TopChoicesCard data={data} />
                </Link>
              )
            })}
          </div>
          <Button
            className='h-[48px] w-[180px] border-[red] border-[2px] rounded-[10px] bg-transparent text-[red] mt-[40px]'
          >SEE MORE</Button>
        </section>
      }</>
  )
}

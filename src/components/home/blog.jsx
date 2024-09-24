'use client'
import React, { useEffect, useState } from 'react'
import BlogCard from '../cards/blog-card'
import { Button } from '@material-tailwind/react'
import { useSelector } from 'react-redux'
import { collection } from 'firebase/firestore'
import { db, readFirebaseCollection } from '@/app/firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import Link from 'next/link'

export default function Blog() {
  const [data, setData] = useState(null);
  const selectedCountry = useSelector(state => state.user.selectedCountry);
  const [loading, setLoading] = useState(true)

  const getData = async () => {
    try {
      const response = await (readFirebaseCollection(`countries/${selectedCountry}/blogs`))
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
    <section className='py-[50px] container mx-auto px-[5%] lg:px-0'>
      <div className=' w-full flex flex-col '>
        <p className='font-bold text-[32px] leading-[42px]'>Latest Blogs & Articles</p>
        <div className='h-[1px] w-full bg-[#00000080] mt-[20px]'>
          <div className='h-[3px] w-[320px] bg-[#E4322C] translate-y-[-1.5px]'></div>
        </div>
      </div>
      {loading ? <div className='w-full text-center py-[40px]'>Loading</div>
        :
        <>
          <div>
            {data?.slice(0, 3).map((blog, id) => {
              return (
                <BlogCard key={id} data={blog} />
              )
            })}
          </div>
          <div className='w-full flex justify-center'>
            <Link href={{ pathname: '/blog', query: { "country": selectedCountry } }} >
              <Button
                className='h-[48px] w-[180px] border-[red] border-[2px] rounded-[10px] bg-transparent text-[red] mt-[40px]'
              >SEE MORE</Button>
            </Link>
          </div>
        </>}
    </section>
  )
}

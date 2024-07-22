'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '@material-tailwind/react'
import { useSelector } from 'react-redux'
import { collection } from 'firebase/firestore'
import { db } from '@/app/firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import Link from 'next/link'
import BlogCard from '@/components/cards/blog-card'

export default function Page() {
  const [data, setData] = useState(null);
  const selectedCountry = useSelector(state => state.user.selectedCountry);
  const [queryPath, setQueryPath] = useState(`countries/${selectedCountry}/blogs`);
  const query = collection(db, queryPath);
  const [docs, firebaseLoading, error] = useCollectionData(query);

  useEffect(() => {
    setQueryPath(`countries/${selectedCountry}/blogs`);
  }, [selectedCountry]);

  useEffect(() => {
    if (!firebaseLoading) {
      setData(docs);
    }
  }, [firebaseLoading, docs]);

  return (
    <section className='py-[120px] container mx-auto px-[5%] lg:px-0'>
      <div className=' w-full flex flex-col '>
        <p className='font-bold text-[32px] leading-[42px]'>Latest Blogs & Articles</p>
        <div className='h-[1px] w-full bg-[#00000080] mt-[20px]'>
          <div className='h-[3px] w-[320px] bg-[#E4322C] translate-y-[-1.5px]'></div>
        </div>
      </div>
      {firebaseLoading ? <div className='w-full text-center py-[40px]'>Loading</div>
        :
        <>
          <div>
            {data && data?.map((blog, id) => {
              return (
                <BlogCard key={id} data={blog} />
              )
            })}
          </div>
        </>}
    </section>
  )
}

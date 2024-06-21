'use client'
import React from 'react'
import BlogCard from '../cards/blog-card'
import { Button } from '@material-tailwind/react'

const blogData = [
  {
    date: "June 19, 2024",
    description: "Lorem ipsum dolor sit amet consectetur. Faucibus vestibulum vel et sem in. Donec nisl accumsan consectetur ut sed nulla. Malesuada purus porttitor sit blandit volutpat a.",
    image: "/images/temp/blog.jpg",
  },
  {
    date: "June 19, 2024",
    description: "Lorem ipsum dolor sit amet consectetur. Faucibus vestibulum vel et sem in. Donec nisl accumsan consectetur ut sed nulla. Malesuada purus porttitor sit blandit volutpat a.",
    image: "/images/temp/blog.jpg",
  },
  {
    date: "June 19, 2024",
    description: "Lorem ipsum dolor sit amet consectetur. Faucibus vestibulum vel et sem in. Donec nisl accumsan consectetur ut sed nulla. Malesuada purus porttitor sit blandit volutpat a.",
    image: "/images/temp/blog.jpg",
  },
]

export default function Blog() {
  return (
    <section className='py-[50px] container mx-auto px-[5%] lg:px-0'>
      <div className=' w-full flex flex-col '>
        <p className='font-bold text-[32px] leading-[42px]'>Latest Blogs & Articles</p>
        <div className='h-[1px] w-full bg-[#00000080] mt-[20px]'>
          <div className='h-[3px] w-[320px] bg-[#E4322C] translate-y-[-1.5px]'></div>
        </div>
      </div>
      <div>
        {blogData.map((blog, id) => {
          return (
            <BlogCard key={id} data={blog} />
          )
        })}
      </div>
      <div className='w-full flex justify-center'>
        <Button
          className='h-[48px] w-[180px] border-[red] border-[2px] rounded-[10px] bg-transparent text-[red] mt-[40px]'
        >SEE MORE</Button>
      </div>
    </section>
  )
}

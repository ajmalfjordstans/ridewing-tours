'use client'
import { Button } from '@material-tailwind/react'
import React from 'react'
import { motion } from 'framer-motion';

export default function DestinationCard({ data }) {
  return (
    <div className='w-full h-[380px] group relative p-[15px] flex items-end' style={{ backgroundImage: `url(${data.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <motion.p
        className='font-[700] text-[36px] leading-[50px] text-white group-hover:hidden'
        initial={{ opacity: 1 }}
        whileHover={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {data.name}
      </motion.p>
      <motion.div
        className='absolute top-0 left-0 inset-0 bg-[#EEB54C99] bg-opacity-80 h-full text-white px-[20px] py-[50px] z-9'
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className='flex flex-col items-center text-center'>
          <p className='font-[700] text-[36px] leading-[50px]'>{data.name}</p>
          <p className='text-[14px] mt-[18px] leading-[24px] max-h-[150px] overflow-hidden'>{data.description}</p>
          <Button className='h-[48px] w-[180px] border-white border-[2px] rounded-[10px] bg-transparent text-white mt-[40px]'>
            SEE MORE
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

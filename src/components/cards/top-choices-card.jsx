import Image from 'next/image'
import React from 'react'

export default function TopChoicesCard({ data }) {
  return (
    <div className='w-full h-[482px] rounded-[10px] overflow-hidden font-semibold shadow-xl capitalize'
    >
      <div className='h-[305px] p-[12px] flex items-end'
        style={{
          backgroundImage: `url(${data.image})`, backgroundSize: 'cover', backgroundPosition: 'center'
        }}
      >
        <div className='flex w-full justify-between'>
          <div className=' text-[16px] flex items-center gap-3'>
            <div className='h-[33px] w-[33px] rounded-full bg-[#FFFFFF4D] flex justify-center items-center text-white'>
              <p className=''>{data.rating}</p>
            </div>
            <p className='text-secondary'>Rating</p>
          </div>
          <div className='flex items-center gap-2'>
            <p className='text-secondary text-[14px]'>From</p>
            <p className='text-white text-[26px]'>${data.price}</p>
          </div>
        </div>
      </div>
      <div className='p-[20px]'>
        <p className='text-secondary text-[14px] border-b-[2px] border-b-secondary w-[50%] pb-[5px]'>{data.category}</p>
        <p className='text-[18px] mt-[10px]'>{data.title}</p>
        <div className='grid grid-cols-2 mt-[10px] gap-[5px]'>
          <div className='flex items-center gap-2 '>
            <Image src={'/logo/stopwatch.svg'} height={100} width={20} alt='stopwatch' className='h-[20px] w-[20px]' />
            <p>{data.duration}</p>
          </div>
          <div className='flex items-center gap-2 '>
            <Image src={'/logo/large-group.svg'} height={100} width={100} alt='stopwatch' className='h-[20px] w-[30px]' />
            <p>{data.size}</p>
          </div>
          <div className='flex items-center gap-2 '>
            <Image src={'/logo/location.svg'} height={100} width={20} alt='stopwatch' className='h-[20px] w-[20px]' />
            <p>{data.location}</p>
          </div>
          <div className='flex items-center gap-2 '>
            <Image src={'/logo/language.svg'} height={100} width={100} alt='stopwatch' className='h-[20px] w-[30px]' />
            {data.languages.map((lang, id) => {
              return (
                <p key={id}>{lang}</p>
              )
            })}
          </div>

        </div>

      </div>
    </div>
  )
}

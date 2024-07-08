import AttractionsCard from '@/components/cards/attractions-card';
import React from 'react'

const AttractionsData = [
  {
    title: 'TOKYO',
    country: 'Japan',
    image: '/images/japan-attractions/tokyo.jpg',
    description: ''
  },
  {
    title: 'KYOTO',
    country: 'Japan',
    image: '/images/japan-attractions/kyoto.jpg',
    description: ''
  },
  {
    title: 'OSAKA',
    country: 'Japan',
    image: '/images/japan-attractions/osaka.jpg',
    description: ''
  },
  {
    title: 'hiroshima',
    country: 'Japan',
    image: '/images/japan-attractions/hiroshima.jpg',
    description: ''
  },
  {
    title: 'nara',
    country: 'Japan',
    image: '/images/japan-attractions/nara.jpg',
    description: ''
  },
  {
    title: 'hakone',
    country: 'Japan',
    image: '/images/japan-attractions/hakone.jpg',
    description: ''
  },
  {
    title: 'hokkaido',
    country: 'Japan',
    image: '/images/japan-attractions/hokkaido.jpg',
    description: ''
  },
  {
    title: 'okinawa',
    country: 'Japan',
    image: '/images/japan-attractions/okinawa.jpg',
    description: ''
  },
  {
    title: 'kanazawa',
    country: 'Japan',
    image: '/images/japan-attractions/kanazawa.jpg',
    description: ''
  },
  {
    title: 'nikko',
    country: 'Japan',
    image: '/images/japan-attractions/nikko.jpg',
    description: ''
  },
  {
    title: 'mount fuji',
    country: 'Japan',
    image: '/images/japan-attractions/mount-fuji.jpg',
    description: ''
  },
  {
    title: 'nagoya',
    country: 'Japan',
    image: '/images/japan-attractions/nagoya.jpg',
    description: ''
  },

];

export default function Page() {
  return (
    <div className='container mx-auto px-[5%] lg:px-0 mt-[80px] md:mt-[180px]'>
      <div className=' w-full flex flex-col '>
        <p className='font-bold text-[26px] md:text-[32px] leading-[42px]'>Popular Attractions in Japan</p>
        <div className='h-[1px] w-full bg-[#00000080] mt-[20px]'>
          <div className='h-[3px] w-[320px] bg-[#E4322C] translate-y-[-1.5px]'></div>
        </div>
      </div>
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-[10px] md:gap-[30px] w-full mt-[48px]'>
        {AttractionsData.map((data, id) => {
          return (
            <AttractionsCard key={id} data={data} />
          )
        })}
      </div>
    </div>
  )
}

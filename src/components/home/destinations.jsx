import React from 'react'
import DestinationCard from '../cards/destination-card'

const DestinationsData = [
  {
    title: "INDIA",
    description: "Lorem ipsum dolor sit amet consectetur. Lectus sed nulla sed dictum adipiscing suspendisse. Mus cursus sed nisi amet pellentesque.",
    image: "/images/temp/china.jpg"
  },
  {
    title: "INDIA",
    description: "Lorem ipsum dolor sit amet consectetur. Lectus sed nulla sed dictum adipiscing suspendisse. Mus cursus sed nisi amet pellentesque.",
    image: "/images/temp/china.jpg"
  },
  {
    title: "INDIA",
    description: "Lorem ipsum dolor sit amet consectetur. Lectus sed nulla sed dictum adipiscing suspendisse. Mus cursus sed nisi amet pellentesque.",
    image: "/images/temp/china.jpg"
  },
  {
    title: "INDIA",
    description: "Lorem ipsum dolor sit amet consectetur. Lectus sed nulla sed dictum adipiscing suspendisse. Mus cursus sed nisi amet pellentesque.",
    image: "/images/temp/china.jpg"
  },
  {
    title: "INDIA",
    description: "Lorem ipsum dolor sit amet consectetur. Lectus sed nulla sed dictum adipiscing suspendisse. Mus cursus sed nisi amet pellentesque.",
    image: "/images/temp/china.jpg"
  },
  {
    title: "INDIA",
    description: "Lorem ipsum dolor sit amet consectetur. Lectus sed nulla sed dictum adipiscing suspendisse. Mus cursus sed nisi amet pellentesque.",
    image: "/images/temp/china.jpg"
  },
  {
    title: "INDIA",
    description: "Lorem ipsum dolor sit amet consectetur. Lectus sed nulla sed dictum adipiscing suspendisse. Mus cursus sed nisi amet pellentesque.",
    image: "/images/temp/china.jpg"
  },
  {
    title: "INDIA",
    description: "Lorem ipsum dolor sit amet consectetur. Lectus sed nulla sed dictum adipiscing suspendisse. Mus cursus sed nisi amet pellentesque.",
    image: "/images/temp/china.jpg"
  },
]

export default function Destinations() {
  return (
    <section className='py-[50px] '>
      <div className=' w-full flex flex-col container mx-auto px-[5%] lg:px-0'>
        <p className='font-bold text-[32px] leading-[42px]'>Destinations</p>
        <div className='h-[1px] w-full bg-[#00000080] mt-[20px]'>
          <div className='h-[3px] w-[320px] bg-[#E4322C] translate-y-[-1.5px]'></div>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full mt-[60px]'>
        {DestinationsData.map((data, id) => {
          return (
            <DestinationCard key={id} data={data} />
          )
        })}
      </div>
    </section>
  )
}

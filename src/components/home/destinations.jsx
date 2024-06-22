import React from 'react'
import DestinationCard from '../cards/destination-card'

const DestinationsData = [
  {
    title: 'United Kingdom',
    image: 'https://images.unsplash.com/photo-1454537468202-b7ff71d51c2e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: "These destinations offer a multifaceted experience, from the academic allure of Oxford and Cambridge to the vibrant culture of Bristol and the historic charm of Cardiff. Glasgow adds a dynamic arts scene, while the Scottish Highlands, with the NC500, present nature's grandeur. Each destination is a testament to the UK's rich history, cultural diversity, and natural beauty, making them must-visit places for a comprehensive exploration of the United Kingdom."
  },
  {
    title: 'Japan',
    image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: "Japan entices visitors with a harmonious blend of ancient traditions and cutting-edge modernity. From the neon-lit streets of Tokyo to the serene temples of Kyoto and the historic resilience of Hiroshima, Japan offers a diverse range of experiences. Its unique culture, picturesque landscapes, and technological innovations make it a top destination for those seeking a journey that seamlessly combines tradition and innovation."
  },
  {
    title: 'South Korea',
    image: 'https://images.unsplash.com/photo-1551249506-d8e2c5536f8a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: "South Korea beckons travelers with its captivating blend of ancient traditions, modern cities, and natural wonders. From the vibrant streets of Seoul to the serene beauty of Jeju Island, South Korea offers a diverse range of experiences. Its unique blend of history, technology, and natural beauty make it a top destination for those seeking a dynamic and enriching travel experience."
  },
  {
    title: 'Switzerland',
    image: 'https://images.unsplash.com/photo-1528493366314-e317cd98dd52?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: "Switzerland captivates visitors with its breathtaking landscapes, from the majestic Alps to serene lakes. Its cities offer a blend of cultural richness, historical landmarks, and modern attractions. Known for its neutrality, high quality of life, and innovations in banking and finance, Switzerland is a top destination for those seeking both natural beauty and urban sophistication."
  },
  {
    title: 'North America',
    image: 'https://images.unsplash.com/photo-1547815749-838c83787de2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: "These cities and countries offer a diverse array of experiences, from historic landmarks and cultural attractions to natural wonders and vibrant city life."
  },
  {
    title: 'Scandinavian countries',
    image: 'https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: "These Scandinavian countries offer breathtaking natural landscapes, rich cultural heritage, and vibrant cities, making them ideal destinations for travelers seeking adventure, culture, and relaxation."
  },
  {
    title: 'United Kingdom',
    image: 'https://images.unsplash.com/photo-1454537468202-b7ff71d51c2e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: "These destinations offer a multifaceted experience, from the academic allure of Oxford and Cambridge to the vibrant culture of Bristol and the historic charm of Cardiff. Glasgow adds a dynamic arts scene, while the Scottish Highlands, with the NC500, present nature's grandeur. Each destination is a testament to the UK's rich history, cultural diversity, and natural beauty, making them must-visit places for a comprehensive exploration of the United Kingdom."
  },
  {
    title: 'Japan',
    image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: "Japan entices visitors with a harmonious blend of ancient traditions and cutting-edge modernity. From the neon-lit streets of Tokyo to the serene temples of Kyoto and the historic resilience of Hiroshima, Japan offers a diverse range of experiences. Its unique culture, picturesque landscapes, and technological innovations make it a top destination for those seeking a journey that seamlessly combines tradition and innovation."
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

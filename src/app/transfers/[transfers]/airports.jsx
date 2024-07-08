'use client'
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import TransferCard from './card'
import TransferForm from '@/components/forms/transfer-form'

const AirportsDetails = [
  { "name": "Narita International Airport", "id": "NRT", "image": "/images/japan-attractions/hiroshima.jpg" },
  { "name": "Haneda Airport", "id": "HND", "image": "/images/japan-attractions/hiroshima.jpg" },
  { "name": "Kansai International Airport", "id": "KIX", "image": "/images/japan-attractions/hiroshima.jpg" },
  { "name": "Chubu Centrair International Airport", "id": "NGO", "image": "/images/japan-attractions/hiroshima.jpg" },
  { "name": "Fukuoka Airport", "id": "FUK", "image": "/images/japan-attractions/hiroshima.jpg" },
  { "name": "New Chitose Airport", "id": "CTS", "image": "/images/japan-attractions/hiroshima.jpg" },
  { "name": "Naha Airport", "id": "OKA", "image": "/images/japan-attractions/hiroshima.jpg" },
  { "name": "Hiroshima Airport", "id": "HIJ", "image": "/images/japan-attractions/hiroshima.jpg" },
  { "name": "Sendai Airport", "id": "SDJ", "image": "/images/japan-attractions/hiroshima.jpg" },
  { "name": "Kagoshima Airport", "id": "KOJ", "image": "/images/japan-attractions/hiroshima.jpg" }
]

export default function Airports() {
  const [showForm, setShowForm] = useState(false)
  const [selectedAirport, setSelectedAirport] = useState("")
  const searchParams = useSearchParams()
  const country = searchParams.get("country")

  const showFormHandler = (data) => {
    setSelectedAirport(data)
    setShowForm(true)
  }
  return (
    <section className='py-[50px] container mx-auto px-[5%] lg:px-0 mt-[100px] pt-[40px]'>
      <div className=' w-full flex flex-col '>
        <p className='font-bold text-[32px] leading-[42px] capitalize'>Airports in {country}</p>
        <div className='h-[1px] w-full bg-[#00000080] mt-[20px]'>
          <div className='h-[3px] w-[320px] bg-[#E4322C] translate-y-[-1.5px]'></div>
        </div>
      </div>
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-[10px] md:gap-[30px] w-full mt-[48px]'>
        {AirportsDetails.map((data, id) => {
          return (
            <div key={id} className='hover:cursor-pointer' onClick={() => showFormHandler(data)}>
              <TransferCard data={data} />
            </div>
          )
        })}
      </div>
      {showForm &&
        <div className='fixed top-0 left-0 h-[100vh] w-[100vw] flex justify-center items-center backdrop-blur-sm z-10'>
          <div className='bg-white p-[20px] rounded-[5px] shadow-2xl'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:cursor-pointer" onClick={() => setShowForm(false)}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
            <TransferForm data={selectedAirport} />
          </div>
        </div>
      }
    </section>
  )
}

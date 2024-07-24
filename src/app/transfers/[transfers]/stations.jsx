'use client'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import TransferCard from './card'
import TransferForm from '@/components/forms/transfer-form'
import { collection } from 'firebase/firestore'
import { db } from '@/app/firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useSelector } from 'react-redux'

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

export default function Stations() {
  const [showForm, setShowForm] = useState(false)
  const [selectedStation, setSelectedStation] = useState("")
  const searchParams = useSearchParams()
  const [data, setData] = useState(null);
  const selectedCountry = useSelector(state => state.user.selectedCountry)
  const [queryPath, setQueryPath] = useState(`countries/${selectedCountry}/stations`);
  const query = collection(db, queryPath);
  const [docs, loading, error] = useCollectionData(query);

  useEffect(() => {
    setQueryPath(`countries/${selectedCountry}/stations`);
  }, [selectedCountry]);

  useEffect(() => {
    if (!loading) {
      setData(docs);
      // console.log("Stations", docs);
    }
  }, [loading, docs]);

  const showFormHandler = (data) => {
    setSelectedStation({ ...data, transfer: "station" })
    setShowForm(true)
  }

  return (<>
    <section className='pt-[50px] pb-[150px] container mx-auto px-[5%] lg:px-0 mt-[100px]'>
      <div className=' w-full flex flex-col '>
        <p className='font-bold text-[32px] leading-[42px] capitalize'>Stations in {selectedCountry}</p>
        <div className='h-[1px] w-full bg-[#00000080] mt-[20px]'>
          <div className='h-[3px] w-[320px] bg-[#E4322C] translate-y-[-1.5px]'></div>
        </div>
      </div>
      {loading ? <div className='  text-[22px] font-[600] flex justify-center items-center py-[150px] '>Loading</div> :
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-[10px] md:gap-[30px] w-full mt-[48px]'>
          {docs?.map((data, id) => {
            return (
              <div key={id} className='hover:cursor-pointer' onClick={() => showFormHandler(data)}>
                <TransferCard data={data} />
              </div>
            )
          })}
        </div>
      }
      {showForm &&
        <div className='fixed top-0 left-0 h-[100vh] w-[100vw] flex justify-center items-center backdrop-blur-sm z-10'>
          <div className='bg-white p-[20px] rounded-[5px] shadow-2xl'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:cursor-pointer" onClick={() => setShowForm(false)}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
            <TransferForm data={selectedStation} />
          </div>
        </div>
      }
    </section>
  </>)
}

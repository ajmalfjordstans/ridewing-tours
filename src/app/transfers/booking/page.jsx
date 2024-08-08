'use client'
import { addItem } from '@/components/store/cartSlice';
import { Button } from '@material-tailwind/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function Page() {
  const booking = useSelector(state => state.user.transferBooking);
  const selectedCountry = useSelector(state => state.user.selectedCountry);
  const dispatch = useDispatch()
  const router = useRouter()
  useEffect(() => {
    console.log("Booking", booking)
  })
  const addToCartHandler = () => {
    // const itemExists = cart.find(item => item.id === data.id);
    // if (!itemExists) {
    console.log("Added to cart");
    dispatch(addItem({ ...booking, status: "pending" }));
    router.push(`/cart`)
    // } else {
    //   alert("Item already exists");
    // }
  }
  return (
    <section className='pb-[150px] container mx-auto px-[5%] lg:px-0 mt-[100px] pt-[40px]'>
      <div className=' w-full flex flex-col '>
        <p className='font-bold text-[32px] leading-[42px] capitalize'>Confirm Booking</p>
        <div className='h-[1px] w-full bg-[#00000080] mt-[20px]'>
          <div className='h-[3px] w-[320px] bg-[#E4322C] translate-y-[-1.5px]'></div>
        </div>
      </div>
      <div className='mt-[40px] flex gap-[20px]'>
        <Image src={booking.image} alt='vehicle' height={500} width={500} className='' />
        <div className='capitalize'>
          <p>{booking.name}</p>
          <p>Number of Passengers: {booking.travelDetails?.passengers}</p>
          <p>Number of Luggages: {booking.travelDetails?.luggage}</p>
          <p>PickupTime: {booking.travelDetails?.pickupTime}</p>
          <p>Arrival/Departure: {booking.travelDetails?.tripType}</p>
          <p>Pickup: {booking.travelDetails?.pickupAddress}</p>
          <p>Dropoff: {booking.travelDetails?.dropoffAddress}</p>
          {/* {booking.travelDetails.passengers} */}
        </div>
      </div>
      <div className='p-[20px] border-[2px] border-custom-red mt-[15px] flex justify-between items-center'>
        <p>Price: <span className='font-[500]'>$123</span></p>
        <Button className='bg-custom-red' onClick={addToCartHandler}>Add to Cart</Button>
      </div>
    </section >
  )
}

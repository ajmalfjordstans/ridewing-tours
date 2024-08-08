'use client'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import BookingCard from '../cards/booking-card';

const statuses = ['pending', 'confirmed', 'ongoing', 'completed'];

export default function Bookings({ booking }) {
  const [showStatus, setShowStatus] = useState('confirmed')
  const bookingData = booking

  useEffect(() => {
    // console.log(bookingData)
  }, [booking])

  return (
    <div>
      <div className='grid grid-cols-4 relative border-b-[#ADADAD]'>
        {statuses.map((status) => (
          <div
            key={status}
            className={`p-2 cursor-pointer ${showStatus === status ? 'font-bold' : ''} capitalize`}
            onClick={() => setShowStatus(status)}
          >
            {status}
          </div>
        ))}
        <motion.div
          className='absolute bottom-[-5px] h-[4px] bg-custom-red'
          layoutId='underline'
          initial={false}
          animate={{ left: `${statuses.indexOf(showStatus) * 25}%`, width: '15%' }}
        />
      </div>
      <div className='mt-[30px] flex flex-col gap-4'>
        {bookingData?.filter((booking) => booking.status === showStatus).map((booking, id) => {
          // console.log("booking", booking);
          return (
            <div key={id}>
              <BookingCard booking={booking} status={showStatus} />
            </div>
          )
        }
        )}
      </div>
    </div>
  )
}

'use client'
import React from 'react';

export default function TransferGuideView({ data, travelDetails }) {
  return (
    <div className='max-h-[80vh] overflow-y-scroll'>
      <p className='text-center text-[24px] font-[600]'>{data.name}</p>
      <div className='grid grid-cols-2 gap-2 pb-[40px] mt-[10px]'>
        <div className='flex flex-col gap-1'>
          <label>Number of Guests:</label>
          <p className='border-[2px] rounded-md p-[10px]'>{data?.travelDetails.guests}</p>
        </div>
        <div className='flex flex-col gap-1'>
          <label>Meeting Point:</label>
          <p className='border-[2px] rounded-md p-[10px]'>{data?.travelDetails.meetingPoint}</p>
        </div>
        <div className='flex flex-col gap-1 col-span-2'>
          <label>Meeting Address:</label>
          <p className='border-[2px] rounded-md p-[10px]'>{data?.travelDetails.meetingAddress}</p>
        </div>
        <div className='flex flex-col gap-1'>
          <label>Meeting Time:</label>
          <p className='border-[2px] rounded-md p-[10px]'>{data?.travelDetails.meetingTime}</p>
        </div>
        <div className='flex flex-col gap-1'>
          <label>Date:</label>
          <p className='border-[2px] rounded-md p-[10px]'>{data?.travelDetails.date}</p>
        </div>
        <div className='flex flex-col gap-1'>
          <label>Language:</label>
          <p className='border-[2px] rounded-md p-[10px]'>{data?.travelDetails.language}</p>
        </div>
        <div className='flex flex-col gap-1'>
          <label>Hours:</label>
          <p className='border-[2px] rounded-md p-[10px]'>{data?.travelDetails.hours}</p>
        </div>
        <div className='flex flex-col gap-1 col-span-2'>
          <label>Itinerary:</label>
          <p className='border-[2px] rounded-md p-[10px]'>{data?.travelDetails.itinerary}</p>
        </div>
        <div className='flex flex-col gap-1 col-span-2'>
          <label>Extra Notes:</label>
          <p className='border-[2px] rounded-md p-[10px]'>{data?.travelDetails.notes ? data?.travelDetails.notes : 'None'}</p>
        </div>
      </div>
    </div>
  );
}

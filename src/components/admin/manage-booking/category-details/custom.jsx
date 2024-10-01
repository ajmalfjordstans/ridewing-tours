'use client'
import React, { useState } from 'react';

export default function CustomPackageView({ data, user }) {
  const [includeGuide] = useState(data?.travelDetails.guideLanguage ? true : false);
  console.log(data);

  return (
    <div className='w-full'>
      <div className='grid grid-cols-2 gap-2 pb-[40px] mt-[10px]'>
        <div className='flex flex-col gap-1 col-span-2 md:col-span-1'>
          <label>Number of Guests:</label>
          <p className='border-[1px] border-black rounded-md p-[10px]'>{data?.travelDetails.guests}</p>
        </div>
        <div className='flex flex-col gap-1 col-span-2 md:col-span-1'>
          <label>Meeting Point:</label>
          <p className='border-[1px] border-black rounded-md p-[10px]'>{data?.travelDetails.meetingPoint}</p>
        </div>
        <div className='flex flex-col gap-1 col-span-2'>
          <label>Meeting Address:</label>
          <p className='border-[1px] border-black rounded-md p-[10px]'>{data?.travelDetails.meetingAddress}</p>
        </div>
        <div className='flex flex-col gap-1'>
          <label>Meeting Time:</label>
          <p className='border-[1px] border-black rounded-md p-[10px]'>{data?.travelDetails.meetingTime}</p>
        </div>
        <div className='flex flex-col gap-1'>
          <label>Date:</label>
          <p className='border-[1px] border-black rounded-md p-[10px]'>{data?.travelDetails.date}</p>
        </div>
        <div className='flex flex-col gap-1'>
          <label>Hours expected:</label>
          <p className='border-[1px] border-black rounded-md p-[10px]'>{data?.travelDetails.hours || 'N/A'}</p>
        </div>
        {includeGuide && (
          <>
            <div className='flex flex-col gap-1'>
              <label>Guide Language:</label>
              <p className='border-[1px] border-black rounded-md p-[10px]'>{data?.travelDetails.guideLanguage}</p>
            </div>
          </>
        )}
        <div className='flex flex-col gap-1 col-span-2'>
          <label>Itinerary:</label>
          <p className='border-[1px] border-black rounded-md p-[10px]'>{data?.travelDetails.itinerary}</p>
        </div>
        <div className='flex flex-col gap-1 col-span-2'>
          <label>Extra Notes:</label>
          <p className='border-[1px] border-black rounded-md p-[10px]'>{data?.travelDetails.notes || 'None'}</p>
        </div>
      </div>
    </div>
  );
}

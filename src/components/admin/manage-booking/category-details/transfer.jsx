'use client'
import React from 'react';

export default function TransferDetails({ data, travelDetails }) {
  console.log(data);

  return (
    <>
      <p className='text-center text-[24px] font-[400]'>{data.name}</p>
      <div className='w-full h-[1px] my-[20px] bg-black'></div>
      <div className='grid grid-cols-2 gap-2 pb-[40px]'>
        {/* Full Name Field */}
        <div className='flex flex-col gap-1 col-span-2'>
          <label>Full Name:</label>
          <p className='border-[1px] border-black rounded-md p-[10px]'>{data?.travelDetails?.name}</p>
        </div>

        {/* Contact Number Field */}
        <div className='flex flex-col gap-1'>
          <label>Contact Number:</label>
          <p className='border-[1px] border-black rounded-md p-[10px]'>{data?.travelDetails?.contact}</p>
        </div>

        {/* Email Field */}
        <div className='flex flex-col gap-1'>
          <label>Email:</label>
          <p className='border-[1px] border-black rounded-md p-[10px]'>{data?.travelDetails?.email}</p>
        </div>

        {/* Number of Passengers Field */}
        <div className='flex flex-col gap-1'>
          <label>Number of Passengers:</label>
          <p className='border-[1px] border-black rounded-md p-[10px]'>{data?.travelDetails?.passengers}</p>
        </div>

        {/* Number of Luggage Field */}
        <div className='flex flex-col gap-1'>
          <label>Number of Luggage:</label>
          <p className='border-[1px] border-black rounded-md p-[10px]'>{data?.travelDetails?.luggage}</p>
        </div>

        {/* Date Field */}
        <div className='flex flex-col gap-1'>
          <label>Date:</label>
          <p className='border-[1px] border-black rounded-md p-[10px]'>{data?.travelDetails?.date}</p>
        </div>

        {/* Pickup Time Field */}
        <div className='flex flex-col gap-1'>
          <label>Pickup Time:</label>
          <p className='border-[1px] border-black rounded-md p-[10px]'>{data?.travelDetails?.pickupTime}</p>
        </div>

        {/* Trip Type */}
        <div className={`'flex flex-col gap-1 ${data.transfer === 'airport' ? "md:col-span-2" : ""}`}>
          <label>Arrival or Departure:</label>
          <p className='border-[1px] border-black rounded-md p-[10px]'>{data?.travelDetails?.tripType}</p>
        </div>

        {/* Flight or Train Number Fields */}
        {data.transfer === 'airport' && (
          <>
            <div className='flex flex-col gap-1'>
              <label>Flight Number:</label>
              <p className='border-[1px] border-black rounded-md p-[10px]'>{data?.travelDetails?.flightNumber}</p>
            </div>
            <div className='flex flex-col gap-1'>
              <label>Terminal Number:</label>
              <p className='border-[1px] border-black rounded-md p-[10px]'>{data?.travelDetails?.terminalNumber}</p>
            </div>
          </>
        )}
        {data.transfer === 'station' && (
          <div className='flex flex-col gap-1'>
            <label>Train Number:</label>
            <p className='border-[1px] border-black rounded-md p-[10px]'>{data?.travelDetails?.trainNumber}</p>
          </div>
        )}

        {/* Pickup Address Field */}
        <div className='flex flex-col gap-1'>
          <label>Pickup Address:</label>
          <p className='border-[1px] border-black rounded-md p-[10px]'>{data?.travelDetails?.pickupAddress}</p>
        </div>

        {/* Dropoff Address Field */}
        <div className='flex flex-col gap-1'>
          <label>Dropoff Address:</label>
          <p className='border-[1px] border-black rounded-md p-[10px]'>{data?.travelDetails?.dropoffAddress}</p>
        </div>
      </div>
    </>
  );
}

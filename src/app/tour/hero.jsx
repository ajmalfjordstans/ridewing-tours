'use client'
import { Button } from '@material-tailwind/react';
import Image from 'next/image';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineBody,
  Typography,
} from "@material-tailwind/react";
import Enquiry from '@/components/forms/enquiry-form';
import { addItem } from '@/components/store/cartSlice';
import AddToCart from '@/components/forms/add-to-cart-form';

export default function TourHero({ data }) {
  const [showForm, setShowForm] = useState(false);
  const [bookingPackage, setBookingPackage] = useState(data)
  // console.log(data);
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.items);
  const addToCartHandler = (newData) => {
    const itemExists = cart.find(item => item.id === bookingPackage.id);
    if (!itemExists) {
      console.log("Added to cart");
      dispatch(addItem(newData));
    } else {
      alert("Item already exists");
    }
  }
  return (
    <>
      <div className=' w-full flex flex-col '>
        <p className='font-bold text-[26px] md:text-[32px] leading-[42px]'>{bookingPackage?.name}</p>
        <div className='h-[1px] w-full bg-[#00000080] mt-[20px]'>
          <div className='h-[3px] w-[320px] bg-[#E4322C] translate-y-[-1.5px]'></div>
        </div>
      </div>
      <div className='grid grid-cols-4 gap-5 mt-[60px]'>
        <Image src={bookingPackage?.gallery[0]} height={700} width={800} alt='image' className='col-span-3 row-span-3 h-full w-full max-h-[81vh] object-cover' />
        <Image src={bookingPackage?.gallery[1]} height={700} width={800} alt='image' className='h-full w-full object-cover max-h-[25vh]' />
        <Image src={bookingPackage?.gallery[2]} height={700} width={800} alt='image' className='h-full w-full object-cover max-h-[25vh]' />
        <Image src={bookingPackage?.gallery[3]} height={700} width={800} alt='image' className='h-full w-full object-cover max-h-[25vh]' />
      </div>
      <div className='w-full flex flex-col md:flex-row justify-between mt-[20px] border-[1px] border-[#212529] p-[15px] bg-[#EFEFEF] gap-[20px]'>
        <div>
          <div className='flex flex-wrap gap-3 text-[16px]'>
            <p>Starts in {bookingPackage?.startLocation}</p>
            <p>|</p><p>Available {bookingPackage?.availability}</p>
          </div>
          <div className='flex gap-4 flex-wrap mt-[12px] font-bold text-[15px] leading-[18px]'>
            {bookingPackage?.details.guidedTour &&
              <div>
                <p>Guided Tour</p>
              </div>
            }
            {bookingPackage?.details.entranceFeeIncluded &&
              <div>
                <p>Entrance Fee Included</p>
              </div>
            }
            {bookingPackage?.details.expertTourGuide &&
              <div>
                <p>Expert Tour Guide</p>
              </div>
            }
            {bookingPackage?.details.airconditionedTransport &&
              <div>
                <p>Air Conditioned Transport</p>
              </div>
            }

            <div className='flex items-center gap-2 '>
              <Image src={'/logo/stopwatch.svg'} height={100} width={20} alt='stopwatch' className='h-[20px] w-[20px]' />
              <p>{bookingPackage?.details.hours} Hour Tour</p>
            </div>
            <div className='flex items-center gap-2 '>
              <Image src={'/logo/language.svg'} height={100} width={100} alt='stopwatch' className='h-[20px] w-[30px]' />
              {bookingPackage?.details?.language?.map((lang, id) => {
                return (
                  <p key={id}>{lang}</p>
                )
              })}
            </div>
          </div>
        </div>
        <div>
          <div className='flex items-end gap-2'>
            <p className='font-bold text-[20px] text-custom-red'>From</p>
            <p className='font-bold text-[30px]'>{bookingPackage?.currency}{bookingPackage?.price}</p>
          </div>
          <Button
            className='bg-custom-red mt-[5px] capitalize'
            fullWidth
            onClick={() => { setShowForm(true) }}
          // onClick={addToCartHandler}
          >Add to Cart</Button>
        </div>
      </div>

      {/* Description */}
      <div className='flex items-center mt-[60px] gap-[20px] flex-wrap lg:flex-nowrap'>
        <div className='lg:max-w-[65%]'>
          <p className='text-[30px] font-medium'>Description</p>
          <div className='flex flex-col gap-3 mt-[20px] text-[16px]'>
            {bookingPackage?.description.map((desc, id) => {
              return (
                <p key={id}>{desc}</p>
              )
            })}
          </div>
        </div>
        <div className='bg-[#F8F9F9] p-[15px]'>
          <p className='text-[24px]'>Tour Highlights</p>
          <div className='flex flex-col gap-2 mt-[24px]'>
            {bookingPackage?.highlight.map((highlight, id) => {
              return (
                <div key={id} className='flex gap-3 '>
                  <div className='h-[36px] w-[36px] bg-custom-red rounded-full flex justify-center items-center text-white text-[20px]'>{id}</div>
                  <p className='text-[16px] w-[85%]'>{highlight}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      {/* Timeline */}
      <div className=' w-full flex flex-col mt-[40px]'>
        <p className='font-bold text-[26px] md:text-[32px] leading-[42px]'>{bookingPackage?.name} Itinerary</p>
        <div className='h-[1px] w-full bg-[#00000080] mt-[20px]'>
          <div className='h-[3px] w-[320px] bg-[#E4322C] translate-y-[-1.5px]'></div>
        </div>

        <div className=" text-[16px] leading-[36px] max-w-[700px] mx-auto mt-[70px]">
          {bookingPackage?.itinerary &&
            <Timeline>
              {bookingPackage?.itinerary?.start &&
                <TimelineItem>
                  <TimelineConnector />
                  <TimelineHeader>
                    <TimelineIcon className="p-2 bg-custom-red">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="#FFF" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
                      </svg>
                    </TimelineIcon>

                  </TimelineHeader>
                  <TimelineBody className="pb-1 translate-y-[-45px]">
                    <p color="blue-gray">
                      {bookingPackage?.itinerary?.start}
                    </p>
                  </TimelineBody>
                </TimelineItem>
              }
              {bookingPackage?.itinerary?.itinerary.map((stop, id) => {
                return (
                  <TimelineItem key={id} >
                    <TimelineConnector />
                    <TimelineHeader>
                      <TimelineIcon className="p-2 bg-custom-red">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>

                      </TimelineIcon>

                    </TimelineHeader>
                    <TimelineBody className="pb-1 translate-y-[-45px]">
                      <p color="blue-gray">
                        {stop}
                      </p>
                    </TimelineBody>
                  </TimelineItem>
                )
              })}
              {bookingPackage?.itinerary?.end &&
                <TimelineItem>
                  <TimelineHeader>
                    <TimelineIcon className="p-2 bg-custom-red">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="#FFF" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
                      </svg>
                    </TimelineIcon>

                  </TimelineHeader>
                  <TimelineBody className='translate-y-[-45px]'>
                    <p color="blue-gray">
                      {bookingPackage?.itinerary?.end}
                    </p>
                  </TimelineBody>
                </TimelineItem>
              }
            </Timeline>
          }
        </div>


      </div>
      {/* Pricing */}
      <div className='w-full flex flex-col items-center mt-[70px]'>
        <div className='max-w-[738px] w-full flex flex-col items-center'>
          <p className='font-bold text-[32px] leading-[42px]'>Pricing</p>
          <div className='h-[1px] w-full bg-[#00000080] flex justify-center mt-[20px]'>
            <div className='h-[3px] w-[180px] bg-[#E4322C] translate-y-[-1.5px]'></div>
          </div>
        </div>
        <div className='w-full flex flex-col justify-between gap-[15px] mt-[60px] border-[1px] border-[#212529] px-[40px] py-[20px] bg-[#EFEFEF] font-bold text-[15px]'>
          {bookingPackage?.pricing.map((price, id) => {
            return (
              <div className='grid lg:grid-cols-2 gap-3' key={id}>
                <p className='max-w-[500px]'>{price.name}</p>
                <div className='flex flex-col gap-5'>
                  {price.passengers &&
                    <div className='grid grid-cols-2 items-center'>
                      <p className='font-medium'>Passengers</p>
                      <p>{price.passengers.price}</p>
                    </div>
                  }
                  {price.adults &&
                    <div className='grid grid-cols-2'>
                      <p className='font-medium'>Adults</p>
                      <p>{price.adults.price}</p>
                    </div>
                  }
                  {price.children &&
                    <div className='grid grid-cols-2'>
                      <p className='font-medium'>{price.children.age}</p>
                      <p>{price.children.price}</p>
                    </div>
                  }
                </div>
              </div>
            )
          })}
        </div>

        {/* Included and Excluded */}
        <div className='w-full flex flex-col items-center mt-[40px]'>
          <div className='grid md:grid-cols-2 w-full gap-[30px]'>
            {/* Includes */}
            <div className='flex flex-col md:items-center'>
              <p className='font-semibold text-[18px] leading-[18px]'>
                Includes
              </p>
              <div className='flex flex-col gap-3 mt-[20px]'>
                {bookingPackage?.otherDetails.includes.map((include, id) => {
                  return (
                    <div className='flex items-center gap-2' key={id}>
                      <div className='h-[25px] w-[25px] bg-green-800 flex justify-center items-center rounded-full'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#FFF" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                        </svg>
                      </div>
                      <p>{include}</p>
                    </div>
                  )
                })}
              </div>
            </div>
            {/* Excludes */}
            <div className='flex flex-col md:items-center'>
              <p className='font-semibold text-[18px] leading-[18px]'>
                Excludes
              </p>
              <div className='flex flex-col gap-3 mt-[20px]'>
                {bookingPackage?.otherDetails.excludes.map((exclude, id) => {
                  return (
                    <div className='flex items-center gap-2' key={id}>
                      <div className='h-[25px] w-[25px] bg-red-800 flex justify-center items-center rounded-full'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#FFF" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
                        </svg>

                      </div>
                      <p>{exclude}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

        </div>
      </div >
      <div className='w-full max-w-[900px] flex flex-col gap-7 mx-auto mt-[30px]'>
        {/* What to bring */}
        {bookingPackage?.otherDetails?.bring &&
          <div >
            <p className='font-bold text-[20px]'>What to Bring</p>
            <div>
              <ul className='list-disc pl-[15px] font-medium mt-[15px]'>
                {bookingPackage?.otherDetails?.bring.map((bring, id) => {
                  return (
                    <li key={id}>{bring}</li>
                  )
                })}
              </ul>
            </div>
          </div>
        }

        {bookingPackage?.otherDetails?.information &&
          <div>
            <p className='font-bold text-[20px]'>Essential Information</p>
            <div>
              <ul className='list-disc pl-[15px] font-medium mt-[15px]'>
                {bookingPackage?.otherDetails?.information.map((information, id) => {
                  return (
                    <li key={id}>{information}</li>
                  )
                })}
              </ul>
            </div>
          </div>
        }
        {bookingPackage?.otherDetails?.cancellationPolicy &&
          <div>
            <div>
              <p className='font-bold text-[20px]'>Cancellation Policy</p>
              <div>
                <ul className='list-disc pl-[15px] font-medium mt-[15px]'>
                  <li >{bookingPackage?.otherDetails?.cancellationPolicy}</li>
                </ul>
              </div>
            </div>
          </div>
        }
      </div>
      {showForm &&
        <div className='fixed top-0 left-0 bg-black bg-opacity-50 h-[100dvh] w-[100vw] z-[300] backdrop-blur-sm flex justify-center items-center px-[5%] '>
          <div className='bg-[beige] p-[20px] rounded-md w-full max-w-[500px]'>
            <div className='flex w-full justify-end'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:cursor-pointer" onClick={() => setShowForm(false)}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </div>
            {/* <Enquiry tourPackage={bookingPackage.name} /> */}
            <AddToCart data={bookingPackage} setData={setBookingPackage} addToCartHandler={addToCartHandler} setShowForm={setShowForm} />
          </div>
        </div>
      }
    </ >
  )
}

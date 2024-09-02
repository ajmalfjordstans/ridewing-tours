import { Button, Timeline, TimelineBody, TimelineConnector, TimelineHeader, TimelineIcon, TimelineItem } from '@material-tailwind/react';
import React from 'react'

export default function Itineraries({ values, setValues }) {

  const handleAddStop = () => {
    const updatedItinerary = [...values.itinerary.itinerary, ""]; // Add an empty string or default value
    setValues({ ...values, itinerary: { ...values.itinerary, itinerary: updatedItinerary } });
  };

  const handleRemoveStop = (id) => {
    const updatedItinerary = values.itinerary.itinerary.filter((_, index) => index !== id);
    setValues({ ...values, itinerary: { ...values.itinerary, itinerary: updatedItinerary } });
  };

  const handleChangeStop = (e, id) => {
    const updatedItinerary = values.itinerary.itinerary.map((stop, index) => index === id ? e.target.value : stop);
    setValues({ ...values, itinerary: { ...values.itinerary, itinerary: updatedItinerary } });
  };
  return (
    <div className=" text-[16px] leading-[36px] max-w-[700px] mx-auto my-[70px]">
      {values?.itinerary &&
        <Timeline>
          {/* {values?.itinerary?.start && */}
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
                <div className='flex gap-2 flex-wrap'>
                  <textarea
                    type="text"
                    value={values?.itinerary?.start}
                    onChange={(e) => setValues({ ...values, itinerary: { ...values.itinerary, start: e.target.value } })}
                    className='p-[5px] border-[2px] border-black rounded-[5px] w-[500px] leading-[24px]'
                  />
                </div>
              </TimelineBody>
            </TimelineItem>
          {/* } */}
          <div className='flex flex-col gap-2 w-full'>
            {values?.itinerary?.itinerary.map((stop, id) => (
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
                <TimelineBody className="pb-1 translate-y-[-45px] w-full">
                  <div className='flex gap-2 flex-wrap'>
                    <textarea
                      type="text"
                      value={stop}
                      onChange={(e) => handleChangeStop(e, id)}
                      className='p-[5px] border-[2px] border-black rounded-[5px] w-[500px] leading-[24px]'
                    />
                    <button
                      onClick={() => handleRemoveStop(id)}
                      className="border border-red-500 px-2 rounded-md text-red-500">Remove</button>
                  </div>
                </TimelineBody>
              </TimelineItem>

            ))}
            <Button
              onClick={handleAddStop}
              className="border border-green-500 px-2 rounded-md bg-green-500 mt-2">Add Stop</Button>
          </div>
          {/* {values?.itinerary?.end && */}
            <TimelineItem>
              <TimelineHeader>
                <TimelineIcon className="p-2 bg-custom-red mt-[20px]">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#FFF" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
                  </svg>
                </TimelineIcon>

              </TimelineHeader>
              <TimelineBody className='translate-y-[-45px]'>
                <div className='flex gap-2 flex-wrap'>
                  <textarea
                    type="text"
                    value={values?.itinerary?.end}
                    onChange={(e) => setValues({ ...values, itinerary: { ...values.itinerary, end: e.target.value } })}
                    className='p-[5px] border-[2px] border-black rounded-[5px] w-[500px] leading-[24px]'
                  />
                </div>
              </TimelineBody>
            </TimelineItem>
          {/* } */}
        </Timeline>
      }
    </div>
  )
}

'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export default function PackageCard({ data, setSubtotal, subTotal }) {
  const [count, setCount] = useState(4);
  const [currentPackage, setCurrentPackage] = useState(data);
  const [includeTicket, setIncludeTicket] = useState(data?.details.entranceFeeIncluded);
  const [addedTickets, setAddedTickets] = useState([]);
  const [includeGuide, setIncludeGuide] = useState(data?.details.guidedTour);
  const [guideLanguage, setGuideLanguage] = useState('');
  const [hoursGuideNeeded, setHoursGuideNeeded] = useState(1);
  const guideLanguages = ['English', 'Chinese', 'Japanese'];

  const increment = () => setCount(count + 1);
  const decrement = () => {
    if (count > 4) {
      setCount(count - 1);
    }
  }

  useEffect(() => {
    setSubtotal(currentPackage?.price * count)
  }, [count])

  useEffect(() => {
    console.log(data);
    console.log(data.price, count);
  }, [])
  return (
    <>
      <div className='w-full border border-solid border-[rgba(255, 218, 50, 0.5)] shadow-[0px_-1px_6.9px_0px_rgba(0,0,0,0.25)] rounded-[20px] mt-[60px] flex flex-col overflow-hidden '>
        <div className='h-[270px] flex'>
          <div className='h-[100%] w-[30%]'>
            <Image src={currentPackage?.gallery[0]} height={800} width={800} alt='package image' className='h-full w-full object-cover' />
          </div>
          <div className='w-[70%] flex flex-col justify-center'>
            <div className='p-[15px]'>
              <p className='font-[600] text-[24px] leading-[42px]'>{currentPackage.name}</p>
              <div className='grid grid-cols-3 w-full'>
                <div>
                  <p className='text-[15px]'>{currentPackage.startLocation}</p>
                </div>
                <div className="flex items-center justify-center h-full gap-2 mx-auto">
                  <button
                    className=" h-[32px] w-[32px] border-[1px] font-[500] text-[22px] shadow hover:bg-gray-200 rounded-[5px] "
                    onClick={increment}
                  >
                    +
                  </button>
                  <span className="text-[20px] px-2">{count}</span>
                  <button
                    className=" h-[32px] w-[32px] border-[1px] font-[500] text-[22px] shadow hover:bg-gray-200 rounded-[5px]"
                    onClick={decrement}
                  >
                    -
                  </button>
                </div>
                <div className='flex flex-col items-end'>
                  <p className='text-[20px] leading-[42px] whitespace-nowrap'>{currentPackage.currency + " " + currentPackage?.price * count}</p>
                  <p className=' text-[10px] whitespace-nowrap'>Minimum 4 people required</p>
                </div>
              </div>
            </div>
            {currentPackage.includeGuide && (
              <>
                <div className='bg-secondary h-[1px] w-full'></div>
                <div className='p-[15px]'>
                  <div className='flex items-center gap-3'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                      <label className='block'>
                        <div className='flex items-center gap-3'>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="18"
                            fill="none"
                            viewBox="0 0 14 18"
                          >
                            <path
                              fill="#1C1B1F"
                              d="M4.5 11H6V8h4.5L9 6l1.5-2h-6v7zM0 18V2C0 1.45.196.98.588.587A1.926 1.926 0 012 0h10c.55 0 1.02.196 1.412.588C13.804.979 14 1.45 14 2v16l-7-3-7 3zm2-3.05l5-2.15 5 2.15V2H2v12.95z"
                            ></path>
                          </svg>
                          <span>Guide Language:</span>
                        </div>
                        <select
                          value={guideLanguage}
                          onChange={(e) => setGuideLanguage(e.target.value)}
                          className='p-[10px] border-[2px] border-black rounded-[5px] w-full my-[10px]'
                        >
                          <option value='' disabled>Select a language</option>
                          {guideLanguages.map((lang, index) => (
                            <option key={index} value={lang}>{lang}</option>
                          ))}
                        </select>
                      </label>
                      <label className='block'>
                        <span>Hours guide needed</span>
                        <input type="number"
                          className='p-[10px] border-[2px] border-black rounded-[5px] w-full my-[10px]'
                          min={"1"}
                          value={hoursGuideNeeded}
                          onChange={(e) => setHoursGuideNeeded(e.target.value)}
                        />
                      </label>
                    </div>

                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        {(Array.isArray(currentPackage.additionalTickets) && currentPackage.additionalTickets.length !== 0) &&
          <>
            <div className='bg-secondary h-[1px] w-full'></div>
            <div className='p-[15px]'>
              <p className='text-[18px] opacity-[43%] text-center'>Additional Tickets</p>
              <table className='w-full mt-3'>
                {currentPackage.additionalTickets.map((ticket, id) => {
                  return (
                    <tr className='w-full justify-between' key={id}>
                      <td>{ticket.name}</td>
                      <td>04:30 -12:30</td>
                      <td>{ticket.price}</td>
                      <td>
                        <button
                          className=" h-[32px] w-[32px] border-[1px] font-[500] text-[22px] shadow hover:bg-gray-200 rounded-[5px]"
                          onClick={() => alert("under development")}
                        >
                          -
                        </button>
                      </td>
                    </tr>
                  )
                })}

              </table>
            </div>
          </>
        }
      </div >
    </>
  )
}

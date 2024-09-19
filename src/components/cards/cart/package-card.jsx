'use client'
import { updateItem } from '@/components/store/cartSlice';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function PackageCard({ data, setSubtotal, subTotal }) {
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart.items);
  const currency = useSelector(state => state.user.currency)
  const [count, setCount] = useState(data?.travelDetails?.passengers ? data?.travelDetails?.passengers : 1);
  const [currentPackage, setCurrentPackage] = useState(data);
  const [includeTicket, setIncludeTicket] = useState(data?.details?.entranceFeeIncluded);
  const [addedTickets, setAddedTickets] = useState([]);
  const [includeGuide, setIncludeGuide] = useState(data?.details?.guidedTour);
  const [guideLanguage, setGuideLanguage] = useState(data?.details?.guideLanguage);
  const [hoursGuideNeeded, setHoursGuideNeeded] = useState(1);
  const guideLanguages = ['English', 'Chinese', 'Japanese'];

  const increment = () => setCount(count + 1);
  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  }

  // Remove ticket from card
  const handleRemoveTicket = (ticket) => {
    const updatedTickets = data.additionalTickets.filter(t => t.name !== ticket.name);
    const updatedData = {
      ...data,
      additionalTickets: updatedTickets
    };
    dispatch(updateItem(updatedData));
  }

  const updateCartHandler = (newData) => {
    const itemExists = cart.find(item => item.id === newData.id);
    // console.log(newData);
    if (itemExists) {
      // console.log("Item already exists. Updating cart...");
      dispatch(updateItem({ id: newData.id, ...newData }));
    } else {
      console.log("Added to cart");
      dispatch(addItem({ ...newData, status: "pending" }));
    }
  }

  function convertTo12HourFormat(time) {
    let [hours, minutes] = time.split(':');
    hours = parseInt(hours);

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    return `${hours}:${minutes} ${ampm}`;
  }

  const convertTimestampToDate = (timestamp) => {
    if (timestamp && timestamp.seconds) {
      return new Date(timestamp.seconds * 1000);
    }
    return null;
  };

  function formatTo12HourTime(dateString) {
    const date = new Date(dateString);

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;

    const strTime = `${hours}:${minutesStr} ${ampm}`;
    return strTime;
  }


  // Calculate price of package with no of passengers
  const calculateTotal = (booking) => {
    let total = 0;

    const noOfPassengers = Number(booking.noOfPassengers); // Ensure noOfPassengers is a number
    const price = Number(booking.price); // Ensure price is a number
    const bulkPrice = Number(booking.bulkPrice); // Ensure price is a number

    if (booking?.type === 'package') {
      const itemPrice = noOfPassengers < 4 ? price * 4 : bulkPrice ? bulkPrice * noOfPassengers : price * noOfPassengers;
      total += itemPrice;
    } else if (booking?.type === 'guide') {
      total += price;
    } else if (booking.transfer === 'airport' || booking.transfer === 'station') {
      const itemPrice = price * noOfPassengers;
      total += itemPrice;
    }
    return total;
  }
  // Calculate prices of additional tickets
  const calculateAdditionalTicketsTotal = (booking) => {
    let total = 0;

    const item = booking;

    if (item.additionalTickets && item.additionalTickets.length > 0) {
      const ticketsTotal = item.additionalTickets.reduce((ticketTotal, ticket) => {
        return ticketTotal + (ticket.price * item.noOfPassengers);
      }, 0);

      total += ticketsTotal;
    }


    return total;
  }
  // calculate subtotal
  const calculateSubtotal = () => {
    const total = calculateTotal(data) + calculateAdditionalTicketsTotal(data)
    return total
  }

  useEffect(() => {
    // setSubtotal(currentPackage?.price * count)
    const totalCalculated = calculateSubtotal()
    console.log(totalCalculated);
    updateCartHandler({ ...data, noOfPassengers: count, total: totalCalculated })
  }, [count])

  useEffect(() => {
    // console.log(data);
  }, [])
  return (
    <>
      <div className='w-full border border-solid border-[rgba(255, 218, 50, 0.5)] shadow-[0px_-1px_6.9px_0px_rgba(0,0,0,0.25)] rounded-[20px] mt-[60px] flex flex-col overflow-hidden '>
        <div className='h-[270px] flex'>
          <div className='h-[100%] w-[30%]'>
            {data.type === "package" ?
              <Image src={data?.gallery[0]} height={800} width={800} alt='package image' className='h-full w-full object-cover' />
              :
              <Image src={data?.image ? data?.image : "/images/background/image-template.jpg"} height={800} width={800} alt='package image' className='h-full w-full object-cover' />
            }
          </div>
          <div className='w-[70%] flex flex-col justify-center'>
            <div className='p-[15px]'>
              <p className='text-[14px] capitalize text-[#ADADAD]'>{data?.type || data?.transfer}</p>
              <p className='font-[600] text-[24px] leading-[42px]'>{data.name}</p>
              <div className='grid grid-cols-3 w-full'>
                <div>
                  <p className='text-[15px]'>{data.startLocation}</p>
                  {data.type === "package" &&
                    <p className='text-[15px] mt-1'>{data.date.toLocaleDateString()}</p>
                  }
                  {data?.transfer === "airport" && <>
                    <p>Flight Number: {data?.travelDetails?.flightNumber}</p>
                    <p className='text-[15px] mt-1'>{data.travelDetails.date}</p>
                  </>}
                  {data?.transfer === "station" && <>
                    <p>Station Number: {data?.travelDetails?.trainNumber}</p>
                    <p className='text-[15px] mt-1'>{data.travelDetails.date}</p>
                  </>}
                  {(data?.type === "guide" || data?.type == 'custom') && <>
                    <p>Meeting Time: {convertTo12HourFormat(data?.travelDetails?.meetingTime)}</p>
                    <p>Meeting Point: {data?.travelDetails?.meetingPoint}</p>
                    <p className='text-[15px] mt-1'>{data.travelDetails.date}</p>
                  </>}

                </div>
                {data?.type != 'custom' &&
                  <div className="flex items-center justify-center h-full gap-2 mx-auto">
                    <button
                      className=" h-[32px] w-[32px] border-[1px] font-[500] text-[22px] shadow hover:bg-gray-200 rounded-[5px] "
                      onClick={(data?.type == 'guide' && count == 20) ? "" : increment}
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
                }
                <div className='flex flex-col items-end'>
                  {data.type === "package" &&
                    <>
                      <p className='text-[22px] leading-[42px] whitespace-nowrap'>
                        {data.currency + " " + (data?.noOfPassengers < 4 ? data?.price * 4 : data?.bulkPrice ? data?.bulkPrice * data?.noOfPassengers : data?.price * data?.noOfPassengers).toLocaleString()}
                      </p>
                      <p className=' text-[10px] whitespace-nowrap'>Minimum 4 people required</p>
                    </>
                  }
                  {(data?.transfer == 'airport' || data?.transfer == 'station') &&
                    <>
                      <p className='text-[22px] leading-[42px] whitespace-nowrap'>{currency.sign + "" + data?.price * data?.noOfPassengers}</p>
                      {/* <p className='text-[22px] leading-[42px] whitespace-nowrap'>
                        {data.currency + " " + (data?.noOfPassengers < 4 ? data?.price * 4 : data?.bulkPrice ? data?.bulkPrice * data?.noOfPassengers : data?.price * data?.noOfPassengers).toLocaleString()}
                      </p>*/}
                      <p className=' text-[10px] whitespace-nowrap'>Minimum 4 people required</p> 
                    </>
                  }
                  {(data?.type == 'guide') &&
                    <>
                      <p className='text-[22px] leading-[42px] whitespace-nowrap'>{currency.sign + "" + data?.price}</p>
                      <p className=' text-[10px] whitespace-nowrap'>Maximum 20 people</p>
                    </>
                  }
                </div>
              </div>
            </div>
            {(data?.transfer == 'airport' || data?.transfer == 'station') &&
              <>
                <div className='bg-secondary h-[1px] w-full'></div>
                <div className='p-[15px] grid grid-cols-2 '>
                  <p className='capitalize'>{data?.travelDetails?.tripType}</p>
                  <p>Pickup Time: {convertTo12HourFormat(data?.travelDetails?.pickupTime)}</p>
                </div>
              </>
            }
            {data?.type === "guide" &&
              <>
                <div className='bg-secondary h-[1px] w-full'></div>
                <div className='p-[15px] grid grid-cols-2 '>
                  <p className='capitalize'>Hours: {data?.travelDetails?.hours}</p>
                  <p className='capitalize'>Language: {data?.travelDetails?.language}</p>
                </div>
              </>
            }
            {data.includeGuide && (
              <>
                <div className='bg-secondary h-[1px] w-full'></div>
                <div className='p-[15px]'>
                  <div className='flex items-center gap-3'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-3 text-[14px]'>
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
                          className='p-[10px] border-[1px] border-black rounded-[5px] w-full my-[10px]'
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
                          className='p-[10px] border-[1px] border-black rounded-[5px] w-full my-[10px]'
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
        {(Array.isArray(data.additionalTickets) && data.additionalTickets.length !== 0) &&
          <>
            <div className='bg-secondary h-[1px] w-full'></div>
            <div className='p-[15px]'>
              <p className='text-[18px] opacity-[43%] text-center'>Additional Tickets</p>
              <table className='w-full mt-3'>
                <thead className='bg-[#D9D9D9] h-[40px]'>
                  <tr>
                    <th className='pl-[10px]'>Ticket Name</th>
                    <th>Opening Hours</th>
                    {/* <th>No. of tickets</th> */}
                    <th>Ticket price</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody className=''>
                  {data.additionalTickets.map((ticket, id) => {
                    return (
                      <tr className='w-full justify-between' key={id}>
                        <td className='pl-[10px]'>{ticket.name}</td>
                        <td className='flex gap-2'>
                          {ticket?.opening &&
                            <p>{formatTo12HourTime(convertTimestampToDate(ticket?.opening))}</p>
                          }
                          <p>-</p>
                          {ticket?.closing &&
                            <p>{formatTo12HourTime(convertTimestampToDate(ticket?.closing))}</p>
                          }
                        </td>
                        {/* <td>{data.noOfPassengers}</td> */}
                        <td>{data.currency + " " + ticket.price}</td>
                        <td className='flex justify-center py-1'>
                          <button
                            className=" h-[32px] w-[32px] border-[1px] font-[500] text-[22px] shadow hover:bg-gray-200 rounded-[5px]"
                            onClick={() => handleRemoveTicket(ticket)}
                          >
                            -
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
                <tfoot className='mt-3'>
                  <tr>
                    <td></td>
                    <td></td>
                    <td className='bg-[#D9D9D9] py-1 text-center'>Total {data.noOfPassengers * data.additionalTickets.length} nos</td>
                    {/* <td>{data.noOfPassengers * data.additionalTickets.length}</td> */}
                    {/* Calculate sum of products of ticket and no of passengers */}
                    <td className='bg-[#D9D9D9] py-1 text-center font-[600]'>
                      {data.currency + " " + data.additionalTickets.reduce((total, ticket) => {
                        return total + ticket.price * data.noOfPassengers;
                      }, 0)}
                    </td>
                  </tr>
                </tfoot>
              </table>
              {calculateSubtotal() != 0 &&
                <div className='flex items-center justify-end gap-2'>
                  <p>With Additional Ticket</p>
                  <p className='font-bold text-[22px] text-right'> {currency.sign + " " + calculateSubtotal().toLocaleString()}</p>
                </div>
              }
            </div>
          </>
        }

      </div >
    </>
  )
}

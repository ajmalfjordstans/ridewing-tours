import Image from 'next/image';
import React from 'react'
import { useSelector } from 'react-redux';

export default function BookingCard({ booking, status }) {
  const currency = useSelector(state => state.user.currency)

  // Calculate price of package with no of passengers
  const calculateTotal = (booking) => {
    let total = 0;

    const noOfPassengers = Number(booking.noOfPassengers); // Ensure noOfPassengers is a number
    const price = Number(booking.price); // Ensure price is a number

    if (booking?.type === 'package') {
      const itemPrice = noOfPassengers < 4 ? price * 4 : price * noOfPassengers;
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
    return calculateTotal(booking) + calculateAdditionalTicketsTotal(booking)
  }

  function formatDateFromTimestamp({ seconds, nanoseconds }) {
    // Convert the seconds to milliseconds
    const date = new Date(seconds * 1000);

    // Extract date components
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based, so add 1
    const year = date.getFullYear();

    // Format the date
    const formattedDate = `${month}/${day}/${year}`;

    return formattedDate;
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

  // Example usage
  console.log(booking);

  return (
    <>
      {!booking ?
        <div>No Booking</div>
        :
        <div className={`w-full shadow-md rounded-[20px] p-[20px] border-l-[40px] ${status === 'confirmed' ? 'border-l-green-500' : status === 'pending' ? 'border-l-yellow-500' : status === 'ongoing' ? 'border-l-blue-500' : 'border-l-red-500'}`}>
          <div className='flex justify-between'>
            <div>
              <p className='text-[14px] capitalize text-[#ADADAD]'>{booking?.type || booking?.transfer}</p>
              <p className='text-[28px] font-bold'>{booking.name}</p>
            </div>
            {booking?.date ?
              <p className='text-[16px] font-bold text-[#C9C8C8]'>{formatDateFromTimestamp(booking.date)}</p>
              :
              <p className='text-[16px] font-bold text-[#C9C8C8]'>{booking.travelDetails.date}</p>
            }
          </div>
          <div className='h-[1px] w-full bg-black my-[20px]'></div>
          <div className='flex justify-between'>
            <div className='w-full'>
              <div className='flex justify-between'>
                <p className='font-bold text-[26px]'> {currency.sign + " " + calculateSubtotal().toLocaleString()}</p>
                {booking.includeGuide && (
                  <>
                    <div className='flex gap-3 text-[14px] pr-[10px]'>
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
                          <span>Guide Language: {booking.guideLanguage}</span>
                        </div>
                      </label>
                      <p>|</p>
                      <label className='block'>
                        <span>Guide Hours: {booking.hoursGuideNeeded}</span>
                      </label>
                    </div>
                  </>
                )}
              </div>
              <div className='w-full max-w-[600px] bg-[#F8F8F8] rounded-[15px] mt-[20px]'>
                {(Array.isArray(booking.additionalTickets) && booking.additionalTickets.length !== 0) &&
                  <>
                    <div className='p-[15px]'>
                      <p className='text-[18px] opacity-[43%] text-center'>Additional Tickets</p>
                      <table className='w-full mt-3'>
                        <thead className='bg-[#D9D9D9] h-[40px]'>
                          <tr>
                            <th className='pl-[10px]'>Ticket Name</th>
                            {/* <th>Opening Hours</th> */}
                            {/* <th>No. of tickets</th> */}
                            <th>Ticket price</th>

                          </tr>
                        </thead>
                        <tbody className=''>
                          {booking.additionalTickets.map((ticket, id) => {
                            return (
                              <tr className='w-full justify-between' key={id}>
                                <td className='text-center'>{ticket.name}</td>
                                {/* <td className='justify-center flex gap-2'>
                                {ticket?.opening &&
                                  <p>{formatTo12HourTime(convertTimestampToDate(ticket?.opening))}</p>
                                }
                                <p>-</p>
                                {ticket?.closing &&
                                  <p>{formatTo12HourTime(convertTimestampToDate(ticket?.closing))}</p>
                                }
                              </td> */}
                                <td className='text-center'>{booking.currency + " " + ticket.price}</td>

                              </tr>
                            )
                          })}
                        </tbody>
                        <tfoot className='mt-3'>
                          <tr>
                            <td className='bg-[#D9D9D9] py-1 text-center'>Total {booking.noOfPassengers * booking.additionalTickets.length} nos</td>
                            <td className='bg-[#D9D9D9] py-1 text-center font-[600]'>
                              {booking.currency + " " + booking.additionalTickets.reduce((total, ticket) => {
                                return total + ticket.price * booking.noOfPassengers;
                              }, 0)}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </>
                }
              </div>
              {(booking.transfer == 'airport' || booking.transfer == 'station') &&
                <div className='grid grid-cols-2'>
                  <div className='flex'>
                    {booking.travelDetails.flightNumber &&
                      <p>Flight no: {booking.travelDetails.flightNumber}</p>
                    }
                    {booking.travelDetails.trainNumber &&
                      <p>Station no: {booking.travelDetails.trainNumber}</p>
                    }
                  </div>
                  <div className='flex'>
                    <p>{booking.travelDetails.tripType}</p>
                  </div>
                  <div className='flex gap-2'>
                    <p>No. of passengers: </p>
                    <p>{booking.travelDetails.passengers}</p>
                  </div>
                  <div className='flex gap-2'>
                    <p>Pickup Time: </p>
                    <p>{booking.travelDetails.pickupTime}</p>
                  </div>
                  <div className='flex gap-2'>
                    <p>Pickup: </p>
                    <p>{booking.travelDetails.pickupAddress}</p>
                  </div>
                  <div className='flex gap-2'>
                    <p>Dropoff: </p>
                    <p>{booking.travelDetails.dropoffAddress}</p>
                  </div>
                  {/* dropoffAddress pickupAddress pickupTime tripType passengers flightNumber */}
                </div>
              }
              {(booking.type == 'guide' || booking.type == 'custom') &&
                <div className='grid grid-cols-2'>

                </div>
              }
            </div>
            <div className='h-[100px] w-[15%] rounded-[15px] overflow-hidden'>
              {booking.type === "package" ?
                <Image src={booking?.gallery[0]} height={800} width={800} alt='package image' className='h-full w-full object-cover' />
                :
                <Image src={booking?.image ? booking?.image : "/images/background/image-template.jpg"} height={800} width={800} alt='package image' className='h-full w-full object-cover' />
              }
            </div>
          </div>

        </div>
      }
    </>
  )
}

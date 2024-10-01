import Image from 'next/image'
import React from 'react'
import TransferDetails from './category-details/transfer'
import TransferGuideView from './category-details/guide'
import CustomPackageView from './category-details/custom'

export default function ViewBooking({ setShowBookingDetails, viewBooking, formatDateFromTimestamp }) {
  return (
    <div className="fixed top-0 left-0 h-[100vh] w-[100vw] bg-black bg-opacity-80 z-10 flex justify-center items-center">
      <div className="bg-white max-h-[90vh] max-w-[90vw] rounded-[15px] p-[20px] overflow-y-scroll no-scrollbar flex flex-col">
        <div className="flex justify-end">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:cursor-pointer"
            onClick={() => setShowBookingDetails(false)}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </div>
        <div>
          <p className="text-[26px] font-[600]">Customer Details</p>
          <div className='flex justify-between'>
            <div>
              <p>Name: {viewBooking.displayName}</p>
              <p>Email: {viewBooking.email}</p>
              {viewBooking.contact &&
                <p>Contact: {viewBooking.contact}</p>
              }
              <p>User ID: {viewBooking.userId}</p>
            </div>
            <div className='flex flex-col items-end'>
              <Image src={viewBooking.photo} width={100} height={100} alt={viewBooking.displayName} className='h-[70px] w-[70px]' />
              <p className='text-[24px] font-[600]'>{viewBooking.currency}{viewBooking.total}</p>
            </div>
          </div>
          <p className="text-[26px] font-[600]">Booking Details</p>
          <div>
            {viewBooking.type == 'package' &&
              <>
                <p className='capitalize'>Category: {viewBooking.type || viewBooking.transfer}</p>
                <p>Name: {viewBooking.name}</p>
                <p>Total Passengers: {viewBooking.noOfPassengers}</p>
                <p>Date: {viewBooking.date ? formatDateFromTimestamp(viewBooking.date) : viewBooking.travelDetails.date}</p>
                <p>Meeting Point: {viewBooking.meetingPoint}</p>
                <p>Upto 4 Price: {viewBooking.currency}{viewBooking.price}</p>
                <p>From 4 Price: {viewBooking.currency}{viewBooking.bulkPrice}</p>
              </>
            }
            {/* {console.log(viewBooking.transfer, viewBooking.type)} */}
            {viewBooking.transfer == 'airport' &&
              <>
                <TransferDetails data={viewBooking} />
              </>
            }
            {viewBooking.transfer == 'station' &&
              <>
                <TransferDetails data={viewBooking} />
              </>
            }
            {viewBooking.type == 'guide' &&
              <>
                <TransferGuideView data={viewBooking} />
              </>
            }
            {viewBooking.type == 'custom' &&
              <>
                <CustomPackageView data={viewBooking} />
              </>
            }
          </div>
          {(Array.isArray(viewBooking.additionalTickets) && viewBooking.additionalTickets.length !== 0) &&
            <>
              <div className='bg-secondary h-[1px] w-full'></div>
              <div className='p-[15px]'>
                <p className='text-[18px] opacity-[43%] text-center'>Additional Tickets</p>
                <table className='w-full mt-3'>
                  <thead className='bg-[#D9D9D9] h-[40px] text-left'>
                    <tr>
                      <th className='pl-[10px]'>Ticket Name</th>
                      <th>No. of tickets</th>
                      <th>Ticket price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody className=''>
                    {viewBooking.additionalTickets.map((ticket, id) => {
                      return (
                        <tr className='w-full justify-between' key={id}>
                          <td className='pl-[10px]'>{ticket.name}</td>
                          <td className='flex gap-2'>
                            <div className='flex flex-col items-center'>
                              <div className="flex items-center justify-center h-full gap-2 mx-auto">
                                <span className="text-[20px] px-2">{ticket.ticketCount}</span>
                              </div>
                            </div>
                          </td>
                          <td>{viewBooking.currency + " " + ticket.price}</td>
                          <td>{viewBooking.currency + " " + ticket.price * ticket.ticketCount}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                  <tfoot className='mt-3'>
                    <tr>
                      <td></td>
                      <td></td>
                      <td className='bg-[#D9D9D9] py-1 text-center'>Total</td>
                      <td className='bg-[#D9D9D9] py-1 text-center font-[600]'>
                        {viewBooking.currency + " " + viewBooking.additionalTickets.reduce((total, ticket) => {
                          return total + ticket.price * ticket.ticketCount
                        }, 0)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </>
          }
        </div>
        {console.log(viewBooking)}
      </div>
    </div>
  )
}

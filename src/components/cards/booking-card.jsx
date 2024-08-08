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
            {booking?.date &&
              <p className='text-[16px] font-bold text-[#C9C8C8]'>{formatDateFromTimestamp(booking.date)}</p>
            }
          </div>
          <div className='h-[1px] w-full bg-black my-[20px]'></div>
          <div className='flex justify-between'>
            <p className='font-bold text-[26px]'> {currency.sign + " " + calculateSubtotal().toLocaleString()}</p>
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

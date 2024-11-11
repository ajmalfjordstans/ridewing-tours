import { Button } from '@material-tailwind/react';
import Image from 'next/image';
import React, { useState } from 'react';
import DatepickerComponent from '../services/datepicker';
import dayjs from 'dayjs';
import { formatDate, generateBookingId } from '../services/utils';

export default function AddToCart({ data, setData, addToCartHandler, setShowForm }) {
  const [includeTicket, setIncludeTicket] = useState(data?.details.entranceFeeIncluded);
  const [addedTickets, setAddedTickets] = useState([]);
  const [includeGuide, setIncludeGuide] = useState(data?.details.guidedTour);
  const [guideLanguage, setGuideLanguage] = useState(data?.details?.language[0]);
  const [hoursGuideNeeded, setHoursGuideNeeded] = useState(data.details.hours);
  const [date, setDate] = useState(null)
  const [contact, setContact] = useState(null)
  const [meetingPoint, setMeetingPoint] = useState(null)

  // function generateBookingId() {
  //   const timestamp = Date.now().toString(36); // Convert the current timestamp to a base-36 string
  //   const randomNum = Math.random().toString(36).substring(2, 10); // Generate a random base-36 string
  //   return `BK-${timestamp}-${randomNum}`; // Combine them with a prefix
  // }

  const buttonHandler = () => {
    // console.log("add to cart form button called");

    if (date == null) {
      alert("Pick a date to continue")
      // } 
      // else if (includeGuide && guideLanguage == "") {
      //   alert("Select Guide Language")
    }
    else if (contact == null) {
      alert("Fill contact field")
    }
    else if (meetingPoint == null) {
      alert("Fill meeting point field")
    } else {
      const cartData = {
        ...data,
        bookingId: generateBookingId(),
        date: formatDate(date),
        contact: contact,
        meetingPoint: meetingPoint,
        includeTicket,
        includeGuide,
        noOfPassengers: 1,
        additionalTickets: addedTickets,
        guideLanguage: includeGuide ? guideLanguage : null,
        hoursGuideNeeded: hoursGuideNeeded,
        type: "package"
      };
      // console.log(cartData)
      addToCartHandler(cartData);
      // console.log(cartData);

      setShowForm(false);
    }
  }

  const handleAdditionalTicketsChange = (ticket) => {
    // If additional tickets choosen, turn includeTicket to true else false
    if (addedTickets.length === 0) {
      setIncludeTicket(true)
    } else {
      setIncludeTicket(false)
    }
    // Check if the ticket is already added
    const isTicketAdded = addedTickets.some((t) => t.name === ticket.name);

    // Check or uncheck additional tickets
    if (!isTicketAdded) {
      const serializedTicket = {
        ...ticket,
        opening: convertTimestampToDate(ticket.opening),
        closing: convertTimestampToDate(ticket.closing),
      };
      setAddedTickets([...addedTickets, { ...ticket, ticketCount: 1 }]);
    } else {
      setAddedTickets(addedTickets.filter((t) => t.name !== ticket.name));
    }
  }

  const convertTimestampToDate = (timestamp) => {
    if (timestamp && timestamp.seconds) {
      return new Date(timestamp.seconds * 1000);
    }
    return null;
  };

  function convertTimestampTo12HourTime(timestamp) {
    const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return date.toLocaleTimeString('en-US', options);
  }

  return (
    <div className='max-h-[80vh] overflow-y-scroll no-scrollbar'>
      <div className='flex flex-col gap-1 mt-4 w-full'>
        <div className='flex flex-wrap lg:flex-nowrap gap-2'>
          <label className='flex flex-col w-full'>
            <span className='ml-2 font-[600] text-center'>Enter Travel Date</span>
            <div className='mx-auto mt-1'>
              <DatepickerComponent date={date} setDate={setDate} min={dayjs().add(2, 'day')} className='min-w-[300px]' />
            </div>
          </label>
          <label className='flex flex-col w-full'>
            <span className='ml-2 font-[600] text-center'>Contact Number</span>
            <div className='mt-1'>
              <input type="tel"
                className='p-[15px] bg-inherit border-black border-[1px] outline-none w-full rounded-[10px] min-w-[280px]'
                onChange={(e) => setContact(e.target.value)}
                placeholder='Enter with country code'
                required
              />
            </div>
          </label>
        </div>
        <label className='flex flex-col '>
          <span className='ml-2 font-[600] text-center'>Meeting Point</span>
          <div className='mt-1'>
            <textarea type="text"
              className='p-[15px] bg-inherit border-black border-[1px] outline-none w-full rounded-[10px] min-w-[280px] min-h-[50px]'
              onChange={(e) => setMeetingPoint(e.target.value)}
              placeholder=''
              required
            />
          </div>
        </label>

        {(Array.isArray(data?.tickets) && data?.tickets.length != 0) && (
          <>
            <label className='flex items-center'>
              <span className='ml-2 font-[600]'>Additional Tickets</span>
            </label>
            {(data?.tickets?.map((ticket, id) => {
              return (
                <div key={id} className='flex gap-2 pl-[10px] bg-[#F8F8F8] items-center p-2 overflow-x-scroll'>
                  <label className='flex items-center gap-2'>
                    <input
                      type='checkbox'
                      checked={addedTickets.some((t) => t.name === ticket.name)}
                      onChange={() => handleAdditionalTicketsChange(ticket)}
                    />
                    <div className='flex flex-col md:flex-row gap-1'>
                      <div className='h-[80px] min-w-[120px]'>
                        <Image src={ticket.image ? ticket.image : '/images/background/image-template.jpg'} height={500} width={500} alt='ticket image' className='h-full w-full max-w-[320px] object-cover' unoptimized />
                      </div>
                      <div>
                        <div className='flex gap-2 w-[300px] justify-between'>
                          <p>{ticket?.name}</p>
                          <p>{ticket?.price} / person</p>
                        </div>
                        <div>
                          <p className='text-[#ADADAD] mt-2'>Opening Hours</p>
                          <div className='grid grid-cols-2 mt-1'>
                            {ticket?.opening &&
                              <p>Opening: {
                                typeof ticket?.opening === 'object' && ticket.opening?.seconds
                                  ? convertTimestampTo12HourTime(ticket.opening)  // Convert if timestamp object
                                  : ticket?.opening  // Display as-is if it's already a string
                              }</p>

                            }
                            {ticket?.closing &&
                              <p>Opening: {
                                typeof ticket?.closing === 'object' && ticket?.closing?.seconds
                                  ? convertTimestampTo12HourTime(ticket?.closing)  // Convert if timestamp object
                                  : ticket?.closing  // Display as-is if it's already a string
                              }</p>
                            }
                          </div>
                        </div>
                        <p className="text-[12px] text-ellipsis line-clamp-3 h-[55px]">
                          {ticket?.description}
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
              )
            }))}
          </>
        )

        }
        {/* Need guide */}
        {/* <label className='flex items-center'>
          <input
            type='checkbox'
            checked={includeGuide}
            onChange={() => setIncludeGuide(!includeGuide)}
          />
          <span className='ml-2 font-[600]'>Need Guide?</span>
        </label> */}
        {includeGuide && (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
            {/* <label className='block'>
              <span className='text-[14px]'>Guide Language:</span>
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
            </label> */}
            {/* <label className='block'>
              <span className='text-[14px]'>Hours guide needed</span>
              <input type="number"
                className='p-[10px] border-[1px] border-black rounded-[5px] w-full my-[10px]'
                disabled
                min={"1"}
                value={hoursGuideNeeded}
                onChange={(e) => setHoursGuideNeeded(e.target.value)}
              />
              <select
                value={guideLanguage}
                className='p-[10px] border-[2px] border-black rounded-[5px] w-full my-[10px]'
              >
                <option value='' disabled>Select a language</option>
                {guideLanguages.map((lang, index) => (
                  <option key={index} value={lang}>{lang}</option>
                ))}
              </select>
            </label> */}
          </div>
        )}
      </div>
      <Button
        className='bg-custom-red mt-[15px] capitalize font-[400]'
        fullWidth
        onClick={buttonHandler}
      >
        Add to Cart
      </Button>
    </div>
  );
}

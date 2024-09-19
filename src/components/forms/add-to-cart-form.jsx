import { Button } from '@material-tailwind/react';
import Image from 'next/image';
import React, { useState } from 'react';
import DatepickerComponent from '../services/datepicker';
import dayjs from 'dayjs';

export default function AddToCart({ data, setData, addToCartHandler, setShowForm }) {
  const [includeTicket, setIncludeTicket] = useState(data?.details.entranceFeeIncluded);
  const [addedTickets, setAddedTickets] = useState([]);
  const [includeGuide, setIncludeGuide] = useState(data?.details.guidedTour);
  const [guideLanguage, setGuideLanguage] = useState('');
  const [hoursGuideNeeded, setHoursGuideNeeded] = useState(data.details.hours);
  const [date, setDate] = useState(null)
  const guideLanguages = ['English', 'Chinese', 'Japanese']; // predefined guide languages
console.log(data);

  function generateBookingId() {
    const timestamp = Date.now().toString(36); // Convert the current timestamp to a base-36 string
    const randomNum = Math.random().toString(36).substring(2, 10); // Generate a random base-36 string
    return `BK-${timestamp}-${randomNum}`; // Combine them with a prefix
  }

  const buttonHandler = () => {
    if (date == null) {
      alert("Pick a date to continue")
    } else if (includeGuide && guideLanguage == "") {
      alert("Select Guide Language")
    } else {
      const cartData = {
        ...data,
        bookingId: generateBookingId(),
        date: dayjs(date).toDate(),
        includeTicket,
        includeGuide,
        additionalTickets: addedTickets,
        guideLanguage: includeGuide ? guideLanguage : null,
        hoursGuideNeeded: hoursGuideNeeded,
        type: "package"
      };
      // console.log(cartData)
      addToCartHandler(cartData);
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
      setAddedTickets([...addedTickets, ticket]);
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

  const serializeTimestamp = (timestamp) => {
    return timestamp.toDate().toISOString();
  };
  return (
    <div className='max-h-[80vh] overflow-y-scroll'>
      <div className='flex flex-col gap-2 mt-4'>
        <label className='flex flex-col '>
          <span className='ml-2 font-[600] text-center'>Enter Travel Date</span>
          <div className='mx-auto mt-3'>
            <DatepickerComponent date={date} setDate={setDate} min={dayjs()} />
          </div>
        </label>

        {(Array.isArray(data?.tickets) && data?.tickets.length != 0) && (
          <>
            <label className='flex items-center'>
              <span className='ml-2 font-[600]'>Additional Tickets</span>
            </label>
            {(data?.tickets?.map((ticket, id) => {
              return (
                <div key={id} className='flex gap-2 pl-[10px] bg-[#F8F8F8] items-center pt-2'>
                  <label className='flex items-center gap-2'>
                    <input
                      type='checkbox'
                      checked={addedTickets.some((t) => t.name === ticket.name)}
                      onChange={() => handleAdditionalTicketsChange(ticket)}
                    />
                    <div className='h-[80px] min-w-[120px]'>
                      <Image src={ticket.image ? ticket.image : '/images/background/image-template.jpg'} height={500} width={500} alt='ticket image' className='h-full w-full object-cover' />
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
                            <p>Opening: {formatTo12HourTime(convertTimestampToDate(ticket?.opening))}</p>
                          }
                          {ticket?.closing &&
                            <p>Closing: {formatTo12HourTime(convertTimestampToDate(ticket?.closing))}</p>
                          }
                        </div>
                      </div>
                      <p className="text-[12px] text-ellipsis line-clamp-3 h-[55px]">
                        {ticket?.description}
                      </p>
                    </div>
                  </label>
                </div>
              )
            }))}
          </>
        )

        }
        <label className='flex items-center'>
          <input
            type='checkbox'
            checked={includeGuide}
            onChange={() => setIncludeGuide(!includeGuide)}
          />
          <span className='ml-2 font-[600]'>Need Guide?</span>
        </label>
        {includeGuide && (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
            <label className='block'>
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
            </label>
            <label className='block'>
              <span className='text-[14px]'>Hours guide needed</span>
              <input type="number"
                className='p-[10px] border-[1px] border-black rounded-[5px] w-full my-[10px]'
                disabled
                min={"1"}
                value={hoursGuideNeeded}
                onChange={(e) => setHoursGuideNeeded(e.target.value)}
              />
              {/* <select
                value={guideLanguage}
                className='p-[10px] border-[2px] border-black rounded-[5px] w-full my-[10px]'
              >
                <option value='' disabled>Select a language</option>
                {guideLanguages.map((lang, index) => (
                  <option key={index} value={lang}>{lang}</option>
                ))}
              </select> */}
            </label>
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

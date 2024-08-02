import { Button } from '@material-tailwind/react';
import Image from 'next/image';
import React, { useState } from 'react';

export default function AddToCart({ data, setData, addToCartHandler, setShowForm }) {
  const [includeTicket, setIncludeTicket] = useState(data?.details.entranceFeeIncluded);
  const [addedTickets, setAddedTickets] = useState([]);
  const [includeGuide, setIncludeGuide] = useState(data?.details.guidedTour);
  const [guideLanguage, setGuideLanguage] = useState('');
  const [hoursGuideNeeded, setHoursGuideNeeded] = useState(1);
  const guideLanguages = ['English', 'Chinese', 'Japanese']; // predefined guide languages

  const buttonHandler = () => {
    const cartData = {
      ...data,
      includeTicket,
      includeGuide,
      additionalTickets: addedTickets,
      guideLanguage: includeGuide ? guideLanguage : null,
      hoursGuideNeeded: hoursGuideNeeded
    };
    console.log(cartData)
    addToCartHandler(cartData);
    setShowForm(false);
  };

  const handleAdditionalTicketsChange = (ticket) => {
    setIncludeTicket((prev) => ({
      ...prev,
      [ticket.name]: !prev[ticket.name]
    }));

    if (!includeTicket[ticket.name]) {
      setAddedTickets([...addedTickets, ticket]);
    } else {
      setAddedTickets(addedTickets.filter((t) => t.name !== ticket.name));
    }
  };
  return (
    <div>
      <div className='flex flex-col gap-2 mt-4'>
        <label className='flex items-center'>
          <input
            type='checkbox'
            checked={includeTicket}
            onChange={() => setIncludeTicket(!includeTicket)}
          />
          <span className='ml-2'>Admission Ticket</span>
        </label>
        {includeTicket &&
          (Array.isArray(data?.tickets) && data?.tickets?.map((ticket, id) => {
            return (
              <div key={id} className='flex gap-2 pl-[10px]'>
                <label className='flex items-center gap-2'>
                  <input
                    type='checkbox'
                    checked={!!includeTicket[ticket.name]}
                    onChange={() => handleAdditionalTicketsChange(ticket)}
                  />
                  <Image src={'/images/background/image-template.jpg'} height={500} width={500} alt='ticket image' className='h-[80px] w-[120px] object-cover' />
                  <div>
                    <div className='flex gap-2 w-[300px] justify-between'>
                      <p>{ticket.name}</p>
                      <p>{ticket.price} / person</p>
                    </div>
                    <p className="text-[12px] text-ellipsis line-clamp-3 h-[55px]">
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
                    </p>

                  </div>
                </label>
              </div>
            )
          }))
        }
        <label className='flex items-center'>
          <input
            type='checkbox'
            checked={includeGuide}
            onChange={() => setIncludeGuide(!includeGuide)}
          />
          <span className='ml-2'>Guide</span>
        </label>
        {includeGuide && (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
            <label className='block'>
              <span>Guide Language:</span>
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

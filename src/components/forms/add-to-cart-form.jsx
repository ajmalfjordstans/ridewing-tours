import { Button } from '@material-tailwind/react';
import React, { useState } from 'react';

export default function AddToCart({ data, setData, addToCartHandler, setShowForm }) {
  const [includeTicket, setIncludeTicket] = useState(data?.details.entranceFeeIncluded);
  const [addedTickets, setAddedTickets] = useState([]);
  const [includeGuide, setIncludeGuide] = useState(data?.details.guidedTour);
  const [guideLanguage, setGuideLanguage] = useState('');
  const guideLanguages = ['English', 'Chinese', 'Japanese']; // predefined guide languages

  const buttonHandler = () => {
    const cartData = {
      ...data,
      includeTicket,
      includeGuide,
      additionalTickets: addedTickets,
      guideLanguage: includeGuide ? guideLanguage : null,
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
      <p className='text-center font-[600] text-[22px] pb-[20px]'>{data.name}</p>
      <p>Starts in {data.startLocation}</p>
      <p>Available {data.availability}</p>
      <p>Duration {data.details.hours} Hours</p>
      <div className='flex gap-2'>
        <p>Languages: </p>
        {data.details.language.map((lang, id) => (
          <p key={id}>{lang}</p>
        ))}
      </div>
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
                <label className='flex items-center'>
                  <input
                    type='checkbox'
                    checked={!!includeTicket[ticket.name]}
                    onChange={() => handleAdditionalTicketsChange(ticket)}
                  />
                  <div className='flex gap-2 w-[200px] justify-between ml-2'>
                    <p>{ticket.name}</p>
                    <p>{ticket.price}</p>
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
          <div>
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
          </div>
        )}
      </div>
      <Button
        className='bg-custom-red mt-[15px] capitalize'
        fullWidth
        onClick={buttonHandler}
      >
        Add to Cart
      </Button>
    </div>
  );
}

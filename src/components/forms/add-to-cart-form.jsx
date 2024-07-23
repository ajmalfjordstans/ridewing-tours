import { Button } from '@material-tailwind/react';
import React, { useState } from 'react';

export default function AddToCart({ data, setData, addToCartHandler, setShowForm }) {
  const [includeTicket, setIncludeTicket] = useState(data?.details.entranceFeeIncluded);
  const [includeGuide, setIncludeGuide] = useState(data?.details.guidedTour);
  const [guideLanguage, setGuideLanguage] = useState('');
  // console.log(data);
  const guideLanguages = ['English', 'Chinese', 'Japanese']; // predefined guide languages

  const buttonHandler = () => {
    const cartData = {
      ...data,
      includeTicket,
      includeGuide,
      guideLanguage: includeGuide ? guideLanguage : null,
    };
    // console.log(cartData)
    addToCartHandler(cartData);
    setShowForm(false);
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

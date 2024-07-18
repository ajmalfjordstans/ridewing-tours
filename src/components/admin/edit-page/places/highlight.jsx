import { Button } from '@material-tailwind/react';
import React from 'react'

export default function Highlight({ setValues, values }) {
  const handleRemoveHighlight = (indexToRemove) => {
    const updatedHighlight = values.highlight.filter((_, index) => index !== indexToRemove);
    setValues({ ...values, highlight: updatedHighlight });
  };

  const handleAddHighlight = () => {
    const updatedHighlight = [...values.highlight, ""];
    setValues({ ...values, highlight: updatedHighlight });
  };

  const handleChangeHighlight = (e, id) => {
    const updatedHighlight = [...values.highlight];
    updatedHighlight[id] = e.target.value;
    setValues({ ...values, highlight: updatedHighlight });
  };
  return (
    <div className='bg-[#F8F9F9] p-[15px] w-[70%] mt-[40px]'>
      <p className='text-[24px]'>Tour Highlights</p>
      <div className='flex flex-col gap-2 mt-[24px]'>
        {values?.highlight.map((highlight, id) => (
          <div key={id} className='flex gap-3'>
            <div className='h-[36px] w-[36px] bg-custom-red rounded-full flex justify-center items-center text-white text-[20px]'>{id}</div>
            <textarea
              type="text"
              value={highlight}
              onChange={(e) => handleChangeHighlight(e, id)}
              className='p-[5px] border-[2px] border-black rounded-[5px] w-[85%]'
            />
            <button onClick={() => handleRemoveHighlight(id)} className="border border-red-500 px-2 rounded-md text-red-500">Remove</button>
          </div>
        ))}
        <Button onClick={handleAddHighlight} className="border border-green-500 px-2 rounded-md bg-green-500 mt-2">Add Highlight</Button>
      </div>
    </div>
  )
}

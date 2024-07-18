import { Button } from '@material-tailwind/react';
import React from 'react'

export default function Description({ setValues, values }) {
  const handleRemoveDescription = (indexToRemove) => {
    const updatedDescription = values.description.filter((_, index) => index !== indexToRemove);
    setValues({ ...values, description: updatedDescription });
  };

  const handleAddDescription = () => {
    const updatedDescription = [...values.description, ""];
    setValues({ ...values, description: updatedDescription });
  };
  return (
    <div className='flex flex-col gap-3 mt-[20px] text-[16px]'>
      {values?.description.map((desc, id) => (
        <div key={id} className="flex gap-2 items-center">
          <textarea
            type="text"
            value={desc}
            onChange={(e) => {
              const updatedDescription = [...values.description];
              updatedDescription[id] = e.target.value;
              setValues({ ...values, description: updatedDescription });
            }}
            className='p-[5px] border-[2px] border-black rounded-[5px] w-full min-h-[250px]'
          />
          <button
            onClick={() => handleRemoveDescription(id)}
            className="border border-red-500 px-2 rounded-md text-red-500">Remove</button>
        </div>
      ))}
      <Button
        onClick={handleAddDescription}
        className="border border-green-500 px-2 rounded-md bg-green-500 mt-2">Add Description</Button>
    </div>
  )
}

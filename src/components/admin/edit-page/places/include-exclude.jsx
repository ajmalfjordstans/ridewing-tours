import { Button } from '@material-tailwind/react';
import React from 'react';

const IncludesExcludesComponent = ({ values, setValues }) => {

  const handleChangeInclude = (e, id) => {
    const updatedIncludes = values.otherDetails.includes.map((include, index) => {
      if (index === id) {
        return e.target.value;
      }
      return include;
    });
    setValues({ ...values, otherDetails: { ...values.otherDetails, includes: updatedIncludes } });
  };

  const handleAddInclude = () => {
    setValues({ ...values, otherDetails: { ...values.otherDetails, includes: [...values.otherDetails.includes, ''] } });
  };

  const handleRemoveInclude = (id) => {
    const updatedIncludes = values.otherDetails.includes.filter((_, index) => index !== id);
    setValues({ ...values, otherDetails: { ...values.otherDetails, includes: updatedIncludes } });
  };

  const handleChangeExclude = (e, id) => {
    const updatedExcludes = values.otherDetails.excludes.map((exclude, index) => {
      if (index === id) {
        return e.target.value;
      }
      return exclude;
    });
    setValues({ ...values, otherDetails: { ...values.otherDetails, excludes: updatedExcludes } });
  };

  const handleAddExclude = () => {
    setValues({ ...values, otherDetails: { ...values.otherDetails, excludes: [...values.otherDetails.excludes, ''] } });
  };

  const handleRemoveExclude = (id) => {
    const updatedExcludes = values.otherDetails.excludes.filter((_, index) => index !== id);
    setValues({ ...values, otherDetails: { ...values.otherDetails, excludes: updatedExcludes } });
  };
  return (
    <div className='w-full flex flex-col items-center mt-[40px]'>
      <div className='grid md:grid-cols-2 w-full gap-[30px]'>
        {/* Includes */}
        <div className='flex flex-col md:items-center'>
          <p className='font-semibold text-[18px] leading-[18px]'>
            Includes
          </p>
          <div className='flex flex-col gap-3 mt-[20px]'>
            {values?.otherDetails?.includes.map((include, id) => {
              return (
                <div className='flex items-center gap-2' key={id}>
                  <div className='h-[25px] w-[25px] bg-green-800 flex justify-center items-center rounded-full'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#FFF" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={include}
                    onChange={(e) => handleChangeInclude(e, id)}
                    className='border border-gray-300 p-1 rounded'
                  />
                  <button
                    onClick={() => handleRemoveInclude(id)}
                    className="border border-red-500 px-2 rounded-md text-red-500">Remove</button>
                </div>
              )
            })}
            <Button
              onClick={handleAddInclude}
              className="border border-green-500 px-2 rounded-md bg-green-500 mt-2">Add Include</Button>
          </div>
        </div>
        {/* Excludes */}
        <div className='flex flex-col md:items-center'>
          <p className='font-semibold text-[18px] leading-[18px]'>
            Excludes
          </p>
          <div className='flex flex-col gap-3 mt-[20px]'>
            {values?.otherDetails?.excludes.map((exclude, id) => {
              return (
                <div className='flex items-center gap-2' key={id}>
                  <div className='h-[25px] w-[25px] bg-red-800 flex justify-center items-center rounded-full'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#FFF" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={exclude}
                    onChange={(e) => handleChangeExclude(e, id)}
                    className='border border-gray-300 p-1 rounded'
                  />
                  <button
                    onClick={() => handleRemoveExclude(id)}
                    className="border border-red-500 px-2 rounded-md text-red-500">Remove</button>
                </div>
              )
            })}
            <Button
              onClick={handleAddExclude}
              className="border border-green-500 px-2 rounded-md bg-green-500 mt-2">Add Exclude</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncludesExcludesComponent;

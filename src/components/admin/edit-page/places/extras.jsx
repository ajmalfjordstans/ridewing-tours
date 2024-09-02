import { Button } from '@material-tailwind/react';
import React from 'react';

const Extras = ({ values, setValues }) => {

  const handleChangeBring = (e, id) => {
    const updatedBring = values.otherDetails.bring.map((item, index) => {
      if (index === id) {
        return e.target.value;
      }
      return item;
    });
    setValues({ ...values, otherDetails: { ...values.otherDetails, bring: updatedBring } });
  };

  const handleAddBring = () => {
    setValues({ ...values, otherDetails: { ...values.otherDetails, bring: [...values.otherDetails.bring, ''] } });
  };

  const handleRemoveBring = (id) => {
    const updatedBring = values.otherDetails.bring.filter((_, index) => index !== id);
    setValues({ ...values, otherDetails: { ...values.otherDetails, bring: updatedBring } });
  };

  const handleChangeInformation = (e, id) => {
    const updatedInformation = values.otherDetails.information.map((item, index) => {
      if (index === id) {
        return e.target.value;
      }
      return item;
    });
    setValues({ ...values, otherDetails: { ...values.otherDetails, information: updatedInformation } });
  };

  const handleAddInformation = () => {
    setValues(prevValues => ({
      ...prevValues,
      otherDetails: {
        ...prevValues.otherDetails,
        information: [...(prevValues.otherDetails.information || []), '']
      }
    }));
  };

  const handleRemoveInformation = (id) => {
    const updatedInformation = values.otherDetails.information.filter((_, index) => index !== id);
    setValues({ ...values, otherDetails: { ...values.otherDetails, information: updatedInformation } });
  };

  const handleChangeCancellationPolicy = (e) => {
    setValues({ ...values, otherDetails: { ...values.otherDetails, cancellationPolicy: e.target.value } });
  };

  return (
    <div className='w-full max-w-[900px] flex flex-col gap-7 mx-auto mt-[30px]'>
      {/* What to bring */}
      {/* {values?.otherDetails?.bring && */}
      <div>
        <p className='font-bold text-[20px]'>What to Bring</p>
        <div>
          <ul className='list-disc pl-[15px] font-medium mt-[15px] flex flex-col gap-2'>
            {values?.otherDetails?.bring.map((bring, id) => {
              return (
                <li key={id} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={bring}
                    onChange={(e) => handleChangeBring(e, id)}
                    className='border border-gray-300 p-1 rounded'
                  />
                  <button
                    onClick={() => handleRemoveBring(id)}
                    className="border border-red-500 px-2 rounded-md text-red-500">Remove</button>
                </li>
              )
            })}
          </ul>
          <Button
            onClick={handleAddBring}
            className="border border-green-500 px-2 rounded-md bg-green-500 mt-2">Add Item</Button>
        </div>
      </div>
      {/* } */}

      {/* Essential Information */}
      {/* {values?.otherDetails?.information && */}
      <div>
        <p className='font-bold text-[20px]'>Essential Information</p>
        <div>
          {values?.otherDetails?.information &&
            <ul className='list-disc pl-[15px] font-medium mt-[15px]'>
              {values?.otherDetails?.information.map((information, id) => {
                return (
                  <li key={id} className="flex items-center gap-2 mt-2">
                    <textarea
                      type="text"
                      value={information}
                      onChange={(e) => handleChangeInformation(e, id)}
                      className='border border-gray-300 p-1 rounded w-full h-[150px]'
                    />
                    <button
                      onClick={() => handleRemoveInformation(id)}
                      className="border border-red-500 px-2 rounded-md text-red-500">Remove</button>
                  </li>
                )
              })}
            </ul>
          }
          <Button
            onClick={handleAddInformation}
            className="border border-green-500 px-2 rounded-md bg-green-500 mt-2">Add Information</Button>
        </div>
      </div>

      {/* Cancellation Policy */}
      {/* {values?.otherDetails?.cancellationPolicy && */}
      <div>
        <p className='font-bold text-[20px]'>Cancellation Policy</p>
        <div>
          <textarea
            type="text"
            value={values.otherDetails.cancellationPolicy}
            onChange={handleChangeCancellationPolicy}
            className='border border-gray-300 p-1 rounded w-full h-[150px]'
          />
        </div>
      </div>
      {/* } */}
    </div>
  );
};

export default Extras;

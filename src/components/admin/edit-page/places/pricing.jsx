import { Button } from '@material-tailwind/react';
import React, { useState } from 'react';
import AdmissionTickets from './admission-tickets';

const PricingComponent = ({ values, setValues }) => {
  const [ticket, setTicket] = useState([]);
  const handleChangePricing = (e, id, field, subField) => {
    const updatedPricing = values.pricing.map((price, index) => {
      if (index === id) {
        if (subField) {
          return {
            ...price,
            [field]: {
              ...price[field],
              [subField]: e.target.value
            }
          };
        }
        return {
          ...price,
          [field]: e.target.value
        };
      }
      return price;
    });
    setValues({ ...values, pricing: updatedPricing });
  };

  const handleAddPricing = () => {
    const newPricing = {
      name: '',
      passengers: { price: '' },
      adults: { price: '' },
      children: { age: '', price: '' }
    };
    setValues({ ...values, pricing: [...values.pricing, newPricing] });
  };

  const handleRemovePricing = (id) => {
    const updatedPricing = values.pricing.filter((_, index) => index !== id);
    setValues({ ...values, pricing: updatedPricing });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && ticket.trim() !== '') {
      setValues((prevValues) => ({
        ...prevValues,
        tickets: [...(prevValues.tickets || []), ticket.trim()]
      }));
      setTicket(""); // Clear the input field
    }
  };

  return (
    <>
      <div className='w-full'>
        {/* <div className='border-[2px] border-black rounded-[5px] p-[10px] mt-[60px]'>
          <p>Admission Tickets </p>
          <input
            type="text"
            className='outline-none bg-inherit w-[300px] mb-[10px] border-[1px] border-black p-[5px] rounded-[5px]'
            value={values?.tickets}
            onChange={(e) => setTicket({ ...ticket, ticket: e.target.value })}
            onKeyPress={handleKeyPress}
            placeholder='Admission ticket'
          />
          <div>
            <div className='flex  gap-2'>
              {values?.tickets?.map((ticket, index) => (
                <div className='border-[1px] border-black rounded-[3px] p-[5px] flex gap-1 items-center' key={index}>
                  <div>{ticket}</div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4 hover:cursor-pointer"
                    onClick={() => setValues({ ...values, tickets: values.tickets.filter(value => value !== ticket) })}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </div> */}
      </div>
      <div className='w-full flex flex-col justify-between gap-[15px] mt-[20px] border-[1px] border-[#212529] px-[40px] py-[20px] bg-[#EFEFEF] font-bold text-[15px]'>
        {values?.pricing.map((price, id) => {
          return (

            <div className='grid lg:grid-cols-2 gap-3' key={id}>
              <input
                type="text"
                value={price.name}
                onChange={(e) => handleChangePricing(e, id, 'name')}
                placeholder='From, To'
                className='max-w-[500px] border border-gray-300 p-1 rounded'
              />
              <div className='flex flex-col gap-5'>
                <div className='grid grid-cols-2 items-center'>
                  <p className='font-medium'>Passengers</p>
                  <input
                    type="text"
                    value={price?.passengers?.price}
                    onChange={(e) => handleChangePricing(e, id, 'passengers', 'price')}
                    className='border border-gray-300 p-1 rounded'
                  />
                </div>

                <div className='grid grid-cols-2'>
                  <p className='font-medium'>Adults</p>
                  <input
                    type="text"
                    value={price?.adults?.price}
                    placeholder='From Price Per Person'
                    onChange={(e) => handleChangePricing(e, id, 'adults', 'price')}
                    className='border border-gray-300 p-1 rounded'
                  />
                </div>

                <div className='grid grid-cols-2 gap-2'>
                  <input
                    type="text"
                    value={price?.children?.age}
                    onChange={(e) => handleChangePricing(e, id, 'children', 'age')}
                    placeholder='children age'
                    className='border border-gray-300 p-1 rounded'
                  />
                  <input
                    type="text"
                    value={price?.children?.price}
                    placeholder='From Price Per Child'
                    onChange={(e) => handleChangePricing(e, id, 'children', 'price')}
                    className='border border-gray-300 p-1 rounded'
                  />
                </div>
              </div>
              <Button
                onClick={() => handleRemovePricing(id)}
                className="border border-red-500 px-2 rounded-md bg-red-500 self-start mt-2">Remove</Button>
            </div>
          );
        })}
        <Button
          onClick={handleAddPricing}
          className="border border-green-500 px-2 rounded-md bg-green-500 mt-2">Add Pricing</Button>
      </div>
    </>
  );
};

export default PricingComponent;

'use client'
import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { setTransferBooking } from '../store/userSlice';
import { useRouter } from 'next/navigation';

export default function TransferForm({ data }) {
  const [submitting, setSubmitting] = useState(false)
  const dispatch = useDispatch();
  const router = useRouter();
  const cart = useSelector(state => state.cart.items);
  const selectedCountry = useSelector(state => state.user.selectedCountry);
  const addToCartHandler = (values) => {
    const itemExists = cart.find(item => item.id === data.id);
    if (!itemExists) {
      const newData = {
        ...data,
        travelDetails: values
      }
      console.log("Added to cart", newData);
      dispatch(setTransferBooking(newData));
      router.push(`booking?country=${selectedCountry}`, undefined, { shallow: true })
    } else {
      alert("Item already exists");
    }
  }
  const handleSubmit = (values, { resetForm }) => {
    try {
      setSubmitting(true);
      addToCartHandler(values)
      console.log('Form submitted successfully.');
      resetForm();
      setSubmitting(false);
    } catch (error) {
      console.error('Error submitting form.', error);
      setSubmitting(false);
    }
  }

  return (
    <>
      <Formik
        initialValues={{
          passengers: '3',
          luggage: '4',
          pickupTime: '12:00',
          tripType: 'arrival',
          pickupAddress: 'Pickup',
          dropoffAddress: 'DropOff',
          flightNumber: 'FCJ213'
        }}
        validate={(values) => {
          const errors = {};
          if (!values.passengers) {
            errors.passengers = 'Number of passengers is required';
          }
          if (!values.luggage) {
            errors.luggage = 'Number of luggage is required';
          }
          if (!values.pickupTime) {
            errors.pickupTime = 'Pickup time is required';
          }
          if (!values.pickupAddress) {
            errors.pickupAddress = 'Pickup address is required';
          }
          if (!values.dropoffAddress) {
            errors.dropoffAddress = 'Dropoff address is required';
          }
          if (!values.flightNumber) {
            errors.flightNumber = 'Flight number is required';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleSubmit(values, { resetForm });
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <p className='text-center text-[24px] font-[600]'>{data.name}</p>
            <div className='grid grid-cols-2 gap-2 pb-[40px]'>
              <div className='flex flex-col gap-1'>
                <label htmlFor="passengers">Number of Passengers*</label>
                <Field type="number" name="passengers" className='border-[2px] rounded-md p-[10px]' />
                <ErrorMessage name="passengers" component="div" className="text-[red] text-[12px]" />
              </div>
              <div className='flex flex-col gap-1'>
                <label htmlFor="luggage">Number of Luggage*</label>
                <Field type="number" name="luggage" className='border-[2px] rounded-md p-[10px]' />
                <ErrorMessage name="luggage" component="div" className="text-[red] text-[12px]" />
              </div>
              <div className='flex flex-col gap-1'>
                <label>Arrival or Departure*</label>
                <div className='flex gap-2'>
                  <label>
                    <Field type="radio" name="tripType" value="arrival" />
                    Arrival
                  </label>
                  <label>
                    <Field type="radio" name="tripType" value="departure" />
                    Departure
                  </label>
                </div>
                <ErrorMessage name="tripType" component="div" className="text-[red] text-[12px]" />
              </div>
              <div className='flex flex-col gap-1'>
                <label htmlFor="pickupTime">Pickup Time*</label>
                <Field type="time" name="pickupTime" className='border-[2px] rounded-md p-[10px]' />
                <ErrorMessage name="pickupTime" component="div" className="text-[red] text-[12px]" />
              </div>

              <div className='flex flex-col gap-1'>
                <label htmlFor="pickupAddress">Pickup Address*</label>
                <Field as="textarea" name="pickupAddress" className='border-[2px] rounded-md p-[10px]' />
                <ErrorMessage name="pickupAddress" component="div" className="text-[red] text-[12px]" />
              </div>
              <div className='flex flex-col gap-1'>
                <label htmlFor="dropoffAddress">Dropoff Address*</label>
                <Field as="textarea" name="dropoffAddress" className='border-[2px] rounded-md p-[10px]' />
                <ErrorMessage name="dropoffAddress" component="div" className="text-[red] text-[12px]" />
              </div>
              <div className='flex flex-col gap-1'>
                <label htmlFor="flightNumber">Flight Number*</label>
                <Field type="text" name="flightNumber" className='border-[2px] rounded-md p-[10px]' />
                <ErrorMessage name="flightNumber" component="div" className="text-[red] text-[12px]" />
              </div>
            </div>
            {submitting ?
              <div className='bg-gray-500 p-[10px] text-center text-white'>
                Submitting form...
              </div>
              :
              <button type="submit" disabled={isSubmitting} className='w-full bg-custom-red text-white font-[700] p-[10px]'>Book</button>
            }
          </Form>
        )}
      </Formik>
    </>
  )
}

'use client'
import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { setTransferBooking } from '../store/userSlice';
import { useRouter } from 'next/navigation';
import { addItem } from '../store/cartSlice';

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
      // console.log("Added to cart", newData);
      // dispatch(setTransferBooking(newData)); // TransferBooking state in user
      // router.push(`booking?country=${selectedCountry}`, undefined, { shallow: true })
      dispatch(addItem(newData));
      router.push(`/cart`)
    } else {
      alert("Item already exists");
    }
  }

  const handleSubmit = (values, { resetForm }) => {
    try {
      setSubmitting(true);
      addToCartHandler(values)
      // alert(JSON.stringify(values))
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
          name: "",
          contact: "",
          email: "",
          passengers: '',
          luggage: '',
          pickupTime: '',
          date: '',
          tripType: '',
          pickupAddress: '',
          dropoffAddress: '',
          flightNumber: ''
        }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = 'Name is required';
          }
          if (!values.contact) {
            errors.contact = 'Contact is required';
          }
          if (!values.email) {
            errors.email = 'Email is required';
          }
          if (!values.passengers) {
            errors.passengers = 'Number of passengers is required';
          }
          if (!values.luggage) {
            errors.luggage = 'Number of luggage is required';
          }
          if (!values.pickupTime) {
            errors.pickupTime = 'Pickup time is required';
          }
          if (!values.date) {
            errors.date = 'Date is required';
          }
          if (!values.pickupAddress) {
            errors.pickupAddress = 'Pickup address is required';
          }
          if (!values.dropoffAddress) {
            errors.dropoffAddress = 'Dropoff address is required';
          }
          // if (!values.flightNumber) {
          //   errors.flightNumber = 'Flight number is required';
          // }
          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleSubmit(values, { resetForm });
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <p className='text-center text-[24px] font-[400]'>{data.name}</p>
            <div className='w-full h-[1px] my-[20px] bg-black'></div>
            <div className='grid grid-cols-2 gap-2 pb-[40px]'>
              <div className='flex flex-col gap-1 col-span-2'>
                <label htmlFor="name">Full Name*</label>
                <Field type="text" name="name" className='border-[2px] rounded-md p-[10px]' />
                <ErrorMessage name="name" component="div" className="text-[red] text-[12px]" />
              </div>
              <div className='flex flex-col gap-1'>
                <label htmlFor="contact">Contact Number*</label>
                <Field type="number" name="contact" className='border-[2px] rounded-md p-[10px]' />
                <ErrorMessage name="contact" component="div" className="text-[red] text-[12px]" />
              </div>
              <div className='flex flex-col gap-1'>
                <label htmlFor="email">Email*</label>
                <Field type="text" name="email" className='border-[2px] rounded-md p-[10px]' />
                <ErrorMessage name="email" component="div" className="text-[red] text-[12px]" />
              </div>
              <div className='flex flex-col gap-1'>
                <label htmlFor="passengers">Number of Passengers*</label>
                <Field type="number" name="passengers" className='border-[2px] rounded-md p-[10px]' min="1"/>
                <ErrorMessage name="passengers" component="div" className="text-[red] text-[12px]" />
              </div>
              <div className='flex flex-col gap-1'>
                <label htmlFor="luggage">Number of Luggage*</label>
                <Field type="number" name="luggage" className='border-[2px] rounded-md p-[10px]' min="0" />
                <ErrorMessage name="luggage" component="div" className="text-[red] text-[12px]" />
              </div>
              <div className='flex flex-col gap-1'>
                <label htmlFor="date">Date*</label>
                <Field type="date" name="date" className='border-[2px] rounded-md p-[10px]' min={new Date().toISOString().split("T")[0]} />
                <ErrorMessage name="date" component="div" className="text-[red] text-[12px]" />
              </div>
              <div className='flex flex-col gap-1'>
                <label htmlFor="pickupTime">Pickup Time*</label>
                <Field type="time" name="pickupTime" className='border-[2px] rounded-md p-[10px]' />
                <ErrorMessage name="pickupTime" component="div" className="text-[red] text-[12px]" />
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
              {data.transfer == 'airport' &&
                <div className='flex flex-col gap-1'>
                  <label htmlFor="flightNumber">Flight Number*</label>
                  <Field type="text" name="flightNumber" className='border-[2px] rounded-md p-[10px]' />
                  <ErrorMessage name="flightNumber" component="div" className="text-[red] text-[12px]" />
                </div>
              }
              {data.transfer == 'station' &&
                <div className='flex flex-col gap-1'>
                  <label htmlFor="trainNumber">Train Number*</label>
                  <Field type="text" name="trainNumber" className='border-[2px] rounded-md p-[10px]' />
                  <ErrorMessage name="trainNumber" component="div" className="text-[red] text-[12px]" />
                </div>
              }
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

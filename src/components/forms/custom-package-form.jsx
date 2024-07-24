'use client'
import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { setTransferBooking } from '../store/userSlice';
import { useRouter } from 'next/navigation';
import { addItem } from '../store/cartSlice';

export default function CustomPackageForm({ }) {
  const [submitting, setSubmitting] = useState(false)
  const dispatch = useDispatch();
  const router = useRouter();
  const cart = useSelector(state => state.cart.items);
  const user = useSelector(state => state.user.userInfo);
  console.log(user);
  const addToCartHandler = (values) => {
    try {
      const newData = {
        name: `${user.displayName}'s Custom ${values.city} Package`,
        travelDetails: values
      }
      dispatch(addItem(newData));
      router.push(`/cart`)
    } catch (error) {
      console.log(error)
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
    <div className='w-full'>
      <Formik
        initialValues={{
          guests: '1',
          meetingPoint: '',
          meetingTime: '',
          city: '',
          date: '',
          itinerary: '',
          notes: ''
        }}
        validate={(values) => {
          const errors = {};
          if (!values.guests) {
            errors.guests = 'Number of guests is required';
          }
          if (!values.meetingPoint) {
            errors.meetingPoint = 'Meeting point is required';
          }
          if (!values.meetingTime) {
            errors.meetingTime = 'Meeting time is required';
          }
          if (!values.city) {
            errors.city = 'City is required';
          }
          if (!values.date) {
            errors.date = 'Date is required';
          }
          if (!values.itinerary) {
            errors.itinerary = 'Itinerary is required';
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
            <div className='grid grid-cols-2 gap-2 pb-[40px] mt-[10px]'>
              <div className='flex flex-col gap-1'>
                <label htmlFor="guests">Number of Guests*</label>
                <Field type="number" name="guests" className='border-[2px] rounded-md p-[10px]' min="1" />
                <ErrorMessage name="guests" component="div" className="text-[red] text-[12px]" />
              </div>
              <div className='flex flex-col gap-1'>
                <label htmlFor="meetingPoint">Meeting Point*</label>
                <Field type="text" name="meetingPoint" className='border-[2px] rounded-md p-[10px]' />
                <ErrorMessage name="meetingPoint" component="div" className="text-[red] text-[12px]" />
              </div>
              <div className='flex flex-col gap-1'>
                <label htmlFor="meetingTime">Meeting Time*</label>
                <Field type="time" name="meetingTime" className='border-[2px] rounded-md p-[10px]' />
                <ErrorMessage name="meetingTime" component="div" className="text-[red] text-[12px]" />
              </div>
              <div className='flex flex-col gap-1'>
                <label htmlFor="city">City*</label>
                <Field type="text" name="city" className='border-[2px] rounded-md p-[10px]' />
                <ErrorMessage name="city" component="div" className="text-[red] text-[12px]" />
              </div>
              <div className='flex flex-col gap-1'>
                <label htmlFor="date">Date*</label>
                <Field type="date" name="date" className='border-[2px] rounded-md p-[10px]' min={new Date().toISOString().split("T")[0]} />
                <ErrorMessage name="date" component="div" className="text-[red] text-[12px]" />
              </div>
              <div className='flex flex-col gap-1 col-span-2'>
                <label htmlFor="itinerary">Itinerary*</label>
                <Field as="textarea" name="itinerary" className='border-[2px] rounded-md p-[10px] h-[150px]' placeholder="Describe your custom itinerary in detail" />
                <ErrorMessage name="itinerary" component="div" className="text-[red] text-[12px]" />
              </div>
              <div className='flex flex-col gap-1 col-span-2'>
                <label htmlFor="notes">Extra Notes</label>
                <Field as="textarea" name="notes" className='border-[2px] rounded-md p-[10px] h-[150px]' />
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
    </div>
  )
}


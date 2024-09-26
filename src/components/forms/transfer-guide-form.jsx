'use client'
import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { setTransferBooking } from '../store/userSlice';
import { useRouter } from 'next/navigation';
import { addItem } from '../store/cartSlice';

export default function TransferGuideForm({ data, setShowForm }) {
  const [submitting, setSubmitting] = useState(false)
  const dispatch = useDispatch();
  const router = useRouter();
  const cart = useSelector(state => state.cart.items);
  const selectedCountry = useSelector(state => state.user.selectedCountry);
  // console.log(data);
  function generateBookingId() {
    const timestamp = Date.now().toString(36); // Convert the current timestamp to a base-36 string
    const randomNum = Math.random().toString(36).substring(2, 10); // Generate a random base-36 string
    return `BK-${timestamp}-${randomNum}`; // Combine them with a prefix
  }

  const addToCartHandler = (values) => {
    const itemExists = cart.find(item => item.id === data.id);
    if (!itemExists) {
      const newData = {
        ...data,
        bookingId: generateBookingId(),
        travelDetails: values,
        type: 'guide',
        status: "pending"
      }
      dispatch(addItem(newData));
      setShowForm(false)
      // router.push(`/cart`)
    } else {
      alert("Item already exists");
    }
  }

  const handleSubmit = (values, { resetForm }) => {
    try {
      setSubmitting(true);
      addToCartHandler(values)
      // console.log('Form submitted successfully.', values);
      resetForm();
      setSubmitting(false);
    } catch (error) {
      console.error('Error submitting form.', error);
      setSubmitting(false);
    }
  }

  return (
    <div className='max-h-[80vh] overflow-y-scroll'>
      <Formik
        initialValues={{
          guests: '1',
          meetingPoint: '',
          meetingTime: '',
          city: '',
          date: '',
          itinerary: '',
          language: '',
          hours: '4',
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
          if (!values.meetingAddress) {
            errors.meetingAddress = 'Meeting point address is required';
          }
          if (!values.meetingTime) {
            errors.meetingTime = 'Meeting time is required';
          }
          // if (!values.city) {
          //   errors.city = 'City is required';
          // }
          if (!values.date) {
            errors.date = 'Date is required';
          }
          if (!values.itinerary) {
            errors.itinerary = 'Itinerary is required';
          }
          if (!values.language) {
            errors.language = 'Language is required';
          }
          if (!values.hours || values.hours < 4) {
            errors.hours = 'Minimum hours is 4';
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
            <div className='grid grid-cols-2 gap-2 pb-[40px] mt-[10px]'>
              <div className='flex flex-col gap-1'>
                <label htmlFor="guests">Number of Guests*</label>
                <Field type="number" name="guests" className='border-[2px] rounded-md p-[10px]' min="1" max="20"/>
                <ErrorMessage name="guests" component="div" className="text-[red] text-[12px]" />
              </div>
              <div className='flex flex-col gap-1'>
                <label htmlFor="meetingPoint">Meeting Point*</label>
                <Field as="select" name="meetingPoint" className='border-[2px] rounded-md p-[10px]'>
                  <option value="" disabled>Select a meeting point</option> {/* Placeholder */}
                  <option value="airport">Airport</option>
                  <option value="station">Station</option>
                  <option value="hotel">Hotel</option>
                  <option value="landmark">Landmark</option>
                  {/* Add more options as needed */}
                </Field>
                <ErrorMessage name="meetingPoint" component="div" className="text-[red] text-[12px]" />
              </div>
              <div className='flex flex-col gap-1 col-span-2'>
                <label htmlFor="meetingAddress">Meeting Address*</label>
                <Field as="textarea" name="meetingAddress" className='border-[2px] rounded-md p-[10px]' />
                <ErrorMessage name="meetingAddress" component="div" className="text-[red] text-[12px]" />
              </div>
              <div className='flex flex-col gap-1'>
                <label htmlFor="meetingTime">Meeting Time*</label>
                <Field type="time" name="meetingTime" className='border-[2px] rounded-md p-[10px]' />
                <ErrorMessage name="meetingTime" component="div" className="text-[red] text-[12px]" />
              </div>
              {/* <div className='flex flex-col gap-1'>
                <label htmlFor="city">City*</label>
                <Field type="text" name="city" className='border-[2px] rounded-md p-[10px]' />
                <ErrorMessage name="city" component="div" className="text-[red] text-[12px]" />
              </div> */}
              <div className='flex flex-col gap-1'>
                <label htmlFor="date">Date*</label>
                <Field type="date" name="date" className='border-[2px] rounded-md p-[10px]' min={new Date().toISOString().split("T")[0]} />
                <ErrorMessage name="date" component="div" className="text-[red] text-[12px]" />
              </div>
              <div className='flex flex-col gap-1'>
                <label htmlFor="language">Language*</label>
                <Field as="select" name="language" className='border-[2px] rounded-md p-[10px]'>
                  <option value="">Select language</option>
                  {Array.isArray(data.languages) && data.languages.map((lang, id) => (
                    <option key={id} value={lang}>{lang}</option>
                  ))}
                </Field>
                <ErrorMessage name="language" component="div" className="text-[red] text-[12px]" />
              </div>
              <div className='flex flex-col gap-1'>
                <label htmlFor="hours">Hours (minimum 4)*</label>
                <Field type="number" name="hours" className='border-[2px] rounded-md p-[10px]' min="4" max="12"/>
                <ErrorMessage name="hours" component="div" className="text-[red] text-[12px]" />
              </div>
              <div className='flex flex-col gap-1 col-span-2'>
                <label htmlFor="itinerary">Itinerary*</label>
                <Field as="textarea" name="itinerary" className='border-[2px] rounded-md p-[10px]' placeholder="Describe your custom itinerary in detail" />
                <ErrorMessage name="itinerary" component="div" className="text-[red] text-[12px]" />
              </div>
              <div className='flex flex-col gap-1 col-span-2'>
                <label htmlFor="notes">Extra Notes</label>
                <Field as="textarea" name="notes" className='border-[2px] rounded-md p-[10px]' />
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

const predefinedGuideLanguages = [
  'English', 'Chinese', 'Japanese'
];

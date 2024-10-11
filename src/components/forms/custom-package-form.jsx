'use client'
import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { setTransferBooking } from '../store/userSlice';
import { useRouter } from 'next/navigation';
import { addItem } from '../store/cartSlice';
import { formatDate, formatTime, generateBookingId } from '../services/utils';

export default function CustomPackageForm({ }) {
  const [submitting, setSubmitting] = useState(false)
  const [includeGuide, setIncludeGuide] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const cart = useSelector(state => state.cart.items);
  const user = useSelector(state => state.user.userInfo);


  // function generateBookingId() {
  //   const timestamp = Date.now().toString(36); // Convert the current timestamp to a base-36 string
  //   const randomNum = Math.random().toString(36).substring(2, 10); // Generate a random base-36 string
  //   return `BK-${timestamp}-${randomNum}`; // Combine them with a prefix
  // }

  const addToCartHandler = (values) => {
    const formattedDate = formatDate(values.date)
    const formattedTime = formatTime(values.meetingTime)
    try {
      const newData = {
        id: generateBookingId(),
        bookingId: generateBookingId(),
        name: `${user.displayName}'s Custom ${values.city} Package`,
        travelDetails: {
          ...values,
          meetingTime: formattedTime,
          date: formattedDate
        },
        type: 'custom'
      }
      console.log(newData);
      dispatch(addItem({ ...newData, status: "pending" }));
      router.push(`/cart`)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = (values, { resetForm }) => {
    try {
      setSubmitting(true);
      addToCartHandler(values)
      console.log('Form submitted successfully.', values);
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
          name: '',
          contact: '',
          email: '',
          guests: '1',
          meetingPoint: '',
          meetingTime: '',
          city: '',
          date: '',
          hours: '',
          guideLanguage: "",
          itinerary: '',
          notes: ''
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
          if (!values.guests) {
            errors.guests = 'Number of guests is required';
          }
          if (!values.meetingPoint) {
            errors.meetingPoint = 'Meeting point is required';
          }
          if (!values.meetingAddress) {
            errors.meetingAddress = 'Meeting point Address is required';
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
          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleSubmit(values, { resetForm });
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <div className='grid grid-cols-2 gap-2 pb-[40px] mt-[10px]'>
              <div className='flex flex-col gap-1 col-span-2 md:col-span-1'>
                <label htmlFor="name">Name*</label>
                <Field type="text" name="name" className='border-[1px] border-black rounded-md p-[10px]' min="1" />
                <ErrorMessage name="name" component="div" className="text-[red] text-[12px]" />
              </div>
              <div className='flex flex-col gap-1 col-span-2 md:col-span-1'>
                <label htmlFor="contact">Phone*</label>
                <Field type="number" name="contact" className='border-[1px] border-black rounded-md p-[10px]' min="1" />
                <ErrorMessage name="contact" component="div" className="text-[red] text-[12px]" />
              </div>
              <div className='flex flex-col gap-1 col-span-2 md:col-span-1'>
                <label htmlFor="email">Email*</label>
                <Field type="text" name="email" className='border-[1px] border-black rounded-md p-[10px]' min="1" />
                <ErrorMessage name="email" component="div" className="text-[red] text-[12px]" />
              </div>
              <div className='flex flex-col gap-1 col-span-2 md:col-span-1'>
                <label htmlFor="guests">Number of Guests*</label>
                <Field type="number" name="guests" className='border-[1px] border-black rounded-md p-[10px]' min="1" />
                <ErrorMessage name="guests" component="div" className="text-[red] text-[12px]" />
              </div>
              <div className='flex flex-col gap-1 col-span-2 md:col-span-1'>
                <label htmlFor="meetingPoint">Meeting Point*</label>
                <Field as="select" name="meetingPoint" className='border-[1px] border-black rounded-md p-[10px]'>
                  <option value="" disabled>Select a meeting point</option> {/* Placeholder */}
                  <option value="airport">Airport</option>
                  <option value="station">Station</option>
                  <option value="hotel">Hotel</option>
                  <option value="landmark">Landmark</option>
                  {/* Add more options as needed */}
                </Field>
                <ErrorMessage name="meetingPoint" component="div" className="text-[red] text-[12px]" />
              </div>
              <div className='flex flex-col gap-1'>
                <label htmlFor="guests">Hours expected</label>
                <Field type="number" name="hours" className='border-[1px] border-black rounded-md p-[10px]' min="6" placeholder="6" />
                <ErrorMessage name="hours" component="div" className="text-[red] text-[12px]" />
              </div>
              <div className='flex flex-col gap-1'>
                <label htmlFor="meetingTime">Meeting Time*</label>
                <Field type="time" name="meetingTime" className='border-[1px] border-black rounded-md p-[10px]' />
                <ErrorMessage name="meetingTime" component="div" className="text-[red] text-[12px]" />
              </div>
              {/* <div className='flex flex-col gap-1'>
                <label htmlFor="city">City*</label>
                <Field type="text" name="city" className='border-[1px] border-black rounded-md p-[10px]' />
                <ErrorMessage name="city" component="div" className="text-[red] text-[12px]" />
              </div> */}
              <div className='flex flex-col gap-1'>
                <label htmlFor="date">Date*</label>
                <Field type="date" name="date" className='border-[1px] border-black rounded-md p-[10px]' min={new Date().toISOString().split("T")[0]} />
                <ErrorMessage name="date" component="div" className="text-[red] text-[12px]" />
              </div>
              <label className='flex items-center'>
                <input
                  type='checkbox'
                  checked={includeGuide}
                  onChange={() => setIncludeGuide(!includeGuide)}
                />
                <span className='ml-2 font-[600]'>Need Guide?</span>
              </label>
              {includeGuide && (
                <>
                  <div className='flex flex-col gap-1'>
                    <label htmlFor="guideLanguage">Guide Language</label>
                    <Field
                      type="text"
                      name="guideLanguage"
                      className='border-[1px] border-black rounded-md p-[10px]'
                      value={includeGuide ? values?.guideLanguage : ''}
                      onChange={(e) => setFieldValue('guideLanguage', e.target.value)}
                    />
                    {/* <ErrorMessage name="guideLanguage" component="div" className="text-[red] text-[12px]" /> */}
                  </div>
                  {/* <div className='flex flex-col gap-1'>
                    <label htmlFor="guideHours">Guide Hours</label>
                    <Field type="number" name="guideHours" className='border-[1px] border-black rounded-md p-[10px]' />
                    <ErrorMessage name="guideHours" component="div" className="text-[red] text-[12px]" />
                  </div> */}
                </>
              )}
              <div className='flex flex-col gap-1 col-span-2'>
                <label htmlFor="meetingAddress">Meeting Address*</label>
                <Field as="textarea" name="meetingAddress" className='border-[1px] border-black rounded-md p-[10px] h-[150px]' />
                <ErrorMessage name="meetingAddress" component="div" className="text-[red] text-[12px]" />
              </div>
              <div className='flex flex-col gap-1 col-span-2'>
                <label htmlFor="itinerary">Itinerary*</label>
                <Field as="textarea" name="itinerary" className='border-[1px] border-black rounded-md p-[10px] h-[150px]' placeholder="Describe your custom itinerary in detail" />
                <ErrorMessage name="itinerary" component="div" className="text-[red] text-[12px]" />
              </div>
              <div className='flex flex-col gap-1 col-span-2'>
                <label htmlFor="notes">Extra Notes</label>
                <Field as="textarea" name="notes" className='border-[1px] border-black rounded-md p-[10px] h-[150px]' />
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


'use client'
import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';

export default function Enquiry({ tourPackage }) {
  const [success, setSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const sendMail = async (values, { resetForm }) => {
    try {
      setSubmitting(true)
      const response = await fetch('https://riod-backend.onrender.com/enquiry-sconcierge', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(values)
      })
      if (response.ok) {
        console.log('Form submitted successfully.');
        resetForm()
        setSuccess(true)
        setSubmitting(false)
      }
      console.log(values)
    } catch (error) {
      console.error('Error submitting form.', error);
      setSubmitting(false)
    }
    console.log(values);
    setTimeout(() => {
      setSuccess(false)
    }, [5000])
  }

  return (
    <>
      {success ?
        <div className='flex justify-center items-center text-center'>
          <p className='font-[600]'>Thank you for your enquiry,<br /> One of our agents will contact you shortly</p>
        </div>
        :
        <Formik
          initialValues={{
            name: '',
            email: '',
            contact: '',
            numOfPassengers: '',
            numOfLuggage: '',
            message: tourPackage,
          }}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = 'Name is required';
            }
            if (!values.email) {
              errors.email = 'Email is required';
            } else if (!/\S+@\S+\.\S+/.test(values.email)) {
              errors.email = 'Email address is invalid';
            }
            if (!values.contact) {
              errors.contact = 'Contact number is required';
            } else if (!/^\d+$/.test(values.contact)) {
              errors.contact = 'Contact number is invalid';
            }
            if (!values.numOfPassengers) {
              errors.numOfPassengers = 'Number of passengers is required';
            }
            if (!values.numOfLuggage) {
              errors.numOfLuggage = 'Number of luggage is required';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            sendMail(values, { resetForm })
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className='max-h-[70vh] md:max-h-[450px] w-full md:max-w-[700px] mx-auto text-black overflow-y-scroll'>
              <div className='grid md:grid-cols-2 md:justify-center gap-2 p-[10px] '>

                <div className='flex flex-col gap-1'>
                  <label htmlFor="name">Name*</label>
                  <Field type="text" name="name" className='border-[2px] rounded-md p-[3px]' />
                  <ErrorMessage name="name" component="div" className="text-[red] text-[12px]" />
                </div>
                <div className='flex flex-col gap-1'>
                  <label htmlFor="email">Email*</label>
                  <Field type="email" name="email" className='border-[2px] rounded-md p-[3px]' />
                  <ErrorMessage name="email" component="div" className="text-[red] text-[12px]" />
                </div>
                <div className='flex flex-col gap-1'>
                  <label htmlFor="contact">Contact Number*</label>
                  <Field type="text" name="contact" className='border-[2px] rounded-md p-[3px]' />
                  <ErrorMessage name="contact" component="div" className="text-[red] text-[12px]" />
                </div>
                <div className='flex flex-col gap-1'>
                  <label htmlFor="numOfPassengers">Number of Passengers*</label>
                  <Field type="number" name="numOfPassengers" className='border-[2px] rounded-md p-[3px]' />
                  <ErrorMessage name="numOfPassengers" component="div" className="text-[red] text-[12px]" />
                </div>
                <div className='flex flex-col gap-1'>
                  <label htmlFor="numOfLuggage">Number of Luggage*</label>
                  <Field type="number" name="numOfLuggage" className='border-[2px] rounded-md p-[3px]' />
                  <ErrorMessage name="numOfLuggage" component="div" className="text-[red] text-[12px]" />
                </div>
              </div>
              {submitting ?
                <div className='bg-gray-500 p-[10px] text-center text-white mt-[10px]'>
                  Submitting form...
                </div>
                :
                <button type="submit" disabled={isSubmitting} className='w-full bg-custom-red text-white font-[700] p-[10px] mt-[10px]'>Submit</button>
              }
            </Form>
          )}
        </Formik>
      }
    </>
  )
}

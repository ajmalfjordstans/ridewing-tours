'use client'
import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { sendMail } from '../services/send-mail';

export default function ContactForm() {
  const [success, setSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSendMail = async (values, { resetForm }) => {
    const emailPayload = {
      to: 'frontend.fjordstans@gmail.com',
      subject: 'Contact Form',
      // text: "Hello, Welcome to Ridewing",
      html: `<!DOCTYPE html> <html lang='en'> <head> <meta charset='UTF-8'> <meta name='viewport' content='width=device-width, initial-scale=1.0'> <title>Email Template</title> <style> body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; } .container { width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); } .header { text-align: center; padding: 10px 0; background-color: #4CAF50; color: #ffffff; } .header h1 { margin: 0; font-size: 24px; } .content { padding: 20px; } .content p { font-size: 16px; line-height: 1.6; } .footer { text-align: center; padding: 10px 0; color: #888888; font-size: 14px; } </style> </head> <body> <div class='container'> <div class='header'> <h1>New Message Notification</h1> </div> <div class='content'> <p><strong>First Name:</strong> ${values.firstName}</p> <p><strong>Last Name:</strong> ${values.lastName}</p> <p><strong>Email:</strong> ${values.email}</p> <p><strong>Subject:</strong> ${values.subject}</p> <p><strong>Message:</strong></p> <p>${values.message}</p> </div> <div class='footer'> <p>This is an automated email. Please do not reply.</p> </div> </div> </body> </html>`,
    };
    try {
      console.log(emailPayload);
      setSubmitting(true)
      const response = await sendMail(emailPayload)
      // const response = await fetch('https://riod-backend.onrender.com/contact-us-sconcierge', {
      //   method: 'POST',
      //   headers: {
      //     'content-type': 'application/json'
      //   },
      //   body: JSON.stringify(values)
      // })
      console.log(response);
      
      if (response.status == '200') {
        console.log('Form submitted successfully.');
        resetForm()
        setSuccess(true)
        setSubmitting(false)
      }
    } catch (error) {
      console.error('Error submitting form.', error);
      setSubmitting(false)
    }
    // console.log(response);
    setTimeout(() => {
      setSuccess(false)
    }, [5000])
  }
  return (
    <>
      {success ?
        <div className='flex justify-center items-center text-center'>
          <p className='font-[600]'>Thank you for your enquiry,<br /> One of our agent will contact you shortly</p>
        </div>
        :
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            subject: '',
            message: '',
          }}
          validate={(values) => {
            const errors = {};
            if (!values.firstName) {
              errors.firstName = 'First name is required';
            }
            if (!values.lastName) {
              errors.lastName = 'Last name is required';
            }
            if (!values.email) {
              errors.email = 'Email is required';
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
              errors.email = 'Invalid email address';
            }
            if (!values.subject) {
              errors.subject = 'Subject is required';
            }
            if (!values.message) {
              errors.message = 'Message is required';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            // Handle form submission here
            // console.log(values);
            handleSendMail(values, { resetForm })
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className='flex flex-col gap-2 py-[40px]'>
                <div className='flex flex-col md:flex-row gap-2'>
                  <div className='flex flex-col md:w-[50%]'>
                    <label htmlFor="firstName">First Name*</label>
                    <Field type="text" name="firstName" className='border-[2px] rounded-md p-[10px]' />
                    <ErrorMessage name="firstName" component="div" className="text-[red] text-[12px]" />
                  </div>
                  <div className='flex flex-col md:w-[50%]'>
                    <label htmlFor="lastName">Last Name*</label>
                    <Field type="text" name="lastName" className='border-[2px] rounded-md p-[10px]' />
                    <ErrorMessage name="lastName" component="div" className="text-[red] text-[12px]" />
                  </div>
                </div>
                <div className='flex flex-col gap-1'>
                  <label htmlFor="email">Email Address*</label>
                  <Field type="email" name="email" className='border-[2px] rounded-md p-[10px]' />
                  <ErrorMessage name="email" component="div" className="text-[red] text-[12px]" />
                </div>
                <div className='flex flex-col gap-1'>
                  <label htmlFor="subject">Subject*</label>
                  <Field type="text" name="subject" className='border-[2px] rounded-md p-[10px]' />
                  <ErrorMessage name="subject" component="div" className="text-[red] text-[12px]" />
                </div>
                <div className='flex flex-col gap-1'>
                  <label htmlFor="message">How can we help you?*</label>
                  <Field as="textarea" name="message" className='border-[2px] rounded-md p-[10px]' />
                  <ErrorMessage name="message" component="div" className="text-[red] text-[12px]" />
                </div>
              </div>
              {submitting ?
                <div className='bg-gray-500 p-[10px] text-center text-white'>
                  Submitting form...
                </div>
                :
                <button type="submit" disabled={isSubmitting} className='w-full bg-custom-red text-white font-[700] p-[10px]'>SEND</button>
              }
            </Form>
          )}
        </Formik>
      }
    </>
  )
}

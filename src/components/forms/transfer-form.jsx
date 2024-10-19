'use client'
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { addItem } from '../store/cartSlice';
import { formatDate, formatTime, generateBookingId } from '../services/utils';

export default function TransferForm({ data }) {
  const [submitting, setSubmitting] = useState(false);
  const [tripType, setTripType] = useState(''); // Add tripType state
  const dispatch = useDispatch();
  const router = useRouter();
  const cart = useSelector(state => state.cart.items);
  const country = useSelector(state => state.user.selectedCountry);

  // function generateBookingId() {
  //   const timestamp = Date.now().toString(36).substring(0, 3); // Shorten timestamp
  //   const randomNum = Math.random().toString(36).substring(2, 4); // Shorten random number
  //   return `BK-${timestamp}${randomNum}`;
  // }

  const addToCartHandler = (values) => {
    const itemExists = cart.find(item => item.id === data.id);
    if (!itemExists) {
      const newData = {
        ...data,
        bookingId: generateBookingId(),
        travelDetails: values,
        status: "pending"
      };
      dispatch(addItem(newData));
      toast("Item Added to Cart succesfully")
      router.push(`/?country=${country}`);
    } else {
      alert("Item already exists");
    }
  };

  const handleSubmit = (values, { resetForm }) => {
    const formattedDate = formatDate(values.date);
    const formattedTime = formatTime(values.pickupTime);
    // console.log(formattedDate, formattedTime);

    try {
      setSubmitting(true);
      addToCartHandler({
        ...values,
        date: formattedDate,
        pickupTime: formattedTime,
      });
      resetForm();
      setSubmitting(false);
    } catch (error) {
      console.error('Error submitting form.', error);
      setSubmitting(false);
    }
  };

  const handleTripTypeChange = (setFieldValue, value) => {
    setTripType(value);
    if (value === 'arrival') {
      setFieldValue('pickupAddress', data.name);
      setFieldValue('dropoffAddress', '');
    } else if (value === 'departure') {
      setFieldValue('pickupAddress', '');
      setFieldValue('dropoffAddress', data.name);
    }
  };

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
          pickupAddress: "",
          dropoffAddress: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.name) errors.name = 'Name is required';
          if (!values.contact) errors.contact = 'Contact is required';
          if (!values.email) {
            errors.email = 'Email is required';
          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
            errors.email = 'Invalid email address';
          }
          if (!values.passengers) errors.passengers = 'Number of passengers is required';
          if (!values.luggage) errors.luggage = 'Number of luggage is required';
          if (!values.pickupTime) errors.pickupTime = 'Pickup time is required';
          if (!values.date) errors.date = 'Date is required';
          if (!values.pickupAddress) errors.pickupAddress = 'Pickup address is required';
          if (!values.dropoffAddress) errors.dropoffAddress = 'Dropoff address is required';
          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleSubmit(values, { resetForm });
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <p className='text-center text-[24px] font-[400]'>{data.name}</p>
            <div className='w-full h-[1px] my-[20px] bg-black'></div>
            <div className='grid grid-cols-2 gap-2 pb-[40px]'>
              {/* Full Name Field */}
              <div className='flex flex-col gap-1 col-span-2'>
                <label htmlFor="name">Full Name*</label>
                <Field type="text" name="name" className='border-[1px] border-black rounded-md p-[10px]' />
                <ErrorMessage name="name" component="div" className="text-[red] text-[12px]" />
              </div>

              {/* Contact Number Field */}
              <div className='flex flex-col gap-1'>
                <label htmlFor="contact">Contact Number*</label>
                <Field type="number" name="contact" className='border-[1px] border-black rounded-md p-[10px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' />
                <ErrorMessage name="contact" component="div" className="text-[red] text-[12px]" />
              </div>

              {/* Email Field */}
              <div className='flex flex-col gap-1'>
                <label htmlFor="email">Email*</label>
                <Field type="text" name="email" className='border-[1px] border-black rounded-md p-[10px]' />
                <ErrorMessage name="email" component="div" className="text-[red] text-[12px]" />
              </div>

              {/* Number of Passengers Field */}
              <div className='flex flex-col gap-1'>
                <label htmlFor="passengers">Number of Passengers*</label>
                <Field type="number" name="passengers" className='border-[1px] border-black rounded-md p-[10px]' min="1" />
                <ErrorMessage name="passengers" component="div" className="text-[red] text-[12px]" />
              </div>

              {/* Number of Luggage Field */}
              <div className='flex flex-col gap-1'>
                <label htmlFor="luggage">Number of Luggage*</label>
                <Field type="number" name="luggage" className='border-[1px] border-black rounded-md p-[10px]' min="0" />
                <ErrorMessage name="luggage" component="div" className="text-[red] text-[12px]" />
              </div>

              {/* Date Field */}
              <div className='flex flex-col gap-1'>
                <label htmlFor="date">Date*</label>
                <Field type="date" name="date" className='border-[1px] border-black rounded-md p-[10px]' min={new Date().toISOString().split("T")[0]} />
                <ErrorMessage name="date" component="div" className="text-[red] text-[12px]" />
              </div>

              {/* Pickup Time Field */}
              <div className='flex flex-col gap-1'>
                <label htmlFor="pickupTime">Pickup Time*</label>
                <Field type="time" name="pickupTime" className='border-[1px] border-black rounded-md p-[10px]' />
                <ErrorMessage name="pickupTime" component="div" className="text-[red] text-[12px]" />
              </div>

              {/* Trip Type Radio Buttons */}
              <div className={`'flex flex-col gap-1 ${data.transfer === 'airport' ? "md:col-span-2" : ""}`}>
                <label>Arrival or Departure*</label>
                <div className='flex gap-2'>
                  <label>
                    <Field type="radio" name="tripType" value="arrival" onClick={() => handleTripTypeChange(setFieldValue, 'arrival')} />
                    Arrival
                  </label>
                  <label>
                    <Field type="radio" name="tripType" value="departure" onClick={() => handleTripTypeChange(setFieldValue, 'departure')} />
                    Departure
                  </label>
                </div>
                <ErrorMessage name="tripType" component="div" className="text-[red] text-[12px]" />
              </div>

              {/* Flight or Train Number Fields */}
              {data.transfer === 'airport' && (
                <>
                  <div className='flex flex-col gap-1'>
                    <label htmlFor="flightNumber">Flight Number*</label>
                    <Field type="text" name="flightNumber" className='border-[1px] border-black rounded-md p-[10px]' />
                    <ErrorMessage name="flightNumber" component="div" className="text-[red] text-[12px]" />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <label htmlFor="terminalNumber">Terminal Number*</label>
                    <Field type="text" name="terminalNumber" className='border-[1px] border-black rounded-md p-[10px]' />
                    <ErrorMessage name="terminalNumber" component="div" className="text-[red] text-[12px]" />
                  </div>
                </>
              )}
              {data.transfer === 'station' && (
                <div className='flex flex-col gap-1'>
                  <label htmlFor="trainNumber">Train Number*</label>
                  <Field type="text" name="trainNumber" className='border-[1px] border-black rounded-md p-[10px]' />
                  <ErrorMessage name="trainNumber" component="div" className="text-[red] text-[12px]" />
                </div>
              )}

              {/* Pickup Address Field */}
              <div className='flex flex-col gap-1'>
                <label htmlFor="pickupAddress">Pickup Address*</label>
                <Field as="textarea" name="pickupAddress" className='border-[1px] border-black rounded-md p-[10px]' />
                <ErrorMessage name="pickupAddress" component="div" className="text-[red] text-[12px]" />
              </div>

              {/* Dropoff Address Field */}
              <div className='flex flex-col gap-1'>
                <label htmlFor="dropoffAddress">Dropoff Address*</label>
                <Field as="textarea" name="dropoffAddress" className='border-[1px] border-black rounded-md p-[10px]' />
                <ErrorMessage name="dropoffAddress" component="div" className="text-[red] text-[12px]" />
              </div>
            </div>

            <button type="submit" className='w-full p-[10px] text-white bg-black rounded-md' disabled={isSubmitting}>
              {submitting ? "Submitting..." : "Add to Cart"}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
}

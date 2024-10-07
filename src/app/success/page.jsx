'use client'
import { setCart } from '@/components/store/cartSlice';
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { readFirebaseDocument, updateFirebaseDocument } from '../firebase';
import { generatePayload, sendMail } from '@/components/services/send-mail';
import { generateInvoice, generateInvoiceObj } from '@/components/services/invoice-generator';
import { Router } from 'next/router';

export default function Page() {
  const router = useRouter()
  const searchParams = useSearchParams();
  const user = useSelector(state => state.user)
  const session_id = searchParams.get("session_id") // Capture session_id from query params
  const dispatch = useDispatch()
  const [verified, setVerified] = useState(false)
  const [mailDone, setMailDone] = useState(false)

  useEffect(() => {
    if (session_id) {
      handlePostCheckout(session_id);
    }
  }, [session_id]);

  useEffect(() => {
    if (user.userInfo) {
      readFirebaseDocument(`users/${user?.userInfo?.uid}`).then((response) => {

        if (verified && response?.waitingPayment != null) {
          handleInvoice(response?.waitingPayment?.booking)
          handleFirebaseUserUpdate(response)
        }
        console.log(response);

        setVerified(false)
      }).catch((error) => {
        console.error(error);
      });
    }
  }, [user])

  const handlePostCheckout = async (sessionId) => {
    try {
      // Make a request to the backend to verify the payment session
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}stripe/verify-payment?session_id=${sessionId}`, {
        method: 'GET',
      });

      const data = await response.json();

      if (data.success) {
        setVerified(true)
        dispatch(setCart([]));  // Clear the cart
      } else {
        console.error('Payment verification failed:', data.error);
      }
    } catch (error) {
      console.error('Error during post-checkout:', error);
    }
  };

  const handleInvoice = async (items) => {
    console.log(items);

    const invoiceObj = generateInvoiceObj(items, user)
    const invoiceUrl = await generateInvoice(invoiceObj)
    const content = {
      email: user.userInfo.email,
      mail: {
        name: invoiceObj.customer,
        invoiceNo: invoiceObj.invoiceNo,
        invoiceUrl: invoiceUrl,
        date: invoiceObj.invoiceDate,
        total: invoiceObj.subtotal,
      },
      attachments: [invoiceUrl]
    }
    const payload = generatePayload(content, 'invoice')

    // // Create a delay function
    // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // // Introduce a delay of, for example, 3 seconds (3000 ms) before sending the email
    // await delay(3000)

    const mailSend = await sendMail(payload)
    console.log(mailSend);

    if (mailSend.status == 200) {
      setMailDone(true)
    }
  }

  const handleFirebaseUserUpdate = async (item) => {
    // console.log(item);
    let oldBookings = item?.booking ? item.booking : ''
    const data = {
      ...user.userInfo,
      booking: [
        ...oldBookings,
        ...item.waitingPayment.booking
      ],
      coupons: item.waitingPayment.coupons,
      waitingPayment: null
    }
    try {
      console.log(data);
      updateFirebaseDocument(data, `users/${user.userInfo.uid}`)
    } catch (err) {
      console.error("Error setting document: ", err);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful</h1>
      {mailDone ?
        <>
          <p className="text-lg text-gray-600 text-center">Thank you for your payment. <br /> Check your email for invoice and you&apos;ll get the confirmation shortly</p>
          <div className="mt-8">
            <Link href={{ pathname: '/', }}>
              {/* query: { country: user.selectedCountry } */}
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Return Home
              </button>
            </Link>
          </div>
        </>
        :
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect fill="#FF156D" stroke="#FF156D" strokeWidth="15" strokeLinejoin="round" width="30" height="30" x="85" y="85" rx="0" ry="0"><animate attributeName="rx" calcMode="spline" dur="2" values="15;15;5;15;15" keySplines=".5 0 .5 1;.8 0 1 .2;0 .8 .2 1;.5 0 .5 1" repeatCount="indefinite"></animate><animate attributeName="ry" calcMode="spline" dur="2" values="15;15;10;15;15" keySplines=".5 0 .5 1;.8 0 1 .2;0 .8 .2 1;.5 0 .5 1" repeatCount="indefinite"></animate><animate attributeName="height" calcMode="spline" dur="2" values="30;30;1;30;30" keySplines=".5 0 .5 1;.8 0 1 .2;0 .8 .2 1;.5 0 .5 1" repeatCount="indefinite"></animate><animate attributeName="y" calcMode="spline" dur="2" values="40;170;40;" keySplines=".6 0 1 .4;0 .8 .2 1" repeatCount="indefinite"></animate></rect></svg>
          <p>Please wait before closing this window</p>
        </div>
      }
    </div>
  )
}

'use client'
import CommonHero from '@/components/common-hero'
import ContactForm from '@/components/forms/contact-form'
import GoogleMap from '@/components/google-map'
import Image from 'next/image'
import React from 'react'
import { useSelector } from 'react-redux'

export default function Page() {
  const contact = useSelector(state => state.user.contact);
  return (
    <div className=''>
      <CommonHero title={"Contact Us"} bg={'/images/background/contact.jpg'} />
      <div className='container mx-auto bg-white rounded-[50px] translate-y-[-100px] p-[30px] md:p-[100px] shadow-xl grid md:grid-cols-2 gap-10 h-[80%]'
        style={{
          background: 'linear-gradient(90deg, rgba(255, 255, 255, 1) 70%, rgba(228, 50, 44, 1) 70%)'
        }}
      >
        <div>
          <p className='font-bold text-[54px]'>Get in <span className='text-custom-red'>Touch</span></p>
          <ContactForm />
          <div className='mt-[30px] flex gap-6'>
            <div className='flex gap-3 items-center'>
              <Image src={'/logo/call.svg'} height={200} width={200} alt='call' className='h-[28px] w-[28px]' />
              <div className='text-[13px]'>
                <p className='font-semibold'>PHONE</p>
                <p>{contact?.phone ? contact?.phone : "+559876421"}</p>
              </div>
            </div>
            <div className='flex gap-3 items-center'>
              <Image src={'/logo/mail.svg'} height={200} width={200} alt='call' className='h-[28px] w-[28px]' />
              <div className='text-[13px]'>
                <p className='font-semibold'>EMAIL</p>
                <p>info@ridewing.uk</p>
              </div>
            </div>
          </div>
          <div className=' mt-2 text-[14px]'>
            <p>Ridewing ticketz & tourz is the trading name of signature concierge ltd</p>
            <p>CRN-Company registration: 14026674</p>
            <p>VAT-registration number: 467311882</p>
            <p>Web: www.ridewing.uk</p>
          </div>
        </div>
        <GoogleMap />
      </div>
    </div>
  )
}

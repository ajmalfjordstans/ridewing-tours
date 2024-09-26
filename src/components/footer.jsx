'use client'
import Image from 'next/image'
import React from 'react'
import Subscribe from './forms/subscribe'
import Link from 'next/link'
import { useSelector } from 'react-redux'

export default function Footer() {
  const country = useSelector(state => state.user.selectedCountry);
  const contact = useSelector(state => state.user.contact);
  return (
    <div className='bg-transparent relative mt-[200px]'>
      <div className=' bg-[#212529] text-white mt-[125px]'>
        <div className='lg:mx-0 translate-y-[-50%] w-full'>
          <div className='container mx-auto flex justify-evenly items-center flex-col md:flex-row bg-[#EEB54C] h-[246px] rounded-[12px]'>
            <p className='font-semibold text-[28px] lg:text-[48px] text-center leading-[34px] lg:leading-[60px] max-w-[60%]'>We are Open 24x7 For assistance</p>
            <div className='flex flex-col gap-5 whitespace-nowrap'>
              <p className='text-[24px] text-center lg:text-[26px] leading-[32px] lg:leading-[46px]'>Call Us now on <br /> {contact?.phone ? contact?.phone : "+559876421"}</p>
              <p className='text-[24px] text-center lg:text-[26px] leading-[32px] lg:leading-[46px] hover:cursor-pointer'
                onClick={() => window.open(`https://wa.me/${contact?.whatsapp ? contact?.whatsapp : "+559876421"}`)}
              >Whatsapp Us now on <br /> {contact?.whatsapp ? contact?.whatsapp : "+559876421"}</p>
            </div>
          </div>
        </div>
        <div className='container mx-auto px-[5%] lg:px-0  pb-[100px]'>
          {/* <div className='h-[1px] w-full bg-[#FFFFFF] my-[60px]'></div> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 text-[16px] gap-[15px]">
            <div>
              <p className='font-bold text-[18px] leading-[28px]'>Quick Link</p>
              <div className='mt-[18px] font-[400] flex flex-col gap-2'>
                <Link href={`/?country=${country}`}>
                  <p className=''>Home</p>
                </Link>
                <Link href={`/categories?country=${country}`}>
                  <p className=''>Categories</p>
                </Link>
                <Link href={`/contact?country=${country}`}>
                  <p className=''>Help</p>
                </Link>
                <Link href={`/contact?country=${country}`}>
                  <p className=''>Contact</p>
                </Link>
              </div>
            </div>
            <div>
              <p className='font-bold text-[18px] leading-[28px]'>Terms of Use</p>
              <div className='mt-[18px] font-[400] flex flex-col gap-2'>
                <p className=''>Terms and Conditions</p>
                <p className=''>Cookie Policy</p>
                <p className=''>Refund Policy</p>
                <p className=''>Cancellation Policy</p>
              </div>
            </div>
            <div>
              <p className='font-bold text-[18px] leading-[28px]'>Payment Channels</p>
              <div className='mt-[18px] font-[400] flex gap-2'>
                <Image src={'/logo/visa.svg'} height={300} width={300} alt='logo' className='w-[50px] h-[34px]' />
                <Image src={'/logo/master-card.svg'} height={300} width={300} alt='logo' className='w-[50px] h-[34px]' />
                <Image src={'/logo/american-express.svg'} height={300} width={300} alt='logo' className='w-[50px] h-[34px]' />
              </div>
              <p className='font-bold text-[18px] leading-[28px] mt-[20px]'>Follow Us</p>
              <div className='mt-[18px] font-[400] flex gap-4'>
                <Image src={'/logo/facebook.svg'} height={300} width={300} alt='logo' className='w-[25px] h-[25px]' />
                <Image src={'/logo/instagram.svg'} height={300} width={300} alt='logo' className='w-[25px] h-[25px]' />
                <Image src={'/logo/linkedin.svg'} height={300} width={300} alt='logo' className='w-[25px] h-[25px]' />
              </div>
            </div>
            <div className='md:col-span-2'>
              {/* <Image src={'/logo/logo-footer.png'} height={600} width={1200} alt='logo' className='w-[250px]' /> */}
              <div className='max-w-[420px]'>
                <p className='font-bold text-[18px] leading-[28px]'>Receive offers and discounts by subscribing to our newsletter</p>
                <p className='mt-[15px]'>By clicking Subscribe, you have agreed to our Terms & Conditions and Privacy Policy</p>
              </div>
              <Subscribe />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

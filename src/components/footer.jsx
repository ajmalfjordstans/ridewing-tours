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
    <div className='bg-transparent relative mt-[20px] md:mt-[200px]'>
      <div className=' bg-[#212529] text-white mt-[125px]'>
        <div className='lg:mx-0 translate-y-[-50%] w-full'>
          <div className='container mx-auto flex justify-evenly items-center flex-col md:flex-row bg-[#EEB54C] py-[15px] max-h-[246px] rounded-[12px]'>
            <p className='font-semibold text-[28px] lg:text-[48px] text-center leading-[34px] lg:leading-[60px] lg:max-w-[60%]'>We are Open 24x7 For assistance</p>
            <div className='hidden lg:block'>
              <div className='flex flex-col gap-1 md:gap-5 whitespace-nowrap text-[16px] md:text-[24px]'>
                <a className='text-center cursor-pointer' href={contact?.phone ? `tel:${contact.phone}` : "tel:+442084324325"}>
                  Call Us now on <br /> {contact?.phone ? contact.phone : "+44 (0) 208 432 432 5"}
                </a>
                <a className='text-center cursor-pointer' href={`mailto:info@ridewing.uk`}>
                  Email us on <br /> info@ridewing.uk
                </a>
              </div>
            </div>
            <div className='lg:hidden'>
              <div className='flex flex-col gap-1 md:gap-5 whitespace-nowrap text-[16px] md:text-[24px]'>
                <a className='text-center cursor-pointer' href={contact?.phone ? `tel:${contact.phone}` : "tel:+442084324325"}>
                  Call Us now on: {contact?.phone ? contact.phone : "+44 (0) 208 432 432 5"}
                </a>
                <a className='text-center cursor-pointer' href={`mailto:info@ridewing.uk`}>
                  Email us on: info@ridewing.uk
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className='container mx-auto px-[5%] lg:px-0 '>
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
              <Link href={`/docs/termsofuse?country=${country}`}>
                <p className='font-bold text-[18px] leading-[28px]'>Terms of Use</p>
              </Link>
              <div className='mt-[18px] font-[400] flex flex-col gap-2'>
                <Link href={`/docs/termsandconditions?country=${country}`}>
                  <p className=''>Terms and Conditions</p>
                </Link>
                <Link href={`/docs/cookiepolicy?country=${country}`}>
                  <p className=''>Cookie Policy</p>
                </Link>
                <Link href={`/docs/refundpolicy?country=${country}`}>
                  <p className=''>Refund Policy</p>
                </Link>
                <Link href={`/docs/cancellationpolicy?country=${country}`}>
                  <p className=''>Cancellation Policy</p>
                </Link>
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
        <div className='py-[30px]'>
          <p className='text-center'>©️ 2024 Ridewing ticketz & tourz. All Rights Reserved Signature Concierge Ltd.</p>
        </div>
      </div>
      <div className="fixed bottom-10 right-10 hover:cursor-pointer z-10"
        onClick={() => window.open(`https://wa.me/${contact?.whatsapp ? contact?.whatsapp : "+44 (0) 7 500 200 570"}`)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 256 258"><defs><linearGradient id="logosWhatsappIcon0" x1="50%" x2="50%" y1="100%" y2="0%"><stop offset="0%" stopColor="#1faf38" /><stop offset="100%" stopColor="#60d669" /></linearGradient><linearGradient id="logosWhatsappIcon1" x1="50%" x2="50%" y1="100%" y2="0%"><stop offset="0%" stopColor="#f9f9f9" /><stop offset="100%" stopColor="#fff" /></linearGradient></defs><path fill="url(#logosWhatsappIcon0)" d="M5.463 127.456c-.006 21.677 5.658 42.843 16.428 61.499L4.433 252.697l65.232-17.104a123 123 0 0 0 58.8 14.97h.054c67.815 0 123.018-55.183 123.047-123.01c.013-32.867-12.775-63.773-36.009-87.025c-23.23-23.25-54.125-36.061-87.043-36.076c-67.823 0-123.022 55.18-123.05 123.004" /><path fill="url(#logosWhatsappIcon1)" d="M1.07 127.416c-.007 22.457 5.86 44.38 17.014 63.704L0 257.147l67.571-17.717c18.618 10.151 39.58 15.503 60.91 15.511h.055c70.248 0 127.434-57.168 127.464-127.423c.012-34.048-13.236-66.065-37.3-90.15C194.633 13.286 162.633.014 128.536 0C58.276 0 1.099 57.16 1.071 127.416m40.24 60.376l-2.523-4.005c-10.606-16.864-16.204-36.352-16.196-56.363C22.614 69.029 70.138 21.52 128.576 21.52c28.3.012 54.896 11.044 74.9 31.06c20.003 20.018 31.01 46.628 31.003 74.93c-.026 58.395-47.551 105.91-105.943 105.91h-.042c-19.013-.01-37.66-5.116-53.922-14.765l-3.87-2.295l-40.098 10.513z" /><path fill="#fff" d="M96.678 74.148c-2.386-5.303-4.897-5.41-7.166-5.503c-1.858-.08-3.982-.074-6.104-.074c-2.124 0-5.575.799-8.492 3.984c-2.92 3.188-11.148 10.892-11.148 26.561s11.413 30.813 13.004 32.94c1.593 2.123 22.033 35.307 54.405 48.073c26.904 10.609 32.379 8.499 38.218 7.967c5.84-.53 18.844-7.702 21.497-15.139c2.655-7.436 2.655-13.81 1.859-15.142c-.796-1.327-2.92-2.124-6.105-3.716s-18.844-9.298-21.763-10.361c-2.92-1.062-5.043-1.592-7.167 1.597c-2.124 3.184-8.223 10.356-10.082 12.48c-1.857 2.129-3.716 2.394-6.9.801c-3.187-1.598-13.444-4.957-25.613-15.806c-9.468-8.442-15.86-18.867-17.718-22.056c-1.858-3.184-.199-4.91 1.398-6.497c1.431-1.427 3.186-3.719 4.78-5.578c1.588-1.86 2.118-3.187 3.18-5.311c1.063-2.126.531-3.986-.264-5.579c-.798-1.593-6.987-17.343-9.819-23.64" /></svg>
      </div>
    </div>
  )
}

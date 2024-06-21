import Image from 'next/image'
import React from 'react'
import Subscribe from './forms/subscribe'

export default function Footer() {
  return (
    <div className='bg-white'>
      <div className='mx-[5%] lg:mx-0'>
        <div className='container mx-auto flex justify-evenly items-center flex-col md:flex-row bg-[#EEB54C] h-[246px] rounded-[12px] translate-y-[50%]'>
          <p className='font-semibold text-[28px] lg:text-[48px] text-center leading-[34px] lg:leading-[60px] max-w-[60%]'>We are Open 24x7 For assistance</p>
          <p className='text-[24px] text-center lg:text-[36px] leading-[32px] lg:leading-[46px]'>Call Us now on <br /> +559876421</p>
        </div>
      </div>
      <div className=' bg-[#212529] text-white'>
        <div className='container mx-auto px-[5%] lg:px-0 pt-[200px] pb-[100px]'>
          {/* <div className='h-[1px] w-full bg-[#FFFFFF] my-[60px]'></div> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 text-[16px] gap-[15px]">
            <div>
              <p className='font-bold text-[18px] leading-[28px]'>Quick Link</p>
              <div className='mt-[18px] font-[400] flex flex-col gap-2'>
                <p className=''>Home</p>
                <p className=''>Categories</p>
                <p className=''>Help</p>
                <p className=''>Contact</p>
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

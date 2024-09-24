import CustomPackageForm from '@/components/forms/custom-package-form'
import Image from 'next/image'
import React from 'react'

export default function CustomPackage() {
  return (
    <section className='lg:mb-[300px] mx-auto px-[5%] lg:px-0 mt-[100px] pt-[40px] lg:min-h-[75vh]'>
      <div className='w-full flex flex-col max-w-[1300px] mx-auto'>
        <p className='font-bold text-[32px] leading-[42px] capitalize text-center'>Create Your Day Tour</p>
        <div className='h-[1px] w-full bg-[#00000080] mt-[20px]'>
          <div className='h-[3px] w-[320px] bg-[#E4322C] translate-y-[-1.5px]'></div>
        </div>
      </div>
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 mb-[200px] lg:mb-0 p-[30px] overflow-hidden gap-10'>
        <Image src={'/images/background/tea-ceremony.jpeg'} alt='image' height={1200} width={1200} className='h-full w-full object-cover shadow-xl rounded-[15px]' />
        <div className='w-full max-w-[900px] lg:h-[700px] mx-auto px-[20px] pb-[20px] no-scrollbar lg:overflow-y-scroll shadow-xl rounded-[15px]'>
          <CustomPackageForm />
        </div>
      </div>

      {/* <div className='flex mt-3 h-full'>
        <div className='hidden lg:block'>
          <div className='flex flex-col gap-10 h-full'>
            <Image src={'/images/form-page/japan1.jpeg'} alt='image' height={800} width={800} className='h-[30%] w-full object-cover' />
            <Image src={'/images/form-page/japan2.jpeg'} alt='image' height={800} width={800} className='h-[30%] w-full object-cover' />
            <Image src={'/images/form-page/japan3.jpeg'} alt='image' height={800} width={800} className='h-[30%] w-full object-cover' />
          </div>
        </div>
        <div className='w-full max-w-[900px] lg:h-[700px] mx-auto shadow-xl px-[20px] pb-[20px] mb-[100px] lg:p-[50px] rounded-[15px] lg:overflow-y-scroll'>
          <CustomPackageForm />
        </div>
        <div className='hidden lg:block'>
          <div className='flex flex-col gap-10 h-full'>
            <Image src={'/images/form-page/japan4.jpeg'} alt='image' height={800} width={800} className='h-[30%] w-full object-cover' />
            <Image src={'/images/form-page/japan5.jpeg'} alt='image' height={800} width={800} className='h-[30%] w-full object-cover' />
            <Image src={'/images/form-page/japan6.jpeg'} alt='image' height={800} width={800} className='h-[30%] w-full object-cover' />
          </div>
        </div>
      </div> */}

    </section>
  )
}

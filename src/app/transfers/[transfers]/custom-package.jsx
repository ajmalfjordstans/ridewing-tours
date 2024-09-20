import CustomPackageForm from '@/components/forms/custom-package-form'
import Image from 'next/image'
import React from 'react'

export default function CustomPackage() {
  return (
    <section className='pb-[250px] mx-auto px-[5%] lg:px-0 mt-[100px] pt-[40px]'>
      <div className='w-full flex flex-col max-w-[1300px] mx-auto'>
        <p className='font-bold text-[32px] leading-[42px] capitalize text-center'>Custom Package</p>
        <div className='h-[1px] w-full bg-[#00000080] mt-[20px]'>
          <div className='h-[3px] w-[320px] bg-[#E4322C] translate-y-[-1.5px]'></div>
        </div>
      </div>
      <div className='flex mt-3'>
        <div className='flex flex-col gap-10'>
          <Image src={'/images/form-page/japan1.jpeg'} alt='image' height={800} width={800} className='' />
          <Image src={'/images/form-page/japan2.jpeg'} alt='image' height={800} width={800} className='' />
          <Image src={'/images/form-page/japan3.jpeg'} alt='image' height={800} width={800} className='' />
        </div>
        <div className='w-full max-w-[900px] mx-auto mt-[48px] shadow-xl p-[20px] lg:p-[50px] rounded-[15px]'>
          <CustomPackageForm />
        </div>
        <div className=''>
          <div className='flex flex-col gap-10'>
            <Image src={'/images/form-page/japan4.jpeg'} alt='image' height={800} width={800} className='' />
            <Image src={'/images/form-page/japan5.jpeg'} alt='image' height={800} width={800} className='' />
            <Image src={'/images/form-page/japan6.jpeg'} alt='image' height={800} width={800} className='' />
          </div>
        </div>
      </div>

    </section>
  )
}

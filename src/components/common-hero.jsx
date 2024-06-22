import React from 'react'

export default function CommonHero({bg, title }) {
  return (
    <section className=' lg:mt-[100px] h-[360px] w-full'
      style={{
        backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center'
      }}
    >
      <div className='container mx-auto px-[5%] lg:px-0 h-full w-full text-white flex justify-center items-center'>
        <p className='font-bold text-[38px]'>{title}</p>
      </div>
    </section>
  )
}

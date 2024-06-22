import CommonHero from '@/components/common-hero'
import React from 'react'

export default function Page() {
  return (
    <>
      <CommonHero title={"About Us"} bg={'/images/background/about.jpg'} />
      <div className='container mx-auto bg-white rounded-[50px] translate-y-[-100px] p-[30px] md:p-[100px] shadow-xl grid md:grid-cols-2 gap-10'>
        <p className='text-center'>Welcome to Signature Concierge DMC, where every journey is a crafted master piece and every experience is tailored to exceed your expectations. As a premier destination management company based in the heart of London, we invite you to delve into the essence of who we are and the unparalleled commitment we bring to curating exceptional travel experiences.</p>
      </div>
    </>
  )
}

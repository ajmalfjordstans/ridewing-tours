import { Button } from '@material-tailwind/react';
import React from 'react'

export default function Page() {
  const handleSignIn = async () => {
    try {
      await googleSignIn()
      // router.push(`/profile?country=${country}`)
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className='fixed top-0 left-0 h-[100vh] w-[100vw] bg-[red] flex justify-center items-center z-10 flex-col'>
        <p className='text-[28px] md:text-[38px] text-white font-bold'>RIDEWING</p>
        <Button className="bg-white text-custom-red w-[300px] mt-[40px] capitalize" role="menuitem" onClick={handleSignIn} >
          Login
        </Button>
      </div>
  )
}

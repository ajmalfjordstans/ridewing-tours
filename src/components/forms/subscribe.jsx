'use client'
import { Button } from '@material-tailwind/react'
import React, { useState } from 'react'

export default function Subscribe() {
  const [mail, setMail] = useState('')
  return (
    <div className='w-full max-w-[693px] h-[61px] rounded-[4px] overflow-hidden bg-white flex justify-between mt-[20px] text-black'>
      <input type="text" className='outline-none bg-white p-[15px] w-full' onChange={(e) => setMail(e.target.value)} />
      <Button
        className='rounded-[4px] h-full w-[182px] bg-[#E4322C]'
        onClick={() => { alert(mail) }}
      >
        Subscribe
      </Button>
    </div>
  )
}

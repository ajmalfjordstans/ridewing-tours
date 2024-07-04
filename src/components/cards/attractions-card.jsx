import React from 'react'

export default function AttractionsCard({ data }) {
  return (
    <div className='w-full h-[200px] md:h-[368px] rounded-[10px] font-bold overflow-hidden flex items-end'
      style={{
        backgroundImage: `url(${data.image})`, backgroundSize: 'cover', backgroundPosition: 'center'
      }}
    >
      <div className='h-[76px] w-full p-[15px] bg-[#00000080] text-white'>
        <p className='uppercase'>{data.title}</p>
      </div>
    </div>
  )
}

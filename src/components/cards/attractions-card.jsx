'use client'
import Image from 'next/image';
import React, { useState } from 'react';

export default function AttractionsCard({ data }) {
  const [isLoaded, setIsLoaded] = useState(true);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className='w-full h-[200px] md:h-[368px] rounded-[10px] font-bold overflow-hidden flex items-end relative'>
      {!isLoaded && (
        <div className='absolute inset-0 flex items-center justify-center bg-gray-300'>
          <p>Loading...</p>
        </div>
      )}
      <Image
        src={data.image ? data.image : "/images/background/image-template.jpg"}
        alt={data.title}
        // onLoad={() => alert('loaded')}
        height={700}
        width={700}
        className={`w-full h-full object-cover ${isLoaded ? 'block' : 'hidden'}`}
      />
      {isLoaded && (
        <div className='absolute bottom-0 h-[76px] w-full p-[15px] bg-[#00000080] text-white'>
          <p className='uppercase'>{data.title}</p>
        </div>
      )}
    </div>
  );
}

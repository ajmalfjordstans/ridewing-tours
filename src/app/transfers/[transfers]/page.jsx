import React from 'react'
import Airports from './airports';
import Stations from './stations';
import Guides from './guides';
import CustomPackage from './custom-package';

export default function Page({ params }) {
  const transfer = params.transfers

  if (params.transfers === "airports") return <Airports />
  else if (params.transfers === "stations") return <Stations />
  else if (params.transfers === "guides") return <Guides />
  else if (params.transfers === "custom-package") return <CustomPackage />
  else
    return (
      <section className='pb-[250px] container mx-auto px-[5%] lg:px-0 mt-[100px] pt-[40px]'>
        <div className=' w-full flex flex-col '>
          <p className='font-bold text-[32px] leading-[42px] capitalize'>{transfer}</p>
          <div className='h-[1px] w-full bg-[#00000080] mt-[20px]'>
            <div className='h-[3px] w-[320px] bg-[#E4322C] translate-y-[-1.5px]'></div>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[10px] md:gap-[30px] w-full mt-[48px]'>

        </div>

      </section>
    )
}

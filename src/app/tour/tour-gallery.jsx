import Image from "next/image";
import React from "react";
export function TourImageGallery({ data }) {
  const [active, setActive] = React.useState(data[0]);

  return (
    <div className="grid gap-4 md:mt-4">
      <div className='grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-5 mt-[30px] max-h-[81vh]'>
        <Image src={active} height={700} width={800} alt='image' className='col-span-3 row-span-3 h-[30vh] md:h-full w-full max-h-[81vh] object-cover' />
        <div className="col-span-3 md:col-span-1 md:row-span-3 flex md:flex-col gap-2 md:gap-5 md:overflow-y-scroll overflow-x-scroll">
          {data.map((imgelink, index) => (
              <Image
                onClick={() => setActive(imgelink)}
                src={imgelink}
                key={index}
                height={700} width={800} alt='image'
                className='md:h-full md:w-full object-cover h-[10vh] w-[15vh] md:max-h-[25vh] hover:cursor-pointer' />
          ))}
        </div>
      </div>
    </div>
  );
}
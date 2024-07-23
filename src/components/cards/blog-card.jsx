import Image from 'next/image';
import React, { useEffect, useState } from 'react';

export default function BlogCard({ data }) {
  const [blog, setBlog] = useState(data);

  useEffect(() => {
    if (data) {
      const temp = {
        ...data,
        date: convertTimestampToDate(data.date)
      };
      setBlog(temp);
    }
  }, [data]);

  const convertTimestampToDate = (timestamp) => {
    if (timestamp && timestamp.seconds) {
      const date = new Date(timestamp.seconds * 1000);
      // console.log('Converted Date:', date); // Debugging log
      return date;
    }
    return null;
  };

  // Function to format the date
  const formatDate = (date) => {
    if (date instanceof Date && !isNaN(date)) {
      return date.toLocaleDateString(); // You can customize this format as needed
    }
    // console.error('Invalid Date:', date); // Debugging log
    return 'No date available';
  };

  return (
    <div className='w-full lg:h-[220px] border-b-[1px] border-[red] mt-[24px] pb-[10px] flex justify-between flex-col-reverse md:flex-row gap-[10px]'>
      <div className='w-full text-[15px] flex flex-col gap-[24px]'>
        <p className='font-semibold'>{formatDate(blog?.date)}</p>
        <p className='font-[600] text-[16px]'>{blog?.title}</p>
        <p className=''>{blog?.description}</p>
      </div>
      <Image src={blog?.image} height={400} width={600} alt='image' className='h-[200px] w-full md:w-[313px] object-cover' />
    </div>
  );
}

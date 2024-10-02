import Image from 'next/image';
import React, { useEffect, useState } from 'react';

export default function BlogCard({ data }) {
  const [blog, setBlog] = useState(data);
  const [showBlog, setShowBlog] = useState(false)

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
    <>
      <div className='w-full lg:min-h-[220px] border-b-[1px] border-[red] mt-[24px] pb-[10px] flex justify-between flex-col-reverse md:flex-row gap-[10px] hover:cursor-pointer'
        onClick={() => setShowBlog(true)}
      >
        <div className='w-full text-[15px] flex flex-col gap-[24px]'>
          <p className='font-semibold'>{formatDate(blog?.date)}</p>
          <p className='font-[600] text-[16px]'>{blog?.title}</p>
          <div className=''>
            <p className=''>{blog?.description.slice(0, 400)}</p>
            {blog?.description?.length > 100 && (
              <span className="text-blue-500 cursor-pointer">
                {'Read More'}
              </span>
            )}
          </div>
        </div>
        {blog?.image &&
          <Image src={blog?.image} height={400} width={600} alt='image' className='h-[200px] w-full md:w-[313px] object-cover' />
        }
      </div>
      {showBlog && <div className='fixed top-0 left-0 h-[100vh] w-[100vw] bg-black bg-opacity-50 z-10 flex justify-center items-center p-[5%]'>
        <div className='w-full h-[90vh] bg-white rounded-[15px] p-[20px]'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:cursor-pointer"
            onClick={() => setShowBlog(false)}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
          <div className='w-full text-[15px] flex flex-col gap-[24px] mt-5'>
            <div className='flex gap-10 w-full justify-between'>
              <div className='h-full overflow-y-scroll no-scrollbar'>
                <p className='font-semibold text-opacity-65'>{formatDate(blog?.date)}</p>
                <p className='font-[600] text-[24px]'>{blog?.title}</p>
                <p className='mt-3'>{blog?.description}</p>
              </div>
              <Image src={blog?.image} height={1200} width={600} alt='image' className='h-[600px] w-full md:w-[413px] object-cover' />
            </div>
          </div>
        </div>
      </div>}
    </>
  );
}

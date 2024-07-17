'use client'
import React, { useEffect, useState } from 'react'
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Button } from '@material-tailwind/react';
import Image from 'next/image';
import { storage } from '@/app/firebase';

export default function EditPlace({ data, setShowEdit }) {
  const [image, setImage] = useState(null)
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    url: "",
    name: "",
    tag: "",
    startLocation: "",
    availability: "",
    price: "",
    details: {
      hours: "",
      language: [],
      guidedTour: false,
      entranceFeeIncluded: false,
      expertTourGuide: false,
    },
    gallery: [],
    description: [],
    highlight: [],
    itinerary: {
      start: "",
      itinerary: [],
      end: ""
    },
    pricing: [],
    otherDetails: {
      includes: [],
      excludes: [],
      bring: [],
      information: [],
      cancellationPolicy: ""
    }
  })

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const handleUpload = () => {
    if (!image) return;

    setLoading(true);
    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.error('Error uploading image:', error);
        setLoading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setValues({ ...values, url: downloadURL })
          console.log('File available at', downloadURL);
          setLoading(false);
        });
      }
    );
  };

  useEffect(() => {
    if (data) setValues(data)
    window.scrollTo(0, 0)
    console.log(data);
  }, [data])

  return (
    <div className='p-[30px]'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:cursor-pointer" onClick={() => setShowEdit(false)}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
      </svg>
      <p className='text-[22px] font-[600] pb-[20px]'>Edit Top Choices {values.name}</p>
      <div className='h-[300px] w-[500px] relative flex justify-center items-center rounded-[10px] overflow-hidden'>
        <Image src={values.gallery[0] ? values.gallery[0] : '/images/background/japan.jpg'} height={500} width={500} className='absolute z-1 rounded-[10px] h-full object-cover' alt='banner' />
        <input type="file" onChange={handleChange} className='relative z-3 bg-secondary p-[15px] rounded-[30px] bg-opacity-50 w-min' />
      </div>
      <div className='flex mt-[15px] items-center gap-3'>
        <Button onClick={handleUpload} disabled={loading}>
          {loading ? 'Uploading...' : 'Upload'}
        </Button>
        {loading && <p className='font-[600] text-[22px]'>{Math.round(progress)}%</p>}
      </div>
      <div className='flex flex-col'>
        <div>
          <p className='text-[22px] mt-[20px]'>Name</p>
          <input type="text" className='p-[10px] border-[2px] border-black rounded-[5px] w-full' value={values.name} onChange={(e) => setValues({ ...values, name: e.target.value })} />
        </div>
        <div>
          <p className='text-[22px] mt-[20px]'>Tag</p>
          <input type="text" className='p-[10px] border-[2px] border-black rounded-[5px] w-full' value={values.tag} onChange={(e) => setValues({ ...values, tag: e.target.value })} />
        </div>
        <div>
          <p className='text-[22px] mt-[20px]'>Start Location</p>
          <input type="text" className='p-[10px] border-[2px] border-black rounded-[5px] w-full' value={values.startLocation} onChange={(e) => setValues({ ...values, startLocation: e.target.value })} />
        </div>
        <div>
          <p className='text-[22px] mt-[20px]'>Availability</p>
          <input type="text" className='p-[10px] border-[2px] border-black rounded-[5px] w-full' value={values.availability} onChange={(e) => setValues({ ...values, availability: e.target.value })} />
        </div>
        <div>
          <p className='text-[22px] mt-[20px]'>Price</p>
          <input type="text" className='p-[10px] border-[2px] border-black rounded-[5px] w-full' value={values.price} onChange={(e) => setValues({ ...values, price: e.target.value })} />
        </div>
        <div>
          <p className='text-[22px] mt-[20px]'>Hours</p>
          <input type="text" className='p-[10px] border-[2px] border-black rounded-[5px] w-full' value={values.details.hours} onChange={(e) => setValues({ ...values, details: { ...values.details, hours: e.target.value } })} />
        </div>
        <div>
          <p className='text-[22px] mt-[20px]'>Language</p>
          <input type="text" className='p-[10px] border-[2px] border-black rounded-[5px] w-full' value={values.details.language} onChange={(e) => setValues({ ...values, details: { ...values.details, language: e.target.value.split(',') } })} />
        </div>
        <div>
          <p className='text-[22px] mt-[20px]'>Guided Tour</p>
          <input type="checkbox" value={values.guidedTour} onChange={(e) => setValues({ ...values, details: { ...values.details, guidedTour: e.target.checked } })} />
        </div>
        <div>
          <p className='text-[22px] mt-[20px]'>Entrance Fee Included</p>
          <input type="checkbox" value={values.entranceFeeIncluded} onChange={(e) => setValues({ ...values, details: { ...values.details, entranceFeeIncluded: e.target.checked } })} />
        </div>
        <div>
          <p className='text-[22px] mt-[20px]'>Expert Tour Guide</p>
          <input type="checkbox" value={values.expertTourGuide} onChange={(e) => setValues({ ...values, details: { ...values.details, expertTourGuide: e.target.checked } })} />
        </div>
      </div>
      <Button onClick={() => alert(JSON.stringify(values, null, 2))} disabled={loading} className='mt-[20px]'>
        Save
      </Button>
    </div>
  )
}

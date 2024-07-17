'use client'
import React, { useState } from 'react'
import { storage } from '../firebase'
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Button } from '@material-tailwind/react';
import Image from 'next/image';

export default function Banner() {
  const [image, setImage] = useState(null)
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    background: "",
    heading: "",
    tagline: ""
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
          setValues({ ...values, background: downloadURL })
          console.log('File available at', downloadURL);
          setLoading(false);
        });
      }
    );
  };

  return (
    <div className='p-[30px]'>
      <p className='text-[22px] font-[600] pb-[20px]'>Edit Home Page Banner</p>
      <div className='h-[300px] w-[500px] relative flex justify-center items-center rounded-[10px] overflow-hidden'>
        <Image src={values.background ? values.background : '/images/background/japan.jpg'} height={500} width={500} className='absolute z-1 rounded-[10px] h-full object-cover' alt='banner' />
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
          <p className='text-[22px] mt-[20px]'>Heading</p>
          <input type="text" className='p-[10px] border-[2px] border-black rounded-[5px] w-full' onChange={(e) => setValues({ ...values, heading: e.target.value })} />
        </div>
        <div>
          <p className='text-[22px] mt-[20px]'>Tagline</p>
          <input type="text" className='p-[10px] border-[2px] border-black rounded-[5px] w-full' onChange={(e) => setValues({ ...values, tagline: e.target.value })} />
        </div>
      </div>
      <Button onClick={() => alert(values)} disabled={loading} className='mt-[20px]'>
        Save
      </Button>
    </div>
  )
}

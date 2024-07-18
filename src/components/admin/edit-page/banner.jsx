'use client'
import React, { useEffect, useState } from 'react'
import { db, deleteImage, storage } from '../../../app/firebase'
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Button } from '@material-tailwind/react';
import Image from 'next/image';
import { addDoc, collection, doc, onSnapshot, setDoc } from 'firebase/firestore';

export default function Banner() {
  const [image, setImage] = useState(null)
  const [currentImage, setCurrentImage] = useState(null)
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(false);
  const [wait, setWait] = useState(false);
  const [values, setValues] = useState({
    background: "",
    heading: "",
    tagline: ""
  })
  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
      setCurrentImage(values.background)
      setValues({ ...values, background: "" })
    }
  }
  const handleUpload = () => {
    if (!image) return;
    if (currentImage) {
      try {
        deleteImage(values.background)
      } catch (err) {
        console.log(err);
      }
    }
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
          setWait(false)
          console.log('File available at', downloadURL);
          setLoading(false);
        });
      }
    );
  };
  const handleSave = async () => {
    try {
      // Reference to the specific document in the "countries" collection
      const docRef = doc(db, 'countries/RzYea2pgV9rjQWRNuElX/landing/GO2xP38Ec7Vh9DksibdL');

      // The new document data you want to add
      const newDocument = values;

      // Update the existing document with the new data
      await setDoc(docRef, newDocument, { merge: true });

      console.log("Document successfully updated!");
      alert("Saved")
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  }
  const handleFirebaseRead = async () => {
    try {
      const docRef = doc(db, 'countries/RzYea2pgV9rjQWRNuElX/landing/GO2xP38Ec7Vh9DksibdL');
      const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = { ...docSnapshot.data(), id: docSnapshot.id };
          console.log("Document successfully read!", data);
          setValues(data)
        } else {
          console.log("No such document!");
        }
      });
    } catch (error) {
      console.error("Error reading document: ", error);
    }
  };
  useEffect(() => {
    handleFirebaseRead()
  }, [])
  useEffect(() => {
    if (image && values.background == "") setWait(true)
  }, [image])
  return (
    <div className='p-[30px]'>
      <p className='text-[22px] font-[600] pb-[20px]'>Edit Home Page Banner</p>
      <div className='h-[300px] w-[500px] relative flex justify-center items-center rounded-[10px] overflow-hidden'>
        <Image src={values.background !== "" ? values.background : '/images/background/image-template.jpg'} height={500} width={500} className='absolute z-1 rounded-[10px] h-full object-cover' alt='banner' />
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
          <input type="text" className='p-[10px] border-[2px] border-black rounded-[5px] w-full' value={values.heading} onChange={(e) => setValues({ ...values, heading: e.target.value })} />
        </div>
        <div>
          <p className='text-[22px] mt-[20px]'>Tagline</p>
          <textarea type="text" className='p-[10px] border-[2px] border-black rounded-[5px] w-full' value={values.tagline} onChange={(e) => setValues({ ...values, tagline: e.target.value })} />
        </div>
      </div>
      <Button onClick={handleSave} disabled={wait} className='mt-[20px]'>
        Save
      </Button>
    </div>
  )
}

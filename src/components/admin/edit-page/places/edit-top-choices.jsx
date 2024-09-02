'use client'
import React, { useEffect, useState } from 'react'
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Button, Timeline, TimelineBody, TimelineConnector, TimelineHeader, TimelineIcon, TimelineItem } from '@material-tailwind/react';
import Image from 'next/image';
import { createFirebaseDocument, db, readFirebaseCollection, storage } from '@/app/firebase';
import Highlight from './highlight';
import Itineraries from './itineraries';
import Description from './description';
import PricingComponent from './pricing';
import IncludesExcludesComponent from './include-exclude';
import Extras from './extras';
import { collection, doc, setDoc } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useSelector } from 'react-redux';
import AdmissionTickets from './admission-tickets';

export default function EditPlace({ data, setShowEdit }) {
  const selectedCountry = useSelector(state => state.user.selectedCountry)
  const [imageGallery, setImageGallery] = useState(data.gallery ? data.gallery : null)
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(data)
  const [categories, setCategories] = useState()

  const handleChange = (e, pos) => {
    console.log("imageGallery: ", imageGallery);
    if (e.target.files && e.target.files[0]) {
      // Ensure imageGallery is initialized as an array of length 4 with empty values if necessary
      let updatedImageGallery = [...imageGallery];

      //Remove image from values
      setValues({
        ...values,
        gallery: values.gallery.filter((_, index) => index !== pos)
      });

      // Update the copy of the array at customPosition with the new file
      updatedImageGallery[pos] = e.target.files[0];
      console.log("updatedImageGallery:", updatedImageGallery);
      // Set the state with the updated array
      setImageGallery(updatedImageGallery);
      // setImageGallery(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    setLoading(true);
    let uploadPromises = [];

    // Loop through each image in imageGallery to upload them
    for (let i = 0; i < imageGallery.length; i++) {
      const image = imageGallery[i];

      if (image) {
        const storageRef = ref(storage, `images/countries/${selectedCountry}/top-choices/${values.id}/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        // Push the upload task promise to the array
        uploadPromises.push(
          new Promise((resolve, reject) => {
            // Monitor upload progress
            uploadTask.on(
              'state_changed',
              (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`File ${i + 1} upload is ${progress}% done`);
                setProgress(progress);
              },
              (error) => {
                console.error(`Error uploading file ${i + 1}:`, error);
                reject(error);
              },
              () => {
                // Upload completed successfully, get the download URL
                getDownloadURL(uploadTask.snapshot.ref)
                  .then((downloadURL) => {
                    console.log(`File ${i + 1} available at:`, downloadURL);
                    // Update values state with download URL for each image
                    // Adjust this part according to your application logic
                    // For example, if you want to store all URLs in an array in 'values':
                    const updatedValues = { ...values, gallery: [...values.gallery, downloadURL] };
                    setValues(updatedValues);
                    console.log(updatedValues.gallery);
                    resolve();
                  })
                  .catch((error) => {
                    console.error(`Error getting download URL for file ${i + 1}:`, error);
                    reject(error);
                  });
              }
            );
          })
        );
      }
    }

    // Wait for all upload tasks to complete
    Promise.all(uploadPromises)
      .then(() => {
        setLoading(false);
        alert('Update completed');
      })
      .catch((error) => {
        console.error('Error uploading files:', error);
        setLoading(false);
        // Handle error or retry logic as needed
      });
  };

  const handleConvertAndSave = (inputString) => {
    const lowercasedString = inputString.toLowerCase();
    const hyphenatedString = lowercasedString.replace(/ /g, '-');
    setValues({ ...values, url: hyphenatedString });
  };

  const handleSave = async () => {
    console.log(values);
    const result = await createFirebaseDocument(values, `countries/${selectedCountry}/top-choices/`, values?.url)
    if (result) alert("Saved")
    window.scrollTo(0, 0)
  };

  useEffect(() => {
    if (data) {
      setValues(data)
      setImageGallery(data.gallery)
      // console.log(data, values);
      window.scrollTo(0, 0)
    }
  }, [data])

  useEffect(() => {
    handleConvertAndSave(values.name)
  }, [values.name])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await readFirebaseCollection(`countries/${selectedCountry}/categories`);
        setCategories(result);
        console.log(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedCountry]); // Add dependencies if necessary

  return (
    <div className='mt-[30px]'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:cursor-pointer" onClick={() => setShowEdit(false)}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
      </svg>
      <div className=' w-full flex flex-col mt-[30px]'>
        <input type='text' className='font-bold text-[26px] md:text-[32px] leading-[42px] p-[5px] border-[2px] border-black rounded-[5px]'
          value={values?.name} placeholder='Name of Place'
          onChange={(e) => setValues({ ...values, name: e.target.value })}
        />
        <div className='h-[1px] w-full bg-[#00000080] mt-[20px]'>
          <div className='h-[3px] w-[320px] bg-[#E4322C] translate-y-[-1.5px]'></div>
        </div>
      </div>
      {/* Gallery */}
      <div className='grid grid-cols-4 gap-5 mt-[60px]'>
        {/* <Image src={data?.gallery[0]} height={700} width={800} alt='image' className='col-span-3 row-span-3 h-full w-full max-h-[81vh] object-cover' /> */}
        <div className='col-span-3 row-span-3 h-full w-full max-h-[81vh] object-cover relative flex justify-center items-center rounded-[10px] overflow-hidden'>
          <Image src={values?.gallery[0] ? values.gallery[0] : '/images/background/image-template.jpg'} height={800} width={1200} className='absolute z-1 rounded-[10px] h-full w-full object-cover' alt='banner' />
          <input type="file" onChange={(e) => handleChange(e, 0)} className='relative z-3 bg-secondary p-[15px] rounded-[30px] bg-opacity-50 w-min' />
        </div>
        <div className=' w-full object-cover h-[25vh] relative flex justify-center items-center rounded-[10px] overflow-hidden'>
          <Image src={values?.gallery[1] ? values.gallery[1] : '/images/background/image-template.jpg'} height={800} width={1200} className='absolute z-1 rounded-[10px] h-[25vh] w-full object-cover max-h-[25vh]' alt='banner' />
          <input type="file" onChange={(e) => handleChange(e, 1)} className='max-w-[90%] relative z-3 bg-secondary p-[15px] rounded-[30px] bg-opacity-50 w-min' />
        </div>
        <div className=' w-full object-cover h-[25vh] relative flex justify-center items-center rounded-[10px] overflow-hidden'>
          <Image src={values?.gallery[2] ? values.gallery[2] : '/images/background/image-template.jpg'} height={800} width={1200} className='absolute z-1 rounded-[10px] h-[25vh] w-full object-cover max-h-[25vh]' alt='banner' />
          <input type="file" onChange={(e) => handleChange(e, 2)} className='max-w-[90%] relative z-3 bg-secondary p-[15px] rounded-[30px] bg-opacity-50 w-min' />
        </div>
        <div className=' w-full object-cover h-[25vh] relative flex justify-center items-center rounded-[10px] overflow-hidden'>
          <Image src={values?.gallery[3] ? values.gallery[3] : '/images/background/image-template.jpg'} height={800} width={1200} className='absolute z-1 rounded-[10px] h-[25vh] w-full object-cover max-h-[25vh]' alt='banner' />
          <input type="file" onChange={(e) => handleChange(e, 3)} className='max-w-[90%] relative z-3 bg-secondary p-[15px] rounded-[30px] bg-opacity-50 w-min' />
        </div>
      </div>

      <div className='flex mt-[15px] items-center gap-3'>
        <Button onClick={handleUpload} disabled={loading}>
          {loading ? 'Uploading...' : 'Upload'}
        </Button>
        {/* {loading && <p className='font-[600] text-[22px]'>{Math.round(progress)}%</p>} */}
      </div>
      {/* Short Description */}
      <div className='w-full flex flex-col md:flex-row justify-between mt-[20px] border-[1px] border-[#212529] p-[15px] bg-[#EFEFEF] gap-[20px]'>
        <div>
          <div className='flex items-center gap-3 text-[16px]'>
            <div className='flex items-center gap-2'>
              <p>Starts in</p>
              <input type="text"
                value={values?.startLocation}
                onChange={(e) => setValues({ ...values, startLocation: e.target.value })}
                className='p-[5px] border-[2px] border-black rounded-[5px]' />
            </div>
            <p>|</p>
            <div className='flex items-center gap-2'>
              <p>Available</p>
              <input type="text"
                value={values?.availability}
                onChange={(e) => setValues({ ...values, availability: e.target.value })}
                className='p-[5px] border-[2px] border-black rounded-[5px]' />
            </div>
          </div>
          <div className='flex items-center gap-2 mt-[10px]'>
            <p>Category</p>
            <select className='p-[5px] border-[2px] border-black rounded-[5px]' value={values?.category ? values?.category : " "}
              onChange={(e) => setValues({ ...values, category: e.target.value })}>
              <option value="" className='p-[4px]' >Choose one</option>
              {Array.isArray(categories) && categories?.map((category, id) => (
                <option value={category.title} className='p-[4px]' key={id}>{category.title}</option>
              ))}
            </select>
          </div>
          <div className='flex flex-col gap-4 flex-wrap mt-[12px] font-bold text-[15px] leading-[18px]'>

            <div className='flex gap-5 justify-between max-w-[330px]'>
              <p>Guided Tour</p>
              <div className='flex items-center gap-2'>
                <input
                  type="radio"
                  value="true"
                  checked={values.details.guidedTour === true}
                  onChange={(e) => setValues({ ...values, details: { ...values.details, guidedTour: e.target.value === "true" } })}
                  className='p-[5px] border-[2px] border-black rounded-[5px]'
                />
                <label htmlFor="true">Yes</label>
                <input
                  type="radio"
                  value="false"
                  checked={values.details.guidedTour === false}
                  onChange={(e) => setValues({ ...values, details: { ...values.details, guidedTour: e.target.value === "true" } })}
                  className='p-[5px] border-[2px] border-black rounded-[5px]'
                />
                <label htmlFor="false">No</label>
              </div>
            </div>
            <div className='flex gap-5 justify-between max-w-[330px]'>
              <p>Entrance Fee Included</p>
              <div className='flex items-center gap-2'>
                <input
                  type="radio"
                  value="true"
                  checked={values.details.entranceFeeIncluded === true}
                  onChange={(e) => setValues({ ...values, details: { ...values.details, entranceFeeIncluded: e.target.value === "true" } })}
                  className='p-[5px] border-[2px] border-black rounded-[5px]'
                />
                <label htmlFor="true">Yes</label>
                <input
                  type="radio"
                  value="false"
                  checked={values.details.entranceFeeIncluded === false}
                  onChange={(e) => setValues({ ...values, details: { ...values.details, entranceFeeIncluded: e.target.value === "true" } })}
                  className='p-[5px] border-[2px] border-black rounded-[5px]'
                />
                <label htmlFor="false">No</label>
              </div>
            </div>
            <div className='flex gap-5 justify-between max-w-[330px]'>
              <p>Expert Tour Guide</p>
              <div className='flex items-center gap-2'>
                <input
                  type="radio"
                  value="true"
                  checked={values.details.expertTourGuide === true}
                  onChange={(e) => setValues({ ...values, details: { ...values.details, expertTourGuide: e.target.value === "true" } })}
                  className='p-[5px] border-[2px] border-black rounded-[5px]'
                />
                <label htmlFor="true">Yes</label>
                <input
                  type="radio"
                  value="false"
                  checked={values.details.expertTourGuide === false}
                  onChange={(e) => setValues({ ...values, details: { ...values.details, expertTourGuide: e.target.value === "true" } })}
                  className='p-[5px] border-[2px] border-black rounded-[5px]'
                />
                <label htmlFor="false">No</label>
              </div>
            </div>
            <div className='flex gap-5 justify-between max-w-[330px]'>
              <p>Air Conditioned Transport</p>
              <div className='flex items-center gap-2'>
                <input
                  type="radio"
                  value="true"
                  checked={values.details.airconditionedTransport === true}
                  onChange={(e) => setValues({ ...values, details: { ...values.details, airconditionedTransport: e.target.value === "true" } })}
                  className='p-[5px] border-[2px] border-black rounded-[5px]'
                />
                <label htmlFor="true">Yes</label>
                <input
                  type="radio"
                  value="false"
                  checked={values.details.airconditionedTransport === false}
                  onChange={(e) => setValues({ ...values, details: { ...values.details, airconditionedTransport: e.target.value === "true" } })}
                  className='p-[5px] border-[2px] border-black rounded-[5px]'
                />
                <label htmlFor="false">No</label>
              </div>
            </div>

            <div className='flex items-center gap-2 '>
              <Image src={'/logo/stopwatch.svg'} height={100} width={20} alt='stopwatch' className='h-[20px] w-[20px]' />
              <input type="text"
                value={values?.details.hours}
                onChange={(e) => setValues({ ...values, details: { ...values.details, hours: e.target.value } })}
                className='p-[5px] border-[2px] border-black rounded-[5px]' />
              <p>Hour</p>
            </div>
            <div className='flex items-center gap-2 '>
              <Image src={'/logo/language.svg'} height={100} width={100} alt='stopwatch' className='h-[20px] w-[30px]' />
              <input type="text"
                value={values?.details.language}
                onChange={(e) => setValues({ ...values, details: { ...values.details, language: e.target.value } })}
                className='p-[5px] border-[2px] border-black rounded-[5px]' />

            </div>
          </div>
        </div>


        {/* Price */}
        <div className='flex flex-col gap-2'>
          <div className='flex items-end gap-2'>
            <p className=''>Currency </p>
            <input type="text"
              value={values?.currency}
              onChange={(e) => setValues({ ...values, currency: e.target.value })}
              placeholder='$'
              className='p-[5px] border-[2px] border-black rounded-[5px]' />
          </div>
          <div className='flex flex-col gap-2'>
            <p className='font-bold text-[16px] text-custom-red'>Upto 4 Persons</p>
            <input type="text"
              value={values?.price}
              onChange={(e) => setValues({ ...values, price: e.target.value })}
              className='p-[5px] border-[2px] border-black rounded-[5px]' />
          </div>
          <div className='flex flex-col gap-2'>
            <p className='font-bold text-[16px] text-custom-red'>From 4 Persons</p>
            <input type="text"
              value={values?.bulkPrice}
              onChange={(e) => setValues({ ...values, bulkPrice: e.target.value })}
              className='p-[5px] border-[2px] border-black rounded-[5px]' />
          </div>
        </div>
      </div>

      {/* Description */}
      <div className='flex flex-col items-center mt-[60px] gap-[20px] flex-wrap lg:flex-nowrap'>
        <div className='w-full'>
          <p className='text-[30px] font-medium'>Description</p>
          <Description setValues={setValues} values={values} />
        </div>
        <Highlight values={values} setValues={setValues} />
      </div>

      {/* Timeline */}
      <div className=' w-full flex flex-col mt-[40px]'>
        <p className='font-bold text-[26px] md:text-[32px] leading-[42px]'>{values?.name} Itinerary</p>
        <div className='h-[1px] w-full bg-[#00000080] mt-[20px]'>
          <div className='h-[3px] w-[320px] bg-[#E4322C] translate-y-[-1.5px]'></div>
        </div>
        <Itineraries values={values} setValues={setValues} />
      </div>


      {/* Pricing */}
      <AdmissionTickets setValues={setValues} values={values} />
      <div className='w-full flex flex-col items-center mt-[70px]'>
        <div className='max-w-[738px] w-full flex flex-col items-center'>
          <p className='font-bold text-[32px] leading-[42px]'>Pricing</p>
          <div className='h-[1px] w-full bg-[#00000080] flex justify-center mt-[20px]'>
            <div className='h-[3px] w-[180px] bg-[#E4322C] translate-y-[-1.5px]'></div>
          </div>
        </div>
        <PricingComponent values={values} setValues={setValues} />


        {/* Included and Excluded */}
        <IncludesExcludesComponent values={values} setValues={setValues} />
      </div >
      <Extras values={values} setValues={setValues} />

      <div className='bg-white w-full flex justify-end py-[15px] sticky bottom-0'>
        <Button className='bg-[green]' disabled={loading}
          onClick={() => handleSave()}
        >Save</Button>
      </div>
    </div>
  )
}

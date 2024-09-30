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
import Gallery from './gallery';

export default function EditPlace({ data, setShowEdit }) {
  const selectedCountry = useSelector(state => state.user.selectedCountry)
  const [imageGallery, setImageGallery] = useState(data.gallery ? data.gallery : null)
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(false);
  const [showOffer, setShowOffer] = useState(false);
  const [values, setValues] = useState(data)
  const [categories, setCategories] = useState()

  useEffect(() => {
    if (!showOffer) {
      setValues({
        ...values, offers: {
          offerTitle: '',
          offerValue: 0
        }
      })
    } else {
      setValues({
        ...values, offers: {
          price: values.price,
          bulkPrice: values.bulkPrice,
          isPercent: false,
        }
      })
    }
  }, [showOffer])

  const setOffer = (e, target) => {
    setValues({
      ...values,
      offers: { ...values.offers, [target]: e }
    });
  };

  const AddOffer = () => {
    if (values.offers.offerTitle == undefined || values.offers.offerTitle == '') {
      alert('Add an offer title')
      return
    }
    let offerValue = parseFloat(values?.offers?.offerValue) || 0;
    let price = parseFloat(values.offers.price) || 0;
    let bulkPrice = parseFloat(values.offers.bulkPrice) || 0;
    console.log(values.offers.offerTitle);

    let newPrice = price;
    let newBulkPrice = bulkPrice;

    // Check if the offer is percentage-based
    if (values.offers.isPercent) {
      newPrice = price - (price * (offerValue / 100));
      newBulkPrice = bulkPrice - (bulkPrice * (offerValue / 100));
    } else {
      // Subtract fixed value
      newPrice = price - offerValue;
      newBulkPrice = bulkPrice - offerValue;
    }
    setValues({
      ...values,
      price: newPrice,
      bulkPrice: newBulkPrice,
      isPercent: values.offers.isPercent
    });
  }

  const handleConvertAndSave = (inputString) => {
    const lowercasedString = inputString.toLowerCase();
    const hyphenatedString = lowercasedString.replace(/ /g, '-');
    setValues({ ...values, url: hyphenatedString });
  };

  const handleSave = async () => {
    setLoading(true)
    const result = await createFirebaseDocument(values, `countries/${selectedCountry}/top-choices/`, values?.url)
    if (result) {
      setLoading(false)
      alert("Saved")
    }
    window.scrollTo(0, 0)
  };

  useEffect(() => {
    if (data) {
      setValues(data)
      // console.log(data);
      
      if (data?.offers?.offerTitle != undefined) {
        setShowOffer(true)
      }
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
        // console.log(result);
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
      <Gallery values={values} setValues={setValues} />


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
          <div className='flex items-center gap-2 mt-2'>
            <p className='whitespace-nowrap'>Special Note</p>
            <input type="text"
              value={values?.tag}
              onChange={(e) => setValues({ ...values, tag: e.target.value })}
              className='p-[5px] border-[2px] border-black rounded-[5px] w-full' />
          </div>
          <div className='flex items-center gap-2 mt-[10px]'>
            <p>Tour Type</p>
            <select className='p-[5px] border-[2px] border-black rounded-[5px]' value={values?.tourType ? values?.tourType : " "}
              onChange={(e) => setValues({ ...values, tourType: e.target.value })}>
              <option value="" className='p-[4px]' >Choose one</option>
              <option value={'Private Tour'} className='p-[4px]' >Private Tour</option>
              <option value={'SIC Tour'} className='p-[4px]' >SIC Tour</option>
            </select>
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
            <div className='flex gap-5 justify-between max-w-[330px]'>
              <p>High Rated</p>
              <div className='flex items-center gap-2'>
                <input
                  type="radio"
                  value="true"
                  checked={values.details.highRated === true}
                  onChange={(e) => setValues({ ...values, details: { ...values.details, highRated: e.target.value === "true" } })}
                  className='p-[5px] border-[2px] border-black rounded-[5px]'
                />
                <label htmlFor="true">Yes</label>
                <input
                  type="radio"
                  value="false"
                  checked={values.details.highRated === false}
                  onChange={(e) => setValues({ ...values, details: { ...values.details, highRated: e.target.value === "true" } })}
                  className='p-[5px] border-[2px] border-black rounded-[5px]'
                />
                <label htmlFor="false">No</label>
              </div>
            </div>
            <div className='flex items-center gap-2 mt-[10px] w-full'>
              <p>Rating</p>
              <select className='p-[5px] border-[2px] border-black rounded-[5px]' value={values.details.rating ? values.details.rating : " "}
                onChange={(e) => setValues({ ...values, details: { ...values.details, rating: e.target.value } })}>
                <option value="" className='p-[4px]' >Choose one</option>
                <option value={1} className='p-[4px]'>{1}</option>
                <option value={2} className='p-[4px]'>{2}</option>
                <option value={3} className='p-[4px]'>{3}</option>
                <option value={4} className='p-[4px]'>{4}</option>
                <option value={5} className='p-[4px]'>{5}</option>
              </select>
            </div>
            <div className='flex gap-5 justify-between max-w-[330px]'>
              <p>Recommended</p>
              <div className='flex items-center gap-2'>
                <input
                  type="radio"
                  value="true"
                  checked={values.details.recommended === true}
                  onChange={(e) => setValues({ ...values, details: { ...values.details, recommended: e.target.value === "true" } })}
                  className='p-[5px] border-[2px] border-black rounded-[5px]'
                />
                <label htmlFor="true">Yes</label>
                <input
                  type="radio"
                  value="false"
                  checked={values.details.recommended === false}
                  onChange={(e) => setValues({ ...values, details: { ...values.details, recommended: e.target.value === "true" } })}
                  className='p-[5px] border-[2px] border-black rounded-[5px]'
                />
                <label htmlFor="false">No</label>
              </div>
            </div>
            <div className='flex gap-5 justify-between max-w-[330px]'>
              <p>Availability</p>
              <div className='flex items-center gap-2'>
                <input
                  type="radio"
                  value="true"
                  checked={values.details.availability === true}
                  onChange={(e) => setValues({ ...values, details: { ...values.details, availability: e.target.value === "true" } })}
                  className='p-[5px] border-[2px] border-black rounded-[5px]'
                />
                <label htmlFor="true">Yes</label>
                <input
                  type="radio"
                  value="false"
                  checked={values.details.availability === false}
                  onChange={(e) => setValues({ ...values, details: { ...values.details, availability: e.target.value === "true" } })}
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

          {/* Offer Section */}
          <div className='flex items-center gap-2'>
            <p className='font-bold text-[16px]'>Offer available?</p>
            <input type="checkbox"
              checked={showOffer}
              onChange={(e) => setShowOffer(e.target.checked)}
              className='p-[5px] border-[2px] border-black rounded-[5px]' />
          </div>
          {showOffer &&
            <>
              <div className='flex flex-col gap-2'>
                <p className='font-bold text-[16px]'>Offer Title</p>
                <input type="text"
                  value={values?.offers?.offerTitle}
                  onChange={(e) => setValues({ ...values, offers: { ...values.offers, offerTitle: e.target.value } })}
                  className='p-[5px] border-[2px] border-black rounded-[5px]' />
              </div>

              <div className='flex flex-col gap-2'>
                <p className='font-bold text-[16px]'>Price without offer</p>
                <input type="text"
                  value={values?.offers?.price}
                  defaultValue={values?.price}
                  onChange={(e) => setOffer(e.target.value, 'price')}
                  className='p-[5px] border-[2px] border-black rounded-[5px]'
                  placeholder='Price Upto 4'
                />
              </div>
              <div className='flex flex-col gap-2'>
                {/* <p className='font-bold text-[16px]'>Offer Value</p> */}
                <input type="text"
                  value={values?.offers?.bulkPrice}
                  defaultValue={values?.bulkPrice}
                  onChange={(e) => setOffer(e.target.value, 'bulkPrice')}
                  className='p-[5px] border-[2px] border-black rounded-[5px]'
                  placeholder='Price from 4'
                />
              </div>
              <div className='flex flex-col gap-2'>
                <p className='font-bold text-[16px]'>Offer Value</p>
                <input type="text"
                  value={values?.offers?.offerValue}
                  onChange={(e) => setOffer(e.target.value, 'offerValue')}
                  className='p-[5px] border-[2px] border-black rounded-[5px]'
                  defaultValue={0}
                />
              </div>

              <div className='flex items-center gap-2'>
                <p className='font-bold text-[16px]'>Is Percentage?</p>
                <input type="checkbox"
                  checked={values?.offers?.isPercent}
                  onChange={(e) => setOffer(e.target.checked, 'isPercent')}
                  className='p-[5px] border-[2px] border-black rounded-[5px]' />
              </div>
              <Button
                onClick={AddOffer}
                className='bg-secondary'
              >
                Add Offer
              </Button>
            </>}
          <div className='flex flex-col gap-2'>
            <p className='font-bold text-[16px] text-custom-red'>Upto 4 Persons</p>
            <input type="text"
              value={values?.price}
              onChange={(e) => setValues({ ...values, price: e.target.value })}
              className='p-[5px] border-[2px] border-black rounded-[5px]'
              disabled={showOffer}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <p className='font-bold text-[16px] text-custom-red'>From 4 Persons</p>
            <input type="text"
              value={values?.bulkPrice}
              onChange={(e) => setValues({ ...values, bulkPrice: e.target.value })}
              className='p-[5px] border-[2px] border-black rounded-[5px]'
              disabled={showOffer}
            />
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

      <div className='bg-white w-full flex gap-3 items-center justify-end py-[15px] sticky bottom-0'>
        {loading && <Image src={'/icons/loading.svg'} alt='loading' height={100} width={100} className='h-[30px] w-[30px]' />}
        <Button className='bg-[green] flex ' disabled={loading}
          onClick={() => handleSave()}
        >Save
        </Button>
      </div>
    </div>
  )
}

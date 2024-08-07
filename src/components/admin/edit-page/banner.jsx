'use client'
import React, { useEffect, useState } from 'react'
import { db, deleteImage, storage } from '../../../app/firebase'
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Button } from '@material-tailwind/react';
import Image from 'next/image';
import { addDoc, collection, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';

export default function Banner() {
  const currentCountry = useSelector(state => state.user.selectedCountry)
  const [image, setImage] = useState(null)
  const [currentImage, setCurrentImage] = useState(null)
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(false);
  const [wait, setWait] = useState(false);
  const [tempItem, setTempItem] = useState('');
  const [tempWeather, setTempWeather] = useState(
    {
      from: '',
      to: '',
      highTemp: '',
      lowTemp: '',
      degree: 'Celsius'
    });
  const [values, setValues] = useState({
    background: "",
    heading: "",
    tagline: "",
    description: "",
    timezone: "",
    currency: "",
    howItFeels: "",
    weather: [],
    neverMiss: []
  })
  const handleAddItem = () => {
    if (tempItem.trim()) {
      setValues(prevValues => {
        // Ensure neverMiss is an array
        const updatedNeverMiss = Array.isArray(prevValues.neverMiss) ? prevValues.neverMiss : [];
        return {
          ...prevValues,
          neverMiss: [...updatedNeverMiss, tempItem]
        };
      });
      setTempItem('');
    }
  };

  const handleRemoveItem = (index) => {
    setValues(prevValues => ({
      ...prevValues,
      neverMiss: prevValues.neverMiss.filter((_, i) => i !== index)
    }));
  };

  const handleInputChange = (e) => {
    setTempItem(e.target.value);
  };
  // Handle input changes for the temporary weather state
  const handleWeatherChange = (e) => {
    const { name, value } = e.target;
    setTempWeather({ ...tempWeather, [name]: value });
  };

  // Function to add a new weather entry to the values state
  const addWeather = () => {
    if (values?.weather) {
      setValues({ ...values, weather: [...values?.weather, tempWeather] });
    } else {
      setValues({ ...values, weather: [tempWeather] });
    }
    // Clear temporary weather state
    setTempWeather({
      from: '',
      to: '',
      highTemp: '',
      lowTemp: '',
      degree: 'Celsius'
    });
  };

  // Function to remove a weather entry from the values state
  const removeWeather = (index) => {
    setValues({
      ...values,
      weather: values.weather.filter((_, i) => i !== index)
    });
  };

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
    const storageRef = ref(storage, `images/countries/${currentCountry}/banner/${image.name}`);
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
  }

  const handleSave = async () => {
    try {
      // Reference to the specific document in the "countries" collection
      const docRef = doc(db, `countries/${currentCountry}/landing/hero`);

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
      const docRef = doc(db, `countries/${currentCountry}/landing/hero`);
      const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = { ...docSnapshot.data(), id: docSnapshot.id };
          // console.log("Document successfully read!", data);
          setValues(data)
        } else {
          console.log("No such document!");
        }
      });
    } catch (error) {
      console.error("Error reading document: ", error);
    }
  }

  useEffect(() => {
    handleFirebaseRead()
    setCurrentImage(null)
  }, [currentCountry])

  useEffect(() => {
    if (image && values.background == "") setWait(true)
  }, [image, values.background])

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
      <p className='text-[26px] mt-[40px]'>About Country</p>
      <div className='flex flex-col'>
        <div>
          <p className='text-[22px] mt-[20px]'>Description About Country</p>
          <textarea type="text" className='p-[10px] border-[2px] border-black rounded-[5px] w-full h-[200px]' value={values.description} onChange={(e) => setValues({ ...values, description: e.target.value })} />
        </div>
        <div className='flex w-full gap-4'>
          <div>
            <p className='text-[22px] mt-[20px]'>Timezone</p>
            <input type="text"
              className='p-[10px] border-[2px] border-black rounded-[5px] w-full'
              value={values.timezone}
              onChange={(e) => setValues({ ...values, timezone: e.target.value })}
              placeholder='GMT +4:00'
            />
          </div>
          <div>
            <p className='text-[22px] mt-[20px]'>Currency</p>
            <input type="text"
              className='p-[10px] border-[2px] border-black rounded-[5px] w-full'
              value={values.currency}
              onChange={(e) => setValues({ ...values, currency: e.target.value })}
              placeholder='USD'
            />
          </div>
          <div>
            <p className='text-[22px] mt-[20px]'>Currency Symbol</p>
            <input type="text"
              className='p-[10px] border-[2px] border-black rounded-[5px] w-full'
              value={values.currencySymbol}
              onChange={(e) => setValues({ ...values, currencySymbol: e.target.value })}
              placeholder='$'
            />
          </div>
        </div>
        <div className="w-full mx-auto p-4 bg-gray-100 rounded-lg shadow-lg mt-[30px]">
          <h2 className="text-2xl font-semibold text-center mb-6">Weather Details</h2>
          <div className='flex gap-10'>
            <form className="space-y-4 bg-white p-6 rounded-lg shadow-sm max-w-lg">
              <div className="flex flex-col">
                <label className="mb-1 font-medium">From Month:</label>
                <input
                  type="text"
                  name="from"
                  value={tempWeather.from}
                  onChange={handleWeatherChange}
                  required
                  className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 font-medium">To Month:</label>
                <input
                  type="text"
                  name="to"
                  value={tempWeather.to}
                  onChange={handleWeatherChange}
                  required
                  className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 font-medium">High Temperature:</label>
                <input
                  type="number"
                  name="highTemp"
                  value={tempWeather.highTemp}
                  onChange={handleWeatherChange}
                  required
                  className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 font-medium">Low Temperature:</label>
                <input
                  type="number"
                  name="lowTemp"
                  value={tempWeather.lowTemp}
                  onChange={handleWeatherChange}
                  required
                  className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 font-medium">Degree:</label>
                <select
                  name="degree"
                  value={tempWeather.degree}
                  onChange={handleWeatherChange}
                  className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Celsius">Celsius</option>
                  <option value="Fahrenheit">Fahrenheit</option>
                </select>
              </div>
              <button
                type="button"
                onClick={addWeather}
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Add Weather
              </button>
            </form>
            <ul className="w-full flex gap-3 flex-wrap">
              {values.weather && values.weather.map((weatherEntry, index) => (
                <div
                  key={index}
                  style={{ boxShadow: "0px 4px 11.2px 0px #00000040" }}
                  className='rounded-[10px] p-[15px] h-[196px] w-[184px] flex flex-col justify-between'
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill="#000"
                      d="M10 6.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5zM10 5a5 5 0 110 10 5 5 0 010-10zm0 15a.624.624 0 00.625-.625v-2.5a.624.624 0 10-1.25 0v2.5A.625.625 0 0010 20zm0-16.25a.625.625 0 00.625-.625v-2.5a.625.625 0 10-1.25 0v2.5A.625.625 0 0010 3.75zM20 10a.625.625 0 00-.625-.625h-2.5a.625.625 0 100 1.25h2.5A.624.624 0 0020 10zM3.75 10a.625.625 0 00-.625-.625h-2.5a.625.625 0 000 1.25h2.5A.625.625 0 003.75 10zm13.321 7.071a.625.625 0 000-.884l-1.767-1.768a.627.627 0 00-1.02.203.626.626 0 00.136.682l1.768 1.767a.625.625 0 00.883 0zM5.58 5.58a.625.625 0 000-.884L3.812 2.93a.625.625 0 00-.883.884L4.696 5.58a.625.625 0 00.884 0zm11.491-2.651a.625.625 0 00-.884 0L14.42 4.696a.625.625 0 00.884.884l1.767-1.768a.625.625 0 000-.883zM5.58 14.419a.625.625 0 00-.884 0L2.93 16.187a.625.625 0 10.884.884l1.767-1.767a.626.626 0 000-.885z"
                    ></path>
                  </svg>
                  <div className='pl-3'>
                    <p>{weatherEntry.from} to {weatherEntry.to}</p>
                    <p>{weatherEntry.lowTemp} - {weatherEntry.highTemp}°{weatherEntry.degree == "Celsius" ? "C" : "F"}</p>
                  </div>
                  <button
                    onClick={() => removeWeather(index)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-300"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </ul>
          </div>
          <p className='text-custom-red mt-3'>Click Save button below to save the weathers</p>
          <div>
            <p className='text-[22px] mt-[20px]'>How It Feels Like</p>
            <input type="text" className='p-[10px] border-[2px] border-black rounded-[5px] w-full' value={values.howItFeels} onChange={(e) => setValues({ ...values, howItFeels: e.target.value })} />
          </div>
        </div>
        <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-md mt-[40px]">
          <h2 className="text-xl font-bold mb-4">Things to Never Miss</h2>
          <div className="mb-4">
            <input
              type="text"
              value={tempItem}
              onChange={handleInputChange}
              placeholder="Add an item"
              className="border p-2 w-full rounded"
            />
            <button
              type="button"
              onClick={handleAddItem}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Item
            </button>
          </div>
          <ul className="space-y-2">
            {values.neverMiss && values.neverMiss.map((item, index) => (
              <li key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded shadow-sm">
                <span>{item}</span>
                <button
                  onClick={() => handleRemoveItem(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Button onClick={handleSave} disabled={wait} className='mt-[20px]'>
        {wait ? "Upload Image first" : "Save"}
      </Button>
    </div>
  )
}

import { createDocumentWithAutoId, db, deleteFirebaseDocument, deleteImage, readFirebaseCollection, storage, updateFirebaseDocument } from '@/app/firebase';
import AttractionsCard from '@/components/cards/attractions-card';
import { Button } from '@material-tailwind/react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const Countries = ['Japan', 'South Korea', 'Taiwan', 'Philippines', 'United Kingdom', 'Switzerland', 'France', 'Italy', 'Spain', 'Portugal', 'Germany', 'Scandinavian Countries'
]

export default function Cities() {
  const [currentCountry, setCurrentCountry] = useState('Japan')
  const [countries, setCountries] = useState('Japan')
  const [image, setImage] = useState(null)
  const [currentImage, setCurrentImage] = useState(null)
  const [showEdit, setShowEdit] = useState(false)
  const [loading, setLoading] = useState(false)
  const [wait, setWait] = useState(false)
  const [progress, setProgress] = useState('')
  const [data, setData] = useState(null);
  const [values, setValues] = useState(null)
  const [loadingData, setLoadingData] = useState(true)

  const getData = async () => {
    try {
      const response = await (readFirebaseCollection(`countries/${currentCountry}/cities`))
      const responseCountries = await (readFirebaseCollection(`destinations`))
      setCountries(responseCountries.map(country => country.name))
      setData(response);
      setLoadingData(false)
    } catch (error) {
      console.log("Error reading collection");
      setLoadingData(false)
    }
  }

  useEffect(() => {
    getData()
  }, [currentCountry])

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
      setCurrentImage(values.background)
    }
  }
  const handleUpload = () => {
    if (!image) return;
    if (currentImage) {
      try {
        deleteImage(values.image)
      } catch (err) {
        console.log(err);
      }
    }
    setLoading(true);
    setWait(true)
    const storageRef = ref(storage, `images/countries/${currentCountry}/cities/${image.name}`);
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
          setValues({ ...values, image: downloadURL })
          setWait(false)
          console.log('File available at', downloadURL);
          setLoading(false);
        });
      }
    );
  };

  const handleSave = async (id) => {
    // console.log(values);
    if (id) {
      await updateFirebaseDocument(values, `countries/${currentCountry}/cities/${id}`)
      getData()
    } else {
      await createDocumentWithAutoId(values, `countries/${currentCountry}/cities`)
      getData()
    }
    alert("Saved")
    setShowEdit(false)
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this top attraction")) {
      await deleteFirebaseDocument(`countries/${currentCountry}/cities/${id}`)
      getData()
    }
    // alert('Delete Succesfull')
  }
  return (
    <>
      <div className='flex flex-col gap-2 p-[3%]'>
        <p>Choose a Country</p>
        <select name="country" id="country"
          value={currentCountry}
          onChange={(e) => setCurrentCountry(e.target.value)}
          className='border-[1px] border-black rounded-[10px] p-[10px] w-[300px]'
        >
          {Countries.map((country, id) => (
            <option key={id} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      {loadingData ? <div className='h-[full] w-[full] text-[22px] font-[600] flex justify-center items-center pt-[30vh]'>Loading</div> :
        <>
          <div className='px-[5%]'>
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-[10px] md:gap-[30px] w-full mt-[20px]'>
              <div className='h-full w-full shadow-lg rounded-md border-[2px] border-black flex items-center justify-center hover:cursor-pointer min-h-[400px]'
                onClick={() => {
                  setValues("")
                  setShowEdit(true)
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                </svg>
              </div>
              {data?.map((data, id) => {
                return (
                  <div key={id}>
                    <AttractionsCard data={data} />
                    <div className='flex mt-[15px] gap-2'>
                      <Button fullWidth className='bg-[blue]'
                        onClick={() => {
                          setShowEdit(true)
                          setValues(data)
                        }}>Edit</Button>
                      <Button fullWidth className='bg-[red]'
                        onClick={() => handleDelete(data?.id)}
                      >Delete</Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          {showEdit &&
            <div className='fixed h-full w-full top-0 left-0 backdrop-blur-md z-10 flex justify-center items-center shadow-lg '>
              <div
                className='min-h-[300px] w-screen max-w-[500px] rounded-[10px] bg-white border-[2px] p-[15px]'
              >
                <div className='flex w-full justify-end'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:cursor-pointer"
                    onClick={() => setShowEdit(false)}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </div>
                <div className='h-[150px] w-[300px] relative flex justify-center items-center rounded-[10px] overflow-hidden mx-auto'>
                  <Image src={values.image ? values.image : '/images/background/image-template.jpg'} height={500} width={500} className='absolute z-1 rounded-[10px] h-full object-cover' alt='banner' />
                  <input type="file" onChange={handleChange} className='relative z-3 bg-secondary p-[15px] rounded-[30px] bg-opacity-50 w-[100%]' />
                </div>
                <div className='flex mt-[15px] items-center gap-3'>
                  <Button onClick={handleUpload} disabled={loading}>
                    {loading ? 'Uploading...' : 'Upload'}
                  </Button>
                  {loading && <p className='font-[600] text-[22px]'>{Math.round(progress)}%</p>}
                </div>
                <div className='flex flex-col'>
                  <div>
                    <input type="text" className='p-[10px] border-[2px] border-black rounded-[5px] w-full my-[10px]' value={values.title} onChange={(e) => setValues({ ...values, title: e.target.value })} placeholder='City Name' />
                  </div>
                  <div>
                    <textarea type="text" className='p-[10px] border-[2px] border-black rounded-[5px] w-full my-[10px]' value={values.description} onChange={(e) => setValues({ ...values, description: e.target.value })} placeholder='Description' />
                  </div>
                </div>
                <Button onClick={() => handleSave(values?.id)} disabled={wait} className='mt-[10px]'>
                  {wait ? "Upload Image first" : "Save"}
                </Button>
              </div>
            </div>
          }
        </>
      }
    </>
  )
}

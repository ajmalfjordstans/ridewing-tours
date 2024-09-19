import { createDocumentWithAutoId, createFirebaseDocument, db, deleteFirebaseDocument, readFirebaseCollection, readFirebaseDocument, storage, updateFirebaseDocument } from '@/app/firebase'
import TransferCard from '@/app/transfers/[transfers]/card'
import TransferGuideCard from '@/app/transfers/[transfers]/guide-card'
import { Button } from '@material-tailwind/react'
import { collection } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useSelector } from 'react-redux'

const Guide = [
  { "name": "Narita International Airport", "image": "/images/japan-attractions/hiroshima.jpg" },
  { "name": "Haneda Airport", "image": "/images/japan-attractions/hiroshima.jpg" },
  { "name": "Kansai International Airport", "image": "/images/japan-attractions/hiroshima.jpg" },
  { "name": "Chubu Centrair International Airport", "image": "/images/japan-attractions/hiroshima.jpg" },
  { "name": "Fukuoka Airport", "image": "/images/japan-attractions/hiroshima.jpg" },
  { "name": "New Chitose Airport", "image": "/images/japan-attractions/hiroshima.jpg" },
  { "name": "Naha Airport", "image": "/images/japan-attractions/hiroshima.jpg" },
  { "name": "Hiroshima Airport", "image": "/images/japan-attractions/hiroshima.jpg" },
  { "name": "Sendai Airport", "image": "/images/japan-attractions/hiroshima.jpg" },
  { "name": "Kagoshima Airport", "image": "/images/japan-attractions/hiroshima.jpg" }
]

export default function Guides() {
  const currentCountry = useSelector(state => state.user.selectedCountry)
  const [image, setImage] = useState(null)
  const [currentImage, setCurrentImage] = useState(null)
  const [showEdit, setShowEdit] = useState(false)
  const [loading, setLoading] = useState(false)
  const [wait, setWait] = useState(false)
  const [progress, setProgress] = useState('')
  const [values, setValues] = useState({
    title: '',
    name: '',
    price: '',
    currency: '',
    date: null,
    languages: [] // Initialize languages as an empty array
  })
  const [language, setLanguage] = useState([]);
  //Fetch Data
  const [data, setData] = useState(null);
  const selectedCountry = useSelector(state => state.user.selectedCountry)
  const [queryPath, setQueryPath] = useState(`countries/${selectedCountry}/guides`);
  const [loadingData, setLoadingData] = useState(true)

  const getData = async () => {
    try {
      const response = await (readFirebaseCollection(queryPath))
      const responseAbout = await (readFirebaseDocument(`countries/${currentCountry}/landing/hero`))
      setValues({ ...values, currency: responseAbout?.currency })
      // console.log(responseAbout.currency);
      setData(response);
      setLoadingData(false)
    } catch (error) {
      console.log("Error reading collection");
      setLoadingData(false)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    setQueryPath(`countries/${selectedCountry}/guides`);
  }, [selectedCountry]);

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
      setCurrentImage(values.image)
      setValues({ ...values, image: "" })
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
    const storageRef = ref(storage, `images/countries/${selectedCountry}/guides/${image.name}`);
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
    // createFirebaseDocument(value, `countries/${currentCountry}/guides`, id)
    if (id) {
      await updateFirebaseDocument(values, `countries/${currentCountry}/guides/${id}`)
      getData()
    } else {
      await createDocumentWithAutoId(values, `countries/${currentCountry}/guides`)
      getData()
    }
    // alert(JSON.stringify(value))
    setShowEdit(false)
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this guide?")) {
      await deleteFirebaseDocument(`countries/${currentCountry}/guides/${id}`)
      getData()
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && language.trim() !== '') {
      setValues((prevValues) => ({
        ...prevValues,
        languages: [...(prevValues.languages || []), language.trim()]
      }));
      setLanguage(""); // Clear the input field
    }
  };
  return (
    <>
      {loadingData ? <div className='h-[full] w-[full] text-[22px] font-[600] flex justify-center items-center pt-[30vh]'>Loading</div> :
        <>
          <div className='px-[5%]'>
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-[10px] md:gap-[30px] w-full mt-[48px]'>
              <div className='h-full w-full shadow-lg rounded-md border-[2px] border-black flex items-center justify-center hover:cursor-pointer min-h-[400px]'
                onClick={() => {
                  setValues(values)
                  setShowEdit(true)
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                </svg>
              </div>
              {data?.map((data, id) => {
                return (
                  <div key={id} className='hover:cursor-pointer' >
                    <TransferGuideCard data={data} />
                    <div className='flex mt-[15px] gap-2'>
                      <Button fullWidth className='bg-[blue]'
                        onClick={() => {
                          setShowEdit(true)
                          setValues({...data, currency:values.currency })
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
                    <input type="text" className='p-[10px] border-[2px] border-black rounded-[5px] w-full my-[10px]' value={values.name} onChange={(e) => setValues({ ...values, name: e.target.value })} placeholder='Name of guide' required />
                  </div>
                  <div className='flex gap-2 w-full'>
                    <input type="number" min={"1"} className='p-[10px] border-[2px] border-black rounded-[5px] w-full my-[10px]' value={values.price} onChange={(e) => setValues({ ...values, price: e.target.value })} placeholder='Price/hour' required />

                    <input
                      type="text" className='p-[10px] border-[2px] border-black rounded-[5px] w-full my-[10px]'
                      value={values.currency}
                      onChange={(e) => setValues({ ...values, currency: e.target.value })} placeholder='Currency' required />

                  </div>

                  <div className='border-[2px] border-black rounded-[5px] p-[10px]'>
                    <input
                      type="text"
                      className=' outline-none  w-full mb-[10px]'
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder='Languages (Press enter to add language)'
                      required
                    />
                    <div>
                      <div className='flex gap-2'>
                        {values?.languages?.map((language, index) => (
                          <div className='border-[1px] border-black rounded-[3px] p-[5px] flex gap-1 items-center' key={index}>
                            <div>{language}</div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 hover:cursor-pointer"
                              onClick={() => setValues({ ...values, languages: values.languages.filter(value => value !== language) })}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <textarea type="text" className='p-[10px] border-[2px] border-black rounded-[5px] w-full my-[10px]' value={values.description} onChange={(e) => setValues({ ...values, description: e.target.value })} placeholder='Description' />
                  </div>
                </div>
                <Button onClick={() => handleSave(values?.id)} disabled={wait} className=' '>
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
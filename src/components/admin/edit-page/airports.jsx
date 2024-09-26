import { createDocumentWithAutoId, createFirebaseDocument, db, deleteFirebaseDocument, readFirebaseCollection, storage, updateFirebaseDocument } from '@/app/firebase'
import TransferCard from '@/app/transfers/[transfers]/card'
import { Button } from '@material-tailwind/react'
import { collection } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useSelector } from 'react-redux'

const AirportsDetails = [
  { "name": "Narita International Airport", "id": "NRT", "image": "/images/japan-attractions/hiroshima.jpg" },
  { "name": "Haneda Airport", "id": "HND", "image": "/images/japan-attractions/hiroshima.jpg" },
  { "name": "Kansai International Airport", "id": "KIX", "image": "/images/japan-attractions/hiroshima.jpg" },
  { "name": "Chubu Centrair International Airport", "id": "NGO", "image": "/images/japan-attractions/hiroshima.jpg" },
  { "name": "Fukuoka Airport", "id": "FUK", "image": "/images/japan-attractions/hiroshima.jpg" },
  { "name": "New Chitose Airport", "id": "CTS", "image": "/images/japan-attractions/hiroshima.jpg" },
  { "name": "Naha Airport", "id": "OKA", "image": "/images/japan-attractions/hiroshima.jpg" },
  { "name": "Hiroshima Airport", "id": "HIJ", "image": "/images/japan-attractions/hiroshima.jpg" },
  { "name": "Sendai Airport", "id": "SDJ", "image": "/images/japan-attractions/hiroshima.jpg" },
  { "name": "Kagoshima Airport", "id": "KOJ", "image": "/images/japan-attractions/hiroshima.jpg" }
]

export default function Airports() {
  const currentCountry = useSelector(state => state.user.selectedCountry)
  const currency = useSelector(state => state.user.currency.code)
  const [image, setImage] = useState(null)
  const [currentImage, setCurrentImage] = useState(null)
  const [showEdit, setShowEdit] = useState(false)
  const [loading, setLoading] = useState(false)
  const [wait, setWait] = useState(false)
  const [progress, setProgress] = useState('')
  const [values, setValues] = useState({
    currency: currency
  })
  const [data, setData] = useState(null)
  const [loadingData, setLoadingData] = useState(true)

  useEffect(() => {
    console.log(currency, values.currency);
    getData()
  }, [])

  const getData = async () => {
    try {
      const response = await (readFirebaseCollection(`countries/${currentCountry}/airports`))
      setData(response);
      setLoadingData(false)
    } catch (error) {
      console.log("Error reading collection");
      setLoadingData(false)
    }
  }

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
        deleteImage(values.image)
      } catch (err) {
        console.log(err);
      }
    }
    setLoading(true);
    setWait(true)
    const storageRef = ref(storage, `images/countries/${currentCountry}/airports/${image.name}`);
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
    await createFirebaseDocument(values, `countries/${currentCountry}/airports`, id)
    alert("Saved")
    setShowEdit(false)
    getData()
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this airport?")) {
      await deleteFirebaseDocument(`countries/${currentCountry}/airports/${id}`)
      getData()
      alert('Delete Succesfull')
    }
  }
  // useEffect(() => {
  //   setData(docs);
  // }, [firebaseLoading, docs]);
  return (
    <>
      {loadingData ? <div className='h-[full] w-[full] text-[22px] font-[600] flex justify-center items-center pt-[30vh]'>Loading</div> :
        <>
          <div className='px-[5%]'>
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-[10px] md:gap-[30px] w-full mt-[48px]'>
              <div className='h-full w-full shadow-lg rounded-md border-[2px] border-black flex items-center justify-center hover:cursor-pointer min-h-[400px]'
                onClick={() => {
                  setValues({...values, currency: currency})
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
                    <TransferCard data={data} />
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
                    <input type="text" className='p-[10px] border-[2px] border-black rounded-[5px] w-full my-[10px]'
                      value={values.name}
                      onChange={(e) => setValues({ ...values, name: e.target.value })} placeholder='Name' required />
                  </div>
                  <div className='grid grid-cols-3 gap-3'>
                    <div>
                      <input type="text" className='p-[10px] border-[2px] border-black rounded-[5px] w-full my-[10px]'
                        value={values.id}
                        onChange={(e) => setValues({ ...values, id: e.target.value })} placeholder='Code' required />
                    </div>
                    <div>
                      <input type="number" min={"1"} className='p-[10px] border-[2px] border-black rounded-[5px] w-full my-[10px]' value={values.price}
                        onChange={(e) => setValues({ ...values, price: e.target.value })} placeholder='Price' required />
                    </div>
                    <div>
                      <input type="text" className='p-[10px] border-[2px] border-black rounded-[5px] w-full my-[10px]'
                        value={values.currency}
                        onChange={(e) => setValues({ ...values, currency: e.target.value })} placeholder='Currency' required />
                    </div>
                  </div>
                </div>
                <Button onClick={() => handleSave(values?.id)} disabled={wait} className='mt-[20px]'>
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
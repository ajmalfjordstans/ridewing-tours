import { createDocumentWithAutoId, createFirebaseDocument, db, deleteFirebaseDocument, deleteImage, readFirebaseCollection, storage, updateFirebaseDocument } from '@/app/firebase';
import AttractionsCard from '@/components/cards/attractions-card';
import { Button } from '@material-tailwind/react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

export default function Transfers() {
  const currentCountry = useSelector(state => state.user.selectedCountry)
  const [image, setImage] = useState(null)
  const [currentImage, setCurrentImage] = useState(null)
  const [showEdit, setShowEdit] = useState(false)
  const [loading, setLoading] = useState(false)
  const [wait, setWait] = useState(false)
  const [progress, setProgress] = useState('')
  const [data, setData] = useState([
    {
      id: 'airport',
      name: 'Airport Transfer',
      image: 'https://images.unsplash.com/photo-1558204692-5f402fe220b9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      url: "transfers/airports"
    },
    {
      id: 'station',
      name: 'Station Transfer',
      image: 'https://images.unsplash.com/photo-1556276521-5d97a68009d3?q=80&w=1942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      url: "transfers/stations"
    },
    {
      id: 'guide',
      name: 'Guide',
      image: 'https://images.unsplash.com/photo-1529927120475-c3f1bcc1cec6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      url: "transfers/guides"
    },
    {
      id: 'custom',
      name: 'Custom Tour',
      image: 'https://images.unsplash.com/photo-1519659528534-7fd733a832a0?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      url: "transfers/custom-package"
    }
  ]);
  const [values, setValues] = useState(null)
  const [loadingData, setLoadingData] = useState(true)

  const initializeTransfer = async () => {
    alert("Please wait while creating transfers")
    await Promise.all(
      data.map((item) => createFirebaseDocument(item, `countries/${currentCountry}/transfers`, item.id))
    );
    getData()
  };

  const getData = async () => {
    try {
      const response = await (readFirebaseCollection(`countries/${currentCountry}/transfers`))
      if (Array.isArray(response) && response.length === 0) {
        initializeTransfer();
      }
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

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
      setCurrentImage(e.target.files[0])
    }
  }
  const handleUpload = () => {
    return new Promise((resolve, reject) => {
      if (!image) return reject('No image selected');
      if (currentImage) {
        try {
          deleteImage(values.image);
        } catch (err) {
          console.log(err);
        }
      }

      setLoading(true);
      setWait(true);
      const storageRef = ref(storage, `images/countries/${currentCountry}/transfers/${image.name}`);
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
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              setValues((prevValues) => ({ ...prevValues, image: downloadURL }));
              setLoading(false);
              setWait(false);
              resolve({ ...values, image: downloadURL }); // Resolve the promise when upload is done
            })
            .catch(reject);
        }
      );
    });
  };

  const handleSave = async (id) => {
    try {
      const value = await handleUpload(); // Wait for the image to upload
      if (id) {
        await updateFirebaseDocument(value, `countries/${currentCountry}/transfers/${id}`);
      } else {
        await createDocumentWithAutoId(value, `countries/${currentCountry}/transfers`);
      }
      alert('Saved');
      setCurrentImage(null)
      setShowEdit(false);
    } catch (error) {
      console.error('Error during save process:', error);
    }
    getData();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this top attraction")) {
      await deleteFirebaseDocument(`countries/${currentCountry}/transfers/${id}`)
      getData()
    }
    // alert('Delete Succesfull')
  }
  return (
    <>
      {loadingData ? <div className='h-[full] w-[full] text-[22px] font-[600] flex justify-center items-center pt-[30vh]'>Loading</div> :
        <>
          <div className='px-[5%]'>
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-[10px] md:gap-[30px] w-full mt-[48px]'>
              {data?.map((data, id) => {
                return (
                  <div key={id}>
                    <div className='w-full h-[200px] md:h-[368px] rounded-[10px] font-bold overflow-hidden flex items-end relative'>
                      <Image
                        src={data.image ? data.image : "/images/background/image-template.jpg"}
                        alt={data.id}
                        height={700}
                        width={700}
                        className={`w-full h-full object-cover`}
                      />
                      <div className='absolute bottom-0 h-[76px] w-full p-[15px] bg-[#00000080] text-white'>
                        <p className=''>{data.name}</p>
                      </div>
                    </div>
                    <div className='flex mt-[15px] gap-2'>
                      <Button fullWidth className='bg-[blue]'
                        onClick={() => {
                          setShowEdit(true)
                          setValues(data)
                        }}>Edit</Button>
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
                  <Image src={currentImage ? URL.createObjectURL(currentImage) : '/images/background/image-template.jpg'} height={500} width={500} className='absolute z-1 rounded-[10px] h-full object-cover' alt='banner' />
                  <input type="file" onChange={handleChange} className='relative z-3 bg-secondary p-[15px] rounded-[30px] bg-opacity-50 w-[90%] mx-auto' />
                </div>
                {/* <div className='flex mt-[15px] items-center gap-3'>
                  <Button onClick={handleUpload} disabled={loading}>
                    {loading ? 'Uploading...' : 'Upload'}
                  </Button>
                  {loading && <p className='font-[600] text-[22px]'>{Math.round(progress)}%</p>}
                </div> */}
                <Button onClick={() => handleSave(values?.id)} disabled={wait} className='mt-[10px]'>
                  {wait ? "Uploading..." : "Save"}
                </Button>
                {loading && <p className='font-[600] text-[22px]'>{Math.round(progress)}%</p>}
              </div>
            </div>
          }
        </>
      }
    </>
  )
}

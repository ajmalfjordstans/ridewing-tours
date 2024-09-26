import { createDocumentWithAutoId, createFirebaseDocument, db, deleteFirebaseDocument, deleteImage, readFirebaseCollection, storage, updateFirebaseDocument } from '@/app/firebase';
import AttractionsCard from '@/components/cards/attractions-card';
import { Button } from '@material-tailwind/react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

export default function Destinations() {
  const currentCountry = useSelector(state => state.user.selectedCountry)
  const [image, setImage] = useState(null)
  const [currentImage, setCurrentImage] = useState(null)
  const [showEdit, setShowEdit] = useState(false)
  const [loading, setLoading] = useState(false)
  const [wait, setWait] = useState(false)
  const [progress, setProgress] = useState('')
  const [data, setData] = useState([
    {
      "id": "01",
      "name": "Japan",
      "image": "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "description": "Japan entices visitors with a harmonious blend of ancient traditions and cutting-edge modernity. From the neon-lit streets of Tokyo to the serene temples of Kyoto and the historic resilience of Hiroshima, Japan offers a diverse range of experiences. Its unique culture, picturesque landscapes, and technological innovations make it a top destination for those seeking a journey that seamlessly combines tradition and innovation."
    },
    {
      "id": "02",
      "name": "South Korea",
      "image": "https://images.unsplash.com/photo-1551249506-d8e2c5536f8a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "description": "Coming soon"
    },
    {
      "id": "03",
      "name": "Taiwan",
      "image": "https://images.unsplash.com/photo-1508248467877-aec1b08de376?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "description": "Coming soon"
    },
    {
      "id": "04",
      "name": "Philippines",
      "image": "https://images.unsplash.com/photo-1509850629763-f55dbe6a607e?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "description": "Coming soon"
    },
    {
      "id": "05",
      "name": "United Kingdom",
      "image": "https://images.unsplash.com/photo-1454537468202-b7ff71d51c2e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "description": "These destinations offer a multifaceted experience, from the academic allure of Oxford and Cambridge to the vibrant culture of Bristol and the historic charm of Cardiff. Glasgow adds a dynamic arts scene, while the Scottish Highlands, with the NC500, present nature's grandeur. Each destination is a testament to the UK's rich history, cultural diversity, and natural beauty, making them must-visit places for a comprehensive exploration of the United Kingdom."
    },
    {
      "id": "06",
      "name": "Switzerland",
      "image": "https://images.unsplash.com/photo-1528493366314-e317cd98dd52?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "description": "Coming Soon"
    },
    {
      "id": "07",
      "name": "France",
      "image": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "description": "Coming Soon"
    },
    {
      "id": "08",
      "name": "Italy",
      "image": "https://images.unsplash.com/photo-1529243856184-fd5465488984?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "description": "Coming Soon"
    },
    {
      "id": "09",
      "name": "Spain",
      "image": "https://images.unsplash.com/photo-1509840841025-9088ba78a826?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "description": "Coming Soon"
    },
    {
      "id": "10",
      "name": "Portugal",
      "image": "https://images.unsplash.com/photo-1555881400-69a2384edcd4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "description": "Coming Soon"
    },
    {
      "id": "11",
      "name": "Germany",
      "image": "https://images.unsplash.com/photo-1449452198679-05c7fd30f416?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "description": "Coming Soon"
    },
    {
      "id": "12",
      "name": "Scandinavian countries",
      "image": "https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "description": "Coming Soon"
    }
  ]
  );
  const [values, setValues] = useState(null)
  const [loadingData, setLoadingData] = useState(true)

  const initializeTransfer = async () => {
    alert("Please wait while creating destinations")
    await Promise.all(
      data.map((item) => createFirebaseDocument(item, `destinations`, item.id))
    );
    getData()
  };

  const getData = async () => {
    try {
      const response = await (readFirebaseCollection(`destinations`))
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
      const storageRef = ref(storage, `images/destinations/${image.name}`);
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
    let value = values
    try {
      if (currentImage) {
        value = await handleUpload(); // Wait for the image to upload
      }
      if (id) {
        await updateFirebaseDocument(value, `destinations/${id}`);
      } else {
        await createDocumentWithAutoId(value, `destinations`);
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
      await deleteFirebaseDocument(`destinations/${id}`)
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
                  <Image src={currentImage ? URL.createObjectURL(currentImage) : values.image ? values.image : '/images/background/image-template.jpg'} height={500} width={500} className='absolute z-1 rounded-[10px] h-full object-cover' alt='banner' />
                  <input type="file" onChange={handleChange} className='relative z-3 bg-secondary p-[15px] rounded-[30px] bg-opacity-50 w-[90%] mx-auto' />
                </div>
                <div className='flex flex-col'>
                  <div>
                    <input type="text" className='p-[10px] border-[2px] border-black rounded-[5px] w-full my-[10px]'
                      value={values.name}
                      onChange={(e) => setValues({ ...values, name: e.target.value })} placeholder='Name' required />
                  </div>
                  <div>
                    <textarea type="text" className='p-[10px] border-[2px] border-black rounded-[5px] w-full my-[10px] min-h-[150px]'
                      value={values.description}
                      onChange={(e) => setValues({ ...values, description: e.target.value })} placeholder='Code' required />
                  </div>
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

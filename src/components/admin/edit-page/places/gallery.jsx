import { useState, useEffect } from 'react';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'; // assuming storage is already initialized
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { storage } from '@/app/firebase';
import { Button } from '@material-tailwind/react';

export default function Gallery({ values, setValues }) {
  const selectedCountry = useSelector(state => state.user.selectedCountry);
  const [imageGallery, setImageGallery] = useState(values?.gallery || []);
  const [currentImage, setCurrentImage] = useState(null)
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    // console.log("imageGallery: ", imageGallery);
    if (e.target.files && e.target.files[0]) {
      setCurrentImage(e.target.files[0])
      // let updatedImageGallery = [...imageGallery];

      // // Add new image file to the end of the imageGallery array
      // updatedImageGallery.push(e.target.files[0]);
      // console.log("updatedImageGallery:", updatedImageGallery);

      // // Set the state with the updated array
      // setImageGallery(updatedImageGallery);

      // // Update the values.gallery array by appending the new image as a placeholder
      // setValues({
      //   ...values,
      //   gallery: [...values.gallery, '']
      // });
    }
    console.log("Current Image", e.target.files[0]);

  };

  const handleUpload = async () => {
    setLoading(true);
    let uploadPromises = [];

    if (currentImage) {
      const storageRef = ref(storage, `images/countries/${selectedCountry}/top-choices/${values.id}/${currentImage.name}`);
      const uploadTask = uploadBytesResumable(storageRef, currentImage);

      // Push the upload task promise to the array
      uploadPromises.push(
        new Promise((resolve, reject) => {
          // Monitor upload progress
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(`File upload is ${progress}% done`);
              setProgress(progress);
            },
            (error) => {
              console.error(`Error uploading file:`, error);
              reject(error);
            },
            () => {
              // Upload completed successfully, get the download URL
              getDownloadURL(uploadTask.snapshot.ref)
                .then((downloadURL) => {
                  console.log(`File available at:`, downloadURL);
                  // Update values state with download URL for each image
                  // Adjust this part according to your application logic
                  // For example, if you want to store all URLs in an array in 'values':
                  const updatedValues = { ...values, gallery: [...values.gallery, downloadURL] };
                  setValues(updatedValues);
                  setCurrentImage(null)
                  console.log(updatedValues.gallery);
                  resolve();
                })
                .catch((error) => {
                  console.error(`Error getting download URL for file:`, error);
                  reject(error);
                });
            }
          );
        })
      );
      // }
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

  // Handle removing an image
  const handleRemove = (pos) => {
    const updatedGallery = values.gallery;
    const removedImage = updatedGallery.splice(pos, 1)[0]; // Remove the image from the array

    const updatedValues = { ...values, gallery: updatedGallery };
    setValues(updatedValues);
    console.log(values);

    // Remove from Firebase if it's already uploaded
    if (typeof removedImage === 'string') {
      const imageRef = ref(storage, removedImage);
      deleteObject(imageRef)
        .then(() => console.log(`Image at position ${pos, " ", removedImage} removed from Firebase.`))
        .catch(error => console.error('Error deleting image:', error));
    }
  };

  return (
    <>
      <div className='flex gap-2 mt-2'>
        <div className='border-[2px] border-custom-red rounded-[10px] flex justify-center items-center hover:cursor-pointer flex-col gap-2 p-[20px]'
        // onClick={() => setShowInput(true)}
        >
          <Image src={currentImage ? URL.createObjectURL(currentImage) : '/images/background/image-template.jpg'} height={800} width={1200} className=' rounded-[10px] w-[250px] h-[250px] object-cover max-h-[25vh]' alt='banner' unoptimized/>
          <input type="file" onChange={(e) => handleChange(e)} className='relative z-3 bg-secondary p-[15px] rounded-[30px] bg-opacity-50 w-min' />
        </div>
        <div className='flex mt-[15px] items-center gap-3'>
          <Button onClick={handleUpload} disabled={loading}>
            {loading ? 'Uploading...' : 'Upload'}
          </Button>
          {loading && <p className='font-[600] text-[22px]'>{Math.round(progress)}%</p>}
        </div>
      </div>
      <p className='pt-[20px] font-[600]'>Available Images</p>
      <div className='grid grid-cols-4 gap-5 mt-[15px]'>
        {values?.gallery && values?.gallery.map((image, id) =>
          <div className=' w-full object-cover h-[25vh] relative flex justify-center items-center rounded-[10px] overflow-hidden' key={id}>
            <Image src={image ? image : '/images/background/image-template.jpg'} height={800} width={1200} className='absolute z-1 rounded-[10px] h-[25vh] w-full object-cover max-h-[25vh]' alt='banner' unoptimized/>
            <div className='h-[20px] w-[20px] bg-white rounded-full absolute top-5 right-5 flex justify-center items-center hover:cursor-pointer' onClick={() => handleRemove(id)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
import { db } from '@/app/firebase';
import EditPlace from '@/components/admin/edit-page/places/edit-top-choices';
import TopChoicesCard from '@/components/cards/top-choices-card';
import { Button } from '@material-tailwind/react';
import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'

export default function Place() {
  const [data, setData] = useState(null);
  const [showEdit, setShowEdit] = useState(false)
  const [values, setValues] = useState(null)
 
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
    const fetchData = async () => {
      const response = await fetch('/json/japan.json');
      const result = await response.json();
      setData(result.destinations);
    };
    fetchData();
  }, []);
  return (
    <div className='px-[5%]'>
      {showEdit ?
        <EditPlace data={values} setShowEdit={setShowEdit} />
        :
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[10px] md:gap-[30px] w-full mt-[48px]'>
          <div className='h-full w-full shadow-lg rounded-md border-[2px] border-black flex items-center justify-center hover:cursor-pointer'
            onClick={() => {
              setValues(null)
              setShowEdit(true)
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
            </svg>
          </div>
          {data?.map((data, id) => {
            // console.log(data)
            return (
              <div key={id}>
                <TopChoicesCard data={data} />
                <div className='flex mt-[15px] gap-2'>
                  <Button fullWidth className='bg-[blue]'
                    onClick={() => {
                      setValues(data)
                      setShowEdit(true)
                    }}>Edit</Button>
                  <Button fullWidth className='bg-[red]'>Delete</Button>
                </div>
              </div>
            )
          })}
        </div>
      }
    </div>
  )
}

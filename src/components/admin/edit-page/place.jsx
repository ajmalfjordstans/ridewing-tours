import { db, deleteFirebaseDocument, readFirebaseCollection } from '@/app/firebase';
import EditPlace from '@/components/admin/edit-page/places/edit-top-choices';
import TopChoicesCard from '@/components/cards/top-choices-card';
import { Button } from '@material-tailwind/react';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useSelector } from 'react-redux';

export default function Place() {
  const selectedCountry = useSelector(state => state.user.selectedCountry)
  const [queryPath, setQueryPath] = useState(`countries/${selectedCountry}/top-choices`);
  // const query = collection(db, queryPath);
  // const [docs, loading, error] = useCollectionData(query);
  const [data, setData] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [values, setValues] = useState(false);
  const [loading, setLoading] = useState(true)

  const getData = async () => {
    try {
      const response = await (readFirebaseCollection(queryPath))
      setData(response);
      setLoading(false)
    } catch (error) {
      console.log("Error reading collection");
      setLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    setQueryPath(`countries/${selectedCountry}/top-choices`);
  }, [selectedCountry]);
  // useEffect(() => {
  //   if (!loading) {
  //     setData(docs);
  //   }
  // }, [loading, docs]);
  return (
    <div className='px-[5%]'>
      {loading ? <div className='h-[full] w-[full] text-[22px] font-[600] flex justify-center items-center pt-[30vh]'>Loading</div> :
        <>
          {
            showEdit ?
              <EditPlace data={values} setShowEdit={setShowEdit} />
              :
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[10px] md:gap-[30px] w-full mt-[48px]'>
                <div className='h-full w-full shadow-lg rounded-md border-[2px] border-black flex items-center justify-center hover:cursor-pointer min-h-[400px]'
                  onClick={() => {
                    setValues({
                      url: "",
                      name: "",
                      tag: "",
                      startLocation: "",
                      availability: "",
                      price: "",
                      details: {
                        hours: "",
                        language: [],
                        guidedTour: false,
                        entranceFeeIncluded: false,
                        expertTourGuide: false,
                      },
                      gallery: [],
                      description: [],
                      highlight: [],
                      itinerary: {
                        start: "",
                        itinerary: [],
                        end: ""
                      },
                      pricing: [],
                      otherDetails: {
                        includes: [],
                        excludes: [],
                        bring: [],
                        information: [],
                        cancellationPolicy: ""
                      }
                    })
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
                        <Button fullWidth className='bg-[red]'
                          onClick={() => deleteFirebaseDocument(`countries/${selectedCountry}/top-choices/${data?.url}`)}
                        >Delete</Button>
                      </div>
                    </div>
                  )
                })}
              </div>
          }
        </>
      }
    </div>
  )
}

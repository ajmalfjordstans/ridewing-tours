'use client'
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import TourHero from './hero';
import { useSelector } from 'react-redux';
import { collection } from 'firebase/firestore';
import { db, readFirebaseCollection } from '../firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';

export default function Page() {
  const searchParams = useSearchParams();
  const [urlParams, setUrlParams] = useState({});
  const [currentData, setCurrentData] = useState(null);
  const selectedCountry = useSelector(state => state.user.selectedCountry)
  const [queryPath, setQueryPath] = useState(`countries/${selectedCountry}/top-choices`);
  // const query = collection(db, queryPath);
  // const [docs, loading, error] = useCollectionData(query);
  const [data, setData] = useState(null)
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
  const fetchData = async () => {
    try {
      const response = await fetch('/json/japan.json');
      const result = await response.json();
      // console.log("3", result);
      return result; // Return the fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const findData = (data, params) => {
    // console.log(data);
    const selectedResult = data?.find((obj) => {
      // console.log("1", obj.url, "===", params);
      if (obj.url === params.destination) {
        setCurrentData(obj);
      }
    });
  };

  useEffect(() => {
    const params = {}
    searchParams.forEach((value, key) => {
      params[key] = value;
    })
    // console.log(params);
    const initialize = async () => {
      if (Object.keys(params).length === 0) {
        return;
      }
      setUrlParams(params); // Set URL params
      // const result = await fetchData();
      // console.log(data);
      if (data) findData(data, params); // Pass the fetched data and params to findData
    };

    initialize();
  }, [searchParams, data]);
  // console.log(currentData);
  return (
    <div className='text-black mt-[80px] md:mt-[180px] container mx-auto px-[5%] lg:px-0 pb-[150px]'>
      {
        currentData !== null ?
          <div className=''>
            <TourHero data={currentData} />
          </div>
          :
          <div className='w-full h-[400px] flex justify-center items-center font-bold text-[32px]'>Loading</div>
      }
    </div>
  )
}

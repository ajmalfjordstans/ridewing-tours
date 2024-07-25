import React, { useEffect, useState } from 'react'
import { createFirebaseDocument, db, deleteFirebaseDocument, readFirebaseCollection } from '../firebase'
import { collection } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Button } from '@material-tailwind/react'

export default function CountriesHandle() {
  // const query = collection(db, "countries")
  // const [docs, loading, error] = useCollectionData(query) 
  const [countries, setCountries] = useState(null)
  const [showInput, setShowInput] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [newCountry, setNewCountry] = useState("")
  const [showDeleteWarning, setShowDeleteWarning] = useState(false)
  const [loading, setLoading] = useState(true)

  const getData = async () => {
    try {
      const response = await (readFirebaseCollection("countries"))
      setCountries(response);
      setLoading(false)
    } catch (error) {
      console.log("Error reading collection");
      setLoading(false)
    }
  }

  useEffect(() => {
    getData()
  },)

  // Add new country
  const handleAddCountry = async () => {
    if (newCountry) {
      const countryExist = countries.some(country => country.name == newCountry)
      if (countryExist) {
        alert("Country already exists")
      } else {
        await createFirebaseDocument({ name: newCountry }, `countries`, newCountry)
        setShowInput(false)
      }
      setNewCountry("")
    }
  }

  // Prompt Delete Country
  const promptDelete = () => {
    if (newCountry) {
      const countryExist = countries.some(country => country.name == newCountry)
      if (countryExist) {
        setShowDelete(false)
        setShowDeleteWarning(true)
        // if (confirmDelete) // await deleteFirebaseDocument(`countries/${newCountry}`)
      } else {
        alert("Country doesn't exist")
      }
      // setNewCountry("")
    }
  }
  // Remove country
  const handleRemoveCountry = async () => {
    if (newCountry) {
      await deleteFirebaseDocument(`countries/${newCountry}`)
      setNewCountry("")
      setShowDeleteWarning(false)
    }
  }
  return (
    <div className='p-[20px]'>
      {loading ? <div className='h-[full] w-[full] text-[22px] font-[600] flex justify-center items-center pt-[30vh]'>Loading</div> :
        <>
          <div className='flex gap-2'>
            <div className='h-[200px] border-[2px] border-custom-red rounded-[10px] flex justify-center items-center hover:cursor-pointer flex-col gap-2 p-[20px]'
              onClick={() => setShowInput(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#E4322C" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
              </svg>
              <p className='text-custom-red'>Click to add a new Country</p>
            </div>
            <div className='h-[200px] border-[2px] border-custom-red rounded-[10px] flex justify-center items-center hover:cursor-pointer flex-col gap-2 p-[20px]'
              onClick={() => setShowDelete(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#E4322C" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>

              <p className='text-custom-red'>Click to remove a Country</p>
            </div>
          </div>
          <p className='pt-[20px] font-[600]'>Available Countries</p>
          <div className='grid grid-cols-6 gap-5 mt-[15px]'>
            {countries && countries.map((country, id) =>
              <div key={id} className='h-[200px] border-[2px] border-custom-red rounded-[10px] flex justify-center items-center'>{country.name}</div>
            )}
          </div>
        </>
      }
      {showInput &&
        <div className='fixed top-0 left-0 h-[100vh] w-[100vw] flex justify-center items-center backdrop-blur-sm z-10'>
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <p className='font-[600]'>Add new Country</p>
            <div className='flex flex-col gap-2 mt-[10px]'>
              <input type="text" className='p-[5px] outline-none border-[2px] border-custom-red rounded-[3px]' placeholder='Enter new country name'
                value={newCountry}
                onChange={(e) => setNewCountry(e.target.value)}
              />
            </div>
            <div className="flex justify-end mt-[10px]">
              <button
                type="button"
                className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 mr-2"
                onClick={handleAddCountry}
              >Add Country</button>
              <button
                type="button"
                className="text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2"
                onClick={() => {
                  setShowInput(false)
                  setNewCountry("")
                }}
              >Cancel</button>
            </div>
          </div>
        </div>
      }
      {showDelete &&
        <div className='fixed top-0 left-0 h-[100vh] w-[100vw] flex justify-center items-center backdrop-blur-sm z-10'>
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <p className='font-[600]'>Remove Country</p>
            <div className='flex flex-col gap-2 mt-[10px]'>
              <input type="text" className='p-[5px] outline-none border-[2px] border-custom-red rounded-[3px]' placeholder='Enter country name'
                value={newCountry}
                onChange={(e) => setNewCountry(e.target.value)}
              />
            </div>
            <div className="flex justify-end mt-[10px]">
              <button
                type="button"
                className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 mr-2"
                onClick={promptDelete}
              >Remove Country</button>
              <button
                type="button"
                className="text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2"
                onClick={() =>
                  setShowDelete(false)
                }
              >Cancel</button>
            </div>
          </div>
        </div>
      }
      {showDeleteWarning &&
        <div className='fixed top-0 left-0 h-[100vh] w-[100vw] flex justify-center items-center backdrop-blur-sm z-10'>
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h2 className="text-lg font-bold text-red-600 mb-4">Caution!</h2>
            <p className="mb-6 text-gray-700">Are you sure you want to delete
              <span className='text-custom-red font-[700] pl-[5px]'>{newCountry}</span>
              ? This action cannot be undone.</p>
            <div className="flex justify-end">
              <button
                type="button"
                className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 mr-2"
                onClick={handleRemoveCountry}
              >Delete</button>
              <button
                type="button"
                className="text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2"
                onClick={() =>
                  setShowDeleteWarning(false)
                }
              >Cancel</button>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

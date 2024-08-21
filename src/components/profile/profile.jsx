'use client'
import { Button } from '@material-tailwind/react'
import React, { useState } from 'react'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import { db, updateFirebaseDocument } from '@/app/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { useDispatch } from 'react-redux'
import { setUser } from '../store/userSlice'

export default function Profile({ user, handleSignOut }) {
  const [data, setData] = useState(user)
  const [errors, setErrors] = useState({})
  const dispatch = useDispatch()
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(String(email).toLowerCase())
  }

  const validatePhone = (phone) => {
    const phoneNumber = parsePhoneNumberFromString(phone)
    return phoneNumber && phoneNumber.isValid()
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setData({
      ...data,
      [name]: value
    })

    // Validate email and phone fields
    if (name === 'email' && !validateEmail(value)) {
      setErrors({ ...errors, email: 'Invalid email format' })
    }
    else if (name === 'contact' && !validatePhone(value)) {
      setErrors({ ...errors, contact: 'Invalid phone number' })
    }
    else {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const handleSave = async () => {
    try {
      const user = data
      await setDoc(doc(db, "users", data?.uid), user);
      dispatch(setUser(user))
      console.log("User document successfully created!");
      alert("Succesfully Updated")
    } catch (err) {
      console.error("Error setting document: ", err);
    }
  }

  return (
    <>
      <div className='container mx-auto px-[5%] lg:px-0'>
        <div className='max-w-[738px] w-full flex flex-col '>
          <p className='font-bold text-[32px] leading-[42px]'>{data?.userRole == 'agent' ? "Company " : "Personal "} Details</p>
          <div className='h-[1px] w-full bg-[#00000080] flex justify-left mt-[20px]'>
            <div className='h-[3px] w-[180px] bg-[#E4322C] translate-y-[-1.5px]'></div>
          </div>
        </div>
        <div className='mt-[40px] grid grid-cols-1 md:grid-cols-2 max-w-[800px] mx-auto gap-4'>
          <div className='flex flex-col gap-2'>
            <p className='font-[600]'>User Id:</p>
            <p>{data?.uid}</p>
          </div>
          <div className='flex flex-col gap-2'>
            {(data?.userRole == 'admin' || data?.userRole == 'agent') && (
              <>
                {/* <p className='font-[600]'>User Role:</p> */}
                <p className='capitalize font-[600] md:text-[24px]'>{data?.userRole}</p>
              </>
            )}
          </div>
          {data?.userRole == 'agent' &&
            <div className='flex flex-col gap-2'>
              <p className='font-[600]'>Company Name:</p>
              <input
                type='text'
                name='company'
                value={data?.company}
                className='p-[10px] border-[1px] border-black outline-none rounded-[5px]'
                onChange={handleInputChange}
                placeholder='Company Name'
                required
              />
            </div>
          }
          <div className='flex flex-col gap-2'>
            <p className='font-[600]'>{data?.userRole == 'agent' ? "Authorised Person Name" : "Name"}:</p>
            <input
              type='text'
              name='displayName'
              value={data?.displayName}
              className='p-[10px] border-[1px] border-black outline-none rounded-[5px]'
              onChange={handleInputChange}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <p className='font-[600]'>Phone:</p>
            <input
              type='text'
              name='contact'
              value={data?.contact}
              className='p-[10px] border-[1px] border-black outline-none rounded-[5px]'
              onChange={handleInputChange}
              placeholder='+1234567890 (Include country code)'
            />
            {errors.contact && <p className='text-red-600'>{errors.contact}</p>}
          </div>
          <div className='flex flex-col gap-2'>
            <p className='font-[600]'>Email:</p>
            <input
              type='text'
              name='email'
              value={data?.email}
              className='p-[10px] border-[1px] border-black outline-none rounded-[5px]'
              onChange={handleInputChange}
              required
            />
            {errors.email && <p className='text-red-600'>{errors.email}</p>}
          </div>
          {data?.userRole == 'agent' &&
            <>
              <p className='md:col-span-2 mt-5 font-[700] text-[26px] border-b-[2px] border-secondary'>Account</p>
              <div className='flex flex-col gap-2'>
                <p className='font-[600]'>Account Holder's Name:</p>
                <input
                  type='text'
                  name='accountHolder'
                  value={data?.accountHolder}
                  className='p-[10px] border-[1px] border-black outline-none rounded-[5px]'
                  onChange={handleInputChange}
                  placeholder='Account Holder'
                  required
                />
              </div>
              <div className='flex flex-col gap-2'>
                <p className='font-[600]'>Bank Name:</p>
                <input
                  type='text'
                  name='bankName'
                  value={data?.bankName}
                  className='p-[10px] border-[1px] border-black outline-none rounded-[5px]'
                  onChange={handleInputChange}
                  placeholder='Bank Name'
                  required
                />
              </div>
              <div className='flex flex-col gap-2'>
                <p className='font-[600]'>Account Number:</p>
                <input
                  type='text'
                  name='bankAccountNumber'
                  value={data?.bankAccountNumber}
                  className='p-[10px] border-[1px] border-black outline-none rounded-[5px]'
                  onChange={handleInputChange}
                  placeholder='Account Number'
                  required
                />
              </div>
            </>
          }
          <p className='md:col-span-2 mt-5 font-[700] text-[26px] border-b-[2px] border-secondary'>Address</p>
          <div className='flex flex-col gap-2'>
            <p className='font-[600]'>Address Line 1:</p>
            <input
              type='text'
              name='address1'
              value={data?.address1}
              className='p-[10px] border-[1px] border-black outline-none rounded-[5px]'
              onChange={handleInputChange}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <p className='font-[600]'>Address Line 2:</p>
            <input
              type='text'
              name='address2'
              value={data?.address2}
              className='p-[10px] border-[1px] border-black outline-none rounded-[5px]'
              onChange={handleInputChange}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <p className='font-[600]'>City:</p>
            <input
              type='text'
              name='city'
              value={data?.city}
              className='p-[10px] border-[1px] border-black outline-none rounded-[5px]'
              onChange={handleInputChange}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <p className='font-[600]'>State:</p>
            <input
              type='text'
              name='state'
              value={data?.state}
              className='p-[10px] border-[1px] border-black outline-none rounded-[5px]'
              onChange={handleInputChange}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <p className='font-[600]'>Country:</p>
            <input
              type='text'
              name='country'
              value={data?.country}
              className='p-[10px] border-[1px] border-black outline-none rounded-[5px]'
              onChange={handleInputChange}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <p className='font-[600]'>Zip / Post Code / Pin Code:</p>
            <input
              type='number'
              name='pin'
              value={data?.pin}
              className='p-[10px] border-[1px] border-black outline-none rounded-[5px]'
              onChange={handleInputChange}
            />
          </div>
          <div className='col-span-2 flex justify-end'>
            <Button className='bg-secondary'
              onClick={handleSave}
            >Save</Button>
          </div>
        </div>
        <Button className="bg-custom-red my-[20px]" role="menuitem" onClick={handleSignOut}>
          Logout
        </Button>
      </div>
    </>
  )
}

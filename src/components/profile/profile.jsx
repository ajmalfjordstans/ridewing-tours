import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@material-tailwind/react';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { db } from '@/app/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../store/userSlice';
import { useRouter } from 'next/navigation';

export default function Profile({ user, handleSignOut }) {
  const [data, setData] = useState(user);
  const [errors, setErrors] = useState({});
  const selectedCountry = useSelector((state) => state.user.selectedCountry);
  const dispatch = useDispatch();
  const router = useRouter();

  // Refs for scrolling to missing fields
  const aboutRef = useRef(null);
  const companyRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const nameRef = useRef(null);
  const accountHolderRef = useRef(null);
  const bankNameRef = useRef(null);
  const bankAccountNumberRef = useRef(null);
  const address1Ref = useRef(null);
  const cityRef = useRef(null);
  const pinRef = useRef(null);

  const validatePhone = (phone) => {
    const phoneNumber = parsePhoneNumberFromString(phone);
    return phoneNumber && phoneNumber.isValid();
  };

  // Scroll to the first missing required field when page loads
  useEffect(() => {
    if (data?.userRole === 'agent' && !data?.company) {
      aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (!data?.accountHolder) {
      accountHolderRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (!data?.bankName) {
      accountHolderRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (!data?.bankAccountNumber) {
      accountHolderRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (!data?.contact || !validatePhone(data?.contact)) {
      aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (!data?.displayName) {
      aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (!data?.email) {
      aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (!data?.address1) {
      address1Ref.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (!data?.city) {
      address1Ref.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (!data?.pin) {
      address1Ref.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSave = async () => {
    // Validate required fields
    if (data?.userRole === 'agent' && !data.company) {
      setErrors({ ...errors, company: 'Company name is required' });
      companyRef.current?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (!data.contact || !validatePhone(data.contact)) {
      setErrors({ ...errors, contact: 'Valid phone number is required' });
      phoneRef.current?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (!data.displayName) {
      setErrors({ ...errors, displayName: 'Name is required' });
      nameRef.current?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (!data.email) {
      setErrors({ ...errors, email: 'Email is required' });
      emailRef.current?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (!data.accountHolder) {
      setErrors({ ...errors, accountHolder: 'Account holder name is required' });
      accountHolderRef.current?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (!data.bankName) {
      setErrors({ ...errors, bankName: 'Bank name is required' });
      bankNameRef.current?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (!data.bankAccountNumber) {
      setErrors({ ...errors, bankAccountNumber: 'Bank account number is required' });
      bankAccountNumberRef.current?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (!data.address1) {
      setErrors({ ...errors, address1: 'Address Line 1 is required' });
      address1Ref.current?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (!data.city) {
      setErrors({ ...errors, city: 'City is required' });
      cityRef.current?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (!data.pin) {
      setErrors({ ...errors, pin: 'Pin code is required' });
      pinRef.current?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    try {
      await setDoc(doc(db, 'users', data?.uid), data);
      dispatch(setUser(data));
      alert('Successfully Updated');
      router.push(`/?country=${selectedCountry}`);
    } catch (err) {
      console.error('Error setting document: ', err);
    }
  };

  return (
    <>
      <div className='container mx-auto px-[5%] lg:px-0'>
        <div className='max-w-[738px] w-full flex flex-col'>
          <p className='font-bold text-[32px] leading-[42px]'>{data?.userRole === 'agent' ? 'Company' : 'Personal'} Details</p>
          <div className='h-[1px] w-full bg-[#00000080] flex justify-left mt-[20px]'>
            <div className='h-[3px] w-[180px] bg-[#E4322C] translate-y-[-1.5px]'></div>
          </div>
        </div>

        <div className='mt-[40px] grid grid-cols-1 md:grid-cols-2 max-w-[800px] mx-auto gap-4'
          ref={aboutRef}
        >
          <div className='flex flex-col gap-2'>
            <p className='font-[600]'>User Id:</p>
            <p>{data?.uid}</p>
          </div>

          {(data?.userRole === 'admin' || data?.userRole === 'agent') && (
            <div className='flex flex-col gap-2'>
              <p className='capitalize font-[600] md:text-[24px]'>{data?.userRole}: <span className='font-[400]'>{data?.active ? "active": 'inactive'}</span></p>
            </div>
          )}

          {data?.userRole === 'agent' && (
            <div className='flex flex-col gap-2'>
              <p className='font-[600]'>Company Name:</p>
              <input
                ref={companyRef}
                type='text'
                name='company'
                value={data?.company}
                className='p-[10px] border-[1px] border-black outline-none rounded-[5px]'
                onChange={handleInputChange}
                placeholder='Company Name'
                required
              />
            </div>
          )}

          <div className='flex flex-col gap-2'>
            <p className='font-[600]'>{data?.userRole === 'agent' ? 'Authorised Person Name' : 'Name'}:</p>
            <input
              ref={nameRef}
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
              ref={phoneRef}
              type='text'
              name='contact'
              value={data?.contact}
              className='p-[10px] border-[1px] border-black outline-none rounded-[5px]'
              onChange={handleInputChange}
              placeholder='+1234567890 (Include country code)'
              required
            />
            {errors.contact && <p className='text-red-600'>{errors.contact}</p>}
          </div>

          <div className='flex flex-col gap-2'>
            <p className='font-[600]'>Email:</p>
            <input
              ref={emailRef}
              type='text'
              name='email'
              value={data?.email}
              className='p-[10px] border-[1px] border-black outline-none rounded-[5px]'
              onChange={handleInputChange}
              required
            />
            {errors.email && <p className='text-red-600'>{errors.email}</p>}
          </div>

          {data?.userRole === 'agent' && (
            <>
              <div className='flex flex-col gap-2'>
                <p className='font-[600]'>IATA Affiliation:</p>
                <input
                  type='text'
                  name='iata'
                  value={data?.iata}
                  className='p-[10px] border-[1px] border-black outline-none rounded-[5px]'
                  onChange={handleInputChange}
                />
              </div>
              <div className='flex flex-col gap-2'>
                <p className='font-[600]'>Travel Agent No.</p>
                <input
                  type='text'
                  name='agentNo'
                  value={data?.agentNo}
                  className='p-[10px] border-[1px] border-black outline-none rounded-[5px]'
                  onChange={handleInputChange}
                />
              </div>

              <p className='md:col-span-2 mt-5 font-[700] text-[26px] border-b-[2px] border-secondary'
                ref={accountHolderRef}
              >Account</p>

              <div className='flex flex-col gap-2'>
                <p className='font-[600]'>Account Holder&apos;s Name:</p>
                <input
                  // ref={accountHolderRef}
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
                  // ref={bankNameRef}
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
                  // ref={bankAccountNumberRef}
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
          )}

          <p className='md:col-span-2 mt-5 font-[700] text-[26px] border-b-[2px] border-secondary'
            ref={address1Ref}
          >Address</p>

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
            <p className='font-[600]'>City:</p>
            <input
              // ref={cityRef}
              type='text'
              name='city'
              value={data?.city}
              className='p-[10px] border-[1px] border-black outline-none rounded-[5px]'
              onChange={handleInputChange}
            />
          </div>

          <div className='flex flex-col gap-2'>
            <p className='font-[600]'>Zip / Post Code / Pin Code:</p>
            <input
              // ref={pinRef}
              type='number'
              name='pin'
              value={data?.pin}
              className='p-[10px] border-[1px] border-black outline-none rounded-[5px]'
              onChange={handleInputChange}
            />
          </div>

          <div className='col-span-2 flex justify-end'>
            <Button className='bg-secondary' onClick={handleSave}>Save</Button>
          </div>
        </div>

        <Button className='bg-custom-red my-[20px]' onClick={handleSignOut}>Logout</Button>
      </div>
    </>
  );
}

'use client'
import { UserAuth } from '@/context/AuthContext'
import { Button } from '@material-tailwind/react'
import { doc, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { db } from '../firebase'
import { setLogin, setUserRole } from '@/components/store/userSlice'

export default function Page() {
  const [loginType, setLoginType] = useState('admin')
  const { googleSignIn } = UserAuth()
  const router = useRouter()
  const country = useSelector(state => state.user.selectedCountry)
  const user = useSelector(state => state.user.userInfo)
  const dispatch = useDispatch()

  const handleSignIn = async () => {
    try {
      await googleSignIn()
      // router.push(`/profile?country=${country}`)
    } catch (err) {
      console.log(err);
    }
  }
  const handleSignOut = async () => {
    try {
      await logOut()
    } catch (err) {
      console.log(err);
    }
  }
  const handleFirebaseUserUpdate = async () => {
    try {
      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          userRole: loginType // Use loginType for the role
        });
        console.log("User document successfully created!");
      }
    } catch (err) {
      console.error("Error setting document: ", err);
    }
  }
  useEffect(() => {
    console.log("Routing"); //If user logged in route to profile page
    if (user) {
      if (loginType === 'admin') {
        if (user?.uid === 'mM4TGPln9aO8D3b2uk7j745yV8n2' || user?.uid === 'TvX2p5F8mvYc0quBAxVbaicM83t1') {
          dispatch(setLogin(true));
          handleFirebaseUserUpdate();
          router.push(`/profile?country=${country}`);
        } else {
          handleSignOut();
          alert("Unauthorized login");
        }
      } else {
        if (user?.uid === 'mM4TGPln9aO8D3b2uk7j745yV8n2' || user?.uid === 'TvX2p5F8mvYc0quBAxVbaicM83t1') setLoginType('admin')
        dispatch(setLogin(true));
        handleFirebaseUserUpdate();
        router.push(`/profile?country=${country}`);
      }
    }
  }, [user])
  useEffect(() => {
    console.log(loginType);
  }, [loginType])


  return (
    <div className='container mx-auto px-[5%] lg:px-0 pt-[120px] flex flex-col items-center w-full pb-[150px]'>
      <div className='mt-[30px]'>
        <p className='font-[600] text-[24px]'>Login as</p>
        <div className='text-black flex gap-3 mt-[10px]'>
          <p className={`${loginType == 'user' ? 'bg-custom-red text-white' : ''} px-[10px] rounded-[5px] hover:cursor-pointer transition-all duration-300 text-[26px]`}
            onClick={() => setLoginType('user')}
          >User</p>
          <p className={`${loginType == 'agent' ? 'bg-custom-red text-white' : ''} px-[10px] rounded-[5px] hover:cursor-pointer transition-all duration-300 text-[26px]`}
            onClick={() => setLoginType('agent')}
          >Travel Agent</p>
          <p className={`${loginType == 'admin' ? 'bg-custom-red text-white' : ''} px-[10px] rounded-[5px] hover:cursor-pointer transition-all duration-300 text-[26px]`}
            onClick={() => setLoginType('admin')}
          >Admin</p>
        </div>
      </div>
      <Button className="bg-[green] w-[300px] mt-[40px]" role="menuitem" onClick={handleSignIn}>
        Login
      </Button>
    </div>
  )
}

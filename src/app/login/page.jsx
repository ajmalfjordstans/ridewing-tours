'use client'
import { UserAuth } from '@/context/AuthContext'
import { Button } from '@material-tailwind/react'
import { doc, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { db } from '../firebase'

export default function Page() {
  const [loginType, setLoginType] = useState('user')
  const { googleSignIn } = UserAuth()
  const router = useRouter()
  const country = useSelector(state => state.user.selectedCountry)
  const user = useSelector(state => state.user.userInfo)

  const handleSignIn = async () => {
    try {
      await googleSignIn(loginType)
      try {
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          userRole: loginType
          // Add any other user fields you want to store
        });
        console.log("Successful");
      } catch (err) {
        console.log(err);
      }
      router.push(`/profile?country=${country}`,)
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className='container mx-auto px-[5%] lg:px-0 pt-[120px] flex flex-col items-center w-full'>
      <div className='mt-[30px]'>
        <p className='font-[600] text-[24px]'>Login as</p>
        <div className='text-black flex gap-3 mt-[10px]'>
          <p className={`${loginType == 'user' ? 'bg-custom-red text-white' : ''} px-[10px] rounded-[5px] hover:cursor-pointer transition-all duration-300 text-[26px]`}
            onClick={() => setLoginType('user')}
          >User</p>
          <p className={`${loginType == 'agent' ? 'bg-custom-red text-white' : ''} px-[10px] rounded-[5px] hover:cursor-pointer transition-all duration-300 text-[26px]`}
            onClick={() => setLoginType('agent')}
          >Travel Agent</p>
        </div>
      </div>
      <Button className="bg-[green] mt-[20px] w-[300px] mt-[40px]" role="menuitem" onClick={handleSignIn}>
        Login
      </Button>
    </div>
  )
}

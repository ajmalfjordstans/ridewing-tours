'use client'
import { UserAuth } from '@/context/AuthContext'
import { Button } from '@material-tailwind/react'
import { doc, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { db, readFirebaseCollection } from '../firebase'
import { setLogin, setUserRole } from '@/components/store/userSlice'

export default function Page() {
  const { googleSignIn, loginType, setLoginType } = UserAuth()
  const router = useRouter()
  const country = useSelector(state => state.user.selectedCountry)
  const user = useSelector(state => state.user.userInfo)
  const dispatch = useDispatch()
  const [disable, setDisable] = useState(true)

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
  useEffect(() => {
    if (user) {
      console.log("Routing"); //If user logged in route to profile page
      router.push("/profile")
    }
  }, [user])
  // If login as is chosen, enable login button
  useEffect(() => {
    console.log(loginType);
    if (loginType == "") {
      setDisable(true)
    } else {
      setDisable(false)
    }
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
          {/* <p className={`${loginType == 'admin' ? 'bg-custom-red text-white' : ''} px-[10px] rounded-[5px] hover:cursor-pointer transition-all duration-300 text-[26px]`}
            onClick={() => setLoginType('admin')}
          >Admin</p> */}
        </div>
      </div>
      <Button className="bg-[green] w-[300px] mt-[40px] capitalize" role="menuitem" onClick={handleSignIn} disabled={disable}>
        {loginType == "" ? "Choose login as to login" : "Login with Google"}
      </Button>
    </div>
  )
}

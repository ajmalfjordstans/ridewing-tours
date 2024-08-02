'use client'
import { UserAuth } from '@/context/AuthContext'
import { Button } from '@material-tailwind/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function Page() {
  const { googleSignIn, loginType, setLoginType } = UserAuth()
  const router = useRouter()
  const user = useSelector(state => state.user.userInfo)
  const [showSignIn, setShowSignIn] = useState(true);

  const handleSignIn = async () => {
    try {
      await googleSignIn()
      // router.push(`/profile?country=${country}`)
    } catch (err) {
      console.log(err);
    }
  }

  const handleSignUp = () => {
    setShowSignIn(false);
  };

  useEffect(() => {
    if (user) {
      console.log("Routing"); //If user logged in route to profile page
      router.push("/profile")
    }
  }, [user, router])


  useEffect(() => {
    setLoginType('agent')
    console.log(loginType);
    return (
      setLoginType('')
    )
  }, [loginType])
  return (
    <div className='container mx-auto px-[5%] lg:px-0 pt-[130px] flex flex-col items-center w-full pb-[250px] '>
      <AnimatePresence mode='wait'>
        <div className='w-full max-w-[1121px] grid grid-cols-2 rounded-[15px] overflow-hidden mt-[80px]'
          style={{ boxShadow: "0px 4px 20.1px -2px #00000040" }}
        >
          <motion.div
            className="py-[70px] flex flex-col justify-center items-center"
            initial={{ x: "100%" }}
            animate={{ x: showSignIn ? "0%" : "100%" }}
            transition={{ type: "spring", stiffness: 50 }}
          >
            {showSignIn ? (
              <motion.div
                className='py-[70px] flex flex-col justify-center items-center'
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className='text-[36px] font-[600] leading-[24px]'>Sign in</p>
                <Button className="bg-custom-red w-[300px] mt-[40px] capitalize rounded-[50px] font-[400]" role="menuitem" onClick={handleSignIn}>
                  Continue with Google
                </Button>
              </motion.div>
            ) : (
              <motion.div
                className='py-[70px] flex flex-col justify-center items-center'
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className='text-[36px] font-[600] leading-[24px]'>Sign up</p>
                <Button className="bg-custom-red w-[300px] mt-[40px] capitalize rounded-[50px] font-[400]" role="menuitem" onClick={handleSignIn}>
                  Continue with Google
                </Button>
              </motion.div>
            )}
          </motion.div>
          <motion.div
            className="bg-custom-red py-[70px] flex flex-col justify-center items-center text-white gap-2"
            initial={{ x: "100%" }}
            animate={{ x: showSignIn ? "0%" : "-100%" }}
            transition={{ type: "spring", stiffness: 50 }}
          >
            {showSignIn ? (
              <motion.div
                className='bg-custom-red py-[70px] flex flex-col justify-center items-center text-white gap-2'
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className='text-[36px] font-[600]'>Hello, Friend!</p>
                <p className='text-[16px] font-[400] text-center'>Enter your personal details and<br /> start journey with us</p>
                <Button className='border-[1px] border-white rounded-[50px] bg-inherit text-[20px] font-[400] capitalize px-[40px] py-[12px] mt-[20px]' onClick={handleSignUp}>
                  Sign up
                </Button>
              </motion.div>
            ) : (
              <motion.div
                className='py-[70px] flex flex-col justify-center items-center text-white gap-2'
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className='text-[36px] font-[600]'>Welcome Back!</p>
                <p className='text-[16px] font-[400] text-center'>To keep connected with us please<br /> login with your personal info</p>
                <Button className='border-[1px] border-white rounded-[50px] bg-inherit text-[20px] font-[400] capitalize px-[40px] py-[12px] mt-[20px]' onClick={() => setShowSignIn(true)}>
                  Sign in
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </AnimatePresence>
    </div >
  )
}

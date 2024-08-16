'use client'
import React, { useEffect, useState } from 'react'
import { readFirebaseCollection } from '../firebase'
import { AnimatePresence, motion } from 'framer-motion';
import CouponGenerator from '@/components/services/coupon-generator';
import CouponAssignment from '@/components/admin/agent/coupon-codes';
import Image from 'next/image';

export default function EditAgents({ setShowSection }) {
  const [agents, setAgents] = useState(null)
  const [selectedAgent, setSelectedAgent] = useState(null)
  const [showAgent, setShowAgent] = useState(false)

  const getAllUsers = async () => {
    try {
      const response = await readFirebaseCollection("users");
      const agents = response.filter(user => user.userRole === 'agent');
      setAgents(agents)
      console.log(agents);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  const handleShowAgent = (agent) => {
    setSelectedAgent(agent)
    setShowAgent(true)
  }

  useEffect(() => {
    if (showAgent) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showAgent])

  useEffect(() => {
    getAllUsers()
  }, [])


  return (
    <div className='pb-[150px] mt-[100px] flex h-full'>
      <div className='container mx-auto px-[5%] lg:px-0 pt-[20px]'>
        <div
          onClick={() => setShowSection('home')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
          </svg>
        </div>
        <p className='font-[700] text-[28px] mt-[25px]'>Travel Agents</p>
        {agents == null && <div className='h-[full] w-[full] text-[22px] font-[600] flex justify-center items-center pt-[30vh]'>Loading</div>}
        <div className='grid grid-cols-5 mt-[30px] gap-5'>
          {agents && agents.map((agent, index) => (
            <div key={index}
              className='h-[150px] border-[1px] border-custom-red rounded-[5px] flex flex-col justify-center items-center hover:cursor-pointer'
              onClick={() => handleShowAgent(agent)}
            >
              <p>{agent.displayName}</p>
              <p className='text-[12px]'>{agent?.email}</p>
              <p className='text-[12px]'>{agent?.contact}</p>
            </div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {showAgent && (
          <motion.div className='fixed top-0 left-0 h-[100vh] w-[100vw] bg-black bg-opacity-50 z-10 flex justify-center items-center p-[5%]'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: .4 }}
          >
            <motion.div
              className='w-[70%] h-[90vh] bg-white rounded-[15px] overflow-y-scroll'
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{
                type: 'tween',
                stiffness: 200,
                damping: 20,
                ease: 'easeInOut'
              }}
            >
              <div className='h-[77px] bg-secondary w-full flex items-center justify-between px-[20px] text-[40px] '>
                <p className='pl-[50px]'>{selectedAgent.displayName}</p>
                <motion.div
                  className='bg-custom-red p-[5px] cursor-pointer h-[40px] w-[40px] text-white font-[400] flex justify-center items-center rounded-[10px] text-[25px]'
                  onClick={() => setShowAgent(false)}
                  whileTap={{ scale: .9 }}
                >
                  X
                </motion.div>
              </div>
              <div className='px-[70px] py-[25px]'>
                <div className='flex justify-between mb-[40px]'>
                  <div className='flex flex-col gap-2'>
                    <Image src={selectedAgent?.photoURL} alt='profile' height={800} width={800} className='h-[250px] w-[250px] rounded-full border-[10px] border-white' />
                    <p className=''>Email: {selectedAgent?.email}</p>
                    <p className=''>Contact: {selectedAgent?.contact}</p>
                  </div>
                  <CouponGenerator />
                </div>
                <CouponAssignment agent={selectedAgent} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence >
    </div>
  )
}

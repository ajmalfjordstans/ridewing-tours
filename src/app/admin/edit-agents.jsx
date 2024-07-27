'use client'
import React, { useEffect, useState } from 'react'
import { readFirebaseCollection } from '../firebase'

export default function EditAgents({ setShowSection }) {
  const [agents, setAgents] = useState(null)

  const getAllUsers = async () => {
    try {
      const response = await readFirebaseCollection("users");
      const agents = response.filter(user => user.userRole === 'agent');
      setAgents(agents);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

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
              className='h-[150px] border-[1px] border-custom-red rounded-[5px] flex justify-center items-center'
            >{agent.displayName}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

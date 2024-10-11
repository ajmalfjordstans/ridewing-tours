'use client'
import React, { useEffect, useState } from 'react'
import { readFirebaseCollection } from '../firebase'

export default function EditUsers({ setShowSection }) {
  const [users, setUsers] = useState(null)

  const getAllUsers = async () => {
    try {
      const response = await readFirebaseCollection("users");
      const users = response.filter(user => user.userRole === 'user');
      console.log(users);
      setUsers(users);
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
          className="hover:cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
          </svg>
        </div>
        <p className='font-bold text-2xl mt-6'>Users</p>
        
        {users == null ? (
          <div className='text-center text-lg font-semibold flex justify-center items-center h-[50vh]'>
            Loading...
          </div>
        ) : (
          <div className='overflow-x-auto mt-6'>
            <table className='min-w-full table-auto border-collapse'>
              <thead>
                <tr className='bg-gray-200'>
                  <th className='px-4 py-2 text-left border'>#</th>
                  <th className='px-4 py-2 text-left border'>Name</th>
                  <th className='px-4 py-2 text-left border'>Email</th>
                  <th className='px-4 py-2 text-left border'>Contact</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className='even:bg-gray-100'>
                    <td className='px-4 py-2 border'>{index + 1}</td>
                    <td className='px-4 py-2 border'>{user.displayName}</td>
                    <td className='px-4 py-2 border'>{user?.email || 'N/A'}</td>
                    <td className='px-4 py-2 border'>{user?.contact || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

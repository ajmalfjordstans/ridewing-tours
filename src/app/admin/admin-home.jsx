import React, { useState } from 'react'
import EditPage from './edit-pages'
import EditAgents from './edit-agents'
import EditUsers from './edit-users'
import ManageBookings from './manage-bookings'

export default function AdminHome() {
  const [showSection, setShowSection] = useState('home')
  if (showSection == 'home') {
    return (
      <div className='container mx-auto px-[5%] lg:px-0 mt-[120px] pb-[200px] pt-[20px]'>
        <div className="grid grid-cols-6 gap-5">
          <div className='h-[200px] border-[2px] border-custom-red w-full rounded-[10px] flex flex-col justify-center items-center gap-3 hover:cursor-pointer'
            onClick={() => setShowSection("bookings")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#E4322C" className="size-28">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
            </svg>
            <p className='font-[600]'>View Bookings</p>
          </div>
          <div className='h-[200px] border-[2px] border-custom-red w-full rounded-[10px] flex flex-col justify-center items-center gap-3 hover:cursor-pointer'
            onClick={() => setShowSection("edit")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#E4322C" className="size-28">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 0 0-8.862 12.872M12.75 3.031a9 9 0 0 1 6.69 14.036m0 0-.177-.529A2.25 2.25 0 0 0 17.128 15H16.5l-.324-.324a1.453 1.453 0 0 0-2.328.377l-.036.073a1.586 1.586 0 0 1-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 0 1-5.276 3.67m0 0a9 9 0 0 1-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
            </svg>
            <p className='font-[600]'>Edit Website</p>
          </div>
          <div className='h-[200px] border-[2px] border-custom-red w-full rounded-[10px] flex flex-col justify-center items-center gap-3 hover:cursor-pointer'
            onClick={() => setShowSection("users")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#E4322C" className="size-28">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
            </svg>
            <p className='font-[600]'>View Users</p>
          </div>
          <div className='h-[200px] border-[2px] border-custom-red w-full rounded-[10px] flex flex-col justify-center items-center gap-3 hover:cursor-pointer'
            onClick={() => setShowSection("agents")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#E4322C" className="size-28">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
            </svg>
            <p className='font-[600]'>View Travel Agents</p>
          </div>
        </div>
      </div>
    )
  } else if (showSection == 'edit') {
    return (
      <div>
        <EditPage setShowSection={setShowSection} />
      </div>
    )
  } else if (showSection == 'agents') {
    return (
      <div>
        <EditAgents setShowSection={setShowSection} />
      </div>
    )
  }
  else if (showSection == 'users') {
    return (
      <div>
        <EditUsers setShowSection={setShowSection} />
      </div>
    )
  }
  else if (showSection == 'bookings') {
    return (
      <div>
        <ManageBookings setShowSection={setShowSection} />
      </div>
    )
  }
}

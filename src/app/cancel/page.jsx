import Link from 'next/link'
import React from 'react'

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Cancelled</h1>
      <p className="text-lg text-gray-600 text-center">The payment has been cancelled</p>
      <div className="mt-8">
        <Link href={{ pathname: '/', }}> 
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Return Home
          </button>
        </Link>
      </div>
    </div>
  )
}

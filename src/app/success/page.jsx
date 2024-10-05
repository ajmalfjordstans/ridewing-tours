import Link from 'next/link'
import React from 'react'

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful</h1>
      <p className="text-lg text-gray-600 text-center">Thank you for your payment. <br/> Check your email for invoice and you&apos;ll get the confirmation shortly</p>
      <div className="mt-8">
        <Link href={{ pathname: '/', }}> 
        {/* query: { country: user.selectedCountry } */}
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

import { UserAuth } from '@/context/AuthContext';
import React, { useEffect, useState } from 'react';

export default function LoginForm() {
  const { emailSignIn, errorMessage } = UserAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const result = await emailSignIn(formData.email, formData.password);
    setLoading(false)
    console.log('Form submitted:', result);
  };

  return (
    <div className="w-full">
      {/* max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        {emailError && <p className='text-red-500 text-[12px] pb-5'>{emailError}</p>}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        {errorMessage && <p className='text-red-500 text-[12px] pb-5 max-w-[320px] '>{errorMessage}</p>}
        <button
          type="submit"
          disabled={loading}
          className={`w-full  text-white py-2 px-4 rounded-md ${loading ? "bg-gray-500 hover:bg-gray-600" : "bg-blue-500 hover:bg-blue-600"} `}
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

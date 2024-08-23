import { UserAuth } from '@/context/AuthContext';
import React, { useEffect, useState } from 'react';

export default function SignupForm({ user }) {
  const { emailSignUp, errorMessage } = UserAuth()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "email") {
      if (!validateEmail(value)) {
        setEmailError('Invalid email format');
        return;
      } else {
        setEmailError('')
      }
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    if (!validateEmail(formData.email)) {
      setEmailError('Invalid email format');
      return;
    }

    setEmailError(''); // Clear any previous email error

    const result = await emailSignUp(formData);
    setLoading(false)
    console.log('Form submitted:', result);
  };

  return (
    <div className="w-full">
      {/* max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
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
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        {formData.password !== formData.confirmPassword && <p className='text-red-500 text-[12px] pb-5'>Passwords don't match</p>}
        {errorMessage && <p className='text-red-500 text-[12px] pb-5 max-w-[320px] '>{errorMessage}</p>}
        <button
          type="submit"
          disabled={formData.password !== formData.confirmPassword || loading}
          className={`w-full  text-white py-2 px-4 rounded-md ${loading ? "bg-gray-500 hover:bg-gray-600" : "bg-blue-500 hover:bg-blue-600"} `}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

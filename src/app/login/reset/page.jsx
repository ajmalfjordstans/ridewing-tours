'use client'
import { useState } from 'react';
import { auth } from '@/app/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

export default function Page() {
  const [email, setEmail] = useState('');

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent! Check your inbox.');
    } catch (error) {
      console.error("Error sending password reset email:", error);
      // Handle errors here (e.g., display an error message)
    }
  };

  return (
    <div className='mt-[120px]'>
      <h2>Reset Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleResetPassword}>Send Password Reset Email</button>
    </div>
  );
}

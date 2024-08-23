'use client'
import { useState } from 'react';
import { auth } from '@/app/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Button } from '@material-tailwind/react';

export default function Page() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent! Check your inbox.');
    } catch (error) {
      if (error.code == 'auth/invalid-email')
        setError("Email not found");
      // Handle errors here (e.g., display an error message)
    }
  };

  return (
    <div className='mt-[120px] container mx-auto px-[5%] pb-[120px]'>
      <h2 className='font-[600] text-[32px]'>Reset Password</h2>
      <div className='mt-10 flex flex-col gap-3 max-w-[400px] mx-auto'>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='p-[10px] border-black border-[1px] rounded-[10px]'
        />
        {error && <p className='text-center text-red-500 text-[12px]'>Email not found</p>}
        <Button
          className='bg-secondary'
          onClick={handleResetPassword}>Send password reset email</Button>
      </div>
    </div>
  );
}

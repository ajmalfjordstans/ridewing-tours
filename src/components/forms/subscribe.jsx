'use client'

import { Button } from '@material-tailwind/react';
import { useState } from 'react';

const SubscribeForm = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}newsletter/mailchimp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      console.log(data);

      if (res.status !== 200) {
        setStatus('error');
        setMessage(data.error || 'An error occurred.');
      } else {
        setStatus('success');
        setMessage('Thank you for subscribing!');
        setEmail(''); // Clear the email input
      }
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong, please try again.');
    }
  };

  return (
    <>
      <form
        className='w-full max-w-[693px] h-[61px] rounded-[4px] overflow-hidden bg-white flex justify-between mt-[20px] text-black'
        onSubmit={handleSubmit}>
        {/* <label htmlFor="email">Email address:</label> */}
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          className='outline-none bg-white p-[15px] w-full'
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button
          className='rounded-[4px] h-full w-[182px] bg-[#E4322C]' type="submit">Subscribe</Button>

      </form>
      {status && (
        <p className={status === 'error' ? 'error-message' : 'success-message'}>
          {message}
        </p>
      )}
    </>
  );
};

export default SubscribeForm;

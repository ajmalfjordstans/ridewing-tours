// components/PhoneSignIn.js
import { auth } from '@/app/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import React, { useState } from 'react';

export default function PhoneSignIn() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [message, setMessage] = useState('');

  const sendCode = async () => {
    try {
      // Ensure reCAPTCHA is only initialized once
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          'recaptcha-container',
          {
            size: 'invisible', // Or 'normal' if you want visible reCAPTCHA
            callback: (response) => {
              console.log('reCAPTCHA solved');
            },
            'expired-callback': () => {
              console.log('reCAPTCHA expired');
            },
          }
        );
      }

      const appVerifier = window.recaptchaVerifier;

      // Use `signInWithPhoneNumber` with the verified reCAPTCHA
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setVerificationId(confirmationResult.verificationId);
      setMessage('Code sent successfully!');
    } catch (error) {
      console.error('Error sending code:', error);
      setMessage(`Error: ${error.message}`);
    }
  };


  // Verify the code
  const verifyCode = async () => {
    try {
      const credential = window.firebase.auth.PhoneAuthProvider.credential(verificationId, verificationCode);
      const userCredential = await auth.signInWithCredential(credential);
      setMessage(`Success! User: ${userCredential.user.uid}`);
    } catch (error) {
      console.error('Error verifying code:', error);
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Sign in with Phone Number</h2>
      <div>
        <input
          type="text"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button onClick={sendCode}>Send Verification Code</button>
      </div>
      <div id="recaptcha-container"></div>

      {verificationId && (
        <div>
          <input
            type="text"
            placeholder="Enter verification code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <button onClick={verifyCode}>Verify Code</button>
        </div>
      )}

      {message && <p>{message}</p>}
    </div>
  );
}

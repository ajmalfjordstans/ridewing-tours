import React from 'react';

const GoogleMap = () => {
  return (
    <div className='w-full h-full'>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2484.503294627392!2d-0.4566328238372964!3d51.48563101229399!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876723bce16ba09%3A0x86b44272ae4d4d2!2s491%20Sipson%20Rd%2C%20Sipson%2C%20West%20Drayton%20UB7%200JB%2C%20UK!5e0!3m2!1sen!2sin!4v1719048666240!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default GoogleMap;

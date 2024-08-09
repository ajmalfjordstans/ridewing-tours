'use client'
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import { BookingTable } from '@/components/admin/manage-booking/bookings-table';

export default function ManageBookings({ setShowSection }) {
  const [allBookings, setAllBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const usersCollection = collection(db, 'users');
        const usersSnapshot = await getDocs(usersCollection);
        const bookingsArray = [];

        usersSnapshot.forEach(doc => {
          const userData = doc.data();
          console.log(userData)
          if (userData.booking && Array.isArray(userData.booking)) {
            userData.booking.forEach((booking, index) => {
              bookingsArray.push({
                ...booking,
                userId: doc.id,
                bookingIndex: index,
                displayName: userData.displayName,
                email: userData.email,
                photo: userData.photoURL,
                contact: userData?.contact
              })
            })
          }
        })
        console.log(bookingsArray)
        setAllBookings(bookingsArray);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  const handleEdit = (index, updatedBooking) => {
    const updatedBookings = [...allBookings];
    updatedBookings[index] = updatedBooking;
    setAllBookings(updatedBookings);
  }

  const saveChanges = async (booking, index) => {
    try {
      const userDoc = doc(db, 'users', booking.userId);
      const userSnapshot = await getDocs(userDoc);
      const userData = userSnapshot.data();

      // Update the specific booking in the array
      const updatedBookings = [...userData.bookings];
      updatedBookings[booking.bookingIndex] = booking;

      // Update the user's bookings in Firestore
      await updateDoc(userDoc, { bookings: updatedBookings });

      alert('Booking updated successfully!');
    } catch (error) {
      console.error('Error updating booking:', error);
      alert('Error updating booking. Please try again.');
    }
  }

  // useEffect(() => {
  //   console.log(allBookings);
  // }, [allBookings])
  return (
    <div className='pb-[150px] mt-[100px] flex h-full'>
      <div className='container mx-auto px-[5%] lg:px-0 pt-[20px]'>
        <div
          onClick={() => setShowSection('home')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
          </svg>
        </div>
        {/* <div>
          <h1>All Bookings</h1>
          <ul>
            {allBookings.map((booking, index) => (
              <li key={index}>
                <p>Booking {index + 1}</p>
                <input
                  type="text"
                  value={booking.name}
                  onChange={(e) => handleEdit(index, { ...booking, name: e.target.value })}
                />
                <button onClick={() => saveChanges(booking, index)}>Save</button>
              </li>
            ))}
          </ul>
        </div> */}
        <BookingTable bookings={allBookings}/>
      </div>
    </div>
  )
}

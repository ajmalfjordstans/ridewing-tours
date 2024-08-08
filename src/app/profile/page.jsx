'use client'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserDetails from './userDetails';
import { useRouter } from 'next/navigation';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { setUser } from '@/components/store/userSlice';
import { db } from '../firebase';

export default function Page() {
  const router = useRouter()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.userInfo)

  const handleFirebaseRead = async (uid) => {
    try {
      let itemsArr = [];
      const q = query(collection(db, 'users'), where('uid', '==', uid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          itemsArr.push({ ...doc.data(), id: doc.id });
        });
        console.log("Document successfully read!");
        dispatch(setUser(itemsArr[0]))
      });

      return unsubscribe; // Return the unsubscribe function to stop listening when needed
    } catch (error) {
      console.error("Error reading document: ", error);
    }
  }

  useEffect(() => {
    if (!user) router.push('/login/user')
  }, [user, router])

  useEffect(() => {
    if (user) handleFirebaseRead(user.id)
    // console.log(user);
  }, [])

  return (
    <div className='pt-[100px] pb-[150px]'>
      <UserDetails user={user} />
    </div>
  )
}

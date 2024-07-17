'use client'
import { auth, db } from "@/app/firebase";
import { setLogin, setUser } from "@/components/store/userSlice";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { useContext, createContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doc, addDoc, setDoc, collection, query, where, onSnapshot } from "firebase/firestore";

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user.userInfo)

  const googleSignIn = async (loginType) => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error signing in with Google: ', error);
    }
  }

  const logOut = () => {
    signOut(auth)
    dispatch(setLogin(false))
  }
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
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!user && currentUser)
        handleFirebaseRead(currentUser.uid)
      dispatch(setLogin(true))
    })
    return () => unsubscribe()
  }, [user])

  return (
    <AuthContext.Provider value={{ user, googleSignIn, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(AuthContext)
}
'use client'
import { auth, db } from "@/app/firebase";
import { setLogin, setUser } from "@/components/store/userSlice";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { useContext, createContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doc, addDoc, setDoc, collection } from "firebase/firestore";

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user.userInfo)

  const googleSignIn = async (loginType) => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const signedInUser = result.user;
    } catch (error) {
      console.error('Error signing in with Google: ', error);
    }
  }

  const logOut = () => {
    signOut(auth)
    dispatch(setLogin(false))
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      dispatch(setUser(currentUser))
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
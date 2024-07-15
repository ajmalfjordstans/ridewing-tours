'use client'
import { auth } from "@/app/firebase";
import { setLogin, setUser } from "@/components/store/userSlice";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { useContext, createContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user.userInfo)

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
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
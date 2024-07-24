'use client'
import { auth, db, readFirebaseCollection } from "@/app/firebase";
import { setLogin, setUser, setUserUid } from "@/components/store/userSlice";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { useContext, createContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doc, addDoc, setDoc, collection, query, where, onSnapshot } from "firebase/firestore";

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {

  const dispatch = useDispatch()
  const [firebaseUsers, setFirebaseUsers] = useState(null)
  const user = useSelector(state => state.user.userInfo)
  const [loginType, setLoginType] = useState('')
  const googleSignIn = async () => {
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
  // If Registered user ? Read from firebase
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
        dispatch(setLogin(true));
      });

      return unsubscribe; // Return the unsubscribe function to stop listening when needed
    } catch (error) {
      console.error("Error reading document: ", error);
    }
  };
  // If not a Registered user ? update firebase
  const handleFirebaseUserUpdate = async (currentUser) => {
    try {
      const user = {
        uid: currentUser?.uid,
        email: currentUser?.email,
        displayName: currentUser?.displayName,
        photoURL: currentUser?.photoURL,
        userRole: loginType // Use loginType for the role
      }
      await setDoc(doc(db, "users", currentUser?.uid), user);
      dispatch(setUser(user))
      dispatch(setLogin(true));
      console.log("User document successfully created!");
    } catch (err) {
      console.error("Error setting document: ", err);
    }
  }

  useEffect(() => {
    // Get all users registered in google firestore
    const getFirebaseData = async (currentUser) => {
      const response = await readFirebaseCollection('users')
      const registeredUser = response?.some(obj => obj.uid === currentUser?.uid);
      if (registeredUser) {
        handleFirebaseRead(currentUser.uid)
      } else {
        handleFirebaseUserUpdate(currentUser)
      }
      setFirebaseUsers(response);
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!user && currentUser) {
        getFirebaseData(currentUser)
        if (firebaseUsers) {
          const registeredUser = firebaseUsers?.some(obj => obj.uid === currentUser?.uid);
          // console.log(firebaseUsers);
          if (registeredUser) {
            handleFirebaseRead(currentUser.uid)
          } else {
            handleFirebaseUserUpdate(currentUser)
          }
        }
      }
      dispatch(setLogin(true))
    })
    return () => unsubscribe()
  }, [user, dispatch, handleFirebaseUserUpdate, handleFirebaseRead])

  return (
    <AuthContext.Provider value={{ user, googleSignIn, logOut, firebaseUsers, loginType, setLoginType }}>
      {children}
    </AuthContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(AuthContext)
}
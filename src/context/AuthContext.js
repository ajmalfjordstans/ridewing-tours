'use client';

import { auth, db, readFirebaseCollection } from "@/app/firebase";
import { setLogin, setUser } from "@/components/store/userSlice";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from "firebase/auth";
import { useContext, createContext, useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  onSnapshot
} from "firebase/firestore";
import { generatePayload, sendMail } from "@/components/services/send-mail";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [firebaseUsers, setFirebaseUsers] = useState(null);
  const user = useSelector(state => state.user.userInfo);
  const [loginType, setLoginType] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [signUpFormData, setSignUpFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      // Handle the result if needed
    } catch (error) {
      console.error('Error signing in with Google: ', error);
    }
  };

  // New User
  const emailSignUp = async (formData) => {
    setSignUpFormData(formData);
    try {
      const result = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      return result;
    } catch (error) {
      console.error('Error signing up with email: ', error);
      if (error.code === 'auth/email-already-in-use') {
        setErrorMessage('This email is already in use. Please use a different email or try signing in.');
      } else if (error.code === 'auth/weak-password') {
        setErrorMessage('Weak password. Please choose a stronger password.');
      } else {
        setErrorMessage('An error occurred. Please try again later.');
      }
    }
  };

  // Signin 
  const emailSignIn = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result;
    } catch (error) {
      if (error.code === 'auth/invalid-credential') {
        setErrorMessage('Wrong email or password.');
      }
      console.error('Error signing in with email: ', error);
    }
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(setLogin(false));
      })
      .catch((error) => {
        console.error('Error signing out: ', error);
      });
  };

  // Memoize handleFirebaseRead to prevent re-creation on each render
  const handleFirebaseRead = useCallback(async (uid) => {
    // Ensure generatePayload is stable or memoized
    try {
      let itemsArr = [];
      const q = query(collection(db, 'users'), where('uid', '==', uid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        itemsArr = []; // Reset the array on each snapshot
        querySnapshot.forEach((doc) => {
          itemsArr.push({ ...doc.data(), id: doc.id });
        });
        dispatch(setUser(itemsArr[0]));
        dispatch(setLogin(true));
      });

      return unsubscribe; // Return the unsubscribe function to stop listening when needed
    } catch (error) {
      console.error("Error reading document: ", error);
    }
  }, [db, dispatch, generatePayload]);

  // Memoize handleFirebaseUserUpdate to prevent re-creation on each render
  const handleFirebaseUserUpdate = useCallback(async (currentUser) => {
    const payload = generatePayload(currentUser, loginType);
    sendMail(payload)
    // console.log(loginType);
    try {
      const user = {
        uid: currentUser?.uid,
        email: currentUser?.email,
        displayName: currentUser?.displayName ? currentUser?.displayName : signUpFormData.username,
        photoURL: currentUser?.photoURL,
        userRole: loginType === "" ? "user" : loginType, // Use loginType for the role
        ...(loginType === "agent" && { active: false })
      };
      await setDoc(doc(db, "users", currentUser?.uid), user);
      dispatch(setUser(user));
      dispatch(setLogin(true));
      console.log("User document successfully created!");
    } catch (err) {
      console.error("Error setting document: ", err);
    }
  }, [db, dispatch, loginType, signUpFormData.username]);

  // Log loginType changes (optional, for debugging)
  // useEffect(() => {
  //   console.log("login Type:", loginType);
  // }, [loginType]);

  // Handle authentication state changes
  useEffect(() => {
    const getFirebaseData = async (currentUser) => {
      const response = await readFirebaseCollection('users');
      const registeredUser = response?.some(obj => obj.uid === currentUser?.uid);
      if (registeredUser) {
        handleFirebaseRead(currentUser.uid, currentUser);
      } else {
        handleFirebaseUserUpdate(currentUser);
      }
      setFirebaseUsers(response);
    };

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        if (!user) { // Only proceed if user is not already in Redux
          getFirebaseData(currentUser);
        }
      }
    });

    return () => unsubscribe();
  }, [user, dispatch, handleFirebaseUserUpdate, handleFirebaseRead, readFirebaseCollection, db]);

  return (
    <AuthContext.Provider value={{
      user,
      googleSignIn,
      logOut,
      firebaseUsers,
      loginType,
      setLoginType,
      emailSignUp,
      emailSignIn,
      setSignUpFormData,
      signUpFormData,
      errorMessage
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};

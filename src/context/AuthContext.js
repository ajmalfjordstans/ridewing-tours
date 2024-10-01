'use client'
import { auth, db, readFirebaseCollection } from "@/app/firebase";
import { setLogin, setUser } from "@/components/store/userSlice";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useContext, createContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doc, setDoc, collection, query, where, onSnapshot } from "firebase/firestore";

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {

  const dispatch = useDispatch()
  const [firebaseUsers, setFirebaseUsers] = useState(null)
  const user = useSelector(state => state.user.userInfo)
  const [loginType, setLoginType] = useState('')
  const [errorMessage, setErrorMessage] = useState('');
  const [signUpFormData, setSignUpFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error signing in with Google: ', error);
    }
  }

  // New User
  const emailSignUp = async (formData) => {
    setSignUpFormData(formData)
    try {
      const result = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
      return result
    } catch (error) {
      console.error('Error signing in with Google: ', error);
      if (error.code === 'auth/email-already-in-use') {
        setErrorMessage('This email is already in use. Please use a different email. Or try Signing In ');
      } else if (error.code == 'auth/weak-password') {
        setErrorMessage('week password')
      } else {
        setErrorMessage('An error occurred. Please try again later.');
      }
    }
  }

  // Signin 
  const emailSignIn = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      return result
    } catch (error) {
      if (error.code === 'auth/invalid-credential') {
        setErrorMessage('Wrong email or password');
      }
      // console.error('Error signing in with Google: ', error);
      // return error
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
        // console.log("Document successfully read!", itemsArr[0]);
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
    console.log(loginType);
    try {
      const user = {
        uid: currentUser?.uid,
        email: currentUser?.email,
        displayName: currentUser?.displayName ? currentUser?.displayName : signUpFormData.username,
        photoURL: currentUser?.photoURL,
        userRole: loginType == "" ? "user" : loginType, // Use loginType for the role
        ...(loginType === "agent" && { active: false })
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
    console.log("login Type:", loginType);
  }, [loginType])

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
          if (registeredUser) {
            // console.log(currentUser);
            handleFirebaseRead(currentUser.uid)
          } else {
            console.log(currentUser);
            handleFirebaseUserUpdate(currentUser)
          }
          dispatch(setLogin(true))
        }
      }

    })
    return () => unsubscribe()
  }, [user, dispatch, handleFirebaseUserUpdate, handleFirebaseRead])

  return (
    <AuthContext.Provider value={{ user, googleSignIn, logOut, firebaseUsers, loginType, setLoginType, emailSignUp, emailSignIn, setSignUpFormData, signUpFormData, errorMessage }}>
      {children}
    </AuthContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(AuthContext)
}
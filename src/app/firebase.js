// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBr-oaouwrifLn9FyhgPSjK7c-LEIThjAk",
  authDomain: "ridewing-1701351873793.firebaseapp.com",
  projectId: "ridewing-1701351873793",
  storageBucket: "ridewing-1701351873793.appspot.com",
  messagingSenderId: "628950916424",
  appId: "1:628950916424:web:6098fe1df8851ee70e277d",
  measurementId: "G-SFEDCV0EXL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
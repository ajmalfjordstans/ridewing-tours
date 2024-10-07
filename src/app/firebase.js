import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
let app;
let analytics;
let auth;
let db;
let storage;

if (typeof window !== 'undefined') {
  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(app);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
} else {
  console.error("Firebase can only be initialized in the browser");
}

// Collection Handles
export const readFirebaseCollection = async (path) => {
  if (!db) {
    console.error("Firestore is not initialized");
    return;
  }
  try {
    const query = collection(db, path);
    const querySnapshot = await getDocs(query);
    const dataArray = [];
    querySnapshot.forEach((doc) => {
      dataArray.push({ id: doc.id, ...doc.data() });
    });
    return dataArray;
  } catch (error) {
    console.error("Error reading collection: ", error);
  }
};

export const deleteFirebaseCollection = async (path) => {
  if (!db) {
    console.error("Firestore is not initialized");
    return;
  }
  try {
    const collectionRef = collection(db, path);
    const querySnapshot = await getDocs(collectionRef);
    const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
    console.log('Collection successfully deleted!');
  } catch (error) {
    console.error('Error deleting collection: ', error);
  }
};

// Document Handles
export const createFirebaseDocument = async (data, path, id) => {
  // console.log(data, path, id);
  
  if (!db) {
    console.error("Firestore is not initialized");
    return;
  }
  try {
    const documentRef = doc(db, path, id);
    await setDoc(documentRef, data);
    console.log('Document successfully created!');
    return true;
  } catch (error) {
    console.error('Error creating document: ', error);
  }
};

export const createDocumentWithAutoId = async (data, path) => {
  if (!db) {
    console.error("Firestore is not initialized");
    return;
  }
  try {
    const collectionRef = collection(db, path);
    const docRef = await addDoc(collectionRef, data);
    await updateDoc(docRef, { id: docRef.id });
    console.log('Document successfully created with ID: ', docRef.id);
  } catch (error) {
    console.error('Error creating document: ', error);
  }
};

export const readFirebaseDocument = async (path) => {
  if (!db) {
    console.error("Firestore is not initialized");
    return;
  }
  try {
    const docRef = doc(db, path);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      return docSnap.data();
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error reading document: ", error);
  }
};

export const updateFirebaseDocument = async (data, path) => {
  if (!db) {
    console.error("Firestore is not initialized");
    return;
  }
  try {
    const documentRef = doc(db, path);
    await updateDoc(documentRef, data);
    console.log('Document successfully updated!');
  } catch (error) {
    console.error('Error updating document: ', error);
  }
};

export const deleteFirebaseDocument = async (path) => {
  if (!db) {
    console.error("Firestore is not initialized");
    return;
  }
  try {
    const documentRef = doc(db, path);
    await deleteDoc(documentRef);
    console.log('Document successfully deleted!');
  } catch (error) {
    console.error('Error deleting document: ', error);
  }
};

export const deleteImage = async (imagePath) => {
  if (!storage) {
    console.error("Storage is not initialized");
    return;
  }
  try {
    const imageRef = storage.ref().child(imagePath); // Ensure 'imagePath' is the correct path in your Firebase Storage
    await imageRef.delete();
    console.log('Image successfully deleted');
  } catch (error) {
    console.error('Error deleting image:', error);
  }
};

export { app, analytics, auth, db, storage };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsRfanfgDgPJ4dC7yoxjLY0UxAWIN1XU4",
  authDomain: "react-9ae14.firebaseapp.com",
  projectId: "react-9ae14",
  storageBucket: "react-9ae14.appspot.com",
  messagingSenderId: "921055412009",
  appId: "1:921055412009:web:61b58caa916dd92473c138",
  measurementId: "G-SHBJ8PVZ13"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth=getAuth(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYxpDH8lj45BI0Uz5hOLe7s27pRvTjbXE",
  authDomain: "netflix-f1fc9.firebaseapp.com",
  projectId: "netflix-f1fc9",
  storageBucket: "netflix-f1fc9.firebasestorage.app",
  messagingSenderId: "916588098539",
  appId: "1:916588098539:web:b10a63e0bc9321e7b9dfae",
  measurementId: "G-MPYMSQ2RMY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

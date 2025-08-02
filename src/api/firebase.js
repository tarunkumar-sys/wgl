// src/api/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAs5O6AY-pRpv71JUH4bkfQ8J9yJoGGBO0",
  authDomain: "worldgreenline-aeeb4.firebaseapp.com",
  projectId: "worldgreenline-aeeb4",
  storageBucket: "worldgreenline-aeeb4.appspot.com",
  messagingSenderId: "562117248346",
  appId: "1:562117248346:web:fd1925ac1fb641d90b1f63",
  measurementId: "G-2SN6M8Z9YF",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

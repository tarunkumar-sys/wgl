import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
// src/firebase.js
import { getAuth } from 'firebase/auth';

// ✅ Your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAs5O6AY-pRpv71JUH4bkfQ8J9yJoGGBO0",
  authDomain: "worldgreenline-aeeb4.firebaseapp.com",
  projectId: "worldgreenline-aeeb4",
  storageBucket: "worldgreenline-aeeb4.appspot.com", // 🔁 FIXED: was wrong (.app → .com)
  messagingSenderId: "562117248346",
  appId: "1:562117248346:web:fd1925ac1fb641d90b1f63",
  measurementId: "G-2SN6M8Z9YF"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


// --- Firebase Configuration ---
// IMPORTANT: Replace this with your Firebase project's configuration
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase


// --- Initialize Firebase ---

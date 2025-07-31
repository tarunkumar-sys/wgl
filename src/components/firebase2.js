// src/firebase2.js
import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";

const blogsFirebaseConfig = {
  apiKey: "AIzaSyDBTHL4hP2MC_936_XJA7yR-n7fVxaJlxI",
  authDomain: "wglblogs.firebaseapp.com",
  projectId: "wglblogs",
  storageBucket: "wglblogs.appspot.com",
  messagingSenderId: "413902630865",
  appId: "1:413902630865:web:4dcc37fd520e70bcb5faf0",
  measurementId: "G-5XXHJ6MCHC"
};

const blogsApp = getApps().find(app => app.name === "blogsApp") 
  || initializeApp(blogsFirebaseConfig, "blogsApp");

export const blogsDatabase = getDatabase(blogsApp);
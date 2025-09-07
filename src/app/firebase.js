// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDbIpt9ofqVoeS-DbntAbF9DBQBMpsawuo",
  authDomain: "easeform-eb044.firebaseapp.com",
  projectId: "easeform-eb044",
  storageBucket: "easeform-eb044.firebasestorage.app",
  messagingSenderId: "825335848158",
  appId: "1:825335848158:web:f2aa5b7094b03cd133b64f",
  measurementId: "G-Y1BP02Q01M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and export it
export const db = getFirestore(app);
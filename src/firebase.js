// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClYqin5gyQ3WffsMgnoSZrnAluSCkFUdg",
  authDomain: "sparta-react-basic-c6dce.firebaseapp.com",
  projectId: "sparta-react-basic-c6dce",
  storageBucket: "sparta-react-basic-c6dce.appspot.com",
  messagingSenderId: "753545535518",
  appId: "1:753545535518:web:5e7d672d0ded53e7990e0f",
  measurementId: "G-K3P9D60F9Q"
};

initializeApp(firebaseConfig);

// Initialize Firebase
// const app = initializeApp(firebaseConfig);


export const db = getFirestore();
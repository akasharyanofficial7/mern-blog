// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
console.log("smjDvcjdsvcjshcv");
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRBASE_API_KEY,
  authDomain: "mern-blog-bb518.firebaseapp.com",
  projectId: "mern-blog-bb518",
  storageBucket: "mern-blog-bb518.appspot.com",
  messagingSenderId: "969052172787",
  appId: "1:969052172787:web:a88df358ffaebae355a286",
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);

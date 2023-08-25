// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnvrffbajuMWWR_k1LSDmGQezKThCnxWk",
  authDomain: "disney-plus-app-a3cfb.firebaseapp.com",
  projectId: "disney-plus-app-a3cfb",
  storageBucket: "disney-plus-app-a3cfb.appspot.com",
  messagingSenderId: "1096601940534",
  appId: "1:1096601940534:web:f1242f651d9b66992a5e97"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
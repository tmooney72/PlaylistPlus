// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZIIMMKrMBKo1alk0kJMbMyStZ8wYdQzA",
  authDomain: "playlistplus-66399.firebaseapp.com",
  projectId: "playlistplus-66399",
  storageBucket: "playlistplus-66399.firebasestorage.app",
  messagingSenderId: "633654046546",
  appId: "1:633654046546:web:e1a2a109c1b835ccc8948b",
  measurementId: "G-KWJ2V58NGX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export {app};
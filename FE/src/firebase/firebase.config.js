// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWf37nbG4AtqkyUnK5DfsnXoZmzs0C0Zg",
  authDomain: "webdemo-946f0.firebaseapp.com",
  projectId: "webdemo-946f0",
  storageBucket: "webdemo-946f0.appspot.com",
  messagingSenderId: "465474759434",
  appId: "1:465474759434:web:e76d55a8e30bdccaaa68f3"
};

// Initialize Firebase
const InitializeFirebase = initializeApp(firebaseConfig);

export default InitializeFirebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYoip3G0WqOntXYwOwqsJWkImp-1ibUxk",
  authDomain: "zot-list.firebaseapp.com",
  projectId: "zot-list",
  storageBucket: "zot-list.appspot.com",
  messagingSenderId: "244866013444",
  appId: "1:244866013444:web:b0405ee98c196e18bdd851",
  measurementId: "G-KN6D2LR92E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
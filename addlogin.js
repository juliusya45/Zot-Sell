import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { config } from 'dotenv';
config();

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "zot-list.firebaseapp.com",
  projectId: "zot-list",
  storageBucket: "zot-list.appspot.com",
  messagingSenderId: "244866013444",
  appId: "1:244866013444:web:b95109880464ce93bdd851",
  measurementId: "G-9TGHEHLNVF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
import { createUserWithEmailAndPassword } from "firebase/auth";

createUserWithEmailAndPassword(auth, "juliusya45@gmail.com", "test123")
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
//Getting required Firebase Libs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore"; 

import express from 'express';
const appE = express()
const port = process.env.PORT || 3000;
import cors from 'cors';

appE.use(express.json())
appE.post('/addlisting', (req, res) => {
  console.log(req.body); 
  res.send("a")
})

appE.use('/public', express.static('public'))

//change from require to import
import { config } from 'dotenv';
config();

//firebase configs
const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "zot-list.firebaseapp.com",
  projectId: "zot-list",
  storageBucket: "zot-list.appspot.com",
  messagingSenderId: "244866013444",
  appId: "1:244866013444:web:b95109880464ce93bdd851",
  measurementId: "G-9TGHEHLNVF"
};

//init variables for firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



async function main()
{
  // Add a new document in collection "cities"
  await setDoc(doc(db, "cities", "LA"), {
    name: "Los Angeles",
    state: "CA",
    country: "USA"
  });

    appE.use(cors())
    appE.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}
main();
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, getDocs } from "firebase/firestore";
import { collection } from "firebase/firestore"; 

//change from require to import
import { config } from 'dotenv';
config();

import express from 'express';
const appE = express();

appE.use(express.json())

appE.use('public', express.static('public'))

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

//each doc is passed into this fucntion
//this function has access to all fields


//gets data from listing
async function main()
{
    const querySnapshot = await getDocs(collection(db, "listings"));
    querySnapshot.forEach((doc) => {

      appE.get('/showlistings', (req, res) => {
        console.log(req.body)
        res.send(doc)
      })
      
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
}
main();

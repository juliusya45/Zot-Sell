//Getting required Firebase Libs
import { initializeApp } from "firebase/app";
import { getFirestore, waitForPendingWrites } from "firebase/firestore";
import { handleListings } from './getlistings.js';
import { addListing } from './addlistingdb.js'

import express from 'express';
const appE = express()
const port = process.env.PORT || 3000;
import cors from 'cors';

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
  measurementId: "G-9TGHEHLNVF",
  storageBucket: 'gs://zot-list.appspot.com'
};

//init variables for firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



async function main()
{
  appE.use(express.json())
  appE.use(cors())
  appE.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  })

  //This adds data from listing to db
  appE.post('/addlisting', async (req, res) => {
    console.log(req.body);
    //addListing(req.body);
    var sendInfo = await addListing(db, req.body)
    res.send(sendInfo);
  })

  //handles get for listings
  appE.get('/listings', handleListings(db));
}
main();
//Getting required Firebase Libs
import { initializeApp } from "firebase/app";
import { getFirestore, waitForPendingWrites } from "firebase/firestore";
import { collection, addDoc} from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { handleListings } from './listings.js';

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
    var sendInfo = await addListing(req.body)
    res.send(sendInfo);
  })

  //handles get for listings
  appE.get('/listings', handleListings(db));
}
main();

//function converts and uploads the image
async function addImg(img, picid)
{
  var bytearray = Uint8Array.from(atob(img), c => c.charCodeAt(0));

  const storage = getStorage();
  //image name is created
  var imgName = picid + '.png';

  const picRef = ref(storage, imgName);
  const ImagesPicRef = ref(storage, 'images/'+imgName);

  // While the file names are the same, the references point to different files
  picRef.name === ImagesPicRef.name;           // true
  picRef.fullPath === ImagesPicRef.fullPath;   // false 

  const storageRef = ref(storage, ImagesPicRef);

    //storageRef is the img being uploaded
  await uploadBytes(storageRef, bytearray).then((snapshot) => {
    console.log('Uploaded a blob or file! with name: ' + imgName);
  });
  return (imgName);
}

//This function actually adds the listing
async function addListing(info)
{
      // Add a new document with a generated id.
    var img = info["picture"];
    delete info["picture"];
    info["time"] = Timestamp.now();
    const docRef = await addDoc(collection(db, "listings"), info);
    //var docInfo = "Document written with ID: " + docRef.id
   console.log(docRef.id);
   return await addImg(img, docRef.id);
}


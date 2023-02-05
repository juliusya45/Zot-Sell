//Getting required Firebase Libs
import { initializeApp } from "firebase/app";
import { getFirestore, waitForPendingWrites } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore"; 
import { collection, addDoc} from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";

import express from 'express';
const appE = express()
const port = process.env.PORT || 3000;
import cors from 'cors';

appE.use(express.json())
appE.post('/addlisting', (req, res) => {
  console.log(req.body);
  //addListing(req.body);
  addImg(req.body);
})
appE.get('http://localhost:3000/showlistings', (req, res) => {
  console.log(req.body)
  console.log(res)
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
  measurementId: "G-9TGHEHLNVF",
  storageBucket: 'gs://zot-list.appspot.com'
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

async function addImg(info)
{
  console.log(info);
  //var bytearray = Uint8Array.from(atob(info["picture"]), c => c.charCodeAt(0));
  var bytearray = Uint8Array.from(atob(info["picture"]), c => c.charCodeAt(0));
  // Create a root reference
  const storage = getStorage();
  var imgName = new Date() + '-' + '.png';
  // Create a reference to 'mountains.jpg'
  const picRef = ref(storage, imgName);

  // Create a reference to 'images/mountains.jpg'
  const ImagesPicRef = ref(storage, 'images/'+imgName);

// While the file names are the same, the references point to different files
picRef.name === ImagesPicRef.name;           // true
picRef.fullPath === ImagesPicRef.fullPath;   // false 

  const storageRef = ref(storage, ImagesPicRef);

    // 'file' comes from the Blob or File API
  await uploadBytes(storageRef, bytearray).then((snapshot) => {
    console.log('Uploaded a blob or file! with name: ' + imgName);
  });
  info["picture"] = imgName;
  await addListing(info);
}

async function addListing(info)
{
      // Add a new document with a generated id.
    info["time"] = Timestamp.now();
    const docRef = await addDoc(collection(db, "listings"), info);
   console.log("Document written with ID: ", docRef.id);
}


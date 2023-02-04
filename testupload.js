import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore"; 
import { collection, addDoc } from "firebase/firestore"; 
import { getDoc } from "firebase/firestore";

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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//Example of how to explicitly add entry with doc name
async function testAdd()
{
    // Add a new document in collection "cities"
  await setDoc(doc(db, "cities", "LA"), {
    name: "Los Angeles",
    state: "CA",
    country: "USA"
  });
}
//testAdd();

//template to add item with generated doc id
async function testAddID()
{
  
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "cities"), {
         name: "Tokyo",
        country: "Japan"
    });
    console.log("Document written with ID: ", docRef.id);
}
testAddID();

async function getData()
{
    const docRef = doc(db, "cities", "SF");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}
getData();
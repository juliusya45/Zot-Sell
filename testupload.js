import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore"; 

import { config } from 'dotenv';
config();

//Initializing Firebase, Ideally only in index
var admin = require("firebase-admin");
//actual intialization
admin.initializeApp({
  credential: admin.credential.cert({
    type: "service_account",
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: process.env.CLIENT_CERT_URL
  })
});

const db = getFirestore();

//Example of how to explicitly add entry with doc name
async function testAdd()
{
    //creates database
    const docRef = db.collection('test').doc('a listing');
    
    await docRef.set({
        title: 'This is a listing',
        time: Timestamp.now(),
        testtime: new Date().toISOString(),
        user: 'Julius'
    })
}
testAdd();

//template to add item with generated doc id
async function testAddID()
{
    // Add a new document with a generated id.
const res = await db.collection('cities').add({
    name: 'Tokyo',
    country: 'Japan'
  });
  
  console.log('Added document with ID: ', res.id);
}
//testAddID();

async function getData()
{
    const cityRef = db.collection('cities').doc('1JqIrsktR8FKosr4z4zr');
        const doc = await cityRef.get();
    if (!doc.exists) {
        console.log('No such document!');
    } else {
        console.log('Document data:', doc.data());
}
}
getData();
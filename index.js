//Getting required Firebase Libs
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const cors = require('cors');

var dotenv = require('dotenv');
dotenv.config();

//Initializing Firebase
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



//sets db to the database in the firestore
const db = getFirestore();

async function main()
{
    //creates database
    const docRef = db.collection('users').doc('alovelace');
    //sets database
    await docRef.set({
         first: 'Ada',
         last: 'Lovelace',
         born: 1815
    });

    app.use(cors())
    app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}
main();
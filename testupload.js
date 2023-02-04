//Getting required Firebase Libs
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

var dotenv = require('dotenv');
dotenv.config();

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

async function testAdd()
{
    //creates database
    const docRef = db.collection('test').doc('a listing');
    
    await docRef.set({
        title: 'This is a listing',
        time: new Date().toISOString(),
        user: 'Julius'
    })
}
testAdd();

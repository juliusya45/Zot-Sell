let itemTitle;
let description;
let phoneNum;
let meetingSpot;
let price;
let datePosted;
let quantity;
let img;
let isClothing;
let isElectronics;
let isShoes;
let isAthletics;
let isJewelry;

function anyValsMissing(li) {
    for (let i = 0; i < li.length; i++) {
        if (!li[i]) {
            return true
        }
    }
    return false
}

const btn = document.querySelector("#submitListingBtn");
btn.addEventListener('click', function() {
    
    // Strings
    itemTitle = document.getElementById('item-title').value
    description = document.getElementById('description').value
    phoneNum = document.getElementById('phone-num').value
    meetingSpot = document.getElementById('meeting-spot').value

    // Numbers
    price = document.getElementById('price').value
    datePosted = document.getElementById('date-posted').value
    quantity = document.getElementById('quantity').value
    
    
    img = document.getElementById('img').value

    // Bools
    isClothing = document.getElementById('clothing').checked
    isElectronics = document.getElementById('electronics').checked
    isShoes = document.getElementById('shoes').checked
    isAthletics = document.getElementById('athletics').checked
    isJewelry = document.getElementById('jewelry').checked

    console.log('yo yo!')

    console.log([itemTitle, description, price, datePosted, quantity, 
    phoneNum, meetingSpot, img, isClothing, isElectronics, isShoes, isAthletics, isJewelry])

    requiredVals = [itemTitle, description, price, datePosted, quantity, 
        phoneNum, img]

    if (!anyValsMissing(requiredVals)) {
        sendFormData();
    }

});

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

async function sendFormData()
{
    //creates database
    const docRef = db.collection('listings').add({
        itemTitle: itemTitle,
        description: description,
        price: price,
        datePosted: Timeestamp.now(),
        quantity: quantity,
        phoneNum: phoneNum,
        meetingSpot: meetingSpot,
        img: img,
        isClothing: isClothing,
        isElectronics: isElectronics,
        isShoes: isShoes,
        isAthletics: isAthletics,
        isJewelry: isJewelry

    });   
}

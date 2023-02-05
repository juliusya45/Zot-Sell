import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";

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
const storage = getStorage(app);

// Create the file metadata
/** @type {any} */
const metadata = {
  contentType: 'image/jpeg'
};
let photo = document.getElementById("image-file").files[0];
let formData = new FormData();
     
formData.append("photo", photo);
fetch('/upload/image', {method: "POST", body: formData});
// Upload file and metadata to the object 'images/mountains.jpg'
const storageRef = ref(storage, 'images/' + file.name);
const uploadTask = uploadBytesResumable(storageRef, file, metadata);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
    });
  }
);
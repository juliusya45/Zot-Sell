import { collection, addDoc} from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";

//This function actually adds the listing
export async function addListing(db, info)
{
      // Add a new document with a generated id.
    var img = info["picture"];
    delete info["picture"];
    info["time"] = Timestamp.now();
    const docRef = await addDoc(collection(db, "listings"), info);
    //var docInfo = "Document written with ID: " + docRef.id
   console.log(docRef.id);
   return await addImg(img, docRef.id, db);
}

/**
 * It takes a base64 string, converts it to a byte array, then uploads it to firebase storage.
 * @param img - the image in base64 format
 * @param picid - the id of the picture
 * @returns The name of the image being uploaded.
 */
async function addImg(img, picid, db)
{
  var bytearray = Uint8Array.from(atob(img), c => c.charCodeAt(0));

  const storage = getStorage();
  //image name is created
  var imgName = picid + '.png';

  const picRef = ref(storage, imgName);
  const ImagesPicRef = ref(storage, 'images/'+imgName);

  // While the file names are the same, the references point to different files
  picRef.name === ImagesPicRef.name;
  picRef.fullPath === ImagesPicRef.fullPath;

  const storageRef = ref(storage, ImagesPicRef);

    //storageRef is the img being uploaded
  await uploadBytes(storageRef, bytearray).then((snapshot) => {
    console.log('Uploaded a blob or file! with name: ' + imgName);
  });
  await addImgUrl(storage, picid, db);
  return (imgName);
}

/**
 * It takes a storage reference and a database reference and a picid and then it gets the download url
 * of the image and then it updates the database with the download url.
 * @param storage - firebase.storage.Storage
 * @param picid - the id of the document in the database
 * @param db - the database
 */
async function addImgUrl(storage, picid, db)
{
  const docRef = doc(db, "listings", picid);
  console.log('picid is: ' + picid)
  await getDownloadURL(ref(storage, 'images/' + picid + '.png'))
  .then(async (url) => {
    console.log(url)
    await updateDoc(docRef, {
      imgUrl: url
    });

  })
  .catch((error) => {
    // Handle any errors
    console.log(error);
  });
}
import { collection, addDoc} from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";

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
   return await addImg(img, docRef.id);
}

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
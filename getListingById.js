import { doc, getDoc } from "firebase/firestore";

export function getListingById(db)
{
    return async function(req, res)
    {
      const docRef = doc(db, "listings", req.query.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        res.send(docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
  }
}

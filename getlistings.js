import { collection, getDocs } from "firebase/firestore";
export function handleListings(db)
{
    return async function(req, res)
    {
        //returns all listings in the database
        const allListings = {};
        const querySnapshot = await getDocs(collection(db, "listings"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
        allListings[doc.id] = doc.data();
        });
        res.send(allListings);
    }
}
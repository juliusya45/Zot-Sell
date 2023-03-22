import { collection, getDocs } from "firebase/firestore";
import { query, orderBy } from "firebase/firestore";  
export function handleListings(db)
{
    return async function(req, res)
    {
        const listingsRef = collection(db, "listings");
        const q = query(listingsRef, orderBy("time", "desc"));
        //console.log(q);
        //returns all listings in the database
        const allListings = {};
        //collection(db, "listings")
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
        allListings[doc.id] = doc.data();
        });
        res.send(allListings);

    }
}
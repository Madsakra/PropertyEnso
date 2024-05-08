import { getDocs, collection, addDoc} from 'firebase/firestore';
import { db } from '../firebase-config';


export class ShortlistSoldProperty{


    constructor()
    {

    }

    



    
    async sendSoldProperty(shortListedData,uid,profileID)
    {
        const allBuyerSavedRef = collection(db,"BuyerSavedListings")
        const allBuyerSavedListings = await getDocs(allBuyerSavedRef);
        

        async function ensureNoDuplicates(shortListedData, profileID, uid, querySnapshot) {
            // convert the snapshot into an array for iteration
            const allBuyerSavedListings = await querySnapshot.docs.map(doc => doc.data());

            for (let savedListing of allBuyerSavedListings) {;
                const buyerProfileID = savedListing.buyerProfileID;
                const buyerUID = savedListing.buyerUID;
                const saved = savedListing.savedListing.name;
        
                if (saved === shortListedData.name && buyerProfileID === profileID && buyerUID === uid) {
                    console.log(saved);
                    return false; // If duplicate found, return false
                }
            }
            return true; // If no duplicate found, return true
        }

        const filterResults = await ensureNoDuplicates(shortListedData,profileID,uid,allBuyerSavedListings);
 
        
        if (filterResults)
        {
            await addDoc(collection(db,"BuyerSavedListings"),{
                buyerUID: uid,
                buyerProfileID: profileID,
                savedListing:shortListedData
           })

           return true;
        }

        else{
            return false;
        }

   
    }

}





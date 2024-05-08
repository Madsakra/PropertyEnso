import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase-config';



export class SavedNewProperty{

    constructor()
    {

    }


    async fetchNewSavedProperty(uid,profileID)
    {

        const allBuyerSavedRef = collection(db,"BuyerSavedListings")
        const allBuyerSavedListings = await getDocs(allBuyerSavedRef);
    
        let result = [];

        allBuyerSavedListings.forEach((record)=>{

            const listingData = record.data();
            const recordProfileID = listingData.buyerProfileID;
            const recordUID = listingData.buyerUID;
            const savedListing = listingData.savedListing;

            if (recordUID===uid && recordProfileID===profileID && savedListing.status==="new")
            {
                result.push(savedListing);
            }
            

        })




          return result;
        }



}
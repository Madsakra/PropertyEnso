import { db } from '../firebase-config';
import { collection } from 'firebase/firestore';
import { getDocs } from 'firebase/firestore';

export class Listing{
    constructor()
    {

    }

    async fetchListing()
    {
        const listingDataCollection = collection(db, "propertyData");
        try{

            const data = await getDocs(listingDataCollection);
            return data;
        }
        catch(err)
        {
            console.error(err);
        }
    }


}
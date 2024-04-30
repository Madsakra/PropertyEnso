import { db } from '../firebase-config';
import { collection } from 'firebase/firestore';
import { getDocs } from 'firebase/firestore';

export class SellerSoldProperties{
    constructor()
    {

    }

    async getSoldSellerProperties(authUser)
    {
        const userId = authUser?.uid;
        let mySaved = [];
        const listingDataCollection = collection(db, "propertyData");
        const data = await getDocs(listingDataCollection);
        try{

            data.docs.map((doc)=>{
                const allIndividualProps = doc.data().indiProps;
                const street = doc.data().street;
                const project = doc.data().project;
                allIndividualProps.forEach((property)=>{
                    if (property.seller.UID === userId && property.status ==="sold")
                    {
                       property.address = street;
                       property.project = project;
                       mySaved.push(property);
                    }
                })
            })
        
            return mySaved;
        }
        catch(err)
        {
            console.error(err);
        }
    
        

    }


}
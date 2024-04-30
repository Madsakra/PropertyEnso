import { db } from '../firebase-config';
import { collection } from 'firebase/firestore';
import { getDocs } from 'firebase/firestore';

export class ViewSoldListing{
    constructor()
    {

    }

    async fetchListing()
    {
        const listingDataCollection = collection(db, "propertyData");
        try{

            const data = await getDocs(listingDataCollection);
            
            let mainContainer = [];
            data.docs.map((doc)=>{
                
                let currentDoc = doc.data();

                
                const filteredData = doc.data().indiProps.filter((property)=>{
                    return property.status === "sold";
                });

                currentDoc.indiProps = filteredData;
                mainContainer.push(currentDoc);
                })
            
            return mainContainer;
        }
        catch(err)
        {
            console.error(err);
        }
    }


}
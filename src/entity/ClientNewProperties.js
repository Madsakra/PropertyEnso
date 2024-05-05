import { db } from '../firebase-config';
import { collection } from 'firebase/firestore';
import { getDocs } from 'firebase/firestore';

export class ClientNewProperties{
    constructor()
    {

    }

    async getNewClientProperty(authUser)
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
                    if (property.agent.UID === userId && property.status ==="new")
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
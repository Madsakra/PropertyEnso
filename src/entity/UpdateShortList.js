import { db } from '../firebase-config';
import { getDocs, updateDoc, collection,doc} from 'firebase/firestore';

export class UpdateShortList{

    constructor()
    {

    }

    async sendViewsIntoDB(itemName,floorRange)
    {
        const listingDataCollection = collection(db, "propertyData");
        
        try{
            let targetID = "";
            let targetArray = [];

            
            const data = await getDocs(listingDataCollection);
            data.docs.map((doc)=>{
                 // copy document from db
                 // extract individual property array from copy
                const allIndividualProps = doc.data().indiProps;
                // copy id from document
                const tempID = doc.id;

                // check if property exists in loop
                allIndividualProps.forEach((property)=>{
                    // if property exists
                    if (itemName === property.name && floorRange === property.floorRange)
                    {
                        // copy the ID into another variable that be be accessed outside loop
                        targetID = tempID;
                       
                        // if property does have a view
                        if (property.numberOfShortList !== undefined)
                        {
                            let temp = property.numberOfShortList;
                            temp += 1;
                            property.numberOfShortList = temp;
                            targetArray = allIndividualProps;
                        }
                        // if property has no views
                        else{
                            property.numberOfShortList = 1;
                            targetArray = allIndividualProps;
                        }
                        
                    }
                })
               
            })
    

            const currentUserRef = doc(db, "propertyData", targetID);
            await updateDoc(currentUserRef,{
             
              "indiProps":targetArray
            })
            console.log("views recorded");

        }
        catch(err)
        {
            console.error(err);
        }
    }



}
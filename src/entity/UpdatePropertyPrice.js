import { getDocs, updateDoc, collection,doc} from 'firebase/firestore';
import { db } from '../firebase-config';





export class UpdatePropertyPrice{


    constructor()
    {

    }


    async updatePriceInDB(property,newPrice)
    {
        const listingDataCollection = collection(db, "propertyData");
        const data = await getDocs(listingDataCollection);
        try{

            data.docs.map((myDoc)=>{
                let currentDocData =  myDoc.data().indiProps; 
                const dataStreet = myDoc.data().street;
                const docuID = myDoc.id;
         
            if (property.address === dataStreet)
            {
                   
                    currentDocData.forEach((singleProperty)=>{

                        // PRIMARY KEY: STREET + AREA + NAME + FLOOR RANGE + DISTRICT
                        if (property.area === singleProperty.area && property.name === singleProperty.name && 
                            property.floorRange === singleProperty.floorRange 
                            && property.district === singleProperty.district)
                            {
                                singleProperty.price = newPrice;       
                            }                      
                    })
                    const currentUserRef = doc(db, "propertyData", docuID);
                    const updateAccordingly = async ()=>{
                        await updateDoc(currentUserRef,{
                    
                        "indiProps": currentDocData

                    })
                }                  
                updateAccordingly();
             
         
            }
           
        
            })
            return true;
            
        }
        catch(err)
        {
            console.error(err);
        }
    }


}
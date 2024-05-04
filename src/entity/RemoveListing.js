import { reauthenticateWithCredential } from "firebase/auth";
import { auth } from "../firebase-config";
import { EmailAuthProvider } from "firebase/auth";
import { getDocs, updateDoc, collection,doc} from 'firebase/firestore';
import { db } from '../firebase-config';


export class RemoveListing{

    constructor()
    {

    }


    async removeListingFromDB(email,password,property)
    {
        try{
            // repack email and password into credentials
           
           
            const user = auth.currentUser;
            const credentials = EmailAuthProvider.credential(email,password);
       
            console.log(credentials);
            // verify account details first
            const result = await reauthenticateWithCredential(user,credentials);
            // IF NO ISSUES WITH RE-AUTH, NO ERROR THROWN AND THUS WILL MOVE ON
            if (result)
            {
                 
                const listingDataCollection = collection(db, "propertyData");
                const data = await getDocs(listingDataCollection);

                data.docs.map((myDoc)=>{
                    
                    // LOOP THROUGH 4 PROPERTY DOCUMENTS FIRST

                    let currentDocData =  myDoc.data().indiProps;
                    let copiedArray = []; 
                    const dataStreet = myDoc.data().street;
                    const docuID = myDoc.id;
                    
                    // IF ADDRESS = DATASTREET 
                    // PASS THE FIRST LOOP

                    if (property.address === dataStreet)
                    {
                        
                        currentDocData.forEach((singleProperty)=>{
    
                            // PRIMARY KEY: STREET + AREA + NAME + FLOOR RANGE + DISTRICT
                            // EXCLUDE THE PROPERTY WITH THE SAME PK
                            if (property.area !== singleProperty.area && property.name !== singleProperty.name && 
                                property.floorRange !== singleProperty.floorRange 
                                && property.district !== singleProperty.district)
                                {
                                        copiedArray.push(singleProperty)
                                }                      
                        })

                        // ONCE THE COPIED ARRAY IS READY - TAKE IT AND UPDATE
                        const currentUserRef = doc(db, "propertyData", docuID);
                        const updateAccordingly = async ()=>{
                            await updateDoc(currentUserRef,{
                        
                            "indiProps": copiedArray
    
                        })
                    }                  
                    updateAccordingly();
                 
             
                }
               
            
                })


                return true;
                
            }
        }

        catch(err)
        {
            console.log(err);
            return false;
        }


    }


}
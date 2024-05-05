import { getDownloadURL, ref,uploadBytes } from 'firebase/storage';
import { storage } from '../firebase-config';
import { v4 } from 'uuid';

import { db } from '../firebase-config';

import { getDocs, updateDoc, collection,doc} from 'firebase/firestore';



export class CreateProperty{
    constructor()
    {

    }

    async createNewProperty(myPackage,image,street)
    {

        // 1. upload image to firebase first to get image ref
        const imageName =  'image/'+image.name + v4();
    
        const imageRef = ref(storage,imageName);
       
        const snapshot = await uploadBytes(imageRef,image)
        const imageUrl = await getDownloadURL(snapshot.ref)
    
        myPackage.image = imageUrl;
        myPackage.status = "new";

        
  
        
        const listingDataCollection = collection(db, "propertyData");
        const data = await getDocs(listingDataCollection);
        try{

            data.docs.map((myDoc)=>{
                let currentDocData =  myDoc.data().indiProps; 
                const dataStreet = myDoc.data().street;
                let copyOfData = [...currentDocData];

                
            const docuID = myDoc.id;
            if (street === dataStreet)
            {
                    copyOfData.push(myPackage);
               
                
                    const currentUserRef = doc(db, "propertyData", docuID);
                    const updateAccordingly = async ()=>{
                        await updateDoc(currentUserRef,{
                    
                        "indiProps": copyOfData

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


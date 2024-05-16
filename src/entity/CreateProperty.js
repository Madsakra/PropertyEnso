import { getDownloadURL, ref,uploadBytes } from 'firebase/storage';
import { storage } from '../firebase-config';
import { v4 } from 'uuid';

import { db } from '../firebase-config';

import { getDocs, updateDoc, collection,doc,getDoc} from 'firebase/firestore';



export class CreateProperty{
    constructor()
    {

    }

    async createNewProperty(myPackage,image,street,sellerEmail)
    {

        // 1. upload image to firebase first to get image ref
        const imageName =  'image/'+image.name + v4();
    
        const imageRef = ref(storage,imageName);
       
        const snapshot = await uploadBytes(imageRef,image)
        const imageUrl = await getDownloadURL(snapshot.ref)
    
        myPackage.image = imageUrl;
        myPackage.status = "new";

        const userAccountsRef= collection(db, "allAccounts");
        const accounts = await getDocs(userAccountsRef);
    

        const accountExist = async ()=>{
            for (let i=0;i<accounts.docs.length;i++)
            {
            const accountData = accounts.docs[i].data();

            // check if email exist first
            // if exist, then check for profile type
            if (accountData.email === sellerEmail)
            {
                // account exist, but need to check for user's role
                const secondProfileRef = doc(db, "userProfile", accountData.profileID);

                    const secondProfile = await getDoc(secondProfileRef);
                    const secondProfileData = secondProfile.data();
                    if (secondProfileData.type === "Seller")
                    {
                        myPackage.seller = {UID:accountData.UID, email: sellerEmail}
                        return true;
                    }
                    else{
                        return false;
                    }
                
            }

            }
            return false;
        }

        const validationResult = await accountExist();
        
        if (!validationResult)
        {
            return false;
        }

        else{


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
            
              
            }
            catch(err)
            {
                console.error(err);
                return false;
            }

            return true;

        }
        

    
        

    }


}


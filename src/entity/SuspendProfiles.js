import { updateDoc } from "firebase/firestore";
import { collection, getDocs,doc} from "firebase/firestore"; 
import { db } from "../firebase-config";

export class SuspendProfiles{


    constructor()
    {

    }


    async suspendProfilesInDB(specificRole)
    {
        try{

            const allProfileCollection = collection(db, "userProfile");
            const allDocuments = await getDocs(allProfileCollection);
    
            
    
            allDocuments.forEach(async (mydoc)=>{
                const data = mydoc.data();
                const accountDocRef = data.accountDocRef;
                if (data.type === specificRole)
                {
                    const docRef = doc(db, 'allAccounts', accountDocRef);
                    await updateDoc(docRef,{
                        status:"suspended"
                    })
                }
            })
    
            return true;


        }

        catch(error)
        {
            console.log(error);
        }

    }
    


}
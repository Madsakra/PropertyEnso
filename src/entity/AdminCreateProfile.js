import { collection, addDoc, getDocs,updateDoc,doc} from "firebase/firestore"; 
import { db } from "../firebase-config";



export class AdminCreateProfile{


    constructor()
    {

    }





    async createProfileInDB(email,role,description)
    {
        // 1. check if email exist
        const allAccountsCollection = collection(db, "allAccounts");
        const allDocuments = await getDocs(allAccountsCollection);

        const accountsArray = allDocuments.docs.map((doc) => {
            const data = doc.data();
            data.accountID = doc.id; // Add the document ID to the data object
            return data;
        });

        // TAKE AWAY ACCOUNT ID ABOVE
        

        const validateAndWrite = async ()=>{
            
            for (let account of accountsArray)
            {
                if (account.email === email && account.profileID === undefined )
                {
                    
                    const profileRef = await addDoc(collection(db, "userProfile"), {
                        UID:account.UID,
                        description:description,
                        type:role,
                        accountDocRef:account.accountID,
                      });

                    // UPDATE ACCOUNT SIDE ALSO, ACCOUNT WILL HAVE PROFILE ID
                    const currentAccountRef = doc(db, "allAccounts", account.accountID);
                    
                    await updateDoc(currentAccountRef, {
                        profileID:profileRef.id
                      });

                    return true;
                }
            }

            // IF NO UPDATES RETURN FALSE
            return false;
       } 
    
       const validateAndWriteResults = await validateAndWrite();
       return validateAndWriteResults;
    
    }


    




    


}
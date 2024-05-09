import { doc,updateDoc,collection,getDocs } from "firebase/firestore";
import { db } from "../firebase-config";


export class SuspendAccount{


    constructor()
    {

    }


    async suspendActiveAccount(accountDocRef,accountID)
    {

      const allProfilesCollection = collection(db, "userProfile");
      const allDocuments = await getDocs(allProfilesCollection);

      const profilesArray = allDocuments.docs.map((doc) => {
          const data = doc.data();
          return data;
      });

      const isUserNotAdmin = async ()=>{   
        for (let profile of profilesArray)
        { 
            // IF USER ADMIN RETURN FALSE. CAN'T SUSPEND ADMIN
            if (accountID === profile.UID && profile.type === "Admin")
            {
                return false;
            }
        }

        // IF USER IS NOT ADMIN, THEN RETURN TRUE SO CAN UPDATE
        return true;
   } 





        try
        {
            const validationResults = await isUserNotAdmin(accountID);
            
        
            if (validationResults)
            {
              const targetAccountRef = doc(db, "allAccounts", accountDocRef);
              await updateDoc(targetAccountRef, {
                  status:"suspended"
                });
              
                return true
            }

            else{
              return validationResults;
            }

          }
        catch(error)
        {
          console.log(error)
        }
    }





}
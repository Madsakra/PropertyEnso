import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";

export class UpdateUserName{

    constructor()
    {

    }


    async updateNameInDB(accountRefNo,newName)
    {
          try
          {
            const targetAccountRef = doc(db, "allAccounts", accountRefNo);

            await updateDoc(targetAccountRef, {
                userName:newName
              });
            
              return true
            }
          catch(error)
          {
            console.log(error)
          }

    }
}
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";

export class UpdateDescription{

    constructor()
    {

    }

    async updateDescriptionInDB(profileID,newDescription)
    {
        try
        {
          const targetProfileRef = doc(db, "userProfile", profileID);

          await updateDoc(targetProfileRef, {
                description:newDescription
            });
          
            return true
          }
        catch(error)
        {
          console.log(error)
        }
    }



}
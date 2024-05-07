import { functions } from "../firebase-config";
import { httpsCallable } from "firebase/functions";
import { doc, getDoc } from "firebase/firestore"; 
import { db } from "../firebase-config";



export class ResetPassword{


    constructor()
    {

    }


    async resetPasswordNow(accountID,profileID)
    {
        // 1. check if account is admin 
        const profileDocuRef = doc(db,"userData", profileID)
        const profile = await getDoc(profileDocuRef);

        const profileType = profile.data().type;
        console.log(profileType);
        if (!(profileType === "Admin"))
        {
            const resetPassword = httpsCallable(functions,'resetPassword');
            await resetPassword({uid:accountID});
            return true;
        }

        else{
            return false;
        }
    }
}
import { functions } from "../firebase-config";
import { httpsCallable } from "firebase/functions";
import { collection, addDoc} from "firebase/firestore"; 
import { db } from "../firebase-config";

export class AdminCreateAC{

    constructor()
    {

    }

    async createAccount(email,password,userName)
    {
        try{

            const createAccount = httpsCallable(functions,'createAccount');
            const result = await createAccount({email:email,password:password});
            // account created
            // take the UID and create user account in db section with phone number 
            await addDoc(collection(db, "allAccounts"), {
                UID: result.data,
                email: email,
                userName:userName,
                status:"active"
              });

              return true;
        }

        catch(err)
        {
            console.log(err);
        }
    }

}

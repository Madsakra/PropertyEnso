import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


export class CreateAccount{


    constructor()
    {

    }


    async createAccountInDB(email,password)
    {
        try{
            const auth = getAuth();
            const result =  await createUserWithEmailAndPassword(auth, email, password)
            console.log(result);
            if (result)
            {
                return true;
            }

        }
        catch(err)
        {
            console.log(err);
            
        }

    }





}
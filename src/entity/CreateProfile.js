import {addDoc,collection } from 'firebase/firestore';
import { db } from '../firebase-config';

export class CreateProfile{


    constructor()
    {

    }

    async createNewProfile(newEmail,newType,newUserName,uid)
    {
        const userDataCollection = collection(db, "userData");
        try{
            await addDoc(userDataCollection,{
                UID: uid,
                email:newEmail,
                type:newType,
                userName:newUserName,
                status:"active"
            })

            return true;
        }
        catch(error)
        {
            throw(error)
        }   
    }


}
import { getDocs,addDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import { collection } from 'firebase/firestore';


export class UserData{

    constructor()
    {

    };

    async retreiveData()
    {
        const userDataCollection = collection(db, "userData");
        return await getDocs(userDataCollection);
    }

    async sendData(newEmail,newType,newUserName)
    {
        const userDataCollection = collection(db, "userData");
        try{
            await addDoc(userDataCollection,{
                email:newEmail,
                type:newType,
                userName:newUserName
            })
        }
        catch(error)
        {
            throw(error)
        }   
        }
}
import {getDocs, collection, addDoc} from 'firebase/firestore';

import { db } from '../firebase-config';

export const userDataCollection = collection(db,"userData");



export const writeNewAccount = async (newEmail,newType,newUserName) =>{
    try{
        await addDoc(userDataCollection,{
            email:newEmail,
            type:newType,
            userName:newUserName
        })
    }
    catch(err)
    {
        console.log(err);
    }
};
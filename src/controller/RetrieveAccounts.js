import {getDocs, collection} from 'firebase/firestore';

import { db } from '../firebase-config';


export const userDataCollection = collection(db,"userData");

// GET FROM FIREBASE CODE 

export const getAllUserDetails = async(authUser, setUserProfileCreated, setUserName,setType) =>{
    try
    {

        const data = await getDocs(userDataCollection);
        const filteredData = data.docs.map((doc)=>({...doc.data()}));

        filteredData?.map((item)=>{
            if (item.email===authUser.email)
            {
                setUserProfileCreated(true);
                setUserName(item.userName);
                setType(item.type);
                return true;
            }
            return false;
        });

    }
    catch(err)
    {
        console.error(err);
    }
};
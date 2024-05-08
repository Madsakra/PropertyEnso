import { getDocs,collection } from 'firebase/firestore';
import { db } from '../firebase-config';



export class UserProfile{

    constructor()
    {

    };

    async retreiveData(userUID)
    {

        const userDataCollection = collection(db, "userProfile");
        const result = await getDocs(userDataCollection).then((result)=>{

            let myProfile = {};
            result.forEach((profile)=>{
                const profileInfo = profile.data();
                const profileID = profile.id;
                if (profileInfo.UID === userUID)
                {
                   myProfile = profileInfo
                   myProfile.profileID = profileID; 
                }
    
            })

            return myProfile;
        
        })
       



        return result;


    }


}
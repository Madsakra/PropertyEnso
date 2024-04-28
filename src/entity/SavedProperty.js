import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase-config';



export class SavedProperty{

    constructor()
    {

    }


    async fetchSavedProperty(authUser)
    {
        const querySnapshot = await getDocs(collection(db, "userData"));
        let result = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            if (authUser?.email === doc.data().email)
            {
     
                // check if user has any saved fields, then send back data
                if (doc.data().saved !==undefined)
                {
                    result = doc.data().saved;
                           
                }
                
            }
         
          });
          return result;
        }



}
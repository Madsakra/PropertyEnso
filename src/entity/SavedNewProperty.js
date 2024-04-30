import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase-config';



export class SavedNewProperty{

    constructor()
    {

    }


    async fetchNewSavedProperty(authUser)
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
                    let tempArray = doc.data().saved;
                    tempArray.forEach((property)=>{
                        if (property.status === "new")
                        {
                            result.push(property);
                        }
                    })
                }
                
            }
         
          });
          return result;
        }



}
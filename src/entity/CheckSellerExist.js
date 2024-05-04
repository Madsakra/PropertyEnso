import { getDocs,collection } from 'firebase/firestore';
import { db } from '../firebase-config';

export class CheckSellerExist{



    constructor()
    {

    }

    
    async doesSellerExist(email)
    {
            let result = false;

            const querySnapshot = await getDocs(collection(db, "userData"));
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                if (email === doc.data().email && doc.data().type === "Seller")
                {
         
                    result = {UID:doc.data().UID,
                              email:doc.data().email,
                              userName:doc.data().userName,
                              accountExist:true
                              }
                    return result;

                }
             
              });
              
              return result;
            
    }




}
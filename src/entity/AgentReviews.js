import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase-config';


export class AgentReviews{


        constructor()
        {

        }


        async getReviews(authUser)
        {

            try{

                const querySnapshot = await getDocs(collection(db, "userData"));
                let myReviews = [];
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    if (authUser?.uid === doc.data().UID)
                    {
                        myReviews = doc.data().reviews;                         
                    }
                 
                  });
                
                  return myReviews;
            }

            catch(err)
            {

                console.log(err);
            }

        }

}
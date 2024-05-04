import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase-config';


export class AgentRatings{


        constructor()
        {

        }


        async getRatings(authUser)
        {

            try{



                const querySnapshot = await getDocs(collection(db, "userData"));
                let myRatings = [];
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    if (authUser?.uid === doc.data().UID)
                    {
                        myRatings = doc.data().ratings;                         
                    }
                 
                  });
                
                  return myRatings;

            }

            catch(err)
            {

                console.log(err);
            }

        }

}
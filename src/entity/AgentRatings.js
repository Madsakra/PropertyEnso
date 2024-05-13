import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase-config';


export class AgentRatings{


        constructor()
        {

        }


        async getRatings(uid,currentProfileID)
        {

            try{



                const querySnapshot = await getDocs(collection(db, "Ratings"));
                let myRatings = [];
                querySnapshot.forEach((doc) => {
                    
                    const ratingsData = doc.data();
                    if (ratingsData.agentInformation.UID === uid && ratingsData.agentInformation.profileID === currentProfileID)
                    {
                        myRatings.push(ratingsData);
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
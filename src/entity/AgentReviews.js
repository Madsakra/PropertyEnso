import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase-config';


export class AgentReviews{


        constructor()
        {

        }


        async getReviews(uid,currentProfileID)
        {

            const querySnapshot = await getDocs(collection(db, "Reviews"));
            let myReviews = [];
            querySnapshot.forEach((doc) => {
                
                const reviewData = doc.data();
                if (reviewData.agentInformation.UID === uid && reviewData.agentInformation.profileID === currentProfileID)
                {
                    myReviews.push(reviewData);
                }
             
              });
            
              return myReviews;


        }
}
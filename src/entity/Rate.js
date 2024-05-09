import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase-config';



export class Rate{

    async pushRate(myPackage,targetAgent)
    {
        
        await addDoc(collection(db, "Ratings"), {
            agentProfile:targetAgent,
            ratingDetails:myPackage,
            
          });



       return true;
    }




}
import {collection,addDoc} from 'firebase/firestore';
import { db } from '../firebase-config';



export class Review{

    async pushReview(myPackage,targetAgent)
    {
        await addDoc(collection(db, "Reviews"), {
            agentProfile:targetAgent,
            reviewDetails:myPackage,
            
          });
       return true;
    }




}
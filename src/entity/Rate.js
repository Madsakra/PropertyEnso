import { getDocs, updateDoc, collection,doc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase-config';



export class Rate{

    async pushRate(myPackage,targetAgent)
    {
        let agentDocID = "";
      
        const querySnapshot = await getDocs(collection(db, "userData"));
      
        querySnapshot.forEach((doc) => {
            // filter for REA in db
       
                if (doc.data().email === targetAgent.email)
                {
                    agentDocID = doc.id;
                }
          });
          console.log(targetAgent.email);
          console.log(agentDocID);
        
        // PUSH INTO DB
       const currentUserRef = doc(db, "userData", agentDocID);
       await updateDoc(currentUserRef,{
        
         "ratings": arrayUnion(myPackage)
       })
       return true;
    }




}
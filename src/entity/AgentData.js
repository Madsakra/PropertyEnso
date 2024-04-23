import { getDocs,addDoc, updateDoc, collection,doc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase-config';



export class AgentData{


    constructor(){

    };


    async fetchAllAgent()
    {
        const querySnapshot = await getDocs(collection(db, "userData"));
        let savedData = [];
        querySnapshot.forEach((doc) => {
            // filter for REA in db
       
                if (doc.data().type === "Real Estate Agent")
                {
                    savedData.push(doc.data());
                }
               
            

          });

         return savedData;
          
    }


    async sendData(myPackage,targetAgent)
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
        
         "ratingsAndReviews": arrayUnion(myPackage)
       })
       return true;
    }



}
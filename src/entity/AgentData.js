import { getDocs, updateDoc, collection,doc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase-config';



export class AgentData{


    constructor(){

    };


    async fetchAllAgent()
    {
        const querySnapshot = await getDocs(collection(db, "userProfile"));
        const accountSnapShot = await getDocs(collection(db, "allAccounts"));
        // const ratingsSnap = await getDocs(collection(db, "Ratings"));
        let savedData = [];
        querySnapshot.forEach((doc) => {
            // filter for REA in profile
            // go through profile, pick up UID

                const profileUID = doc.data().UID;

                // IF AGENT IS REA, LOOP THROUGH ACCOUNTS AND RETRIEVE DETAILS
                if (doc.data().type === "Real Estate Agent")
                {
                    accountSnapShot.forEach((account)=>{
                        
                        const accountData = account.data();

                        if (accountData.UID===profileUID)
                        {
                            savedData.push(accountData);
                        }

                    })
                    
                }
               
            

          });

         return savedData;
          
    }





}
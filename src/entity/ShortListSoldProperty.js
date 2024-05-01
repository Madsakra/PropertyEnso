import { getDocs,updateDoc, collection,doc } from 'firebase/firestore';
import { db } from '../firebase-config';


export class ShortlistSoldProperty{


    constructor()
    {

    }

    



    
    async sendSoldProperty(shortListedData,authUser)
    {
        // get all data first,put in array   
        const querySnapshot = await getDocs(collection(db, "userData"));
        let docID = "";
        let savedData = [];
        querySnapshot.forEach((doc) => {
            // filter for user data in db
            if (authUser.email === doc.data().email)
            {
                docID = doc.id;
                if (doc.data().saved !==undefined)
                {
                    savedData = doc.data().saved;
                }
               
            }

          });

          
          function filterData(savedData,shortListedData)
          {
            let pushIn = true;
            if (savedData)
        
            savedData.forEach((savedProperty)=>{
            if (shortListedData.name === savedProperty.name)
            {
                pushIn = false;
                return pushIn;
            }})
           
            return pushIn;
          }



        // compare between the saved property and the shortlisted ones on page currently
        // if there are any difference, do not push out to filtered

        const filterShortlisted = filterData(savedData,shortListedData);


        if (filterShortlisted === true && Object.keys(shortListedData).length !==0)
        {
            savedData.push(shortListedData);
            const currentUserRef = doc(db, "userData", docID );
            await updateDoc(currentUserRef,{
              "saved":savedData
            })
            return true;
        }

        else{

            return false;
        
        }
    }




}
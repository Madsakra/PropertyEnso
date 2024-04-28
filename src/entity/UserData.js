import { getDocs,addDoc, updateDoc, collection,doc } from 'firebase/firestore';
import { db } from '../firebase-config';



export class UserData{

    constructor()
    {

    };

    async retreiveData()
    {
        const userDataCollection = collection(db, "userData");
        return await getDocs(userDataCollection);
    }

    async sendData(newEmail,newType,newUserName)
    {
        const userDataCollection = collection(db, "userData");
        try{
            await addDoc(userDataCollection,{
                email:newEmail,
                type:newType,
                userName:newUserName
            })
        }
        catch(error)
        {
            throw(error)
        }   
    }






    async fetchSavedProperty(authUser)
    {
        const querySnapshot = await getDocs(collection(db, "userData"));
        let result = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            if (authUser?.email === doc.data().email)
            {
     
                // check if user has any saved fields, then send back data
                if (doc.data().saved !==undefined)
                {
                    result = doc.data().saved;
                           
                }
                
            }
         
          });
          return result;
        }
    
    async removeSelectedSave(authUser,id)
    {
       let docID = ""
       let oldSaved = [];

        // fetch saved data with targeted docu id
        const querySnapshot = await getDocs(collection(db, "userData"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            if (authUser?.email === doc.data().email)
            {
                docID = doc.id;
                // check if user has any saved fields, then send back data
                if (doc.data().saved !==undefined)
                {
                    oldSaved = doc.data().saved;
                           
                }
                
            }
         
          });

        // FILTER OUT THE INDEX AND PUSH THE REST INTO A NEW ARRAY
       let newSaved = [];
       for (let i=0;i<oldSaved.length;i++)
       {
            if (i !== id)
            {
                newSaved.push(oldSaved[i]);
            }
       }

       // PUSH INTO DB
       const currentUserRef = doc(db, "userData", docID );
            await updateDoc(currentUserRef,{
              "saved": newSaved
            })
    
           return true; 
            
        }

}
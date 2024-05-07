import { functions } from "../firebase-config";
import { httpsCallable } from "firebase/functions";
import { collection, doc, setDoc,getDocs,addDoc} from "firebase/firestore"; 
import { db } from "../firebase-config";



export class ViewAccounts{


    constructor()
    {

    }





    async fetchAllAccounts(startingVal,endingVal)
    {
        let myresult = [];
        let filteredData = [];
        const allAccountsCollection = collection(db, "allAccounts");
        const allDocuments = await getDocs(allAccountsCollection);

        allDocuments.forEach((doc)=>{
            const data = doc.data();
                myresult.push(data);
            
        })



        for (let i=startingVal;i<endingVal;i++)
        {
                filteredData.push(myresult[i]);
        }

        return filteredData;
    }








}
    




// let myresult = []
// const viewAccounts = httpsCallable(functions,'viewAccounts');


// const result = await viewAccounts();
// const allUsersArray = result.data.users;
// for (let i=startingVal;i<endingVal;i++)
// {
//     myresult.push(allUsersArray[i]);
// }


// return myresult;








//     async WriteData(myArray)
//     {

//         const querySnapshot = await getDocs(collection(db, "userData"));
//         let result = [];
//         querySnapshot.forEach((doc) => {
//             const docu = doc.data();
//             docu.profileID = doc.id;
//             result.push(docu);
            
//           });


//         const secondSnapShot = await getDocs(collection(db,"userAccounts"));
//         let secondresult = [];
//         secondSnapShot.forEach((doc) => {
//             const docu = doc.data();
//             secondresult.push(docu);
            
//           });


//         result.forEach((profile)=>{
//             const UID = profile.UID;
//             const profileID = profile.profileID

//             secondresult.forEach((acc)=>{
//                 if (acc.UID === UID)
//                 {
//                     acc.profileID = profileID;
//                 }
//             })

//         })
        

//         secondresult.forEach(async (item)=>{
//             await addDoc(collection(db, "allAccounts"), {
//                 UID: item.UID,
//                 profileID: item.profileID,
//                 email: item.email,
//                 phoneNumber: item.phoneNumber
//               });
//            })

// }
// }




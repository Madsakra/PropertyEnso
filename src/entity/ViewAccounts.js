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
            data.accountRef = doc.id;
                myresult.push(data);
            
        })



        for (let i=startingVal;i<endingVal;i++)
        {
                filteredData.push(myresult[i]);
        }

        return filteredData;
    }








}
    













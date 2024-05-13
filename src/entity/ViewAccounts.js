
import { collection, getDocs} from "firebase/firestore"; 
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

        // GET ALL DATA BACK
        allDocuments.forEach((doc)=>{
            const data = doc.data();
            data.accountRef = doc.id;
                myresult.push(data);
            
        })


        // FILTER THEM SO WE DON'T BRING ALL BACK
        for (let i=startingVal;i<endingVal;i++)
        {
                filteredData.push(myresult[i]);
        }

        return filteredData;
    }

}
    













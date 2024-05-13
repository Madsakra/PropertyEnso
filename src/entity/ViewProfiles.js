
import { collection, getDocs} from "firebase/firestore"; 
import { db } from "../firebase-config";



export class ViewProfiles{


    constructor()
    {

    }

    async fetchAllProfiles(startingVal,endingVal)
    {
        let myresult = [];
        let filteredData = [];
        const allProfileCollection = collection(db, "userProfile");
        const allDocuments = await getDocs(allProfileCollection);


        // GET ALL DOCS BACK FIRST
        allDocuments.forEach((doc)=>{
            const data = doc.data();
            data.profileID = doc.id;
                myresult.push(data);
        })


        // for pagination, so only take half of the data
        for (let i=startingVal;i<endingVal;i++)
        {
                filteredData.push(myresult[i]);
        }  

      

        return filteredData;
    }

}
    




import { db } from '../firebase-config';
import { collection } from 'firebase/firestore';
import { getDocs } from 'firebase/firestore';







export class AgentSearch{

    constructor()
    {

    }


    async findSearchProperty(searchInput)
    {
        let mySaved = [];
        const listingDataCollection = collection(db, "propertyData");
        const data = await getDocs(listingDataCollection);
        try{

            data.docs.map((doc)=>{
                const allIndividualProps = doc.data().indiProps;
                const street = doc.data().street;
                const project = doc.data().project;
                allIndividualProps.forEach((property)=>{
                    let propertyName = property.name.toLowerCase();
                    // might need to include sold/new property due to scaling issue
                    if (propertyName.startsWith(searchInput))
                    {
                       property.address = street;
                       property.project = project;
                       mySaved.push(property);
                    }
                })
            })
        
            return mySaved;

        }
        catch(err)
        {
            console.log(err);
        }


    }





}



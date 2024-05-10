import { db } from '../firebase-config';
import { collection } from 'firebase/firestore';
import { getDocs } from 'firebase/firestore';







export class AgentSearch{

    constructor()
    {

    }


    async findSearchProperty(searchInput,docStart)
    {
        let mySaved = [];
        const listingDataCollection = collection(db, "propertyData");
        const data = await getDocs(listingDataCollection);
     
        

 
        

        try{
               
                const snapshotCopy = data.docs;

                let stoppedDocRecord = docStart;

                if (stoppedDocRecord <snapshotCopy.length)
                {

                    // gather all the property from 1 document, but leave the other 3 so we don't overload                
                    const doc = snapshotCopy[stoppedDocRecord];
                    const allIndividualProps = doc.data().indiProps;
                    const street = doc.data().street;
                    const project = doc.data().project;
                            
                    allIndividualProps.forEach((property)=>{

                        let propertyName = property.name.toLowerCase();
                        property.address = street;
                        property.project = project;
                        
                        if (propertyName.startsWith(searchInput))
                        {
                            mySaved.push(property);
                        }

                    })

                    stoppedDocRecord +=1;
                }

                else{
                    return false;
                }
                
       

            const myPackage ={
                mySaved:mySaved,
                stoppedDocIndex:stoppedDocRecord,
            }

            return myPackage;

        }
        catch(err)
        {
            console.log(err);
        }


    }





}


// const snapshotCopy = data.docs;

// let docStartCopy = docStart;
// let propStartCopy = propStart;

//     for (let i=docStartCopy;i<snapshotCopy.length;i++)
//     {
//         const doc = snapshotCopy[i];
//         const allIndividualProps = doc.data().indiProps;
//         const street = doc.data().street;
//         const project = doc.data().project;
        


//         if (mySaved.length===5)
//         {
//             stoppedDocIndex = i;
//             break;
//         }



//         for (let j=propStartCopy;j<allIndividualProps.length;j++)
//         {
//             const property = allIndividualProps[j];
//             let propertyName = property.name.toLowerCase();
//             property.address = street;
//             property.project = project;
            

//             if (mySaved.length===5)
//             {
//                 stoppedPropIndex = j;
//                 break;
//             }

//             if (propertyName.startsWith(searchInput))
//             {
//                 mySaved.push(property);
//             }
            
//         }
//     }
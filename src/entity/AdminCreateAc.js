import { functions } from "../firebase-config";
import { httpsCallable } from "firebase/functions";
import { collection, addDoc,getDocs, updateDoc,doc} from "firebase/firestore"; 
import { db } from "../firebase-config";

export class AdminCreateAC{

    constructor()
    {

    }

    async createAccount(email,password,phoneNumber)
    {
        try{

            const createAccount = httpsCallable(functions,'createAccount');
            const result = await createAccount({email:email,password:password});
            // account created
            // take the UID and create user account in db section with phone number 
            await addDoc(collection(db, "allAccounts"), {
                UID: result.data,
                email: email,
                phoneNumber:phoneNumber,
              });

              return true;
        }

        catch(err)
        {
            console.log(err);
        }
    }

    //TO BE DELETED ONCE DONE
    async makeChanges()
    {
        try{
            let myResults = [];
            const userDataCollection = collection(db, "userData");
            const userData = await getDocs(userDataCollection);
            // const profileRef = collection(db, "userProfile");
           

            const allAccounts = collection(db,"allAccounts")
            const getAccounts = await getDocs(allAccounts);

            // const getProfile = await getDocs(profileRef);
            

            userData.forEach(async(user)=>{
                const currentUser = user.data();
                const userUID = currentUser.UID;
                const userProfile = currentUser.profileID;

                if (currentUser.saved!==undefined && userProfile!==undefined)
                {

                  currentUser.saved.forEach(async (savedItem)=>{

                    await addDoc(collection(db,"BuyerSavedListings"),{
                        buyerUID: userUID,
                        buyerProfileID: userProfile,
                        savedListing:savedItem
                   })


                  })


                }


            })
            






            // getAccounts.forEach(async(snapshot)=>{
            //     const currentAccount = snapshot.data();
            //     const UID = currentAccount.UID;
                // const AccountDocuID = snapshot.id;

                // const accountDocRef = doc(db,"allAccounts",AccountDocuID)

            //     getProfile.forEach(async (snap)=>{
            //         const currentProfile = snap.data();
            //         const profileID = snap.id;
            //         const insideUID = currentProfile.UID;

            //         if (insideUID === UID)
            //         {
            //            await updateDoc(accountDocRef,{
            //             status:"active",
            //             profileID:profileID,
            //            })
            //         }

            //     })

            // })


            // result.forEach(async (snap)=>{
            //     const currentData = snap.data();
            //     let description="";     


         
            //     await addDoc(profileRef,{
            //         UID: currentData.UID,
            //         type:currentData.type,
            //         description:description
                
            //     })



            // })
        }

        catch(err)
        {
            console.log(err);
        }
    }

}



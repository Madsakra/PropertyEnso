
import {auth} from '../firebase-config';
import {signInWithEmailAndPassword} from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc,getDocs, updateDoc,doc} from "firebase/firestore"; 
import { db } from "../firebase-config";

export class Authenticator{


    constructor()
    {

    };

    // INSIDE OF NORMAL SIGN IN





    // SIGN IN NORMALLY, FROM FIREBASE SDK
    // Fails with an error if the email address and password do not match. 
    // When Email Enumeration Protection is enabled, this method fails with "auth/invalid-credential" in case of an invalid email/password.
    async normalSignIn(email,password)
    {
        function listener()
        {
            return new Promise((resolve,reject)=>{
                onAuthStateChanged(auth,(user)=>{
                    if (user)
                    {
                        resolve(user);
                    }
                    else{
                        reject("User not logged in");
                    }
                })
            })
        }


    

        try{
            
            await signInWithEmailAndPassword(auth,email,password);
            const myPromise = listener()

  

 

            const result = await myPromise.then(async (result)=>{
                const authUID = result.uid;
                const allAccounts = collection(db, "allAccounts");
                const querySnapshot = await getDocs(allAccounts);
                let toShow = false;
                let userAccount = {};

                querySnapshot.forEach((doc) => {
                    const account = doc.data();
                    if (account.UID === authUID && account.status === "active") {
                        toShow = true;
                        userAccount = account;
                        
                    }
                });

                // RETURN 3 THINGS - 1. USER STATUS (WHETHER SUSPENDED OR NOT)
                                //   2. USER ACCOUNT DETAILS
                                //   3. USER CREDENTIALS (AUTH DETAILS)

                return {
                    toShow: toShow,
                    userAccount: userAccount,
                    userCred: result,
                };
            })

            return result;

        }
        catch(error)
        {
            throw(error);
            
        }
      
    };



}
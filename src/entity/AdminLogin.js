import {auth,googleProvider} from '../firebase-config';
import { signInWithPopup } from 'firebase/auth';
import { collection, getDocs} from "firebase/firestore"; 
import { db } from "../firebase-config";
import { onAuthStateChanged } from 'firebase/auth';

export class AdminLogin{

    constructor()
    {

    };


    async googleSignIn()
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
            
            await signInWithPopup(auth,googleProvider);
            const myPromise = listener();

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

                return {
                    toShow: toShow,
                    userCred: result,
                    userAccount:userAccount
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
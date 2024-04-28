import {auth,googleProvider} from '../firebase-config';
import { signInWithPopup } from 'firebase/auth';


import { onAuthStateChanged } from 'firebase/auth';

export class AdminLogin{

    constructor()
    {

    };


    listener()
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

    async googleSignIn()
    {
        try{
            
            await signInWithPopup(auth,googleProvider);
            const myPromise = this.listener();
            const result = {toShow:true,
                            userCred:myPromise};
            return result;
        }
        catch(error)
        {
            throw(error);
        }

        
    };



}
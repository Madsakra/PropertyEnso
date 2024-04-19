
import {auth,googleProvider} from '../firebase-config';
import { signInWithPopup } from 'firebase/auth';
import {signInWithEmailAndPassword, createUserWithEmailAndPassword,
         signOut} from 'firebase/auth';

import { onAuthStateChanged } from 'firebase/auth';

export class Authenticator{


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


    // SIGN IN NORMALLY, FROM FIREBASE SDK
    // Fails with an error if the email address and password do not match. 
    // When Email Enumeration Protection is enabled, this method fails with "auth/invalid-credential" in case of an invalid email/password.
    async normalSignIn(email,password)
    {
        try{
            await signInWithEmailAndPassword(auth,email,password);
            const myPromise = this.listener()
            const result = {toShow:true,
                            userCred:myPromise};
            return result;
        }
        catch(error)
        {
            throw(error);
            
        }
      
    };

    // don't count in uml
    // shift to admin
    async createUser(email,password)
    {
        try{
           await createUserWithEmailAndPassword(auth,email,password);
           return true;
        }
        catch(error)
        {
            throw(error);
        }
    };

    async logOff()
    {
        try{
            await signOut(auth);
            return true;
        }
        catch(error)
        {
            throw (error);
        }
    }

}
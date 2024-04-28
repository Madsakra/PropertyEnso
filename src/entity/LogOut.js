
import {signOut} from 'firebase/auth';
import { auth } from '../firebase-config';


export class LogOut{

    LogOut()
    {
        
    }

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
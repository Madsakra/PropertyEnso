import { useEffect, useContext} from 'react';
import { auth } from '../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import {Context} from '../App'



// controller
// LISTEN FOR AUTH USER 


const AuthDetails = ()=>{

    const {authUser,setAuthUser,userProfileCreated,setCreateUserTrigger} = useContext(Context);
    // GET EXISTING USER DETAILS FROM DATA BASE
    // NOT AUTHENTICATION DATA
    
  




    useEffect(()=>{
   
        const listen = onAuthStateChanged(auth,(user)=>{
   
            if (user)
            {
                setAuthUser(user);

            }

            else{
                setAuthUser(null);
                console.log(authUser);
            }
        });

        return (()=>listen());

    },[]);

    

    

    return (
    <>
    </>
    )
}

export default AuthDetails;
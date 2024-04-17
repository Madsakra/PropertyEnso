import { useEffect, useContext} from 'react';
import { auth } from '../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import {Context} from '../App'



// controller
// LISTEN FOR AUTH USER 


const AuthListener= ()=>{

    // const {authUser,setAuthUser} = useContext(Context);
    // useEffect(()=>{
   
    //     const listen = onAuthStateChanged(auth,(user)=>{
            
    //         if (user)
    //         {
               
    //             setAuthUser(user);

    //         }

    //         else{
    //             setAuthUser(null);
    //             console.log(authUser);
    //         }
    //     });

    //     return (()=>listen());

    // },[]);

    return (
    <>
    </>
    )
}

export default AuthListener;
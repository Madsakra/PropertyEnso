
import logo from '../svg/mainLogo.svg';
import { React,useContext, useState} from 'react';
import { Context } from '../App';
import { UserAuthenticator } from '../controller/UserAuthenticator';

import google from '../svg/google.svg'

const Register = () =>{
    
    const {setOpenLogin,setOpenRegister,userProfileCreated,setCreateUserTrigger, 
        email,password,setFacedError,setAuthUser,
        setEmail,setPassword,facedError,
        setLoading} = useContext(Context);

    
   
 
   
    // sign in with google
    const signInWithGoogle = async () =>{
        try{
            const userAuth = new UserAuthenticator();
            const signInSuccess = await userAuth.signInWithGoogleMeth();
            if (signInSuccess)
            {
                alert("login successful");
                setOpenLogin(false);
                // in case user sign in via register page
                setOpenRegister(false);
                if (!userProfileCreated)
                {
                    setCreateUserTrigger(true);
                }
            }
        }
        catch(err)
        {
            setFacedError(true);
        }
       
    }


    const signUp = async (e)=>{
        e.preventDefault();
        try{
            const userAuth = new UserAuthenticator();
            const createSuccess = await userAuth.createNewUser(email,password);
            if (createSuccess)
            {
                setOpenRegister(false);
                setFacedError(false);
                alert("Registration Successful");
                setLoading(true);
                setTimeout(()=>{
                    
                    userAuth.customSignOut();
                    setCreateUserTrigger(false);
                    setAuthUser(null);
                    setEmail("");
                    setPassword("");
                    setOpenLogin(true);
                    setLoading(false);
                },1300);
          
            }
            
            }
            catch(err)
            {
                setFacedError(true);
            }

    };
    



    return (

        <div className='text-center login-form '>
       
        <form onSubmit={signUp}>
            <img src={logo} height='100vh' alt="img"></img>
            <h1 class="h3 mb-3 fw-bolder">Create Your Account</h1>
            <p className='lead'>Please Enter Your Credentials Below To Sign up</p>

                {/* input fields */}
                <input type="email" class="form-control" placeholder='Enter Your Email' 
                value={email}
                onChange={(e)=>setEmail(e.target.value)}>
                </input>

                <input type="password" class="form-control" placeholder='Enter Your Password' 
                value={password}
                onChange={(e)=>setPassword(e.target.value)}>
                </input>
            
            
                {facedError && <p class="errorMessage">Either the account exists or you did not meet the password requirements,
                                                        please try again
                                                        You need at least 10 characters for password</p>}
            

                {/* buttons */}
                <div className='d-flex flex-row justify-content-center mt-5'>
                <span class=" btn btn-lg buttonColor btn-outline-light me-3" 
                onClick={()=> {setOpenRegister(false);
                                setFacedError(false);}}>Cancel</span>

                <button class=" btn btn-lg buttonColor btn-outline-light" 
                type="submit">Sign Up</button>
                </div>
                

                
                <button class=" btn btn-lg buttonColor btn-outline-light mt-3" 
                        type="button" onClick={signInWithGoogle} >
                            <img src={google} class="google" height='20vh' alt="img"></img>
                            Sign In With Google
                            </button>

        
                <p class="mt-5 mb-3 lead">© PropertyEnso 2024</p>


            
        </form>            

       
    </div>
       
    )
}

export default Register;
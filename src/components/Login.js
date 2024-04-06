import React, { useState } from 'react';
import logo from '../svg/mainLogo.svg';
import google from '../svg/google.svg';
import { useContext } from 'react';
import { Context } from '../App';





const Login = () =>{

    
    const {setOpenLogin,signIn,facedError,signInWithGoogle,
           email,password,setEmail, setPassword} = useContext(Context);

  
   
   



    return (
       

            <div className='text-center login-form'>
                <form onSubmit={signIn}>
                    <img src={logo} height='100vh' alt="img"></img>
                    <h1 class="h3 mb-3 fw-bolder">Welcome Back!</h1>
                    <p className='lead '>Please Enter Your Credentials Below To Login</p>

                       {facedError && <p class="errorMessage">Please Enter the Correct Email/Password</p>}

                        <input type="email" class="form-control" placeholder='Enter Your Email' 
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}>
                        </input>

                        <input type="password" class="form-control" placeholder='Enter Your Password' 
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}>
                        </input>
                    
                        <div className='d-flex flex-row justify-content-center mt-5'>
                        <span class=" btn btn-lg buttonColor btn-outline-light me-3" 
                        onClick={()=> setOpenLogin(false)}>Cancel</span>

                        <button class=" btn btn-lg buttonColor btn-outline-light" 
                        type="submit">Sign In</button>
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

export default Login;


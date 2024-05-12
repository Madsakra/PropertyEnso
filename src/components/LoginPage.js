import React from 'react';
import logo from '../svg/mainLogo.svg';
import google from '../svg/google.svg';
import { useContext } from 'react';
import { Context } from '../App';
import { UserAuthenticator } from '../controller/UserAuthenticator';
import { AdminLoginController} from '../controller/AdminLoginController';
import Form from 'react-bootstrap/Form';


const LoginPage = () =>{

    
    const {setOpenLogin, setUserName, setAccountDetails, profileID,
        email,password,setFacedError,setAuthUser,
        setEmail,setPassword,facedError} = useContext(Context);

   
   
    // ADMIN sign in with google
    const signInWithGoogle = async () =>{
       
        try{
      
            const userAuth = new AdminLoginController();
            const signInSuccess = await userAuth.signInWithGoogleMeth();
            
            if (signInSuccess.toShow === true)
                {

                    const result = signInSuccess.userCred;
                    setAuthUser(result);
                    setAccountDetails(signInSuccess.userAccount);
                    setUserName(signInSuccess.userAccount.userName);
                    profileID.current = signInSuccess.userAccount.profileID

                    // TDD TEST CASE RESULT
                    console.log("Login successful - UserName: "+signInSuccess.userAccount.userName+ " Account ID (UID): " + 
                    signInSuccess.userAccount.UID +" Role:Admin")

                    alert("login successful");
                    setFacedError(false);
                    setOpenLogin(false);
                }
        
                else{
                    alert("account suspended, please contact admin!")
                    setAuthUser(null);
                    setFacedError(false);
                }
        }
        catch(err)
        {
            setFacedError(true);
        }
       
    }



    // sign in with email
    const signIn = async (event)=> {
    try{
        event.preventDefault();
        
        const userAuth = new UserAuthenticator();

        // TDD TEST CASE 
        // BUYER
        const signInSuccess = await userAuth.signInNormal(email,password);
     
        
        if (signInSuccess.toShow === true)
        {
           const result = signInSuccess.userCred;
            setAuthUser(result);
            setAccountDetails(signInSuccess.userAccount);
            setUserName(signInSuccess.userAccount.userName);
            
            // TDD TEST RESULT:
            console.log("Login successful - UserName: "+signInSuccess.userAccount.userName+ " Account ID (UID): " + 
            signInSuccess.userAccount.UID +" ROLE: Buyer")

            alert("login successful");
            setFacedError(false);
            setOpenLogin(false);

        }


        else{
      
            alert("account suspended, please contact admin!")
            setAuthUser(null);
            setFacedError(false);
        }


        
    }
    catch(err)
    {
        setFacedError(true);
    }
    };


    return (
       

            <div className='text-center login-form'>
                <form onSubmit={signIn}>
                    <img src={logo} height='100vh' alt="img"></img>
                    <h1 class="h3 mb-3 fw-bolder">Welcome Back!</h1>
                    <p className='lead '>Please Enter Your Credentials Below To Login</p>

                       {facedError && <p class="errorMessage">Please Enter the Correct Email/Password</p>}

                       <Form.Control size="lg" type="email" onChange={e=>setEmail(e.target.value)} placeholder="Email" />

                       <Form.Control size="lg" type="password" onChange={e=>setPassword(e.target.value)} placeholder="Password" />
                    
                        <div className='d-flex flex-row justify-content-center mt-5'>
                        <span class=" btn btn-lg buttonColor btn-outline-light me-3" 
                        onClick={()=> {setOpenLogin(false);
                                        setFacedError(false)}}>Cancel</span>

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

export default LoginPage;


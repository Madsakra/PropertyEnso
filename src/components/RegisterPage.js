
import logo from '../svg/mainLogo.svg';
import { React,useContext, useState} from 'react';
import { Context } from '../App';
import Form from 'react-bootstrap/Form';
import { CreateAccountController } from '../controller/CreateAccountController';


const RegisterPage = () =>{
    
    const {setOpenLogin,setOpenRegister,setCreateUserTrigger, 
        setFacedError,setAuthUser,
        setEmail,setPassword,facedError, userAuth,
        setLoading} = useContext(Context);

    
   
    const [emailInput,setEmailInput] = useState("");
    const [passwordInput,setPasswordInput] = useState("");



    async function signUp()
    {
        setLoading(true);
        try{
            const createControl = new CreateAccountController()
            const createResult = await createControl.pushCreation(emailInput,passwordInput);
        
            if (createResult)
            {
                setOpenRegister(false);
                setFacedError(false);
                alert("Registration Successful");
                setLoading(true);
                setTimeout(()=>{
                    
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
                console.log(err);
                setFacedError(true);
            }

    };
    



    return (

        <div className='text-center login-form '>
       
        <form>
            <img src={logo} height='100vh' alt="img"></img>
            <h1 class="h3 mb-3 fw-bolder">Create Your Account</h1>
            <p className='lead'>Please Enter Your Credentials Below To Sign up</p>

                {/* input fields */}

                <Form.Control size="lg" type="email" onChange={e=>setEmailInput(e.target.value)} placeholder="Email" />
                <Form.Control size="lg" type="password" onChange={e=>setPasswordInput(e.target.value)} placeholder="Password" />

            
            
                {facedError && <p class="errorMessage">Either the account exists or you did not meet the password requirements,
                                                        please try again
                                                        You need at least 10 characters for password</p>}
            

                {/* buttons */}
                <div className='d-flex flex-row justify-content-center mt-5'>
                <span class=" btn btn-lg buttonColor btn-outline-light me-3" 
                onClick={()=> {setOpenRegister(false);
                                setFacedError(false);}}>Cancel</span>

                <button class=" btn btn-lg buttonColor btn-outline-light" 
                type="button" onClick={signUp}>Sign Up</button>
                </div>
                


        
                <p class="mt-5 mb-3 lead">© PropertyEnso 2024</p>


            
        </form>            

       
    </div>
       
    )
}

export default RegisterPage;
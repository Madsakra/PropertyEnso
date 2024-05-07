import { useState } from "react";
import Form from 'react-bootstrap/Form';
import { AdminCreateAcController } from "../controller/AdminCreateAcController";


const AdminCreateAccPage = ()=>{

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [phoneNumber,setPhoneNumber] = useState("");

    const [emailError,setEmailError] = useState(false);
    const [passwordError,setPasswordError] = useState(false);
    const [phoneError,setPhoneError] = useState(false);



    async function createAccount()
    {
        if (!/\S+@\S+\.\S+/.test(email))
        {
            setEmailError(true);
        }

        else if (!(password.length >=10))
        {
            setPasswordError(true);
        }

        else if (phoneNumber==="")
        {
            setPhoneError(true);
        }

        else{
            const myCreatorControl = new AdminCreateAcController();
            const result = await myCreatorControl.pushCreate(email,password,phoneNumber);
            if (result)
            {
               alert("Account Created!");
            }
        }
    }



    return (
        <>

        <div class="p-5 mb-4 admin-create-head bg-body-tertiary rounded-3">
          <div class="container-fluid py-5  text-center">
          <h1 class="display-4 fw-bold">Create Account</h1>
          <p class="fs-4">Enter the UserName And Password Of The New User</p>
          </div>
        </div>



        <div className="create-form">

            <div className="container">
                <h1 className="display-4">Verify Your Identity</h1>
                <h4>Please Verify Your Identity With Your Account</h4>
                
                <Form.Control size="lg" type="email" onChange={e=>setEmail(e.target.value)} placeholder="Email" />
                {emailError && <p className="text-danger">Please Enter An Email To Create Account</p>}

                <Form.Control size="lg" type="password" onChange={e=>setPassword(e.target.value)} placeholder="Password" />
                {passwordError && <p className="text-danger">Please Enter A Password</p>}

                <Form.Control size="lg" type="number" onChange={e=>setPhoneNumber(e.target.value)} placeholder="Phone Number" />
                {phoneError && <p className="text-danger">Please Enter Your Phone Number</p>}

                <button className="btn btn-light w-100 btn-lg mt-3" onClick={createAccount}>Create User</button>  
           
            </div>
            
    
        </div>






        </>

    )


}


export default AdminCreateAccPage;
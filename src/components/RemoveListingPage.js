import { useState } from "react";
import Form from 'react-bootstrap/Form';
import { RemoveListingController } from "../controller/RemoveListingController";


const RemoveListingPage = (props)=>{

    const currentProperty = props.property;

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [emailError,setEmailError] = useState(false);
    const [passwordError,setPasswordError] = useState(false);



    async function removeProperty()
    {

        
        if ((window.confirm("Are You Sure You Want To Remove this property"))===true)
        {
            // CHECK IF FIELDS IS NOT EMPTY
            if (email!=="" && password!=="")
            {
                const removeControl = new RemoveListingController();
                const result = await removeControl.pushForRemove(email,password,currentProperty);

                

                if (!result)
                {
                    alert("Wrong Email/Password...please try again")
                }

                else if (result===true)
                {
                    alert("Property Removed Successfully, Going Back...")
                    props.fetchNewProperties();
                }
            }



            else{
                
                // PUSH ERROR IF FIELDS ARE EMPTY
                if (email === "")
                {
                    setEmailError(true);
                }

                else if (password ==="")
                {
                    setPasswordError(true);
                }

            
            }

        }
    }


    return (
        <>  
        <div className="update-prop-page">
            <div className="container">
                <h1 className="display-4">Verify Your Identity</h1>
                <h4>Please Verify Your Identity With Your Account</h4>
                
                <Form.Control size="lg" type="email" onChange={e=>setEmail(e.target.value)} placeholder="Email" />
                {emailError && <p className="text-danger">Please Enter Your Email to verify!</p>}

                <Form.Control size="lg" type="password" onChange={e=>setPassword(e.target.value)} placeholder="Password" />
                {passwordError && <p className="text-danger">Please Enter Your Password</p>}

                <div className='d-flex flex-row p-4'>
                <button className="btn btn-dark me-2 w-50" onClick={()=>props.setRemoveListingPage(false)}>Close</button>
                <button className="btn btn-warning ms-2 w-50" onClick={()=>removeProperty()}>Remove Property</button>  
                </div>    
            </div>
            
    
        </div>
        </>
    )




}


    
export default RemoveListingPage;
import { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import ReactLoading from "react-loading";
import { AdminCreateProfileController } from "../controller/AdminCreateProfileController";

const AdminCreateProfilePage = ()=>{

    const [email,setEmail] = useState("");
    const [description,setDescription] = useState("");
    const [role,setRole] = useState("Buyer");
  

    const [emailError,setEmailError] = useState(false);
    const [descriptionError,setDescriptionError] = useState(false);
    const [loading,setLoading] = useState(false);


    async function createProfile()
    {
        if (!/\S+@\S+\.\S+/.test(email))
        {
            setEmailError(true);
        }

        else if (description === "")
        {
            setDescriptionError(true);
        }


        else{
            const createProfileController = new AdminCreateProfileController();
            const result = await createProfileController.pushCreateProfile(email,role,description);
            if (result===true)
            {
                alert("User Profile has been created!")
            }

            else{
                alert("Either that profile is already created, or the email does not have an account!")
            }
        }
    }



    return (
        <>

    
        <div>
        <div class="p-5 mb-4 profile-create-head bg-body-tertiary rounded-3">
          <div class="container-fluid py-5  text-center">
          <h1 class="display-4 fw-bold">Create Profile</h1>
          <p class="fs-4">Enter the Email And User Role</p>
          </div>
        </div>


 

        {!loading && 
        <div className="create-profile-form">

            <div className="container">
                <h1 className="display-3">Verify Your Identity</h1>
                <p className="fs-4">Email of User Account:</p>
                
                <Form.Control size="lg" type="email" onChange={e=>setEmail(e.target.value)} placeholder="Email" />
                {emailError && <p className="text-danger">Please Enter An Email To Create Account</p>}

                <p className="mt-4 mb-2 fs-4">Role of the User:</p>
                <Form.Select aria-label="Default select example" className="mb-3" onChange={e=>setRole(e.target.value)}>
                    <option value="Buyer">Buyer</option>
                    <option value="Seller">Seller</option>
                    <option value="Real Estate Agent">Real Estate Agent</option>
                    <option value="Admin">Admin</option>
                </Form.Select>

                <p className="fs-4">Description of profile:</p>
                <Form.Control size="lg" type="text" onChange={e=>setDescription(e.target.value)} placeholder="Description" />
                {descriptionError && <p className="text-danger">Please Enter A Description To Create Account</p>}



                <button className="btn btn-light w-100 btn-lg mt-3" onClick={createProfile}>Create User</button>     
            </div>
        </div>
        }
        
        {loading &&  
      <div className='d-flex align-items-center justify-content-center m-5 p-5'>
        <h1 className='display-1'>Creating Account...Hang On</h1>
        <ReactLoading type={"bars"} className='ms-3'  color={"black"} />  
      </div>
       }




        </div>






        </>

    )


}


export default AdminCreateProfilePage;
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from "react";
import { UpdatePropertyStatusController } from '../controller/UpdatePropertyStatusController';


const UpdatePropertyStatusPage = (props)=>{

   
    const currentProperty = props.property;

    const [propertyStatus,setPropertyStatus] = useState("new")


    async function updateStatus()
    {   
 
        const updateController = new UpdatePropertyStatusController();
        const result = await updateController.pushUpdates(currentProperty,propertyStatus);
        if (result)
        {
            alert("Property Status Updated!")
            props.setUpdateStatusPage(false);
            props.fetchNewProperties();
        }
        
    }

 



return (
    <>  
    <div className="update-prop-page">
        <div className="container">
            <h1 className="display-4">Update Property Listing</h1>
            <h1>Property Name : {currentProperty.name}</h1>
            <Form.Group className="mb-3" onChange={e=>setPropertyStatus(e.target.value)}>
                <Form.Label>Status</Form.Label>
                <Form.Select>
                <option>new</option>
                <option>sold</option>
                </Form.Select>
            </Form.Group>
            <div className='d-flex flex-row p-4'>
            <button className="btn btn-dark me-2 w-50" onClick={()=>props.setUpdateStatusPage(false)}>Close</button>
            <button className="btn btn-warning ms-2 w-50" onClick={updateStatus}>Update</button>  
            </div>    
        </div>
        

    </div>
    </>
)
}



export default UpdatePropertyStatusPage;
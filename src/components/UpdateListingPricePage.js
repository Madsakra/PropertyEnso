import { useState } from "react";
import Form from 'react-bootstrap/Form';
import {UpdatePropertyPriceController} from '../controller/UpdatePropertyPriceController'

const UpdateListingPricePage = (props)=>{

    const currentProperty = props.property;
    const [newPrice,setNewPrice] = useState("");
    const [error,setError] = useState(false);

    async function updatePrice()
    {
        console.log(newPrice);
        if (newPrice === "")
        {
            setError(true);
        }

        else{
            const updateController = new UpdatePropertyPriceController();
            const result = await updateController.pushUpdates(currentProperty,newPrice);
            if (result)
            {
                alert("Property Price Updated!")
                props.setUpdatePricePage(false);
                props.fetchNewProperties();
            }



        }
    }


    return (
        <>  
        <div className="update-prop-page">
            <div className="container">
                <h1 className="display-4">Update Property Listing</h1>
                <h1>Property Name : {currentProperty.name}</h1>
                <h4>Please Enter The New Price For The Property</h4>
                <Form.Control size="lg" type="number" onChange={e=>setNewPrice(e.target.value)} placeholder="New Price" />
                {error && <p className="text-danger">Please Enter An Amount To Update!</p>}
                <div className='d-flex flex-row p-4'>
                <button className="btn btn-dark me-2 w-50" onClick={()=>props.setUpdatePricePage(false)}>Close</button>
                <button className="btn btn-warning ms-2 w-50" onClick={updatePrice}>Update</button>  
                </div>    
            </div>
            
    
        </div>
        </>
    )




}


    
export default UpdateListingPricePage;
import { useState } from "react";
import {FaStar} from 'react-icons/fa'
import Form from 'react-bootstrap/Form';

const RateAndReviewComponent = (props)=>{

    const [rating,setRating] = useState(null);
    const [hover,setHover] = useState(null);
    const [message,setMessage] = useState("");
    const [proceed,setProceed] = useState(false);
    const index = props.agentProps.index;

    async function passAndExit()
    {
       await props.agentProps.sendReview(message,index).then(props.setOpenForm(false));
    }

    async function passRating()
    {
        await props.agentProps.sendRating(rating,index).then(setProceed(true));
    }

    return (
        <>
        
            <div className="rate-page">
                {!proceed && <div className="container d-flex flex-column align-items-center">
                    <div className="row d-flex">
                    <div className="col-12">
                    {[...Array(5)].map((star,index)=>{
                        const currentRating = index +1;
                        return (
                            <label>
                                <input type="radio" 
                                        name="rating" 
                                        value={currentRating}
                                        onClick={()=>setRating(currentRating)}></input>
                                <FaStar className="star" 
                                        size={50}
                                        color={currentRating<=(hover||rating)?"#ffc107": "#e4e5e9"}
                                        onMouseEnter={()=>setHover(currentRating)}
                                        onMouseLeave={()=>setHover(null)}
                                        />
                                
                            </label>
                        )
                    })}
                    </div>
                    </div>
                
                <h1 className="display-4 mt-4">Please Rate Our Agent </h1> 
                <div className="row d-flex mt-4">
                <div className="col-6">
                <button className="btn btn-dark btn-lg" onClick={()=>props.setOpenForm(false)}>Close</button>
                </div>

                <div className="col-6">
                <button className="btn btn-warning btn-lg" onClick={passRating}>Next</button>
                </div>
                </div>
                </div> }

                {proceed && 
                    <Form.Group className="mb-3 w-75" onChange={(e)=>{setMessage(e.target.value)}} controlId="ControlTextarea">
                      <Form.Label>Please Review Our Agent</Form.Label>
                      <Form.Control as="textarea" value={message} rows={20} />
                      <div className="d-flex flex-row justify-content-center mt-5">
                      <button className="btn btn-dark btn-lg  w-25" onClick={()=>props.setOpenForm(false)}>Close</button>
                      <button className="btn btn-warning btn-lg ms-5 w-25" 
                                        onClick={passAndExit}>Submit</button>
                      </div>
                    </Form.Group>
                }
                   
            </div>
        

 
        </>
    )


}


export default RateAndReviewComponent;
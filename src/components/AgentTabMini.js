import avatar from '../images/avatar.png';
import { useState } from 'react';
import Rate from './Rate';
const AgentTabMini = (props)=>{

    const [openForm,setOpenForm] = useState(false);
    let rating = ""

    // display latest rating if the field is not undefined
    if (props.agent.ratings != undefined)
    {
        // latest rating
        const allRatings = props.agent.ratings;
        rating = allRatings[allRatings.length-1].rating;
    }
    
    return (
        <>
            <div className="col-md-4 d-flex justify-content-center mb-3 pb-5">
                <div className="d-flex w-75 flex-column text-center align-items-center  justify-content-center agent-pill rounded-5  shadow-lg">
                    <img src={avatar} className='img-fluid' width="400vh"></img>
                    <p className='display-4'>{props.agent.userName}</p>
                    <p className='fs-3'>{props.agent.email}</p>
                    <p className='fs-4'>Current Rating: {rating} </p>
                    <button className='w-50 btn btn-rounded btn-dark'
                            onClick={()=>{setOpenForm(!openForm)}}> Rate And Review </button>
                </div>
                {openForm && <Rate agentProps={props} setOpenForm={setOpenForm}/>}

            </div>

        </>
    )



}

export default AgentTabMini;
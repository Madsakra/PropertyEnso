import { useState } from "react";
import bath from '../svg/bath.svg';
import bed from '../svg/bed.svg';
import UpdatePropertyStatusPage from "./UpdatePropertyStatusPage";
import UpdateListingPricePage from "./UpdateListingPricePage";
import RemoveListingPage from "./RemoveListingPage";

const AgentListingCards = (props)=>{

    const [updateStatusPage,setUpdateStatusPage] = useState(false);
    const [updatePricePage,setUpdatePricePage] = useState(false);
    const [removeListingPage,setRemoveListingPage] = useState(false);

    const property = props.singleHouse;

    return(

        <>
        {updateStatusPage && <UpdatePropertyStatusPage property={property}
                                                setUpdateStatusPage={setUpdateStatusPage}
                                                fetchNewProperties={props.fetchNewProperties}/>}


        {updatePricePage && <UpdateListingPricePage property={property}
                                                 setUpdatePricePage={setUpdatePricePage}
                                                 fetchNewProperties={props.fetchNewProperties}/>}


        {removeListingPage && <RemoveListingPage property={property}
                                                 setRemoveListingPage={setRemoveListingPage}
                                                 fetchNewProperties={props.fetchNewProperties}/>}

        <div className="container-fluid mb-5 pt-5 seller-box pb-5">
        <div className="row">
                <img className="rounded shadow-lg" src={property.image} width="70vw" height="350vh"  ></img>
        </div>


        <div className="row pt-5">
        <div className="col-md-6 text-center mb-5">
        
            <p className="display-2">{property.name}</p>
            <p className="fs-3">Address : {property.address} - {property.area}</p>
            <p className="fs-3">Floor Range: #{property.floorRange}</p>
            <p className='fs-3'>{property.bedRooms} <img src={bed} class="me-4" width="35vw" alt="img"></img>
                                    {property.bathRooms} <img src={bath} class="me-2" width="35vw" alt="img"></img>
            </p> 
            <p className="fs-3 mt-3">Price: ${property.price}</p>
            <p className="fs-3">Status: {property.status}</p>

            {property.status === "new" &&
            <div>
                <button className='me-2 btn btn-warning' onClick={()=>setUpdateStatusPage(true)}>Update Status</button>
                <button className='ms-2 btn btn-success' onClick={()=>setUpdatePricePage(true)}>Update Price</button>
                <button className='ms-2 btn btn-dark' onClick={()=>setRemoveListingPage(true)}>Remove Listing</button>
            </div>
            }

        </div>
        <div className="col-md-6 seller-property-info d-flex flex-column justify-content-center text-center p-3">
            <p className='display-4'>Client's Information:</p>
            <p className="fs-1">Client ID: {property.seller.UID}</p>
            <p className="fs-3">Email: {property.seller.email}</p>
        </div>
        </div>
        </div>
        </>
    )
}


export default AgentListingCards;
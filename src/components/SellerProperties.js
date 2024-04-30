import { useState,useContext, useEffect } from "react";
import { Context } from '../App';
import { SellerPropertiesController } from "../controller/SellerPropertiesController";
import bath from '../svg/bath.svg';
import bed from '../svg/bed.svg';
import views from '../svg/views.svg';


const SellerProperties = ()=>{

    const {authUser} = useContext(Context);

    const [loading,setLoading] = useState(true);
    const [myProperties,setMyProperties] = useState([]);


    async function fetchMyProperties()
    {
        const mySellerFetch =  new SellerPropertiesController(authUser);
        const myResponse = await mySellerFetch.fetchAllSellerProperties();
        setMyProperties([...myResponse]);
        console.log(myProperties);
        setLoading(false);
    }


    useEffect(()=>{

        fetchMyProperties();


    },[!loading]);


    return (
        <>
        <div class="p-5 mt-5 mb-4 rate-main bg-body-tertiary rounded-3">
            <div class="container-fluid py-5 rate-head-words text-center">
            <h1 class="display-3 fw-bold">Your Properties</h1>
            <p class="fs-2">Review All Your Properties/Transaction</p>
            </div>
        </div>

        {myProperties.map((property)=>{
            return (
            <>

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
                <p className='fs-3'>{property.views? property.views : 0} <img src={views} class="me-4 ms-1" width="35vw" alt="img"></img>
                                         {property.numberOfShortList? property.numberOfShortList:0} 🩶
                </p>
             
            </div>
            <div className="col-md-6 seller-property-info d-flex flex-column justify-content-center text-center p-3">
                <p className="display-3">Property Agent: {property.agent.userName}</p>
                <p className="fs-3">Agent ID: {property.agent.UID}</p>
                <p className="fs-3">Email: {property.agent.email}</p>
            </div>

            </div>




            </div>

            </>
            )

        })}
        </>
    )


}


export default SellerProperties;

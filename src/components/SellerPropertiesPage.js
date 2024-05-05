import { useState,useContext, useEffect } from "react";
import { Context } from '../App';
import { SellerNewPropertiesController } from "../controller/SellerNewPropertiesController";
import { SellerSoldPropertiesController } from "../controller/SellerSoldPropertiesController";
import bath from '../svg/bath.svg';
import bed from '../svg/bed.svg';
import views from '../svg/views.svg';
import ReactLoading from "react-loading";


const SellerPropertiesPage = ()=>{

    const {authUser} = useContext(Context);

    const [loading,setLoading] = useState(true);
    const [myProperties,setMyProperties] = useState([]);


    async function fetchNewProperties()
    {
        const mySellerFetch =  new SellerNewPropertiesController(authUser);
        const myResponse = await mySellerFetch.fetchNewProperties();
        setMyProperties([...myResponse]);
        console.log(myProperties);
        setLoading(false);
        setTimeout(()=>{
            setLoading(false)
        },2000);
    }

    async function fetchSoldProperties()
    {
        const mySellerFetch =  new SellerSoldPropertiesController(authUser);
        const myResponse = await mySellerFetch.pushFetch();
        setMyProperties([...myResponse]);
        console.log(myProperties);
        setLoading(false);
        setTimeout(()=>{
            setLoading(false)
        },2000);
    }


    useEffect(()=>{

        fetchNewProperties();


    },[]);


    return (
        <>
        <div class="p-5 mt-5 mb-4 rate-main bg-body-tertiary rounded-3">
            <div class="container-fluid py-5 rate-head-words text-center">
            <h1 class="display-3 fw-bold">Your Properties</h1>
            <p class="fs-2">Review All Your Properties/Transaction</p>
            </div>
        </div>

      <div className='d-flex justify-content-center'>
        <button className='w-25 btn btn-light shadow lg mb-3 m-2 fw-bold' onClick={fetchNewProperties}>New Properties</button>
        <button className='w-25 btn btn-dark shadow mb-3 m-2' onClick={fetchSoldProperties}>Sold Properties</button>
      </div>

      {loading &&  
      <div className='d-flex align-items-center justify-content-center m-5 p-5'>
        <h1 className='display-1'>Loading</h1>
        <ReactLoading type={"bars"} className='ms-3'  color={"black"} />  
      </div>
       }

        {(myProperties.length===0 && !loading) && <h1 className="text-center mt-5 p-5 display-1">You do not have any properties in this sections</h1>}

        {myProperties.map((property)=>{
            return (
            <>

            <div className="container-fluid mb-5 pt-5 seller-box pb-5">
            <div className="row">
                    <img className="rounded shadow-lg" src={property.image} width="70vw" height="350vh"></img>
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
                {property.status === "new" && <p className='fs-3'>{property.views? property.views : 0} <img src={views} class="me-4 ms-1" width="35vw" alt="img"></img>     
                                                {property.numberOfShortList? property.numberOfShortList:0} 🩶
                </p>
                }
                {property.status ==="sold" &&
                <p className="fs-3">{property.numberOfShortList? property.numberOfShortList:0} 💛 </p>}
             
            </div>
            <div className="col-md-6 seller-property-info d-flex flex-column justify-content-center text-center p-3">
                <p className="display-3">Property Agent Information:</p>
                <p className="fs-3">UID: {property.agent.UID}</p>
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


export default SellerPropertiesPage;

import { React, useEffect, useState,useContext}  from 'react';

import bath from '../svg/bath.svg';
import bed from '../svg/bed.svg';
import { Context } from '../App';


const ListingCard = (props)=>{

    // CONTROL "ADD LISTING" BUTTON
    const [shortList,setShortList] = useState(false);
    
    // SHORTLISTED ITEM ARRAY
    const {setListingData,listingData} = useContext(Context);
    
    //----------------------------------------------------
    // ADD SHORTLISTED ITEM INTO THE ARRAY ABOVE
    function overRideSelect()
    {
        // DATA STILL EXIST ON THE BOUNDARY 
        // NOT PASSED INTO CONTROLLER AT THIS STAGE
        setListingData([...listingData,props]);
    }
   
    // REMOVE THE SHORTLISTED ITEM
    function removeItem(){
        const updatedItems = listingData.filter(item=>item.name!==props.name)
        setListingData(updatedItems);
    }

    useEffect(()=>{
        if (shortList)
        {
            overRideSelect();
        }

        else{
          
           removeItem();
        }
    },[shortList])


    return (

        <div className='caro-list-item'>
        <div className='container-fluid border border-3 p-3 border-dark-subtle rounded-5'>
            <div className='row'>
            <div className='col-md-6'>
            <img className='big-card'
             alt="houseImage" 
             src={props.image}/>
            </div>

            <div className='col-md-4 d-flex flex-column justify-content-center text-center text-md-start  mt-3'>
                <p className='display-3'>{props.name}</p>
                <p className='display-4'>#{props.floorRange}</p>
                <p className='display-4'>{props.bedRooms} <img src={bed} class="me-4" width="35vw" alt="img"></img>
                                         {props.bathRooms} <img src={bath} class="me-2" width="35vw" alt="img"></img> 
                
                </p>
                <p className='display-4'>${props.price}</p>
            </div> 

            <div className='col-md-2 d-flex flex-column justify-content-center text-center '>
              
                <p className='display-4 shortlist' 
                onClick={()=>{setShortList(!shortList);
                    }}>
                    {shortList?"🩶":"🤍"}
                
                </p>
                </div>
            </div>
        </div>
        
    </div>
    )


};

export default ListingCard;
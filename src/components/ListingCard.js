import { React, useEffect, useState,useContext}  from 'react';
import Calculator from '../components/Calculator';
import bath from '../svg/bath.svg';
import bed from '../svg/bed.svg';
import { Context } from '../App';


const ListingCard = (props)=>{

    // CONTROL "ADD LISTING" BUTTON
    const [shortList,setShortList] = useState(false);
    
    
    // Calculator
    const [calculator,setCalculator] = useState(false);
    
    //----------------------------------------------------
    // ADD SHORTLISTED ITEM INTO THE ARRAY ABOVE
     function overRideSelect()
    {
        
        // DATA STILL EXIST ON THE BOUNDARY 
        // NOT PASSED INTO CONTROLLER AT THIS STAGE
        props.setShortListedData(props.wholeListing);
        setShortList(false);
    }
   


    // make price appear on caluclator as int amount
    const price = props.price;



    useEffect(()=>{
        
        if (shortList)
        {
            overRideSelect();
            
        }

    },[shortList])


    return (
        
        <div>
            {calculator && <Calculator setCalculator={setCalculator}
                                        setShortList={setShortList} 
                                        shortList={shortList}
                                        price= {price}
                                        myProps={props}/>}

        <div className='caro-list-item' onClick={()=> {
            if (calculator === false)
            {
                setCalculator(true)};
            }
            }>
        <div className='container-fluid border border-3 p-3 border-dark-subtle rounded-5'>
            <div className='row'>
            <div className='col-md-6'>
            <img className='big-card'
             alt="houseImage" 
             src={props.image}/>
            </div>

            <div className='col-md-4 d-flex flex-column justify-content-center text-center text-md-start  mt-3'>
                <p className='display-3'>{props.name} --{props.status}</p>
                <p className='display-4'>#{props.floorRange}</p>
                <p className='display-4'>{props.bedRooms} <img src={bed} class="me-4" width="35vw" alt="img"></img>
                                         {props.bathRooms} <img src={bath} class="me-2" width="35vw" alt="img"></img> 
                
                </p>
                <p className='display-4'>${props.price}</p>
            </div> 


            </div>
        </div>
        
    </div>
    </div>
    )


};

export default ListingCard;
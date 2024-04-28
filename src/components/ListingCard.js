import { React, useEffect, useState,useContext}  from 'react';
import Calculator from '../components/Calculator';
import bath from '../svg/bath.svg';
import bed from '../svg/bed.svg';


const ListingCard = (props)=>{

    // CONTROL "ADD LISTING" BUTTON
    const [shortList,setShortList] = useState(false);
    const listingProps =  props.wholeListing;
    const inSavedGallery = props.inSaved;
    const removeListing = props.removeListing;
    const propertyIndex =props.index;

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
   




    useEffect(()=>{
        
        // the moment the shortlist bool becomes true, trigger override select,set shortlist
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
                                        prevProps={listingProps}
                                        inSavedGallery={inSavedGallery}
                                        removeListing={removeListing}
                                        propertyIndex = {propertyIndex}/>}

        <div className='caro-list-item' onClick={()=> {
                if (!inSavedGallery)
                {
                    props.updateViews(listingProps.name, listingProps.floorRange);
                }
           
                setCalculator(true);
            }
            }>
        <div className='container-fluid border border-3 p-3 border-dark-subtle rounded-5'>
            <div className='row'>
            <div className='col-md-6'>
            <img className='big-card'
             alt="houseImage" 
             src={listingProps.image}/>
            </div>

            <div className='col-md-4 d-flex flex-column justify-content-center text-center text-md-start  mt-3'>
                <p className='display-3'>{listingProps.name} --{listingProps.status}</p>
                <p className='display-4'>#{listingProps.floorRange}</p>
                <p className='display-4'>{listingProps.bedRooms} <img src={bed} class="me-4" width="35vw" alt="img"></img>
                                         {listingProps.bathRooms} <img src={bath} class="me-2" width="35vw" alt="img"></img> 
                
                </p>
                <p className='display-4'>${listingProps.price}</p>
            </div> 


            </div>
        </div>
        
    </div>
    </div>
    )


};

export default ListingCard;
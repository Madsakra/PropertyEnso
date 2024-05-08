import { React, useState}  from 'react';
import PropertyInfoPage from './PropertyInfoPage';
import bath from '../svg/bath.svg';
import bed from '../svg/bed.svg';
import { CollectViewsController } from '../controller/CollectViewsController';


const ListingCard = (props)=>{

    // CONTROL "ADD LISTING" BUTTON
    const [shortList,setShortList] = useState(false);
    const listingProps =  props.wholeListing;
    const inSavedGallery = props.inSaved;
    const removeListing = props.removeListing;
    const propertyIndex = props.index;

    // Calculator
    const [propertyInfo,setPropertyInfo] = useState(false);
    
    // SELLER-STORY UPDATE NUMBER OF VIEWS FOR PROPERTY
    async function updateViews(itemName,floorRange)
    {
       const collectControl = new CollectViewsController();
       await collectControl.sendViews(itemName,floorRange); 
       // will not return anything since user is not supposed to know about view tracking
    }



    return (
        
        <div>
            {propertyInfo && <PropertyInfoPage 
                                        setCalculator={setPropertyInfo}
                                        setShortList={setShortList} 
                                        shortList={shortList}
                                        wholeListing={listingProps}
                                        inSavedGallery={inSavedGallery}
             
                                        propertyIndex = {propertyIndex}/>}

        <div className='caro-list-item' onClick={()=> {
                // WILL UPDATE VIEWS WHEN USER CLICK ON LISTING CARD
                // SINCE THIS SCREEN WILL APPEAR ON BOTH SAVED GALLERY AND VIEW LISTING
                // WILL NOT UPDATE VIEWS IN SAVED GALLERY
                if (!inSavedGallery)
                {
                    
                    updateViews(listingProps.name, listingProps.floorRange);
                }
           
                setPropertyInfo(true);
            }
            }>
        <div className='container-fluid caro-outer-card border border-3 p-3'>
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
import {useContext, useEffect,useState} from "react";
import { Context } from '../App';
import { SavedNewPropertyController } from "../controller/SavedNewPropertyController";
import { SavedSoldPropertyController } from "../controller/SavedSoldPropertyController";
import { UserDataController } from "../controller/UserDataController";
import ListingCard from './ListingCard';
import ReactLoading from "react-loading";



const FavouritePage = ()=>{

    
    const {authUser,setUserProfileCreated, setUserName,setUserType} = useContext(Context);
    const [mySaved,setMySaved] = useState([]);
    const [loading,setLoading] = useState(true);
    const inSaved = true;

    async function fetchNewSavedProperty()
    {
        setLoading(true);
        const saveControl = new SavedNewPropertyController(authUser);
        const myResult = await saveControl.collectSavedProperty();
        setMySaved([...myResult])
        setTimeout(()=>{
            setLoading(false);
           },1000)  
    }


    async function fetchSoldListing()
    {
        setLoading(true);
        const saveControl = new SavedSoldPropertyController(authUser)
        await saveControl.collectSoldProperty().then((result)=>{
            setMySaved([...result])})
            setTimeout(()=>{
                setLoading(false);
               },1000)
       
    }





    
    async function removeListing(id)
    {
        // button inside calculator will bring back the position of the item to be removed
        // after that call on the UserDataController
        const userDataProvider = new UserDataController(authUser,setUserProfileCreated, setUserName,setUserType);
        await userDataProvider.removeSelectedSave(id).then((result)=>{
            if (result)
            {
                alert("Item Removed successfully");
                setLoading(true);
            }
        })


    }


    useEffect(()=>{

        fetchNewSavedProperty();
    },[]);


  
     return (
        <>
          <div class="p-5 mb-4 saved-heading bg-body-tertiary rounded-3">
            <div class="container-fluid py-5 saved-head-words text-center">
            <h1 class="display-3 fw-bold">Saved Gallery</h1>
            <p class="fs-2">View All Your Saved Listings</p>
            </div>
        </div>

        <div className='d-flex justify-content-center'>
        <button className='w-25 btn btn-light shadow lg mb-3 m-2 fw-bold' onClick={fetchNewSavedProperty}>Saved Properties (new)</button>
        <button className='w-25 btn btn-dark shadow mb-3 m-2'onClick={fetchSoldListing}>Sold Properties</button>
      </div>
    

      {loading &&  
      <div className='d-flex align-items-center justify-content-center m-5 p-5'>
        <h1 className='display-1'>Loading</h1>
        <ReactLoading type={"bars"} className='ms-3'  color={"black"} />  
      </div>
       }

        {!loading &&
                <div className="saved-head">
                {mySaved?.map((listing,index)=>{
                    const myIndex = index;
                      
                 return (
                    <div>
                    {/* // INDIVIDUAL CARD WITH ITS OWN DATA */}
                    <ListingCard
                                 index = {myIndex}
                                 wholeListing = {listing}
                                 inSaved={inSaved}
                                 removeListing={removeListing}
                                 />
                 </div>
                 )
                        
                }
            
                    
                )}
             
                </div>
            
        
        
        }

        
        </>
    )
   }




    



export default FavouritePage;
import {useContext, useEffect,useState} from "react";
import { Context } from '../App';
import { SavedPropertyController } from "../controller/SavedPropertyController";
import { UserDataController } from "../controller/UserDataController";
import ListingCard from './ListingCard';

const SavedProps = ()=>{

    
    const {authUser,setUserProfileCreated, setUserName,setUserType} = useContext(Context);
    const [mySaved,setMySaved] = useState([]);
    const [loading,setLoading] = useState(true);
    const inSaved = true;

    async function fetchSavedProperty()
    {
        const saveControl = new SavedPropertyController(authUser)
        await saveControl.collectSavedProperty().then((result)=>{
            setMySaved([...result]);
            setLoading(false);
        })
        
        
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
        // firebase needs 2 seconds to load, so setTimeOut
    
            fetchSavedProperty();
  
        
    },[!loading]);


  
     return (
        <>
          <div class="p-5 mb-4 saved-heading bg-body-tertiary rounded-3">
            <div class="container-fluid py-5 saved-head-words text-center">
            <h1 class="display-3 fw-bold">Saved Gallery</h1>
            <p class="fs-2">View All Your Saved Listings</p>
            </div>
        </div>

        

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




    



export default SavedProps;
import { React,useEffect,useState, useContext}  from 'react';
import MyFooter from './Footer';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


import ListingCard from './ListingCard';
import {ListingDataController} from '../controller/ListingDataController';
import { Context } from '../App';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import { CollectViewsController } from '../controller/CollectViewsController';
import { ShortListingController } from '../controller/ShortListingController';
import { UpdateShortListController } from '../controller/UpdateShortListController';

const ViewListings =()=>{

   const [search,setSearch] = useState("");
  
   // listing data from db
   const [allListing,setAllListing] = useState([]);
 
   const [statusFilter, setStatusFilter] = useState("Both");
   const [filter,setFilter] = useState("Name");
   
   const {authUser} = useContext(Context);
  
  const [shortListedData,setShortListedData] = useState({});

   

    function collectData(){
      setShortListedData({});
      const listingDataController = new ListingDataController();
      // ASK CONTROLLER TO FETCH ALL THE PROPERTY DATA FROM DB
      listingDataController.getAllListing().then((response)=>{
       setAllListing([...response])})
       
    }
    
    async function updateShortListValue(itemName,floorRange)
    {
       const updaterControl = new UpdateShortListController();
       updaterControl.updateShortlistValue(itemName,floorRange);
    }







    async function shortListProperty()
    {
      const shortLister = new ShortListingController(authUser);
      const response = await shortLister.shortListNow(shortListedData);

      // to check if the user had just accessed this page
      if (Object.keys(shortListedData).length !==0 && response === false)
      {
        alert("You Already Have That Item saved!");
        
      }

      else if (Object.keys(shortListedData).length !==0 && response === true){
        await updateShortListValue(shortListedData.name,shortListedData.floorRange).then(()=>{
          alert("Item Successfully Saved");
          setShortListedData({}); 
        })
      
      }
    }



    

    async function updateViews(itemName,floorRange)
    {
       const collectControl = new CollectViewsController();
       await collectControl.sendViews(itemName,floorRange); 
       // will not return anything since user is not supposed to know about view tracking
    }

    useEffect(()=>{
    
  
       collectData();
   
       
    },[]);
   
    useEffect(()=>{
      
    

      if (authUser)
      {
        shortListProperty();
      }
    
      
      
    })



   

    return (
        <>
        
        <div class="p-5 mb-4 listings-head bg-body-tertiary rounded-3">
          <div class="container-fluid py-5 listings-head-words text-center">
          <h1 class="display-5 fw-bold">View Listings</h1>
          <p class="fs-4">View All the listings available currently</p>
          </div>
        </div>
        
      

        <InputGroup className="mb-3">
        <Form.Control placeholder='Search for....' className='fs-4'
                      onChange={(e)=>setSearch(e.target.value)}/>



    <Dropdown onSelect={(e,eventKey)=>{setFilter(e)}}>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
       {filter}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey="Name" >Name</Dropdown.Item>
        <Dropdown.Item eventKey="Price">Price</Dropdown.Item>
        <Dropdown.Item  eventKey="BedRooms">BedRooms</Dropdown.Item>
        <Dropdown.Item  eventKey="BathRooms">BathRooms</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

      
      </InputGroup>

      <Form.Select onChange={(e)=>{setStatusFilter(e.currentTarget.value)}} className='mb-5'>
      <option value="Both">Both</option>
      <option value="Sold">Sold</option>
      <option value="New">New</option>
      </Form.Select>


        
        <Tabs  id="fill-tab-example" className="mb-3 fs-1 tabs" fill>
        <Tab eventKey="home"  title={allListing[0]?.project}>
          <div>
                {/* carry on editing tmr below*/}
                {allListing[0]?.indiProps.filter((item) => {
                  if (statusFilter === 'New')
                  {
                    return item.status === 'new';
                  }
                  else if (statusFilter==='Sold'){
                    return item.status === 'sold';
                  }

                  else{
                    return item.status === 'sold' || item.status === 'new';
                  }
                  }
                )
                .filter((listing)=>{
                  
                  // NAME FILTER-----------------------------------------------------------

                  if (filter==="Name")
                  {
                    return search.toLowerCase() === ""?listing: listing.name.toLowerCase().startsWith(search.toLowerCase());

                  }
                  // BEDROOM FILTER-----------------------------------------------------------
                  else if (filter === "BedRooms")
                  {
                  
                    return search === ""?listing:listing.bedRooms.startsWith(search);
                  }

                  // BATHROOM FILTER-----------------------------------------------------------
                  else if (filter === "BathRooms")
                  {
                    return search.toLowerCase() === ""?listing:listing.bathRooms.startsWith(search);
                  }

                  // PRICE FILTER --------------------------------------------------------------
                  else 
                  {
                    var num = listing.price + '';
                    return search === ""?listing: num.startsWith(search);
                  }
                  
                }).map(listing=>{

                    return(
                        <div>
                        {/* // INDIVIDUAL CARD WITH ITS OWN DATA */}
                        <ListingCard wholeListing = {listing}
                                     setShortListedData = {setShortListedData}
                                     shortListedData = {shortListedData}
                                     updateViews = {updateViews}
                                     />
                     </div>
                    );
                })}
            </div>   
        </Tab>


      <Tab eventKey="profile" title={allListing[1]?.project}>
      {allListing[1]?.indiProps.filter((item) => {
                  if (statusFilter === 'New')
                  {
                    return item.status === 'new';
                  }
                  else if (statusFilter==='Sold'){
                    return item.status === 'sold';
                  }

                  else{
                    return item.status === 'sold' || item.status === 'new';
                  }
                  }
                )
      
      .filter((listing)=>{
        
                  // NAME FILTER-----------------------------------------------------------

                  if (filter==="Name")
                  {
                    return search.toLowerCase() === ""?listing: listing.name.toLowerCase().startsWith(search.toLowerCase());

                  }
                  // BEDROOM FILTER-----------------------------------------------------------
                  else if (filter === "BedRooms")
                  {
                  
                    return search === ""?listing:listing.bedRooms.startsWith(search);
                  }

                  // BATHROOM FILTER-----------------------------------------------------------
                  else if (filter === "BathRooms")
                  {
                    return search.toLowerCase() === ""?listing:listing.bathRooms.startsWith(search);
                  }

                  // PRICE FILTER --------------------------------------------------------------
                  else 
                  {
                    var num = listing.price + '';
                    return search === ""?listing: num.startsWith(search);
                  }



                }).map(listing=>{
                    return(
                        <div>
                        {/* // INDIVIDUAL CARD WITH ITS OWN DATA */}
                        <ListingCard wholeListing = {listing}
                                     setShortListedData = {setShortListedData}
                                     shortListedData = {shortListedData}
                                     updateViews = {updateViews}/>
                     </div>
                    );
                })}
      </Tab>
      <Tab eventKey="longer-tab" title={allListing[2]?.project}>
      {allListing[2]?.indiProps.filter((item) => {
                  if (statusFilter === 'New')
                  {
                    return item.status === 'new';
                  }
                  else if (statusFilter==='Sold'){
                    return item.status === 'sold';
                  }

                  else{
                    return item.status === 'sold' || item.status === 'new';
                  }
                  }
                )
      .filter((listing)=>{
                  // NAME FILTER-----------------------------------------------------------

                  if (filter==="Name")
                  {
                    return search.toLowerCase() === ""?listing: listing.name.toLowerCase().startsWith(search.toLowerCase());

                  }
                  // BEDROOM FILTER-----------------------------------------------------------
                  else if (filter === "BedRooms")
                  {
                  
                    return search === ""?listing:listing.bedRooms.startsWith(search);
                  }

                  // BATHROOM FILTER-----------------------------------------------------------
                  else if (filter === "BathRooms")
                  {
                    return search.toLowerCase() === ""?listing:listing.bathRooms.startsWith(search);
                  }

                  // PRICE FILTER --------------------------------------------------------------
                  else 
                  {
                    var num = listing.price + '';
                    return search === ""?listing: num.startsWith(search);
                  }
                }).map(listing=>{
                    return(
                        <div>
                        {/* // INDIVIDUAL CARD WITH ITS OWN DATA */}
                        <ListingCard wholeListing = {listing}
                                     setShortListedData = {setShortListedData}
                                     shortListedData = {shortListedData}
                                     updateViews = {updateViews}/>
                     </div>
                    );
                })}
      </Tab>
      <Tab eventKey="contact" title={allListing[3]?.project}>
      {allListing[3]?.indiProps.filter((item) => {
                  if (statusFilter === 'New')
                  {
                    return item.status === 'new';
                  }
                  else if (statusFilter==='Sold'){
                    return item.status === 'sold';
                  }

                  else{
                    return item.status === 'sold' || item.status === 'new';
                  }
                  }
                )
      .filter((listing)=>{
                   // NAME FILTER-----------------------------------------------------------
                   if (filter==="Name")
                   {
                     return search.toLowerCase() === ""?listing: listing.name.toLowerCase().startsWith(search.toLowerCase());
 
                   }
                   // BEDROOM FILTER-----------------------------------------------------------
                   else if (filter === "BedRooms")
                   {
                   
                     return search === ""?listing:listing.bedRooms.startsWith(search);
                   }
 
                   // BATHROOM FILTER-----------------------------------------------------------
                   else if (filter === "BathRooms")
                   {
                     return search.toLowerCase() === ""?listing:listing.bathRooms.startsWith(search);
                   }
 
                   // PRICE FILTER --------------------------------------------------------------
                   else 
                   {
                     var num = listing.price + '';
                     return search === ""?listing: num.startsWith(search);
                   }
                }).map(listing=>{
                    return(
                        <div>
                        
                     
                        <ListingCard wholeListing = {listing}
                                     setShortListedData = {setShortListedData}
                                     shortListedData = {shortListedData}
                                     updateViews = {updateViews}/>
                     </div>
                    );
                })};
      </Tab>

    </Tabs>

      <MyFooter/>
        </>
    )

    
}


export default ViewListings;
import { React,useEffect,useState}  from 'react';
import MyFooter from './Footer';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ReactLoading from "react-loading";

import ListingCard from './ListingCard';
import {ViewNewListingsController} from '../controller/ViewNewListingsController';
import { ViewSoldListingsController } from '../controller/ViewSoldListingController';


import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';



const ViewListingsPage =()=>{

   const [search,setSearch] = useState("");
  
   // listing data, WILL BE CHANGED WHEN DB FETCH BACK DATA
   const [allListing,setAllListing] = useState([]);
   const [filter,setFilter] = useState("Name");
   const [loading,setLoading] = useState(true);

   
    // BUYER STORY- FETCH NEW DATA
    function fetchNewListings(){
      setLoading(true);
    
      const newListingsController = new ViewNewListingsController();
      // ASK CONTROLLER TO FETCH ALL THE PROPERTY DATA FROM DB
      newListingsController.getNewListings().then((response)=>{

        // TDD RESULT
        response.forEach((property)=>{
          console.log("NEW LISTINGS RETRIEVED - IN STREET - " + property.street);
          console.log(property.indiProps);
          
        })

       setAllListing([...response])})
       setTimeout(()=>{
        setLoading(false);
       },1000)
       
    }


    //FETCH SOLD LISTING
    function fetchSoldListings()
    {
      setLoading(true);

      const newListingsController = new ViewSoldListingsController();
      // ASK CONTROLLER TO FETCH ALL THE PROPERTY DATA FROM DB
      newListingsController.getSoldListings().then((response)=>{


      // TDD RESULT
      response.forEach((property)=>{
        console.log("NEW LISTINGS RETRIEVED - IN STREET - " + property.street);
        console.log(property.indiProps);
        
      })


       setAllListing([...response])})
       setTimeout(()=>{
        setLoading(false);
       },1000)
       
        
      }
    


    useEffect(()=>{
    

          fetchNewListings();
       
    },[]);
   



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
      <Dropdown.Toggle variant="dark" id="dropdown-basic">
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

      <div className='d-flex justify-content-center'>
        <button className='w-25 btn btn-light shadow lg mb-3 m-2 fw-bold' onClick={fetchNewListings}>New Properties</button>
        <button className='w-25 btn btn-dark shadow mb-3 m-2'onClick={fetchSoldListings}>Sold Properties</button>
      </div>
    

      {loading &&  
      <div className='d-flex align-items-center justify-content-center m-5 p-5'>
        <h1 className='display-1'>Loading</h1>
        <ReactLoading type={"bars"} className='ms-3'  color={"black"} />  
      </div>
       }


      {!loading && <Tabs  id="fill-tab-example" className="mb-3 fs-1 tabs bg-dark" fill>
        <Tab eventKey="home"  title={allListing[0]?.project}>
          <div>
              
                

                {allListing[0]?.indiProps
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
                        <ListingCard wholeListing = {listing}/>
                     </div>
                    );
                })}
            </div>   
        </Tab>


      <Tab eventKey="profile" title={allListing[1]?.project}>
      {allListing[1]?.indiProps
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
                        <ListingCard wholeListing = {listing}/>
                     </div>
                    );
                })}
      </Tab>
      <Tab eventKey="longer-tab" title={allListing[2]?.project}>
      {allListing[2]?.indiProps
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
                        <ListingCard wholeListing = {listing}/>
                     </div>
                    );
                })}
      </Tab>
      <Tab eventKey="contact" title={allListing[3]?.project}>
      {allListing[3]?.indiProps
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
                        
                     
                        <ListingCard wholeListing = {listing}/>
                     </div>
                    );
                })};
      </Tab>

    </Tabs>
  }
      <MyFooter/>
        </>
    )

    
}


export default ViewListingsPage;
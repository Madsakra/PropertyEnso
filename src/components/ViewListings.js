import { React,useEffect,useState}  from 'react';
import MyFooter from './Footer';



import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


import ListingCard from './ListingCard';
import {ListingDataController} from '../controller/ListingDataController';
import { db } from '../firebase-config';
import { collection } from 'firebase/firestore';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const ViewListings =()=>{

   const [search,setSearch] = useState("");
  
   // listing data from db
   const listingDataCollection = collection(db, "propertyData");
   
   const [allListing,setAllListing] = useState([]);
 

   const [filter,setFilter] = useState("Name");
   

   
    useEffect(()=>{
       const listingDataController = new ListingDataController(listingDataCollection);
       // ASK CONTROLLER TO FETCH ALL THE PROPERTY DATA FROM DB
       listingDataController.getAllListing().then((response)=>{
        setAllListing([...response]);

    });
    },[])


   function compare(a,b)
   {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
   }
  
   const sortByPrice = () =>{
    
    console.log(allListing[0].indiProps);
    const sorted = allListing[0].indiProps.sort(compare);
    setAllListing(prevState=>({
      ...prevState,
      indiProps:sorted
    }));
   };



    return (
        <>
        
        <div class="p-5 mb-4 listings-head bg-body-tertiary rounded-3">
          <div class="container-fluid py-5 listings-head-words text-center">
          <h1 class="display-5 fw-bold">View Listings</h1>
          <p class="fs-4">View All the listings available currently</p>
          </div>
        </div>
        
        <button onClick={sortByPrice}>Sort By Price</button>

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



        
        <Tabs  id="fill-tab-example" className="mb-3 fs-1 tabs" fill>
        <Tab eventKey="home"  title={allListing[0]?.project}>
          <div> 
                {allListing[0]?.indiProps.filter((listing)=>{
                
                  if (filter==="Name")
                  {
                    return search.toLowerCase() === ""?listing:listing.name.toLowerCase().startsWith(search.toLowerCase());
                  }

                  else if (filter === "BedRooms")
                  {
                  
                    return search === ""?listing:listing.bedRooms.startsWith(search);
                  }

                  else if (filter === "BathRooms")
                  {
                    return search.toLowerCase() === ""?listing:listing.bathRooms.startsWith(search);
                  }

                  else{
                    var num = listing.price + '';
                    return search === ""?listing:num.startsWith(search);
               
                  }
                  
                }).map(listing=>{

                    return(
                        <div>
                        {/* // INDIVIDUAL CARD WITH ITS OWN DATA */}
                        <ListingCard name={listing.name}
                                     area={listing.area}
                                     bedRooms ={listing.bedRooms}
                                     bathRooms ={listing.bathRooms}
                                     size={listing.floorRange}
                                     price={listing.price}
                                     floorRange={listing.floorRange}
                                     image={listing.image}
                                     key = {listing.id}/>
                     </div>
                    );
                })}
            </div>   
        </Tab>


      <Tab eventKey="profile" title={allListing[1]?.project}>
      {allListing[1]?.indiProps.filter((listing)=>{
                  if (filter==="Name")
                  {
                    return search.toLowerCase() === ""?listing:listing.name.toLowerCase().startsWith(search.toLowerCase());
                  }

                  else if (filter === "BedRooms")
                  {
                  
                    return search === ""?listing:listing.bedRooms.startsWith(search);
                  }

                  else if (filter === "BathRooms")
                  {
                    return search.toLowerCase() === ""?listing:listing.bathRooms.startsWith(search);
                  }


                  else
                  {
                    var num = listing.price + '';
                    return search === ""?listing:num.startsWith(search);
                  }
                }).map(listing=>{
                    return(
                        <div>
                        {/* // INDIVIDUAL CARD WITH ITS OWN DATA */}
                        <ListingCard name={listing.name}
                                     area={listing.area}
                                     bedRooms ={listing.bedRooms}
                                     bathRooms ={listing.bathRooms}
                                     size={listing.floorRange}
                                     price={listing.price}
                                     floorRange={listing.floorRange}
                                     image={listing.image}
                                     key = {listing.id}/>
                     </div>
                    );
                })}
      </Tab>
      <Tab eventKey="longer-tab" title={allListing[2]?.project}>
      {allListing[2]?.indiProps.filter((listing)=>{
                  if (filter==="Name")
                  {
                    return search.toLowerCase() === ""?listing:listing.name.toLowerCase().startsWith(search.toLowerCase());
                  }

                  else if (filter === "BedRooms")
                  {
                  
                    return search === ""?listing:listing.bedRooms.startsWith(search);
                  }

                  else if (filter === "BathRooms")
                  {
                    return search.toLowerCase() === ""?listing:listing.bathRooms.startsWith(search);
                  }

                  else
                  {
                    var num = listing.price + '';
                    return search=== ""?listing:num.startsWith(search);
                  }
                }).map(listing=>{
                    return(
                        <div>
                        {/* // INDIVIDUAL CARD WITH ITS OWN DATA */}
                        <ListingCard name={listing.name}
                                     area={listing.area}
                                     bedRooms ={listing.bedRooms}
                                     bathRooms ={listing.bathRooms}
                                     size={listing.floorRange}
                                     price={listing.price}
                                     floorRange={listing.floorRange}
                                     image={listing.image}
                                     key = {listing.id}/>
                     </div>
                    );
                })}
      </Tab>
      <Tab eventKey="contact" title={allListing[3]?.project}>
      {allListing[3]?.indiProps.filter((listing)=>{
                  if (filter==="Name")
                  {
                    return search.toLowerCase() === ""?listing:listing.name.toLowerCase().startsWith(search.toLowerCase());
                  }

                  else if (filter === "BedRooms")
                  {
                  
                    return search === ""?listing:listing.bedRooms.startsWith(search);
                  }

                  else if (filter === "BathRooms")
                  {
                    return search.toLowerCase() === ""?listing:listing.bathRooms.startsWith(search);
                  }


                  else
                  {
                    var num = listing.price + '';
                    return search=== ""?listing:num.startsWith(search);
                  }
                }).map(listing=>{
                    return(
                        <div>
                        
                     
                        <ListingCard name={listing.name}
                                     area={listing.area}
                                     bedRooms ={listing.bedRooms}
                                     bathRooms ={listing.bathRooms}
                                     size={listing.floorRange}
                                     price={listing.price}
                                     floorRange={listing.floorRange}
                                     image={listing.image}
                                     key = {listing.id}/>
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
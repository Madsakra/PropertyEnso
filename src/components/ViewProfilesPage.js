import { useState,useRef,useEffect } from "react";
import ReactLoading from "react-loading";
import { ViewProfilesController } from "../controller/ViewProfilesController";
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import { UpdateDescriptionController } from "../controller/UpdateDescriptionController";
import { SuspendProfilesController } from "../controller/SuspendProfilesController";

const ViewProfilesPage = ()=>{

    const [profileList,setProfileList] = useState([]);
    const [loading,setLoading] = useState(false);
    const startVal = useRef(0);
    const endVal = useRef(50);
    const [search,setSearch] = useState("");

    const [suspendTargetRole,setSuspentTargetRole] = useState("Buyer");


    const [showUpdateDescription,setShowUpdateDescription] = useState(false);
    const [currentTarget,setCurrentTarget] = useState("");
    
    // on change description form
    const [userDescription,setUserDescription] = useState("");
    const [userDesError,setUserDesError] = useState(false);
    
    async function getAllProfiles()
    {
        setLoading(true);
        const fetchController = new ViewProfilesController();
        const result = await fetchController.pushFetch(startVal.current,endVal.current)
        setProfileList([...result]);
 
        setTimeout(()=>{
          setLoading(false);
          
      },1000)
        
    }


    async function updateUserDescription()
    {
        if (userDescription==="")
        {
          setUserDesError(true);
        }

        else{
          const updateController = new UpdateDescriptionController();
          const result = await updateController.pushUpdateDescription(currentTarget,userDescription);

          if (result===true)
          {
            alert("User Description has been updated");
            setShowUpdateDescription(false);
            getAllProfiles();
          }

          else{
            alert("Update failed, please try again")
          }
        }
    }

    async function suspendProfiles()
    {

        const confirmation = window.confirm("Are You Sure You want to suspend profiles with this role?")
        if (confirmation)
        {
          const suspendController = new SuspendProfilesController();
          const result = await suspendController.pushSuspendProfiles(suspendTargetRole);
  
          if (result === true)
          {
            alert("all profiles that are of" + suspendTargetRole + "suspended")
          }
  
          else{
            alert("suspension failed");
          }
        }
    }


    function showUpdateUserDesForm(profileID){
      setShowUpdateDescription(true);
      setCurrentTarget(profileID);
      console.log(currentTarget);
    }
  
    function closeUpdateForm()
    {
      setShowUpdateDescription(false);
      setUserDesError(false);
      setCurrentTarget("");
      setUserDescription("");
    }


    useEffect(()=>{
      getAllProfiles();
    },[])


    return(

        <>
        
        
        <div class="p-5 mb-4 profiles-head bg-body-tertiary rounded-3">
          <div class="container-fluid py-5  text-center">
          <h1 class="display-4 fw-bold">All Profiles</h1>
          <p class="fs-4">View All the Profiles Of Every User</p>
          </div>
        </div>
        
        
        {loading &&  
      <div className='d-flex align-items-center justify-content-center m-5 p-5'>
        <h1 className='display-1'>Loading</h1>
        <ReactLoading type={"bars"} className='ms-3'  color={"black"} />  
      </div>
       }
    
    {!loading && 
      <div className="mass-suspend container">
          <h1 className="display-2 text-center text-danger">Mass Suspend</h1>
          <Form.Select aria-label="Default select example" onChange={(e)=>setSuspentTargetRole(e.target.value)}>
            <option value="Buyer">Buyer</option>
            <option value="Seller">Seller</option>
            <option value="Real Estate Agent">Real Estate Agent</option>
          </Form.Select>
          <Button variant="danger mt-4" onClick={()=>suspendProfiles()}>Suspend Profiles</Button>
      </div>}


    {!loading && <div className="container-fluid p-5">
       <InputGroup className="mb-3 search-bar" >
        <Form.Control placeholder='Search for....' className='fs-4 bg-dark text-light '
                      onChange={(e)=>setSearch(e.target.value)}/>
      </InputGroup>


        <Table striped bordered hover variant="dark" responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Profile ID</th>
          <th>UID (Account ID)</th>
          <th>Account Document Ref No.</th>
          <th>Description</th>
          <th>Role</th>
          <th className="text-center">Update Profile</th>
        </tr>
      </thead>
      <tbody>
            {profileList.filter((profile)=>{
               return search.toLowerCase() === ""? profile: profile.userName.toLowerCase().startsWith(search.toLowerCase());
            }).map((item, index) => (
            <tr>
            <td key={index}>{index+1}</td>
            <td>{item.profileID}</td>
            <td>{item.UID}</td>
            <td>{item.accountDocRef}</td>
            <td>{item.description}</td>
            <td>{item.type}</td>
            <td className="text-center">     
                <Dropdown>
                    <Dropdown.Toggle variant="light" id="dropdown">
                        Actions
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={()=>showUpdateUserDesForm(item.profileID)}>Update Description</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>                  
            </td>
            </tr>
          ))}
      </tbody>
    </Table>
                <div className="d-grid gap-2">
                {endVal.current===50 && <Button variant="outline-light" className="button-1 fw-bold" size="lg" onClick={()=>{
                    startVal.current +=51;
                    endVal.current +=51;
                    getAllProfiles();
                }}>View More</Button>}


                {endVal.current===101 && <Button variant="light" className="button-2 fw-bold" size="lg" 
                
                onClick={()=>{
                    startVal.current = 0;
                    endVal.current = 50;
                    getAllProfiles();
                }} >Go Back</Button>}
                </div>
        
        </div>}

        <Modal
              show={showUpdateDescription}
              onHide={()=>{setShowUpdateDescription(false)}}
              backdrop="static"
              keyboard={false}
              centered>

              <Modal.Header closeButton>
                <Modal.Title>Update userDescription</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Please Type In the new user Description
                <Form.Control as="textarea" className="mt-3" type="text" onChange={e=>setUserDescription(e.target.value)} placeholder="New User Name" />
                {userDesError && <p className="text-danger">Please Enter Your UserName</p>}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={()=>{closeUpdateForm()}}>
                  Close
                </Button>
                <Button variant="primary" onClick={updateUserDescription}>Update</Button>
              </Modal.Footer>
            </Modal>


        </>
    )



}

export default ViewProfilesPage;
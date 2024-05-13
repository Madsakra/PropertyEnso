import { useEffect, useState,useRef } from "react";
import Table from 'react-bootstrap/Table';
import { ViewAccountsController } from "../controller/ViewAccountsController";
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ReactLoading from "react-loading";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import { ResetPasswordController } from "../controller/ResetPasswordController";
import { UpdateUserNameController } from "../controller/UpdateUserNameController";
import { SuspendAccountController } from "../controller/SuspendAccountController";

const ViewAccountsPage = ()=>{


    const [accountList,setAccountList] = useState([]);
    const [search,setSearch] = useState("");
    const [loading,setLoading] = useState(false);

    const [userName,setUserName] = useState("");
    const [userNameError,setUserNameError] = useState(false);


    const startVal = useRef(0);
    const endVal = useRef(50);

    const [showUpdateUserName,setShowUpdateUserName] = useState(false);

    const [currentTarget,setCurrentTarget] = useState("");
    
    // BCE STORY: VIEW ACCOUNT
    async function getAllAccounts()
    {
        setLoading(true);
        const myViewerController = new ViewAccountsController();
        const result = await myViewerController.pushFetch(startVal.current,endVal.current);
        setAccountList([...result]);
        setTimeout(()=>{
            setLoading(false);
            
        },1000)
    }

   // BCE USER STORY: UPDATE SOMETHING....
    async function resetPassword(accountID,profileID)
    {
      
       const myResetControl = new ResetPasswordController();
       const result = await myResetControl.pushReset(accountID,profileID);
       console.log(result);
        if (result)
          {
            alert("Reset Successful, password is test12345");

            getAllAccounts();
          }

          else{
            alert("You are not allowed to reset Admin Password...please contact Google for support")
            getAllAccounts();
          }

    }

    // BCE USER STORY: UPDATE SOMETHING....
    async function updateUserName()
    {
        if (userName === "")
        {
          setUserNameError(true);
        }

        else{
            const updaterControl = new UpdateUserNameController();
            const result = await updaterControl.pushUpdateUserName(currentTarget,userName)
            if (result===true)
            {
              alert("Username successfully updated");
              setShowUpdateUserName(false);
              getAllAccounts();
            }
        }
    }


    // BCE USER STORY: SUSPEND ACCOUNT
    async function suspendAccount(accountDocRef,accountID,accountStatus)
    {
        if (accountStatus==="active")
        {
          const userResponse = window.confirm("Are you sure you want to suspend this user " + accountDocRef +"?");
          if (userResponse)
          {
             const suspendControl = new SuspendAccountController();
             const result = await suspendControl.pushSuspend(accountDocRef,accountID);
             if (result===true)
              {
                alert("Account suspended");
                getAllAccounts();
              }
  
              else{
                alert("Unable to suspend Admin");
              }
          }

        }

        else{
          alert("This account is already suspended!")
        }



        
    
    }

    function showUpdateUserNameForm(accountRefNo){
      setShowUpdateUserName(true);
      setCurrentTarget(accountRefNo);
      console.log(currentTarget);
    }
  
    function closeUpdateForm()
    {
      setShowUpdateUserName(false);
      setUserNameError(false);
      setCurrentTarget("");
      setUserName("");
    }
     




    useEffect(()=>{
        getAllAccounts();
    },[])


    return (
        <>
        <div class="p-5 mb-4 accounts-head bg-body-tertiary rounded-3">
          <div class="container-fluid py-5  text-center">
          <h1 class="display-4 fw-bold">All Accounts</h1>
          <p class="fs-4">View All the Accounts Of Every User</p>
          </div>
        </div>

        {loading &&  
      <div className='d-flex align-items-center justify-content-center m-5 p-5'>
        <h1 className='display-1'>Loading</h1>
        <ReactLoading type={"bars"} className='ms-3'  color={"black"} />  
      </div>
       }

       {!loading && <div className="container-fluid p-5">
       <InputGroup className="mb-3 search-bar" >
        <Form.Control placeholder='Search for....' className='fs-4 bg-dark text-light '
                      onChange={(e)=>setSearch(e.target.value)}/>
      </InputGroup>


        <Table striped bordered hover variant="dark" responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>User Name</th>
          <th>Email</th>
          <th>UID (Account ID)</th>
          <th>Account Document Ref No.</th>
          <th>Profile ID</th>
          <th>Status</th>
          <th className="text-center">Update Account</th>
        </tr>
      </thead>
      <tbody>
            {accountList.filter((account)=>{
               return search.toLowerCase() === ""? account: account.userName.toLowerCase().startsWith(search.toLowerCase());
            }).map((item, index) => (
            <tr>
            <td key={index}>{index+1}</td>
            <td>{item.userName}</td>
            <td>{item.email}</td>
            <td>{item.UID}</td>
            <td>{item.accountRef}</td>
            <td>{item.profileID?item.profileID:<></>}</td>
            <td>{item.status}</td>
            <td className="text-center">     
                <Dropdown>
                    <Dropdown.Toggle variant="light" id="dropdown">
                        Actions
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={()=>showUpdateUserNameForm(item.accountRef)}>Update UserName</Dropdown.Item>
                        <Dropdown.Item onClick={()=>{resetPassword(item.UID,item.profileID)}}>Reset Password</Dropdown.Item>
                        <Dropdown.Item onClick={()=>{suspendAccount(item.accountRef,item.UID,item.status)}}>Suspend Account</Dropdown.Item>
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
                    getAllAccounts();
                }}>View More</Button>}


                {endVal.current===101 && <Button variant="light" className="button-2 fw-bold" size="lg" 
                
                onClick={()=>{
                    startVal.current = 0;
                    endVal.current = 50;
                    getAllAccounts();
                }} >Go Back</Button>}
                </div>
        
        </div>}


              <Modal
              show={showUpdateUserName}
              onHide={()=>{setShowUpdateUserName(false)}}
              backdrop="static"
              keyboard={false}
              centered>

              <Modal.Header closeButton>
                <Modal.Title>Update UserName</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Please Type In the user Name For Update
                <Form.Control size="lg" className="mt-3" type="text" onChange={e=>setUserName(e.target.value)} placeholder="New User Name" />
                {userNameError&& <p className="text-danger">Please Enter Your UserName</p>}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={()=>{closeUpdateForm()}}>
                  Close
                </Button>
                <Button variant="primary" onClick={updateUserName}>Update</Button>
              </Modal.Footer>
            </Modal>

        </>
    )















}
export default ViewAccountsPage;
import { useEffect, useState,useRef } from "react";
import Table from 'react-bootstrap/Table';
import { ViewAccountsController } from "../controller/ViewAccountsController";
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ReactLoading from "react-loading";


import { ResetPasswordController } from "../controller/ResetPasswordController";

const ViewAccountsPage = ()=>{


    const [accountList,setAccountList] = useState([]);

    const [loading,setLoading] = useState(false);

    const startVal = useRef(0);
    const endVal = useRef(50);

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


    async function resetPassword(accountID,profileID)
    {
      
       const myResetControl = new ResetPasswordController();
       const result = await myResetControl.pushReset(accountID,profileID);
       console.log(result);
        if (result)
          {
            alert("Reset Successful, password is test12345");
          }

          else{
            alert("You are not allowed to reset Admin Password...please contact Google for support")
          }

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
        <Table striped bordered hover variant="dark" responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Email</th>
          <th>UID (Account ID)</th>
          <th>Profile ID</th>
          <th>Phone Number</th>
          <th>Status</th>
          <th className="text-center">Update Account</th>
        </tr>
      </thead>
      <tbody>
        
            {accountList.map((item, index) => (
            <tr>
            <td key={index}>{index+1}</td>
            <td>{item.email}</td>
            <td>{item.UID}</td>
            <td>{item.profileID?item.profileID:<></>}</td>
            <td>{item.phoneNumber}</td>
            <td>{item.status}</td>
            <td className="text-center">     
                <Dropdown>
                    <Dropdown.Toggle variant="light" id="dropdown">
                        Actions
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Update Phone Number</Dropdown.Item>
                        <Dropdown.Item onClick={()=>{resetPassword(item.UID,item.profileID)}}>Reset Password</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Suspend Account</Dropdown.Item>
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
                    endVal.current +=39;
                    getAllAccounts();
                }}>View More</Button>}


                {endVal.current===89 && <Button variant="light" className="button-2 fw-bold" size="lg" 
                
                onClick={()=>{
                    startVal.current = 0;
                    endVal.current = 50;
                    getAllAccounts();
                }} >Go Back</Button>}
                </div>
        
        </div>}

        </>
    )















}
export default ViewAccountsPage;
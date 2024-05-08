import {React,useContext} from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Context } from '../App';

import { getFunctions, httpsCallable } from "firebase/functions";

const HomeHeader = ()=>{

    const {setOpenLogin,setOpenRegister,authUser,
            userName,userType} = useContext(Context);


    const myWatch = async ()=>{
        const functions = getFunctions();
        const myData= httpsCallable(functions,'returnMessage')
        await myData().then((result)=>{
            console.log(result);
        }).catch((error)=>{
            console.error(error);
        })

        
       
    }



    return(
   
      <div>


        {authUser?
                <Row className='px-4 mt-5 pb-5'>
                <Col sm={7} className="d-flex flex-row">
                             
                           
                </Col>
                <Col sm={5} className='d-flex flex-column msg-across'>
                <h1 class='fw-bolder display-1 text-center mt-5'>Welcome {userName}</h1>
                <p class="display-3 mt-4 text-center">
                Your Are {userType} in the Database
            
                </p>

                <p class="display-4 mt-4 text-center">
                Your Email is {authUser.email}
                </p>
                </Col>
                </Row> 
                
                :

                <Row className='px-4 mt-5 pb-5'>
                <Col sm={7} className="d-flex flex-row">
                
                </Col>
                <Col sm={5} className='d-flex flex-column msg-across'>
                    <h1 class='fw-bolder text-center mt-5'>Be At Ease, No Matter Where You Are</h1>
                    <p class="display-4 mt-4 text-center">
                        Buy and Sell Your Property Without Worrying About The Hassle.
                    </p>
                    
                    
                    <div className='d-grid gap-2 d-md-flex justify-content-sm-center'>
                    <Button className="btn btn-lg btn-outline-dark px-4  btn-light" onClick={()=>{setOpenRegister(true);}}>Register Now</Button>

                    <Button className='btn btn-lg btn-outline-dark px-4  btn-light openLoginBtn' onClick={()=>{setOpenLogin(true);}}>Login Now</Button>

                
                    </div>
                </Col>
                </Row> 
            }
        
    
      </div>

    )
}

export default HomeHeader;
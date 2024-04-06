import React from 'react';
import Container from 'react-bootstrap/Container';
import tick from '../svg/tick.svg';
import Spinner from 'react-bootstrap/Spinner';

const SuccessMsg = (props)=>{
    return (
       <div className='successMsg'>
           <Container>
                <img src={tick} className='mb-3' height='80vh'></img>
                <h1>{props.keyword} Successful</h1>
                <p className='lead'>Please Wait While We Redirect You</p>
                <span>loading.....</span>
                <Spinner size='sm' animation="border" role="status">
                </Spinner>
               
            
            </Container> 
       </div>
    )
}


export default SuccessMsg;
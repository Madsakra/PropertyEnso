import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import heart from '../svg/heart.svg';
import love from '../svg/love.svg';
import care from '../svg/care.svg'

const Features=()=>{
    
    return (
        
        <Container className='px-4 py-5 mt-5 feats w-75'>
            <h2 className=' text-center mb-3'>Reasons To Join Us</h2>
            <Row className='py-5 row-cols-1 row-cols-lg-3  text-center'>

                <Col className='d-flex flex-column align-items-center'>
                   <img className='features-svg' src={heart} alt='sunheart'></img>
                    <h2>Safe System</h2>
                    <p className='lead'>Our System Is Very Safe, We Keep Dangers Out Of Our DoorStep</p>
                </Col>
         

                <Col className='d-flex flex-column align-items-center'>
                <img className='features-svg' alt='trust' src={love}></img>
                    <h2>Trusted</h2>
                    <p className='lead'>Approved By URA And Government Authorities</p>
                </Col>


                <Col className='d-flex flex-column align-items-center'>
                <img className='features-svg' alt='walkwith' src={care}></img>
                    <h2>Convenient</h2>
                    <p className='lead'> Do Your Transaction Any Where, Any Time </p>
                </Col>

            </Row>
        </Container>
    );
};





export default Features;


  

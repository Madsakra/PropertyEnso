import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import React from 'react';

const CrossInfo=()=>{

    return (
        <Container className='pt-5 mt-3' fluid>

           <Row>
            <Col md={6} className='mt-5 pt-5 text-center'>
            
            <h1 class='fw-bolder  pt-md-5'>Find Us At:</h1>
            <p className='lead'>50 Sungei Tengah Rd, Singapore 699012</p>
            <p className='lead'>Opening Hours: 8:30am to 9pm</p>
            <p className='lead'>Tel:+65 1234 4490</p>
            <p className='lead'>Email: enquiries@petheaven.org.sg</p>
            </Col>

            <Col md={6} className='ps-0 pe-0 '>
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15954.641234696819!2d103.7321005!3d1.3804734!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da1797148efe85%3A0x198673c4e23c5926!2sSociety%20for%20the%20Prevention%20of%20Cruelty%20to%20Animals%20(SPCA)!5e0!3m2!1sen!2ssg!4v1699847217673!5m2!1sen!2ssg" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </Col>
            </Row>

    </Container>
    )
}


export default CrossInfo;
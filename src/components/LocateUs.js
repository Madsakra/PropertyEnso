import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import locationsvg from '../svg/location.svg';
import Image from 'react-bootstrap/Image';

const LocateUs = ()=>{
    return (
        <Container className='pt-5 mt-3 weAre' fluid>
           <Row>
            <Col md={6} className='mt-2 pt-5 findUsBox text-center'>
            <Image src={locationsvg} className='findUs' fluid></Image>
            <h1 class='fw-bolder  pt-md-2'>Find Us At:</h1>
            <div className='lead location-words'>
            <h4>461 Clementi Rd, Singapore 599491</h4>
            <h4>Opening Hours: 9am to 5pm</h4>
            <h4>Tel:+65 1234 4490</h4>
            <h4>Email: enquiries@PropertyEnso.org.sg</h4>
            </div>
            </Col>

            <Col md={6} className='ps-0 pe-0 text-center'>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.744395196316!2d103.77359421079252!3d1.3294065616351174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da1080893304bd%3A0xc889e76f4e447e42!2sSIM%20Global%20Education!5e0!3m2!1sen!2ssg!4v1712213765145!5m2!1sen!2ssg" width="600" height="450"allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
   
            </Col>
            </Row>

    </Container>
  
    )
}

export default LocateUs;
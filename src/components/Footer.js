import React from 'react';
import Container  from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import twitter from '../svg/twitter.svg';
import Col  from 'react-bootstrap/Col';
import fb from '../svg/facebook.svg';
import insta from '../svg/insta.svg';
import location from '../svg/location.svg';
import phone from '../svg/phone.svg';
import mail from '../svg/mail.svg';
import logo from '../svg/mainLogo.svg';

const MyFooter = ()=>{
    return (
        <footer class="py-5 my-3 mt-5 pt-5 footer">
        <hr class="hr" />

        <Container>
        <Row className='d-flex text-start footer-box'>

        <Col sm={3}>
        <p className='lead fw-bold'><img src={logo} alt='svg' height="35vh"></img> @PropertyEnso 2024</p>
       
      
        </Col>
        <Col sm={6}>
        <h3>Contact Us</h3>
        <p className='lead fw-bold'><img src={location} alt='svg' height="35vh"></img> 461 Clementi Rd, Singapore 599491</p>
        <p className='lead fw-bold'><img src={phone} alt='svg' height="35vh"></img> +65 1234 4490</p>
        <p className='lead fw-bold'><img src={mail} alt='svg' height="35vh"></img> enquiries@PropertyEnso.org.sg</p>
    

        </Col>

        <Col sm={3} >
        <h3>Social Media</h3>
        <p><img src={fb} alt='svg' height="35vh"></img> Facebook</p>
        <p><img src={insta} alt='svg' height="35vh"></img> Instagram</p>
        <p><img src={twitter} alt='svg' height="35vh"></img> Twitter</p>
        </Col>
        </Row>
        </Container>

       
        </footer>
    )
}

export default MyFooter;








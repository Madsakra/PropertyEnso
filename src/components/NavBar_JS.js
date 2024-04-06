import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import mainLogo from '../svg/mainLogo.svg';
import Login from './Login';
import Button from 'react-bootstrap/Button';
import Register from './Register';
import { useContext } from 'react';
import { Context } from '../App';

function Navbar_JS() {

  
  const {openLogin,setOpenLogin,openRegister,
        setOpenRegister,authUser,userSignOut} = useContext(Context);

  return (

    <div>
    <Navbar expand="lg" className="nav-cust" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to='/'>
          <img src={mainLogo} class="me-2" width="35vw" alt="img"></img>
          PropertyEnso 
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          
          <Nav.Link as={Link} to='/' exact>Home</Nav.Link>

          </Nav>

            <div className='text-end topButtons'>
            {authUser? 
            <div>
              <button class='me-3 btn btn-dark' onClick={userSignOut}>Sign Out</button>
            </div>

             : 

            <div>

              <Button className='me-3 buttonColor btn-outline-light'  
              onClick={()=>{setOpenRegister(true);
              setOpenLogin(false);}}>Register</Button> 


              <Button className='buttonColor btn-outline-light' 
              onClick={()=>{setOpenLogin(true);
              setOpenRegister(false)}}>Login</Button>

            </div>
            }
            </div>

            {/* if logged in, signOut button will appear */}
          
      
        </Navbar.Collapse>
      </Container>
    </Navbar>

    {openRegister && <Register/>}
    {openLogin && <Login/>}

    </div>
  );
}

export default Navbar_JS;
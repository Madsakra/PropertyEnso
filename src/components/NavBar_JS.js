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
import { LogOutController } from '../controller/LogOutController';


function Navbar_JS() {

  
  const {setOpenLogin,setCreateUserTrigger, 
        setAuthUser,setUserProfileCreated,userType,
        setEmail,setPassword,openRegister,openLogin,authUser} = useContext(Context);

  


  const userSignOut = () =>{
          try{
              const loggingOut = new LogOutController();
              const successSignOut = loggingOut.customSignOut();
              if (successSignOut)
              {
                alert('Sign out successful');
                setCreateUserTrigger(false);
                setAuthUser(null);
                setUserProfileCreated(false);
                setEmail("");
                setPassword("");
              }
            }
            catch(error)
            {
              alert("Sign Out Failed")
            }
          };
          

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
      
          {authUser && 
          <Nav.Link as={Link} to='/dashboard' exact>Dashboard</Nav.Link>}

          {/* only buyer can access */}
          {(userType ==="Buyer" && authUser) && 
          <>
          <Nav.Link as={Link} to='/viewlistings' exact>View Listings</Nav.Link>
          <Nav.Link as={Link} to='/savedprops' exact>Saved Properties</Nav.Link>
          <Nav.Link as={Link} to='/rateandreviewmain' exact>Rate And Review</Nav.Link>
          </>
          }


          
          </Nav>

            <div className='text-end topButtons'>
            {authUser? 
            <div>
              <button class='me-3 btn btn-dark' onClick={userSignOut}>Sign Out</button>
            </div>

             : 

            <div>

              {/* <Button className='me-3 buttonColor btn-outline-light'  
              onClick={()=>{setOpenRegister(true);
              setOpenLogin(false);}}>Register</Button>  */}


              <Button className='buttonColor btn-outline-light' 
              onClick={()=>{setOpenLogin(true);}}>Login</Button>

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
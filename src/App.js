import NavBar from './components/NavBar_JS';
import './styles.css';

// COMPONENTS
import Home from './components/Home_JS';
import DashBoard from './components/DashBoard';
import {React, useState,createContext,useEffect} from 'react';
import {HashRouter as Router,  Route, Routes} from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import CreateUserProfile from './components/CreateUserProfile';
import {UserDataController}  from './controller/UserDataController';
import {auth} from './firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import ViewListingsPage from './components/ViewListings';

import RateAndReviewPage from './components/RateAndReviewPage';
import SellerPropertiesPage from './components/SellerPropertiesPage';
import FavouritePage from './components/FavouritePage';
import CreatePropertyPage from './components/CreatePropertyPage';
import AgentPropertiesPage from './components/AgentPropertiesPage';
import AgentRatingAndReviewPage from './components/AgentRatingAndReviewPage';



export const Context = createContext();

const App =()=>{


    // states to trigger the login and register buttons
   const [openLogin,setOpenLogin] = useState(false);
   const [openRegister,setOpenRegister] = useState(false);
   
   // state that make error occur on login 
   const [facedError,setFacedError] = useState(false);

   // states for email tab
   
   const [email,setEmail] = useState("");
   const [password,setPassword] = useState("");


   // state for authentication
   const [authUser,setAuthUser] = useState(null);
   const[loading,setLoading] = useState(false);

   // state to check if user exist in database
   const [userProfileCreated, setUserProfileCreated] = useState(false);
   // trigger create user if they haven't done so 
   const [createUserTrigger,setCreateUserTrigger] = useState(false);
   
   // take current user name from db and store here
   const [userName,setUserName] = useState("");
   const [userType,setUserType] = useState("");



    const [profileID, setProfileID] = useState("");

  

 

  const passInfoOver = async () =>{
    // pass all info from the states to database
    // 1. close the create user profile page
    const userDataProvider = new UserDataController(authUser,setUserProfileCreated, setUserName,setUserType);
    setUserProfileCreated(true);
    try{
      
       await userDataProvider.writeNewAccount(authUser.email,userType,userName);
       alert("Profile succesfully created.");
    }
    catch(error)
    {
      alert("Failed to Create profile");
    }
  }

  // if user refresh page, at least keep the auth
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        
        setAuthUser(user);
       
      } })


  },[])


  useEffect(()=>{
    const userDataProvider = new UserDataController(authUser,setUserProfileCreated, setUserName,setUserType,setProfileID);
    userDataProvider.getAllUserDetails()
    
    // .then(()=>{
    //   if (authUser!=null && !userProfileCreated)
    //   {
        
    //     setCreateUserTrigger(true);
    //   }
    // });

    // for testing to remove after
    console.log(profileID);
  
  
    
  })











  return (

    <>
    <Router>
      <ScrollToTop/>
      <Context.Provider value={{  openLogin,setOpenLogin,openRegister,setOpenRegister,
                                authUser, setAuthUser,setEmail, setPassword,
                                setFacedError,
                                facedError, email,password,
                                userName,setUserName, userProfileCreated,
                                setUserProfileCreated,setCreateUserTrigger, userType,
                                setUserType, passInfoOver, profileID,
                                setLoading
                          
                                }}>
      
     
      <NavBar />


    

      {(createUserTrigger && !userProfileCreated ) &&
        <CreateUserProfile/>}
        
      {loading && 
      <div className='loading-cont display-1'>
        LOADING......
      </div>}
      <div className='bgf'>
       
          <Routes>
            <Route path='/' exact element={ <Home /> } />
            <Route path='/dashboard' exact element={ <DashBoard /> } />
            <Route path='/viewlistings' exact element={ <ViewListingsPage /> } />
            <Route path='/favouritepage' exact element={ <FavouritePage /> } />
            <Route path='/rateandreviewpage' exact element={ <RateAndReviewPage/> } />
            <Route path='/sellerproperties' exact element={ <SellerPropertiesPage/> }/>
            <Route path='/createproperty' exact element={ <CreatePropertyPage/> }/>
            <Route path='/agentproperties' exact element={ <AgentPropertiesPage/> }/>
            <Route path='/agentratingandreview' exact element={<AgentRatingAndReviewPage/>}/>
          </Routes>
        
      </div>
      </Context.Provider>
      </Router>
    </>

   
  );
}

export default App;

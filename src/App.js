import NavBar from './components/NavBar_JS';
import './styles.css';

// COMPONENTS
import Home from './components/Home_JS';

import {React, useState,createContext,useEffect,useRef} from 'react';
import {HashRouter as Router,  Route, Routes} from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';

import {UserProfileController}  from './controller/UserProfileController';
import {auth} from './firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import ViewListingsPage from './components/ViewListings';

import RateAndReviewPage from './components/RateAndReviewPage';
import SellerPropertiesPage from './components/SellerPropertiesPage';
import FavouritePage from './components/FavouritePage';
import CreatePropertyPage from './components/CreatePropertyPage';
import AgentPropertiesPage from './components/AgentPropertiesPage';
import AgentRatingAndReviewPage from './components/AgentRatingAndReviewPage';
import AgentSearchPage from './components/AgentSearchPage';
import ViewAccountsPage from './components/ViewAccountsPage';
import AdminCreateAccPage from './components/AdminCreateAccPage';
import AdminCreateProfilePage from './components/AdminCreateProfilePage';


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
    const [uid,setUID] = useState("");

   // state for authentication
   const [authUser,setAuthUser] = useState(null);
   const[loading,setLoading] = useState(false);

   
   // take current user name from db and store here
   const [userName,setUserName] = useState("");
   const [userType,setUserType] = useState("");
   const [accountDetails,setAccountDetails] = useState({});


    

    const profileID = useRef("");

 



  // if user refresh page, at least keep the auth
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        
        setAuthUser(user);
        setUID(user.uid);
        console.log(user.uid);
        
      } })


  },[])

  // fetch user profile
  async function fetchProfile()
  {
    const userProfileProvider = new UserProfileController();
    if (uid)
    {
      const result = await userProfileProvider.getProfileDetails(uid);
      setUserType(result.type);
      profileID.current = result.profileID;
    }
  }


  // IF USER REFRESH, AT LEAST THE PROFILE ID AND PROFILE WILL BE BACK 
  useEffect(()=>{


    fetchProfile();
    
  })











  return (

    <>
    <Router>
      <ScrollToTop/>
      <Context.Provider value={{  openLogin,setOpenLogin,openRegister,setOpenRegister,
                                authUser, setAuthUser,setEmail, setPassword, profileID,
                                setFacedError, setUserName, setAccountDetails, uid,
                                facedError, email,password, 
                                userName,setUserName, userType,
                                setUserType,setLoading
                          
                                }}>
      
     
      <NavBar />


    


      {loading && 
      <div className='loading-cont display-1'>
        LOADING......
      </div>}
      <div className='bgf'>
       
          <Routes>
            <Route path='/' exact element={ <Home /> } />
            <Route path='/viewlistings' exact element={ <ViewListingsPage /> } />
            <Route path='/favouritepage' exact element={ <FavouritePage /> } />
            <Route path='/rateandreviewpage' exact element={ <RateAndReviewPage/> } />
            <Route path='/sellerproperties' exact element={ <SellerPropertiesPage/> }/>
            <Route path='/createproperty' exact element={ <CreatePropertyPage/> }/>
            <Route path='/agentproperties' exact element={ <AgentPropertiesPage/> }/>
            <Route path='/agentratingandreview' exact element={<AgentRatingAndReviewPage/>}/>
            <Route path='/agentsearch' exact element={<AgentSearchPage/>}/>
            <Route path='/viewaccounts' exact element={<ViewAccountsPage/>}/>
            <Route path='/admincreateAc' exact element={<AdminCreateAccPage/>}/>
            <Route path='/admincreateProfile' exact element={<AdminCreateProfilePage/>}/>



          </Routes>
        
      </div>
      </Context.Provider>
      </Router>
    </>

   
  );
}

export default App;

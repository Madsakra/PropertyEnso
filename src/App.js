import NavBar from './components/NavBar_JS';
import './styles.css';

import Home from './components/Home_JS';
import {React, useState,createContext,useEffect} from 'react';
import {HashRouter as Router,  Route, Routes} from 'react-router-dom';

import { AnimatePresence } from 'framer-motion';
import ScrollToTop from './components/ScrollToTop';

import {signInWithEmailAndPassword,
        createUserWithEmailAndPassword,
        signOut, 
        signInWithPopup} from 'firebase/auth';



import {auth,googleProvider} from './firebase-config';


import AuthDetails from './components/AuthDetails';
import CreateUserProfile from './components/CreateUserProfile';
import {getAllUserDetails} from './controller/RetrieveAccounts';
import {writeNewAccount} from './controller/WriteNewAccount';

export const Context = createContext();

function App() {


    // states to trigger the login and register buttons
   const [openLogin,setOpenLogin] = useState(false);
   const [openRegister,setOpenRegister] = useState(false);
   
   const [facedError,setFacedError] = useState(false);

   const [email,setEmail] = useState("");
   const [password,setPassword] = useState("");

   const [authUser,setAuthUser] = useState(null);


   
   const [userProfileCreated, setUserProfileCreated] = useState(false);
   const [createUserTrigger,setCreateUserTrigger] = useState(false);
   const [userName,setUserName] = useState("");
   const [userType,setUserType] = useState("");


   // sign in with google
  const signInWithGoogle = async () =>{
    try{
      await signInWithPopup(auth,googleProvider);
      alert("login successful");
      setOpenLogin(false);
      setOpenRegister(false);
      if (!userProfileCreated)
      {
          setCreateUserTrigger(true);
      }
    }
    catch(err)
    {
      console.error(err);
    }
  }



    // sign in with email
    const signIn = (event)=> 
    {
  
      event.preventDefault();
      signInWithEmailAndPassword(auth,email,password)
      .then((userCredential)=>{
          console.log(userCredential);
          setFacedError(false);
          // IF AUTHETHICATED SUCCESSFULLY WITH FIREBASE
          // TRIGGER FALSE SCREENS
          // updateLogin();
          alert("login successful");
          setOpenLogin(false);
          
          if (!userProfileCreated)
          {
              setCreateUserTrigger(true);
          }

      }).catch((error)=>{
          console.log(error);
          setFacedError(true);
      });
  };

  // MAIN SIGN OUT FUNCTION
  const userSignOut = () =>{
    signOut(auth).then(()=>{
        console.log('signout successful');
        setAuthUser(null);
        setUserProfileCreated(false);
        setEmail("");
        setPassword("");
        setCreateUserTrigger(false);
    }).catch(error=>console.log(error));
}
  
  const signUp = (e)=>{
    e.preventDefault();
    createUserWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
        // IF REGISTRATION IS SUCCESSFUL, WILL TURN UP MESSAGE SCREEN
        // TURN IT OFF AFTER FEW SECONDS
        setOpenRegister(false);

        // redirect to login
        setOpenLogin(true);
        console.log(userCredential)
        setFacedError(false);
        alert("Registration Successful!");
        // WHEN CREATING ACCOUNT, FIREBASE AUTOMATICALLY LOGS IN
        // LOG OUT FOR THE USER SO THEY CAN LOG BACK IN THROUGH LOGIN SCREEN
        userSignOut();
        

    }).catch((error)=>{
        console.log(error);
        setFacedError(true);
    });
};


  const passInfoOver = () =>{
    // pass all info from the states to database
    // 1. close the create user profile page
    setUserProfileCreated(true);
    writeNewAccount(authUser.email,userType,userName);
  }



  useEffect(()=>{
    getAllUserDetails(authUser,setUserProfileCreated,setUserName,setUserType);
    if (authUser!=null && !userProfileCreated)
    {
     
      setCreateUserTrigger(true);
    }
    console.log(userName);
    console.log(userType);
  })











  return (

    <>
    <Router>
      <ScrollToTop/>
      <Context.Provider value={{  openLogin,setOpenLogin,openRegister,setOpenRegister,
                                authUser, setAuthUser,setEmail, setPassword,
                                signIn, signUp, userSignOut,
                                facedError, email,password,
                                userName,setUserName, userProfileCreated,
                                setUserProfileCreated,setCreateUserTrigger, userType,
                                setUserType, passInfoOver, signInWithGoogle
                                }}>
      
     
      <NavBar />
      <AuthDetails/>

   

      {(createUserTrigger && !userProfileCreated ) &&
        <CreateUserProfile/>}
  
      <div className='bgf'>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path='/' exact element={ <Home /> } />

          </Routes>
        </AnimatePresence>
      </div>
      </Context.Provider>
      </Router>
    </>

   
  );
}

export default App;

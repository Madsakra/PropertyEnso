const functions = require('firebase-functions');
const { initializeApp } = require('firebase-admin/app')
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

const { getAuth } = require("firebase-admin/auth");


const app = initializeApp();
const users = getAuth(app);


exports.viewAccounts = functions.https.onCall(async ()=>{
    const myData = await users.listUsers();
    return myData;
})

exports.createAccount = functions.https.onCall(async(data,context)=>{

  try{
   
          const user = await users.createUser({
            email:data.email,
            password:data.password
          })
          // Return USER ID
          const userID = user.uid;
          return userID;
  }

  catch(error)
  {
    console.log(error);
  }
})


exports.resetPassword = functions.https.onCall(async(data,context)=>{

  try{

    await users.updateUser(data.uid,{
      password:"test12345"
    })

    console.log("password changed for "+data.uid);

  }
  catch(err)
  {
    console.log(err)
  }

})
const functions = require('firebase-functions');
const { initializeApp } = require('firebase-admin/app')
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

const { getAuth } = require("firebase-admin/auth");

const app = initializeApp();
const users = getAuth(app);


exports.helloWorld = onRequest(async (request, response) => {

  const data = await users.listUsers();
  logger.info("Hello logs!", {structuredData: true});
  
  response.send(JSON.stringify(data));
});


exports.returnMessage = functions.https.onCall(async (data,context)=>{
    const myData = await users.listUsers();
    return myData;
})
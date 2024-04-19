// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from "firebase/storage";
import { getFunctions } from 'firebase/functions';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0yqeSFPYXTzSqd4taT7V3sTs0CagI35M",
  authDomain: "fir-demo-8e94e.firebaseapp.com",
  projectId: "fir-demo-8e94e",
  storageBucket: "fir-demo-8e94e.appspot.com",
  messagingSenderId: "1047879525664",
  appId: "1:1047879525664:web:19ce4e598ae64b7700a345",
  measurementId: "G-KQJYF6QRYQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth =  getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);
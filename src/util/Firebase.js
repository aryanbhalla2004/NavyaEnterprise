import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/functions";


const app = firebase.initializeApp({
  apiKey: "AIzaSyB9Qe7sf1Nue2Kw4YzdKMzPGBjrhu7eyI8",
  authDomain: "billofsa-ab967.firebaseapp.com",
  projectId: "billofsa-ab967",
  storageBucket: "billofsa-ab967.appspot.com",
  messagingSenderId: "12772061295",
  appId: "1:12772061295:web:d0f2da650eeda88c86dd9a",
  measurementId: "G-B5LRJTYG7K"
});

//auth and firestore references
const db = app.firestore();
const functions = app.functions();
const auth = app.auth();


export {auth, db, firebase, functions};  
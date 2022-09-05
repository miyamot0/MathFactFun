/**
 * Firebase configuration
 */

import firebase from "firebase/app";

import "firebase/firestore";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCR3eIY5kyZMvcQ_co7sVy0KSlp8Talwkw",
  authDomain: "mathfactfun-7a995.firebaseapp.com",
  projectId: "mathfactfun-7a995",
  storageBucket: "mathfactfun-7a995.appspot.com",
  messagingSenderId: "629645985989",
  appId: "1:629645985989:web:e2242b1dd0e2979bb088ac",
};

// Initialize firebase
firebase.initializeApp(firebaseConfig);

// Initialize services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

// Timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp };

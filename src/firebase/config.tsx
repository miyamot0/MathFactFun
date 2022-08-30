/**
 * Firebase configuration
 */

import firebase from "firebase/app";

import "firebase/firestore";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "---------------------",
  authDomain: "---------------------",
  projectId: "---------------------",
  storageBucket: "---------------------",
  messagingSenderId: "---------------------",
  appId: "---------------------",
};

// Initialize firebase
firebase.initializeApp(firebaseConfig);

// Initialize services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

// Timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp };

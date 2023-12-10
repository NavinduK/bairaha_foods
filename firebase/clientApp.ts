// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWCpc79AyLLFA3aToVw-oXhMzG90zOLoo",
  authDomain: "bairahafoods-2192c.firebaseapp.com",
  projectId: "bairahafoods-2192c",
  storageBucket: "bairahafoods-2192c.appspot.com",
  messagingSenderId: "1073862361808",
  appId: "1:1073862361808:web:1d56bec66494e07ef514d5",
  measurementId: "G-SP4BCWEP2F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db, app };

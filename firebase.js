// / Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_YiMJVqnKG3LGnaxvTKicpeV-0_wjSDc",
  authDomain: "facebook-clone-b50b0.firebaseapp.com",
  projectId: "facebook-clone-b50b0",
  storageBucket: "facebook-clone-b50b0.appspot.com",
  messagingSenderId: "893835668752",
  appId: "1:893835668752:web:fdf59506e972b6e6fcc995",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const storage = firebase.storage();

export { storage };
export default db;

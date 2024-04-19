import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
 
  // Import the functions you need from the SDKs you need
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBWO_pWiKk_S4uyRrVgLGHX1ZsxzcyvfxU",
    authDomain: "auth-graph-12a25.firebaseapp.com",
    projectId: "auth-graph-12a25",
    storageBucket: "auth-graph-12a25.appspot.com",
    messagingSenderId: "465560557769",
    appId: "1:465560557769:web:32f8e6a8a8e75c03b9d518",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCN5uJeTJb5h4uEM1Colx31uXu1nPO0Y84",
  authDomain: "umsy-e1fc7.firebaseapp.com",
  projectId: "umsy-e1fc7",
  storageBucket: "umsy-e1fc7.appspot.com",
  messagingSenderId: "614504366508",
  appId: "1:614504366508:web:cb59703af7983911883a09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;

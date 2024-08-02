// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "eclipse-estate-b6a0f.firebaseapp.com",
  projectId: "eclipse-estate-b6a0f",
  storageBucket: "eclipse-estate-b6a0f.appspot.com",
  messagingSenderId: "573408012787",
  appId: "1:573408012787:web:11383780d49fb7e82a8a86"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
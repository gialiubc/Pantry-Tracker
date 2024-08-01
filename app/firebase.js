// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoz4FbcxvBgEMaxihLdgHgRLrGj_UztZA",
  authDomain: "pantry-tracker-84df9.firebaseapp.com",
  projectId: "pantry-tracker-84df9",
  storageBucket: "pantry-tracker-84df9.appspot.com",
  messagingSenderId: "278447615872",
  appId: "1:278447615872:web:ef1ca07bd0dfce04b29b65",
  measurementId: "G-YB0ENDYFH2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
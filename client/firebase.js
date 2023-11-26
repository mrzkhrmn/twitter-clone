// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "twitter-clone-9e78e.firebaseapp.com",
  projectId: "twitter-clone-9e78e",
  storageBucket: "twitter-clone-9e78e.appspot.com",
  messagingSenderId: "959097919697",
  appId: "1:959097919697:web:c43061dd28cbe04b568df0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

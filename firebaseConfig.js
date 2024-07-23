// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBNE6getyPeyruCVEhwdXfAHhANHFh0u8U",
    authDomain: "ft-barapp.firebaseapp.com",
    databaseURL: "https://ft-barapp-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "ft-barapp",
    storageBucket: "ft-barapp.appspot.com",
    messagingSenderId: "153671637980",
    appId: "1:153671637980:web:5ee6449e6e6dd4050bcd19",
    measurementId: "G-T7QYFBVSD9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app); // Initialize Firebase Realtime Database

// Export Firebase Database instance for use in other files
export { app, analytics, database };

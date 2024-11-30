// READ this file to understand the code below.
// This file is responsible for authentication of the user and cloud storage of the user data.

// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Auth, getAuth } from "firebase/auth";
import { FirebaseStorage, getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCtZc-mRs4q5teK19-RXQPARk6Bq70-4m4",
    authDomain: "my-firehomes-app.firebaseapp.com",
    projectId: "my-firehomes-app",
    storageBucket: "my-firehomes-app.firebasestorage.app",
    messagingSenderId: "346686459513",
    appId: "1:346686459513:web:8edf14ca9eace99d644ea8",
    measurementId: "G-ETKVMK61YX"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

let auth: Auth;
let storage: FirebaseStorage;
const currentApp = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);

auth = getAuth(currentApp);
storage = getStorage(currentApp);

// we are only exporting the auth and storage objects because 
// we only need these two objects in our application to operate on client side
export { auth, storage };

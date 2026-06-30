// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// ADD THESE IMPORTS FOR AUTHENTICATION:
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBLig8Lznrb6Yqo4ifaBmnfCz6q73vptok",
    authDomain: "learning-hub-ec41b.firebaseapp.com",
    projectId: "learning-hub-ec41b",
    storageBucket: "learning-hub-ec41b.firebasestorage.app",
    messagingSenderId: "94159229407",
    appId: "1:94159229407:web:305363b5327046fd86f46a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// INITIALIZE AND EXPORT AUTH SERVICE AND PROVIDERS:
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const db = getFirestore(app);
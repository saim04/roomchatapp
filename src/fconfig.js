import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCCpZQJKOsVci1br1tW4nbnG4BgAUbWH8U",
  authDomain: "fir-prac-15219.firebaseapp.com",
  projectId: "fir-prac-15219",
  storageBucket: "fir-prac-15219.appspot.com",
  messagingSenderId: "806708638295",
  appId: "1:806708638295:web:10e95a379ffd316633a912",
  measurementId: "G-3940MS2H4E",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

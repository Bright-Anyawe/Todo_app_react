
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
import db from "firebase/firestore";
import auth from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAwSWLaGrGwIdkddNa6lY880D07mIU-iaA",
  authDomain: "goal-getter-989e7.firebaseapp.com",
  projectId: "goal-getter-989e7",
  storageBucket: "goal-getter-989e7.firebasestorage.app",
  messagingSenderId: "816983066993",
  appId: "1:816983066993:web:8d74a74bc873a70543ced0",
  measurementId: "G-HP32HWY2DP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export {app, analytics, db, auth,  doc, setDoc, getDoc}

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";


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
const db = getFirestore(app); 
const auth = getAuth(app)
const analytics = getAnalytics(app);

export {app, analytics, db, auth,  doc, setDoc, getDoc}
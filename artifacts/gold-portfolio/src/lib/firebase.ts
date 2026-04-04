import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Kullanıcı tarafından sağlanan Client SDK yapılandırması
const firebaseConfig = {
  apiKey: "AIzaSyBlIzfSuUetLfedEi2G_24LD8R0hZXQgfc",
  authDomain: "saygin-gold-website.firebaseapp.com",
  projectId: "saygin-gold-website",
  storageBucket: "saygin-gold-website.firebasestorage.app",
  messagingSenderId: "317780828210",
  appId: "1:317780828210:web:27a5a8c042fd3a46dedc2b",
  measurementId: "G-B4HKY6S0BD"
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
const db = getFirestore(app);
const auth = getAuth(app);

export { app, analytics, db, auth };
export default app;

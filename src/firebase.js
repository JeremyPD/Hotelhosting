import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDJi4_Pk_KQP4Co2xuzmP4SUryr7-9qHBI",
  authDomain: "hotelhosting-c8063.firebaseapp.com",
  projectId: "hotelhosting-c8063",
  storageBucket: "hotelhosting-c8063.appspot.com",
  messagingSenderId: "420721202721",
  appId: "1:420721202721:web:674a0698bec85717c13560",
  measurementId: "G-N285C952FC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

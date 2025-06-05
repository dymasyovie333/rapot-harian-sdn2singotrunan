import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDhcxkFzUD7s4dr-H_AaNANODgcWGB5uxo",
  authDomain: "rapotsdn2singo.firebaseapp.com",
  projectId: "rapotsdn2singo",
  storageBucket: "rapotsdn2singo.firebasestorage.app",
  messagingSenderId: "435445760732",
  appId: "1:435445760732:web:7209cc9893bb5eb2fe2a19",
  measurementId: "G-JMV5GRMGX2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

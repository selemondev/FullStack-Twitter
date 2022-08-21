import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyB95_icYf_eXvUC5vlcuZSlzENCXfBLopQ",
  authDomain: "social-media-app-205e8.firebaseapp.com",
  projectId: "social-media-app-205e8",
  storageBucket: "social-media-app-205e8.appspot.com",
  messagingSenderId: "94332189186",
  appId: "1:94332189186:web:077b10813a557fcb23051b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
export {
    db,
    storage
}
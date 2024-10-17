import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBf8MVYPWcw0SrcoBd8OYzCTJ7EicEl2AA",
  authDomain: "wordle-c4182.firebaseapp.com",
  projectId: "wordle-c4182",
  storageBucket: "wordle-c4182.appspot.com",
  messagingSenderId: "107019789935",
  appId: "1:107019789935:web:2b8efbe0a4379a01848f9a",
  measurementId: "G-CZWL6TRQD6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firestore
const db = getFirestore(app);

export { db };

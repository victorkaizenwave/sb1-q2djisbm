import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAw-FoUVB_Z3CS_oz5o6qb00rhsQe-lD4U",
  authDomain: "kaizen-wave-software.firebaseapp.com",
  projectId: "kaizen-wave-software",
  storageBucket: "kaizen-wave-software.appspot.com",
  messagingSenderId: "49120651199",
  appId: "1:49120651199:web:39a19826da6e511051a30a"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
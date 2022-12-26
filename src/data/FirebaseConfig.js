import { initializeApp } from "@firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getDatabase } from "@firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBAlbSfcLmsqz9S_W4J_TCsX_i481My9MM",
  authDomain: "weedstats-1a033.firebaseapp.com",
  databaseURL:
    "https://weedstats-1a033-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "weedstats-1a033",
  storageBucket: "weedstats-1a033.appspot.com",
  messagingSenderId: "158741630717",
  appId: "1:158741630717:android:81d5c7ffc951c450c6f894",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const firestore = getFirestore();

export { app, db, firestore };

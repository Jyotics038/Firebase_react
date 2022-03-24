import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCGHl27h-36NeQM-sNkIICZbARzxf-XrRg",
    authDomain: "fir-learn-4c1aa.firebaseapp.com",
    projectId: "fir-learn-4c1aa",
    storageBucket: "fir-learn-4c1aa.appspot.com",
    messagingSenderId: "835090418311",
    appId: "1:835090418311:web:9562f45faf12bd50c00622"
  };
  
  const app = initializeApp(firebaseConfig);

  export const db=getFirestore(app);
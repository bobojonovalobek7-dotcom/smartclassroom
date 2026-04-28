import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// BU YERGA O'ZINGIZNING FIREBASE KALITLARINGIZNI QO'YING
// (Arduino kodingizdagi API_KEY va DATABASE_URL bilan mos kelishi kerak)
const firebaseConfig = {
  apiKey: "AIzaSyA3gctj8nnm6pMMso-owslS_Lb95WVTViE",
  authDomain: "smartclassroom-274df.firebaseapp.com",
  databaseURL: "https://smartclassroom-274df-default-rtdb.firebaseio.com",
  projectId: "smartclassroom-274df",
  storageBucket: "smartclassroom-274df.firebasestorage.app",
  messagingSenderId: "696050966221",
  appId: "1:696050966221:web:eed68122b461dbf5a89384"
};

// Firebase-ni ishga tushirish
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };

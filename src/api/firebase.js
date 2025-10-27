import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyAmH4uO0TgGu70iUMDYmd9y_Pmbb2zEq70",
  authDomain: "taskflow-e2ec1.firebaseapp.com",
  databaseURL: "https://taskflow-e2ec1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "taskflow-e2ec1",
  storageBucket: "taskflow-e2ec1.firebasestorage.app",
  messagingSenderId: "501414841947",
  appId: "1:501414841947:web:42646b1d717a946699f97e",
  measurementId: "G-4WC28CRDFN",
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getDatabase(app);

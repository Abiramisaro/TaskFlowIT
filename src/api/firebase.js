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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getDatabase(app);

{/*
  import { getDatabase, ref, set, push, onValue, remove } from "firebase/database";
import { create } from "zustand";
import { app } from "./firebaseConfig"; // your initialized Firebase app

const db = getDatabase(app);

export const useTaskStore = create((set) => ({
  tasks: {},

  // Add task
  addTask: async (task) => {
    try {
      const taskRef = push(ref(db, "tasks")); // creates unique ID
      const taskId = taskRef.key;
      await set(taskRef, { id: taskId, ...task }); // store task with ID
    } catch (err) {
      console.error("Add task error:", err);
    }
  },

  // Fetch tasks in real-time
  fetchTasks: () => {
    const tasksRef = ref(db, "tasks");
    onValue(tasksRef, (snapshot) => {
      const data = snapshot.val() || {};
      set({ tasks: data });
    });
  },

  // Delete task
  deleteTask: async (taskId) => {
    try {
      const taskRef = ref(db, `tasks/${taskId}`);
      await remove(taskRef);
    } catch (err) {
      console.error("Delete task error:", err);
    }
  },
}));

  */}
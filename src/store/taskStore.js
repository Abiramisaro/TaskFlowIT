import { child, get as fbGet, remove as fbRemove, set as fbSet, update as fbUpdate, push, ref } from "firebase/database";
import { create } from "zustand";
import { db } from "../api/firebase";


// export const useTaskStore = create((set, get) => ({
//   tasks: [],
//   loading: false,
//   error: null,

//   // ✅ Create task
//   addTask: async (task) => {
//     try {
//       set({ loading: true });
      
//       const taskRef = push(ref(db, "tasks"));

//       const taskId = taskRef.key;
//       const data = {
//         id: taskId,
//         title: task.title,
//         due_date: task.due_date?.toISOString?.() || new Date().toISOString(),
//         description: task.description,
//         created_date: new Date().toISOString(),
//         status: task.status || "pending",
//       };
//       await fbSet(taskRef, data);
//     } catch (err) {
//       console.error("Add task error:", err);
//       set({ error: err.message });
//     } finally {
//       set({ loading: false });
//     }
//   },

//  fetchTasks: async () => {
//     try {
//       set({ loading: true });
//       const dbRef = ref(db);
//       const snapshot = await fbGet(child(dbRef, "tasks"));

//       if (snapshot.exists()) {
//         const data = snapshot.val();
//         const taskList = Object.keys(data).map((key) => ({
//           id: key,
//           ...data[key],
//         }));
//         set({ tasks: taskList });
//       } else {
//         console.log(" No tasks found in DB");
//         set({ tasks: [] });
//       }
//     } catch (err) {
//       console.error("Fetch tasks error:", err);
//       set({ error: err.message });
//     } finally {
//       set({ loading: false });
//     }
//   },

//   updateTask: async (id, updates) => {
//     try {
//       const taskRef = ref(db, `tasks/${id}`);
//       await fbUpdate(taskRef, updates);
//     } catch (err) {
//       console.error("Update error:", err);
//       set({ error: err.message });
//     }
//   },

//   // ✅ Delete task
//   deleteTask: async (id) => {
//     try {
//       const taskRef = ref(db, `tasks/${id}`);
//       await fbRemove(taskRef);
//       console.log(`🗑️ Task ${id} deleted`);
//     } catch (err) {
//       console.error("❌ Delete error:", err);
//       set({ error: err.message });
//     }
//   },
// }));


import AsyncStorage from "@react-native-async-storage/async-storage";

const TASKS_KEY = "tasks_data";

export const useTaskStore = create((set, get) => ({
  tasks: [],
  loading: false,
  error: null,

  // ✅ Add task (Firebase + AsyncStorage)
  addTask: async (task) => {
    try {
      set({ loading: true });
      const taskRef = push(ref(db, "tasks"));
      const taskId = taskRef.key;

      const data = {
        id: taskId,
        title: task.title,
        due_date: task.due_date?.toISOString?.() || new Date().toISOString(),
        description: task.description,
        created_date: new Date().toISOString(),
        status: task.status || "pending",
      };

      await fbSet(taskRef, data);

      // ✅ Update local storage
      const stored = await AsyncStorage.getItem(TASKS_KEY);
      const tasks = stored ? JSON.parse(stored) : [];
      await AsyncStorage.setItem(TASKS_KEY, JSON.stringify([...tasks, data]));

      // ✅ Update Zustand state immediately
      set((state) => ({ tasks: [...state.tasks, data] }));
    } catch (err) {
      console.error("Add task error:", err);
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  // ✅ Fetch tasks (Firebase → AsyncStorage fallback)
  fetchTasks: async () => {
    try {
      set({ loading: true });
      const dbRef = ref(db);
      const snapshot = await fbGet(child(dbRef, "tasks"));

      if (snapshot.exists()) {
        const data = snapshot.val();
        const taskList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        // ✅ Save to local storage for offline use
        await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(taskList));

        set({ tasks: taskList });
      } else {
        console.log("No tasks found in DB");
        set({ tasks: [] });
        await AsyncStorage.removeItem(TASKS_KEY);
      }
    } catch (err) {
      console.error("Fetch tasks error:", err);

      // 🧠 If Firebase fails, load from AsyncStorage
      const stored = await AsyncStorage.getItem(TASKS_KEY);
      if (stored) {
        const localTasks = JSON.parse(stored);
        console.log("⚙️ Loaded from local cache:", localTasks.length);
        set({ tasks: localTasks });
      }

      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  // ✅ Update task (Firebase + AsyncStorage)
  updateTask: async (id, updates) => {
    try {
      const taskRef = ref(db, `tasks/${id}`);
      await fbUpdate(taskRef, updates);

      // Update AsyncStorage cache
      const stored = await AsyncStorage.getItem(TASKS_KEY);
      const tasks = stored ? JSON.parse(stored) : [];
      const updatedTasks = tasks.map((t) =>
        t.id === id ? { ...t, ...updates } : t
      );
      await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updatedTasks));

      // Update Zustand state
      set({ tasks: updatedTasks });
      console.log("✅ Task updated:", id);
    } catch (err) {
      console.error("Update error:", err);
      set({ error: err.message });
    }
  },

  // ✅ Delete task (Firebase + AsyncStorage)
  deleteTask: async (id) => {
    try {
      const taskRef = ref(db, `tasks/${id}`);
      await fbRemove(taskRef);

      const stored = await AsyncStorage.getItem(TASKS_KEY);
      const tasks = stored ? JSON.parse(stored) : [];
      const filtered = tasks.filter((t) => t.id !== id);
      await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(filtered));

      set({ tasks: filtered });
      console.log(`🗑️ Task ${id} deleted`);
    } catch (err) {
      console.error("❌ Delete error:", err);
      set({ error: err.message });
    }
  },
}));


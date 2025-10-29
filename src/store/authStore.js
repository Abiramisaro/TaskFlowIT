// src/store/authStore.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

export const useAuthStore = create((set, get) => ({
  user: null,
  loggedIn: false,
  loading: false,
  error: null,

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  // ✅ Store user and mark logged in
  setUser: async (user) => {
    try {
      await AsyncStorage.setItem("user_data", JSON.stringify(user));
      set({ user, loggedIn: true, loading: false, error: null });
    } catch (e) {
      console.error("Failed to save user:", e);
    }
  },

  // ✅ Load user from AsyncStorage (used on app launch)
  loadUser: async () => {
    try {
      const savedUser = await AsyncStorage.getItem("user_data");
      if (savedUser) {
        set({ user: JSON.parse(savedUser), loggedIn: true });
      }
    } catch (e) {
      console.error("Failed to load user:", e);
    }
  },

  // ✅ Logout & clear storage
  signOut: async () => {
    try {
      await AsyncStorage.removeItem("user_data");
      set({ user: null, loggedIn: false, loading: false, error: null });
    } catch (e) {
      console.error("Failed to clear user:", e);
    }
  },
}));

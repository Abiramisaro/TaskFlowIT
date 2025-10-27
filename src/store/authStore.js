import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from 'expo-web-browser';
import {
  GoogleAuthProvider,
  signInWithCredential,
  signOut
} from 'firebase/auth';
import { create } from 'zustand';
import auth from '../api/firebase';

WebBrowser.maybeCompleteAuthSession();

export const useAuthStore = create((set) => ({
  isLoggedIn : true,
  user: null,
  loading: false,
  error: null,

  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  signInWithGoogleCredential: async (idToken) => {
    try {
      set({ loading: true });
      const credential = GoogleAuthProvider.credential(idToken);
      const result = await signInWithCredential(auth, credential);
      await AsyncStorage.setItem('user', JSON.stringify(result.user));
      set({ user: result.user });
    } catch (e) {
      console.error('Google sign-in error:', e);
      set({ error: 'Google login failed. Try again.' });
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    await signOut(auth);
    await AsyncStorage.removeItem('user');
    set({ user: null });
  },
}));



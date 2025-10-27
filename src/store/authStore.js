// import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as AuthSession from 'expo-auth-session';
// import { useAuthRequest } from 'expo-auth-session';
// import * as WebBrowser from 'expo-web-browser';
// import { initializeApp } from 'firebase/app';
// import {
//   getReactNativePersistence,
//   GoogleAuthProvider,
//   initializeAuth,
//   signInWithCredential,
//   signOut
// } from 'firebase/auth';
// import { create } from 'zustand';

// WebBrowser.maybeCompleteAuthSession();

// // 🔹 Firebase config
// const firebaseConfig = {
//   apiKey: "AIzaSyAmH4uO0TgGu70iUMDYmd9y_Pmbb2zEq70",
//   authDomain: "taskflow-e2ec1.firebaseapp.com",
//   databaseURL: "https://taskflow-e2ec1-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "taskflow-e2ec1",
//   storageBucket: "taskflow-e2ec1.firebasestorage.app",
//   messagingSenderId: "501414841947",
//   appId: "1:501414841947:web:42646b1d717a946699f97e",
//   measurementId: "G-4WC28CRDFN"
// };

// // 🔹 Initialize Firebase app and Auth with AsyncStorage persistence
// const app = initializeApp(firebaseConfig);
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage),
// });

// // 🔹 Zustand auth store
// export const useAuthStore = create((set) => ({
//   isLoggedIn : false,
//   user: null,
//   loading: false,
//   error: null,

//   loginWithGoogle: async () => {
//     try {
//       set({ loading: true, error: null });

//       // ✅ Use your Web client ID from Firebase Console (not the API key)
//       const WEB_CLIENT_ID = '501414841947-vh4auolmmqgeeo6338qk7el0qr5rbr44.apps.googleusercontent.com';

//       const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });

//       const result = await AuthSession.startAsync({
//         authUrl: `https://accounts.google.com/o/oauth2/v2/auth?` +
//                  `client_id=${WEB_CLIENT_ID}` +
//                  `&redirect_uri=${encodeURIComponent(redirectUri)}` +
//                  `&response_type=token` +
//                  `&scope=profile email`
//       });

//       if (result.type === 'success' && result.params?.access_token) {
//         const accessToken = result.params.access_token;
//         const credential = GoogleAuthProvider.credential(null, accessToken);
//         const res = await signInWithCredential(auth, credential);

//         set({ user: res.user });
//         await AsyncStorage.setItem('user', JSON.stringify(res.user));
//       } else {
//         set({ error: 'Google sign-in cancelled.' });
//       }
//     } catch (err) {
//       console.error('Google login error:', err);
//       set({ error: 'Google sign-in failed. Try again.' });
//     } finally {
//       set({ loading: false });
//     }
//   },

//   logout: async () => {
//     await signOut(auth);
//     await AsyncStorage.removeItem('user');
//     set({ user: null });
//   },
// }));

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

  // ✅ Sign in with Firebase credential
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

  // ✅ Logout
  logout: async () => {
    await signOut(auth);
    await AsyncStorage.removeItem('user');
    set({ user: null });
  },
}));










// src/store/authStore.js
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as AuthSession from 'expo-auth-session';
// import { initializeApp } from 'firebase/app';

// import {
//   getReactNativePersistence,
//   GoogleAuthProvider,
//   initializeAuth,
//   signInWithCredential,
//   signOut,
// } from 'firebase/auth';
// import { create } from 'zustand';

// // 🔹 Firebase config
// const firebaseConfig = {
//     apiKey: "AIzaSyAmH4uO0TgGu70iUMDYmd9y_Pmbb2zEq70",
//   authDomain: "taskflow-e2ec1.firebaseapp.com",
//   databaseURL: "https://taskflow-e2ec1-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "taskflow-e2ec1",
//   storageBucket: "taskflow-e2ec1.firebasestorage.app",
//   messagingSenderId: "501414841947",
//   appId: "1:501414841947:web:42646b1d717a946699f97e",

// };

// // 🔹 Initialize Firebase + Auth
// const app = initializeApp(firebaseConfig);
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage),
// });

// export const useAuthStore = create((set) => (
  
//   {
//   user: null,
//   loading: false,
//   error: null,

//   setUser: (user) => set({ user }),
//   setLoading: (loading) => set({ loading }),
//   setError: (error) => set({ error }),

//   // ✅ Sign in Firebase with Google ID token
//   signInWithGoogleCredential: async (idToken) => {
//     try {
//       set({ loading: true });
//       const credential = GoogleAuthProvider.credential(idToken);
//       const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });
// console.log('Redirect URI:', redirectUri);
//       const result = await signInWithCredential(auth, credential);
//       await AsyncStorage.setItem('user', JSON.stringify(result.user));
//       set({ user: result.user });
//     } catch (err) {
//       console.error('Google login error:', err);
//       set({ error: 'Google login failed. Try again.' });
//     } finally {
//       set({ loading: false });
//     }
//   },

//   // ✅ Logout
//   logout: async () => {
//     await signOut(auth);
//     await AsyncStorage.removeItem('user');
//     set({ user: null });
//   },
// }));

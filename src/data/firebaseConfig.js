import { initializeApp, getApps } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBchC_Z-W_ReGS3w69mm3QbOWdSRX3C6lk",
  authDomain: "geziyolu-903d1.firebaseapp.com",
  projectId: "geziyolu-903d1",
  storageBucket: "geziyolu-903d1.appspot.com",
  messagingSenderId: "127779678299",
  appId: "1:127779678299:android:ee60add53842f2f8bff77e",
};

// Eğer Firebase zaten başlatılmışsa tekrar başlatılmaz
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { app, auth };

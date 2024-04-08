
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";



import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';




 export const firebaseConfig = {
  apiKey: "AIzaSyA6SzL53_CK4alGFxmjDrojCbW6T48ATlI",
  authDomain: "complexivo-947f4.firebaseapp.com",
  projectId: "complexivo-947f4",
  storageBucket: "complexivo-947f4.appspot.com",
  messagingSenderId: "707573369398",
  appId: "1:707573369398:web:4ff385561a75926441e697"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//conecion a base datos
export const db = getDatabase(app)

//export const auth = getAuth(app)
 export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDoNZcnrYRFG6oKjF-9Sze_ScFzmquNrGw",
    authDomain: "productnatura-50dbb.firebaseapp.com",
    projectId: "productnatura-50dbb",
    storageBucket: "productnatura-50dbb.appspot.com",
    messagingSenderId: "439596059350",
    appId: "1:439596059350:web:5f312b57a32584d0b89777"
  };

const firebase = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
//export const auth = getAuth(firebase)

export const auth = initializeAuth(firebase, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
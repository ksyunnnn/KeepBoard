import { initializeApp, FirebaseOptions } from 'firebase/app';
import { getAnalytics as getAnalyticsBase } from 'firebase/analytics';
import {
  getAuth,
  onAuthStateChanged as onAuthStateChangedBase,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as signOutBase,
  UserCredential,
} from 'firebase/auth';

import {
  getFirestore,
  collection as collectionBase,
  getDocs as getDocsBase,
  doc as docBase,

  onSnapshot as onSnapshotBase,
  query as queryBase,
  orderBy as orderByBase,
  where as whereBase,

  addDoc as addDocBase,
  setDoc as setDocBase,
} from 'firebase/firestore';

const config: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(config);

export const getAnalytics = () => getAnalyticsBase(app);

// Firebase Auth
export const auth = getAuth();
export const onAuthStateChanged = onAuthStateChangedBase;
const provider = new GoogleAuthProvider();
export const signIn = () => signInWithPopup(auth, provider);
export const signOut = () => signOutBase(auth);
export const getCredential = (
  result: UserCredential,
) => GoogleAuthProvider.credentialFromResult(result);

// Firestore
export const db = getFirestore();
export const collection = collectionBase;
export const getDocs = getDocsBase;
export const doc = docBase;

export const onSnapshot = onSnapshotBase;

export const addDoc = addDocBase;
export const setDoc = setDocBase;

export const query = queryBase;
export const orderBy = orderByBase;
export const where = whereBase;

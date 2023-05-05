import '@/styles/globals.css'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, provider } from "./firebase";
import Login from "./login";
import Loading from "../components/Loading";
import firebase from "firebase/app";
import { useEffect } from 'react';
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export default function App({ Component, pageProps }) {

  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      setDoc(doc(db, "users", user.uid), {
        email: user.email,
        lastSeen: serverTimestamp(),
        photoURL: user.photoURL
      }, { merge: true });
    }
  }, [user]);

  if(loading) return <Loading />;
  if (!user) return <Login />;

  return <Component {...pageProps} />;
}

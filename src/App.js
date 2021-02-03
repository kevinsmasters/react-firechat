import React, { useState, useEffect } from "react";
// Components
import Button from "./components/Button";
import Channel from "./components/Channel";

// Firebase dependencies
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyBoV_KI13XxbItcp0IEyThuDWgQT7_no4c",
  authDomain: "react-firechat-5218e.firebaseapp.com",
  projectId: "react-firechat-5218e",
  storageBucket: "react-firechat-5218e.appspot.com",
  messagingSenderId: "299249052995",
  appId: "1:299249052995:web:bb6e7a4a01270516d8d3f6"
});

const auth = firebase.auth();
const db = firebase.firestore();

function App() {
  const [user, setUser] = useState(() => auth.currentUser);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      if (initializing) {
        setInitializing(false);
      }
    });
    // Cleanup subscription
    return unsubscribe;
  }, []);
  const signInWithGoogle = async () => {
    // Retrieve Google provider object
    const provider = new firebase.auth.GoogleAuthProvider();
    // Set language to the default browser preferences
    auth.useDeviceLanguage();
    // Start sign in process
    try {
      await auth.signInWithPopup(provider);
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async () => {
      try {
          await firebase.auth().signOut();
      } catch (error) {
          console.log(error.message);
      }
  }

  if (initializing) return "Loading...";

  return (
    <div>
      {user ? (
        <>
            <Button onClick={signOut}>Sign out</Button>
            <Channel user={user} db={db} />
        </>
      ) : (
        <Button onClick={signInWithGoogle}>Sign in with Google</Button>
      )}
    </div>
  );
}

export default App;

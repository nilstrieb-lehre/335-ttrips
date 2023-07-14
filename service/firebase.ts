import { initializeApp, FirebaseApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  UserCredential,
  Auth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getDatabase,
  Database,
  ref,
  set,
  onValue,
  Unsubscribe,
} from "firebase/database";
import React from "react";

class FirebaseService {
  app: FirebaseApp;
  auth: Auth;
  database: Database;

  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyCC8t1qIF3xhhAGc046guRhRDE20gYB8E0",
      authDomain: "trips-335.firebaseapp.com",
      projectId: "trips-335",
      storageBucket: "trips-335.appspot.com",
      messagingSenderId: "1054807503652",
      appId: "1:1054807503652:web:1acb248fccc763137439b1",
      databaseURL:
        "https://trips-335-default-rtdb.europe-west1.firebasedatabase.app/",
    };

    this.app = initializeApp(firebaseConfig);
    this.auth = getAuth(this.app);
    this.database = getDatabase(this.app);
  }

  public createUser(
    email: string,
    password: string,
    setCredentials: (cred: UserCredential) => void,
    setErrorMessage: (err: string) => void,
  ) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then(setCredentials)
      .catch(() =>
        setErrorMessage("Account already exists or password is invalid"),
      );
  }

  public login(
    email: string,
    password: string,
    setCredentials: (cred: UserCredential) => void,
    setErrorMessage: (err: string) => void,
  ) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then(setCredentials)
      .catch(() => setErrorMessage("Invalid username or password"));
  }

  public listenLocations(
    uid: string,
    onChange: (loc: string[]) => void,
  ): Unsubscribe {
    const loc = ref(this.database, `/users/${uid}/locations`);
    return onValue(loc, (snapshot) => onChange(snapshot.val() ?? []));
  }

  public setLocations(uid: string, locations: string[]): Promise<void> {
    const loc = ref(this.database, `/users/${uid}/locations`);
    return set(loc, locations);
  }
}

const CredentialsContext = React.createContext<{
  credentials: UserCredential | null;
  setCredentials: (credentials: UserCredential | null) => void;
}>({ credentials: null, setCredentials: console.error });

function usePredefinedLocations(): string[] {
  return [];
}

const firebase = new FirebaseService();
export { firebase, CredentialsContext, usePredefinedLocations };

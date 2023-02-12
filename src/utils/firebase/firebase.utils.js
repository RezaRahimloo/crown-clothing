

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLxdT-ErjnSkGSdUmL-ccZe1mBPIiaEaQ",
  authDomain: "crown-clothing-db-2c381.firebaseapp.com",
  projectId: "crown-clothing-db-2c381",
  storageBucket: "crown-clothing-db-2c381.appspot.com",
  messagingSenderId: "529285541826",
  appId: "1:529285541826:web:489a4cf8448736906eb05b"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const singInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore(); //singleton instance

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });
  await batch.commit();
}

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(docSnapshot => docSnapshot.data())
  // const categoryMap = querySnapshot.docs.reduce((accumilator, docSnapshot) => {
  //   const { title, items } = docSnapshot.data();
  //   accumilator[title.toLowerCase()] = items;
  //   return accumilator
  // }, {});

  // return categoryMap;

}

export const createUserDocumentFromAuth = async (
  userAuth, 
  additionalInformation = {}) => {//userAuth is the user object returned by google
  if(!userAuth){
    return;
  }

  const userDocRef = doc(db, "users", userAuth.uid);//the database, the collection, the id of the row


  const userSnapShot = await getDoc(userDocRef);


  if(!userSnapShot.exists()){
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try{
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      })
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userDocRef;
}


export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password){
    return;
  }
  return (await createUserWithEmailAndPassword(auth, email, password));
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password){
    return;
  } 
  return (await signInWithEmailAndPassword(auth, email, password));
}

export const signOutUser = async () => {
  return await signOut(auth);
}

export const onAuthStateChangedListener = (callBack) => {
  
  return onAuthStateChanged(auth, callBack);
}
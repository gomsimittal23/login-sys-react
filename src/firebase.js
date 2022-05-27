// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { useEffect, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwiOeEAETNAEwfk4Yg6qEpIhN80p_jG94",
  authDomain: "login-system-4ceef.firebaseapp.com",
  projectId: "login-system-4ceef",
  storageBucket: "login-system-4ceef.appspot.com",
  messagingSenderId: "25315351691",
  appId: "1:25315351691:web:ab557366983d10c5d9888e",
  measurementId: "G-KNNRP3DGPX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage();

export function signup(email, password){
  // console.log(email);
  return createUserWithEmailAndPassword(auth, email, password);
}

export function login(email, password){
  // console.log(email);
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout()
{
  return signOut(auth);
}

export function updateName(user, name)
{
  return updateProfile(user, { displayName: name } );
}

export function useAuth(){
  const [currUser, setCurrUser] = useState();

  useEffect(() => {
    const changes = onAuthStateChanged(auth, user => setCurrUser(user));
    return changes;
  }, []);

  return currUser;
}

export async function upload(image, user, setImgUrl)
{
  // console.log("io")
    const fileRef = ref(storage, user.uid + '.png');
    
    const photo = await uploadBytes(fileRef, image);
    const photoURL = await getDownloadURL(fileRef);

    updateProfile(user, { photoURL: photoURL } );

    // console.log('uploaded');
    // setImgUrl(user.photoURL);
    window.location.reload();
}

const analytics = getAnalytics(app);
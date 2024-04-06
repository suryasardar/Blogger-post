// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup}  from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfCgN6iPDIUFTj9UuaXt1Xz4OIMeSKINo",
  authDomain: "blogger-post-eac84.firebaseapp.com",
  projectId: "blogger-post-eac84",
  storageBucket: "blogger-post-eac84.appspot.com",
  messagingSenderId: "845882619753",
  appId: "1:845882619753:web:d0162b945f580fc2296ff8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//google auth
const provider = new GoogleAuthProvider();

const auth = getAuth();
 export const authWithGoogle = async () => {
    let user = null;
    await signInWithPopup(auth, provider).then((result)=> {
       user=result.user
    }).catch((err) => {
        console.log(err);
    })
    return user;
}
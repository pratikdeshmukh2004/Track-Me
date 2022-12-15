import { useContext, useEffect, useState } from "react";
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, addDoc, collection, getDocs } from "firebase/firestore";
import apiKeys from '../config/keys';
import AuthContext from "../auth/authContext";


const app = initializeApp(apiKeys.firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);

const useAuth = () => {


  const login = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password).then((user) => {
      return user
    })
      .catch((error) => {
        const message = error.message
        if (message.includes("wrong-password")) {
          return "Invalid email password."
        } else if (message.includes("user-not-found")) {
          return "Email doesn't exists."
        } else if (message.includes("invalid-email")) {
          return "Invalid email address."
        } else {
          return error.message
        }
      })
  }

  const register = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password).then((user) => {
      return user
    })
      .catch((error) => {
        console.log(error.message);
        const message = error.message
        if (message.includes("weak-password")){
          console.log(message.split("("));
          return message.split("(")[0]
        }else if(message.includes("email-already")){
          return "Email already exists."
        }
        return error.message
      })
  }

  const logOut = () => {
    signOut(auth)
  }

  return { login, register, auth, logOut, db }

}
export default useAuth;
"use client";

import { FirebaseError } from "firebase/app";
import AuthHelpers from "@/helpers/auth";
import { FormEvent } from "react";

import { fireauth, firestore } from "@/firebase/init";

export default function SignUpPage() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
      username: e.currentTarget.username.value
    }

    console.log(data);
    onSubmit(data);
  }
  
  const onSubmit = async (data: any) => {
    try {
      await AuthHelpers.signUpUserWithEmailAndPassword(fireauth,firestore, data.username, data.email, data.password);
    } catch(e) {
      let toastDescription = "";
      switch ((e as FirebaseError).code) {
        case "auth/invalid-credential":
          toastDescription = "The entered credentials are invalid";
          break;
      
        case "auth/invalid-email":
          toastDescription = `The email ${data.email} is invalid.`
        break;
          
        default:
          toastDescription = "Something went wrong, and it wasn't your fault!"
          break;
      }
    }
  }
  
  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" />
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
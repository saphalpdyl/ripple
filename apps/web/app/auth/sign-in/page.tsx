"use client";

import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FormEvent } from "react";

import { fireauth } from "@/firebase/init";

export default function SignInPage() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      email: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
    }
    onSubmit(data);
  }
  
  const onSubmit = async (data: any) => {
    try {
      await signInWithEmailAndPassword(fireauth, data.email, data.password);
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
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
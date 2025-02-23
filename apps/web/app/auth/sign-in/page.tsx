"use client";

import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { fireauth } from "@/firebase/init";
import { LoginForm } from "@/components/login-form"

export default function SignInPage() {
  const onSubmit = async (data: { email: string; password: string }) => {
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
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm/>
      </div>
    </div>
  )
}
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { FirebaseError } from "firebase/app";
import AuthHelpers from "@/helpers/auth";
import { FormEvent } from "react";

import { fireauth, firestore } from "@/firebase/init";

export default function SignupForum({
  className,
  ...props
}: React.ComponentProps<"div">) {


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
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Sign Up</h1>
                <p className="text-balance text-muted-foreground">
                  Sign up for an Ripple Account
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Username</Label>
                <Input
                  id="username"
                  type="username"
                  placeholder="abc123"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" placeholder="******" required />
              </div>
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
                <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                <a href="/auth/sign-in" className="underline underline-offset-4">
                    Login
                </a>
            </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="https://raw.githubusercontent.com/saphalpdyl/ripple/refs/heads/main/extern/blender/src/img/card.png"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client";

import { DASHBOARD_PAGE_URL, REDIRECT_LOGIN_PAGE_URL } from "@/env";
import { fireauth, firestore } from "@/firebase/init";
import AuthHelpers from "@/helpers/auth";
import { useAuthStore } from "@/store/auth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { signOut } from "firebase/auth";

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode,
}) {
  const {
    setAuth,
    resetAuth,
    auth
  } = useAuthStore();

  useEffect(() => {
    fireauth.onAuthStateChanged(async user => {
      if ( user ) {
        // Try to get the auth user data from firestore
        const firestoreUser = await AuthHelpers.tryGetExistingUserFromFirestore(firestore, user.uid);
        
        if (!firestoreUser) {
          signOut(fireauth);
          return
        } 
        
        setAuth({
          user: user,
          status: "auth",
          data: firestoreUser,
        });
      } else {
        resetAuth();
      }
    })

  }, [resetAuth, setAuth]);

  /** REDIRECTION LOGIC IF NO USER IS PRESENT */
  const urlpathname = usePathname();
  const router = useRouter();
  
  useEffect(() => {
    if ( auth?.status === "auth" && urlpathname.startsWith("/auth")) {
      router.push(DASHBOARD_PAGE_URL);
    }
  }, [auth, router, urlpathname]);

  /** SHOW AUTHENTICATION LOADING WIDGET IF THE FIREBASE IS STILL GETTING THE USER */
  if ( auth === null ) {
    return null;
  }

  if ( auth.status === "anon" && !urlpathname.startsWith("/auth") ) {
    // To preven the bad set-state error
    setTimeout(() => {
      router.push(REDIRECT_LOGIN_PAGE_URL);
    });
    return; 
  }
  
  return children;
}
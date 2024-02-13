import { signInWithPopup, signOut } from "firebase/auth";
import React, { createContext, useContext, useState } from "react";
import { auth, provider } from "../fconfig";
import Cookies from "universal-cookie";

export const FirebaseContext = createContext();
export const useFirebase = () => useContext(FirebaseContext);
const cookies = new Cookies();

export const FirebaseProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (error) {
      console.log(error);
    }
  };
  const signUserOut = async (setRoom) => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  };
  return (
    <FirebaseContext.Provider value={{ signIn, isAuth, signUserOut }}>
      {children}
    </FirebaseContext.Provider>
  );
};

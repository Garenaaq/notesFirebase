import { auth } from "@/services/firebase";
import { signOut } from "firebase/auth";
import { useCallback } from "react";

export const useLogout = () => {
  const logout = useCallback(() => {
    signOut(auth);
  }, []);

  return logout;
};

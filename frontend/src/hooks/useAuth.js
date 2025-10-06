/**
 * useAuth custom hook.
 *
 * Manages Firebase authentication state (user + readiness).
 * Uses browserLocalPersistence for persistent login sessions.
 *
 * Returns: { user, ready } — current user object and load flag.
 */

import { useEffect, useState } from "react";
import { onAuth } from "../services/auth";
import { setPersistence, browserLocalPersistence } from "firebase/auth";
import { auth } from "../firebase";


export default function useAuth() {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let unsubscribe;

    const initAuth = async () => {
      await setPersistence(auth, browserLocalPersistence);
      unsubscribe = onAuth(currentUser => {
        setUser(currentUser);
        setReady(true);
      });
    };

    initAuth();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return { user, ready, isAuthenticated: !!user };
}
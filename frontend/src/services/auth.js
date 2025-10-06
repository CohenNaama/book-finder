/**
 * Authentication service wrapper.
 *
 * Provides Firebase-based auth utilities — sign in, sign up,
 * password reset, and sign out — all as reusable async functions.
 *
 * Abstracts direct Firebase calls for cleaner integration in React components.
 */

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";

export async function signUp(name, email, password) {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    if (name?.trim()) await updateProfile(user, { displayName: name.trim() });
    return user;
  } catch (e) {
    throw new Error(e?.message || "Sign up failed");
  }
}

export async function signIn(email, password) {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (e) {
    throw new Error(e?.message || "Sign in failed");
  }
}

export async function forgotPassword(email) {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (e) {
    throw new Error(e?.message || "Password reset failed");
  }
}

export async function logout() {
  try {
    await signOut(auth);
  } catch (e) {
    throw new Error(e?.message || "Sign out failed");
  }
}

export function onAuth(cb) {
  return onAuthStateChanged(auth, cb);
}

"use server";

import { signIn } from "@/auth";

export const signInWithGoogle = async () => {
  await signIn("google");
}

export const signInWithGithub = async () => {
  await signIn("github");
}

export const connectSpotify = async () => {
  await signIn("spotify", { callbackUrl: "/settings" });
};

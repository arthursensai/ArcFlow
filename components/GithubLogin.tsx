"use client";

import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { signInWithGithub } from "@/lib/SignIn";
import { Github } from "lucide-react";

const GithubLoginButton = () => {
  return (
    <motion.form
      action={signInWithGithub}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        variant="outline"
        type="submit"
        className="bg-glass-week hover:bg-glass-hover hover:text-white px-8 py-4 hover:cursor-pointer w-full"
      >
        <Github />
        Login with Github
      </Button>
    </motion.form>
  );
};

export default GithubLoginButton;

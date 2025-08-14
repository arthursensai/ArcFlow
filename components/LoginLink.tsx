"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const LoginLink = () => {
  const router = useRouter();

  const handleRedirect = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    router.push("/auth");
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="text-white"
    >
      <Button
        onClick={handleRedirect}
        className="bg-glass-cyan hover:bg-glass-hover px-8 py-4 hover:cursor-pointer"
      >
        Login
      </Button>
    </motion.form>
  );
};

export default LoginLink;

"use client";

import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { connectSpotify } from "@/lib/SignIn";

const SpotifyConnectButton = () => {
  return (
    <motion.form
      action={connectSpotify}
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
        className="bg-glass-week text-white hover:bg-glass-hover hover:text-white px-8 py-4 hover:cursor-pointer w-full"
      >
        Connect your Spotify
      </Button>
    </motion.form>
  );
};

export default SpotifyConnectButton;

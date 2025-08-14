"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";

const Clock = () => {
  const [currentHour, setCurrentHour] = useState(0);
  const [currentMinute, setCurrentMinute] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentHour(now.getHours());
      setCurrentMinute(now.getMinutes());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <motion.div
      className="text-8xl font-bold bg-glass-cyan border-4 flex items-center justify-center text-white p-8"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <span>{currentHour < 10 ? `0${currentHour}` : currentHour}</span>
      <span className="animate-dots">:</span>
      <span>{currentMinute < 10 ? `0${currentMinute}` : currentMinute}</span>
      <span className="text-[16px]">{currentHour < 12 ? "AM" : "PM"}</span>
    </motion.div>
  );
};

export default Clock;

"use client";

import { MoveRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Habit } from "@prisma/client";
import { getHabits } from "@/lib/habitsConnections";
import Link from "next/link";

const StartTracking = () => {
  const [habits, setHabits] = useState<Habit[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleLoadingHabits = async () => {
    setLoading(true);
    try {
      const habits = await getHabits();
      setHabits(habits);
    } catch (err) {
      console.error(err);
      setError("err");
    }
    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger
        className="group relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-700 hover:via-blue-600 hover:to-cyan-600 text-white font-bold py-4 px-8 rounded-2xl shadow-[0_0_40px_rgba(59,130,246,0.3)] hover:shadow-[0_0_60px_rgba(6,182,212,0.4)] transition-all duration-500 transform hover:scale-[1.02] active:scale-[0.98] border border-cyan-400/30 hover:border-cyan-300/50 hover:cursor-pointer"
        aria-label="Start time tracking session"
        onClick={handleLoadingHabits}
        disabled={loading}
      >
        {/* Animated shimmer overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

        {/* Inner glow effect */}
        <div className="absolute inset-[1px] rounded-2xl bg-gradient-to-r from-blue-500/20 via-transparent to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative flex items-center gap-4 text-xl tracking-wide">
          <span className="bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent font-extrabold">
            {loading ? "loading" : "Start Tracking"}
          </span>

          {loading ? (
            ""
          ) : (
            <MoveRight className="!w-8 !h-8 group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300 drop-shadow-lg" />
          )}
        </div>

        {/* Subtle border glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-300 -z-10" />
      </DialogTrigger>
      <DialogContent className="bg-glass-strong text-white">
        <DialogHeader>
          <DialogTitle>Your Habits</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-white/90">
          Choose a habit to start your day:
        </DialogDescription>
        <div className="flex w-full flex-col gap-4">
          {habits?.map((habit, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-2 border-2"
            >
              <h3>{habit.title}</h3>
              <Button className="bg-glass hover:cursor-pointer hover:bg-glass-hover">
                <Link
                  className="w-full"
                  href={`/habits/${habit.id}`}
                >
                  Start
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StartTracking;

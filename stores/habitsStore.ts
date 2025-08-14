import { create } from "zustand";

interface Habit {
  id: string;
  title: string;
  description: string;
}

interface HabitState {
  habits: Habit[];
  setHabits: (habits: Habit[]) => void;
  addHabit: (habit: Habit) => void;
}

const useHabits = create<HabitState>((set) => ({
  habits: [],
  setHabits: (habits) => set({ habits }),
  addHabit: (habit) =>
    set((state) => ({ habits: [...state.habits, habit] })),
}));

export default useHabits;
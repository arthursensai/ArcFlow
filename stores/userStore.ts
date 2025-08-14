import { create } from "zustand";

interface userStoreInterface {
  name: string | null;
  email: string | null;
  image: string | null;

  setUser: (name: string, email: string, image: string) => void;
  updateName: (name: string) => void;
}

const userStore = create<userStoreInterface>((set) => ({
  name: null,
  email: null,
  image: null,
  setUser: (name, email, image) => set(() => ({ name, email, image })),
  updateName: (name) => set((state) => ({ ...state, name })),
}));

export default userStore;
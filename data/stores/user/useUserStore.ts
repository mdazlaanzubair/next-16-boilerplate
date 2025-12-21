import { create } from "zustand";
import { UserFullInterface } from "@/types";

interface UserStateInterface {
  user: UserFullInterface | null;
  setUser: (user: UserFullInterface | null) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStateInterface>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));

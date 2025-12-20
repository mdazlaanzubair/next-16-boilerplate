import { create } from "zustand";
import { withPersist } from "../middleware";
import { tokenService } from "@/data/axios/tokenService";
import { User } from "@/types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isHydrated: boolean;

  setUser: (user: User | null) => void;
  logout: () => void;
  markHydrated: () => void;
}

export const useAuthStore = create<AuthState>()(
  withPersist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isHydrated: false,

      setUser: (user) => {
        set({
          user,
          isAuthenticated: Boolean(user),
        });
      },

      logout: () => {
        tokenService.clearTokens();
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      markHydrated: () => {
        set({ isHydrated: true });
      },
    }),
    {
      name: "auth-store",
      partialize: (state): Partial<AuthState> => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.markHydrated();
      },
    }
  )
);

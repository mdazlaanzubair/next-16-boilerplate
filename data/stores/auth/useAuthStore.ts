import { create } from "zustand";
import { withPersist } from "../middleware";
import { tokenService } from "@/data/axios/tokenService";
import { UserShortInterface } from "@/types";

interface AuthStateInterface {
  user: UserShortInterface | null;
  isAuthenticated: boolean;
  isHydrated: boolean;

  setUser: (user: UserShortInterface | null) => void;
  logout: () => void;
  markHydrated: () => void;
}

export const useAuthStore = create<AuthStateInterface>()(
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
      partialize: (state): Partial<AuthStateInterface> => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.markHydrated();
      },
    }
  )
);

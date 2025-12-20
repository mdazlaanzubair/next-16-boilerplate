/*
 ** Why used local storage instead of Zustand persistance:
 ** Interceptors cannot safely depend on Zustand or React, and Zustand persistence alone is not sufficient for axios interceptors.
 ** Using localStorage (or an equivalent synchronous token source) is intentional and safe when used correctly.
 */

const ACCESS_KEY = "app_access_token";
const REFRESH_KEY = "app_refresh_token";

export const tokenService = {
  getAccessToken(): string | null {
    try {
      return typeof window !== "undefined"
        ? localStorage.getItem(ACCESS_KEY)
        : null;
    } catch {
      return null;
    }
  },

  getRefreshToken(): string | null {
    try {
      return typeof window !== "undefined"
        ? localStorage.getItem(REFRESH_KEY)
        : null;
    } catch {
      return null;
    }
  },

  setTokens({
    accessToken,
    refreshToken,
  }: {
    accessToken: string;
    refreshToken?: string;
  }) {
    try {
      if (typeof window === "undefined") return;
      if (accessToken) {
        localStorage.setItem(ACCESS_KEY, accessToken);

        // NEW: mirror tokens into cookies for middleware
        document.cookie = `${ACCESS_KEY}=${accessToken}; path=/; sameSite=lax`;
      }
      if (refreshToken) {
        localStorage.setItem(REFRESH_KEY, refreshToken);

        // NEW: mirror tokens into cookies for middleware
        document.cookie = `${REFRESH_KEY}=${refreshToken}; path=/; sameSite=lax`;
      }
    } catch {
      /* ignore for now */
    }
  },

  clearTokens() {
    try {
      if (typeof window === "undefined") return;
      localStorage.removeItem(ACCESS_KEY);
      localStorage.removeItem(REFRESH_KEY);

      // NEW: clear cookies
      document.cookie = `${ACCESS_KEY}=; path=/; max-age=0`;
      document.cookie = `${REFRESH_KEY}=; path=/; max-age=0`;
    } catch {
      /* ignore */
    }
  },
};

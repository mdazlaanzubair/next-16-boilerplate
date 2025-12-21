import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/data/stores/auth/useAuthStore";
import { tokenService } from "@/data/axios/tokenService";
import { authApi } from "./api";

// Login hook
export function useLogin() {
  // Getting the store setter
  const setUser = useAuthStore((s) => s.setUser);

  // Making API call using react-query hook
  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (res) => {
      const { accessToken, refreshToken, ...user } = res.data; // axios response

      // Setting tokens in the local storage
      tokenService.setTokens({
        accessToken,
        refreshToken,
      });

      // Setting user info in the store
      setUser(user);
    },
  });
}

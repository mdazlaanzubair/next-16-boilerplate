import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/data/stores/auth/useAuthStore";
import { tokenService } from "@/data/axios/tokenService";
import { authApi } from "./api";
import { useEffect } from "react";

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

// Get user info hook
export function useCurrentUser() {
  // Getting the store setter
  const setUser = useAuthStore((s) => s.setUser);

  // Making API call using react-query hook
  const query = useQuery({
    queryKey: ["user_info"],
    queryFn: authApi.getUser,
    retry: false,
  });

  // Performing side-effect to set the value in the store
  // NOTE: Using useEffect cause useQuery v5 don't support onSuccess
  useEffect(() => {
    if (query.data) {
      const data = query.data.data; // axios response

      // Setting user info in the store
      setUser(data);
    }
  }, [query.data, setUser]);

  return query;
}

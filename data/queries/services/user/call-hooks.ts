import { useQuery } from "@tanstack/react-query";
import { authApi } from "./api";
import { useEffect } from "react";
import { useUserStore } from "@/data/stores/user/useUserStore";

// Get user info hook
export function useCurrentUser() {
  // Getting the store setter
  const setUser = useUserStore((s) => s.setUser);

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

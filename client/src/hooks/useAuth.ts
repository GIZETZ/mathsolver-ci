import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ["/api/auth/user"],
    retry: false,
    retryOnMount: false,
    refetchOnWindowFocus: false,
  });

  // If there's a 401 error, the user is not authenticated
  const isAuthError = error && error.message?.includes('401');

  return {
    user,
    isLoading: isLoading && !isAuthError,
    isAuthenticated: !!user,
  };
}

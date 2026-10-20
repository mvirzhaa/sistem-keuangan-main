import { useAuthStore, type LoginRequest, type User } from "../stores/authStore";

export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const activeRole = useAuthStore((state) => state.activeRole);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);
  const isLoginLoading = useAuthStore((state) => state.isLoginLoading);
  const isLogoutLoading = useAuthStore((state) => state.isLogoutLoading);
  const error = useAuthStore((state) => state.error);

  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const setActiveRole = useAuthStore((state) => state.setActiveRole);
  const clearError = useAuthStore((state) => state.clearError);
  const checkAuthStatus = useAuthStore((state) => state.checkAuthStatus);
  const reset = useAuthStore((state) => state.reset);

  const userRoles: string[] = user?.roles || [];

  const hasRole = (role: string): boolean => {
    return userRoles.includes(role);
  };

  const isSuperAdmin = (): boolean => {
    return hasRole("SUPER_ADMIN");
  };

  return {
    // State
    user,
    token,
    activeRole,
    isAuthenticated,
    isLoading,
    isLoginLoading,
    isLogoutLoading,
    error,
    userRoles,

    // Actions
    login,
    logout,
    setActiveRole,
    clearError,
    checkAuthStatus,
    reset,

    // Role helpers
    hasRole,
    isSuperAdmin,
  };
}

export type { User, LoginRequest };
export default useAuth;

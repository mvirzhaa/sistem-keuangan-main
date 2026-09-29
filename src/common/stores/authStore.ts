import { create } from "zustand";
import { persist } from "zustand/middleware";
import { apiService } from "../../common/services/apiService";
import { type ApiError } from "../../common/types/apiTypes";

// Types untuk Auth berdasarkan API response Anda
export interface User {
  id: string;
  email: string;
  nama: string;
  createdAt: string;
  updatedAt: string;
  roles: string[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  expiresIn: string;
}

interface AuthState {
  // Data
  user: User | null;
  token: string | null;
  activeRole: string | null; // Role yang sedang aktif
  isAuthenticated: boolean;

  // Loading states
  isLoading: boolean;
  isLoginLoading: boolean;
  isLogoutLoading: boolean;

  // Error states
  error: string | null;

  // Actions
  login: (
    credentials: LoginRequest,
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  setActiveRole: (role: string) => void;
  clearError: () => void;
  checkAuthStatus: () => void;

  // Reset
  reset: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: null,
      activeRole: null,
      isAuthenticated: false,
      isLoading: false,
      isLoginLoading: false,
      isLogoutLoading: false,
      error: null,

      // Actions
      login: async (credentials) => {
        set({ isLoginLoading: true, error: null });

        try {
          const response = await apiService.post<LoginResponse>(
            "/auth/login",
            credentials,
          );

          const { user, token } = response.data;

          // Set token ke API service dan localStorage
          apiService.setAuthToken(token);

          // Set role pertama sebagai active role
          const activeRole = user.roles.length > 0 ? user.roles[0] : null;

          set({
            user,
            token,
            activeRole,
            isAuthenticated: true,
            isLoginLoading: false,
            error: null,
          });

          return { success: true };
        } catch (error) {
          const apiError = error as ApiError;
          set({
            isLoginLoading: false,
            error: apiError.message,
            isAuthenticated: false,
          });

          return { success: false, error: apiError.message };
        }
      },

      logout: async () => {
        set({ isLogoutLoading: true });

        try {
          // Panggil logout endpoint jika ada
          // await apiService.post('/auth/logout');
        } catch (error) {
          console.error("Logout error:", error);
        } finally {
          // Clear local state dan localStorage
          apiService.clearAuthToken();
          set({
            user: null,
            token: null,
            activeRole: null,
            isAuthenticated: false,
            isLogoutLoading: false,
            error: null,
          });
        }
      },

      setActiveRole: (role: string) => {
        const { user } = get();
        if (user && user.roles.includes(role)) {
          set({ activeRole: role });
        }
      },

      clearError: () => {
        set({ error: null });
      },

      checkAuthStatus: () => {
        const token = apiService.isAuthenticated();
        const { user } = get();

        if (token && user) {
          set({ isAuthenticated: true });
        } else {
          set({
            isAuthenticated: false,
            user: null,
            token: null,
            activeRole: null,
          });
        }
      },

      reset: () => {
        set({
          user: null,
          token: null,
          activeRole: null,
          isAuthenticated: false,
          isLoading: false,
          isLoginLoading: false,
          isLogoutLoading: false,
          error: null,
        });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        activeRole: state.activeRole,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

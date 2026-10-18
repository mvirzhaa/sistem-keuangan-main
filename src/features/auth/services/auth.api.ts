import { apiService } from "../../../common/services/apiService";
import type { ApiResponse } from "../../../common/types/apiTypes";
import type {
  LoginRequest,
  LoginResponse,
  User,
} from "../../../common/stores/authStore";

export const authApi = {
  /**
   * Request login pengguna
   * @param credentials Email dan Password
   */
  login: (credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    return apiService.post<LoginResponse>("/auth/login", credentials);
  },

  /**
   * Request logout dari server
   */
  logout: (): Promise<ApiResponse<void>> => {
    return apiService.post<void>("/auth/logout");
  },

  /**
   * Refresh auth token
   * @param refreshToken Refresh token string
   */
  refreshToken: (
    refreshToken: string,
  ): Promise<ApiResponse<{ access_token: string; refresh_token: string }>> => {
    return apiService.post("/auth/refresh", { refresh_token: refreshToken });
  },

  /**
   * Mengambil data profil user yang sedang login
   */
  getProfile: (): Promise<ApiResponse<User>> => {
    return apiService.get<User>("/auth/profile");
  },
};

export default authApi;

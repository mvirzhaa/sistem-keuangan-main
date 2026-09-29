import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  AxiosError,
} from "axios";
import { type ApiResponse, type ApiError } from "../types/apiTypes";
import { ROUTES } from "../routes/routes";

class ApiService {
  private api: AxiosInstance;
  private readonly baseURL: string;
  private readonly timeout: number;

  constructor() {
    this.baseURL =
      import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";
    this.timeout = parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000;

    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: this.timeout,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor - untuk menambahkan token
    this.api.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Log request untuk development
        if (import.meta.env.DEV) {
          console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`, {
            params: config.params,
            data: config.data,
          });
        }

        return config;
      },
      (error) => {
        console.error("Request interceptor error:", error);
        return Promise.reject(error);
      },
    );

    // Response interceptor - untuk handle error global
    this.api.interceptors.response.use(
      (response: AxiosResponse<ApiResponse>) => {
        // Log response untuk development
        if (import.meta.env.DEV) {
          console.log(
            `✅ ${response.config.method?.toUpperCase()} ${
              response.config.url
            }`,
            response.data,
          );
        }

        return response;
      },
      async (error: AxiosError) => {
        // Handle 401 - Unauthorized (Token invalid/expired)
        if (error.response?.status === 401) {
          console.warn("Token expired or invalid, redirecting to login...");

          // Clear semua data auth
          this.logout();

          // Redirect ke login page
          if (typeof window !== "undefined") {
            window.location.href = ROUTES.LOGIN;
          }

          return Promise.reject(this.handleError(error));
        }

        // Log error untuk development
        if (import.meta.env.DEV) {
          console.error(
            `❌ ${error.config?.method?.toUpperCase()} ${error.config?.url}`,
            {
              status: error.response?.status,
              data: error.response?.data,
            },
          );
        }

        return Promise.reject(this.handleError(error));
      },
    );
  }

  private handleError(error: AxiosError): ApiError {
    if (error.response) {
      // Server responded with error status
      const responseData = error.response.data as any;
      return {
        message: responseData?.message || "Terjadi kesalahan pada server",
        errors: responseData?.errors || [],
      };
    } else if (error.request) {
      // Request was made but no response received
      return {
        message:
          "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.",
      };
    } else {
      // Something else happened
      return {
        message: error.message || "Terjadi kesalahan yang tidak diketahui",
      };
    }
  }

  private getToken(): string | null {
    // Ambil token dari localStorage
    if (typeof window !== "undefined") {
      return localStorage.getItem("auth_token");
    }
    return null;
  }

  private async refreshToken(): Promise<void> {
    const refreshToken =
      typeof window !== "undefined"
        ? localStorage.getItem("refresh_token")
        : null;

    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await this.api.post("/auth/refresh", {
      refresh_token: refreshToken,
    });

    const { access_token, refresh_token: newRefreshToken } = response.data.data;

    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", access_token);
      localStorage.setItem("refresh_token", newRefreshToken);
    }
  }

  private logout(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user_data");
    }
  }

  // Generic HTTP methods
  async get<T = any>(
    endpoint: string,
    params?: Record<string, any>,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    const response = await this.api.get<ApiResponse<T>>(endpoint, {
      params,
      ...config,
    });
    return response.data;
  }

  async post<T = any>(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    const response = await this.api.post<ApiResponse<T>>(
      endpoint,
      data,
      config,
    );
    return response.data;
  }

  async put<T = any>(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    const response = await this.api.put<ApiResponse<T>>(endpoint, data, config);
    return response.data;
  }

  async patch<T = any>(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    const response = await this.api.patch<ApiResponse<T>>(
      endpoint,
      data,
      config,
    );
    return response.data;
  }

  async delete<T = any>(
    endpoint: string,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    const response = await this.api.delete<ApiResponse<T>>(endpoint, config);
    return response.data;
  }

  // File upload method
  async upload<T = any>(
    endpoint: string,
    file: File,
    fieldName: string = "file",
    onUploadProgress?: (progressEvent: any) => void,
  ): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append(fieldName, file);

    const response = await this.api.post<ApiResponse<T>>(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });

    return response.data;
  }

  // Multiple file upload
  async uploadMultiple<T = any>(
    endpoint: string,
    files: File[],
    fieldName: string = "files",
    onUploadProgress?: (progressEvent: any) => void,
  ): Promise<ApiResponse<T>> {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`${fieldName}[${index}]`, file);
    });

    const response = await this.api.post<ApiResponse<T>>(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });

    return response.data;
  }

  // Download file
  async download(
    endpoint: string,
    filename?: string,
    params?: Record<string, any>,
  ): Promise<void> {
    const response = await this.api.get(endpoint, {
      responseType: "blob",
      params,
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename || "download");
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  }

  // Export data (Excel, PDF, etc.)
  async exportData(
    endpoint: string,
    format: "excel" | "pdf" | "csv" = "excel",
    filename?: string,
    params?: Record<string, any>,
  ): Promise<void> {
    const exportParams = {
      format,
      ...params,
    };

    const response = await this.api.get(endpoint, {
      responseType: "blob",
      params: exportParams,
    });

    const contentType = response.headers["content-type"];
    let extension = "xlsx";

    if (contentType?.includes("pdf")) {
      extension = "pdf";
    } else if (contentType?.includes("csv")) {
      extension = "csv";
    }

    const defaultFilename = `export_${new Date()
      .toISOString()
      .slice(0, 10)}.${extension}`;

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename || defaultFilename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  }

  // Utility methods
  getBaseURL(): string {
    return this.baseURL;
  }

  setAuthToken(token: string, refreshToken?: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", token);
      if (refreshToken) {
        localStorage.setItem("refresh_token", refreshToken);
      }
    }
  }

  clearAuthToken(): void {
    this.logout();
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Build query string from object
  buildQueryString(params: Record<string, any>): string {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        searchParams.append(key, String(value));
      }
    });

    return searchParams.toString();
  }

  // Cancel request
  createCancelToken() {
    return axios.CancelToken.source();
  }
}

// Export singleton instance
export const apiService = new ApiService();
export default apiService;

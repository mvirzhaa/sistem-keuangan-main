import {
  useAuthStore,
  type LoginRequest,
} from "../../../common/stores/authStore";

export class AuthController {
  private authStore = useAuthStore;

  async handleLogin(credentials: LoginRequest) {
    const result = await this.authStore.getState().login(credentials);
    return result;
  }

  async handleLogout() {
    await this.authStore.getState().logout();
  }

  clearError() {
    this.authStore.getState().clearError();
  }

  checkAuthStatus() {
    this.authStore.getState().checkAuthStatus();
  }

  // Getters
  getUser() {
    return this.authStore.getState().user;
  }

  getActiveRole() {
    return this.authStore.getState().activeRole;
  }

  setActiveRole(role: string) {
    this.authStore.getState().setActiveRole(role);
    // Force re-render navbar menu setelah role berubah
    window.dispatchEvent(new Event("roleChanged"));
  }

  isAuthenticated() {
    return this.authStore.getState().isAuthenticated;
  }

  getLoadingStates() {
    const { isLoading, isLoginLoading, isLogoutLoading } =
      this.authStore.getState();
    return { isLoading, isLoginLoading, isLogoutLoading };
  }

  getError() {
    return this.authStore.getState().error;
  }

  // Validation helpers
  validateEmail(email: string): string {
    if (!email) return "Email wajib diisi";
    if (!/\S+@\S+\.\S+/.test(email)) return "Format email tidak valid";
    return "";
  }

  validatePassword(password: string): string {
    if (!password) return "Password wajib diisi";
    if (password.length < 6) return "Password minimal 6 karakter";
    return "";
  }

  validateLoginForm(email: string, password: string) {
    const emailError = this.validateEmail(email);
    const passwordError = this.validatePassword(password);

    return {
      email: emailError,
      password: passwordError,
      isValid: !emailError && !passwordError,
    };
  }

  // Helper untuk mendapatkan role user
  getUserRoles() {
    const user = this.getUser();
    return user?.roles || [];
  }

  // Helper untuk mengecek apakah user memiliki role tertentu
  hasRole(role: string) {
    const roles = this.getUserRoles();
    return roles.includes(role);
  }

  // Helper untuk mengecek apakah user adalah super admin
  isSuperAdmin() {
    return this.hasRole("SUPER_ADMIN");
  }
}

export const authController = new AuthController();

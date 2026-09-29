import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff, IoMail, IoLockClosed } from "react-icons/io5";
import TextField from "../../../components/inputs/TextField";
import { useAuthStore } from "../../../common/stores/authStore";
import { authController } from "../controllers/authController";

export default function LoginPage() {
  document.title = "Login - Sistem Keuangan";
  const navigate = useNavigate();

  // Zustand store
  const { isLoginLoading, error, isAuthenticated } = useAuthStore();

  // Local state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // Redirect jika sudah login
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  // Clear error ketika user mengetik
  useEffect(() => {
    if (error) {
      authController.clearError();
    }
  }, [formData.email, formData.password]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear field error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const validation = authController.validateLoginForm(
      formData.email,
      formData.password,
    );

    setErrors({
      email: validation.email,
      password: validation.password,
    });

    return validation.isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const result = await authController.handleLogin({
      email: formData.email,
      password: formData.password,
    });

    if (result.success) {
      navigate("/dashboard");
    }
    // Error akan ditampilkan otomatis dari store
  };

  const handleEnter = (field: string) => {
    if (field === "email") {
      document.getElementById("password")?.focus();
    } else if (field === "password") {
      handleSubmit(new Event("submit") as any);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-xl font-bold">SK</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Sistem Keuangan
          </h1>
          <p className="text-gray-600 text-sm">
            Masuk ke akun Anda untuk melanjutkan
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField
              label="Email"
              type="email"
              placeholder="Masukkan email Anda"
              value={formData.email}
              onChange={(value) => handleInputChange("email", value)}
              onEnter={() => handleEnter("email")}
              leftIcon={<IoMail size={20} />}
              error={errors.email}
              fullWidth
              required
              disabled={isLoginLoading}
            />

            <TextField
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Masukkan password Anda"
              value={formData.password}
              onChange={(value) => handleInputChange("password", value)}
              onEnter={() => handleEnter("password")}
              leftIcon={<IoLockClosed size={20} />}
              rightIcon={
                showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />
              }
              onIconClick={() => setShowPassword(!showPassword)}
              error={errors.password}
              fullWidth
              required
              disabled={isLoginLoading}
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  disabled={isLoginLoading}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-600">Ingat saya</span>
              </label>
              <a
                href="#"
                className="text-sm text-blue-600 hover:text-blue-500 hover:underline"
              >
                Lupa password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoginLoading}
              className={`w-full py-2.5 px-4 rounded-md text-white font-medium transition-colors ${
                isLoginLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              }`}
            >
              {isLoginLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Masuk...
                </div>
              ) : (
                "Masuk"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6 mb-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">atau</span>
              </div>
            </div>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Belum punya akun?{" "}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-500 hover:underline font-medium"
              >
                Daftar sekarang
              </a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            © 2024 Sistem Keuangan. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

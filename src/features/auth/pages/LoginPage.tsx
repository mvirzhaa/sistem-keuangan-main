import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  IoMailOutline,
  IoLockClosedOutline,
  IoEyeOutline,
  IoEyeOffOutline,
  IoTrendingUp,
  IoArrowForward,
} from "react-icons/io5";
import TextField from "../../../components/inputs/TextField";
import { useAuth } from "../hooks/useAuth";
import { validateLoginForm } from "../utils/validation";
import logoUika from "../../../assets/logo-uika.png";
import bgImage from "../../../assets/background-uika.jpg";

export default function LoginPage() {
  document.title = "Login - Sistem Keuangan";
  const navigate = useNavigate();

  // Auth Hook
  const { isLoginLoading, error, isAuthenticated, login, clearError } = useAuth();

  // Local state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
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
      clearError();
    }
  }, [formData.email, formData.password, error, clearError]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear field error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const validation = validateLoginForm(
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

    const result = await login({
      email: formData.email,
      password: formData.password,
    });

    if (result.success) {
      navigate("/dashboard");
    }
  };


  const handleEnter = (field: string) => {
    if (field === "email") {
      document.getElementById("password")?.focus();
    } else if (field === "password") {
      handleSubmit(new Event("submit") as any);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6fa] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 p-3 sm:p-4 lg:p-5 gap-6 lg:gap-8 items-stretch">
          {/* Left Column: Form Section */}
          <div className="flex flex-col justify-center px-4 py-4 sm:px-8 sm:py-6 lg:px-8 lg:py-6">
            {/* Logo / Portal Badge */}
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-base shadow-sm shrink-0">
                <img src={logoUika} alt="Logo Sistem Keuangan UIKA" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold tracking-wider text-[#0b5e42] uppercase">
                  PORTAL KEUANGAN
                </span>
                <span className="text-base font-bold text-gray-900 leading-tight">
                  Universitas Ibn Khaldun Bogor
                </span>
              </div>
            </div>

            {/* Title & Subtitle */}
            <div className="mb-7">
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                Sistem Keuangan
              </h1>
              <p className="text-gray-500 text-sm mt-1.5">
                Masuk ke akun Anda untuk melanjutkan
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 flex items-center space-x-2">
                <span className="font-medium">{error}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <TextField
                id="email"
                label="Email"
                type="email"
                placeholder="Masukkan email Anda"
                value={formData.email}
                onChange={(value) => handleInputChange("email", value)}
                onEnter={() => handleEnter("email")}
                leftIcon={<IoMailOutline size={19} className="text-gray-400" />}
                error={errors.email}
                fullWidth
                required
                disabled={isLoginLoading}
                inputClassName="py-2.5 rounded-xl border-gray-200 focus:border-[#0b5e42] focus:ring-2 focus:ring-[#0b5e42]/20 text-gray-800 placeholder:text-gray-400 text-sm"
              />

              <TextField
                id="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan password Anda"
                value={formData.password}
                onChange={(value) => handleInputChange("password", value)}
                onEnter={() => handleEnter("password")}
                leftIcon={
                  <IoLockClosedOutline size={19} className="text-gray-400" />
                }
                rightIcon={
                  showPassword ? (
                    <IoEyeOffOutline
                      size={19}
                      className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                    />
                  ) : (
                    <IoEyeOutline
                      size={19}
                      className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                    />
                  )
                }
                onIconClick={() => setShowPassword(!showPassword)}
                error={errors.password}
                fullWidth
                required
                disabled={isLoginLoading}
                inputClassName="py-2.5 rounded-xl border-gray-200 focus:border-[#0b5e42] focus:ring-2 focus:ring-[#0b5e42]/20 text-gray-800 placeholder:text-gray-400 text-sm"
              />

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm pt-1">
                <label
                  htmlFor="rememberMe"
                  className="flex items-center cursor-pointer select-none group"
                >
                  <input
                    id="rememberMe"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    disabled={isLoginLoading}
                    className="w-4 h-4 rounded border-gray-300 text-[#0b5e42] focus:ring-[#0b5e42] focus:ring-offset-0 cursor-pointer accent-[#0b5e42]"
                  />
                  <span className="ml-2.5 text-gray-600 group-hover:text-gray-800 transition-colors">
                    Ingat saya
                  </span>
                </label>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="text-[#0b5e42] hover:text-[#084832] font-semibold text-sm transition-colors hover:underline"
                >
                  Lupa password?
                </a>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoginLoading}
                  className={`w-full py-3 px-4 rounded-xl text-white font-semibold text-sm transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-[#0b5e42]/20 ${
                    isLoginLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#0b5e42] hover:bg-[#084832] active:scale-[0.99] cursor-pointer"
                  }`}
                >
                  {isLoginLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                      <span>Memproses...</span>
                    </>
                  ) : (
                    <>
                      <span>Masuk</span>
                      <IoArrowForward className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="relative my-7">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-gray-200" />
              </div>
            </div>

          </div>

          {/* Right Column: Visual Showcase Section */}
          <div className="hidden lg:flex relative rounded-2xl overflow-hidden min-h-[540px] flex-col justify-end p-5 bg-slate-900 border border-slate-800 shadow-inner">
            {/* Background Image */}
            <img
              src={bgImage}
              alt="Sistem Keuangan UIKA"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />

            {/* Dark Gradient Overlay for bottom text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-black/5 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { authController } from "../../features/auth/controllers/authController";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string | string[]; // Bisa string tunggal atau array
  requireAllRoles?: boolean; // Default false (OR logic), true untuk AND logic
}

export default function ProtectedRoute({
  children,
  requiredRole,
  requireAllRoles = false,
}: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  // Check auth status saat component mount
  useEffect(() => {
    authController.checkAuthStatus();
  }, []);

  if (!isAuthenticated) {
    // Redirect ke login dengan state untuk redirect setelah login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role jika diperlukan
  if (requiredRole) {
    const userRoles = authController.getUserRoles();
    let hasAccess = false;

    if (typeof requiredRole === "string") {
      // Single role check
      hasAccess = authController.hasRole(requiredRole);
    } else if (Array.isArray(requiredRole)) {
      // Multiple roles check
      if (requireAllRoles) {
        // AND logic - user harus memiliki SEMUA role yang diperlukan
        hasAccess = requiredRole.every((role) => authController.hasRole(role));
      } else {
        // OR logic - user hanya perlu memiliki SALAH SATU role
        hasAccess = requiredRole.some((role) => authController.hasRole(role));
      }
    }

    if (!hasAccess) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <>{children}</>;
}

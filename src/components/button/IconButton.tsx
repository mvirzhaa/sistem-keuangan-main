import React, { type ReactNode } from "react";

type ColorVariant = "primary" | "secondary" | "success" | "warning" | "danger" | "info" | "light" | "dark";

interface IconButtonProps {
  icon: ReactNode;
  text?: string;
  variant?: ColorVariant;
  onClick?: () => void;
  className?: string;
  responsive?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, text, variant = "primary", onClick, className = "", responsive = true, type = "button", disabled = false }) => {
  // Map variants to Tailwind classes
  const colorMap: Record<ColorVariant, string> = {
    primary: "bg-blue-800 hover:bg-blue-700",
    secondary: "bg-gray-500 hover:bg-gray-400",
    success: "bg-green-600 hover:bg-green-500",
    // warning: "bg-yellow-500 hover:bg-yellow-400",
    warning: "bg-[#E08E0B] hover:bg-[#E08E0B]/80",
    // danger: "bg-red-600 hover:bg-red-500",
    danger: "bg-[#F4543C] hover:bg-[#F4543C]/80",
    info: "bg-blue-500 hover:bg-blue-400",
    light: "bg-gray-200 hover:bg-gray-100 text-gray-800",
    dark: "bg-gray-800 hover:bg-gray-700",
  };

  const baseClasses = "w-fit h-fit flex items-center justify-center text-white px-2 py-1.5 text-sm rounded transition-colors";
  const colorClasses = colorMap[variant];
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${baseClasses} ${colorClasses} ${disabledClasses} ${className}`}>
      {icon}
      {text && <p className={responsive ? "hidden sm:block ml-1" : "ml-1"}>{text}</p>}
    </button>
  );
};

export default IconButton;

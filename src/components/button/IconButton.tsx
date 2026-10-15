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
  title?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  text,
  variant = "primary",
  onClick,
  className = "",
  responsive = true,
  type = "button",
  disabled = false,
  title,
}) => {
  // Map variants to Tailwind classes
  const colorMap: Record<ColorVariant, string> = {
    primary: "bg-blue-800 hover:bg-blue-700",
    secondary: "bg-gray-500 hover:bg-gray-400",
    success: "bg-green-600 hover:bg-green-500",
    warning: "bg-[#E08E0B] hover:bg-[#E08E0B]/80",
    danger: "bg-[#F4543C] hover:bg-[#F4543C]/80",
    info: "bg-[#00c0ef] hover:bg-[#00acd6]",
    light: "bg-gray-200 hover:bg-gray-100 text-gray-800",
    dark: "bg-gray-800 hover:bg-gray-700",
  };

  const baseClasses =
    "h-[34px] flex items-center justify-center text-white text-sm rounded transition-colors cursor-pointer";
  const sizeClasses = text ? "px-3" : "w-[34px] p-0";
  const colorClasses = colorMap[variant];
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      type={type}
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${sizeClasses} ${colorClasses} ${disabledClasses} ${className}`}
    >
      <span className="flex items-center justify-center text-base">
        {icon}
      </span>
      {text && (
        <span
          className={
            responsive ? "hidden sm:inline ml-1.5 font-medium" : "ml-1.5 font-medium"
          }
        >
          {text}
        </span>
      )}
    </button>
  );
};

export default IconButton;

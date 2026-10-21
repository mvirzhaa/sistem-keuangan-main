import React from "react";
import { IoCheckmark } from "react-icons/io5";

interface ToggleProps {
  checked: boolean;
  onChange: () => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  className = "",
}) => {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <button
        type="button"
        onClick={onChange}
        disabled={disabled}
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none cursor-pointer ${
          checked ? "bg-[#2563eb]" : "bg-[#d8dee4]"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <span
          className={`inline-flex items-center justify-center h-4.5 w-4.5 transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out ${
            checked
              ? "translate-x-5.5 text-[#1d4ed8]"
              : "translate-x-1 text-transparent"
          }`}
        >
          {checked && (
            <IoCheckmark className="text-[11px] font-black stroke-[4]" />
          )}
        </span>
      </button>
      <span
        onClick={!disabled ? onChange : undefined}
        className={`text-xs select-none cursor-pointer ${
          checked ? "text-gray-800 font-medium" : "text-gray-600"
        }`}
      >
        {label || (checked ? "Aktif" : "Aktifkan")}
      </span>
    </div>
  );
};

export default Toggle;

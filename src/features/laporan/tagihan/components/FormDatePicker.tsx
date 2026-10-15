import React from "react";
import { IoCalendarOutline } from "react-icons/io5";

interface FormDatePickerProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const FormDatePicker: React.FC<FormDatePickerProps> = ({
  id,
  value,
  onChange,
  placeholder = "dd-mm-yyyy",
}) => {
  return (
    <div className="relative flex items-center border border-gray-300 rounded overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 bg-white">
      <div className="bg-gray-100 border-r border-gray-300 px-3 py-2 text-gray-500 flex items-center justify-center shrink-0">
        <IoCalendarOutline size={18} />
      </div>
      <input
        id={id}
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-1.5 text-sm bg-white text-gray-700 focus:outline-none cursor-pointer"
      />
    </div>
  );
};

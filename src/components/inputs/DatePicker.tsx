import React, { useState, useEffect, useRef } from "react";
import { IoCalendar } from "react-icons/io5";

interface DatePickerProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({ value = "", onChange, placeholder = "dd-mm-yyyy", className = "", disabled = false }) => {
  const [displayValue, setDisplayValue] = useState("");
  const dateInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Format tanggal dari yyyy-mm-dd ke dd-mm-yyyy untuk tampilan
  const formatDateForDisplay = (dateString: string): string => {
    if (!dateString) return "";

    try {
      const [year, month, day] = dateString.split("-");
      if (year && month && day) {
        return `${day}-${month}-${year}`;
      }
    } catch (error) {
      console.error("Error formatting date:", error);
    }

    return dateString;
  };

  // Inisialisasi nilai tampilan saat komponen di-mount atau nilai berubah
  useEffect(() => {
    setDisplayValue(formatDateForDisplay(value));
  }, [value]);

  // Handle perubahan dari date picker
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value; // Format yyyy-mm-dd

    if (onChange) {
      onChange(selectedDate);
    }
  };

  // Untuk fokus pada kalender saat container diklik
  const handleContainerClick = () => {
    if (!disabled && dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
  };

  return (
    <div ref={containerRef} className={`relative ${className}`} onClick={handleContainerClick}>
      <div className="relative border border-gray-300 rounded">
        <input
          ref={dateInputRef}
          type="date"
          value={value}
          onChange={handleDateChange}
          disabled={disabled}
          className={`w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${disabled ? "bg-gray-100 text-gray-500" : ""}`}
          style={{
            // Menyembunyikan tampilan default date input dari browser
            opacity: 0,
            position: "relative",
            zIndex: 1, // Pastikan input tetap dapat diklik
          }}
        />

        {/* Overlay untuk menampilkan tanggal dalam format dd-mm-yyyy */}
        <div className={`absolute inset-0 flex items-center px-3 ${!displayValue ? "text-gray-400" : ""}`} style={{ pointerEvents: "none", zIndex: 0 }}>
          {displayValue || placeholder}
        </div>

        <div className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600 ${disabled ? "text-gray-400" : ""}`} style={{ pointerEvents: "none", zIndex: 2 }}>
          <IoCalendar size={20} />
        </div>
      </div>
    </div>
  );
};

export default DatePicker;

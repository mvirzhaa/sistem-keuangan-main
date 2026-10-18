import React, { useState, useRef, useEffect } from "react";

interface DropdownProps {
  options: string[];
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  placeholder?: string;
  error?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  defaultValue,
  value,
  onChange,
  className = "",
  placeholder = "Pilih opsi",
  error = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    value !== undefined ? value : defaultValue || options[0],
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value !== undefined) {
      setSelectedOption(value);
    } else if (defaultValue !== undefined) {
      setSelectedOption(defaultValue);
    }
  }, [value, defaultValue]);

  useEffect(() => {
    // Handler untuk menutup dropdown jika klik di luar
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    // Tambahkan event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) {
      onChange(option);
    }
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={toggleDropdown}
        className={`w-full flex items-center justify-between px-3 py-1.5 rounded bg-white text-left text-sm whitespace-nowrap focus:outline-none cursor-pointer transition-colors ${
          error
            ? "border border-red-500 ring-1 ring-red-500"
            : "border border-gray-300 focus:border-blue-500"
        }`}
      >
        <span className="truncate mr-1.5">{selectedOption || placeholder}</span>
        <svg
          className={`w-4 h-4 shrink-0 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-1 w-full rounded-md border border-gray-200 bg-white z-50 shadow-xl max-h-60 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option}
              className={`px-4 py-2 text-sm cursor-pointer transition-colors hover:bg-blue-50 ${
                option === selectedOption
                  ? "bg-blue-600 text-white hover:bg-blue-600"
                  : "text-gray-700"
              }`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;

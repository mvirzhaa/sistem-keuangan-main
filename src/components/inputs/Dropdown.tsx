import React, { useState, useRef, useEffect } from "react";

interface DropdownProps {
  options: string[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
  placeholder?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ options, defaultValue, onChange, className = "", placeholder = "Pilih opsi" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultValue || options[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
      <button type="button" onClick={toggleDropdown} className="w-full flex items-center justify-between px-4 py-1.5 border border-gray-300 rounded bg-white text-left text-sm focus:outline-none">
        {selectedOption || placeholder}
        <svg className={`w-4 h-4 ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute mt-1 w-full rounded border border-gray-300 bg-white z-10 shadow-lg">
          {options.map((option) => (
            <div key={option} className={`px-4 py-1.5 cursor-pointer hover:bg-gray-100 ${option === selectedOption ? "bg-blue-500 text-white" : ""}`} onClick={() => handleSelect(option)}>
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;

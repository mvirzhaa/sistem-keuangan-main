import React, { useState, useRef, useEffect } from "react";
import { IoMdSearch } from "react-icons/io";

interface SearchableDropdownProps {
  options: string[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
  placeholder?: string;
  searchPlaceholder?: string;
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({ options, defaultValue, onChange, className = "", placeholder = "Pilih opsi", searchPlaceholder = "Cari..." }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultValue || options[0]);
  const [searchValue, setSearchValue] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter options berdasarkan search term
  const filteredOptions = options.filter((option) => option.toLowerCase().includes(searchValue.toLowerCase()));

  useEffect(() => {
    // Handler untuk menutup dropdown jika klik di luar
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchValue("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Set nilai default jika diberikan
    if (defaultValue) {
      setSelectedOption(defaultValue);
    }
  }, [defaultValue]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchValue("");
    }
  };

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    setSearchValue("");
    if (onChange) {
      onChange(option);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleInputClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Mencegah input click menutup dropdown
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button type="button" onClick={toggleDropdown} className="w-full flex items-center justify-between px-4 py-1.5 border border-gray-300 rounded bg-white text-left text-sm focus:outline-none">
        <span>{selectedOption || placeholder}</span>
        <svg className={`w-4 h-4 ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute mt-1 w-full rounded border border-gray-300 bg-white z-20 shadow-lg overflow-hidden">
          {/* Search input */}
          <div className="relative border-b border-gray-200 p-2">
            <input
              type="text"
              value={searchValue}
              onChange={handleSearchChange}
              onClick={handleInputClick}
              placeholder={searchPlaceholder}
              className="w-full pl-8 pr-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
              autoFocus
            />
            <IoMdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          {/* Options list */}
          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div key={option} className={`px-4 py-2 cursor-pointer ${option === selectedOption ? "bg-blue-500 text-white" : "hover:bg-gray-100"}`} onClick={() => handleSelect(option)}>
                  {option}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-500 text-center">Tidak ditemukan</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown;

import React, { useState, useRef, useEffect } from "react";

interface AutoCompleteProps<T> {
  data?: T[];
  value?: string;
  onChange?: (value: string) => void;
  onSelect?: (item: T) => void;
  getOptionLabel?: (item: T) => string;
  renderOption?: (item: T, inputValue: string) => React.ReactNode;
  placeholder?: string;
  className?: string;
  highlightStyle?: string;
  autoFocus?: boolean;
}

function AutoComplete<T>({
  data = [],
  value = "",
  onChange = () => {},
  onSelect = () => {},
  getOptionLabel = (item: any) => item?.toString() || "",
  renderOption,
  placeholder = "Masukkan NIM / Nama Mahasiswa",
  className = "",
  highlightStyle = "font-bold",
  autoFocus = false,
}: AutoCompleteProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredData, setFilteredData] = useState<T[]>([]);
  const [inputValue, setInputValue] = useState(value);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync internal state with external value
  useEffect(() => {
    if (value !== inputValue) {
      setInputValue(value);
    }
  }, [value]);

  useEffect(() => {
    // Filter data berdasarkan input
    if (inputValue.trim() === "") {
      // Only update filtered data if it's not already empty
      if (filteredData.length > 0) {
        setFilteredData([]);
      }
      return;
    }

    const filtered = data.filter((item) => {
      const label = getOptionLabel(item).toLowerCase();
      return label.includes(inputValue.toLowerCase());
    });

    setFilteredData(filtered.slice(0, 10)); // Batasi hasil ke 10 item
    setIsOpen(filtered.length > 0);
  }, [inputValue, data, getOptionLabel, filteredData.length]);

  useEffect(() => {
    // Close dropdown ketika klik di luar
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Highlight teks yang cocok dengan input
  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;

    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    const parts = text.split(regex);

    return (
      <>
        {parts.map((part, i) =>
          regex.test(part) ? (
            <span key={i} className={highlightStyle}>
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    // Only call external onChange if the value actually changed
    if (newValue !== value) {
      onChange(newValue);
    }
  };

  const handleSelect = (item: T) => {
    onSelect(item);
    setIsOpen(false);
  };

  const defaultRenderOption = (item: T, inputValue: string) => {
    const label = getOptionLabel(item);
    return highlightMatch(label, inputValue);
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleChange}
        onFocus={() => inputValue && setIsOpen(true)}
        placeholder={placeholder}
        className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-sm"
        autoFocus={autoFocus}
      />

      {isOpen && filteredData.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg max-h-72 overflow-auto text-sm">
          {filteredData.map((item, index) => (
            <div key={index} className="px-3 py-2 cursor-pointer hover:bg-gray-100 border-b border-gray-100 last:border-none" onClick={() => handleSelect(item)}>
              {renderOption ? renderOption(item, inputValue) : defaultRenderOption(item, inputValue)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AutoComplete;

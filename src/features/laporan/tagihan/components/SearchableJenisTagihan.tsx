import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { IoChevronDown, IoClose, IoSearch } from "react-icons/io5";

export interface SearchableJenisTagihanRef {
  openDropdown: () => void;
  focus: () => void;
}

interface SearchableJenisTagihanProps {
  id?: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchableJenisTagihan = forwardRef<
  SearchableJenisTagihanRef,
  SearchableJenisTagihanProps
>(({ id = "jenis-tagihan-input", options, value, onChange, placeholder = "Pilih jenis tagihan (opsional)" }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    openDropdown: () => setIsOpen(true),
    focus: () => triggerRef.current?.focus(),
  }));

  // Auto focus search input saat dropdown terbuka
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setSearchQuery("");
    }
  }, [isOpen]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredOptions = options.filter((item) =>
    item.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div ref={containerRef} className="w-full max-w-xl relative">
      <div
        id={id}
        ref={triggerRef}
        tabIndex={0}
        role="button"
        aria-label="Pilih Jenis Tagihan"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full min-h-[38px] px-3 py-2 border border-gray-300 rounded bg-white cursor-pointer flex items-center justify-between text-sm focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500"
      >
        <span className={value ? "text-gray-900" : "text-gray-400"}>
          {value || placeholder}
        </span>
        <div className="flex items-center gap-1.5 ml-2">
          {value && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange("");
              }}
              className="text-gray-400 hover:text-red-500 p-0.5 rounded cursor-pointer"
              title="Hapus pilihan"
            >
              <IoClose size={15} />
            </button>
          )}
          <IoChevronDown
            className={`text-gray-400 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {/* Dropdown with Search */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-30 text-sm overflow-hidden animate-fade-in">
          <div className="p-2 border-b border-gray-200 flex items-center gap-2 bg-gray-50">
            <IoSearch className="text-gray-400 shrink-0" size={16} />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Cari jenis tagihan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="w-full bg-transparent border-none text-xs text-gray-800 placeholder-gray-400 focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-gray-400 hover:text-gray-600 cursor-pointer p-0.5"
              >
                <IoClose size={14} />
              </button>
            )}
          </div>

          <div className="max-h-60 overflow-y-auto py-1">
            {filteredOptions.length === 0 ? (
              <div className="py-6 px-4 text-center text-xs text-gray-400">
                Tidak ada jenis tagihan yang cocok dengan &quot;{searchQuery}&quot;
              </div>
            ) : (
              filteredOptions.map((opt) => {
                const isSelected =
                  value === opt ||
                  (opt === "-- Semua Jenis Tagihan --" && !value);
                return (
                  <div
                    key={opt}
                    onClick={() => {
                      onChange(opt === "-- Semua Jenis Tagihan --" ? "" : opt);
                      setIsOpen(false);
                    }}
                    className={`px-3 py-2 cursor-pointer text-xs flex items-center justify-between hover:bg-blue-50 transition-colors ${
                      isSelected
                        ? "bg-blue-50 text-[#1e3a8a] font-semibold"
                        : "text-gray-700"
                    }`}
                  >
                    <span>{opt}</span>
                    {isSelected && (
                      <span className="text-blue-600 font-bold">✓</span>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
});

SearchableJenisTagihan.displayName = "SearchableJenisTagihan";

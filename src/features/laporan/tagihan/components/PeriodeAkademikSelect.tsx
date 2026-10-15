import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import {
  IoChevronDown,
  IoClose,
  IoInformationCircleOutline,
} from "react-icons/io5";

export interface PeriodeAkademikSelectRef {
  openDropdown: () => void;
  focus: () => void;
}

interface PeriodeAkademikSelectProps {
  id?: string;
  periods: string[];
  selectedPeriods: string[];
  onTogglePeriod: (period: string) => void;
  onRemovePeriod: (period: string, e: React.MouseEvent) => void;
  hasError?: boolean;
}

export const PeriodeAkademikSelect = forwardRef<
  PeriodeAkademikSelectRef,
  PeriodeAkademikSelectProps
>(({ id = "periode-akademik-input", periods, selectedPeriods, onTogglePeriod, onRemovePeriod, hasError }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    openDropdown: () => setIsOpen(true),
    focus: () => boxRef.current?.focus(),
  }));

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

  return (
    <div ref={containerRef} className="relative">
      <div
        id={id}
        ref={boxRef}
        tabIndex={0}
        role="button"
        aria-label="Pilih Periode Akademik"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full min-h-[38px] px-3 py-1.5 border rounded bg-white cursor-pointer flex flex-wrap items-center gap-1.5 text-sm transition-colors ${
          hasError && selectedPeriods.length === 0
            ? "border-red-500 ring-1 ring-red-500"
            : "border-gray-300 focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500"
        }`}
      >
        {selectedPeriods.length === 0 ? (
          <span className="text-gray-400 select-none">
            Pilih periode akademik
          </span>
        ) : (
          selectedPeriods.map((period) => (
            <span
              key={period}
              className="inline-flex items-center gap-1.5 bg-white text-gray-800 border border-gray-300 text-xs font-medium px-2.5 py-1 rounded shadow-xs"
            >
              <span>{period}</span>
              <span
                role="button"
                aria-label={`Hapus ${period}`}
                tabIndex={0}
                className="text-gray-400 hover:text-red-500 cursor-pointer transition-colors"
                onClick={(e) => onRemovePeriod(period, e)}
              >
                <IoClose size={14} />
              </span>
            </span>
          ))
        )}
        <IoChevronDown
          className={`ml-auto text-gray-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 max-h-56 overflow-y-auto bg-white border border-gray-200 rounded shadow-lg z-30 py-1 text-sm animate-fade-in">
          {periods.map((period) => {
            const isSelected = selectedPeriods.includes(period);
            return (
              <div
                key={period}
                onClick={() => onTogglePeriod(period)}
                className={`px-3 py-2 cursor-pointer flex items-center justify-between hover:bg-gray-50 transition-colors ${
                  isSelected
                    ? "bg-gray-100 text-gray-900 font-medium"
                    : "text-gray-700"
                }`}
              >
                <span>{period}</span>
                {isSelected && (
                  <span className="text-blue-600 font-bold text-xs">
                    ✓ Dipilih
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}

      <p className="text-blue-600 text-xs mt-1.5 flex items-center gap-1 font-normal">
        <IoInformationCircleOutline className="text-sm shrink-0" />
        <span>Maksimal memilih 2 periode</span>
      </p>
    </div>
  );
});

PeriodeAkademikSelect.displayName = "PeriodeAkademikSelect";

import React, { useState, useEffect, useRef } from "react";
import BaseModal from "./BaseModal";
import { IoCheckmark, IoClose, IoCalendarOutline } from "react-icons/io5";

export interface SetTanggalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (tanggalFormatted: string, tanggalRaw: string) => void;
  title: string;
  label: string;
  buttonText?: string;
  initialValue?: string;
  loading?: boolean;
}

const SetTanggalModal: React.FC<SetTanggalModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  label,
  buttonText,
  initialValue = "",
  loading = false,
}) => {
  const [selectedDate, setSelectedDate] = useState<string>(initialValue);
  const [displayValue, setDisplayValue] = useState<string>("");
  const dateInputRef = useRef<HTMLInputElement>(null);

  // Format dari yyyy-mm-dd ke dd-mm-yyyy
  const formatDateForDisplay = (val: string) => {
    if (!val) return "";
    const parts = val.split("-");
    if (parts.length === 3) {
      const [year, month, day] = parts;
      return `${day}-${month}-${year}`;
    }
    return val;
  };

  useEffect(() => {
    if (isOpen) {
      setSelectedDate(initialValue);
      setDisplayValue(formatDateForDisplay(initialValue));
    }
  }, [isOpen, initialValue]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value; // yyyy-mm-dd
    setSelectedDate(val);
    setDisplayValue(formatDateForDisplay(val));
  };

  const handleInputBoxClick = () => {
    if (dateInputRef.current) {
      if (typeof dateInputRef.current.showPicker === "function") {
        dateInputRef.current.showPicker();
      } else {
        dateInputRef.current.focus();
      }
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!selectedDate) {
      alert("Silakan pilih tanggal terlebih dahulu.");
      return;
    }
    onSubmit(displayValue || selectedDate, selectedDate);
  };

  const finalButtonText = buttonText || title;

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      showCloseButton={false}
      maxWidth="max-w-[560px]"
      className="p-6 sm:p-7 rounded-2xl"
    >
      {/* Header dengan Judul dan Tombol Tutup X */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
          {title}
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="text-[#2b3a67] hover:text-[#182346] p-1 transition-colors cursor-pointer"
          aria-label="Tutup modal"
        >
          <IoClose size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Form Body: Label di kiri, Input di kanan */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
          <label className="text-[15px] font-semibold text-[#4e73df] sm:w-44 shrink-0">
            {label}
          </label>

          <div
            onClick={handleInputBoxClick}
            className="flex-1 flex items-stretch border border-gray-300 rounded bg-white overflow-hidden cursor-pointer hover:border-gray-400 transition-colors relative"
          >
            {/* Kotak Prefix Ikon Kalender */}
            <div className="bg-[#f8f9fa] border-r border-gray-300 px-3.5 py-2.5 flex items-center justify-center text-gray-500">
              <IoCalendarOutline size={18} />
            </div>

            {/* Input Kalender Asli (disembunyikan transparan tapi tetap klikabel) */}
            <input
              ref={dateInputRef}
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
            />

            {/* Teks Tanggal yang Ditampilkan */}
            <div className="px-3.5 py-2.5 text-sm text-gray-700 flex items-center">
              {displayValue ? (
                <span className="font-normal text-gray-800">{displayValue}</span>
              ) : (
                <span className="text-gray-400 font-normal">dd-mm-yyyy</span>
              )}
            </div>
          </div>
        </div>

        {/* Tombol Aksi di Kanan Bawah */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 bg-[#00a65a] hover:bg-[#008d4c] active:bg-[#00733e] text-white font-medium rounded-lg text-sm flex items-center space-x-1.5 transition-colors cursor-pointer shadow-sm disabled:opacity-50"
          >
            <IoCheckmark size={18} className="font-bold stroke-2" />
            <span>{finalButtonText}</span>
          </button>
        </div>
      </form>
    </BaseModal>
  );
};

export default SetTanggalModal;

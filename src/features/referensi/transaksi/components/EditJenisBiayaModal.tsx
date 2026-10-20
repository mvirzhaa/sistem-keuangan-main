import React, { useState, useEffect, useRef } from "react";
import { IoMdSave } from "react-icons/io";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import BaseModal from "../../../../components/modal/BaseModal";

export interface EditJenisBiayaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (jenisBiaya: string) => void;
  initialValue?: string;
}

const JENIS_BIAYA_OPTIONS = [
  "-- Pilih Jenis Biaya --",
  "Biaya Masuk",
  "Biaya Semester",
  "Biaya Masuk dan Semester",
  "Tidak Dilaporkan",
];

const EditJenisBiayaModal: React.FC<EditJenisBiayaModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialValue = "-- Pilih Jenis Biaya --",
}) => {
  const [selectedValue, setSelectedValue] = useState(initialValue);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Sync state when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedValue(initialValue || "-- Pilih Jenis Biaya --");
      setSearchQuery("");
      setIsOpenDropdown(false);
    }
  }, [isOpen, initialValue]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpenDropdown && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpenDropdown]);

  // Click outside listener for dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpenDropdown(false);
      }
    };

    if (isOpenDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenDropdown]);

  const filteredOptions = JENIS_BIAYA_OPTIONS.filter((option) =>
    option.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSelect = (option: string) => {
    setSelectedValue(option);
    setIsOpenDropdown(false);
  };

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (selectedValue && selectedValue !== "-- Pilih Jenis Biaya --") {
      onSave(selectedValue);
    } else {
      onSave("");
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Jenis Biaya"
      maxWidth="max-w-lg"
      className="p-6 sm:p-7"
    >
      <form onSubmit={handleSave}>
        <div className="flex items-start gap-4 mt-2 mb-8">
          <label className="w-28 pt-2 text-sm font-bold text-[#337ab7]">
            Jenis Biaya
          </label>

          <div className="flex-1 relative" ref={dropdownRef}>
            {/* Trigger Button */}
            <div
              onClick={() => setIsOpenDropdown((prev) => !prev)}
              className={`w-full flex items-center justify-between px-3 py-2 bg-white border ${
                isOpenDropdown
                  ? "border-blue-400 ring-1 ring-blue-300"
                  : "border-gray-300 hover:border-gray-400"
              } rounded cursor-pointer text-sm transition-colors`}
            >
              <span
                className={`${
                  selectedValue === "-- Pilih Jenis Biaya --"
                    ? "text-gray-600"
                    : "text-gray-800 font-medium"
                }`}
              >
                {selectedValue}
              </span>
              <span className="text-gray-500 text-xs">
                {isOpenDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </span>
            </div>

            {/* Dropdown Menu matching Gambar 2 */}
            {isOpenDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-blue-400 rounded shadow-lg z-50 overflow-hidden">
                {/* Search Box inside dropdown */}
                <div className="p-2 border-b border-gray-100">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder=""
                    className="w-full px-2.5 py-1.5 border border-gray-300 rounded text-xs text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300"
                  />
                </div>

                {/* Options List */}
                <div className="max-h-56 overflow-y-auto">
                  {filteredOptions.length === 0 ? (
                    <div className="px-3 py-2 text-xs text-gray-500 text-center">
                      Tidak ada opsi ditemukan
                    </div>
                  ) : (
                    filteredOptions.map((option) => {
                      const isSelected = selectedValue === option;
                      return (
                        <div
                          key={option}
                          onClick={() => handleSelect(option)}
                          className={`px-3.5 py-2 text-sm cursor-pointer transition-colors ${
                            isSelected
                              ? "bg-[#255799] text-white font-medium"
                              : "text-gray-700 hover:bg-blue-50 hover:text-blue-800"
                          }`}
                        >
                          {option}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end pt-2 border-t border-gray-100">
          <button
            type="submit"
            className="bg-[#00a65a] hover:bg-[#008d4c] active:bg-[#00733e] text-white px-5 py-2 rounded font-semibold text-sm flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
          >
            <IoMdSave size={18} />
            <span>Simpan</span>
          </button>
        </div>
      </form>
    </BaseModal>
  );
};

export default EditJenisBiayaModal;

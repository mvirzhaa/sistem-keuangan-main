import React, { useState, useEffect, useRef } from "react";
import { IoMdSave } from "react-icons/io";
import BaseModal from "../../../components/modal/BaseModal";
import type { UktMahasiswaData } from "./UktMahasiswaTable";

interface EditKelompokUktModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    kelompokUkt: string;
    nominalUkt: number;
    valid: boolean;
  }) => void;
  student?: UktMahasiswaData | null;
  targetCount?: number;
}

const KELOMPOK_OPTIONS = [
  "Kelompok 1",
  "Kelompok 2",
  "Kelompok 3",
  "Kelompok 4",
  "Kelompok 5",
  "Kelompok 6",
  "Kelompok 7",
  "Kelompok 8",
];

const KELOMPOK_NOMINAL_MAP: Record<string, number> = {
  "Kelompok 1": 500000,
  "Kelompok 2": 1000000,
  "Kelompok 3": 2500000,
  "Kelompok 4": 3500000,
  "Kelompok 5": 4500000,
  "Kelompok 6": 5500000,
  "Kelompok 7": 6500000,
  "Kelompok 8": 7500000,
};

const EditKelompokUktModal: React.FC<EditKelompokUktModalProps> = ({
  isOpen,
  onClose,
  onSave,
  student,
}) => {
  const [selectedKelompok, setSelectedKelompok] = useState("");
  const [isValidStatus, setIsValidStatus] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync state when student prop changes or modal opens
  useEffect(() => {
    if (isOpen) {
      if (student && student.kelompokUkt) {
        setSelectedKelompok(student.kelompokUkt);
        setSearchTerm(student.kelompokUkt);
        setIsValidStatus(student.valid ?? true);
      } else {
        setSelectedKelompok("");
        setSearchTerm("");
        setIsValidStatus(true);
      }
      setIsDropdownOpen(false);
    }
  }, [student, isOpen]);

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredOptions = KELOMPOK_OPTIONS.filter((opt) =>
    opt.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalKelompok = selectedKelompok || searchTerm || "Kelompok 1";
    const nominal =
      KELOMPOK_NOMINAL_MAP[finalKelompok] ||
      (student && student.nominalUkt ? student.nominalUkt : 2500000);

    onSave({
      kelompokUkt: finalKelompok,
      nominalUkt: nominal,
      valid: isValidStatus,
    });
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Kelompok UKT"
      maxWidth="max-w-2xl"
      className="p-6 sm:p-8"
    >
      <form onSubmit={handleSubmit}>
        <div className="space-y-5 mb-8 mt-2">
          {/* Baris 1: Kelompok UKT */}
          <div className="flex flex-col sm:flex-row sm:items-center">
            <label className="w-40 font-bold text-[#337ab7] text-sm mb-1 sm:mb-0">
              Kelompok UKT
            </label>
            <div className="flex-1 relative" ref={dropdownRef}>
              <input
                type="text"
                placeholder="Pilih atau cari kelompok UKT..."
                value={searchTerm}
                onFocus={() => setIsDropdownOpen(true)}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setSelectedKelompok(e.target.value);
                  setIsDropdownOpen(true);
                }}
                className="w-full border border-gray-300 rounded px-3.5 py-2 text-sm text-gray-800 placeholder-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />

              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto z-30 divide-y divide-gray-100">
                  {filteredOptions.length === 0 ? (
                    <div className="p-3 text-xs text-gray-500 text-center">
                      Tidak ada kelompok ditemukan
                    </div>
                  ) : (
                    filteredOptions.map((opt) => (
                      <div
                        key={opt}
                        onClick={() => {
                          setSelectedKelompok(opt);
                          setSearchTerm(opt);
                          setIsDropdownOpen(false);
                        }}
                        className={`px-3.5 py-2 text-sm cursor-pointer hover:bg-blue-50 transition-colors ${
                          selectedKelompok === opt
                            ? "bg-blue-50 text-blue-700 font-semibold"
                            : "text-gray-700"
                        }`}
                      >
                        {opt}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Baris 2: Valid? */}
          <div className="flex items-center">
            <label className="w-40 font-bold text-[#337ab7] text-sm">
              Valid?
            </label>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="validCheckbox"
                checked={isValidStatus}
                onChange={(e) => setIsValidStatus(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-0 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Footer: Tombol Simpan */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="bg-[#00a65a] hover:bg-[#008d4c] active:bg-[#00733e] text-white px-5 py-2 rounded-md font-semibold text-sm flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
          >
            <IoMdSave size={18} />
            <span>Simpan</span>
          </button>
        </div>
      </form>
    </BaseModal>
  );
};

export default EditKelompokUktModal;

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { IoMdClose } from "react-icons/io";
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

const EditKelompokUktModal: React.FC<EditKelompokUktModalProps> = ({
  isOpen,
  onClose,
  onSave,
  student,
  targetCount = 1,
}) => {
  const [selectedKelompok, setSelectedKelompok] = useState("Kelompok 1");
  const [nominalInput, setNominalInput] = useState("2500000");
  const [isValidStatus, setIsValidStatus] = useState(true);

  // Sync state when student prop changes
  useEffect(() => {
    if (student) {
      setSelectedKelompok(student.kelompokUkt || "Kelompok 1");
      setNominalInput(
        student.nominalUkt ? student.nominalUkt.toString() : "2500000",
      );
      setIsValidStatus(student.valid);
    } else {
      setSelectedKelompok("Kelompok 1");
      setNominalInput("2500000");
      setIsValidStatus(true);
    }
  }, [student, isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nominal = parseInt(nominalInput.replace(/[^\d]/g, ""), 10) || 0;
    onSave({
      kelompokUkt: selectedKelompok,
      nominalUkt: nominal,
      valid: isValidStatus,
    });
  };

  // Render directly into document.body via Portal to guarantee it is above Navbar & everything
  return createPortal(
    <div
      className="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs transition-opacity animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6 relative transition-all transform scale-100 animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">
            {student
              ? `Edit Kelompok - ${student.nama}`
              : `Edit Kelompok UKT (${targetCount} Mahasiswa)`}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl p-1 cursor-pointer transition-colors"
            aria-label="Tutup modal"
          >
            <IoMdClose />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 mb-6 text-sm">
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Kelompok UKT
              </label>
              <select
                value={selectedKelompok}
                onChange={(e) => setSelectedKelompok(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="Kelompok 1">Kelompok 1</option>
                <option value="Kelompok 2">Kelompok 2</option>
                <option value="Kelompok 3">Kelompok 3</option>
                <option value="Kelompok 4">Kelompok 4</option>
                <option value="Kelompok 5">Kelompok 5</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Nominal UKT (Rp)
              </label>
              <input
                type="text"
                value={nominalInput}
                onChange={(e) => {
                  const clean = e.target.value.replace(/[^\d]/g, "");
                  setNominalInput(clean);
                }}
                placeholder="Masukkan nominal UKT"
                className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Status Validasi
              </label>
              <select
                value={isValidStatus ? "valid" : "invalid"}
                onChange={(e) => setIsValidStatus(e.target.value === "valid")}
                className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="valid">Valid (✓)</option>
                <option value="invalid">Belum Valid (✕)</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded text-sm font-medium transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium transition-colors cursor-pointer shadow-sm"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
};

export default EditKelompokUktModal;

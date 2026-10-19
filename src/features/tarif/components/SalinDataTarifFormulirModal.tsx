import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { IoClose, IoCopyOutline } from "react-icons/io5";
import Dropdown from "../../../components/inputs/Dropdown";

export interface SalinDataTarifFormulirModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSalin?: (data: SalinDataTarifFormulirPayload) => void;
  loading?: boolean;
}

export interface SalinDataTarifFormulirPayload {
  dari: {
    periode: string;
    gelombang: string;
    jalur: string;
    sistemKuliah: string;
  };
  ke: {
    periode: string;
    gelombang: string;
    jalur: string;
    sistemKuliah: string;
  };
}

const SalinDataTarifFormulirModal: React.FC<SalinDataTarifFormulirModalProps> = ({
  isOpen,
  onClose,
  onSalin,
  loading = false,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const periodeOptions = [
    "2027 Genap",
    "2027 Ganjil",
    "2026 Genap",
    "2026 Ganjil",
    "2025 Genap",
    "2025 Ganjil",
    "2024 Genap",
    "2024 Ganjil",
  ];

  const gelombangOptions = [
    "Gelombang 1",
    "Gelombang 2",
    "Gelombang 3",
    "Gelombang 4",
  ];

  const jalurOptions = [
    "SBMPTN",
    "SNMPTN",
    "Seleksi Mandiri PTS",
    "Mandiri",
    "Beasiswa",
  ];

  const sistemKuliahOptions = ["Reguler", "Kelas Karyawan", "Online"];

  // Dari state
  const [dari, setDari] = useState({
    periode: "2027 Genap",
    gelombang: "Gelombang 1",
    jalur: "SBMPTN",
    sistemKuliah: "Reguler",
  });

  // Ke state
  const [ke, setKe] = useState({
    periode: "2027 Genap",
    gelombang: "Gelombang 1",
    jalur: "SBMPTN",
    sistemKuliah: "Reguler",
  });

  const handleDariChange = (field: keyof typeof dari, value: string) => {
    setDari((prev) => ({ ...prev, [field]: value }));
  };

  const handleKeChange = (field: keyof typeof ke, value: string) => {
    setKe((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSalin) {
      onSalin({ dari, ke });
    }
    onClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs transition-opacity animate-fade-in overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl p-8 relative transition-all transform scale-100 animate-scale-up my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">
            Salin Data Tarif Formulir
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-[#1a3875] hover:text-blue-950 transition-colors p-1 cursor-pointer"
            aria-label="Tutup modal"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {/* Kolom Kiri: Dari */}
            <div>
              <h3 className="font-bold text-gray-700 text-sm mb-4">Dari</h3>
              <div className="space-y-4">
                {/* Periode */}
                <div className="flex items-center">
                  <label className="w-28 text-blue-600 font-bold text-sm flex-shrink-0">
                    Periode
                  </label>
                  <div className="flex-grow">
                    <Dropdown
                      options={periodeOptions}
                      value={dari.periode}
                      onChange={(val) => handleDariChange("periode", val)}
                      className="w-full text-sm"
                    />
                  </div>
                </div>

                {/* Gelombang */}
                <div className="flex items-center">
                  <label className="w-28 text-blue-600 font-bold text-sm flex-shrink-0">
                    Gelombang
                  </label>
                  <div className="flex-grow">
                    <Dropdown
                      options={gelombangOptions}
                      value={dari.gelombang}
                      onChange={(val) => handleDariChange("gelombang", val)}
                      className="w-full text-sm"
                    />
                  </div>
                </div>

                {/* Jalur */}
                <div className="flex items-center">
                  <label className="w-28 text-blue-600 font-bold text-sm flex-shrink-0">
                    Jalur
                  </label>
                  <div className="flex-grow">
                    <Dropdown
                      options={jalurOptions}
                      value={dari.jalur}
                      onChange={(val) => handleDariChange("jalur", val)}
                      className="w-full text-sm"
                    />
                  </div>
                </div>

                {/* Sistem Kuliah */}
                <div className="flex items-center">
                  <label className="w-28 text-blue-600 font-bold text-sm flex-shrink-0">
                    Sistem Kuliah
                  </label>
                  <div className="flex-grow">
                    <Dropdown
                      options={sistemKuliahOptions}
                      value={dari.sistemKuliah}
                      onChange={(val) => handleDariChange("sistemKuliah", val)}
                      className="w-full text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Kolom Kanan: Ke */}
            <div>
              <h3 className="font-bold text-gray-700 text-sm mb-4">Ke</h3>
              <div className="space-y-4">
                {/* Periode */}
                <div className="flex items-center">
                  <label className="w-28 text-blue-600 font-bold text-sm flex-shrink-0">
                    Periode
                  </label>
                  <div className="flex-grow">
                    <Dropdown
                      options={periodeOptions}
                      value={ke.periode}
                      onChange={(val) => handleKeChange("periode", val)}
                      className="w-full text-sm"
                    />
                  </div>
                </div>

                {/* Gelombang */}
                <div className="flex items-center">
                  <label className="w-28 text-blue-600 font-bold text-sm flex-shrink-0">
                    Gelombang
                  </label>
                  <div className="flex-grow">
                    <Dropdown
                      options={gelombangOptions}
                      value={ke.gelombang}
                      onChange={(val) => handleKeChange("gelombang", val)}
                      className="w-full text-sm"
                    />
                  </div>
                </div>

                {/* Jalur */}
                <div className="flex items-center">
                  <label className="w-28 text-blue-600 font-bold text-sm flex-shrink-0">
                    Jalur
                  </label>
                  <div className="flex-grow">
                    <Dropdown
                      options={jalurOptions}
                      value={ke.jalur}
                      onChange={(val) => handleKeChange("jalur", val)}
                      className="w-full text-sm"
                    />
                  </div>
                </div>

                {/* Sistem Kuliah */}
                <div className="flex items-center">
                  <label className="w-28 text-blue-600 font-bold text-sm flex-shrink-0">
                    Sistem Kuliah
                  </label>
                  <div className="flex-grow">
                    <Dropdown
                      options={sistemKuliahOptions}
                      value={ke.sistemKuliah}
                      onChange={(val) => handleKeChange("sistemKuliah", val)}
                      className="w-full text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Tombol Aksi */}
          <div className="flex justify-end space-x-3 mt-8">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-[#00a65a] hover:bg-[#008d4c] active:bg-[#00733e] text-white font-medium rounded-lg text-sm flex items-center space-x-2 transition-colors cursor-pointer shadow-sm disabled:opacity-50"
            >
              <IoCopyOutline size={18} />
              <span>Salin</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-6 py-2.5 bg-[#2546b3] hover:bg-[#1d3a96] active:bg-[#152a6e] text-white font-medium rounded-lg text-sm flex items-center space-x-2 transition-colors cursor-pointer shadow-sm disabled:opacity-50"
            >
              <IoClose size={18} />
              <span>Batal</span>
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
};

export default SalinDataTarifFormulirModal;

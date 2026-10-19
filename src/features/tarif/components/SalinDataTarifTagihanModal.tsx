import React, { useState } from "react";
import BaseModal from "../../../components/modal/BaseModal";
import { IoClose, IoCopy } from "react-icons/io5";
import Dropdown from "../../../components/inputs/Dropdown";

export interface SalinDataTarifTagihanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSalin?: (data: SalinDataPayload) => void;
  loading?: boolean;
}

export interface SalinDataPayload {
  dari: {
    periodeMasuk: string;
    gelombang: string;
    jalur: string;
    sistemKuliah: string;
    programStudi: string;
    jenisAkun: string;
  };
  ke: {
    periodeMasuk: string;
    gelombang: string;
    jalur: string;
    sistemKuliah: string;
    programStudi: string;
    jenisAkun: string;
  };
}

const SalinDataTarifTagihanModal: React.FC<SalinDataTarifTagihanModalProps> = ({
  isOpen,
  onClose,
  onSalin,
  loading = false,
}) => {
  const periodeOptions = [
    "2027 Genap",
    "2027 Ganjil",
    "2026 Genap",
    "2026 Ganjil",
    "2025 Genap",
    "2025 Ganjil",
    "2024 Genap",
    "2024 Ganjil",
    "2020 Ganjil",
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

  const prodiOptions = [
    "-- Semua Prodi --",
    "Universitas Ibn Khaldun",
    "S1 - Pendidikan Masyarakat",
    "S1 - Kesehatan Masyarakat",
    "S1 - Teknik Informatika",
    "S1 - Manajemen",
    "S1 - Akuntansi",
    "S1 - Ilmu Hukum",
  ];

  const jenisAkunOptions = [
    "-- Semua Jenis Akun --",
    "SPP",
    "PRAKTIKUM PVDF",
    "Biaya Pendaftaran",
    "Biaya Kuliah",
    "Biaya Ujian",
    "Biaya Wisuda",
  ];

  // Dari state
  const [dari, setDari] = useState({
    periodeMasuk: "2027 Genap",
    gelombang: "Gelombang 1",
    jalur: "SBMPTN",
    sistemKuliah: "Reguler",
    programStudi: "-- Semua Prodi --",
    jenisAkun: "-- Semua Jenis Akun --",
  });

  // Ke state
  const [ke, setKe] = useState({
    periodeMasuk: "2027 Genap",
    gelombang: "Gelombang 1",
    jalur: "SBMPTN",
    sistemKuliah: "Reguler",
    programStudi: "-- Semua Prodi --",
    jenisAkun: "-- Semua Jenis Akun --",
  });

  const handleDariChange = (field: keyof typeof dari, value: string) => {
    setDari((prev) => ({ ...prev, [field]: value }));
  };

  const handleKeChange = (field: keyof typeof ke, value: string) => {
    setKe((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (onSalin) {
      onSalin({ dari, ke });
    }
    onClose();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      showCloseButton={false}
      maxWidth="max-w-4xl"
      className="p-6 sm:p-7 rounded-2xl"
    >
      {/* Header Modal */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">
          Salin Data Tarif Tagihan
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Kolom Kiri: Dari */}
          <div>
            <h3 className="font-bold text-gray-800 text-sm mb-4">Dari</h3>
            <div className="space-y-3.5">
              {/* Periode Masuk */}
              <div className="flex items-center">
                <label className="w-32 text-blue-600 font-semibold text-sm flex-shrink-0">
                  Periode Masuk
                </label>
                <div className="flex-grow">
                  <Dropdown
                    options={periodeOptions}
                    value={dari.periodeMasuk}
                    onChange={(val) => handleDariChange("periodeMasuk", val)}
                    className="w-full text-sm"
                  />
                </div>
              </div>

              {/* Gelombang */}
              <div className="flex items-center">
                <label className="w-32 text-blue-600 font-semibold text-sm flex-shrink-0">
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
                <label className="w-32 text-blue-600 font-semibold text-sm flex-shrink-0">
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
                <label className="w-32 text-blue-600 font-semibold text-sm flex-shrink-0">
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

              {/* Program Studi */}
              <div className="flex items-center">
                <label className="w-32 text-blue-600 font-semibold text-sm flex-shrink-0">
                  Program Studi
                </label>
                <div className="flex-grow">
                  <Dropdown
                    options={prodiOptions}
                    value={dari.programStudi}
                    onChange={(val) => handleDariChange("programStudi", val)}
                    className="w-full text-sm"
                  />
                </div>
              </div>

              {/* Jenis Akun */}
              <div className="flex items-center">
                <label className="w-32 text-blue-600 font-semibold text-sm flex-shrink-0">
                  Jenis Akun
                </label>
                <div className="flex-grow">
                  <Dropdown
                    options={jenisAkunOptions}
                    value={dari.jenisAkun}
                    onChange={(val) => handleDariChange("jenisAkun", val)}
                    className="w-full text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Ke */}
          <div>
            <h3 className="font-bold text-gray-800 text-sm mb-4">Ke</h3>
            <div className="space-y-3.5">
              {/* Periode Masuk */}
              <div className="flex items-center">
                <label className="w-32 text-blue-600 font-semibold text-sm flex-shrink-0">
                  Periode Masuk
                </label>
                <div className="flex-grow">
                  <Dropdown
                    options={periodeOptions}
                    value={ke.periodeMasuk}
                    onChange={(val) => handleKeChange("periodeMasuk", val)}
                    className="w-full text-sm"
                  />
                </div>
              </div>

              {/* Gelombang */}
              <div className="flex items-center">
                <label className="w-32 text-blue-600 font-semibold text-sm flex-shrink-0">
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
                <label className="w-32 text-blue-600 font-semibold text-sm flex-shrink-0">
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
                <label className="w-32 text-blue-600 font-semibold text-sm flex-shrink-0">
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

              {/* Program Studi (Disabled) */}
              <div className="flex items-center">
                <label className="w-32 text-blue-600 font-semibold text-sm flex-shrink-0">
                  Program Studi
                </label>
                <div className="flex-grow">
                  <div className="w-full px-4 py-1.5 border border-gray-300 rounded bg-gray-100 text-gray-500 text-sm cursor-not-allowed select-none">
                    -- Semua Prodi --
                  </div>
                </div>
              </div>

              {/* Jenis Akun (Disabled) */}
              <div className="flex items-center">
                <label className="w-32 text-blue-600 font-semibold text-sm flex-shrink-0">
                  Jenis Akun
                </label>
                <div className="flex-grow">
                  <div className="w-full px-4 py-1.5 border border-gray-300 rounded bg-gray-100 text-gray-500 text-sm cursor-not-allowed select-none">
                    -- Semua Jenis Akun --
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Tombol Aksi */}
        <div className="flex justify-end space-x-2.5 pt-6 mt-6 border-t border-gray-100">
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 bg-[#00a65a] hover:bg-[#008d4c] active:bg-[#00733e] text-white font-medium rounded-lg text-sm flex items-center space-x-1.5 transition-colors cursor-pointer shadow-sm disabled:opacity-50"
          >
            <IoCopy size={16} />
            <span>Salin</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-5 py-2.5 bg-[#f4543c] hover:bg-[#dc4232] active:bg-[#c9302c] text-white font-medium rounded-lg text-sm flex items-center space-x-1.5 transition-colors cursor-pointer shadow-sm disabled:opacity-50"
          >
            <IoClose size={18} />
            <span>Batal</span>
          </button>
        </div>
      </form>
    </BaseModal>
  );
};

export default SalinDataTarifTagihanModal;

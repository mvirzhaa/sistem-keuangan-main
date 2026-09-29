import React, { useState } from "react";
import SearchableDropdown from "../../../components/inputs/SearchableDropdown";

interface CariDataMahasiswaCardProps {
  onSearch?: (filters: FilterData) => void;
  className?: string;
}

interface FilterData {
  penerima: string;
  periodeMasuk: string;
  gelombang: string;
  jalurPendaftaran: string;
  sistemKuliah: string;
  programStudi: string;
}

const CariDataMahasiswaCard: React.FC<CariDataMahasiswaCardProps> = ({ onSearch, className = "" }) => {
  const [filters, setFilters] = useState<FilterData>({
    penerima: "Mahasiswa",
    periodeMasuk: "2024 Genap",
    gelombang: "-- Semua --",
    jalurPendaftaran: "-- Semua --",
    sistemKuliah: "-- Semua --",
    programStudi: "-- Semua --",
  });

  // Options untuk dropdown
  const penerimaOptions = ["Mahasiswa", "Pendaftar"];
  const periodeOptions = ["2024 Genap", "2024 Ganjil", "2023 Genap", "2023 Ganjil"];
  const gelombangOptions = ["-- Semua --", "Gelombang 1", "Gelombang 2", "Gelombang 3"];
  const jalurOptions = ["-- Semua --", "PMDK", "Undangan", "Reguler", "Transfer"];
  const sistemOptions = ["-- Semua --", "Reguler", "Kelas Karyawan", "Online"];
  const programOptions = ["-- Semua --", "Teknik Informatika", "Sistem Informasi", "Manajemen", "Akuntansi"];

  // Handle perubahan filter
  const handleFilterChange = (key: keyof FilterData, value: string) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  // Handle submit pencarian
  const handleSubmit = () => {
    if (onSearch) {
      onSearch(filters);
    }
  };

  return (
    <div className={`border-t-4 border-t-amber-500 shadow-md rounded-md p-4 text-xs sm:text-sm ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        {/* Kolom Kiri */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="w-32 font-medium text-amber-600">Penerima</label>
            <SearchableDropdown options={penerimaOptions} defaultValue={filters.penerima} onChange={(value) => handleFilterChange("penerima", value)} className="w-72 sm:w-96" />
          </div>

          <div className="flex items-center justify-between">
            <label className="w-32 font-medium text-amber-600">Gelombang</label>
            <SearchableDropdown options={gelombangOptions} defaultValue={filters.gelombang} onChange={(value) => handleFilterChange("gelombang", value)} className="w-72 sm:w-96" />
          </div>

          <div className="flex items-center justify-between">
            <label className="w-32 font-medium text-amber-600">Sistem Kuliah</label>
            <SearchableDropdown options={sistemOptions} defaultValue={filters.sistemKuliah} onChange={(value) => handleFilterChange("sistemKuliah", value)} className="w-72 sm:w-96" />
          </div>
        </div>

        {/* Kolom Kanan */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="w-32 font-medium text-amber-600">Periode Masuk</label>
            <SearchableDropdown options={periodeOptions} defaultValue={filters.periodeMasuk} onChange={(value) => handleFilterChange("periodeMasuk", value)} className="w-72 sm:w-96" />
          </div>

          <div className="flex items-center justify-between">
            <label className="w-32 font-medium text-amber-600">Jalur Pendaftaran</label>
            <SearchableDropdown options={jalurOptions} defaultValue={filters.jalurPendaftaran} onChange={(value) => handleFilterChange("jalurPendaftaran", value)} className="w-72 sm:w-96" />
          </div>

          <div className="flex items-center justify-between">
            <label className="w-32 font-medium text-amber-600">Program Studi</label>
            <SearchableDropdown options={programOptions} defaultValue={filters.programStudi} onChange={(value) => handleFilterChange("programStudi", value)} className="w-72 sm:w-96" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CariDataMahasiswaCard;

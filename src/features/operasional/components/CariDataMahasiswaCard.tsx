import React, { useState } from "react";
import SearchableDropdown from "../../../components/inputs/SearchableDropdown";

interface CariDataMahasiswaCardProps {
  onSearch?: (filters: FilterData) => void;
  className?: string;
}

export interface FilterData {
  penerima: string;
  periodeMasuk: string;
  gelombang: string;
  jalurPendaftaran: string;
  sistemKuliah: string;
  programStudi: string;
}

interface CariDataMahasiswaCardProps {
  filters?: FilterData;
  onFilterChange?: (filters: FilterData) => void;
  onSearch?: (filters: FilterData) => void;
  className?: string;
}

const CariDataMahasiswaCard: React.FC<CariDataMahasiswaCardProps> = ({
  filters: propFilters,
  onFilterChange,
  onSearch,
  className = "",
}) => {
  const [internalFilters, setInternalFilters] = useState<FilterData>({
    penerima: "Mahasiswa",
    periodeMasuk: "2026 Ganjil",
    gelombang: "-- Semua --",
    jalurPendaftaran: "-- Semua --",
    sistemKuliah: "-- Semua --",
    programStudi: "-- Semua --",
  });

  const activeFilters = propFilters || internalFilters;

  // Options untuk dropdown
  const penerimaOptions = ["Mahasiswa", "Pendaftar"];
  const periodeOptions = [
    "2026 Ganjil",
    "2025 Genap",
    "2025 Ganjil",
    "2024 Genap",
    "2024 Ganjil",
    "2023 Genap",
    "2023 Ganjil",
  ];
  const gelombangOptions = ["-- Semua --", "Gelombang 1", "Gelombang 2", "Gelombang 3"];
  const jalurOptions = [
    "-- Semua --",
    "BEASISWA KIP",
    "SELEKSI MANDIRI",
    "BEASISWA PRESTASI",
    "PMDK",
    "Undangan",
    "Reguler",
    "Transfer",
  ];
  const sistemOptions = ["-- Semua --", "Reguler", "Kelas Karyawan", "Online"];
  const programOptions = [
    "-- Semua --",
    "S2 - Pendidikan Agama Islam (S2)",
    "S1 - Ilmu Hukum",
    "S1 - Teknik Informatika",
    "S1 - Sistem Informasi",
    "S1 - Manajemen",
    "S1 - Akuntansi",
  ];

  // Handle perubahan filter
  const handleFilterChange = (key: keyof FilterData, value: string) => {
    const updated = {
      ...activeFilters,
      [key]: value,
    };
    if (!propFilters) {
      setInternalFilters(updated);
    }
    if (onFilterChange) {
      onFilterChange(updated);
    }
    if (onSearch) {
      onSearch(updated);
    }
  };

  return (
    <div
      className={`border-t-4 border-t-amber-500 shadow-md rounded-md p-4 text-xs sm:text-sm bg-white ${className}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        {/* Kolom Kiri */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="w-32 font-medium text-amber-600">Penerima</label>
            <SearchableDropdown
              options={penerimaOptions}
              value={activeFilters.penerima}
              defaultValue={activeFilters.penerima}
              onChange={(value) => handleFilterChange("penerima", value)}
              className="w-72 sm:w-96"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="w-32 font-medium text-amber-600">Gelombang</label>
            <SearchableDropdown
              options={gelombangOptions}
              value={activeFilters.gelombang}
              defaultValue={activeFilters.gelombang}
              onChange={(value) => handleFilterChange("gelombang", value)}
              className="w-72 sm:w-96"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="w-32 font-medium text-amber-600">Sistem Kuliah</label>
            <SearchableDropdown
              options={sistemOptions}
              value={activeFilters.sistemKuliah}
              defaultValue={activeFilters.sistemKuliah}
              onChange={(value) => handleFilterChange("sistemKuliah", value)}
              className="w-72 sm:w-96"
            />
          </div>
        </div>

        {/* Kolom Kanan */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="w-32 font-medium text-amber-600">Periode Masuk</label>
            <SearchableDropdown
              options={periodeOptions}
              value={activeFilters.periodeMasuk}
              defaultValue={activeFilters.periodeMasuk}
              onChange={(value) => handleFilterChange("periodeMasuk", value)}
              className="w-72 sm:w-96"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="w-32 font-medium text-amber-600">
              Jalur Pendaftaran
            </label>
            <SearchableDropdown
              options={jalurOptions}
              value={activeFilters.jalurPendaftaran}
              defaultValue={activeFilters.jalurPendaftaran}
              onChange={(value) => handleFilterChange("jalurPendaftaran", value)}
              className="w-72 sm:w-96"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="w-32 font-medium text-amber-600">Program Studi</label>
            <SearchableDropdown
              options={programOptions}
              value={activeFilters.programStudi}
              defaultValue={activeFilters.programStudi}
              onChange={(value) => handleFilterChange("programStudi", value)}
              className="w-72 sm:w-96"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CariDataMahasiswaCard;

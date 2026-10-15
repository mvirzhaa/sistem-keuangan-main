import React, { useState } from "react";
import SearchableDropdown from "../../../components/inputs/SearchableDropdown";
import { IoFilter } from "react-icons/io5";

interface FilterDataMonitoringUktProps {
  onFilter?: (filters: FilterValues) => void;
  className?: string;
}

export interface FilterValues {
  penerima: string;
  periodeMasuk: string;
  gelombang: string;
  jalurPendaftaran: string;
  sistemKuliah: string;
  programStudi: string;
  kelompokUkt: string;
}

const FilterDataMonitoringUktCard: React.FC<FilterDataMonitoringUktProps> = ({
  onFilter,
  className = "",
}) => {
  const [filters, setFilters] = useState<FilterValues>({
    penerima: "Mahasiswa",
    periodeMasuk: "2025 Genap",
    gelombang: "Gelombang 1",
    jalurPendaftaran: "-- Semua Jalur Pendaftaran --",
    sistemKuliah: "Reguler Sore",
    programStudi: "Universitas Ibn Khaldun",
    kelompokUkt: "-- Semua Kelompok UKT --",
  });

  // Options untuk dropdown
  const penerimaOptions = ["Mahasiswa", "Dosen", "Tenaga Pendidik"];

  const periodeMasukOptions = [
    "2025 Genap",
    "2025 Ganjil",
    "2024 Genap",
    "2024 Ganjil",
  ];

  const gelombangOptions = ["Gelombang 1", "Gelombang 2", "Gelombang 3"];

  const jalurPendaftaranOptions = [
    "-- Semua Jalur Pendaftaran --",
    "SNMPTN",
    "SBMPTN",
    "Seleksi Mandiri",
  ];

  const sistemKuliahOptions = [
    "Reguler Sore",
    "Reguler Pagi",
    "Kelas Karyawan",
  ];

  const programStudiOptions = [
    "Universitas Ibn Khaldun",
    "S1 - Teknik Informatika",
    "S1 - Sistem Informasi",
    "S1 - Teknik Sipil",
    "S1 - Teknik Mesin",
    "S1 - Akuntansi",
    "S1 - Manajemen",
    "S1 - Ilmu Hukum",
  ];

  const kelompokUktOptions = [
    "-- Semua Kelompok UKT --",
    "Kelompok UKT 1",
    "Kelompok UKT 2",
    "Kelompok UKT 3",
    "Kelompok UKT 4",
    "Kelompok UKT 5",
  ];

  // Handle perubahan filter
  const handleFilterChange = (key: keyof FilterValues, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Handle submit filter
  const handleSubmit = () => {
    if (onFilter) {
      onFilter(filters);
    }
  };

  return (
    <div
      className={`border-t-4 border-t-amber-500 bg-white rounded-md shadow-md p-5 text-xs ${className}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
        {/* Baris 1: Kolom Kiri */}
        <div className="flex items-center">
          <label className="w-36 font-semibold text-amber-600 shrink-0">
            Penerima
          </label>
          <SearchableDropdown
            options={penerimaOptions}
            defaultValue={filters.penerima}
            value={filters.penerima}
            onChange={(value) => handleFilterChange("penerima", value)}
            className="w-full"
          />
        </div>

        {/* Baris 1: Kolom Kanan */}
        <div className="flex items-center">
          <label className="w-36 font-semibold text-amber-600 shrink-0">
            Periode Masuk
          </label>
          <SearchableDropdown
            options={periodeMasukOptions}
            defaultValue={filters.periodeMasuk}
            value={filters.periodeMasuk}
            onChange={(value) => handleFilterChange("periodeMasuk", value)}
            className="w-full"
          />
        </div>

        {/* Baris 2: Kolom Kiri */}
        <div className="flex items-center">
          <label className="w-36 font-semibold text-amber-600 shrink-0">
            Gelombang
          </label>
          <SearchableDropdown
            options={gelombangOptions}
            defaultValue={filters.gelombang}
            value={filters.gelombang}
            onChange={(value) => handleFilterChange("gelombang", value)}
            className="w-full"
          />
        </div>

        {/* Baris 2: Kolom Kanan */}
        <div className="flex items-center">
          <label className="w-36 font-semibold text-amber-600 shrink-0">
            Jalur Pendaftaran
          </label>
          <SearchableDropdown
            options={jalurPendaftaranOptions}
            defaultValue={filters.jalurPendaftaran}
            value={filters.jalurPendaftaran}
            onChange={(value) => handleFilterChange("jalurPendaftaran", value)}
            className="w-full"
          />
        </div>

        {/* Baris 3: Kolom Kiri */}
        <div className="flex items-center">
          <label className="w-36 font-semibold text-amber-600 shrink-0">
            Sistem Kuliah
          </label>
          <SearchableDropdown
            options={sistemKuliahOptions}
            defaultValue={filters.sistemKuliah}
            value={filters.sistemKuliah}
            onChange={(value) => handleFilterChange("sistemKuliah", value)}
            className="w-full"
          />
        </div>

        {/* Baris 3: Kolom Kanan */}
        <div className="flex items-center">
          <label className="w-36 font-semibold text-amber-600 shrink-0">
            Program Studi
          </label>
          <SearchableDropdown
            options={programStudiOptions}
            defaultValue={filters.programStudi}
            value={filters.programStudi}
            onChange={(value) => handleFilterChange("programStudi", value)}
            className="w-full"
          />
        </div>

        {/* Baris 4: Kolom Kiri */}
        <div className="flex items-center">
          <label className="w-36 font-semibold text-amber-600 shrink-0">
            Kelompok UKT
          </label>
          <SearchableDropdown
            options={kelompokUktOptions}
            defaultValue={filters.kelompokUkt}
            value={filters.kelompokUkt}
            onChange={(value) => handleFilterChange("kelompokUkt", value)}
            className="w-full"
          />
        </div>

        {/* Baris 4: Kolom Kanan - Tombol Simpan Filter */}
        <div className="flex justify-end items-center">
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-amber-500 hover:bg-amber-600 text-white font-medium px-4 py-2 rounded-md flex items-center transition-colors cursor-pointer shadow-sm text-xs"
          >
            <IoFilter className="mr-2 text-sm" />
            Simpan Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterDataMonitoringUktCard;

import React, { useState } from "react";
import SearchableDropdown from "../../../components/inputs/SearchableDropdown";
import { IoFilter } from "react-icons/io5";

export interface FilterValues {
  unitKerja: string;
  aturanAkademik: string;
  periodeAkademik: string;
  statusSemester: string;
  angkatan: string;
}

interface FilterDataMonitoringAturanAkademikProps {
  onFilter?: (filters: FilterValues) => void;
  className?: string;
}

const FilterDataMonitoringAturanAkademikCard: React.FC<
  FilterDataMonitoringAturanAkademikProps
> = ({ onFilter, className = "" }) => {
  const [filters, setFilters] = useState<FilterValues>({
    unitKerja: "Universitas Ibn Khaldun",
    aturanAkademik: "KHS - Melihat KHS",
    periodeAkademik: "2027 Genap",
    statusSemester: "-- Semua --",
    angkatan: "-- Semua --",
  });

  // Options untuk dropdown
  const unitKerjaOptions = [
    "Universitas Ibn Khaldun",
    "Fakultas Agama Islam",
    "Fakultas Keguruan dan Ilmu Pendidikan",
    "Fakultas Ekonomi dan Bisnis",
    "Fakultas Teknik dan Sains",
    "Fakultas Hukum",
    "Fakultas Ilmu Kesehatan",
    "Sekolah Pascasarjana",
  ];

  const aturanAkademikOptions = [
    "KHS - Melihat KHS",
    "KRS - Melakukan KRS",
    "UAS - Mengikuti UAS",
    "UTS - Mengikuti UTS",
    "Perwalian - Melakukan Perwalian",
    "KKN - Mengikuti KKN",
  ];

  const periodeAkademikOptions = [
    "2027 Genap",
    "2027 Ganjil",
    "2026 Genap",
    "2026 Ganjil",
    "2025 Genap",
    "2025 Ganjil",
    "2024 Genap",
    "2024 Ganjil",
  ];

  const statusSemesterOptions = [
    "-- Semua --",
    "Aktif",
    "Cuti",
    "Non Aktif",
    "Lulus",
    "Keluar",
    "Drop Out",
  ];

  const angkatanOptions = [
    "-- Semua --",
    "2027 Ganjil",
    "2026 Ganjil",
    "2026 Genap",
    "2025 Ganjil",
    "2025 Genap",
    "2024 Ganjil",
    "2023 Ganjil",
    "2022 Ganjil",
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
            Unit Kerja
          </label>
          <SearchableDropdown
            options={unitKerjaOptions}
            defaultValue={filters.unitKerja}
            value={filters.unitKerja}
            onChange={(value) => handleFilterChange("unitKerja", value)}
            className="w-full"
          />
        </div>

        {/* Baris 1: Kolom Kanan */}
        <div className="flex items-center">
          <label className="w-36 font-semibold text-amber-600 shrink-0">
            Aturan Akademik
          </label>
          <SearchableDropdown
            options={aturanAkademikOptions}
            defaultValue={filters.aturanAkademik}
            value={filters.aturanAkademik}
            onChange={(value) => handleFilterChange("aturanAkademik", value)}
            className="w-full"
          />
        </div>

        {/* Baris 2: Kolom Kiri */}
        <div className="flex items-center">
          <label className="w-36 font-semibold text-amber-600 shrink-0">
            Periode Akademik
          </label>
          <SearchableDropdown
            options={periodeAkademikOptions}
            defaultValue={filters.periodeAkademik}
            value={filters.periodeAkademik}
            onChange={(value) => handleFilterChange("periodeAkademik", value)}
            className="w-full"
          />
        </div>

        {/* Baris 2: Kolom Kanan */}
        <div className="flex items-center">
          <label className="w-36 font-semibold text-amber-600 shrink-0">
            Angkatan
          </label>
          <SearchableDropdown
            options={angkatanOptions}
            defaultValue={filters.angkatan}
            value={filters.angkatan}
            onChange={(value) => handleFilterChange("angkatan", value)}
            className="w-full"
          />
        </div>

        {/* Baris 3: Kolom Kiri */}
        <div className="flex items-center">
          <label className="w-36 font-semibold text-amber-600 shrink-0">
            Status Semester
          </label>
          <SearchableDropdown
            options={statusSemesterOptions}
            defaultValue={filters.statusSemester}
            value={filters.statusSemester}
            onChange={(value) => handleFilterChange("statusSemester", value)}
            className="w-full"
          />
        </div>

        {/* Baris 3: Kolom Kanan - Tombol Simpan Filter */}
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

export default FilterDataMonitoringAturanAkademikCard;

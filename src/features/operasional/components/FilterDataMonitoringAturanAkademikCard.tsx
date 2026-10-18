import React, { useState, useEffect } from "react";
import SearchableDropdown from "../../../components/inputs/SearchableDropdown";
import { IoFilter } from "react-icons/io5";
import { useReferensiStore } from "../../../common/stores/referensiStore";

export interface FilterValues {
  unitKerja: string;
  aturanAkademik: string;
  periodeAkademik: string;
  statusSemester: string;
  angkatan: string;
}

interface FilterDataMonitoringAturanAkademikProps {
  initialFilters?: Partial<FilterValues>;
  onFilter?: (filters: FilterValues) => void;
  className?: string;
}

const FilterDataMonitoringAturanAkademikCard: React.FC<
  FilterDataMonitoringAturanAkademikProps
> = ({ initialFilters, onFilter, className = "" }) => {
  const { data: referensi, fetchReferensi } = useReferensiStore();

  useEffect(() => {
    fetchReferensi();
  }, [fetchReferensi]);

  const [filters, setFilters] = useState<FilterValues>({
    unitKerja: initialFilters?.unitKerja || "Universitas Ibn Khaldun",
    aturanAkademik: initialFilters?.aturanAkademik || "KHS - Melihat KHS",
    periodeAkademik: initialFilters?.periodeAkademik || "-- Semua --",
    statusSemester: initialFilters?.statusSemester || "-- Semua --",
    angkatan: initialFilters?.angkatan || "-- Semua --",
  });

  // Options diambil dari global referensiStore dengan fallback aman
  const unitKerjaOptions =
    referensi.unitKerja && referensi.unitKerja.length > 0
      ? referensi.unitKerja
      : [
          "Universitas Ibn Khaldun",
          "Fakultas Agama Islam",
          "Fakultas Keguruan dan Ilmu Pendidikan",
          "Fakultas Ekonomi dan Bisnis",
          "Fakultas Teknik dan Sains",
          "Fakultas Hukum",
          "Fakultas Ilmu Kesehatan",
          "Sekolah Pascasarjana",
        ];

  const aturanAkademikOptions =
    referensi.aturanAkademik && referensi.aturanAkademik.length > 0
      ? referensi.aturanAkademik.includes("-- Semua --")
        ? referensi.aturanAkademik
        : ["-- Semua --", ...referensi.aturanAkademik]
      : [
          "-- Semua --",
          "KHS - Melihat KHS",
          "KRS - Melakukan KRS",
          "UAS - Mengikuti UAS",
          "UTS - Mengikuti UTS",
          "Perwalian - Melakukan Perwalian",
          "KKN - Mengikuti KKN",
        ];

  const periodeAkademikOptions =
    referensi.periode && referensi.periode.length > 0
      ? referensi.periode.includes("-- Semua --")
        ? referensi.periode
        : ["-- Semua --", ...referensi.periode]
      : [
          "-- Semua --",
          "2026 Ganjil",
          "2026 Genap",
          "2025 Ganjil",
          "2025 Genap",
          "2024 Ganjil",
          "2024 Genap",
          "2023 Ganjil",
          "2023 Genap",
        ];

  const statusSemesterOptions =
    referensi.statusMahasiswa && referensi.statusMahasiswa.length > 0
      ? referensi.statusMahasiswa.includes("-- Semua --")
        ? referensi.statusMahasiswa
        : ["-- Semua --", ...referensi.statusMahasiswa]
      : ["-- Semua --", "Aktif", "Cuti", "Non Aktif", "Lulus", "Keluar", "Drop Out"];

  const angkatanOptions =
    referensi.angkatan && referensi.angkatan.length > 0
      ? referensi.angkatan.includes("-- Semua --")
        ? referensi.angkatan
        : ["-- Semua --", ...referensi.angkatan]
      : [
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
      className={`border-t-4 border-t-amber-500 shadow-md rounded-md p-4 text-xs sm:text-sm bg-white ${className}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        {/* Baris 1: Kolom Kiri */}
        <div className="flex items-center">
          <label className="w-36 font-medium text-amber-600 shrink-0">
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
          <label className="w-36 font-medium text-amber-600 shrink-0">
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
          <label className="w-36 font-medium text-amber-600 shrink-0">
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
          <label className="w-36 font-medium text-amber-600 shrink-0">
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
          <label className="w-36 font-medium text-amber-600 shrink-0">
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

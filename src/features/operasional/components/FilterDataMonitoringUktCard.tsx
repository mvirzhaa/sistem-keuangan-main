import React, { useState, useEffect } from "react";
import SearchableDropdown from "../../../components/inputs/SearchableDropdown";
import { IoFilter } from "react-icons/io5";
import { useReferensiStore } from "../../../common/stores/referensiStore";

interface FilterDataMonitoringUktProps {
  initialFilters?: FilterValues;
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
  initialFilters,
  onFilter,
  className = "",
}) => {
  const { data: referensi, fetchReferensi } = useReferensiStore();

  useEffect(() => {
    fetchReferensi();
  }, [fetchReferensi]);

  const [filters, setFilters] = useState<FilterValues>(
    initialFilters || {
      penerima: "Mahasiswa",
      periodeMasuk: "-- Semua --",
      gelombang: "-- Semua Gelombang --",
      jalurPendaftaran: "-- Semua Jalur Pendaftaran --",
      sistemKuliah: "-- Semua Sistem Kuliah --",
      programStudi: "Universitas Ibn Khaldun",
      kelompokUkt: "-- Semua Kelompok UKT --",
    },
  );

  useEffect(() => {
    if (initialFilters) {
      setFilters(initialFilters);
    }
  }, [initialFilters]);

  // Options diambil dari global referensiStore
  const penerimaOptions = referensi.penerima;
  const periodeMasukOptions = referensi.periode.includes("-- Semua --")
    ? referensi.periode
    : ["-- Semua --", ...referensi.periode];
  const gelombangOptions = [
    "-- Semua Gelombang --",
    ...referensi.gelombang.filter(
      (g) => g !== "-- Semua --" && g !== "-- Semua Gelombang --",
    ),
  ];
  const jalurPendaftaranOptions = [
    "-- Semua Jalur Pendaftaran --",
    ...referensi.jalurPendaftaran.filter(
      (j) => j !== "-- Semua --" && j !== "-- Semua Jalur Pendaftaran --",
    ),
  ];
  const sistemKuliahOptions = [
    "-- Semua Sistem Kuliah --",
    ...referensi.sistemKuliah.filter(
      (s) => s !== "-- Semua --" && s !== "-- Semua Sistem Kuliah --",
    ),
  ];
  const programStudiOptions = referensi.programStudi.filter(
    (p) => p !== "-- Semua --",
  );
  const kelompokUktOptions = referensi.kelompokUkt;

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
          <label className="w-36 font-medium text-amber-600 shrink-0">
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
          <label className="w-36 font-medium text-amber-600 shrink-0">
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
          <label className="w-36 font-medium text-amber-600 shrink-0">
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
          <label className="w-36 font-medium text-amber-600 shrink-0">
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
          <label className="w-36 font-medium text-amber-600 shrink-0">
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
          <label className="w-36 font-medium text-amber-600 shrink-0">
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

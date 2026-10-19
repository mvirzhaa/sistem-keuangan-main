import React, { useState } from "react";
import Dropdown from "../../../components/inputs/Dropdown";
import { IoFilter } from "react-icons/io5";

export interface FilterValues {
  periodeMasuk: string;
  gelombang: string;
  jalurPendaftaran: string;
  sistemKuliah: string;
  programStudi: string;
  jenisAkun: string;
}

interface FilterDataTarifTagihanProps {
  onFilter?: (filters: FilterValues) => void;
  value?: FilterValues;
  onChange?: (key: keyof FilterValues, value: string) => void;
  className?: string;
}

const FilterDataTarifTagihanCard: React.FC<FilterDataTarifTagihanProps> = ({
  onFilter,
  value,
  onChange,
  className = "",
}) => {
  const [internalFilters, setInternalFilters] = useState<FilterValues>({
    periodeMasuk: "-- Semua Periode Masuk --",
    gelombang: "-- Semua Gelombang --",
    jalurPendaftaran: "-- Semua Jalur Pendaftaran --",
    sistemKuliah: "-- Semua Sistem Kuliah --",
    programStudi: "Universitas Ibn Khaldun",
    jenisAkun: "-- Semua Jenis Akun --",
  });

  const filters = value || internalFilters;

  // Options untuk dropdown
  const periodeMasukOptions = [
    "-- Semua Periode Masuk --",
    "2024 Genap",
    "2024 Ganjil",
    "2023 Genap",
    "2023 Ganjil",
    "2022 Genap",
    "2022 Ganjil",
  ];

  const gelombangOptions = [
    "-- Semua Gelombang --",
    "Gelombang 1",
    "Gelombang 2",
    "Gelombang 3",
    "Gelombang 4",
  ];

  const jalurPendaftaranOptions = [
    "-- Semua Jalur Pendaftaran --",
    "Seleksi Mandiri PTS",
    "SNMPTN",
    "SBMPTN",
    "Mandiri",
    "Beasiswa",
  ];

  const sistemKuliahOptions = [
    "-- Semua Sistem Kuliah --",
    "Reguler",
    "Kelas Karyawan",
    "Online",
  ];

  const programStudiOptions = [
    "Universitas Ibn Khaldun",
    "S1 - Kesehatan Masyarakat",
    "S1 - Teknik Informatika",
    "S1 - Manajemen",
    "S1 - Akuntansi",
    "S1 - Pendidikan Agama Islam",
    "S1 - Ilmu Hukum",
  ];

  const jenisAkunOptions = [
    "-- Semua Jenis Akun --",
    "SPP",
    "Biaya Pendaftaran",
    "Biaya Kuliah",
    "Biaya Ujian",
    "Biaya Wisuda",
  ];

  // Handle perubahan filter
  const handleFilterChange = (key: keyof FilterValues, val: string) => {
    if (onChange) {
      onChange(key, val);
    } else {
      setInternalFilters((prev) => ({
        ...prev,
        [key]: val,
      }));
    }
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
        {/* Periode Masuk */}
        <div className="flex items-center">
          <label className="w-36 font-medium text-amber-600 text-sm flex-shrink-0">
            Periode Masuk
          </label>
          <Dropdown
            options={periodeMasukOptions}
            value={filters.periodeMasuk}
            onChange={(val) => handleFilterChange("periodeMasuk", val)}
            className="w-full"
          />
        </div>

        {/* Gelombang */}
        <div className="flex items-center">
          <label className="w-36 font-medium text-amber-600 text-sm flex-shrink-0">
            Gelombang
          </label>
          <Dropdown
            options={gelombangOptions}
            value={filters.gelombang}
            onChange={(val) => handleFilterChange("gelombang", val)}
            className="w-full"
          />
        </div>

        {/* Jalur Pendaftaran */}
        <div className="flex items-center">
          <label className="w-36 font-medium text-amber-600 text-sm flex-shrink-0">
            Jalur Pendaftaran
          </label>
          <Dropdown
            options={jalurPendaftaranOptions}
            value={filters.jalurPendaftaran}
            onChange={(val) => handleFilterChange("jalurPendaftaran", val)}
            className="w-full"
          />
        </div>

        {/* Sistem Kuliah */}
        <div className="flex items-center">
          <label className="w-36 font-medium text-amber-600 text-sm flex-shrink-0">
            Sistem Kuliah
          </label>
          <Dropdown
            options={sistemKuliahOptions}
            value={filters.sistemKuliah}
            onChange={(val) => handleFilterChange("sistemKuliah", val)}
            className="w-full"
          />
        </div>

        {/* Program Studi */}
        <div className="flex items-center">
          <label className="w-36 font-medium text-amber-600 text-sm flex-shrink-0">
            Program Studi
          </label>
          <Dropdown
            options={programStudiOptions}
            value={filters.programStudi}
            onChange={(val) => handleFilterChange("programStudi", val)}
            className="w-full"
          />
        </div>

        {/* Jenis Akun */}
        <div className="flex items-center">
          <label className="w-36 font-medium text-amber-600 text-sm flex-shrink-0">
            Jenis Akun
          </label>
          <Dropdown
            options={jenisAkunOptions}
            value={filters.jenisAkun}
            onChange={(val) => handleFilterChange("jenisAkun", val)}
            className="w-full"
          />
        </div>
      </div>

      {/* Button Simpan Filter */}
      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-amber-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-amber-600 transition-colors shadow-sm font-medium cursor-pointer"
        >
          <IoFilter className="mr-2" />
          Simpan Filter
        </button>
      </div>
    </div>
  );
};

export default FilterDataTarifTagihanCard;

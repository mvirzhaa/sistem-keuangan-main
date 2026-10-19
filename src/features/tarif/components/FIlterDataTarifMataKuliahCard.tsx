import React, { useState } from "react";
import Dropdown from "../../../components/inputs/Dropdown";
import { IoFilter } from "react-icons/io5";

export interface FilterValues {
  periodeMasuk: string;
  jalur: string;
  programStudi: string;
  gelombang: string;
  sistemKuliah: string;
  kurikulum: string;
}

interface FilterDataTarifMataKuliahProps {
  onFilter?: (filters: FilterValues) => void;
  value?: FilterValues;
  onChange?: (key: keyof FilterValues, value: string) => void;
  className?: string;
}

const FilterDataTarifMataKuliahCard: React.FC<
  FilterDataTarifMataKuliahProps
> = ({ onFilter, value, onChange, className = "" }) => {
  const [internalFilters, setInternalFilters] = useState<FilterValues>({
    periodeMasuk: "-- Semua Periode Masuk --",
    jalur: "-- Semua Jalur --",
    programStudi: "Universitas Ibn Khaldun",
    gelombang: "-- Semua Gelombang --",
    sistemKuliah: "-- Semua Sistem Kuliah --",
    kurikulum: "-- Semua Kurikulum --",
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

  const jalurOptions = [
    "-- Semua Jalur --",
    "SNMPTN",
    "SBMPTN",
    "Mandiri",
    "Beasiswa",
  ];

  const programStudiOptions = [
    "Universitas Ibn Khaldun",
    "S1 - Teknik Informatika",
    "S1 - Manajemen",
    "S1 - Akuntansi",
    "S1 - Pendidikan Agama Islam",
    "S1 - Ilmu Hukum",
  ];

  const gelombangOptions = [
    "-- Semua Gelombang --",
    "Gelombang 1",
    "Gelombang 2",
    "Gelombang 3",
    "Gelombang 4",
  ];

  const sistemKuliahOptions = [
    "-- Semua Sistem Kuliah --",
    "Reguler",
    "Kelas Karyawan",
    "Online",
  ];

  const kurikulumOptions = [
    "-- Semua Kurikulum --",
    "Kurikulum 2020",
    "Kurikulum 2021",
    "Kurikulum 2022",
    "Kurikulum 2023",
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

        {/* Jalur */}
        <div className="flex items-center">
          <label className="w-36 font-medium text-amber-600 text-sm flex-shrink-0">
            Jalur
          </label>
          <Dropdown
            options={jalurOptions}
            value={filters.jalur}
            onChange={(val) => handleFilterChange("jalur", val)}
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

        {/* Kurikulum */}
        <div className="flex items-center">
          <label className="w-36 font-medium text-amber-600 text-sm flex-shrink-0">
            Kurikulum
          </label>
          <Dropdown
            options={kurikulumOptions}
            value={filters.kurikulum}
            onChange={(val) => handleFilterChange("kurikulum", val)}
            className="w-full"
          />
        </div>
      </div>

      {/* Button row */}
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

export default FilterDataTarifMataKuliahCard;

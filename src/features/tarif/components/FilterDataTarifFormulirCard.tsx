import React, { useState } from "react";
import Dropdown from "../../../components/inputs/Dropdown";
import { IoFilter } from "react-icons/io5";

export interface FilterValues {
  periode: string;
  jalur: string;
  gelombang: string;
  sistemKuliah: string;
}

interface FilterDataTarifFormulirProps {
  onFilter?: (filters: FilterValues) => void;
  value?: FilterValues;
  onChange?: (key: keyof FilterValues, value: string) => void;
  className?: string;
}

const FilterDataTarifFormulirCard: React.FC<FilterDataTarifFormulirProps> = ({
  onFilter,
  value,
  onChange,
  className = "",
}) => {
  const [internalFilters, setInternalFilters] = useState<FilterValues>({
    periode: "-- Semua Periode --",
    jalur: "-- Semua Jalur --",
    gelombang: "-- Semua Gelombang --",
    sistemKuliah: "-- Semua Sistem Kuliah --",
  });

  const filters = value || internalFilters;

  // Options untuk dropdown
  const periodeOptions = [
    "-- Semua Periode --",
    "2024 Genap",
    "2024 Ganjil",
    "2023 Genap",
    "2023 Ganjil",
  ];

  const jalurOptions = [
    "-- Semua Jalur --",
    "SBMPTN",
    "SNMPTN",
    "Mandiri",
    "Beasiswa",
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
        {/* Periode */}
        <div className="flex items-center">
          <label className="w-36 font-medium text-amber-600 text-sm flex-shrink-0">
            Periode
          </label>
          <Dropdown
            options={periodeOptions}
            value={filters.periode}
            onChange={(val) => handleFilterChange("periode", val)}
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

export default FilterDataTarifFormulirCard;


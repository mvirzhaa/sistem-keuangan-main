import React, { useState } from "react";
import Dropdown from "../../../components/inputs/Dropdown";
import { IoFilter } from "react-icons/io5";

export interface FilterValues {
  jenisPotongan: string;
  potongan: string;
  penerima: string;
  periodeMulai: string;
}

interface FilterDataTarifPotonganProps {
  onFilter?: (filters: FilterValues) => void;
  value?: FilterValues;
  onChange?: (key: keyof FilterValues, value: string) => void;
  className?: string;
}

const FilterDataTarifPotonganCard: React.FC<FilterDataTarifPotonganProps> = ({
  onFilter,
  value,
  onChange,
  className = "",
}) => {
  const [internalFilters, setInternalFilters] = useState<FilterValues>({
    jenisPotongan: "-- Semua Jenis --",
    potongan: "-- Semua Potongan --",
    penerima: "Mahasiswa",
    periodeMulai: "-- Semua Periode --",
  });

  const filters = value || internalFilters;

  // Options untuk dropdown
  const jenisPotonganOptions = [
    "-- Semua Jenis --",
    "Potongan",
    "Diskon",
    "Beasiswa",
  ];

  const potonganOptions = [
    "-- Semua Potongan --",
    "Potongan UKT",
    "Potongan Formulir",
    "Potongan Wisuda",
    "Baznas Jawa Barat",
  ];

  const penerimaOptions = [
    "-- Semua Penerima --",
    "Mahasiswa",
    "Calon Mahasiswa",
    "Alumni",
  ];

  const periodeMulaiOptions = [
    "-- Semua Periode --",
    "2024 Genap",
    "2024 Ganjil",
    "2023 Genap",
    "2023 Ganjil",
    "2022 Genap",
    "2022 Ganjil",
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
        {/* Jenis Potongan */}
        <div className="flex items-center">
          <label className="w-36 font-medium text-amber-600 text-sm flex-shrink-0">
            Jenis Potongan
          </label>
          <Dropdown
            options={jenisPotonganOptions}
            value={filters.jenisPotongan}
            onChange={(val) => handleFilterChange("jenisPotongan", val)}
            className="w-full"
          />
        </div>

        {/* Potongan */}
        <div className="flex items-center">
          <label className="w-36 font-medium text-amber-600 text-sm flex-shrink-0">
            Potongan
          </label>
          <Dropdown
            options={potonganOptions}
            value={filters.potongan}
            onChange={(val) => handleFilterChange("potongan", val)}
            className="w-full"
          />
        </div>

        {/* Penerima */}
        <div className="flex items-center">
          <label className="w-36 font-medium text-amber-600 text-sm flex-shrink-0">
            Penerima
          </label>
          <Dropdown
            options={penerimaOptions}
            value={filters.penerima}
            onChange={(val) => handleFilterChange("penerima", val)}
            className="w-full"
          />
        </div>

        {/* Periode Mulai */}
        <div className="flex items-center">
          <label className="w-36 font-medium text-amber-600 text-sm flex-shrink-0">
            Periode Mulai
          </label>
          <Dropdown
            options={periodeMulaiOptions}
            value={filters.periodeMulai}
            onChange={(val) => handleFilterChange("periodeMulai", val)}
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

export default FilterDataTarifPotonganCard;


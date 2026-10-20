import React, { useState, useEffect } from "react";
import Dropdown from "../../../../components/inputs/Dropdown";
import { IoFilter } from "react-icons/io5";

export interface FilterValues {
  kelompok: string;
  frekuensi: string;
}

export const defaultFilterValues: FilterValues = {
  kelompok: "-- Semua Kelompok --",
  frekuensi: "-- Semua Frekuensi --",
};

interface FilterDataAkunTransaksiProps {
  onFilter?: (filters: FilterValues) => void;
  className?: string;
  initialFilters?: FilterValues;
}

const FilterDataAkunTransaksiCard: React.FC<FilterDataAkunTransaksiProps> = ({
  onFilter,
  className = "",
  initialFilters,
}) => {
  const [filters, setFilters] = useState<FilterValues>(
    initialFilters || defaultFilterValues,
  );

  useEffect(() => {
    if (initialFilters) {
      setFilters(initialFilters);
    }
  }, [initialFilters]);

  // Options untuk dropdown
  const kelompokOptions = [
    "-- Semua Kelompok --",
    "Biaya Kuliah",
    "KIP Kuliah",
    "Pembayaran",
    "Biaya Lainnya",
  ];

  const frekuensiOptions = [
    "-- Semua Frekuensi --",
    "Semester",
    "Bulanan",
    "Tahunan",
    "Tiap Transaksi",
    "Mingguan",
    "Harian",
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
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 flex-1">
          {/* Kelompok Filter */}
          <div className="flex items-center flex-1 min-w-[240px]">
            <label className="text-orange-500 text-sm font-medium mr-4 w-24 shrink-0">
              Kelompok
            </label>
            <Dropdown
              options={kelompokOptions}
              value={filters.kelompok}
              defaultValue={filters.kelompok}
              onChange={(value) => handleFilterChange("kelompok", value)}
              className="w-full text-xs"
            />
          </div>

          {/* Frekuensi Filter */}
          <div className="flex items-center flex-1 min-w-[240px]">
            <label className="text-orange-500 text-sm font-medium mr-4 w-24 shrink-0">
              Frekuensi
            </label>
            <Dropdown
              options={frekuensiOptions}
              value={filters.frekuensi}
              defaultValue={filters.frekuensi}
              onChange={(value) => handleFilterChange("frekuensi", value)}
              className="w-full text-xs"
            />
          </div>
        </div>

        {/* Tombol Simpan Filter */}
        <div className="flex justify-end items-center shrink-0">
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md flex items-center text-xs font-medium cursor-pointer shadow-xs transition-colors"
          >
            <IoFilter className="mr-2 text-sm" />
            Simpan Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterDataAkunTransaksiCard;


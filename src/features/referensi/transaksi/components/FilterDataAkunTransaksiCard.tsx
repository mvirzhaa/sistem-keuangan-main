import React, { useState } from "react";
import Dropdown from "../../../../components/inputs/Dropdown";

interface FilterDataAkunTransaksiProps {
  onFilter?: (filters: FilterValues) => void;
  className?: string;
}

interface FilterValues {
  kelompok: string;
  frekuensi: string;
}

const FilterDataAkunTransaksiCard: React.FC<FilterDataAkunTransaksiProps> = ({
  onFilter,
  className = "",
}) => {
  const [filters, setFilters] = useState<FilterValues>({
    kelompok: "-- Semua Kelompok --",
    frekuensi: "-- Semua Frekuensi --",
  });

  // Options untuk dropdown
  const kelompokOptions = [
    "-- Semua Kelompok --",
    "Biaya Kuliah",
    "Pembayaran",
    "Biaya Lainnya",
    // Add more options as needed
  ];

  const frekuensiOptions = [
    "-- Semua Frekuensi --",
    "Bulanan",
    "Semester",
    "Tahunan",
    "Mingguan",
    "Harian",
    // Add more options as needed
  ];

  // Handle perubahan filter
  const handleFilterChange = (key: keyof FilterValues, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));

    if (onFilter) {
      onFilter({
        ...filters,
        [key]: value,
      });
    }
  };

  return (
    <div
      className={`border-t-4 border-t-amber-500 rounded-md shadow-md p-5 text-xs ${className}`}
    >
      <div className="flex flex-wrap items-center -mx-2">
        {/* Kelompok Filter */}
        <div className="px-2 w-full md:w-1/2 mb-2 md:mb-0">
          <div className="flex items-center">
            <label className="text-orange-500 font-medium mr-4 w-24">
              Kelompok
            </label>
            <Dropdown
              options={kelompokOptions}
              defaultValue={filters.kelompok}
              onChange={(value) => handleFilterChange("kelompok", value)}
              className="w-full"
            />
          </div>
        </div>

        {/* Frekuensi Filter */}
        <div className="px-2 w-full md:w-1/2">
          <div className="flex items-center">
            <label className="text-orange-500 font-medium mr-4 w-24">
              Frekuensi
            </label>
            <Dropdown
              options={frekuensiOptions}
              defaultValue={filters.frekuensi}
              onChange={(value) => handleFilterChange("frekuensi", value)}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterDataAkunTransaksiCard;

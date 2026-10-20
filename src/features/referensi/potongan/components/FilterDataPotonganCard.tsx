import React, { useState } from "react";
import Dropdown from "../../../../components/inputs/Dropdown";
import { IoFilter } from "react-icons/io5";

interface FilterDataPotonganCardProps {
  onFilter?: (filters: FilterValues) => void;
  className?: string;
  initialFilters?: FilterValues;
}

export interface FilterValues {
  jenisPotongan: string;
  jenisTagihan: string;
  rekanan: string;
  tipePotongan: string;
}

const FilterDataPotonganCard: React.FC<FilterDataPotonganCardProps> = ({
  onFilter,
  className = "",
  initialFilters,
}) => {
  const [filters, setFilters] = useState<FilterValues>(
    initialFilters || {
      jenisPotongan: "Potongan",
      jenisTagihan: "-- Semua Jenis Tagihan --",
      rekanan: "Universitas Ibn Khaldun",
      tipePotongan: "-- Semua Tipe Potongan --",
    },
  );

  // Options untuk dropdown
  const jenisPotonganOptions = ["Potongan", "Beasiswa", "Voucher"];
  const jenisTagihanOptions = [
    "-- Semua Jenis Tagihan --",
    "UKT",
    "SPP",
    "Pendaftaran",
    "Registrasi Ulang",
  ];
  const rekananOptions = [
    "Universitas Ibn Khaldun",
    "Pemerintah",
    "Bank",
    "Swasta",
  ];
  const tipePotonganOptions = [
    "-- Semua Tipe Potongan --",
    "Nominal",
    "Persentase",
    "Bebas",
    "Progresif",
  ];

  // Handle perubahan filter
  const handleFilterChange = (key: keyof FilterValues, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Handle simpan filter
  const handleSubmit = () => {
    if (onFilter) {
      onFilter(filters);
    }
  };

  return (
    <div
      className={`bg-white border-t-4 border-t-amber-500 rounded-md shadow-md p-5 text-xs ${className}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex items-center">
          <label className="w-32 font-medium text-amber-600 text-sm">
            Jenis Potongan
          </label>
          <Dropdown
            options={jenisPotonganOptions}
            defaultValue={filters.jenisPotongan}
            onChange={(value) => handleFilterChange("jenisPotongan", value)}
            className="w-full"
          />
        </div>

        <div className="flex items-center">
          <label className="w-32 font-medium text-amber-600 text-sm">Rekanan</label>
          <Dropdown
            options={rekananOptions}
            defaultValue={filters.rekanan}
            onChange={(value) => handleFilterChange("rekanan", value)}
            className="w-full"
          />
        </div>

        <div className="flex items-center">
          <label className="w-32 font-medium text-amber-600 text-sm">
            Jenis Tagihan
          </label>
          <Dropdown
            options={jenisTagihanOptions}
            defaultValue={filters.jenisTagihan}
            onChange={(value) => handleFilterChange("jenisTagihan", value)}
            className="w-full"
          />
        </div>

        <div className="flex items-center">
          <label className="w-32 font-medium text-amber-600 text-sm">
            Tipe Potongan
          </label>
          <Dropdown
            options={tipePotonganOptions}
            defaultValue={filters.tipePotongan}
            onChange={(value) => handleFilterChange("tipePotongan", value)}
            className="w-full"
          />
        </div>
      </div>

      {/* Tombol Simpan Filter */}
      <div className="flex justify-end mt-4">
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
  );
};

export default FilterDataPotonganCard;

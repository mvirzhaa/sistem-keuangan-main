import React, { useState } from "react";
import Dropdown from "../../../../components/inputs/Dropdown";

interface FilterDataPotonganCardProps {
  onFilter?: (filters: FilterValues) => void;
  className?: string;
}

interface FilterValues {
  jenisPotongan: string;
  jenisTagihan: string;
  rekanan: string;
  tipePotongan: string;
}

const FilterDataPotonganCard: React.FC<FilterDataPotonganCardProps> = ({
  onFilter,
  className = "",
}) => {
  const [filters, setFilters] = useState<FilterValues>({
    jenisPotongan: "Potongan",
    jenisTagihan: "-- Semua Jenis Tagihan --",
    rekanan: "Universitas Ibn Khaldun",
    tipePotongan: "-- Semua Tipe Potongan --",
  });

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

    // Optional: Trigger filter on change
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex items-center">
          <label className="w-32 font-medium text-amber-600">
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
          <label className="w-32 font-medium text-amber-600">Rekanan</label>
          <Dropdown
            options={rekananOptions}
            defaultValue={filters.rekanan}
            onChange={(value) => handleFilterChange("rekanan", value)}
            className="w-full"
          />
        </div>

        <div className="flex items-center">
          <label className="w-32 font-medium text-amber-600">
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
          <label className="w-32 font-medium text-amber-600">
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
    </div>
  );
};

export default FilterDataPotonganCard;

import React, { useState } from "react";
import Dropdown from "../../../components/inputs/Dropdown";
import { IoFilter } from "react-icons/io5";

interface FilterDataTarifPotonganProps {
  onFilter?: (filters: FilterValues) => void;
  className?: string;
}

interface FilterValues {
  jenisPotongan: string;
  potongan: string;
  penerima: string;
  periodeMulai: string;
}

const FilterDataTarifPotonganCard: React.FC<FilterDataTarifPotonganProps> = ({
  onFilter,
  className = "",
}) => {
  const [filters, setFilters] = useState<FilterValues>({
    jenisPotongan: "Potongan",
    potongan: "-- Semua Potongan --",
    penerima: "Mahasiswa",
    periodeMulai: "2024 Genap",
  });

  // Options untuk dropdown
  const jenisPotonganOptions = ["Potongan", "Diskon", "Beasiswa"];

  const potonganOptions = [
    "-- Semua Potongan --",
    "Potongan UKT",
    "Potongan Formulir",
    "Potongan Wisuda",
  ];

  const penerimaOptions = ["Mahasiswa", "Calon Mahasiswa", "Alumni"];

  const periodeMulaiOptions = [
    "2024 Genap",
    "2024 Ganjil",
    "2023 Genap",
    "2023 Ganjil",
    "2022 Genap",
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
      className={`border-t-4 border-t-amber-500 rounded-md shadow-md p-5 text-xs ${className}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {/* Baris 1 */}
        <div className="flex items-center">
          <label className="w-36 font-medium text-amber-600">
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
          <label className="w-36 font-medium text-amber-600">Potongan</label>
          <Dropdown
            options={potonganOptions}
            defaultValue={filters.potongan}
            onChange={(value) => handleFilterChange("potongan", value)}
            className="w-full"
          />
        </div>

        {/* Baris 2 */}
        <div className="flex items-center">
          <label className="w-36 font-medium text-amber-600">Penerima</label>
          <Dropdown
            options={penerimaOptions}
            defaultValue={filters.penerima}
            onChange={(value) => handleFilterChange("penerima", value)}
            className="w-full"
          />
        </div>

        <div className="flex items-center">
          <label className="w-36 font-medium text-amber-600">
            Periode Mulai
          </label>
          <Dropdown
            options={periodeMulaiOptions}
            defaultValue={filters.periodeMulai}
            onChange={(value) => handleFilterChange("periodeMulai", value)}
            className="w-full"
          />
        </div>
      </div>

      {/* Button row */}
      <div className="flex justify-end mt-4">
        <button
          onClick={handleSubmit}
          className="bg-amber-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-amber-600 transition-colors"
        >
          <IoFilter className="mr-2" />
          Simpan Filter
        </button>
      </div>
    </div>
  );
};

export default FilterDataTarifPotonganCard;

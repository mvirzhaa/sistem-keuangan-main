import React, { useState } from "react";
import Dropdown from "../../../components/inputs/Dropdown";
import { IoFilter } from "react-icons/io5";

interface FilterDataTarifFormulirProps {
  onFilter?: (filters: FilterValues) => void;
  className?: string;
}

interface FilterValues {
  periode: string;
  jalur: string;
  gelombang: string;
  sistemKuliah: string;
}

const FilterDataTarifFormulirCard: React.FC<FilterDataTarifFormulirProps> = ({
  onFilter,
  className = "",
}) => {
  const [filters, setFilters] = useState<FilterValues>({
    periode: "2024 Genap",
    jalur: "SBMPTN",
    gelombang: "Gelombang 1",
    sistemKuliah: "Reguler",
  });

  // Options untuk dropdown
  const periodeOptions = [
    "2024 Genap",
    "2024 Ganjil",
    "2023 Genap",
    "2023 Ganjil",
  ];

  const jalurOptions = ["SBMPTN", "SNMPTN", "Mandiri", "Beasiswa"];

  const gelombangOptions = [
    "Gelombang 1",
    "Gelombang 2",
    "Gelombang 3",
    "Gelombang 4",
  ];

  const sistemKuliahOptions = ["Reguler", "Kelas Karyawan", "Online"];

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
      className={`border-t-2 border-t-amber-500 rounded-md shadow-sm p-4 text-xs ${className}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column */}
        <div>
          {/* Periode */}
          <div className="mb-4 flex items-center">
            <label className="w-20 font-medium text-amber-500">Periode</label>
            <Dropdown
              options={periodeOptions}
              defaultValue={filters.periode}
              onChange={(value) => handleFilterChange("periode", value)}
              className="w-full"
            />
          </div>

          {/* Jalur */}
          <div className="flex items-center">
            <label className="w-20 font-medium text-amber-500">Jalur</label>
            <Dropdown
              options={jalurOptions}
              defaultValue={filters.jalur}
              onChange={(value) => handleFilterChange("jalur", value)}
              className="w-full"
            />
          </div>
        </div>

        {/* Right Column */}
        <div>
          {/* Gelombang */}
          <div className="mb-4 flex items-center">
            <label className="w-28 font-medium text-amber-500">Gelombang</label>
            <Dropdown
              options={gelombangOptions}
              defaultValue={filters.gelombang}
              onChange={(value) => handleFilterChange("gelombang", value)}
              className="w-full"
            />
          </div>

          {/* Sistem Kuliah */}
          <div className="flex items-center">
            <label className="w-28 font-medium text-amber-500">
              Sistem Kuliah
            </label>
            <Dropdown
              options={sistemKuliahOptions}
              defaultValue={filters.sistemKuliah}
              onChange={(value) => handleFilterChange("sistemKuliah", value)}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterDataTarifFormulirCard;

import React, { useState } from "react";
import SearchableDropdown from "../../../components/inputs/SearchableDropdown";
import { IoFilter } from "react-icons/io5";

interface FilterDataMonitoringAturanAkademikProps {
  onFilter?: (filters: FilterValues) => void;
  className?: string;
}

interface FilterValues {
  unitKerja: string;
  aturanAkademik: string;
  periodeAkademik: string;
  angkatan: string;
}

const FilterDataMonitoringAturanAkademikCard: React.FC<FilterDataMonitoringAturanAkademikProps> = ({ onFilter, className = "" }) => {
  const [filters, setFilters] = useState<FilterValues>({
    unitKerja: "Universitas Ibn Khaldun",
    aturanAkademik: "UAS - Mengikuti UAS",
    periodeAkademik: "2025 Ganjil",
    angkatan: "-- Semua --",
  });

  // Options untuk dropdown
  const unitKerjaOptions = ["Universitas Ibn Khaldun", "Fakultas Teknik", "Fakultas Ekonomi", "Fakultas Hukum"];

  const aturanAkademikOptions = ["UAS - Mengikuti UAS", "UTS - Mengikuti UTS", "Perwalian - Melakukan Perwalian", "KKN - Mengikuti KKN"];

  const periodeAkademikOptions = ["2025 Ganjil", "2025 Genap", "2024 Ganjil", "2024 Genap"];

  const angkatanOptions = ["-- Semua --", "2025", "2024", "2023", "2022", "2021"];

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
    <div className={`border-t-4 border-t-amber-500 rounded-md shadow-md p-5 text-xs ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 ">
        {/* Baris 1 */}
        <div className="flex items-center">
          <label className="w-32 font-medium text-amber-600 flex-1/2">Unit Kerja</label>
          <SearchableDropdown options={unitKerjaOptions} defaultValue={filters.unitKerja} onChange={(value) => handleFilterChange("unitKerja", value)} className="w-full" />
        </div>

        <div className="flex items-center">
          <label className="w-32 font-medium text-amber-600 flex-1/2">Aturan Akademik</label>
          <SearchableDropdown options={aturanAkademikOptions} defaultValue={filters.aturanAkademik} onChange={(value) => handleFilterChange("aturanAkademik", value)} className="w-full" />
        </div>

        {/* Divider */}
        <div className="md:col-span-2 border-b border-gray-200 my-2"></div>

        {/* Baris 2 */}
        <div className="flex items-center">
          <label className="w-32 font-medium text-amber-600 flex-1/2">Periode Akademik</label>
          <SearchableDropdown options={periodeAkademikOptions} defaultValue={filters.periodeAkademik} onChange={(value) => handleFilterChange("periodeAkademik", value)} className="w-full" />
        </div>

        <div className="flex items-center">
          <label className="w-32 font-medium text-amber-600 flex-1/2">Angkatan</label>
          <SearchableDropdown options={angkatanOptions} defaultValue={filters.angkatan} onChange={(value) => handleFilterChange("angkatan", value)} className="w-full" />
        </div>

        {/* Divider */}
        <div className="md:col-span-2 border-b border-gray-200 my-2"></div>

        {/* Button Filter */}
        <div></div>
        <div className="flex justify-end items-center">
          <button onClick={handleSubmit} className="bg-amber-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-amber-600 transition-colors">
            <IoFilter className="mr-2" />
            Simpan Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterDataMonitoringAturanAkademikCard;

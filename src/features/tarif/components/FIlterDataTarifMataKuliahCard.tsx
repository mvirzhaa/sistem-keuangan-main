import React, { useState } from "react";
import Dropdown from "../../../components/inputs/Dropdown";
import { IoFilter } from "react-icons/io5";

interface FilterDataTarifMataKuliahProps {
  onFilter?: (filters: FilterValues) => void;
  className?: string;
}

interface FilterValues {
  periodeMasuk: string;
  jalur: string;
  programStudi: string;
  gelombang: string;
  sistemKuliah: string;
  kurikulum: string;
}

const FilterDataTarifMataKuliahCard: React.FC<
  FilterDataTarifMataKuliahProps
> = ({ onFilter, className = "" }) => {
  const [filters, setFilters] = useState<FilterValues>({
    periodeMasuk: "2024 Genap",
    jalur: "SBMPTN",
    programStudi: "Universitas Ibn Khaldun",
    gelombang: "Gelombang 1",
    sistemKuliah: "Reguler",
    kurikulum: "",
  });

  // Options untuk dropdown
  const periodeMasukOptions = [
    "2024 Genap",
    "2024 Ganjil",
    "2023 Genap",
    "2023 Ganjil",
    "2022 Genap",
    "2022 Ganjil",
  ];

  const jalurOptions = ["SNMPTN", "SBMPTN", "Mandiri", "Beasiswa"];

  const programStudiOptions = [
    "Universitas Ibn Khaldun",
    "Teknik Informatika",
    "Manajemen",
    "Akuntansi",
    "Pendidikan Agama Islam",
  ];

  const gelombangOptions = [
    "Gelombang 1",
    "Gelombang 2",
    "Gelombang 3",
    "Gelombang 4",
  ];

  const sistemKuliahOptions = ["Reguler", "Kelas Karyawan", "Online"];

  const kurikulumOptions = [
    "Kurikulum 2020",
    "Kurikulum 2021",
    "Kurikulum 2022",
    "Kurikulum 2023",
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
      className={`border-t-4 border-t-amber-500  rounded-md shadow-sm p-4 text-xs ${className}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column */}
        <div>
          {/* Periode Masuk */}
          <div className="mb-4 flex items-center">
            <label className="w-28 font-medium text-amber-500">
              Periode Masuk
            </label>
            <Dropdown
              options={periodeMasukOptions}
              defaultValue={filters.periodeMasuk}
              onChange={(value) => handleFilterChange("periodeMasuk", value)}
              className="w-full"
            />
          </div>

          {/* Jalur */}
          <div className="mb-4 flex items-center">
            <label className="w-28 font-medium text-amber-500">Jalur</label>
            <Dropdown
              options={jalurOptions}
              defaultValue={filters.jalur}
              onChange={(value) => handleFilterChange("jalur", value)}
              className="w-full"
            />
          </div>

          {/* Program Studi */}
          <div className="mb-4 flex items-center">
            <label className="w-28 font-medium text-amber-500">
              Program Studi
            </label>
            <Dropdown
              options={programStudiOptions}
              defaultValue={filters.programStudi}
              onChange={(value) => handleFilterChange("programStudi", value)}
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
          <div className="mb-4 flex items-center">
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

          {/* Kurikulum */}
          <div className="mb-4 flex items-center">
            <label className="w-28 font-medium text-amber-500">Kurikulum</label>
            <Dropdown
              options={kurikulumOptions}
              defaultValue={filters.kurikulum}
              onChange={(value) => handleFilterChange("kurikulum", value)}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Button row */}
      <div className="flex justify-end mt-1">
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

export default FilterDataTarifMataKuliahCard;

import React, { useState } from "react";
import Dropdown from "../../../components/inputs/Dropdown";

interface FilterDataTarifUktProps {
  onFilter?: (filters: FilterValues) => void;
  className?: string;
}

interface FilterValues {
  periodeMasuk: string;
  jalurPendaftaran: string;
  programStudi: string;
  gelombang: string;
  sistemKuliah: string;
  kelompokUKT: string;
}

const FilterDataTarifUktCard: React.FC<FilterDataTarifUktProps> = ({
  onFilter,
  className = "",
}) => {
  const [filters, setFilters] = useState<FilterValues>({
    periodeMasuk: "2024 Genap",
    jalurPendaftaran: "-- Semua Jalur Pendaftaran --",
    programStudi: "Universitas Ibn Khaldun",
    gelombang: "-- Semua Gelombang --",
    sistemKuliah: "-- Semua Sistem Kuliah --",
    kelompokUKT: "-- Semua Kelompok UKT --",
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

  const jalurPendaftaranOptions = [
    "-- Semua Jalur Pendaftaran --",
    "SNMPTN",
    "SBMPTN",
    "Mandiri",
    "Beasiswa",
  ];

  const programStudiOptions = [
    "Universitas Ibn Khaldun",
    "Teknik Informatika",
    "Manajemen",
    "Akuntansi",
    "Pendidikan Agama Islam",
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

  const kelompokUKTOptions = [
    "-- Semua Kelompok UKT --",
    "UKT 1",
    "UKT 2",
    "UKT 3",
    "UKT 4",
    "UKT 5",
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
      className={`border-t-2 border-t-amber-500 rounded-md shadow-sm p-4 text-xs ${className}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column */}
        <div>
          {/* Periode Masuk */}
          <div className="mb-4 flex items-center">
            <label className="w-32 font-medium text-amber-500">
              Periode Masuk
            </label>
            <Dropdown
              options={periodeMasukOptions}
              defaultValue={filters.periodeMasuk}
              onChange={(value) => handleFilterChange("periodeMasuk", value)}
              className="w-full"
            />
          </div>

          {/* Jalur Pendaftaran */}
          <div className="mb-4 flex items-center">
            <label className="w-32 font-medium text-amber-500">
              Jalur Pendaftaran
            </label>
            <Dropdown
              options={jalurPendaftaranOptions}
              defaultValue={filters.jalurPendaftaran}
              onChange={(value) =>
                handleFilterChange("jalurPendaftaran", value)
              }
              className="w-full"
            />
          </div>

          {/* Program Studi */}
          <div className="flex items-center">
            <label className="w-32 font-medium text-amber-500">
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
            <label className="w-32 font-medium text-amber-500">Gelombang</label>
            <Dropdown
              options={gelombangOptions}
              defaultValue={filters.gelombang}
              onChange={(value) => handleFilterChange("gelombang", value)}
              className="w-full"
            />
          </div>

          {/* Sistem Kuliah */}
          <div className="mb-4 flex items-center">
            <label className="w-32 font-medium text-amber-500">
              Sistem Kuliah
            </label>
            <Dropdown
              options={sistemKuliahOptions}
              defaultValue={filters.sistemKuliah}
              onChange={(value) => handleFilterChange("sistemKuliah", value)}
              className="w-full"
            />
          </div>

          {/* Kelompok UKT */}
          <div className="flex items-center">
            <label className="w-32 font-medium text-amber-500">
              Kelompok UKT
            </label>
            <Dropdown
              options={kelompokUKTOptions}
              defaultValue={filters.kelompokUKT}
              onChange={(value) => handleFilterChange("kelompokUKT", value)}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Button row - uncomment if you want a submit button like in the TagihanCard */}
      {/* <div className="flex justify-end mt-4">
        <button 
          onClick={handleSubmit} 
          className="bg-amber-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-amber-600 transition-colors"
        >
          <IoFilter className="mr-2" />
          Simpan Filter
        </button>
      </div> */}
    </div>
  );
};

export default FilterDataTarifUktCard;

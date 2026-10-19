import React, { useState } from "react";
import Dropdown from "../../../components/inputs/Dropdown";
import { IoFilter } from "react-icons/io5";

export interface FilterValues {
  periodeMasuk: string;
  jalurPendaftaran: string;
  programStudi: string;
  gelombang: string;
  sistemKuliah: string;
  kelompokUKT: string;
}

interface FilterDataTarifUktProps {
  onFilter?: (filters: FilterValues) => void;
  value?: FilterValues;
  onChange?: (key: keyof FilterValues, value: string) => void;
  className?: string;
}

const FilterDataTarifUktCard: React.FC<FilterDataTarifUktProps> = ({
  onFilter,
  value,
  onChange,
  className = "",
}) => {
  const [internalFilters, setInternalFilters] = useState<FilterValues>({
    periodeMasuk: "-- Semua Periode Masuk --",
    jalurPendaftaran: "-- Semua Jalur Pendaftaran --",
    programStudi: "Universitas Ibn Khaldun",
    gelombang: "-- Semua Gelombang --",
    sistemKuliah: "-- Semua Sistem Kuliah --",
    kelompokUKT: "-- Semua Kelompok UKT --",
  });

  const filters = value || internalFilters;

  // Options untuk dropdown
  const periodeMasukOptions = [
    "-- Semua Periode Masuk --",
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
        {/* Periode Masuk */}
        <div className="flex items-center">
          <label className="w-36 font-medium text-amber-600 text-sm flex-shrink-0">
            Periode Masuk
          </label>
          <Dropdown
            options={periodeMasukOptions}
            value={filters.periodeMasuk}
            onChange={(val) => handleFilterChange("periodeMasuk", val)}
            className="w-full"
          />
        </div>

        {/* Gelombang */}
        <div className="flex items-center">
          <label className="w-36 font-medium text-amber-600 text-sm flex-shrink-0">
            Gelombang
          </label>
          <Dropdown
            options={gelombangOptions}
            value={filters.gelombang}
            onChange={(val) => handleFilterChange("gelombang", val)}
            className="w-full"
          />
        </div>

        {/* Jalur Pendaftaran */}
        <div className="flex items-center">
          <label className="w-36 font-medium text-amber-600 text-sm flex-shrink-0">
            Jalur Pendaftaran
          </label>
          <Dropdown
            options={jalurPendaftaranOptions}
            value={filters.jalurPendaftaran}
            onChange={(val) =>
              handleFilterChange("jalurPendaftaran", val)
            }
            className="w-full"
          />
        </div>

        {/* Sistem Kuliah */}
        <div className="flex items-center">
          <label className="w-36 font-medium text-amber-600 text-sm flex-shrink-0">
            Sistem Kuliah
          </label>
          <Dropdown
            options={sistemKuliahOptions}
            value={filters.sistemKuliah}
            onChange={(val) => handleFilterChange("sistemKuliah", val)}
            className="w-full"
          />
        </div>

        {/* Program Studi */}
        <div className="flex items-center">
          <label className="w-36 font-medium text-amber-600 text-sm flex-shrink-0">
            Program Studi
          </label>
          <Dropdown
            options={programStudiOptions}
            value={filters.programStudi}
            onChange={(val) => handleFilterChange("programStudi", val)}
            className="w-full"
          />
        </div>

        {/* Kelompok UKT */}
        <div className="flex items-center">
          <label className="w-36 font-medium text-amber-600 text-sm flex-shrink-0">
            Kelompok UKT
          </label>
          <Dropdown
            options={kelompokUKTOptions}
            value={filters.kelompokUKT}
            onChange={(val) => handleFilterChange("kelompokUKT", val)}
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

export default FilterDataTarifUktCard;


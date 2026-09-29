import React, { useState } from "react";
import SearchableDropdown from "../../../components/inputs/SearchableDropdown";
import { IoFilter } from "react-icons/io5";

interface FilterDataMonitoringUktProps {
  onFilter?: (filters: FilterValues) => void;
  className?: string;
}

interface FilterValues {
  penerima: string;
  periodeMasuk: string;
  gelombang: string;
  jalurPendaftaran: string;
  sistemKuliah: string;
  programStudi: string;
  kelompokUkt: string;
}

const FilterDataMonitoringUktCard: React.FC<FilterDataMonitoringUktProps> = ({ onFilter, className = "" }) => {
  const [filters, setFilters] = useState<FilterValues>({
    penerima: "Mahasiswa",
    periodeMasuk: "2025 Genap",
    gelombang: "Gelombang 1",
    jalurPendaftaran: "-- Semua Jalur Pendaftaran --",
    sistemKuliah: "Reguler Sore",
    programStudi: "Universitas Ibn Khaldun",
    kelompokUkt: "-- Semua Kelompok UKT --",
  });

  // Options untuk dropdown
  const penerimaOptions = ["Mahasiswa", "Dosen", "Tenaga Pendidik"];

  const periodeMasukOptions = ["2025 Genap", "2025 Ganjil", "2024 Genap", "2024 Ganjil"];

  const gelombangOptions = ["Gelombang 1", "Gelombang 2", "Gelombang 3"];

  const jalurPendaftaranOptions = ["-- Semua Jalur Pendaftaran --", "SNMPTN", "SBMPTN", "Seleksi Mandiri"];

  const sistemKuliahOptions = ["Reguler Sore", "Reguler Pagi", "Kelas Karyawan"];

  const programStudiOptions = ["Universitas Ibn Khaldun", "Fakultas Teknik", "Fakultas Ekonomi", "Fakultas Hukum"];

  const kelompokUktOptions = ["-- Semua Kelompok UKT --", "Kelompok 1", "Kelompok 2", "Kelompok 3"];

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
          <label className="w-32 font-medium text-amber-600 flex-1/2">Penerima</label>
          <SearchableDropdown options={penerimaOptions} defaultValue={filters.penerima} onChange={(value) => handleFilterChange("penerima", value)} className="w-full" />
        </div>

        <div className="flex items-center">
          <label className="w-32 font-medium text-amber-600 flex-1/2">Periode Masuk</label>
          <SearchableDropdown options={periodeMasukOptions} defaultValue={filters.periodeMasuk} onChange={(value) => handleFilterChange("periodeMasuk", value)} className="w-full" />
        </div>

        {/* Divider */}
        <div className="md:col-span-2 border-b border-gray-200 my-2"></div>

        {/* Baris 2 */}
        <div className="flex items-center">
          <label className="w-32 font-medium text-amber-600 flex-1/2">Gelombang</label>
          <SearchableDropdown options={gelombangOptions} defaultValue={filters.gelombang} onChange={(value) => handleFilterChange("gelombang", value)} className="w-full" />
        </div>

        <div className="flex items-center">
          <label className="w-32 font-medium text-amber-600 flex-1/2">Jalur Pendaftaran</label>
          <SearchableDropdown options={jalurPendaftaranOptions} defaultValue={filters.jalurPendaftaran} onChange={(value) => handleFilterChange("jalurPendaftaran", value)} className="w-full" />
        </div>

        {/* Divider */}
        <div className="md:col-span-2 border-b border-gray-200 my-2"></div>

        {/* Baris 3 */}
        <div className="flex items-center">
          <label className="w-32 font-medium text-amber-600 flex-1/2">Sistem Kuliah</label>
          <SearchableDropdown options={sistemKuliahOptions} defaultValue={filters.sistemKuliah} onChange={(value) => handleFilterChange("sistemKuliah", value)} className="w-full" />
        </div>

        <div className="flex items-center">
          <label className="w-32 font-medium text-amber-600 flex-1/2">Program Studi</label>
          <SearchableDropdown options={programStudiOptions} defaultValue={filters.programStudi} onChange={(value) => handleFilterChange("programStudi", value)} className="w-full" />
        </div>

        {/* Divider */}
        <div className="md:col-span-2 border-b border-gray-200 my-2"></div>

        {/* Baris 4 */}
        <div className="flex items-center mb-1">
          <label className="w-32 font-medium text-amber-600 flex-1/2 ">Kelompok UKT</label>
          <SearchableDropdown options={kelompokUktOptions} defaultValue={filters.kelompokUkt} onChange={(value) => handleFilterChange("kelompokUkt", value)} className="w-full" />
        </div>

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

export default FilterDataMonitoringUktCard;

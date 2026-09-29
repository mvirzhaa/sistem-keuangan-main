import React, { useState } from "react";
import SearchableDropdown from "../../../components/inputs/SearchableDropdown";
import { IoFilter } from "react-icons/io5";

interface FilterDataMonitoringTarifProps {
  onFilter?: (filters: FilterValues) => void;
  className?: string;
}

interface FilterValues {
  penerima: string;
  periodeMasuk: string;
  unit: string;
  status: string;
  jenisAkun: string;
  frekuensi: string;
  kelompok: string;
}

const FilterDataMonitoringTarifCard: React.FC<FilterDataMonitoringTarifProps> = ({ onFilter, className = "" }) => {
  const [filters, setFilters] = useState<FilterValues>({
    penerima: "Mahasiswa",
    periodeMasuk: "-- Semua Periode --",
    unit: "Universitas Ibn Khaldun",
    status: "-- Semua --",
    jenisAkun: "-- Semua --",
    frekuensi: "-- Semua --",
    kelompok: "-- Semua --",
  });

  // Options untuk dropdown
  const penerimaOptions = ["Mahasiswa", "Pendaftar", "Alumni", "Dosen"];
  const periodeOptions = ["-- Semua Periode --", "2024 Genap", "2024 Ganjil", "2023 Genap"];
  const unitOptions = ["Universitas Ibn Khaldun", "Fakultas Teknik", "Fakultas Ekonomi"];
  const statusOptions = ["-- Semua --", "Aktif", "Tidak Aktif", "Cuti"];
  const jenisAkunOptions = ["-- Semua --", "Biaya Kuliah", "Biaya Registrasi", "Biaya Wisuda"];
  const frekuensiOptions = ["-- Semua --", "Harian", "Bulanan", "Semesteran", "Tahunan"];
  const kelompokOptions = ["-- Semua --", "Kelompok 1", "Kelompok 2", "Kelompok 3"];

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
        {/* Baris 1 */}
        <div className="flex items-center">
          <label className="w-32 font-medium text-amber-600">Penerima</label>
          <SearchableDropdown options={penerimaOptions} defaultValue={filters.penerima} onChange={(value) => handleFilterChange("penerima", value)} className="w-full" />
        </div>

        <div className="flex items-center">
          <label className="w-32 font-medium text-amber-600">Periode Masuk</label>
          <SearchableDropdown options={periodeOptions} defaultValue={filters.periodeMasuk} onChange={(value) => handleFilterChange("periodeMasuk", value)} className="w-full" />
        </div>

        {/* Divider */}
        <div className="md:col-span-2 border-b border-gray-200 my-2"></div>

        {/* Baris 2 */}
        <div className="flex items-center">
          <label className="w-32 font-medium text-amber-600">Unit</label>
          <SearchableDropdown options={unitOptions} defaultValue={filters.unit} onChange={(value) => handleFilterChange("unit", value)} className="w-full" />
        </div>

        <div className="flex items-center">
          <label className="w-32 font-medium text-amber-600">Status</label>
          <SearchableDropdown options={statusOptions} defaultValue={filters.status} onChange={(value) => handleFilterChange("status", value)} className="w-full" />
        </div>

        {/* Divider */}
        <div className="md:col-span-2 border-b border-gray-200 my-2"></div>

        {/* Baris 3 */}
        <div className="flex items-center">
          <label className="w-32 font-medium text-amber-600">Jenis Akun</label>
          <SearchableDropdown options={jenisAkunOptions} defaultValue={filters.jenisAkun} onChange={(value) => handleFilterChange("jenisAkun", value)} className="w-full" />
        </div>

        <div className="flex items-center">
          <label className="w-32 font-medium text-amber-600">Frekuensi</label>
          <SearchableDropdown options={frekuensiOptions} defaultValue={filters.frekuensi} onChange={(value) => handleFilterChange("frekuensi", value)} className="w-full" />
        </div>

        {/* Divider */}
        <div className="md:col-span-2 border-b border-gray-200 my-2"></div>

        {/* Baris 4 */}
        <div className="flex items-center">
          <label className="w-32 font-medium text-amber-600">Kelompok</label>
          <SearchableDropdown options={kelompokOptions} defaultValue={filters.kelompok} onChange={(value) => handleFilterChange("kelompok", value)} className="w-full" />
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

export default FilterDataMonitoringTarifCard;

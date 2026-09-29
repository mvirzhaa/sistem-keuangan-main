import React, { useState } from "react";
import Dropdown from "../../../components/inputs/Dropdown";
import { IoFilter } from "react-icons/io5";

interface FilterDataGenerateTagihanProps {
  onFilter?: (filters: FilterValues) => void;
  className?: string;
}

interface FilterValues {
  frekuensi: string;
  periodeTagihan: string;
  periodeMasuk: string;
  gelombang: string;
  jalurPendaftaran: string;
  sistemKuliah: string;
  unitKerja: string;
}

const FilterDataGenerateTagihanCard: React.FC<FilterDataGenerateTagihanProps> = ({ onFilter, className = "" }) => {
  const [filters, setFilters] = useState<FilterValues>({
    frekuensi: "Tiap Transaksi",
    periodeTagihan: "2025 Genap",
    periodeMasuk: "-- Semua Periode Masuk --",
    gelombang: "-- Semua Gelombang --",
    jalurPendaftaran: "-- Semua Jalur Pendaftaran --",
    sistemKuliah: "-- Semua Sistem Kuliah --",
    unitKerja: "Universitas Ibn Khaldun",
  });

  // Options untuk dropdown
  const frekuensiOptions = ["Tiap Transaksi", "Bulanan", "Semesteran", "Tahunan"];
  const periodeTagihanOptions = ["2025 Genap", "2025 Ganjil", "2024 Genap", "2024 Ganjil", "2023 Genap", "2023 Ganjil"];
  const periodeMasukOptions = ["-- Semua Periode Masuk --", "2025", "2024", "2023", "2022", "2021"];
  const gelombangOptions = ["-- Semua Gelombang --", "Gelombang 1", "Gelombang 2", "Gelombang 3"];
  const jalurPendaftaranOptions = ["-- Semua Jalur Pendaftaran --", "SNMPTN", "SBMPTN", "Mandiri", "UTBK"];
  const sistemKuliahOptions = ["-- Semua Sistem Kuliah --", "Reguler", "Kelas Karyawan", "Online"];
  const unitKerjaOptions = ["Universitas Ibn Khaldun", "Fakultas Teknik", "Fakultas Ekonomi", "Fakultas Hukum", "Fakultas Keguruan dan Ilmu Pendidikan", "Fakultas Agama Islam"];

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {/* Baris 1 */}
        <div className="flex items-center">
          <label className="w-36 font-medium text-amber-600">Frekuensi</label>
          <Dropdown options={frekuensiOptions} defaultValue={filters.frekuensi} onChange={(value) => handleFilterChange("frekuensi", value)} className="w-full" />
        </div>

        <div className="flex items-center">
          <label className="w-36 font-medium text-amber-600">Periode Tagihan</label>
          <Dropdown options={periodeTagihanOptions} defaultValue={filters.periodeTagihan} onChange={(value) => handleFilterChange("periodeTagihan", value)} className="w-full" />
        </div>

        {/* Divider */}
        <div className="md:col-span-2 border-b border-gray-200 my-2"></div>

        {/* Baris 2 */}
        <div className="flex items-center">
          <label className="w-36 font-medium text-amber-600">Periode Masuk</label>
          <Dropdown options={periodeMasukOptions} defaultValue={filters.periodeMasuk} onChange={(value) => handleFilterChange("periodeMasuk", value)} className="w-full" />
        </div>

        <div className="flex items-center">
          <label className="w-36 font-medium text-amber-600">Gelombang</label>
          <Dropdown options={gelombangOptions} defaultValue={filters.gelombang} onChange={(value) => handleFilterChange("gelombang", value)} className="w-full" />
        </div>

        {/* Baris 3 */}
        <div className="flex items-center">
          <label className="w-36 font-medium text-amber-600">Jalur Pendaftaran</label>
          <Dropdown options={jalurPendaftaranOptions} defaultValue={filters.jalurPendaftaran} onChange={(value) => handleFilterChange("jalurPendaftaran", value)} className="w-full" />
        </div>

        <div className="flex items-center">
          <label className="w-36 font-medium text-amber-600">Sistem Kuliah</label>
          <Dropdown options={sistemKuliahOptions} defaultValue={filters.sistemKuliah} onChange={(value) => handleFilterChange("sistemKuliah", value)} className="w-full" />
        </div>

        {/* Baris 4 */}
        <div className="flex items-center">
          <label className="w-36 font-medium text-amber-600">Unit Kerja</label>
          <Dropdown options={unitKerjaOptions} defaultValue={filters.unitKerja} onChange={(value) => handleFilterChange("unitKerja", value)} className="w-full" />
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

export default FilterDataGenerateTagihanCard;

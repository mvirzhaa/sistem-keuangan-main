import React, { useState } from "react";
import Dropdown from "../../../components/inputs/Dropdown";
import { IoFilter } from "react-icons/io5";

interface FilterDataTarifTagihanProps {
  onFilter?: (filters: FilterValues) => void;
  className?: string;
}

interface FilterValues {
  periodeMasuk: string;
  gelombang: string;
  jalurPendaftaran: string;
  sistemKuliah: string;
  programStudi: string;
  jenisAkun: string;
}

const FilterDataTarifTagihanCard: React.FC<FilterDataTarifTagihanProps> = ({ onFilter, className = "" }) => {
  const [filters, setFilters] = useState<FilterValues>({
    periodeMasuk: "2024 Genap",
    gelombang: "-- Semua Gelombang --",
    jalurPendaftaran: "-- Semua Jalur Pendaftaran --",
    sistemKuliah: "-- Semua Sistem Kuliah --",
    programStudi: "Universitas Ibn Khaldun",
    jenisAkun: "-- Semua Jenis Akun --",
  });

  // Options untuk dropdown
  const periodeMasukOptions = ["2024 Genap", "2024 Ganjil", "2023 Genap", "2023 Ganjil", "2022 Genap", "2022 Ganjil"];

  const gelombangOptions = ["-- Semua Gelombang --", "Gelombang 1", "Gelombang 2", "Gelombang 3", "Gelombang 4"];

  const jalurPendaftaranOptions = ["-- Semua Jalur Pendaftaran --", "SNMPTN", "SBMPTN", "Mandiri", "Beasiswa"];

  const sistemKuliahOptions = ["-- Semua Sistem Kuliah --", "Reguler", "Kelas Karyawan", "Online"];

  const programStudiOptions = ["Universitas Ibn Khaldun", "Teknik Informatika", "Manajemen", "Akuntansi", "Pendidikan Agama Islam"];

  const jenisAkunOptions = ["-- Semua Jenis Akun --", "Biaya Pendaftaran", "Biaya Kuliah", "Biaya Ujian", "Biaya Wisuda"];

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
          <label className="w-36 font-medium text-amber-600">Periode Masuk</label>
          <Dropdown options={periodeMasukOptions} defaultValue={filters.periodeMasuk} onChange={(value) => handleFilterChange("periodeMasuk", value)} className="w-full" />
        </div>

        <div className="flex items-center">
          <label className="w-36 font-medium text-amber-600">Gelombang</label>
          <Dropdown options={gelombangOptions} defaultValue={filters.gelombang} onChange={(value) => handleFilterChange("gelombang", value)} className="w-full" />
        </div>

        {/* Baris 2 */}
        <div className="flex items-center">
          <label className="w-36 font-medium text-amber-600">Jalur Pendaftaran</label>
          <Dropdown options={jalurPendaftaranOptions} defaultValue={filters.jalurPendaftaran} onChange={(value) => handleFilterChange("jalurPendaftaran", value)} className="w-full" />
        </div>

        <div className="flex items-center">
          <label className="w-36 font-medium text-amber-600">Sistem Kuliah</label>
          <Dropdown options={sistemKuliahOptions} defaultValue={filters.sistemKuliah} onChange={(value) => handleFilterChange("sistemKuliah", value)} className="w-full" />
        </div>

        {/* Baris 3 */}
        <div className="flex items-center">
          <label className="w-36 font-medium text-amber-600">Program Studi</label>
          <Dropdown options={programStudiOptions} defaultValue={filters.programStudi} onChange={(value) => handleFilterChange("programStudi", value)} className="w-full" />
        </div>

        <div className="flex items-center">
          <label className="w-36 font-medium text-amber-600">Jenis Akun</label>
          <Dropdown options={jenisAkunOptions} defaultValue={filters.jenisAkun} onChange={(value) => handleFilterChange("jenisAkun", value)} className="w-full" />
        </div>
      </div>

      {/* Button row */}
      <div className="flex justify-end mt-4">
        <button onClick={handleSubmit} className="bg-amber-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-amber-600 transition-colors">
          <IoFilter className="mr-2" />
          Simpan Filter
        </button>
      </div>
    </div>
  );
};

export default FilterDataTarifTagihanCard;

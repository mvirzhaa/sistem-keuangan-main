import React, { useState } from "react";
import SearchableDropdown from "../../../components/inputs/SearchableDropdown";
import { IoFilter } from "react-icons/io5";
import IconButton from "../../../components/button/IconButton";

interface FilterDataTagihanProps {
  onFilter?: (filters: FilterValues) => void;
  className?: string;
}

interface FilterValues {
  penerima: string;
  periodeTagihan: string;
  kelompok: string;
  jenisTagihan: string;
  cicilan: string;
  statusTagihan: string;
  angkatan: string;
  programStudi: string;
  gelombang: string;
  jalurPendaftaran: string;
  sistemKuliah: string;
}

const FilterDataTagihanCard: React.FC<FilterDataTagihanProps> = ({ onFilter, className = "" }) => {
  const [filters, setFilters] = useState<FilterValues>({
    penerima: "Mahasiswa",
    periodeTagihan: "2024 Genap",
    kelompok: "-- Semua Kelompok --",
    jenisTagihan: "-- Semua Jenis Tagihan --",
    cicilan: "-- Semua Cicilan --",
    statusTagihan: "-- Semua Status --",
    angkatan: "-- Semua Angkatan --",
    programStudi: "Universitas Ibn Khaldun",
    gelombang: "-- Semua Gelombang --",
    jalurPendaftaran: "-- Semua Jalur Pendaftaran --",
    sistemKuliah: "-- Semua Sistem Kuliah --",
  });

  // Options untuk dropdown
  const penerimaOptions = ["Mahasiswa", "Dosen", "Tenaga Pendidik"];

  const periodeTagihanOptions = ["2024 Genap", "2024 Ganjil", "2023 Genap", "2023 Ganjil"];

  const kelompokOptions = ["-- Semua Kelompok --", "Kelompok 1", "Kelompok 2", "Kelompok 3"];

  const jenisTagihanOptions = ["-- Semua Jenis Tagihan --", "SPP", "UKT", "Praktikum"];

  const cicilanOptions = ["-- Semua Cicilan --", "Cicilan 1", "Cicilan 2", "Cicilan 3"];

  const statusTagihanOptions = ["-- Semua Status --", "Belum Lunas", "Lunas", "Menunggu Konfirmasi"];

  const angkatanOptions = ["-- Semua Angkatan --", "2024", "2023", "2022", "2021"];

  const programStudiOptions = ["Universitas Ibn Khaldun", "Fakultas Teknik", "Fakultas Ekonomi", "Fakultas Hukum"];

  const gelombangOptions = ["-- Semua Gelombang --", "Gelombang 1", "Gelombang 2", "Gelombang 3"];

  const jalurPendaftaranOptions = ["-- Semua Jalur Pendaftaran --", "SNMPTN", "SBMPTN", "Seleksi Mandiri"];

  const sistemKuliahOptions = ["-- Semua Sistem Kuliah --", "Reguler Pagi", "Reguler Sore", "Kelas Karyawan"];

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
        {/* Baris 1 */}
        <div className="flex items-center">
          <label className="w-32 font-medium text-amber-600">Penerima</label>
          <SearchableDropdown options={penerimaOptions} defaultValue={filters.penerima} onChange={(value) => handleFilterChange("penerima", value)} className="w-full" />
        </div>

        <div className="flex items-center">
          <label className="w-32 font-medium text-amber-600">Periode Tagihan</label>
          <SearchableDropdown options={periodeTagihanOptions} defaultValue={filters.periodeTagihan} onChange={(value) => handleFilterChange("periodeTagihan", value)} className="w-full" />
        </div>

        {/* Divider */}
        <div className="md:col-span-2 border-b border-gray-200 my-2"></div>

        {/* Baris 2 */}
        <div className="flex items-center">
          <label className="w-32 font-medium text-amber-600">Kelompok</label>
          <SearchableDropdown options={kelompokOptions} defaultValue={filters.kelompok} onChange={(value) => handleFilterChange("kelompok", value)} className="w-full" />
        </div>

        <div className="flex items-center">
          <label className="w-32 font-medium text-amber-600">Jenis Tagihan</label>
          <SearchableDropdown options={jenisTagihanOptions} defaultValue={filters.jenisTagihan} onChange={(value) => handleFilterChange("jenisTagihan", value)} className="w-full" />
        </div>

        {/* Divider */}
        <div className="md:col-span-2 border-b border-gray-200 my-2"></div>

        {/* Baris 3 */}
        <div className="flex items-center">
          <label className="w-32 font-medium text-amber-600">Cicilan Ke-</label>
          <SearchableDropdown options={cicilanOptions} defaultValue={filters.cicilan} onChange={(value) => handleFilterChange("cicilan", value)} className="w-full" />
        </div>

        <div className="flex items-center">
          <label className="w-32 font-medium text-amber-600">Status Tagihan</label>
          <SearchableDropdown options={statusTagihanOptions} defaultValue={filters.statusTagihan} onChange={(value) => handleFilterChange("statusTagihan", value)} className="w-full" />
        </div>

        {/* Divider */}
        <div className="md:col-span-2 border-b border-gray-200 my-2"></div>

        {/* Baris 4 */}
        <div className="flex items-center">
          <label className="w-32 font-medium text-amber-600">Angkatan</label>
          <SearchableDropdown options={angkatanOptions} defaultValue={filters.angkatan} onChange={(value) => handleFilterChange("angkatan", value)} className="w-full" />
        </div>

        <div className="flex items-center">
          <label className="w-32 font-medium text-amber-600">Program Studi</label>
          <SearchableDropdown options={programStudiOptions} defaultValue={filters.programStudi} onChange={(value) => handleFilterChange("programStudi", value)} className="w-full" />
        </div>

        {/* Divider */}
        <div className="md:col-span-2 border-b border-gray-200 my-2"></div>

        {/* Baris 5 */}
        <div className="flex items-center">
          <label className="w-32 font-medium text-amber-600">Gelombang</label>
          <SearchableDropdown options={gelombangOptions} defaultValue={filters.gelombang} onChange={(value) => handleFilterChange("gelombang", value)} className="w-full" />
        </div>

        <div className="flex items-center">
          <label className="w-32 font-medium text-amber-600">Jalur Pendaftaran</label>
          <SearchableDropdown options={jalurPendaftaranOptions} defaultValue={filters.jalurPendaftaran} onChange={(value) => handleFilterChange("jalurPendaftaran", value)} className="w-full" />
        </div>

        {/* Divider */}
        <div className="md:col-span-2 border-b border-gray-200 my-2"></div>

        {/* Baris 6 */}
        <div className="flex items-center">
          <label className="w-32 font-medium text-amber-600">Sistem Kuliah</label>
          <SearchableDropdown options={sistemKuliahOptions} defaultValue={filters.sistemKuliah} onChange={(value) => handleFilterChange("sistemKuliah", value)} className="w-full" />
        </div>

        <div className="flex justify-end items-center">
          {/* <IconButton icon={<IoFilter className="mr-2" />} text="Simpan filter" variant="warning" /> */}
          <button onClick={handleSubmit} className="bg-amber-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-amber-600 transition-colors">
            <IoFilter className="mr-2" />
            Simpan Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterDataTagihanCard;

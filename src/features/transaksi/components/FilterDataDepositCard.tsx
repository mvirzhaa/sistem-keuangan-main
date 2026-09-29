import React, { useState } from "react";
import SearchableDropdown from "../../../components/inputs/SearchableDropdown";
import Dropdown from "../../../components/inputs/Dropdown";
import { IoFilter } from "react-icons/io5";

interface FilterDataDepositProps {
  onFilter?: (filters: FilterValues) => void;
  className?: string;
}

interface FilterValues {
  penerima: string;
  metodePembayaran: string;
  angkatan: string;
  gelombang: string;
  sistemKuliah: string;
  periodePembayaran: string;
  channel: string;
  programStudi: string;
  jalurPendaftaran: string;
}

const FilterDataDepositCard: React.FC<FilterDataDepositProps> = ({ onFilter, className = "" }) => {
  const [filters, setFilters] = useState<FilterValues>({
    penerima: "Mahasiswa",
    metodePembayaran: "-- Semua Metode Pembayaran --",
    angkatan: "-- Semua Angkatan --",
    gelombang: "-- Semua Gelombang --",
    sistemKuliah: "-- Semua Sistem Kuliah --",
    periodePembayaran: "2024 Genap",
    channel: "-- Semua Channel --",
    programStudi: "-- Semua Program Studi --",
    jalurPendaftaran: "-- Semua Jalur Pendaftaran --",
  });

  // Options untuk dropdown
  const penerimaOptions = ["Mahasiswa", "Dosen", "Tenaga Pendidik"];
  const metodePembayaranOptions = ["-- Semua Metode Pembayaran --", "Transfer", "Virtual Account", "Cash", "QRIS"];
  const angkatanOptions = ["-- Semua Angkatan --", "2024", "2023", "2022", "2021"];
  const gelombangOptions = ["-- Semua Gelombang --", "Gelombang 1", "Gelombang 2", "Gelombang 3"];
  const sistemKuliahOptions = ["-- Semua Sistem Kuliah --", "Reguler Pagi", "Reguler Sore", "Kelas Karyawan"];
  const periodePembayaranOptions = ["2024 Genap", "2024 Ganjil", "2023 Genap", "2023 Ganjil"];
  const channelOptions = ["-- Semua Channel --", "Bank BNI", "Bank Mandiri", "Bank BSI", "Bank BRI"];
  const programStudiOptions = ["-- Semua Program Studi --", "Teknik Informatika", "Sistem Informasi", "Teknik Elektro"];
  const jalurPendaftaranOptions = ["-- Semua Jalur Pendaftaran --", "SNMPTN", "SBMPTN", "Mandiri"];

  // Handle perubahan filter
  const handleFilterChange = (key: keyof FilterValues, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));

    if (onFilter) {
      onFilter({ ...filters, [key]: value });
    }
  };

  return (
    <div className={`border-t-4 border-t-amber-500 rounded-md shadow-md p-5 text-xs ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Baris 1 */}
        <div className="flex items-center">
          <label className="w-40 font-medium text-amber-600">Penerima</label>
          <SearchableDropdown options={penerimaOptions} defaultValue={filters.penerima} onChange={(value) => handleFilterChange("penerima", value)} className="w-full" />
        </div>

        <div className="flex items-center">
          <label className="w-40 font-medium text-amber-600">Periode Deposit</label>
          <SearchableDropdown options={periodePembayaranOptions} defaultValue={filters.periodePembayaran} onChange={(value) => handleFilterChange("periodePembayaran", value)} className="w-full" />
        </div>

        {/* Baris 2 */}
        <div className="flex items-center">
          <label className="w-40 font-medium text-amber-600">Metode Pembayaran</label>
          <SearchableDropdown options={metodePembayaranOptions} defaultValue={filters.metodePembayaran} onChange={(value) => handleFilterChange("metodePembayaran", value)} className="w-full" />
        </div>

        <div className="flex items-center">
          <label className="w-40 font-medium text-amber-600">Channel</label>
          <SearchableDropdown options={channelOptions} defaultValue={filters.channel} onChange={(value) => handleFilterChange("channel", value)} className="w-full" />
        </div>

        {/* Divider */}
        <div className="md:col-span-2 border-b border-orange-200 my-2"></div>

        {/* Baris 3 */}
        <div className="flex items-center">
          <label className="w-40 font-medium text-amber-600">Angkatan</label>
          <SearchableDropdown options={angkatanOptions} defaultValue={filters.angkatan} onChange={(value) => handleFilterChange("angkatan", value)} className="w-full" />
        </div>

        <div className="flex items-center">
          <label className="w-40 font-medium text-amber-600">Program Studi</label>
          <SearchableDropdown options={programStudiOptions} defaultValue={filters.programStudi} onChange={(value) => handleFilterChange("programStudi", value)} className="w-full" />
        </div>

        {/* Baris 4 */}
        <div className="flex items-center">
          <label className="w-40 font-medium text-amber-600">Gelombang</label>
          <SearchableDropdown options={gelombangOptions} defaultValue={filters.gelombang} onChange={(value) => handleFilterChange("gelombang", value)} className="w-full" />
        </div>

        <div className="flex items-center">
          <label className="w-40 font-medium text-amber-600">Jalur Pendaftaran</label>
          <SearchableDropdown options={jalurPendaftaranOptions} defaultValue={filters.jalurPendaftaran} onChange={(value) => handleFilterChange("jalurPendaftaran", value)} className="w-full" />
        </div>

        {/* Baris 5 */}
        <div className="flex items-center">
          <label className="w-40 font-medium text-amber-600">Sistem Kuliah</label>
          <SearchableDropdown options={sistemKuliahOptions} defaultValue={filters.sistemKuliah} onChange={(value) => handleFilterChange("sistemKuliah", value)} className="w-full" />
        </div>
        <div className="flex justify-end items-center">
          {/* <IconButton icon={<IoFilter className="mr-2" />} text="Simpan filter" variant="warning" /> */}
          <button onClick={() => {}} className="bg-amber-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-amber-600 transition-colors">
            <IoFilter className="mr-2" />
            Simpan Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterDataDepositCard;

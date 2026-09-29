import React, { useState } from "react";
import Dropdown from "../../../components/inputs/Dropdown";
import { IoFilter } from "react-icons/io5";

interface FilterDataVirtualAccountProps {
  onFilter?: (filters: FilterValues) => void;
  className?: string;
}

interface FilterValues {
  penerimaTagihan: string;
  statusVA: string;
  kelompokTagihan: string;
  metodePembayaran: string;
  angkatan: string;
  unitKerja: string;
  gelombang: string;
  jalurPendaftaran: string;
  sistemKuliah: string;
}

const FilterDataVirtualAccountCard: React.FC<FilterDataVirtualAccountProps> = ({ onFilter, className = "" }) => {
  const [filters, setFilters] = useState<FilterValues>({
    penerimaTagihan: "Mahasiswa",
    statusVA: "-- Semua Status --",
    kelompokTagihan: "-- Semua Kelompok --",
    metodePembayaran: "-- Semua Metode Pembayaran --",
    angkatan: "2021",
    unitKerja: "-- Semua Unit Kerja --",
    gelombang: "-- Semua Gelombang --",
    jalurPendaftaran: "-- Semua Jalur Pendaftaran --",
    sistemKuliah: "-- Semua Sistem Kuliah --",
  });

  // Options untuk dropdown
  const penerimaTagihanOptions = ["Mahasiswa", "Dosen", "Karyawan"];
  const statusVAOptions = ["-- Semua Status --", "Aktif", "Expired", "Dibayar"];
  const kelompokTagihanOptions = ["-- Semua Kelompok --", "UKT", "SPP", "Denda"];
  const metodePembayaranOptions = ["-- Semua Metode Pembayaran --", "Transfer", "VA", "QRIS"];
  const angkatanOptions = ["2021", "2020", "2019", "2018"];
  const unitKerjaOptions = ["-- Semua Unit Kerja --", "Fakultas Teknik", "Fakultas Ekonomi"];
  const gelombangOptions = ["-- Semua Gelombang --", "Gelombang 1", "Gelombang 2", "Gelombang 3"];
  const jalurPendaftaranOptions = ["-- Semua Jalur Pendaftaran --", "SNMPTN", "SBMPTN", "Mandiri"];
  const sistemKuliahOptions = ["-- Semua Sistem Kuliah --", "Reguler", "Kelas Karyawan"];

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {/* Baris 1 */}
        <div className="flex items-center">
          <label className="w-40 font-medium text-amber-600">Penerima Tagihan</label>
          <Dropdown options={penerimaTagihanOptions} defaultValue={filters.penerimaTagihan} onChange={(value) => handleFilterChange("penerimaTagihan", value)} className="w-full" />
        </div>

        <div className="flex items-center">
          <label className="w-40 font-medium text-amber-600">Status VA</label>
          <Dropdown options={statusVAOptions} defaultValue={filters.statusVA} onChange={(value) => handleFilterChange("statusVA", value)} className="w-full" />
        </div>

        {/* Baris 2 */}
        <div className="flex items-center">
          <label className="w-40 font-medium text-amber-600">Kelompok Tagihan</label>
          <Dropdown options={kelompokTagihanOptions} defaultValue={filters.kelompokTagihan} onChange={(value) => handleFilterChange("kelompokTagihan", value)} className="w-full" />
        </div>

        <div className="flex items-center">
          <label className="w-40 font-medium text-amber-600">Metode Pembayaran</label>
          <Dropdown options={metodePembayaranOptions} defaultValue={filters.metodePembayaran} onChange={(value) => handleFilterChange("metodePembayaran", value)} className="w-full" />
        </div>

        {/* Divider */}
        <div className="md:col-span-2 border-b border-orange-200 my-2"></div>

        {/* Baris 3 */}
        <div className="flex items-center">
          <label className="w-40 font-medium text-amber-600">Angkatan</label>
          <Dropdown options={angkatanOptions} defaultValue={filters.angkatan} onChange={(value) => handleFilterChange("angkatan", value)} className="w-full" />
        </div>

        <div className="flex items-center">
          <label className="w-40 font-medium text-amber-600">Unit Kerja</label>
          <Dropdown options={unitKerjaOptions} defaultValue={filters.unitKerja} onChange={(value) => handleFilterChange("unitKerja", value)} className="w-full" />
        </div>

        {/* Baris 4 */}
        <div className="flex items-center">
          <label className="w-40 font-medium text-amber-600">Gelombang</label>
          <Dropdown options={gelombangOptions} defaultValue={filters.gelombang} onChange={(value) => handleFilterChange("gelombang", value)} className="w-full" />
        </div>

        <div className="flex items-center">
          <label className="w-40 font-medium text-amber-600">Jalur Pendaftaran</label>
          <Dropdown options={jalurPendaftaranOptions} defaultValue={filters.jalurPendaftaran} onChange={(value) => handleFilterChange("jalurPendaftaran", value)} className="w-full" />
        </div>

        {/* Baris 5 */}
        <div className="flex items-center">
          <label className="w-40 font-medium text-amber-600">Sistem Kuliah</label>
          <Dropdown options={sistemKuliahOptions} defaultValue={filters.sistemKuliah} onChange={(value) => handleFilterChange("sistemKuliah", value)} className="w-full" />
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

export default FilterDataVirtualAccountCard;

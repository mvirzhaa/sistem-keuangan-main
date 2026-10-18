import React, { useState, useEffect } from "react";
import Dropdown from "../../../components/inputs/Dropdown";
import { IoFilter } from "react-icons/io5";
import { useReferensiStore } from "../../../common/stores/referensiStore";

export interface FilterValues {
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

export const defaultFilterVAValues: FilterValues = {
  penerimaTagihan: "Mahasiswa",
  statusVA: "-- Semua Status --",
  kelompokTagihan: "-- Semua Kelompok --",
  metodePembayaran: "-- Semua Metode Pembayaran --",
  angkatan: "-- Semua Angkatan --",
  unitKerja: "-- Semua Unit Kerja --",
  gelombang: "-- Semua Gelombang --",
  jalurPendaftaran: "-- Semua Jalur Pendaftaran --",
  sistemKuliah: "-- Semua Sistem Kuliah --",
};

interface FilterDataVirtualAccountProps {
  onFilter?: (filters: FilterValues) => void;
  className?: string;
  initialFilters?: FilterValues;
}

const FilterDataVirtualAccountCard: React.FC<FilterDataVirtualAccountProps> = ({
  onFilter,
  className = "",
  initialFilters,
}) => {
  const { data: referensi, fetchReferensi } = useReferensiStore();

  useEffect(() => {
    fetchReferensi();
  }, [fetchReferensi]);

  const [filters, setFilters] = useState<FilterValues>(
    initialFilters || defaultFilterVAValues
  );

  useEffect(() => {
    if (initialFilters) {
      setFilters(initialFilters);
    }
  }, [initialFilters]);

  // Options langsung dari referensi store
  const penerimaTagihanOptions = referensi.penerima || ["Mahasiswa", "Pendaftar"];

  const statusVAOptions =
    referensi.statusVA || ["-- Semua Status --", "Aktif", "Lunas", "Batal"];

  const kelompokTagihanOptions = referensi.kelompok || [
    "-- Semua Kelompok --",
    "01 - Kuliah",
    "UKT",
    "SPP",
    "Denda",
    "Wisuda",
    "Praktikum",
  ];

  const metodePembayaranOptions = referensi.metodePembayaran || [
    "-- Semua Metode Pembayaran --",
    "Bank Muamalat",
    "Shopee",
    "Tokopedia",
    "Transfer",
    "QRIS",
    "Virtual Account",
  ];

  const angkatanOptions = referensi.angkatan?.length
    ? [
        "-- Semua Angkatan --",
        ...referensi.angkatan.filter(
          (a) => a !== "-- Semua --" && a !== "-- Semua Angkatan --"
        ),
      ]
    : ["-- Semua Angkatan --"];

  const unitKerjaOptions = referensi.unitKerja?.length
    ? [
        "-- Semua Unit Kerja --",
        ...referensi.unitKerja.filter(
          (u) => u !== "-- Semua --" && u !== "-- Semua Unit Kerja --"
        ),
      ]
    : ["-- Semua Unit Kerja --"];

  const gelombangOptions = referensi.gelombang || ["-- Semua Gelombang --"];

  const jalurPendaftaranOptions = referensi.jalurPendaftaran?.length
    ? [
        "-- Semua Jalur Pendaftaran --",
        ...referensi.jalurPendaftaran.filter(
          (j) => j !== "-- Semua --" && j !== "-- Semua Jalur Pendaftaran --"
        ),
      ]
    : ["-- Semua Jalur Pendaftaran --"];

  const sistemKuliahOptions =
    referensi.sistemKuliah || ["-- Semua Sistem Kuliah --"];

  // Handle perubahan filter
  const handleFilterChange = (key: keyof FilterValues, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleApplyFilter = () => {
    if (onFilter) {
      onFilter(filters);
    }
  };

  return (
    <div
      className={`bg-white border-t-4 border-t-amber-500 rounded-md shadow-md p-5 text-sm ${className}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Baris 1 */}
        <div className="flex items-center">
          <label className="w-44 font-semibold text-amber-600 text-sm shrink-0">
            Penerima Tagihan
          </label>
          <Dropdown
            options={penerimaTagihanOptions}
            value={filters.penerimaTagihan}
            defaultValue={filters.penerimaTagihan}
            onChange={(value) => handleFilterChange("penerimaTagihan", value)}
            className="w-full text-sm"
          />
        </div>

        <div className="flex items-center">
          <label className="w-44 font-semibold text-amber-600 text-sm shrink-0">
            Status VA
          </label>
          <Dropdown
            options={statusVAOptions}
            value={filters.statusVA}
            defaultValue={filters.statusVA}
            onChange={(value) => handleFilterChange("statusVA", value)}
            className="w-full text-sm"
          />
        </div>

        {/* Baris 2 */}
        <div className="flex items-center">
          <label className="w-44 font-semibold text-amber-600 text-sm shrink-0">
            Kelompok Tagihan
          </label>
          <Dropdown
            options={kelompokTagihanOptions}
            value={filters.kelompokTagihan}
            defaultValue={filters.kelompokTagihan}
            onChange={(value) => handleFilterChange("kelompokTagihan", value)}
            className="w-full text-sm"
          />
        </div>

        <div className="flex items-center">
          <label className="w-44 font-semibold text-amber-600 text-sm shrink-0">
            Metode Pembayaran
          </label>
          <Dropdown
            options={metodePembayaranOptions}
            value={filters.metodePembayaran}
            defaultValue={filters.metodePembayaran}
            onChange={(value) => handleFilterChange("metodePembayaran", value)}
            className="w-full text-sm"
          />
        </div>

        {/* Divider */}
        <div className="md:col-span-2 border-b border-orange-200 my-1"></div>

        {/* Baris 3 */}
        <div className="flex items-center">
          <label className="w-44 font-semibold text-amber-600 text-sm shrink-0">
            Angkatan
          </label>
          <Dropdown
            options={angkatanOptions}
            value={filters.angkatan}
            defaultValue={filters.angkatan}
            onChange={(value) => handleFilterChange("angkatan", value)}
            className="w-full text-sm"
          />
        </div>

        <div className="flex items-center">
          <label className="w-44 font-semibold text-amber-600 text-sm shrink-0">
            Unit Kerja
          </label>
          <Dropdown
            options={unitKerjaOptions}
            value={filters.unitKerja}
            defaultValue={filters.unitKerja}
            onChange={(value) => handleFilterChange("unitKerja", value)}
            className="w-full text-sm"
          />
        </div>

        {/* Baris 4 */}
        <div className="flex items-center">
          <label className="w-44 font-semibold text-amber-600 text-sm shrink-0">
            Gelombang
          </label>
          <Dropdown
            options={gelombangOptions}
            value={filters.gelombang}
            defaultValue={filters.gelombang}
            onChange={(value) => handleFilterChange("gelombang", value)}
            className="w-full text-sm"
          />
        </div>

        <div className="flex items-center">
          <label className="w-44 font-semibold text-amber-600 text-sm shrink-0">
            Jalur Pendaftaran
          </label>
          <Dropdown
            options={jalurPendaftaranOptions}
            value={filters.jalurPendaftaran}
            defaultValue={filters.jalurPendaftaran}
            onChange={(value) => handleFilterChange("jalurPendaftaran", value)}
            className="w-full text-sm"
          />
        </div>

        {/* Baris 5 */}
        <div className="flex items-center">
          <label className="w-44 font-semibold text-amber-600 text-sm shrink-0">
            Sistem Kuliah
          </label>
          <Dropdown
            options={sistemKuliahOptions}
            value={filters.sistemKuliah}
            defaultValue={filters.sistemKuliah}
            onChange={(value) => handleFilterChange("sistemKuliah", value)}
            className="w-full text-sm"
          />
        </div>

        <div className="flex justify-end items-center">
          <button
            type="button"
            onClick={handleApplyFilter}
            className="bg-amber-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-amber-600 transition-colors text-xs font-semibold cursor-pointer shadow-xs"
          >
            <IoFilter className="mr-2 text-sm" />
            Simpan Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterDataVirtualAccountCard;

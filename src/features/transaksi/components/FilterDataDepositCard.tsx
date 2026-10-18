import React, { useState, useEffect } from "react";
import SearchableDropdown from "../../../components/inputs/SearchableDropdown";
import { IoFilter } from "react-icons/io5";
import { useReferensiStore } from "../../../common/stores/referensiStore";

export interface FilterDepositValues {
  penerima: string;
  periodeDeposit: string;
  metodePembayaran: string;
  channel: string;
  angkatan: string;
  programStudi: string;
  gelombang: string;
  jalurPendaftaran: string;
  sistemKuliah: string;
}

export interface FilterDataDepositProps {
  onFilter?: (filters: FilterDepositValues) => void;
  className?: string;
  initialFilters?: FilterDepositValues;
}

export const defaultFilterDepositValues: FilterDepositValues = {
  penerima: "Mahasiswa",
  periodeDeposit: "-- Semua Periode --",
  metodePembayaran: "-- Semua Metode Pembayaran --",
  channel: "-- Semua Channel --",
  angkatan: "-- Semua Angkatan --",
  programStudi: "-- Semua Program Studi --",
  gelombang: "-- Semua Gelombang --",
  jalurPendaftaran: "-- Semua Jalur Pendaftaran --",
  sistemKuliah: "-- Semua Sistem Kuliah --",
};

const FilterDataDepositCard: React.FC<FilterDataDepositProps> = ({
  onFilter,
  className = "",
  initialFilters,
}) => {
  const { data: referensi, fetchReferensi } = useReferensiStore();

  useEffect(() => {
    fetchReferensi();
  }, [fetchReferensi]);

  const [filters, setFilters] = useState<FilterDepositValues>(
    initialFilters || defaultFilterDepositValues
  );

  useEffect(() => {
    if (initialFilters) {
      setFilters(initialFilters);
    }
  }, [initialFilters]);

  // Options dari referensi store dengan fallback konsisten
  const penerimaOptions = referensi.penerima.length
    ? referensi.penerima
    : ["Mahasiswa", "Dosen", "Tenaga Pendidik"];

  const periodeDepositOptions = [
    "-- Semua Periode --",
    ...(referensi.periode.length
      ? referensi.periode.filter(
          (p) => p !== "-- Semua --" && p !== "-- Semua Periode --"
        )
      : [
          "2024 Genap",
          "2024 Ganjil",
          "2023 Genap",
          "2023 Ganjil",
          "2025 Genap",
          "2025 Ganjil",
          "2026 Genap",
          "2026 Ganjil",
        ]),
  ];

  const metodePembayaranOptions = [
    "-- Semua Metode Pembayaran --",
    "Deposit",
    "SevimaPay",
    "Transfer",
    "Virtual Account",
    "Cash",
    "QRIS",
    "Bank Syariah Indonesia",
  ];

  const channelOptions = [
    "-- Semua Channel --",
    "Bank Syariah Indonesia",
    "Shopee",
    "Bank Muamalat",
    "Bank BNI",
    "Bank Mandiri",
    "Bank BSI",
    "Bank BRI",
    "Tokopedia",
  ];

  const angkatanOptions = [
    "-- Semua Angkatan --",
    ...referensi.angkatan.filter(
      (a) => a !== "-- Semua --" && a !== "-- Semua Angkatan --"
    ),
  ];

  const programStudiOptions = [
    "-- Semua Program Studi --",
    ...referensi.programStudi.filter(
      (p) => p !== "-- Semua --" && p !== "-- Semua Program Studi --"
    ),
  ];

  const gelombangOptions = [
    "-- Semua Gelombang --",
    ...referensi.gelombang.filter(
      (g) => g !== "-- Semua --" && g !== "-- Semua Gelombang --"
    ),
  ];

  const jalurPendaftaranOptions = [
    "-- Semua Jalur Pendaftaran --",
    ...referensi.jalurPendaftaran.filter(
      (j) => j !== "-- Semua --" && j !== "-- Semua Jalur Pendaftaran --"
    ),
  ];

  const sistemKuliahOptions = [
    "-- Semua Sistem Kuliah --",
    ...referensi.sistemKuliah.filter(
      (s) => s !== "-- Semua --" && s !== "-- Semua Sistem Kuliah --"
    ),
  ];

  // Handle perubahan filter di state lokal (tidak langsung trigger onFilter)
  const handleFilterChange = (
    key: keyof FilterDepositValues,
    value: string
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Tombol Simpan Filter: baru eksekusi filter ke parent
  const handleSaveFilter = () => {
    if (onFilter) {
      onFilter(filters);
    }
  };

  return (
    <div
      className={`w-full bg-white border-t-4 border-t-amber-500 rounded-md shadow-md p-5 ${className}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Baris 1: Penerima & Periode Deposit */}
        <div className="flex items-center">
          <label className="w-44 text-sm font-semibold text-amber-600 shrink-0">
            Penerima
          </label>
          <SearchableDropdown
            options={penerimaOptions}
            value={filters.penerima}
            defaultValue={filters.penerima}
            onChange={(value) => handleFilterChange("penerima", value)}
            className="w-full text-xs"
          />
        </div>

        <div className="flex items-center">
          <label className="w-44 text-sm font-semibold text-amber-600 shrink-0">
            Periode Deposit
          </label>
          <SearchableDropdown
            options={periodeDepositOptions}
            value={filters.periodeDeposit}
            defaultValue={filters.periodeDeposit}
            onChange={(value) => handleFilterChange("periodeDeposit", value)}
            className="w-full text-xs"
          />
        </div>

        {/* Baris 2: Metode Pembayaran & Channel */}
        <div className="flex items-center">
          <label className="w-44 text-sm font-semibold text-amber-600 shrink-0">
            Metode Pembayaran
          </label>
          <SearchableDropdown
            options={metodePembayaranOptions}
            value={filters.metodePembayaran}
            defaultValue={filters.metodePembayaran}
            onChange={(value) => handleFilterChange("metodePembayaran", value)}
            className="w-full text-xs"
          />
        </div>

        <div className="flex items-center">
          <label className="w-44 text-sm font-semibold text-amber-600 shrink-0">
            Channel
          </label>
          <SearchableDropdown
            options={channelOptions}
            value={filters.channel}
            defaultValue={filters.channel}
            onChange={(value) => handleFilterChange("channel", value)}
            className="w-full text-xs"
          />
        </div>

        {/* Divider */}
        <div className="md:col-span-2 border-b border-orange-200 my-1"></div>

        {/* Baris 3: Angkatan & Program Studi */}
        <div className="flex items-center">
          <label className="w-44 text-sm font-semibold text-amber-600 shrink-0">
            Angkatan
          </label>
          <SearchableDropdown
            options={angkatanOptions}
            value={filters.angkatan}
            defaultValue={filters.angkatan}
            onChange={(value) => handleFilterChange("angkatan", value)}
            className="w-full text-xs"
          />
        </div>

        <div className="flex items-center">
          <label className="w-44 text-sm font-semibold text-amber-600 shrink-0">
            Program Studi
          </label>
          <SearchableDropdown
            options={programStudiOptions}
            value={filters.programStudi}
            defaultValue={filters.programStudi}
            onChange={(value) => handleFilterChange("programStudi", value)}
            className="w-full text-xs"
          />
        </div>

        {/* Baris 4: Gelombang & Jalur Pendaftaran */}
        <div className="flex items-center">
          <label className="w-44 text-sm font-semibold text-amber-600 shrink-0">
            Gelombang
          </label>
          <SearchableDropdown
            options={gelombangOptions}
            value={filters.gelombang}
            defaultValue={filters.gelombang}
            onChange={(value) => handleFilterChange("gelombang", value)}
            className="w-full text-xs"
          />
        </div>

        <div className="flex items-center">
          <label className="w-44 text-sm font-semibold text-amber-600 shrink-0">
            Jalur Pendaftaran
          </label>
          <SearchableDropdown
            options={jalurPendaftaranOptions}
            value={filters.jalurPendaftaran}
            defaultValue={filters.jalurPendaftaran}
            onChange={(value) => handleFilterChange("jalurPendaftaran", value)}
            className="w-full text-xs"
          />
        </div>

        {/* Baris 5: Sistem Kuliah & Tombol Simpan Filter */}
        <div className="flex items-center">
          <label className="w-44 text-sm font-semibold text-amber-600 shrink-0">
            Sistem Kuliah
          </label>
          <SearchableDropdown
            options={sistemKuliahOptions}
            value={filters.sistemKuliah}
            defaultValue={filters.sistemKuliah}
            onChange={(value) => handleFilterChange("sistemKuliah", value)}
            className="w-full text-xs"
          />
        </div>

        <div className="flex justify-end items-center">
          <button
            type="button"
            onClick={handleSaveFilter}
            className="bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white px-5 py-2.5 rounded-lg flex items-center space-x-1.5 transition-colors cursor-pointer text-xs font-medium shadow-xs"
          >
            <IoFilter className="text-base" />
            <span>Simpan Filter</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterDataDepositCard;

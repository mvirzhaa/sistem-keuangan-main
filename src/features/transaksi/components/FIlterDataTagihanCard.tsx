import React, { useState, useEffect } from "react";
import SearchableDropdown from "../../../components/inputs/SearchableDropdown";
import { IoFilter } from "react-icons/io5";
import { useReferensiStore } from "../../../common/stores/referensiStore";

export interface FilterValues {
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

export interface FilterDataTagihanProps {
  onFilter?: (filters: FilterValues) => void;
  className?: string;
  initialFilters?: FilterValues;
}

export const defaultFilterTagihanValues: FilterValues = {
  penerima: "Mahasiswa",
  periodeTagihan: "-- Semua Periode --",
  kelompok: "-- Semua Kelompok --",
  jenisTagihan: "-- Semua Jenis Tagihan --",
  cicilan: "-- Semua Cicilan --",
  statusTagihan: "-- Semua Status --",
  angkatan: "-- Semua Angkatan --",
  programStudi: "Universitas Ibn Khaldun",
  gelombang: "-- Semua Gelombang --",
  jalurPendaftaran: "-- Semua Jalur Pendaftaran --",
  sistemKuliah: "-- Semua Sistem Kuliah --",
};

const FilterDataTagihanCard: React.FC<FilterDataTagihanProps> = ({
  onFilter,
  className = "",
  initialFilters,
}) => {
  const { data: referensi, fetchReferensi } = useReferensiStore();

  useEffect(() => {
    fetchReferensi();
  }, [fetchReferensi]);

  const [filters, setFilters] = useState<FilterValues>(
    initialFilters || defaultFilterTagihanValues,
  );

  useEffect(() => {
    if (initialFilters) {
      setFilters(initialFilters);
    }
  }, [initialFilters]);

  // Options dari referensiStore dengan fallback yang konsisten
  const penerimaOptions = referensi.penerima.length
    ? referensi.penerima
    : ["Mahasiswa", "Dosen", "Tenaga Pendidik"];

  const periodeTagihanOptions = [
    "-- Semua Periode --",
    ...(referensi.periode.length
      ? referensi.periode.filter((p) => p !== "-- Semua --" && p !== "-- Semua Periode --")
      : ["2026 Ganjil", "2026 Genap", "2025 Ganjil", "2025 Genap", "2024 Genap", "2024 Ganjil"]),
  ];

  const kelompokOptions = [
    "-- Semua Kelompok --",
    ...referensi.kelompok.filter(
      (k) => k !== "-- Semua --" && k !== "-- Semua Kelompok --",
    ),
  ];

  const jenisTagihanOptions = [
    "-- Semua Jenis Tagihan --",
    ...referensi.jenisTagihan.filter(
      (j) => j !== "-- Semua --" && j !== "-- Semua Jenis Tagihan --",
    ),
  ];

  const cicilanOptions = [
    "-- Semua Cicilan --",
    "Cicilan 1",
    "Cicilan 2",
    "Cicilan 3",
  ];

  const statusTagihanOptions = [
    "-- Semua Status --",
    ...referensi.statusTagihan.filter(
      (s) => s !== "-- Semua --" && s !== "-- Semua Status Tagihan --",
    ),
  ];

  const angkatanOptions = [
    "-- Semua Angkatan --",
    ...referensi.angkatan.filter(
      (a) => a !== "-- Semua --" && a !== "-- Semua Angkatan --",
    ),
  ];

  const programStudiOptions = referensi.programStudi.filter(
    (p) => p !== "-- Semua --",
  );

  const gelombangOptions = [
    "-- Semua Gelombang --",
    ...referensi.gelombang.filter(
      (g) => g !== "-- Semua --" && g !== "-- Semua Gelombang --",
    ),
  ];

  const jalurPendaftaranOptions = [
    "-- Semua Jalur Pendaftaran --",
    ...referensi.jalurPendaftaran.filter(
      (j) => j !== "-- Semua --" && j !== "-- Semua Jalur Pendaftaran --",
    ),
  ];

  const sistemKuliahOptions = [
    "-- Semua Sistem Kuliah --",
    ...referensi.sistemKuliah.filter(
      (s) => s !== "-- Semua --" && s !== "-- Semua Sistem Kuliah --",
    ),
  ];

  // Handle perubahan filter di state lokal card
  const handleFilterChange = (key: keyof FilterValues, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Hanya submit/terapkan filter saat tombol "Simpan Filter" diklik
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onFilter) {
      onFilter(filters);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white border-t-4 border-t-amber-500 rounded-md shadow-md p-5 text-sm ${className}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
        {/* Kolom Kiri 1: Penerima */}
        <div className="flex items-center justify-between">
          <label className="w-36 font-medium text-amber-600 text-sm">
            Penerima
          </label>
          <SearchableDropdown
            options={penerimaOptions}
            value={filters.penerima}
            defaultValue={filters.penerima}
            onChange={(value) => handleFilterChange("penerima", value)}
            className="w-full text-sm"
          />
        </div>

        {/* Kolom Kanan 1: Periode Tagihan */}
        <div className="flex items-center justify-between">
          <label className="w-36 font-medium text-amber-600 text-sm">
            Periode Tagihan
          </label>
          <SearchableDropdown
            options={periodeTagihanOptions}
            value={filters.periodeTagihan}
            defaultValue={filters.periodeTagihan}
            onChange={(value) => handleFilterChange("periodeTagihan", value)}
            className="w-full text-sm"
          />
        </div>

        {/* Kolom Kiri 2: Kelompok */}
        <div className="flex items-center justify-between">
          <label className="w-36 font-medium text-amber-600 text-sm">
            Kelompok
          </label>
          <SearchableDropdown
            options={kelompokOptions}
            value={filters.kelompok}
            defaultValue={filters.kelompok}
            onChange={(value) => handleFilterChange("kelompok", value)}
            className="w-full text-sm"
          />
        </div>

        {/* Kolom Kanan 2: Jenis Tagihan */}
        <div className="flex items-center justify-between">
          <label className="w-36 font-medium text-amber-600 text-sm">
            Jenis Tagihan
          </label>
          <SearchableDropdown
            options={jenisTagihanOptions}
            value={filters.jenisTagihan}
            defaultValue={filters.jenisTagihan}
            onChange={(value) => handleFilterChange("jenisTagihan", value)}
            className="w-full text-sm"
          />
        </div>

        {/* Kolom Kiri 3: Cicilan Ke- */}
        <div className="flex items-center justify-between">
          <label className="w-36 font-medium text-amber-600 text-sm">
            Cicilan Ke-
          </label>
          <SearchableDropdown
            options={cicilanOptions}
            value={filters.cicilan}
            defaultValue={filters.cicilan}
            onChange={(value) => handleFilterChange("cicilan", value)}
            className="w-full text-sm"
          />
        </div>

        {/* Kolom Kanan 3: Status Tagihan */}
        <div className="flex items-center justify-between">
          <label className="w-36 font-medium text-amber-600 text-sm">
            Status Tagihan
          </label>
          <SearchableDropdown
            options={statusTagihanOptions}
            value={filters.statusTagihan}
            defaultValue={filters.statusTagihan}
            onChange={(value) => handleFilterChange("statusTagihan", value)}
            className="w-full text-sm"
          />
        </div>

        {/* Kolom Kiri 4: Angkatan */}
        <div className="flex items-center justify-between">
          <label className="w-36 font-medium text-amber-600 text-sm">
            Angkatan
          </label>
          <SearchableDropdown
            options={angkatanOptions}
            value={filters.angkatan}
            defaultValue={filters.angkatan}
            onChange={(value) => handleFilterChange("angkatan", value)}
            className="w-full text-sm"
          />
        </div>

        {/* Kolom Kanan 4: Program Studi */}
        <div className="flex items-center justify-between">
          <label className="w-36 font-medium text-amber-600 text-sm">
            Program Studi
          </label>
          <SearchableDropdown
            options={programStudiOptions}
            value={filters.programStudi}
            defaultValue={filters.programStudi}
            onChange={(value) => handleFilterChange("programStudi", value)}
            className="w-full text-sm"
          />
        </div>

        {/* Kolom Kiri 5: Gelombang */}
        <div className="flex items-center justify-between">
          <label className="w-36 font-medium text-amber-600 text-sm">
            Gelombang
          </label>
          <SearchableDropdown
            options={gelombangOptions}
            value={filters.gelombang}
            defaultValue={filters.gelombang}
            onChange={(value) => handleFilterChange("gelombang", value)}
            className="w-full text-sm"
          />
        </div>

        {/* Kolom Kanan 5: Jalur Pendaftaran */}
        <div className="flex items-center justify-between">
          <label className="w-36 font-medium text-amber-600 text-sm">
            Jalur Pendaftaran
          </label>
          <SearchableDropdown
            options={jalurPendaftaranOptions}
            value={filters.jalurPendaftaran}
            defaultValue={filters.jalurPendaftaran}
            onChange={(value) => handleFilterChange("jalurPendaftaran", value)}
            className="w-full text-sm"
          />
        </div>

        {/* Kolom Kiri 6: Sistem Kuliah */}
        <div className="flex items-center justify-between">
          <label className="w-36 font-medium text-amber-600 text-sm">
            Sistem Kuliah
          </label>
          <SearchableDropdown
            options={sistemKuliahOptions}
            value={filters.sistemKuliah}
            defaultValue={filters.sistemKuliah}
            onChange={(value) => handleFilterChange("sistemKuliah", value)}
            className="w-full text-sm"
          />
        </div>

        {/* Kolom Kanan 6: Tombol Simpan Filter */}
        <div className="flex justify-end items-center pt-1">
          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-600 text-white font-medium px-4 py-2 rounded-md flex items-center transition-colors cursor-pointer text-xs shadow-sm whitespace-nowrap"
          >
            <IoFilter className="mr-2 text-sm" />
            Simpan Filter
          </button>
        </div>
      </div>
    </form>
  );
};

export default FilterDataTagihanCard;

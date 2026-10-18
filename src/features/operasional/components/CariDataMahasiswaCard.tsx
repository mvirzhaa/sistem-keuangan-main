import React, { useState, useEffect } from "react";
import SearchableDropdown from "../../../components/inputs/SearchableDropdown";
import { IoFilter } from "react-icons/io5";
import { useReferensiStore } from "../../../common/stores/referensiStore";

export interface FilterData {
  penerima: string;
  periodeMasuk: string;
  gelombang: string;
  jalurPendaftaran: string;
  sistemKuliah: string;
  programStudi: string;
}

interface CariDataMahasiswaCardProps {
  filters?: FilterData;
  onFilterChange?: (filters: FilterData) => void;
  onSearch?: (filters: FilterData) => void;
  className?: string;
}

const CariDataMahasiswaCard: React.FC<CariDataMahasiswaCardProps> = ({
  filters: propFilters,
  onFilterChange,
  onSearch,
  className = "",
}) => {
  const { data: referensi, fetchReferensi } = useReferensiStore();

  useEffect(() => {
    fetchReferensi();
  }, [fetchReferensi]);

  const [internalFilters, setInternalFilters] = useState<FilterData>(
    propFilters || {
      penerima: "Mahasiswa",
      periodeMasuk: "2026 Ganjil",
      gelombang: "-- Semua --",
      jalurPendaftaran: "-- Semua --",
      sistemKuliah: "-- Semua --",
      programStudi: "-- Semua --",
    },
  );

  // Sinkronisasi state lokal saat propFilters berubah (misal saat reset / refresh)
  useEffect(() => {
    if (propFilters) {
      setInternalFilters(propFilters);
    }
  }, [propFilters]);

  // Options diambil dari global referensiStore
  const penerimaOptions = referensi.penerima;
  const periodeOptions = referensi.periode.includes("-- Semua --")
    ? referensi.periode
    : ["-- Semua --", ...referensi.periode];
  const gelombangOptions = referensi.gelombang;
  const jalurOptions = referensi.jalurPendaftaran;
  const sistemOptions = referensi.sistemKuliah;
  const programOptions = referensi.programStudi;

  // Handle perubahan filter hanya di state lokal card
  const handleDropdownChange = (key: keyof FilterData, value: string) => {
    setInternalFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Handle tombol Simpan Filter: baru memicu aksi filter ke halaman / parent
  const handleApplyFilter = () => {
    if (onFilterChange) {
      onFilterChange(internalFilters);
    }
    if (onSearch) {
      onSearch(internalFilters);
    }
  };

  return (
    <div
      className={`border-t-4 border-t-amber-500 shadow-md rounded-md p-4 text-xs sm:text-sm bg-white ${className}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        {/* Kolom Kiri */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="w-32 font-medium text-amber-600">Penerima</label>
            <SearchableDropdown
              options={penerimaOptions}
              value={internalFilters.penerima}
              defaultValue={internalFilters.penerima}
              onChange={(value) => handleDropdownChange("penerima", value)}
              className="w-72 sm:w-96"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="w-32 font-medium text-amber-600">Gelombang</label>
            <SearchableDropdown
              options={gelombangOptions}
              value={internalFilters.gelombang}
              defaultValue={internalFilters.gelombang}
              onChange={(value) => handleDropdownChange("gelombang", value)}
              className="w-72 sm:w-96"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="w-32 font-medium text-amber-600">Sistem Kuliah</label>
            <SearchableDropdown
              options={sistemOptions}
              value={internalFilters.sistemKuliah}
              defaultValue={internalFilters.sistemKuliah}
              onChange={(value) => handleDropdownChange("sistemKuliah", value)}
              className="w-72 sm:w-96"
            />
          </div>
        </div>

        {/* Kolom Kanan */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="w-32 font-medium text-amber-600">Periode Masuk</label>
            <SearchableDropdown
              options={periodeOptions}
              value={internalFilters.periodeMasuk}
              defaultValue={internalFilters.periodeMasuk}
              onChange={(value) => handleDropdownChange("periodeMasuk", value)}
              className="w-72 sm:w-96"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="w-32 font-medium text-amber-600">
              Jalur Pendaftaran
            </label>
            <SearchableDropdown
              options={jalurOptions}
              value={internalFilters.jalurPendaftaran}
              defaultValue={internalFilters.jalurPendaftaran}
              onChange={(value) => handleDropdownChange("jalurPendaftaran", value)}
              className="w-72 sm:w-96"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="w-32 font-medium text-amber-600">Program Studi</label>
            <SearchableDropdown
              options={programOptions}
              value={internalFilters.programStudi}
              defaultValue={internalFilters.programStudi}
              onChange={(value) => handleDropdownChange("programStudi", value)}
              className="w-72 sm:w-96"
            />
          </div>
        </div>

        {/* Tombol Simpan Filter */}
        <div className="md:col-span-2 flex justify-end items-center pt-2">
          <button
            type="button"
            onClick={handleApplyFilter}
            className="bg-amber-500 hover:bg-amber-600 text-white font-medium px-4 py-2 rounded-md flex items-center transition-colors cursor-pointer shadow-sm text-xs"
          >
            <IoFilter className="mr-2 text-sm" />
            Simpan Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default CariDataMahasiswaCard;

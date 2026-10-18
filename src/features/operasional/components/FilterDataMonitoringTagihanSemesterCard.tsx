import React, { useState, useEffect } from "react";
import SearchableDropdown from "../../../components/inputs/SearchableDropdown";
import { IoFilter } from "react-icons/io5";
import { useReferensiStore } from "../../../common/stores/referensiStore";

export interface FilterTagihanSemesterValues {
  periodeAkademik: string;
  unitKerja: string;
  angkatan: string;
  statusKuliah: string;
  statusTagihan: string;
  jenisTagihan: string;
  tidakLolosAturan: string;
}

export interface FilterDataMonitoringTagihanSemesterProps {
  onFilter?: (filters: FilterTagihanSemesterValues) => void;
  className?: string;
  initialFilters?: FilterTagihanSemesterValues;
}

const FilterDataMonitoringTagihanSemesterCard: React.FC<
  FilterDataMonitoringTagihanSemesterProps
> = ({ onFilter, className = "", initialFilters }) => {
  const { data: referensi, fetchReferensi } = useReferensiStore();

  useEffect(() => {
    fetchReferensi();
  }, [fetchReferensi]);

  const [filters, setFilters] = useState<FilterTagihanSemesterValues>(
    initialFilters || {
      periodeAkademik: "-- Semua --",
      unitKerja: "Universitas Ibn Khaldun",
      angkatan: "-- Semua Angkatan --",
      statusKuliah: "-- Semua Status Kuliah --",
      statusTagihan: "-- Semua Status Tagihan --",
      jenisTagihan: "-- Semua Jenis Tagihan --",
      tidakLolosAturan: "-",
    },
  );

  useEffect(() => {
    if (initialFilters) {
      setFilters(initialFilters);
    }
  }, [initialFilters]);

  // Options diambil dari global referensiStore
  const periodeAkademikOptions = referensi.periode.includes("-- Semua --")
    ? referensi.periode
    : ["-- Semua --", ...referensi.periode];
  const unitKerjaOptions = referensi.programStudi.filter(
    (p) => p !== "-- Semua --",
  );
  const angkatanOptions = [
    "-- Semua Angkatan --",
    ...referensi.angkatan.filter(
      (a) => a !== "-- Semua --" && a !== "-- Semua Angkatan --",
    ),
  ];
  const statusKuliahOptions = referensi.statusKuliah;
  const statusTagihanOptions = referensi.statusTagihan;
  const jenisTagihanOptions = referensi.jenisTagihan;
  const tidakLolosAturanOptions = [
    "-",
    "Mengambil Cuti",
    "Melihat KHS",
    "Kegiatan Pendukung",
    "Pengambilan KRS reguler (Gasal/Genap)",
    "Pengambilan KRS Semester Pendek",
    "Presensi mahasiswa",
    "Mengambil Proposal",
    "Mengambil Skripsi",
    "Mengikuti UAS",
    "Mengikuti UTS",
    "Mengikuti Wisuda",
  ];

  const handleFilterChange = (
    field: keyof FilterTagihanSemesterValues,
    value: string,
  ) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleApplyFilter = () => {
    if (onFilter) {
      onFilter(filters);
    }
  };

  return (
    <div
      className={`border-t-4 border-t-amber-500 shadow-md rounded-md p-4 text-xs sm:text-sm bg-white ${className}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        {/* Periode Akademik */}
        <div className="flex items-center">
          <label className="w-36 font-medium text-amber-600 shrink-0">
            Periode Akademik
          </label>
          <SearchableDropdown
            options={periodeAkademikOptions}
            defaultValue={filters.periodeAkademik}
            value={filters.periodeAkademik}
            onChange={(val) => handleFilterChange("periodeAkademik", val)}
            className="w-full"
          />
        </div>

        {/* Unit Kerja */}
        <div className="flex items-center">
          <label className="w-36 font-medium text-amber-600 shrink-0">
            Unit Kerja
          </label>
          <SearchableDropdown
            options={unitKerjaOptions}
            defaultValue={filters.unitKerja}
            value={filters.unitKerja}
            onChange={(val) => handleFilterChange("unitKerja", val)}
            className="w-full"
          />
        </div>

        {/* Angkatan */}
        <div className="flex items-center">
          <label className="w-36 font-medium text-amber-600 shrink-0">
            Angkatan
          </label>
          <SearchableDropdown
            options={angkatanOptions}
            defaultValue={filters.angkatan}
            value={filters.angkatan}
            onChange={(val) => handleFilterChange("angkatan", val)}
            className="w-full"
          />
        </div>

        {/* Status Kuliah */}
        <div className="flex items-center">
          <label className="w-36 font-medium text-amber-600 shrink-0">
            Status Kuliah
          </label>
          <SearchableDropdown
            options={statusKuliahOptions}
            defaultValue={filters.statusKuliah}
            value={filters.statusKuliah}
            onChange={(val) => handleFilterChange("statusKuliah", val)}
            className="w-full"
          />
        </div>

        {/* Status Tagihan */}
        <div className="flex items-center">
          <label className="w-36 font-medium text-amber-600 shrink-0">
            Status Tagihan
          </label>
          <SearchableDropdown
            options={statusTagihanOptions}
            defaultValue={filters.statusTagihan}
            value={filters.statusTagihan}
            onChange={(val) => handleFilterChange("statusTagihan", val)}
            className="w-full"
          />
        </div>

        {/* Jenis Tagihan */}
        <div className="flex items-center">
          <label className="w-36 font-medium text-amber-600 shrink-0">
            Jenis Tagihan
          </label>
          <SearchableDropdown
            options={jenisTagihanOptions}
            defaultValue={filters.jenisTagihan}
            value={filters.jenisTagihan}
            onChange={(val) => handleFilterChange("jenisTagihan", val)}
            className="w-full"
          />
        </div>

        {/* Tidak Lolos Aturan */}
        <div className="flex items-center">
          <label className="w-36 font-medium text-amber-600 shrink-0">
            Tidak Lolos Aturan
          </label>
          <SearchableDropdown
            options={tidakLolosAturanOptions}
            defaultValue={filters.tidakLolosAturan}
            value={filters.tidakLolosAturan}
            onChange={(val) => handleFilterChange("tidakLolosAturan", val)}
            className="w-full"
          />
        </div>

        {/* Tombol Simpan Filter */}
        <div className="flex justify-end items-center">
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

export default FilterDataMonitoringTagihanSemesterCard;

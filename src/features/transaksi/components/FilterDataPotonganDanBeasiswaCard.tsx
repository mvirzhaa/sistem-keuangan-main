import React, { useState, useEffect } from "react";
import Dropdown from "../../../components/inputs/Dropdown";
import { IoFilter } from "react-icons/io5";
import { useReferensiStore } from "../../../common/stores/referensiStore";

export interface FilterPotonganDanBeasiswaValues {
  jenisPotongan: string;
  penerima: string;
  beasiswa: string;
  periodeAkademik: string;
}

export const defaultFilterPotonganValues: FilterPotonganDanBeasiswaValues = {
  jenisPotongan: "Beasiswa",
  penerima: "Mahasiswa",
  beasiswa: "-- Semua Beasiswa --",
  periodeAkademik: "-- Semua Periode --",
};

interface FilterDataPotonganDanBeasiswaProps {
  onFilter?: (filters: FilterPotonganDanBeasiswaValues) => void;
  className?: string;
  initialFilters?: FilterPotonganDanBeasiswaValues;
}

const FilterDataPotonganDanBeasiswaCard: React.FC<
  FilterDataPotonganDanBeasiswaProps
> = ({ onFilter, className = "", initialFilters }) => {
  const { data: referensi, fetchReferensi } = useReferensiStore();

  useEffect(() => {
    fetchReferensi();
  }, [fetchReferensi]);

  const [filters, setFilters] = useState<FilterPotonganDanBeasiswaValues>(
    initialFilters || defaultFilterPotonganValues
  );

  useEffect(() => {
    if (initialFilters) {
      setFilters(initialFilters);
    }
  }, [initialFilters]);

  // Options dari referensi store
  const jenisPotonganOptions = ["Beasiswa", "Potongan Biaya"];

  const penerimaOptions = referensi.penerima?.length
    ? referensi.penerima
    : ["Mahasiswa", "Pendaftar"];

  const beasiswaOptions = [
    "-- Semua Beasiswa --",
    "BCB (Beasiswa Cendikia Baznas) 2024",
    "BCB (Beasiswa Cendikia Baznas) 2023",
    "Beasiswa KIP",
    "Beasiswa Prestasi",
    "Beasiswa Tahfidz",
  ];

  const periodeAkademikOptions = [
    "-- Semua Periode --",
    ...(referensi.periode?.filter(
      (p) => p !== "-- Semua --" && p !== "-- Semua Periode --"
    ) || [
      "2026 Ganjil",
      "2026 Genap",
      "2025 Ganjil",
      "2025 Genap",
      "2024 Ganjil",
      "2024 Genap",
    ]),
  ];

  // Handle perubahan filter
  const handleFilterChange = (
    key: keyof FilterPotonganDanBeasiswaValues,
    value: string
  ) => {
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
    <div
      className={`bg-white border-t-4 border-t-amber-500 rounded-md shadow-md p-5 text-sm ${className}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        {/* Baris 1: Jenis Potongan & Beasiswa */}
        <div className="flex items-center">
          <label className="w-36 font-semibold text-amber-600 text-sm shrink-0">
            Jenis Potongan
          </label>
          <div className="flex-1">
            <Dropdown
              options={jenisPotonganOptions}
              value={filters.jenisPotongan}
              defaultValue="Beasiswa"
              onChange={(value) => handleFilterChange("jenisPotongan", value)}
              className="w-full text-sm"
            />
          </div>
        </div>

        <div className="flex items-center">
          <label className="w-36 font-semibold text-amber-600 text-sm shrink-0">
            Beasiswa
          </label>
          <div className="flex-1">
            <Dropdown
              options={beasiswaOptions}
              value={filters.beasiswa}
              defaultValue="-- Semua Beasiswa --"
              onChange={(value) => handleFilterChange("beasiswa", value)}
              className="w-full text-sm"
            />
          </div>
        </div>

        {/* Baris 2: Penerima & Periode Akademik */}
        <div className="flex items-center">
          <label className="w-36 font-semibold text-amber-600 text-sm shrink-0">
            Penerima
          </label>
          <div className="flex-1">
            <Dropdown
              options={penerimaOptions}
              value={filters.penerima}
              defaultValue="Mahasiswa"
              onChange={(value) => handleFilterChange("penerima", value)}
              className="w-full text-sm"
            />
          </div>
        </div>

        <div className="flex items-center">
          <label className="w-36 font-semibold text-amber-600 text-sm shrink-0">
            Periode Akademik
          </label>
          <div className="flex-1">
            <Dropdown
              options={periodeAkademikOptions}
              value={filters.periodeAkademik}
              defaultValue="-- Semua Periode --"
              onChange={(value) => handleFilterChange("periodeAkademik", value)}
              className="w-full text-sm"
            />
          </div>
        </div>

        {/* Tombol Simpan Filter: tetap text-xs font-semibold */}
        <div className="md:col-span-2 flex justify-end">
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md flex items-center text-xs font-semibold cursor-pointer shadow-xs transition-colors"
          >
            <IoFilter className="mr-2 text-sm" />
            Simpan Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterDataPotonganDanBeasiswaCard;

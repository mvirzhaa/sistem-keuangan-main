import React, { useState, useEffect } from "react";
import SearchableDropdown from "../../../components/inputs/SearchableDropdown";
import { IoFilter } from "react-icons/io5";
import { useReferensiStore } from "../../../common/stores/referensiStore";

export interface FilterDataMonitoringTarifProps {
  onFilter?: (filters: FilterValues) => void;
  className?: string;
  initialFilters?: FilterValues;
}

export interface FilterValues {
  penerima: string;
  periodeMasuk: string;
  unit: string;
  status: string;
  jenisAkun: string;
  frekuensi: string;
  kelompok: string;
}

const FilterDataMonitoringTarifCard: React.FC<FilterDataMonitoringTarifProps> = ({
  onFilter,
  className = "",
  initialFilters,
}) => {
  const { data: referensi, fetchReferensi } = useReferensiStore();

  useEffect(() => {
    fetchReferensi();
  }, [fetchReferensi]);

  const [filters, setFilters] = useState<FilterValues>(
    initialFilters || {
      penerima: "Mahasiswa",
      periodeMasuk: "-- Semua Periode --",
      unit: "Universitas Ibn Khaldun",
      status: "-- Semua --",
      jenisAkun: "-- Semua --",
      frekuensi: "-- Semua --",
      kelompok: "-- Semua --",
    },
  );

  // Options diambil dari global referensiStore
  const penerimaOptions = referensi.penerima;
  const periodeOptions = [
    "-- Semua --",
    ...referensi.periode.filter(
      (p) => p !== "-- Semua --" && p !== "-- Semua Periode --",
    ),
  ];
  const unitOptions = referensi.programStudi;
  const statusOptions = referensi.statusMahasiswa;
  const jenisAkunOptions = referensi.jenisAkun;
  const frekuensiOptions = referensi.frekuensi;
  const kelompokOptions = referensi.kelompok;

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
    <div
      className={`border-t-4 border-t-amber-500 shadow-md rounded-md p-4 text-xs sm:text-sm bg-white ${className}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
        {/* Baris 1 */}
        <div className="flex items-center">
          <label className="w-32 font-medium text-amber-600">Penerima</label>
          <SearchableDropdown
            options={penerimaOptions}
            defaultValue={filters.penerima}
            onChange={(value) => handleFilterChange("penerima", value)}
            className="w-full"
          />
        </div>

        <div className="flex items-center">
          <label className="w-32 font-medium text-amber-600">Periode Masuk</label>
          <SearchableDropdown
            options={periodeOptions}
            defaultValue={filters.periodeMasuk}
            onChange={(value) => handleFilterChange("periodeMasuk", value)}
            className="w-full"
          />
        </div>

        {/* Divider */}
        <div className="md:col-span-2 border-b border-gray-200"></div>

        {/* Baris 2 */}
        <div className="flex items-center">
          <label className="w-32 font-medium text-amber-600">Unit</label>
          <SearchableDropdown
            options={unitOptions}
            defaultValue={filters.unit}
            onChange={(value) => handleFilterChange("unit", value)}
            className="w-full"
          />
        </div>

        <div className="flex items-center">
          <label className="w-32 font-medium text-amber-600">Status</label>
          <SearchableDropdown
            options={statusOptions}
            defaultValue={filters.status}
            onChange={(value) => handleFilterChange("status", value)}
            className="w-full"
          />
        </div>

        {/* Divider */}
        <div className="md:col-span-2 border-b border-gray-200"></div>

        {/* Baris 3 */}
        <div className="flex items-center">
          <label className="w-32 font-medium text-amber-600">Jenis Akun</label>
          <SearchableDropdown
            options={jenisAkunOptions}
            defaultValue={filters.jenisAkun}
            onChange={(value) => handleFilterChange("jenisAkun", value)}
            className="w-full"
          />
        </div>

        <div className="flex items-center">
          <label className="w-32 font-medium text-amber-600">Frekuensi</label>
          <SearchableDropdown
            options={frekuensiOptions}
            defaultValue={filters.frekuensi}
            onChange={(value) => handleFilterChange("frekuensi", value)}
            className="w-full"
          />
        </div>

        {/* Divider */}
        <div className="md:col-span-2 border-b border-gray-200"></div>

        {/* Baris 4 */}
        <div className="flex items-center">
          <label className="w-32 font-medium text-amber-600">Kelompok</label>
          <SearchableDropdown
            options={kelompokOptions}
            defaultValue={filters.kelompok}
            onChange={(value) => handleFilterChange("kelompok", value)}
            className="w-full"
          />
        </div>

        <div className="flex justify-end items-center">
          <button
            type="button"
            onClick={handleSubmit}
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

export default FilterDataMonitoringTarifCard;

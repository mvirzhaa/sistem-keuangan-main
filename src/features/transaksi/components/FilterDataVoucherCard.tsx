import React, { useState, useEffect } from "react";
import Dropdown from "../../../components/inputs/Dropdown";
import { IoFilter } from "react-icons/io5";
import { useReferensiStore } from "../../../common/stores/referensiStore";

export interface FilterVoucherValues {
  voucher: string;
  penerima: string;
  periodeAkademik: string;
}

export const defaultFilterVoucherValues: FilterVoucherValues = {
  voucher: "-- Semua Potongan --",
  penerima: "Pendaftar",
  periodeAkademik: "-- Semua Periode --",
};

interface FilterDataVoucherProps {
  onFilter?: (filters: FilterVoucherValues) => void;
  className?: string;
  initialFilters?: FilterVoucherValues;
}

const FilterDataVoucherCard: React.FC<FilterDataVoucherProps> = ({
  onFilter,
  className = "",
  initialFilters,
}) => {
  const { data: referensi, fetchReferensi } = useReferensiStore();

  useEffect(() => {
    fetchReferensi();
  }, [fetchReferensi]);

  const [filters, setFilters] = useState<FilterVoucherValues>(
    initialFilters || defaultFilterVoucherValues
  );

  useEffect(() => {
    if (initialFilters) {
      setFilters(initialFilters);
    }
  }, [initialFilters]);

  // Options untuk dropdown
  const voucherOptions = [
    "-- Semua Potongan --",
    "KIP Sekolah Undangan",
    "Voucher Registrasi Ulang",
    "Voucher Pendaftaran",
    "Voucher UKT",
  ];

  const penerimaOptions = [
    "Pendaftar",
    ...(referensi.penerima?.filter((p) => p !== "Pendaftar") || [
      "Mahasiswa",
      "Dosen",
      "Karyawan",
    ]),
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
  const handleFilterChange = (key: keyof FilterVoucherValues, value: string) => {
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Baris 1: Voucher & Penerima */}
        <div className="flex items-center">
          <label className="w-40 font-semibold text-amber-600 text-sm shrink-0">
            Voucher
          </label>
          <div className="flex-1">
            <Dropdown
              options={voucherOptions}
              value={filters.voucher}
              defaultValue="-- Semua Potongan --"
              onChange={(value) => handleFilterChange("voucher", value)}
              className="w-full text-sm"
            />
          </div>
        </div>

        <div className="flex items-center">
          <label className="w-40 font-semibold text-amber-600 text-sm shrink-0">
            Penerima
          </label>
          <div className="flex-1">
            <Dropdown
              options={penerimaOptions}
              value={filters.penerima}
              defaultValue="Pendaftar"
              onChange={(value) => handleFilterChange("penerima", value)}
              className="w-full text-sm"
            />
          </div>
        </div>

        {/* Baris 2: Periode Akademik & Button Simpan Filter */}
        <div className="flex items-center">
          <label className="w-40 font-semibold text-amber-600 text-sm shrink-0">
            Periode Akademik
          </label>
          <div className="flex-1">
            <Dropdown
              options={periodeAkademikOptions}
              value={filters.periodeAkademik}
              defaultValue="-- Semua Periode --"
              onChange={(value) =>
                handleFilterChange("periodeAkademik", value)
              }
              className="w-full text-sm"
            />
          </div>
        </div>

        {/* Tombol Simpan Filter: tetap text-xs font-semibold */}
        <div className="flex justify-end items-center">
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

export default FilterDataVoucherCard;

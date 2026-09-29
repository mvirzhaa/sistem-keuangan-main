import React, { useState } from "react";
import Dropdown from "../../../components/inputs/Dropdown";
import { IoFilter } from "react-icons/io5";

interface FilterDataVoucherProps {
  onFilter?: (filters: FilterValues) => void;
  className?: string;
}

interface FilterValues {
  voucher: string;
  penerima: string;
  periodeAkademik: string;
}

const FilterDataVoucherCard: React.FC<FilterDataVoucherProps> = ({ onFilter, className = "" }) => {
  const [filters, setFilters] = useState<FilterValues>({
    voucher: "-- Semua Potongan --",
    penerima: "Pendaftar",
    periodeAkademik: "-- Semua Periode --",
  });

  // Options untuk dropdown
  const voucherOptions = ["-- Semua Potongan --", "Voucher Registrasi Ulang", "Voucher Pendaftaran", "Voucher UKT"];
  const penerimaOptions = ["Pendaftar", "Mahasiswa", "Dosen", "Karyawan"];
  const periodeAkademikOptions = ["-- Semua Periode --", "2024 Genap", "2024 Ganjil", "2023 Genap", "2023 Ganjil"];

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
    <div className={`border-t-4 border-t-amber-500 rounded-md shadow-md p-5 text-xs ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Baris 1 */}
        <div className="flex items-center">
          <label className="w-40 font-medium text-amber-600">Voucher</label>
          <Dropdown options={voucherOptions} defaultValue={filters.voucher} onChange={(value) => handleFilterChange("voucher", value)} className="w-full" />
        </div>

        <div className="flex items-center">
          <label className="w-40 font-medium text-amber-600">Penerima</label>
          <Dropdown options={penerimaOptions} defaultValue={filters.penerima} onChange={(value) => handleFilterChange("penerima", value)} className="w-full" />
        </div>

        {/* Baris 2 */}
        <div className="flex items-center">
          <label className="w-40 font-medium text-amber-600">Periode Akademik</label>
          <Dropdown options={periodeAkademikOptions} defaultValue={filters.periodeAkademik} onChange={(value) => handleFilterChange("periodeAkademik", value)} className="w-full" />
        </div>

        {/* Empty space untuk alignment */}
        <div className="flex justify-end items-center">
          <button onClick={handleSubmit} className="bg-amber-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-amber-600 transition-colors">
            <IoFilter className="mr-2" />
            Simpan Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterDataVoucherCard;

import React, { useState } from "react";
import SearchableDropdown from "../../../components/inputs/SearchableDropdown";
import { IoFilter } from "react-icons/io5";

interface FilterDataPotonganDanBeasiswaProps {
  onFilter?: (filters: FilterValues) => void;
  className?: string;
}

interface FilterValues {
  jenisPotongan: string;
  penerima: string;
  beasiswa: string;
  periodeAkademik: string;
}

const FilterDataPotonganDanBeasiswaCard: React.FC<FilterDataPotonganDanBeasiswaProps> = ({ onFilter, className = "" }) => {
  const [filters, setFilters] = useState<FilterValues>({
    jenisPotongan: "Beasiswa",
    penerima: "Mahasiswa",
    beasiswa: "-- Semua Beasiswa --",
    periodeAkademik: "-- Semua Periode --",
  });

  // Options untuk dropdown
  const jenisPotonganOptions = ["Beasiswa", "Potongan Biaya"];
  const penerimaOptions = ["Mahasiswa", "Dosen", "Tenaga Pendidik"];
  const beasiswaOptions = ["-- Semua Beasiswa --", "Beasiswa KIP", "Beasiswa PPA", "Beasiswa ADIK", "Beasiswa Tahfidz"];
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        {/* Baris 1 */}
        <div className="flex items-center">
          <label className="w-32 font-medium text-amber-600">Jenis Potongan</label>
          <SearchableDropdown options={jenisPotonganOptions} defaultValue={filters.jenisPotongan} onChange={(value) => handleFilterChange("jenisPotongan", value)} className="w-full" />
        </div>

        <div className="flex items-center">
          <label className="w-32 font-medium text-amber-600">Beasiswa</label>
          <SearchableDropdown options={beasiswaOptions} defaultValue={filters.beasiswa} onChange={(value) => handleFilterChange("beasiswa", value)} className="w-full" />
        </div>

        {/* Baris 2 */}
        <div className="flex items-center">
          <label className="w-32 font-medium text-amber-600">Penerima</label>
          <SearchableDropdown options={penerimaOptions} defaultValue={filters.penerima} onChange={(value) => handleFilterChange("penerima", value)} className="w-full" />
        </div>

        <div className="flex items-center">
          <label className="w-32 font-medium text-amber-600">Periode Akademik</label>
          <SearchableDropdown options={periodeAkademikOptions} defaultValue={filters.periodeAkademik} onChange={(value) => handleFilterChange("periodeAkademik", value)} className="w-full" />
        </div>

        {/* Tombol Simpan Filter */}
        <div className="md:col-span-2 flex justify-end">
          <button onClick={handleSubmit} className="bg-amber-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-amber-600 transition-colors">
            <IoFilter className="mr-2" />
            Simpan Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterDataPotonganDanBeasiswaCard;

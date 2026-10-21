import React, { useState, useEffect } from "react";
import Dropdown from "../../../components/inputs/Dropdown";
import { IoFilter } from "react-icons/io5";

interface FilterDataPengaturanJenisTagihanCardProps {
  currentPeriode?: string;
  onFilter?: (periode: string) => void;
  onSaveFilter?: (periode: string) => void;
  className?: string;
}

const periodeOptions = [
  "2024 Genap",
  "2024 Ganjil",
  "2025 Genap",
  "2025 Ganjil",
];

const FilterDataPengaturanJenisTagihanCard: React.FC<
  FilterDataPengaturanJenisTagihanCardProps
> = ({ currentPeriode, onFilter, onSaveFilter, className = "" }) => {
  const [periode, setPeriode] = useState(currentPeriode || periodeOptions[0]);

  useEffect(() => {
    if (currentPeriode) {
      setPeriode(currentPeriode);
    }
  }, [currentPeriode]);

  const handleSave = () => {
    if (onSaveFilter) {
      onSaveFilter(periode);
    } else if (onFilter) {
      onFilter(periode);
    }
  };

  return (
    <div
      className={`bg-white border-t-4 border-t-amber-500 rounded-md shadow-md p-4 text-xs ${className}`}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <label className="font-bold text-amber-600 w-36 sm:w-40 text-sm shrink-0">
            Periode Akademik
          </label>
          <Dropdown
            options={periodeOptions}
            value={periode}
            defaultValue={periode}
            onChange={(val) => setPeriode(val)}
            className="w-64"
          />
        </div>

        <div className="flex justify-end items-center shrink-0 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleSave}
            className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md flex items-center text-xs font-medium cursor-pointer shadow-xs transition-colors"
          >
            <IoFilter className="mr-2 text-sm" />
            Simpan Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterDataPengaturanJenisTagihanCard;

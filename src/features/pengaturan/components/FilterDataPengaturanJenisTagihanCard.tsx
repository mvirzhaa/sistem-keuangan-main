import React, { useState } from "react";
import Dropdown from "../../../components/inputs/Dropdown";

interface FilterDataPengaturanJenisTagihanCardProps {
  onFilter?: (periode: string) => void;
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
> = ({ onFilter, className = "" }) => {
  const [periode, setPeriode] = useState(periodeOptions[0]);

  const handleChange = (value: string) => {
    setPeriode(value);
    if (onFilter) onFilter(value);
  };

  return (
    <div
      className={`border-t-4 border-t-amber-500 rounded-md shadow-md p-4 text-xs bg-white ${className}`}
    >
      <div className="flex items-center gap-4">
        <label className="font-bold text-amber-600 w-40">
          Periode Akademik
        </label>
        <Dropdown
          options={periodeOptions}
          defaultValue={periode}
          onChange={handleChange}
          className="w-64"
        />
      </div>
    </div>
  );
};

export default FilterDataPengaturanJenisTagihanCard;

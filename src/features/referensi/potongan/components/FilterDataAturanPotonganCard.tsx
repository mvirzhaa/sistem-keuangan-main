import React, { useState } from "react";
import SearchableDropdown from "../../../../components/inputs/SearchableDropdown";
import { IoFilter } from "react-icons/io5";

interface FilterDataAturanPotonganCardProps {
  onFilter?: (selectedPotongan: string) => void;
  className?: string;
  initialPotongan?: string;
}

const FilterDataAturanPotonganCard: React.FC<
  FilterDataAturanPotonganCardProps
> = ({ onFilter, className = "", initialPotongan }) => {
  const [selectedPotongan, setSelectedPotongan] = useState(
    initialPotongan || "Beasiswa Pemerintah Kota Bogor 2023",
  );

  const potonganOptions = [
    "Beasiswa Pemerintah Kota Bogor 2023",
    "Beasiswa Hafidz 30 Juz 2025 Skema Diamond",
    "Beasiswa Hafidz 30 Juz 2025 Skema Gold",
    "Beasiswa Hafidz 30 Juz 2025 Skema Platinum",
    "Beasiswa Hafidz 30 Juz 2025 Skema Silver",
    "KIP Kuliah 2024",
  ];

  const handlePotonganChange = (value: string) => {
    setSelectedPotongan(value);
  };

  const handleSubmit = () => {
    if (onFilter) {
      onFilter(selectedPotongan);
    }
  };

  return (
    <div
      className={`bg-white border-t-4 border-t-amber-500 rounded-md shadow-md p-5 text-xs ${className}`}
    >
      <div className="flex flex-col md:flex-row md:items-center">
        <label className="w-32 text-sm font-medium text-amber-600 mb-2 md:mb-0">
          Potongan
        </label>
        <div className="flex-1">
          <SearchableDropdown
            options={potonganOptions}
            defaultValue={selectedPotongan}
            value={selectedPotongan}
            onChange={handlePotonganChange}
            className="w-full text-xs"
            placeholder="Pilih potongan"
            searchPlaceholder="Cari potongan..."
          />
        </div>
      </div>

      {/* Tombol Simpan Filter */}
      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md flex items-center text-xs font-medium cursor-pointer shadow-xs transition-colors"
        >
          <IoFilter className="mr-2 text-sm" />
          Simpan Filter
        </button>
      </div>
    </div>
  );
};

export default FilterDataAturanPotonganCard;

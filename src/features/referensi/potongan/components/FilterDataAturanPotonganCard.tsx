import React, { useState } from "react";
import SearchableDropdown from "../../../../components/inputs/SearchableDropdown";

interface FilterDataAturanPotonganCardProps {
  onFilter?: (selectedPotongan: string) => void;
  className?: string;
}

const FilterDataAturanPotonganCard: React.FC<
  FilterDataAturanPotonganCardProps
> = ({ onFilter, className = "" }) => {
  const [selectedPotongan, setSelectedPotongan] = useState(
    "Beasiswa Pemerintah Kota Bogor 2023",
  );

  // Sample potongan options - you can replace with your actual data
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

    if (onFilter) {
      onFilter(value);
    }
  };

  return (
    <div
      className={`border-t-4 border-t-amber-500 rounded-md shadow-md p-5 text-xs ${className}`}
    >
      <div className="flex flex-col md:flex-row md:items-center">
        <label className="w-32 font-medium text-amber-600 mb-2 md:mb-0">
          Potongan
        </label>
        <div className="flex-1">
          <SearchableDropdown
            options={potonganOptions}
            defaultValue={selectedPotongan}
            onChange={handlePotonganChange}
            className="w-full"
            placeholder="Pilih potongan"
            searchPlaceholder="Cari potongan..."
          />
        </div>
      </div>
    </div>
  );
};

export default FilterDataAturanPotonganCard;

import React, { useState, useEffect } from "react";
import Dropdown from "../../../../components/inputs/Dropdown";
import { IoFilter } from "react-icons/io5";

export interface FilterValues {
  channel: string;
}

export const defaultFilterValues: FilterValues = {
  channel: "-- Semua Channel --",
};

interface FilterDataPromoEdufinCardProps {
  onFilter?: (filters: FilterValues) => void;
  className?: string;
  initialFilters?: FilterValues;
}

const FilterDataPromoEdufinCard: React.FC<FilterDataPromoEdufinCardProps> = ({
  onFilter,
  className = "",
  initialFilters,
}) => {
  const [filters, setFilters] = useState<FilterValues>(
    initialFilters || defaultFilterValues,
  );

  useEffect(() => {
    if (initialFilters) {
      setFilters(initialFilters);
    }
  }, [initialFilters]);

  // Options untuk dropdown
  const channelOptions = [
    "-- Semua Channel --",
    "Bank Syariah Indonesia",
    "BPRS Amanah Ummah",
    "OVO",
    "Tokopedia",
    "Kasir BASK UiKA",
  ];

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
      className={`bg-white border-t-4 border-t-amber-500 rounded-md shadow-md p-5 text-xs ${className}`}
    >
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
        {/* Single row with channel filter */}
        <div className="flex-1 flex items-center">
          <label className="w-24 font-medium text-amber-600 text-sm">
            Channel
          </label>
          <Dropdown
            options={channelOptions}
            value={filters.channel}
            defaultValue={filters.channel}
            onChange={(value) => handleFilterChange("channel", value)}
            className="w-full text-xs"
          />
        </div>

        {/* Tombol Simpan Filter */}
        <div className="flex justify-end items-center shrink-0">
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
    </div>
  );
};

export default FilterDataPromoEdufinCard;

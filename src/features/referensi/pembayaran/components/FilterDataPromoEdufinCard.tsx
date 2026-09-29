import React, { useState } from "react";
import Dropdown from "../../../../components/inputs/Dropdown";
import { IoFilter } from "react-icons/io5";

interface FilterDataPromoEdufinCardProps {
  onFilter?: (filters: FilterValues) => void;
  className?: string;
}

interface FilterValues {
  channel: string;
}

const FilterDataPromoEdufinCard: React.FC<FilterDataPromoEdufinCardProps> = ({
  onFilter,
  className = "",
}) => {
  const [filters, setFilters] = useState<FilterValues>({
    channel: "-- Semua Channel --",
  });

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
      className={`border-t-4 border-t-amber-500 rounded-md shadow-md p-5 text-xs ${className}`}
    >
      <div className="grid grid-cols-1 gap-2">
        {/* Single row with channel filter */}
        <div className="flex items-center">
          <label className="w-24 font-medium text-amber-600">Channel</label>
          <Dropdown
            options={channelOptions}
            defaultValue={filters.channel}
            onChange={(value) => handleFilterChange("channel", value)}
            className="w-full"
          />
        </div>
      </div>

      {/* No submit button needed for simple single filter */}
    </div>
  );
};

export default FilterDataPromoEdufinCard;

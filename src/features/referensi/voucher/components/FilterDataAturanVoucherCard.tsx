import React, { useState } from "react";
import SearchableDropdown from "../../../../components/inputs/SearchableDropdown";

interface FilterDataAturanVoucherCardProps {
  onFilter?: (selectedVoucher: string) => void;
  className?: string;
}

const FilterDataAturanVoucherCard: React.FC<
  FilterDataAturanVoucherCardProps
> = ({ onFilter, className = "" }) => {
  const [selectedVoucher, setSelectedVoucher] = useState(
    "KIP Aspirasi PKS 150 Kota Bogor - KIPASPUIKA25",
  );

  // Sample voucher options - you can replace with your actual data
  const voucherOptions = [
    "KIP Aspirasi PKS 150 Kota Bogor - KIPASPUIKA25",
    "KIP Abah Sogir 30 - KIPSGRUIKA25",
    "KIP Aspirasi Nasdem 31 - KIPNSDMUIKA25",
    "KIP Aspirasi PKS 25 Kab. Bogor - KIPKASP25",
    "KIP Khusus Kota Bekasi - KIPBEKASI25",
    "KIP Khusus Kota Depok - KIPDEPOK25",
    "KIP Sekolah Undangan - KIPUIKA25",
    "KIP Sekolah Undangan - KIP2025UIKAJ4Y4",
  ];

  const handleVoucherChange = (value: string) => {
    setSelectedVoucher(value);

    if (onFilter) {
      onFilter(value);
    }
  };

  return (
    <div
      className={`border-t-4 border-t-amber-500 rounded-md shadow-md p-5 text-xs ${className}`}
    >
      <div className="flex flex-col md:flex-row md:items-center">
        <label className="text-amber-600 font-medium mb-2 md:mb-0 md:w-32">
          Voucher
        </label>
        <div className="flex-1">
          <SearchableDropdown
            options={voucherOptions}
            defaultValue={selectedVoucher}
            onChange={handleVoucherChange}
            className="w-full"
            placeholder="Pilih voucher"
            searchPlaceholder="Cari voucher..."
          />
        </div>
      </div>
    </div>
  );
};

export default FilterDataAturanVoucherCard;

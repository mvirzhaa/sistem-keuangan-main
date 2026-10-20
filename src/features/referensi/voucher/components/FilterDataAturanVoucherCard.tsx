import React, { useState } from "react";
import SearchableDropdown from "../../../../components/inputs/SearchableDropdown";
import { IoFilter } from "react-icons/io5";

interface FilterDataAturanVoucherCardProps {
  onFilter?: (selectedVoucher: string) => void;
  className?: string;
  initialVoucher?: string;
}

const FilterDataAturanVoucherCard: React.FC<
  FilterDataAturanVoucherCardProps
> = ({ onFilter, className = "", initialVoucher }) => {
  const [selectedVoucher, setSelectedVoucher] = useState(
    initialVoucher || "KIP Aspirasi PKS 150 Kota Bogor - KIPASPUIKA25",
  );

  // Sample voucher options
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
  };

  const handleSubmit = () => {
    if (onFilter) {
      onFilter(selectedVoucher);
    }
  };

  return (
    <div
      className={`bg-white border-t-4 border-t-amber-500 rounded-md shadow-md p-5 text-xs ${className}`}
    >
      <div className="flex flex-col md:flex-row md:items-center">
        <label className="text-amber-600 text-sm font-medium mb-2 md:mb-0 md:w-32">
          Voucher
        </label>
        <div className="flex-1">
          <SearchableDropdown
            options={voucherOptions}
            defaultValue={selectedVoucher}
            value={selectedVoucher}
            onChange={handleVoucherChange}
            className="w-full text-xs"
            placeholder="Pilih voucher"
            searchPlaceholder="Cari voucher..."
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

export default FilterDataAturanVoucherCard;


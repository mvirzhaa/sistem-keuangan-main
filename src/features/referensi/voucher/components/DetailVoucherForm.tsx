import React, { useState, useEffect } from "react";
import TextField from "../../../../components/inputs/TextField";
import Dropdown from "../../../../components/inputs/Dropdown";
import DatePicker from "../../../../components/inputs/DatePicker";

export interface DetailVoucherFormData {
  id?: string;
  kodeVoucher: string;
  namaVoucher: string;
  periodeAwal: string;
  periodeAkhir: string;
  tglExpired: string;
  nominal: number;
  anggaran: number;
  realisasi: number;
}

interface DetailVoucherFormProps {
  initialData?: DetailVoucherFormData;
  onChange?: (data: DetailVoucherFormData) => void;
}

const DetailVoucherForm: React.FC<DetailVoucherFormProps> = ({
  initialData,
  onChange,
}) => {
  const [formData, setFormData] = useState<DetailVoucherFormData>(
    initialData || {
      kodeVoucher: "",
      namaVoucher: "",
      periodeAwal: "2025 Genap",
      periodeAkhir: "2025 Genap",
      tglExpired: "",
      nominal: 0,
      anggaran: 0,
      realisasi: 0,
    },
  );

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  // State for the auto-generate checkbox
  const [autoGenerateCode, setAutoGenerateCode] = useState(false);

  // Options for dropdowns
  const periodeOptions = [
    "2025 Genap",
    "2025 Ganjil",
    "2024 Genap",
    "2024 Ganjil",
  ];

  const updateFormData = (updated: Partial<DetailVoucherFormData>) => {
    setFormData((prev) => {
      const next = { ...prev, ...updated };
      if (onChange) {
        onChange(next);
      }
      return next;
    });
  };

  const handleTextChange = (field: keyof DetailVoucherFormData, value: string) => {
    updateFormData({ [field]: value });
  };

  const handleNumberChange = (field: keyof DetailVoucherFormData, value: string) => {
    const numericValue = parseFloat(value.replace(/[^\d]/g, ""));
    updateFormData({ [field]: isNaN(numericValue) ? 0 : numericValue });
  };

  const handleDropdownChange = (field: keyof DetailVoucherFormData, value: string) => {
    updateFormData({ [field]: value });
  };

  const handleDateChange = (field: keyof DetailVoucherFormData, value: string) => {
    updateFormData({ [field]: value });
  };

  const handleGenerateKode = () => {
    const randomCode = `VOUCHER${Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")}`;

    updateFormData({ kodeVoucher: randomCode });
  };

  // Toggle the auto-generate checkbox
  const handleAutoGenerateToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setAutoGenerateCode(isChecked);

    if (isChecked) {
      handleGenerateKode();
    }
  };

  return (
    <div className="space-y-5 py-5">
      {/* First row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
        {/* Left side - Kode Voucher */}
        <div className="flex items-start">
          <div className="w-1/3 pt-1.5">
            <label className="text-sm font-medium text-blue-600 select-none">
              Kode Voucher<span className="text-red-500">*</span>
            </label>
          </div>
          <div className="w-2/3 flex flex-col">
            <TextField
              value={formData.kodeVoucher}
              onChange={(value) => handleTextChange("kodeVoucher", value)}
              className="w-full"
              disabled={autoGenerateCode}
            />
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                id="autoGenerateCheckbox"
                checked={autoGenerateCode}
                onChange={handleAutoGenerateToggle}
                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
              />
              <label
                htmlFor="autoGenerateCheckbox"
                className="text-sm text-blue-600 hover:underline cursor-pointer select-none"
              >
                Generate Kode Otomatis
              </label>
            </div>
          </div>
        </div>

        {/* Right side - Tgl. Expired */}
        <div className="flex items-center">
          <div className="w-1/3">
            <label className="text-sm font-medium text-blue-600 select-none">
              Tgl. Expired
            </label>
          </div>
          <div className="w-2/3">
            <DatePicker
              value={formData.tglExpired}
              onChange={(value) => handleDateChange("tglExpired", value)}
              placeholder="dd-mm-yyyy"
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Second row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
        {/* Left side - Nama Voucher */}
        <div className="flex items-center">
          <div className="w-1/3">
            <label className="text-sm font-medium text-blue-600 select-none">
              Nama Voucher<span className="text-red-500">*</span>
            </label>
          </div>
          <div className="w-2/3">
            <TextField
              value={formData.namaVoucher}
              onChange={(value) => handleTextChange("namaVoucher", value)}
              className="w-full"
            />
          </div>
        </div>

        {/* Right side - Nominal */}
        <div className="flex items-center">
          <div className="w-1/3">
            <label className="text-sm font-medium text-blue-600 select-none">
              Nominal<span className="text-red-500">*</span>
            </label>
          </div>
          <div className="w-2/3">
            <TextField
              value={formData.nominal.toString()}
              onChange={(value) => handleNumberChange("nominal", value)}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Third row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
        {/* Left side - Periode Awal */}
        <div className="flex items-center">
          <div className="w-1/3">
            <label className="text-sm font-medium text-blue-600 select-none">
              Periode Awal
            </label>
          </div>
          <div className="w-2/3">
            <Dropdown
              options={periodeOptions}
              defaultValue={formData.periodeAwal}
              onChange={(value) => handleDropdownChange("periodeAwal", value)}
              className="w-full"
            />
          </div>
        </div>

        {/* Right side - Anggaran */}
        <div className="flex items-center">
          <div className="w-1/3">
            <label className="text-sm font-medium text-blue-600 select-none">
              Anggaran<span className="text-red-500">*</span>
            </label>
          </div>
          <div className="w-2/3">
            <TextField
              value={formData.anggaran.toString()}
              onChange={(value) => handleNumberChange("anggaran", value)}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Fourth row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
        {/* Left side - Periode Akhir */}
        <div className="flex items-center">
          <div className="w-1/3">
            <label className="text-sm font-medium text-blue-600 select-none">
              Periode Akhir
            </label>
          </div>
          <div className="w-2/3">
            <Dropdown
              options={periodeOptions}
              defaultValue={formData.periodeAkhir}
              onChange={(value) => handleDropdownChange("periodeAkhir", value)}
              className="w-full"
            />
          </div>
        </div>

        {/* Right side - Realisasi */}
        <div className="flex items-center">
          <div className="w-1/3">
            <label className="text-sm font-medium text-blue-600 select-none">
              Realisasi
            </label>
          </div>
          <div className="w-2/3">
            <TextField
              value={formData.realisasi.toString()}
              onChange={(value) => handleNumberChange("realisasi", value)}
              className="w-full"
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailVoucherForm;


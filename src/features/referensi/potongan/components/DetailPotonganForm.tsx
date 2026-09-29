import React, { useState } from "react";
import TextField from "../../../../components/inputs/TextField";
import Dropdown from "../../../../components/inputs/Dropdown";

interface DetailPotonganFormProps {
  initialData?: {
    namaPotongan: string;
    rekanan: string;
    periodeAwal: string;
    periodeAkhir: string;
    nominalPotongan: number;
    anggaran: number;
    jenisPotongan: string;
    jumlahPenerima: number;
    realisasi: number;
    memotongTagihan: boolean;
    tipePotongan: string;
  };
  onSave?: (data: any) => void;
}

const DetailPotonganForm: React.FC<DetailPotonganFormProps> = ({
  initialData,
  onSave,
}) => {
  const [formData, setFormData] = useState(
    initialData || {
      namaPotongan: "",
      rekanan: "-- Pilih Rekanan --",
      periodeAwal: "2025 Genap",
      periodeAkhir: "2025 Genap",
      nominalPotongan: 0,
      anggaran: 0,
      jenisPotongan: "Potongan",
      jumlahPenerima: 0,
      realisasi: 0,
      memotongTagihan: false,
      tipePotongan: "Potongan Rata",
    },
  );

  // Options for dropdowns
  const rekananOptions = [
    "-- Pilih Rekanan --",
    "Universitas Ibn Khaldun",
    "Bank Syariah Indonesia",
    "Pemerintah",
  ];
  const periodeOptions = [
    "2025 Genap",
    "2025 Ganjil",
    "2024 Genap",
    "2024 Ganjil",
  ];
  const jenisPotonganOptions = ["Potongan", "Beasiswa", "Voucher"];
  const tipePotonganOptions = ["Potongan Rata", "Persentase", "Bertahap"];

  const handleTextChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNumberChange = (field: string, value: string) => {
    // Remove non-numeric characters and parse
    const numericValue = parseFloat(value.replace(/[^\d]/g, ""));
    setFormData((prev) => ({
      ...prev,
      [field]: isNaN(numericValue) ? 0 : numericValue,
    }));
  };

  const handleCheckboxChange = (field: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: checked,
    }));
  };

  const handleDropdownChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="space-y-4 text-sm">
      {/* First row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
        <div className="flex items-center">
          <label className="text-blue-600 font-medium w-32 pr-20">
            Nama Potongan<span className="text-red-500">*</span>
          </label>
          <TextField
            value={formData.namaPotongan}
            onChange={(e) => handleTextChange("namaPotongan", e)}
            placeholder="Masukkan nama potongan"
            className="w-full text-sm"
            fullWidth={true}
          />
        </div>

        <div className="flex items-center">
          <label className="text-blue-600 font-medium w-32 pr-4">Rekanan</label>
          <Dropdown
            options={rekananOptions}
            defaultValue={formData.rekanan}
            onChange={(value) => handleDropdownChange("rekanan", value)}
            className="w-full flex-1 text-sm"
          />
        </div>
      </div>

      {/* Second row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
        <div className="flex items-center">
          <label className="text-blue-600 font-medium w-32 pr-4">
            Periode Awal
          </label>
          <Dropdown
            options={periodeOptions}
            defaultValue={formData.periodeAwal}
            onChange={(value) => handleDropdownChange("periodeAwal", value)}
            className="w-full flex-1 text-sm"
          />
        </div>

        <div className="flex items-center">
          <label className="text-blue-600 font-medium w-32 pr-4">
            Jumlah Penerima
          </label>
          <TextField
            type="text"
            value={formData.jumlahPenerima.toString()}
            onChange={(e) => handleNumberChange("jumlahPenerima", e)}
            className="w-full flex-1 text-sm"
            readOnly
          />
        </div>
      </div>

      {/* Third row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
        <div className="flex items-center">
          <label className="text-blue-600 font-medium w-32 pr-4">
            Periode Akhir
          </label>
          <Dropdown
            options={periodeOptions}
            defaultValue={formData.periodeAkhir}
            onChange={(value) => handleDropdownChange("periodeAkhir", value)}
            className="w-full flex-1 text-sm"
          />
        </div>

        <div className="flex items-center">
          <label className="text-blue-600 font-medium w-32 pr-4">
            Realisasi
          </label>
          <TextField
            value={
              formData.realisasi === 0 ? "0,00" : formData.realisasi.toString()
            }
            onChange={(e) => handleNumberChange("realisasi", e)}
            className="w-full flex-1 text-sm"
            readOnly
          />
        </div>
      </div>

      {/* Fourth row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
        <div className="flex items-center">
          <label className="text-blue-600 font-medium w-32 pr-4">
            Nominal Potongan<span className="text-red-500">*</span>
          </label>
          <TextField
            value={formData.nominalPotongan.toString()}
            onChange={(e) => handleNumberChange("nominalPotongan", e)}
            placeholder="0"
            className="w-full flex-1 text-sm"
          />
        </div>

        <div className="flex items-center">
          <label className="text-blue-600 font-medium w-32 pr-4">
            Memotong Tagihan?
          </label>
          <div className="flex-1">
            <input
              type="checkbox"
              checked={formData.memotongTagihan}
              onChange={(e) =>
                handleCheckboxChange("memotongTagihan", e.target.checked)
              }
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
          </div>
        </div>
      </div>

      {/* Fifth row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
        <div className="flex items-center">
          <label className="text-blue-600 font-medium w-32 pr-4">
            Anggaran<span className="text-red-500">*</span>
          </label>
          <TextField
            value={formData.anggaran.toString()}
            onChange={(e) => handleNumberChange("anggaran", e)}
            placeholder="0"
            className="w-full flex-1 text-sm text-right"
          />
        </div>

        <div className="flex items-center">
          <label className="text-blue-600 font-medium w-32 pr-4">
            Tipe Potongan
          </label>
          <Dropdown
            options={tipePotonganOptions}
            defaultValue={formData.tipePotongan}
            onChange={(value) => handleDropdownChange("tipePotongan", value)}
            className="w-full flex-1 text-sm"
          />
        </div>
      </div>

      {/* Sixth row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
        <div className="flex items-center">
          <label className="text-blue-600 font-medium w-32 pr-4">
            Jenis Potongan<span className="text-red-500">*</span>
          </label>
          <Dropdown
            options={jenisPotonganOptions}
            defaultValue={formData.jenisPotongan}
            onChange={(value) => handleDropdownChange("jenisPotongan", value)}
            className="w-full flex-1 text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default DetailPotonganForm;

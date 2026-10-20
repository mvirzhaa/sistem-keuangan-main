import React from "react";
import Dropdown from "../../../../components/inputs/Dropdown";

export interface DetailPotonganFormData {
  namaPotongan: string;
  tipePotongan: string;
  metodePotongan: string;
  nominalPotongan: string;
  anggaran: string;
  periodeAwal: string;
  periodeAkhir: string;
  jenisPotongan: string;
  rekanan: string;
  jumlahPenerima: string;
  realisasi: string;
  memotongTagihan: boolean;
}

interface DetailPotonganFormProps {
  formData: DetailPotonganFormData;
  onChange?: (field: keyof DetailPotonganFormData, value: any) => void;
  isReadOnly?: boolean;
}

const periodeOptions = [
  "2027 Genap",
  "2027 Ganjil",
  "2026 Genap",
  "2026 Ganjil",
  "2025 Genap",
  "2025 Ganjil",
  "2024 Genap",
  "2024 Ganjil",
];
const tipePotonganOptions = ["Potongan Rata", "Persentase", "Bertahap"];
const metodePotonganOptions = ["Nominal", "Persentase"];
const jenisPotonganOptions = ["Potongan", "Beasiswa", "Voucher"];
const rekananOptions = [
  "-- Pilih Rekanan --",
  "Universitas Ibn Khaldun",
  "Bank Syariah Indonesia",
  "Pemerintah",
];

const DetailPotonganForm: React.FC<DetailPotonganFormProps> = ({
  formData,
  onChange,
  isReadOnly = false,
}) => {
  const handleChange = (field: keyof DetailPotonganFormData, value: any) => {
    if (onChange) {
      onChange(field, value);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-4 my-6 text-sm">
      {/* Kolom Kiri */}
      <div className="space-y-4">
        {/* Nama Potongan* */}
        <div className="flex items-center">
          <label className="w-44 text-sm font-bold text-[#337ab7] shrink-0">
            Nama Potongan
            {!isReadOnly && <span className="text-red-500">*</span>}
          </label>
          {isReadOnly ? (
            <span className="text-sm font-medium text-gray-900 flex-1">
              {formData.namaPotongan || "-"}
            </span>
          ) : (
            <input
              type="text"
              value={formData.namaPotongan}
              onChange={(e) => handleChange("namaPotongan", e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500"
            />
          )}
        </div>

        {/* Tipe Potongan */}
        <div className="flex items-center">
          <label className="w-44 text-sm font-bold text-[#337ab7] shrink-0">
            Tipe Potongan
          </label>
          {isReadOnly ? (
            <span className="text-sm font-medium text-gray-900 flex-1">
              {formData.tipePotongan || "-"}
            </span>
          ) : (
            <Dropdown
              options={tipePotonganOptions}
              value={formData.tipePotongan}
              defaultValue={formData.tipePotongan}
              onChange={(val) => handleChange("tipePotongan", val)}
              className="w-full text-sm"
            />
          )}
        </div>

        {/* Metode Potongan */}
        <div className="flex items-center">
          <label className="w-44 text-sm font-bold text-[#337ab7] shrink-0">
            Metode Potongan
          </label>
          {isReadOnly ? (
            <span className="text-sm font-medium text-gray-900 flex-1">
              {formData.metodePotongan || "-"}
            </span>
          ) : (
            <Dropdown
              options={metodePotonganOptions}
              value={formData.metodePotongan}
              defaultValue={formData.metodePotongan}
              onChange={(val) => handleChange("metodePotongan", val)}
              className="w-full text-sm"
            />
          )}
        </div>

        {/* Nominal Potongan* */}
        <div className="flex items-center">
          <label className="w-44 text-sm font-bold text-[#337ab7] shrink-0">
            Nominal Potongan
            {!isReadOnly && <span className="text-red-500">*</span>}
          </label>
          {isReadOnly ? (
            <span className="text-sm font-medium text-gray-900 flex-1">
              {formData.nominalPotongan || "-"}
            </span>
          ) : (
            <input
              type="text"
              value={formData.nominalPotongan}
              onChange={(e) => handleChange("nominalPotongan", e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500"
            />
          )}
        </div>

        {/* Anggaran* */}
        <div className="flex items-center">
          <label className="w-44 text-sm font-bold text-[#337ab7] shrink-0">
            Anggaran
            {!isReadOnly && <span className="text-red-500">*</span>}
          </label>
          {isReadOnly ? (
            <span className="text-sm font-medium text-gray-900 flex-1">
              {formData.anggaran || "-"}
            </span>
          ) : (
            <input
              type="text"
              value={formData.anggaran}
              onChange={(e) => handleChange("anggaran", e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500"
            />
          )}
        </div>
      </div>

      {/* Kolom Kanan */}
      <div className="space-y-4">
        {/* Periode Awal */}
        <div className="flex items-center">
          <label className="w-44 text-sm font-bold text-[#337ab7] shrink-0">
            Periode Awal
          </label>
          {isReadOnly ? (
            <span className="text-sm font-medium text-gray-900 flex-1">
              {formData.periodeAwal || "-"}
            </span>
          ) : (
            <Dropdown
              options={periodeOptions}
              value={formData.periodeAwal}
              defaultValue={formData.periodeAwal}
              onChange={(val) => handleChange("periodeAwal", val)}
              className="w-full text-sm"
            />
          )}
        </div>

        {/* Periode Akhir */}
        <div className="flex items-center">
          <label className="w-44 text-sm font-bold text-[#337ab7] shrink-0">
            Periode Akhir
          </label>
          {isReadOnly ? (
            <span className="text-sm font-medium text-gray-900 flex-1">
              {formData.periodeAkhir || "-"}
            </span>
          ) : (
            <Dropdown
              options={periodeOptions}
              value={formData.periodeAkhir}
              defaultValue={formData.periodeAkhir}
              onChange={(val) => handleChange("periodeAkhir", val)}
              className="w-full text-sm"
            />
          )}
        </div>

        {/* Jenis Potongan* */}
        <div className="flex items-center">
          <label className="w-44 text-sm font-bold text-[#337ab7] shrink-0">
            Jenis Potongan
            {!isReadOnly && <span className="text-red-500">*</span>}
          </label>
          {isReadOnly ? (
            <span className="text-sm font-medium text-gray-900 flex-1">
              {formData.jenisPotongan || "-"}
            </span>
          ) : (
            <Dropdown
              options={jenisPotonganOptions}
              value={formData.jenisPotongan}
              defaultValue={formData.jenisPotongan}
              onChange={(val) => handleChange("jenisPotongan", val)}
              className="w-full text-sm"
            />
          )}
        </div>

        {/* Rekanan */}
        <div className="flex items-center">
          <label className="w-44 text-sm font-bold text-[#337ab7] shrink-0">
            Rekanan
          </label>
          {isReadOnly ? (
            <span className="text-sm font-medium text-gray-900 flex-1">
              {formData.rekanan || "-"}
            </span>
          ) : (
            <Dropdown
              options={rekananOptions}
              value={formData.rekanan}
              defaultValue={formData.rekanan}
              onChange={(val) => handleChange("rekanan", val)}
              className="w-full text-sm"
            />
          )}
        </div>

        {/* Jumlah Penerima */}
        <div className="flex items-center">
          <label className="w-44 text-sm font-bold text-[#337ab7] shrink-0">
            Jumlah Penerima
          </label>
          <span className="text-sm font-medium text-gray-900 flex-1">
            {formData.jumlahPenerima || ""}
          </span>
        </div>

        {/* Realisasi */}
        <div className="flex items-center">
          <label className="w-44 text-sm font-bold text-[#337ab7] shrink-0">
            Realisasi
          </label>
          <span className="text-sm font-medium text-gray-900 flex-1">
            {formData.realisasi || ""}
          </span>
        </div>

        {/* Memotong Tagihan? */}
        <div className="flex items-center">
          <label className="w-44 text-sm font-bold text-[#337ab7] shrink-0">
            Memotong Tagihan?
          </label>
          <div className="flex-1 flex items-center">
            {isReadOnly ? (
              <span className="text-sm font-medium text-gray-900">
                {formData.memotongTagihan ? "✓" : "✕"}
              </span>
            ) : (
              <input
                type="checkbox"
                checked={formData.memotongTagihan}
                onChange={(e) =>
                  handleChange("memotongTagihan", e.target.checked)
                }
                className="h-4 w-4 text-green-600 rounded cursor-pointer"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPotonganForm;

import React, { useState, useEffect } from "react";
import TextField from "../../../components/inputs/TextField";
import Dropdown from "../../../components/inputs/Dropdown";
import DatePicker from "../../../components/inputs/DatePicker";
import AutoComplete from "../../../components/inputs/AutoComplete";

interface DetailDepositFormData {
  kodeDeposit?: string;
  penerima: string;
  mahasiswa: string | null;
  tglDeposit: string;
  periode: string;
  metodePembayaran: string;
  channel: string;
  nominal: number;
  uraian: string;
}

interface DetailDepositFormProps {
  initialData?: Partial<DetailDepositFormData>;
  onSubmit?: (data: DetailDepositFormData) => void;
  onChange?: (data: DetailDepositFormData) => void;
  readOnly?: boolean;
}

// Options untuk dropdown
const penerimaOptions = ["Mahasiswa", "Dosen", "Karyawan"];
const periodeOptions = ["-- Pilih Periode --", "20241", "20242", "20251", "20252"];
const metodePembayaranOptions = ["-- Pilih Metode Pembayaran --", "Cash", "Transfer", "Virtual Account", "QRIS"];
const channelOptions = ["-- Pilih Channel --", "Bank BNI", "Bank Mandiri", "Bank BCA", "Shopee", "GoPay"];

// Options untuk mahasiswa (contoh data)
const mahasiswaOptions = [
  { value: "211105010366", label: "AHMAD NABIL MUASSYAF KAMIL" },
  { value: "211105010318", label: "AHMAD NUR RANDI" },
  { value: "221106043033", label: "MUHAMMAD SYAIFULLAH NURROHMAN" },
  { value: "221106043019", label: "AZKA FADILAH RAHMAN" },
  { value: "221106023147", label: "NOVAL LUTFI FUADI" },
];

const DetailDepositForm: React.FC<DetailDepositFormProps> = ({ initialData = {}, onSubmit, onChange, readOnly = false }) => {
  const defaultData: DetailDepositFormData = {
    kodeDeposit: "Generate Otomatis",
    penerima: "Mahasiswa",
    mahasiswa: null,
    tglDeposit: "",
    periode: "-- Pilih Periode --",
    metodePembayaran: "-- Pilih Metode Pembayaran --",
    channel: "-- Pilih Channel --",
    nominal: 0,
    uraian: "",
  };

  const [formData, setFormData] = useState<DetailDepositFormData>({
    ...defaultData,
    ...initialData,
  });

  useEffect(() => {
    if (onChange) {
      onChange(formData);
    }
  }, [formData, onChange]);

  const handleChange = (field: keyof DetailDepositFormData, value: any) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value };
      return newData;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-xs">
      {/* Kolom Kiri */}
      <div>
        <div className="mb-4 flex items-center">
          <label className="w-32 text-blue-600 font-semibold">Kode Deposit</label>
          <div className="flex-grow">
            <span className="text-gray-600">{formData.kodeDeposit}</span>
          </div>
        </div>

        <div className="mb-4 flex items-center">
          <label className="w-32 text-blue-600 font-semibold">
            Penerima<span className="text-red-500">*</span>
          </label>
          <div className="flex-grow">
            <Dropdown options={penerimaOptions} defaultValue={formData.penerima} onChange={(value) => handleChange("penerima", value)} className="w-full" />
          </div>
        </div>

        <div className="mb-4 flex items-center">
          <label className="w-32 text-blue-600 font-semibold">
            Mahasiswa<span className="text-red-500">*</span>
          </label>
          <div className="flex-grow">
            <AutoComplete data={mahasiswaOptions} value={formData.mahasiswa || ""} onChange={(value) => handleChange("mahasiswa", value)} placeholder="Cari Mahasiswa" className="w-full" />
          </div>
        </div>

        <div className="mb-4 flex items-center">
          <label className="w-32 text-blue-600 font-semibold">Tgl. Deposit</label>
          <div className="flex-grow">
            <DatePicker value={formData.tglDeposit} onChange={(value) => handleChange("tglDeposit", value)} className="w-full" />
          </div>
        </div>

        <div className="mb-4 flex items-center">
          <label className="w-32 text-blue-600 font-semibold">
            Periode<span className="text-red-500">*</span>
          </label>
          <div className="flex-grow">
            <Dropdown options={periodeOptions} defaultValue={formData.periode} onChange={(value) => handleChange("periode", value)} className="w-full" />
          </div>
        </div>
      </div>

      {/* Kolom Kanan */}
      <div>
        <div className="mb-4 flex items-center">
          <label className="w-40 text-blue-600 font-semibold">
            Metode Pembayaran<span className="text-red-500">*</span>
          </label>
          <div className="flex-grow">
            <Dropdown options={metodePembayaranOptions} defaultValue={formData.metodePembayaran} onChange={(value) => handleChange("metodePembayaran", value)} className="w-full" />
          </div>
        </div>

        <div className="mb-4 flex items-center">
          <label className="w-40 text-blue-600 font-semibold">Channel</label>
          <div className="flex-grow">
            <Dropdown options={channelOptions} defaultValue={formData.channel} onChange={(value) => handleChange("channel", value)} className="w-full" />
          </div>
        </div>

        <div className="mb-4 flex items-center">
          <label className="w-40 text-blue-600 font-semibold">
            Nominal<span className="text-red-500">*</span>
          </label>
          <div className="flex-grow">
            <TextField
              type="number"
              value={formData.nominal === 0 ? "" : formData.nominal.toString()}
              //   onChange={(e) => handleChange("nominal", Number(e.target.value))}
              className="w-full"
              readOnly={readOnly}
            />
          </div>
        </div>

        <div className="mb-4 flex items-start">
          <label className="w-40 text-blue-600 font-semibold">Uraian</label>
          <div className="flex-grow">
            <textarea
              value={formData.uraian}
              onChange={(e) => handleChange("uraian", e.target.value)}
              className="w-full border border-gray-300  rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              readOnly={readOnly}
            ></textarea>
          </div>
        </div>
      </div>
    </form>
  );
};

export default DetailDepositForm;

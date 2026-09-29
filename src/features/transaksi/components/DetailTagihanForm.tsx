import React, { useState, useEffect } from "react";
import TextField from "../../../components/inputs/TextField";
import Dropdown from "../../../components/inputs/Dropdown";
import AutoComplete from "../../../components/inputs/AutoComplete";
import { IoClose } from "react-icons/io5";
import DatePicker from "../../../components/inputs/DatePicker";

interface DetailTagihanFormData {
  kodeTagihan?: string;
  penerima: string;
  mahasiswa: string | null;
  tglTagihan: string;
  periode: string;
  bulan: string;
  tahun: string;
  jenisTagihan: string;
  cicilanKe: string;
  tglJatuhTempo: string;
  nominal: number;
  denda: number;
  potonganLangsung: number;
  keterangan: string;
  lunas: boolean;
  tglAkhirDispensasi: string;
}

interface DetailTagihanFormProps {
  initialData?: Partial<DetailTagihanFormData>;
  onSubmit?: (data: DetailTagihanFormData) => void;
  onChange?: (data: DetailTagihanFormData) => void;
  readOnly?: boolean;
}

// Options untuk dropdown
const penerimaOptions = ["Mahasiswa", "Dosen", "Karyawan"];
const periodeOptions = ["-- Pilih Periode --", "20241", "20242", "20251", "20252"];
const bulanOptions = ["-- Pilih Bulan --", "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
const tahunOptions = ["-- Pilih Tahun --", "2024", "2025", "2026"];
const jenisTagihanOptions = ["-- Pilih Jenis Tagihan --", "1020: SPP", "1080: Perpustakaan Pusat", "1090: Sumbangan Fasilitas", "1210: Ujian Akhir Semester"];
const cicilanOptions = ["1", "2", "3", "4", "5"];

// Options untuk mahasiswa (contoh data)
const mahasiswaOptions = [
  { value: "211105010366", label: "AHMAD NABIL MUASSYAF KAMIL" },
  { value: "211105010318", label: "AHMAD NUR RANDI" },
  { value: "221106043033", label: "MUHAMMAD SYAIFULLAH NURROHMAN" },
  { value: "221106043019", label: "AZKA FADILAH RAHMAN" },
  { value: "221106023147", label: "NOVAL LUTFI FUADI" },
];

const DetailTagihanForm: React.FC<DetailTagihanFormProps> = ({ initialData = {}, onSubmit, onChange, readOnly = false }) => {
  const defaultData: DetailTagihanFormData = {
    kodeTagihan: "Generate Otomatis",
    penerima: "Mahasiswa",
    mahasiswa: null,
    tglTagihan: "",
    periode: "-- Pilih Periode --",
    bulan: "-- Pilih Bulan --",
    tahun: "-- Pilih Tahun --",
    jenisTagihan: "-- Pilih Jenis Tagihan --",
    cicilanKe: "1",
    tglJatuhTempo: "",
    nominal: 0,
    denda: 0,
    potonganLangsung: 0,
    keterangan: "",
    lunas: false,
    tglAkhirDispensasi: "",
  };

  const [formData, setFormData] = useState<DetailTagihanFormData>({
    ...defaultData,
    ...initialData,
  });

  useEffect(() => {
    if (onChange) {
      onChange(formData);
    }
  }, [formData, onChange]);

  const handleChange = (field: keyof DetailTagihanFormData, value: any) => {
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
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-xs w-full">
      {/* Kolom Kiri */}
      <div>
        <div className="mb-4 flex items-center">
          <label className="w-32 text-blue-600">Kode Tagihan</label>
          <div className="flex-grow">
            <span className="text-gray-600">{formData.kodeTagihan}</span>
          </div>
        </div>

        <div className="mb-4 flex items-center">
          <label className="w-32 text-blue-600">
            Penerima<span className="text-red-500">*</span>
          </label>
          <div className="flex-grow">
            <Dropdown options={penerimaOptions} defaultValue={formData.penerima} onChange={(value) => handleChange("penerima", value)} className="w-full" />
          </div>
        </div>

        <div className="mb-4 flex items-center">
          <label className="w-32 text-blue-600">
            Mahasiswa<span className="text-red-500">*</span>
          </label>
          <div className="flex-grow">
            <AutoComplete data={mahasiswaOptions} onChange={(value) => handleChange("mahasiswa", value)} placeholder="Cari Mahasiswa" className="w-full" />
          </div>
        </div>

        <div className="mb-4 flex items-center">
          <label className="w-32 text-blue-600">Tgl. Tagihan</label>
          <div className="flex-grow">
            <DatePicker />
          </div>
        </div>

        <div className="mb-4 flex items-center">
          <label className="w-32 text-blue-600">
            Periode<span className="text-red-500">*</span>
          </label>
          <div className="flex-grow">
            <Dropdown options={periodeOptions} defaultValue={formData.periode} onChange={(value) => handleChange("periode", value)} className="w-full" />
          </div>
        </div>

        <div className="mb-4 flex items-center">
          <label className="w-32 text-blue-600">Bulan</label>
          <div className="flex-grow">
            <Dropdown options={bulanOptions} defaultValue={formData.bulan} onChange={(value) => handleChange("bulan", value)} className="w-full" />
          </div>
        </div>

        <div className="mb-4 flex items-center">
          <label className="w-32 text-blue-600">Tahun</label>
          <div className="flex-grow">
            <Dropdown options={tahunOptions} defaultValue={formData.tahun} onChange={(value) => handleChange("tahun", value)} className="w-full" />
          </div>
        </div>

        <div className="mb-4 flex items-center">
          <label className="w-32 text-blue-600">
            Jenis Tagihan<span className="text-red-500">*</span>
          </label>
          <div className="flex-grow">
            <Dropdown options={jenisTagihanOptions} defaultValue={formData.jenisTagihan} onChange={(value) => handleChange("jenisTagihan", value)} className="w-full" />
          </div>
        </div>
      </div>

      {/* Kolom Kanan */}
      <div>
        <div className="mb-4 flex items-center">
          <label className="w-40 text-blue-600">
            Cicilan Ke-<span className="text-red-500">*</span>
          </label>
          <div className="flex-grow">
            <Dropdown options={cicilanOptions} defaultValue={formData.cicilanKe} onChange={(value) => handleChange("cicilanKe", value)} className="w-full" />
          </div>
        </div>

        <div className="mb-4 flex items-center">
          <label className="w-40 text-blue-600">Tgl. Jatuh Tempo</label>
          <div className="flex-grow">
            <DatePicker />
          </div>
        </div>

        <div className="mb-4 flex items-center">
          <label className="w-40 text-blue-600">
            Nominal<span className="text-red-500">*</span>
          </label>
          <div className="flex-grow">
            <TextField type="number" value={formData.nominal === 0 ? "" : formData.nominal.toString()} className="w-full text-right" />
          </div>
        </div>

        <div className="mb-4 flex items-center">
          <label className="w-40 text-blue-600">
            Denda<span className="text-red-500">*</span>
          </label>
          <div className="flex-grow">
            <TextField type="number" value={formData.denda.toString()} className="w-full text-right" />
          </div>
        </div>

        <div className="mb-4 flex items-center">
          <label className="w-40 text-blue-600">
            Potongan Langsung<span className="text-red-500">*</span>
          </label>
          <div className="flex-grow">
            <TextField type="number" value={formData.potonganLangsung.toString()} className="w-full text-right" />
          </div>
        </div>

        <div className="mb-4 flex items-start">
          <label className="w-40 text-blue-600">Keterangan</label>
          <div className="flex-grow">
            <textarea value={formData.keterangan} onChange={(e) => handleChange("keterangan", e.target.value)} className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" rows={2}></textarea>
          </div>
        </div>

        <div className="mb-4 flex items-center">
          <label className="w-40 text-blue-600">Lunas?</label>
          <div className="flex-grow flex items-center">
            {/* <input type="checkbox" checked={formData.lunas} onChange={(e) => handleChange("lunas", e.target.checked)} className="h-4 w-4 text-blue-600" /> */}
            {!formData.lunas && <span className="text-red-500 text-xl ml-2">✕</span>}
          </div>
        </div>

        <div className="mb-4 flex items-center">
          <label className="w-40 text-blue-600">Tanggal Akhir Dispensasi</label>
          <div className="flex-grow">
            <DatePicker />
          </div>
        </div>
      </div>
    </form>
  );
};

export default DetailTagihanForm;

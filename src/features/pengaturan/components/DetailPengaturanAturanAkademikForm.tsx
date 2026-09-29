import React, { useState } from "react";
import Dropdown from "../../../components/inputs/Dropdown";
import TextField from "../../../components/inputs/TextField";

const jenisAturanOptions = ["-- Pilih Jenis Aturan --", "Aturan 1", "Aturan 2"];
const unitKerjaOptions = [
  "-- Pilih Unit Kerja --",
  "Universitas",
  "Fakultas",
  "Program Studi",
];
const jenisTagihanOptions = [
  "-- Pilih Jenis Tagihan --",
  "Uang Gedung",
  "SPP",
  "Heregistrasi",
  "UPM",
];
const cicilanAwalOptions = ["Semua Cicilan", "Cicilan 1", "Cicilan 2"];
const pemeriksaanTagihanOptions = [
  "Hanya Periode Saat Ini",
  "Periode Saat Ini dan Sebelumnya",
];

const aturanPembayaranOptions = ["Nominal", "Persentase"];

export default function DetailPengaturanAturanAkademikForm() {
  const [form, setForm] = useState({
    jenisAturan: "",
    unitKerja: "",
    jenisTagihan: "",
    cicilanAwal: "Semua Cicilan",
    pemeriksaanTagihan: "Hanya Periode Saat Ini",
    aturanPembayaran: "Nominal",
    pembayaranMinimal: "",
    validasiTagihan: false,
    status: false,
  });

  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="py-4 text-xs">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        {/* Left */}
        <div>
          <div className="flex items-center mb-4">
            <div className="w-1/2">
              <label className="text-blue-600 font-semibold">
                Jenis Aturan<span className="text-red-500">*</span>
              </label>
            </div>
            <div className="w-1/2">
              <Dropdown
                options={jenisAturanOptions}
                defaultValue={form.jenisAturan}
                onChange={(v) => handleChange("jenisAturan", v)}
                className="w-full"
              />
            </div>
          </div>
          <div className="flex items-center mb-4">
            <div className="w-1/2">
              <label className="text-blue-600 font-semibold">
                Unit Kerja<span className="text-red-500">*</span>
              </label>
            </div>
            <div className="w-1/2">
              <Dropdown
                options={unitKerjaOptions}
                defaultValue={form.unitKerja}
                onChange={(v) => handleChange("unitKerja", v)}
                className="w-full"
              />
            </div>
          </div>
          <div className="flex items-center mb-4">
            <div className="w-1/2">
              <label className="text-blue-600 font-semibold">
                Jenis Tagihan<span className="text-red-500">*</span>
              </label>
            </div>
            <div className="w-1/2">
              <Dropdown
                options={jenisTagihanOptions}
                defaultValue={form.jenisTagihan}
                onChange={(v) => handleChange("jenisTagihan", v)}
                className="w-full"
              />
            </div>
          </div>
          <div className="flex items-center mb-4">
            <div className="w-1/2">
              <label className="text-blue-600 font-semibold">
                Cicilan Awal<span className="text-red-500">*</span>
              </label>
            </div>
            <div className="w-1/2">
              <Dropdown
                options={cicilanAwalOptions}
                defaultValue={form.cicilanAwal}
                onChange={(v) => handleChange("cicilanAwal", v)}
                className="w-full"
              />
            </div>
          </div>
          <div className="flex items-center mb-4">
            <div className="w-1/2">
              <label className="text-blue-600 font-semibold">
                Pemeriksaan Tagihan<span className="text-red-500">*</span>
              </label>
            </div>
            <div className="w-1/2">
              <Dropdown
                options={pemeriksaanTagihanOptions}
                defaultValue={form.pemeriksaanTagihan}
                onChange={(v) => handleChange("pemeriksaanTagihan", v)}
                className="w-full"
              />
            </div>
          </div>
        </div>
        {/* Right */}
        <div>
          <div className="flex items-center mb-4">
            <div className="w-1/2">
              <label className="text-blue-600 font-semibold">
                Aturan Pembayaran
              </label>
            </div>
            <div className="w-1/2">
              <Dropdown
                options={aturanPembayaranOptions}
                defaultValue={form.aturanPembayaran}
                onChange={(v) => handleChange("aturanPembayaran", v)}
                className="w-full"
              />
            </div>
          </div>
          <div className="flex items-center mb-4">
            <div className="w-1/2">
              <label className="text-blue-600 font-semibold">
                Pembayaran Minimal<span className="text-red-500">*</span>
              </label>
            </div>
            <div className="w-1/2">
              <TextField
                value={form.pembayaranMinimal}
                onChange={(v) => handleChange("pembayaranMinimal", v)}
                className="w-full"
              />
            </div>
          </div>
          <div className="flex items-center mb-4">
            <div className="w-1/2">
              <label className="text-blue-600 font-semibold">
                Validasi Tagihan
              </label>
            </div>
            <div className="w-1/2 flex items-center">
              <input
                type="checkbox"
                checked={form.validasiTagihan}
                onChange={(e) =>
                  handleChange("validasiTagihan", e.target.checked)
                }
                className="mr-2"
              />
              <span>Memeriksa bulan sesuai urutan cicilan</span>
            </div>
          </div>
          <div className="flex items-center mb-4">
            <div className="w-1/2">
              <label className="text-blue-600 font-semibold">Status</label>
            </div>
            <div className="w-1/2 flex items-center">
              <input
                type="checkbox"
                checked={form.status}
                onChange={(e) => handleChange("status", e.target.checked)}
                className="mr-2"
              />
              <span>Aktif</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { IoEye, IoOpenOutline } from "react-icons/io5";
import {
  metodePembayaranOptions,
  angkatanOptions,
  jalurPendaftaranOptions,
  gelombangOptions,
  sistemKuliahOptions,
  formatOptions,
  programStudiGroups,
} from "../constants/laporanPembayaranData";
import { FormFieldRow } from "../../tagihan/components/FormFieldRow";
import { FormDatePicker } from "../../tagihan/components/FormDatePicker";
import { FormSelect } from "../../tagihan/components/FormSelect";
import { DistribusiPembayaranPerTanggalPreview } from "../components/DistribusiPembayaranPerTanggalPreview";
import {
  generateDistribusiPembayaranPerTanggalHtml,
  type DistribusiPembayaranPerTanggalRowData,
} from "../utils/generatePembayaranAkhirHtml";
import {
  exportDistribusiPembayaranPerTanggalToPdf,
  exportDistribusiPembayaranPerTanggalToExcel,
} from "../utils/exportPembayaranAkhir";

export default function DistribusiPembayaranPerTanggalPage() {
  document.title =
    "Laporan Distribusi Pembayaran Akun Channel Per Tanggal - Sistem Informasi Keuangan UIKA";

  // Form State (Default values matching Image 1)
  const [unitKerja, setUnitKerja] = useState("Universitas Ibn Khaldun");
  const [metodePembayaran, setMetodePembayaran] = useState("");
  const [tglAwal, setTglAwal] = useState("01-10-2026");
  const [tglAkhir, setTglAkhir] = useState("21-10-2026");
  const [angkatan, setAngkatan] = useState("");
  const [jalurPendaftaran, setJalurPendaftaran] = useState("");
  const [gelombang, setGelombang] = useState("");
  const [sistemKuliah, setSistemKuliah] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("HTML");
  const [useKop, setUseKop] = useState(true);

  // Preview State
  const [showPreview, setShowPreview] = useState(false);

  // Helper currency
  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(num);
  };

  // Mock data distribusi pembayaran akun channel per tanggal (15 kolom sesuai Gambar 3)
  const getMockData = (): DistribusiPembayaranPerTanggalRowData[] => {
    return [
      {
        tanggal: "12-10-2026",
        bankSyariahIndonesia: 325000000,
        bprsAmanahUmmah: 145000000,
        tokopedia: 98000000,
        bankAmanahUmmahFormulir: 45000000,
        bankAceh: 22000000,
        bankCentralAsia: 85000000,
        btnSyariah: 65000000,
        kasirBaskUika: 125000000,
        bankMuamalat: 48000000,
        bankNagari: 18000000,
        ovo: 32000000,
        shopee: 56000000,
        mpnG3: 15000000,
        total: 1079000000,
      },
      {
        tanggal: "13-10-2026",
        bankSyariahIndonesia: 410000000,
        bprsAmanahUmmah: 180000000,
        tokopedia: 115000000,
        bankAmanahUmmahFormulir: 55000000,
        bankAceh: 28000000,
        bankCentralAsia: 105000000,
        btnSyariah: 78000000,
        kasirBaskUika: 150000000,
        bankMuamalat: 62000000,
        bankNagari: 24000000,
        ovo: 41000000,
        shopee: 72000000,
        mpnG3: 19000000,
        total: 1339000000,
      },
      {
        tanggal: "14-10-2026",
        bankSyariahIndonesia: 280000000,
        bprsAmanahUmmah: 120000000,
        tokopedia: 82000000,
        bankAmanahUmmahFormulir: 35000000,
        bankAceh: 17000000,
        bankCentralAsia: 72000000,
        btnSyariah: 52000000,
        kasirBaskUika: 95000000,
        bankMuamalat: 39000000,
        bankNagari: 14000000,
        ovo: 26000000,
        shopee: 45000000,
        mpnG3: 12000000,
        total: 889000000,
      },
      {
        tanggal: "15-10-2026",
        bankSyariahIndonesia: 360000000,
        bprsAmanahUmmah: 165000000,
        tokopedia: 105000000,
        bankAmanahUmmahFormulir: 50000000,
        bankAceh: 25000000,
        bankCentralAsia: 95000000,
        btnSyariah: 70000000,
        kasirBaskUika: 135000000,
        bankMuamalat: 55000000,
        bankNagari: 21000000,
        ovo: 36000000,
        shopee: 64000000,
        mpnG3: 17000000,
        total: 1198000000,
      },
      {
        tanggal: "16-10-2026",
        bankSyariahIndonesia: 240000000,
        bprsAmanahUmmah: 95000000,
        tokopedia: 68000000,
        bankAmanahUmmahFormulir: 30000000,
        bankAceh: 14000000,
        bankCentralAsia: 60000000,
        btnSyariah: 45000000,
        kasirBaskUika: 85000000,
        bankMuamalat: 32000000,
        bankNagari: 11000000,
        ovo: 21000000,
        shopee: 38000000,
        mpnG3: 9000000,
        total: 748000000,
      },
    ];
  };

  const handleTampilkan = () => {
    setShowPreview(true);
    setTimeout(() => {
      document
        .getElementById("distribusi-channel-preview-section")
        ?.scrollIntoView({
          behavior: "smooth",
        });
    }, 100);
  };

  const handleLihatTabBaru = async () => {
    const data = getMockData();

    if (selectedFormat === "PDF") {
      await exportDistribusiPembayaranPerTanggalToPdf({
        useKop,
        unitKerja,
        data,
        formatRupiah,
      });
      return;
    }

    if (selectedFormat === "EXCEL") {
      exportDistribusiPembayaranPerTanggalToExcel({
        useKop,
        unitKerja,
        data,
      });
      return;
    }

    const reportHtml = generateDistribusiPembayaranPerTanggalHtml({
      useKop,
      unitKerja,
      metodePembayaran,
      tglAwal,
      tglAkhir,
      data,
      formatRupiah,
    });

    const newWindow = window.open("", "_blank");
    if (newWindow) {
      newWindow.document.write(reportHtml);
      newWindow.document.close();
    }
  };

  return (
    <div className="w-full">
      {/* Title */}
      <div className="mb-4">
        <h1 className="text-2xl font-medium text-gray-800">
          Laporan Distribusi Pembayaran Akun Channel Per Tanggal
        </h1>
      </div>

      {/* Main Filter Card */}
      <div className="bg-white rounded shadow-md border-t-4 border-t-emerald-600 p-5 sm:p-6 mb-8">
        <div className="space-y-4">
          {/* Row 1: Unit Kerja */}
          <FormFieldRow id="unit-kerja-select" label="Unit Kerja">
            <FormSelect
              id="unit-kerja-select"
              value={unitKerja}
              onChange={setUnitKerja}
              options={["Universitas Ibn Khaldun"]}
              optGroups={programStudiGroups.map((g) => ({
                label: g.fakultas,
                options: g.prodiList,
              }))}
            />
          </FormFieldRow>

          {/* Row 2: Metode Pembayaran */}
          <FormFieldRow id="metode-pembayaran-select" label="Metode Pembayaran">
            <FormSelect
              id="metode-pembayaran-select"
              value={metodePembayaran}
              onChange={setMetodePembayaran}
              placeholder="-- Pilih Metode Pembayaran --"
              options={metodePembayaranOptions.filter(
                (o) => o !== "-- Semua Metode Pembayaran --"
              )}
            />
          </FormFieldRow>

          {/* Row 3: Tanggal Awal* */}
          <FormFieldRow id="tanggal-awal-input" label="Tanggal Awal" required>
            <FormDatePicker
              id="tanggal-awal-input"
              value={tglAwal}
              onChange={setTglAwal}
            />
          </FormFieldRow>

          {/* Row 4: Tanggal Akhir* */}
          <FormFieldRow id="tanggal-akhir-input" label="Tanggal Akhir" required>
            <FormDatePicker
              id="tanggal-akhir-input"
              value={tglAkhir}
              onChange={setTglAkhir}
            />
          </FormFieldRow>

          {/* Row 5: Angkatan */}
          <FormFieldRow id="angkatan-select" label="Angkatan">
            <FormSelect
              id="angkatan-select"
              value={angkatan}
              onChange={setAngkatan}
              placeholder="-- Pilih Angkatan --"
              options={angkatanOptions.filter((o) => o !== "-- Pilih Angkatan --")}
            />
          </FormFieldRow>

          {/* Row 6: Jalur Pendaftaran */}
          <FormFieldRow id="jalur-pendaftaran-select" label="Jalur Pendaftaran">
            <FormSelect
              id="jalur-pendaftaran-select"
              value={jalurPendaftaran}
              onChange={setJalurPendaftaran}
              placeholder="-- Pilih Jalur Pendaftaran --"
              options={jalurPendaftaranOptions.filter(
                (o) => o !== "-- Semua Jalur Pendaftaran --"
              )}
            />
          </FormFieldRow>

          {/* Row 7: Gelombang */}
          <FormFieldRow id="gelombang-select" label="Gelombang">
            <FormSelect
              id="gelombang-select"
              value={gelombang}
              onChange={setGelombang}
              placeholder="-- Pilih Gelombang --"
              options={gelombangOptions.filter((o) => o !== "-- Semua Gelombang --")}
            />
          </FormFieldRow>

          {/* Row 8: Sistem Kuliah */}
          <FormFieldRow id="sistem-kuliah-select" label="Sistem Kuliah">
            <FormSelect
              id="sistem-kuliah-select"
              value={sistemKuliah}
              onChange={setSistemKuliah}
              placeholder="-- Pilih Sistem Kuliah --"
              options={sistemKuliahOptions.filter(
                (o) => o !== "-- Semua Sistem Kuliah --"
              )}
            />
          </FormFieldRow>

          {/* Row 9: Format */}
          <FormFieldRow id="format-select" label="Format">
            <FormSelect
              id="format-select"
              value={selectedFormat}
              onChange={setSelectedFormat}
              options={formatOptions}
            />
          </FormFieldRow>

          {/* Row 10: KOP */}
          <FormFieldRow id="kop-checkbox" label="KOP" alignCenter>
            <label className="flex items-center gap-2 cursor-pointer select-none text-sm text-gray-800">
              <input
                id="kop-checkbox"
                type="checkbox"
                checked={useKop}
                onChange={(e) => setUseKop(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
              />
              <span>Gunakan KOP</span>
            </label>
          </FormFieldRow>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-6 mt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={handleTampilkan}
            className="bg-[#274fb8] hover:bg-[#1e3e96] text-white text-sm font-medium px-4 py-2 rounded flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm active:scale-95"
          >
            <IoEye size={18} />
            <span>Tampilkan</span>
          </button>
          <button
            type="button"
            onClick={handleLihatTabBaru}
            className="bg-[#274fb8] hover:bg-[#1e3e96] text-white text-sm font-medium px-4 py-2 rounded flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm active:scale-95"
          >
            <IoOpenOutline size={18} />
            <span>Lihat di Tab Baru</span>
          </button>
        </div>
      </div>

      {/* Preview Section */}
      {showPreview && (
        <DistribusiPembayaranPerTanggalPreview
          useKop={useKop}
          unitKerja={unitKerja}
          tglAwal={tglAwal}
          tglAkhir={tglAkhir}
          selectedFormat={selectedFormat}
          data={getMockData()}
          formatRupiah={formatRupiah}
          onLihatTabBaru={handleLihatTabBaru}
          onCetakFormat={handleLihatTabBaru}
        />
      )}
    </div>
  );
}

import React, { useState } from "react";
import { IoEye, IoOpenOutline } from "react-icons/io5";
import {
  metodePembayaranOptions,
  angkatanOptions,
  jalurPendaftaranOptions,
  gelombangOptions,
  sistemKuliahOptions,
  tingkatDistribusiOptions,
  formatOptions,
  programStudiGroups,
} from "../constants/laporanPembayaranData";
import { FormFieldRow } from "../../tagihan/components/FormFieldRow";
import { FormDatePicker } from "../../tagihan/components/FormDatePicker";
import { FormSelect } from "../../tagihan/components/FormSelect";
import { DistribusiPembayaranPreview } from "../components/DistribusiPembayaranPreview";
import {
  generateDistribusiPembayaranHtml,
  type DistribusiPembayaranRowData,
} from "../utils/generatePembayaranLanjutanHtml";
import {
  exportDistribusiPembayaranToPdf,
  exportDistribusiPembayaranToExcel,
} from "../utils/exportPembayaranLanjutan";

export default function DistribusiPembayaranPage() {
  document.title = "Laporan Distribusi Pembayaran - Sistem Informasi Keuangan UIKA";

  // Form State (Default values matching Image 2)
  const [unitKerja, setUnitKerja] = useState("Universitas Ibn Khaldun");
  const [metodePembayaran, setMetodePembayaran] = useState("");
  const [tglAwal, setTglAwal] = useState("01-10-2026");
  const [tglAkhir, setTglAkhir] = useState("21-10-2026");
  const [angkatan, setAngkatan] = useState("");
  const [jalurPendaftaran, setJalurPendaftaran] = useState("");
  const [gelombang, setGelombang] = useState("");
  const [sistemKuliah, setSistemKuliah] = useState("");
  const [tingkatDistribusi, setTingkatDistribusi] = useState("Fakultas");
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

  // Mock data distribusi pembayaran (18 kolom sesuai Gambar 4)
  const getMockData = (): DistribusiPembayaranRowData[] => {
    const rawData: DistribusiPembayaranRowData[] = [
      {
        no: 1,
        kodeFakultas: "FTS",
        namaFakultas: "Fakultas Teknik dan Sains",
        sumberData: "SIMKEU",
        uangGedungTahap1: 450000000,
        spp: 850000000,
        heregistrasi: 120000000,
        upm: 95000000,
        ujianAkhirSemester: 85000000,
        uktAfirmasiUika: 110000000,
        praktikumRpl: 45000000,
        praktikumJarkom: 42000000,
        praktikumEmbedded: 38000000,
        praktikumMetodeNumerik: 35000000,
        praktikumAr: 40000000,
        praktikumKnowledgeGraph: 36000000,
        praktikumPengenalanPola: 34000000,
        praktikumStrukturData: 48000000,
        sks: 220000000,
      },
      {
        no: 2,
        kodeFakultas: "FEB",
        namaFakultas: "Fakultas Ekonomi dan Bisnis",
        sumberData: "SIMKEU",
        uangGedungTahap1: 520000000,
        spp: 980000000,
        heregistrasi: 140000000,
        upm: 110000000,
        ujianAkhirSemester: 95000000,
        uktAfirmasiUika: 85000000,
        praktikumRpl: 0,
        praktikumJarkom: 0,
        praktikumEmbedded: 0,
        praktikumMetodeNumerik: 25000000,
        praktikumAr: 0,
        praktikumKnowledgeGraph: 0,
        praktikumPengenalanPola: 0,
        praktikumStrukturData: 0,
        sks: 280000000,
      },
      {
        no: 3,
        kodeFakultas: "FAI",
        namaFakultas: "Fakultas Agama Islam",
        sumberData: "SIMKEU",
        uangGedungTahap1: 380000000,
        spp: 720000000,
        heregistrasi: 95000000,
        upm: 80000000,
        ujianAkhirSemester: 70000000,
        uktAfirmasiUika: 90000000,
        praktikumRpl: 0,
        praktikumJarkom: 0,
        praktikumEmbedded: 0,
        praktikumMetodeNumerik: 0,
        praktikumAr: 0,
        praktikumKnowledgeGraph: 0,
        praktikumPengenalanPola: 0,
        praktikumStrukturData: 0,
        sks: 190000000,
      },
      {
        no: 4,
        kodeFakultas: "FH",
        namaFakultas: "Fakultas Hukum",
        sumberData: "Host to Host",
        uangGedungTahap1: 410000000,
        spp: 760000000,
        heregistrasi: 105000000,
        upm: 85000000,
        ujianAkhirSemester: 75000000,
        uktAfirmasiUika: 60000000,
        praktikumRpl: 0,
        praktikumJarkom: 0,
        praktikumEmbedded: 0,
        praktikumMetodeNumerik: 0,
        praktikumAr: 0,
        praktikumKnowledgeGraph: 0,
        praktikumPengenalanPola: 0,
        praktikumStrukturData: 0,
        sks: 210000000,
      },
      {
        no: 5,
        kodeFakultas: "FIKES",
        namaFakultas: "Fakultas Ilmu Kesehatan",
        sumberData: "SIMKEU",
        uangGedungTahap1: 290000000,
        spp: 540000000,
        heregistrasi: 75000000,
        upm: 65000000,
        ujianAkhirSemester: 55000000,
        uktAfirmasiUika: 45000000,
        praktikumRpl: 0,
        praktikumJarkom: 0,
        praktikumEmbedded: 0,
        praktikumMetodeNumerik: 15000000,
        praktikumAr: 0,
        praktikumKnowledgeGraph: 0,
        praktikumPengenalanPola: 0,
        praktikumStrukturData: 0,
        sks: 140000000,
      },
      {
        no: 6,
        kodeFakultas: "FKIP",
        namaFakultas: "Fakultas Keguruan dan Ilmu Pendidikan",
        sumberData: "SIMKEU",
        uangGedungTahap1: 260000000,
        spp: 480000000,
        heregistrasi: 65000000,
        upm: 55000000,
        ujianAkhirSemester: 45000000,
        uktAfirmasiUika: 50000000,
        praktikumRpl: 0,
        praktikumJarkom: 0,
        praktikumEmbedded: 0,
        praktikumMetodeNumerik: 18000000,
        praktikumAr: 0,
        praktikumKnowledgeGraph: 0,
        praktikumPengenalanPola: 0,
        praktikumStrukturData: 0,
        sks: 120000000,
      },
      {
        no: 7,
        kodeFakultas: "SPs",
        namaFakultas: "Sekolah Pascasarjana",
        sumberData: "Bank",
        uangGedungTahap1: 310000000,
        spp: 620000000,
        heregistrasi: 80000000,
        upm: 70000000,
        ujianAkhirSemester: 60000000,
        uktAfirmasiUika: 0,
        praktikumRpl: 0,
        praktikumJarkom: 0,
        praktikumEmbedded: 0,
        praktikumMetodeNumerik: 20000000,
        praktikumAr: 15000000,
        praktikumKnowledgeGraph: 25000000,
        praktikumPengenalanPola: 20000000,
        praktikumStrukturData: 0,
        sks: 180000000,
      },
    ];

    return rawData;
  };

  const handleTampilkan = () => {
    setShowPreview(true);
    setTimeout(() => {
      document.getElementById("distribusi-preview-section")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };

  const handleLihatTabBaru = async () => {
    const data = getMockData();

    if (selectedFormat === "PDF") {
      await exportDistribusiPembayaranToPdf({
        useKop,
        unitKerja,
        tingkatDistribusi,
        data,
        formatRupiah,
      });
      return;
    }

    if (selectedFormat === "EXCEL") {
      exportDistribusiPembayaranToExcel({
        useKop,
        unitKerja,
        tingkatDistribusi,
        data,
      });
      return;
    }

    const reportHtml = generateDistribusiPembayaranHtml({
      useKop,
      unitKerja,
      metodePembayaran,
      tglAwal,
      tglAkhir,
      tingkatDistribusi,
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
          Laporan Distribusi Pembayaran
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

          {/* Row 9: Tingkat Distribusi */}
          <FormFieldRow id="tingkat-distribusi-select" label="Tingkat Distribusi">
            <FormSelect
              id="tingkat-distribusi-select"
              value={tingkatDistribusi}
              onChange={setTingkatDistribusi}
              options={tingkatDistribusiOptions}
            />
          </FormFieldRow>

          {/* Row 10: Format */}
          <FormFieldRow id="format-select" label="Format">
            <FormSelect
              id="format-select"
              value={selectedFormat}
              onChange={setSelectedFormat}
              options={formatOptions}
            />
          </FormFieldRow>

          {/* Row 11: KOP */}
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
        <DistribusiPembayaranPreview
          useKop={useKop}
          unitKerja={unitKerja}
          tingkatDistribusi={tingkatDistribusi}
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

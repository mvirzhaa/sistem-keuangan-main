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
import { DistribusiJenisTagihanPreview } from "../components/DistribusiJenisTagihanPreview";
import {
  generateDistribusiJenisTagihanHtml,
  type DistribusiJenisTagihanRowData,
} from "../utils/generatePembayaranLanjutanHtml";
import {
  exportDistribusiJenisTagihanToPdf,
  exportDistribusiJenisTagihanToExcel,
} from "../utils/exportPembayaranLanjutan";

export default function DistribusiJenisTagihanPerTanggalPage() {
  document.title =
    "Laporan Distribusi Pembayaran Tagihan Per Tanggal - Sistem Informasi Keuangan UIKA";

  // Form State (Default values matching Image 3)
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

  // Mock data distribusi pembayaran tagihan per tanggal (34 kolom sesuai Gambar 1 & 2)
  const getMockData = (): DistribusiJenisTagihanRowData[] => {
    return [
      {
        tanggal: "12-10-2026",
        spp: 185000000,
        heregistrasi: 35000000,
        upm: 12000000,
        uktAfirmasiUika: 45000000,
        ujianAkhirSemester: 28000000,
        praktikumRpl: 15000000,
        praktikumJarkom: 14000000,
        praktikumMetodeNumerik: 8500000,
        praktikumStrukturData: 16500000,
        sks: 65000000,
        wakafMasjid: 5500000,
        taaruf: 7500000,
        sksSemester1: 42000000,
        kolokium: 9000000,
        uangGedungTahap1: 125000000,
        praktikumKnowledgeGraph: 11000000,
        praktikumPengenalanPola: 9500000,
        praktikumAlgoritma: 17500000,
        kerjaPraktik: 18000000,
        praktikumEmbedded: 12000000,
        praktikumAr: 10500000,
        sumbanganFasilitas: 25000000,
        biayaPendaftaranRusunawa: 4500000,
        rusunawa: 18500000,
        praktikumPenginderaanJauh: 8000000,
        praktikumPerangkatBergerak: 14000000,
        praktikumBahasaInggris: 12500000,
        praktikumKeamananInformasi: 11500000,
        praktikumPermodelanSpasial: 9000000,
        praktikumPemrogramanWeb: 16000000,
        praktikumSig: 13000000,
        praktikumPermodelanSimulasi: 10500000,
        total: 789500000,
      },
      {
        tanggal: "13-10-2026",
        spp: 210000000,
        heregistrasi: 42000000,
        upm: 15000000,
        uktAfirmasiUika: 52000000,
        ujianAkhirSemester: 34000000,
        praktikumRpl: 18000000,
        praktikumJarkom: 16500000,
        praktikumMetodeNumerik: 11000000,
        praktikumStrukturData: 19000000,
        sks: 78000000,
        wakafMasjid: 6500000,
        taaruf: 8500000,
        sksSemester1: 49000000,
        kolokium: 12000000,
        uangGedungTahap1: 145000000,
        praktikumKnowledgeGraph: 13500000,
        praktikumPengenalanPola: 11500000,
        praktikumAlgoritma: 21000000,
        kerjaPraktik: 22000000,
        praktikumEmbedded: 14500000,
        praktikumAr: 13000000,
        sumbanganFasilitas: 30000000,
        biayaPendaftaranRusunawa: 5500000,
        rusunawa: 22000000,
        praktikumPenginderaanJauh: 10000000,
        praktikumPerangkatBergerak: 17000000,
        praktikumBahasaInggris: 15000000,
        praktikumKeamananInformasi: 13500000,
        praktikumPermodelanSpasial: 11000000,
        praktikumPemrogramanWeb: 19500000,
        praktikumSig: 15500000,
        praktikumPermodelanSimulasi: 12500000,
        total: 942500000,
      },
      {
        tanggal: "14-10-2026",
        spp: 160000000,
        heregistrasi: 28000000,
        upm: 9500000,
        uktAfirmasiUika: 38000000,
        ujianAkhirSemester: 22000000,
        praktikumRpl: 12000000,
        praktikumJarkom: 11000000,
        praktikumMetodeNumerik: 7000000,
        praktikumStrukturData: 13000000,
        sks: 54000000,
        wakafMasjid: 4000000,
        taaruf: 6000000,
        sksSemester1: 35000000,
        kolokium: 7500000,
        uangGedungTahap1: 95000000,
        praktikumKnowledgeGraph: 8500000,
        praktikumPengenalanPola: 7500000,
        praktikumAlgoritma: 14000000,
        kerjaPraktik: 15000000,
        praktikumEmbedded: 9500000,
        praktikumAr: 8000000,
        sumbanganFasilitas: 18000000,
        biayaPendaftaranRusunawa: 3500000,
        rusunawa: 14000000,
        praktikumPenginderaanJauh: 6500000,
        praktikumPerangkatBergerak: 11000000,
        praktikumBahasaInggris: 10000000,
        praktikumKeamananInformasi: 9000000,
        praktikumPermodelanSpasial: 7500000,
        praktikumPemrogramanWeb: 13000000,
        praktikumSig: 10500000,
        praktikumPermodelanSimulasi: 8000000,
        total: 624500000,
      },
      {
        tanggal: "15-10-2026",
        spp: 195000000,
        heregistrasi: 38000000,
        upm: 13500000,
        uktAfirmasiUika: 48000000,
        ujianAkhirSemester: 30000000,
        praktikumRpl: 16500000,
        praktikumJarkom: 15000000,
        praktikumMetodeNumerik: 9500000,
        praktikumStrukturData: 17500000,
        sks: 70000000,
        wakafMasjid: 6000000,
        taaruf: 8000000,
        sksSemester1: 45000000,
        kolokium: 10500000,
        uangGedungTahap1: 135000000,
        praktikumKnowledgeGraph: 12000000,
        praktikumPengenalanPola: 10500000,
        praktikumAlgoritma: 19000000,
        kerjaPraktik: 20000000,
        praktikumEmbedded: 13000000,
        praktikumAr: 11500000,
        sumbanganFasilitas: 27000000,
        biayaPendaftaranRusunawa: 5000000,
        rusunawa: 20000000,
        praktikumPenginderaanJauh: 9000000,
        praktikumPerangkatBergerak: 15500000,
        praktikumBahasaInggris: 13500000,
        praktikumKeamananInformasi: 12500000,
        praktikumPermodelanSpasial: 10000000,
        praktikumPemrogramanWeb: 17500000,
        praktikumSig: 14000000,
        praktikumPermodelanSimulasi: 11500000,
        total: 847000000,
      },
      {
        tanggal: "16-10-2026",
        spp: 140000000,
        heregistrasi: 25000000,
        upm: 8000000,
        uktAfirmasiUika: 32000000,
        ujianAkhirSemester: 19000000,
        praktikumRpl: 10500000,
        praktikumJarkom: 9500000,
        praktikumMetodeNumerik: 6000000,
        praktikumStrukturData: 11500000,
        sks: 48000000,
        wakafMasjid: 3500000,
        taaruf: 5000000,
        sksSemester1: 30000000,
        kolokium: 6500000,
        uangGedungTahap1: 85000000,
        praktikumKnowledgeGraph: 7500000,
        praktikumPengenalanPola: 6500000,
        praktikumAlgoritma: 12000000,
        kerjaPraktik: 13000000,
        praktikumEmbedded: 8000000,
        praktikumAr: 7000000,
        sumbanganFasilitas: 15000000,
        biayaPendaftaranRusunawa: 3000000,
        rusunawa: 12000000,
        praktikumPenginderaanJauh: 5500000,
        praktikumPerangkatBergerak: 9500000,
        praktikumBahasaInggris: 8500000,
        praktikumKeamananInformasi: 7500000,
        praktikumPermodelanSpasial: 6000000,
        praktikumPemrogramanWeb: 11000000,
        praktikumSig: 9000000,
        praktikumPermodelanSimulasi: 7000000,
        total: 538000000,
      },
    ];
  };

  const handleTampilkan = () => {
    setShowPreview(true);
    setTimeout(() => {
      document
        .getElementById("distribusi-tagihan-preview-section")
        ?.scrollIntoView({
          behavior: "smooth",
        });
    }, 100);
  };

  const handleLihatTabBaru = async () => {
    const data = getMockData();

    if (selectedFormat === "PDF") {
      await exportDistribusiJenisTagihanToPdf({
        useKop,
        unitKerja,
        data,
        formatRupiah,
      });
      return;
    }

    if (selectedFormat === "EXCEL") {
      exportDistribusiJenisTagihanToExcel({
        useKop,
        unitKerja,
        data,
      });
      return;
    }

    const reportHtml = generateDistribusiJenisTagihanHtml({
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
          Laporan Distribusi Pembayaran Tagihan Per Tanggal
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
        <DistribusiJenisTagihanPreview
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

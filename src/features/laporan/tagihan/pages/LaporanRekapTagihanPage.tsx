import React, { useState } from "react";
import { IoEye, IoOpenOutline } from "react-icons/io5";
import {
  tahunAkademikRekapOptions,
  programStudiGroups,
  jenisTagihanRekapOptions,
  periodeMasukRekapOptions,
  jalurPendaftaranRekapOptions,
  gelombangRekapOptions,
  sistemKuliahRekapOptions,
  penerimaRekapOptions,
  formatOptions,
} from "../constants/laporanTagihanData";
import { FormFieldRow } from "../components/FormFieldRow";
import { FormDatePicker } from "../components/FormDatePicker";
import { FormSelect } from "../components/FormSelect";
import { LaporanRekapTagihanPreview } from "../components/LaporanRekapTagihanPreview";
import {
  generateLaporanRekapHtml,
  type RekapRowData,
} from "../utils/generateLaporanRekapHtml";

export default function LaporanRekapTagihanPage() {
  document.title = "Laporan Rekap Tagihan - Sistem Informasi Keuangan UIKA";

  // Form State
  const [tahunAkademik, setTahunAkademik] = useState("-- Semua --");
  const [selectedProdi, setSelectedProdi] = useState("Universitas Ibn Khaldun");
  const [selectedJenisTagihan, setSelectedJenisTagihan] = useState(
    "-- Pilih Jenis Tagihan --",
  );
  const [tglCutOff, setTglCutOff] = useState("");
  const [periodeMasuk, setPeriodeMasuk] = useState("-- Pilih Periode Masuk --");
  const [jalurPendaftaran, setJalurPendaftaran] = useState(
    "-- Pilih Jalur Pendaftaran --",
  );
  const [gelombang, setGelombang] = useState("-- Pilih Gelombang --");
  const [sistemKuliah, setSistemKuliah] = useState("-- Pilih Sistem Kuliah --");
  const [selectedPenerima, setSelectedPenerima] = useState(
    "-- Pilih Semua Penerima --",
  );
  const [selectedFormat, setSelectedFormat] = useState("HTML");
  const [useKop, setUseKop] = useState(true);

  // Preview State
  const [showPreview, setShowPreview] = useState(false);

  // Format currency helper
  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(num);
  };

  // Mock data rekapitulasi tagihan per program studi
  const mockRekapData: RekapRowData[] = [
    {
      no: 1,
      prodi: "S1 - Teknik Informatika",
      jenisTagihan:
        selectedJenisTagihan === "-- Pilih Jenis Tagihan --"
          ? "Semua Tagihan"
          : selectedJenisTagihan,
      jumlahTagihan: 450,
      nominalTagihan: 2025000000,
      potongan: 125000000,
      terbayar: 1650000000,
      sisaPiutang: 250000000,
      persentaseTerbayar: 81.5,
    },
    {
      no: 2,
      prodi: "S1 - Sistem Informasi",
      jenisTagihan:
        selectedJenisTagihan === "-- Pilih Jenis Tagihan --"
          ? "Semua Tagihan"
          : selectedJenisTagihan,
      jumlahTagihan: 320,
      nominalTagihan: 1440000000,
      potongan: 90000000,
      terbayar: 1150000000,
      sisaPiutang: 200000000,
      persentaseTerbayar: 79.9,
    },
    {
      no: 3,
      prodi: "S1 - Manajemen",
      jenisTagihan:
        selectedJenisTagihan === "-- Pilih Jenis Tagihan --"
          ? "Semua Tagihan"
          : selectedJenisTagihan,
      jumlahTagihan: 600,
      nominalTagihan: 2700000000,
      potongan: 180000000,
      terbayar: 2200000000,
      sisaPiutang: 320000000,
      persentaseTerbayar: 81.5,
    },
    {
      no: 4,
      prodi: "S1 - Akuntansi",
      jenisTagihan:
        selectedJenisTagihan === "-- Pilih Jenis Tagihan --"
          ? "Semua Tagihan"
          : selectedJenisTagihan,
      jumlahTagihan: 280,
      nominalTagihan: 1260000000,
      potongan: 60000000,
      terbayar: 980000000,
      sisaPiutang: 220000000,
      persentaseTerbayar: 77.8,
    },
    {
      no: 5,
      prodi: "S1 - Ilmu Hukum",
      jenisTagihan:
        selectedJenisTagihan === "-- Pilih Jenis Tagihan --"
          ? "Semua Tagihan"
          : selectedJenisTagihan,
      jumlahTagihan: 350,
      nominalTagihan: 1575000000,
      potongan: 75000000,
      terbayar: 1200000000,
      sisaPiutang: 300000000,
      persentaseTerbayar: 76.2,
    },
    {
      no: 6,
      prodi: "S1 - Pendidikan Agama Islam",
      jenisTagihan:
        selectedJenisTagihan === "-- Pilih Jenis Tagihan --"
          ? "Semua Tagihan"
          : selectedJenisTagihan,
      jumlahTagihan: 420,
      nominalTagihan: 1680000000,
      potongan: 140000000,
      terbayar: 1350000000,
      sisaPiutang: 190000000,
      persentaseTerbayar: 80.4,
    },
  ];

  // Handler Tampilkan Preview
  const handleTampilkan = () => {
    setShowPreview(true);
    setTimeout(() => {
      document.getElementById("rekap-preview-section")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };

  // Handler Lihat di Tab Baru
  const handleLihatTabBaru = () => {
    const reportHtml = generateLaporanRekapHtml({
      useKop,
      tahunAkademik: tahunAkademik === "-- Semua --" ? "" : tahunAkademik,
      selectedProdi,
      selectedJenisTagihan:
        selectedJenisTagihan === "-- Pilih Jenis Tagihan --"
          ? ""
          : selectedJenisTagihan,
      tglCutOff,
      periodeMasuk:
        periodeMasuk === "-- Pilih Periode Masuk --" ? "" : periodeMasuk,
      jalurPendaftaran:
        jalurPendaftaran === "-- Pilih Jalur Pendaftaran --"
          ? ""
          : jalurPendaftaran,
      gelombang: gelombang === "-- Pilih Gelombang --" ? "" : gelombang,
      sistemKuliah:
        sistemKuliah === "-- Pilih Sistem Kuliah --" ? "" : sistemKuliah,
      selectedPenerima:
        selectedPenerima === "-- Pilih Semua Penerima --"
          ? ""
          : selectedPenerima,
      rekapData: mockRekapData,
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
          Laporan Rekap Tagihan
        </h1>
      </div>

      {/* Main Filter Card */}
      <div className="bg-white rounded shadow-md border-t-4 border-t-emerald-600 p-5 sm:p-6 mb-8">
        <div className="space-y-4">
          {/* Row 1: Tahun Akademik */}
          <FormFieldRow id="tahun-akademik-select" label="Tahun Akademik">
            <FormSelect
              id="tahun-akademik-select"
              value={tahunAkademik}
              onChange={setTahunAkademik}
              options={tahunAkademikRekapOptions}
            />
          </FormFieldRow>

          {/* Row 2: Program Studi */}
          <FormFieldRow id="program-studi-select" label="Program Studi">
            <FormSelect
              id="program-studi-select"
              value={selectedProdi}
              onChange={setSelectedProdi}
              options={["Universitas Ibn Khaldun"]}
              optGroups={programStudiGroups.map((g) => ({
                label: g.fakultas,
                options: g.prodiList,
              }))}
            />
          </FormFieldRow>

          {/* Row 3: Jenis Tagihan */}
          <FormFieldRow id="jenis-tagihan-select" label="Jenis Tagihan">
            <FormSelect
              id="jenis-tagihan-select"
              value={selectedJenisTagihan}
              onChange={setSelectedJenisTagihan}
              options={jenisTagihanRekapOptions}
            />
          </FormFieldRow>

          {/* Row 4: Tgl. Cut Off */}
          <FormFieldRow id="tgl-cut-off-input" label="Tgl. Cut Off">
            <FormDatePicker
              id="tgl-cut-off-input"
              value={tglCutOff}
              onChange={setTglCutOff}
            />
          </FormFieldRow>

          {/* Row 5: Periode Masuk */}
          <FormFieldRow id="periode-masuk-select" label="Periode Masuk">
            <FormSelect
              id="periode-masuk-select"
              value={periodeMasuk}
              onChange={setPeriodeMasuk}
              options={periodeMasukRekapOptions}
            />
          </FormFieldRow>

          {/* Row 6: Jalur Pendaftaran */}
          <FormFieldRow id="jalur-pendaftaran-select" label="Jalur Pendaftaran">
            <FormSelect
              id="jalur-pendaftaran-select"
              value={jalurPendaftaran}
              onChange={setJalurPendaftaran}
              options={jalurPendaftaranRekapOptions}
            />
          </FormFieldRow>

          {/* Row 7: Gelombang */}
          <FormFieldRow id="gelombang-select" label="Gelombang">
            <FormSelect
              id="gelombang-select"
              value={gelombang}
              onChange={setGelombang}
              options={gelombangRekapOptions}
            />
          </FormFieldRow>

          {/* Row 8: Sistem Kuliah */}
          <FormFieldRow id="sistem-kuliah-select" label="Sistem Kuliah">
            <FormSelect
              id="sistem-kuliah-select"
              value={sistemKuliah}
              onChange={setSistemKuliah}
              options={sistemKuliahRekapOptions}
            />
          </FormFieldRow>

          {/* Row 9: Penerima */}
          <FormFieldRow id="penerima-select" label="Penerima">
            <FormSelect
              id="penerima-select"
              value={selectedPenerima}
              onChange={setSelectedPenerima}
              options={penerimaRekapOptions}
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
            <label
              htmlFor="kop-checkbox"
              className="inline-flex items-center gap-2 cursor-pointer select-none text-sm text-gray-700 font-medium"
            >
              <input
                id="kop-checkbox"
                type="checkbox"
                checked={useKop}
                onChange={(e) => setUseKop(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer accent-[#1e3a8a]"
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
        <LaporanRekapTagihanPreview
          tahunAkademik={tahunAkademik === "-- Semua --" ? "" : tahunAkademik}
          selectedProdi={selectedProdi}
          selectedFormat={selectedFormat}
          rekapData={mockRekapData}
          formatRupiah={formatRupiah}
          onLihatTabBaru={handleLihatTabBaru}
        />
      )}
    </div>
  );
}

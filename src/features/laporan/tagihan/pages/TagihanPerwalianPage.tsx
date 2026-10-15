import React, { useState } from "react";
import { IoEye, IoOpenOutline } from "react-icons/io5";
import {
  programStudiGroups,
  jenisTagihanRekapOptions,
  periodePerwalianOptions,
  angkatanOptions,
  statusSemesterOptions,
  statusTagihanPerwalianOptions,
  tahunAwalTagihanOptions,
  bulanAwalTagihanOptions,
  tahunAkhirTagihanOptions,
  bulanAkhirTagihanOptions,
  jumlahTagihanJatuhTempoOptions,
  tampilkanDendaOptions,
  formatOptions,
} from "../constants/laporanTagihanData";
import { FormFieldRow } from "../components/FormFieldRow";
import { FormSelect } from "../components/FormSelect";
import { TagihanPerwalianPreview } from "../components/TagihanPerwalianPreview";
import {
  generateTagihanPerwalianHtml,
  type PerwalianRowData,
} from "../utils/generateTagihanPerwalianHtml";

export default function TagihanPerwalianPage() {
  document.title = "Perwalian Tagihan - Sistem Informasi Keuangan UIKA";

  // Form State
  const [mahasiswaSearch, setMahasiswaSearch] = useState("");
  const [periodePerwalian, setPeriodePerwalian] = useState("-- Semua --");
  const [selectedProdi, setSelectedProdi] = useState("Universitas Ibn Khaldun");
  const [angkatan, setAngkatan] = useState("-- Pilih Angkatan --");
  const [statusSemester, setStatusSemester] = useState(
    "-- Pilih Status Semester --",
  );
  const [statusTagihan, setStatusTagihan] = useState("-- Semua --");
  const [selectedJenisTagihan, setSelectedJenisTagihan] = useState(
    "-- Pilih Jenis Tagihan --",
  );
  const [tahunAwalTagihan, setTahunAwalTagihan] = useState("2026");
  const [bulanAwalTagihan, setBulanAwalTagihan] = useState("Oktober");
  const [tahunAkhirTagihan, setTahunAkhirTagihan] = useState(
    "-- Pilih Tahun Akhir Tagihan --",
  );
  const [bulanAkhirTagihan, setBulanAkhirTagihan] = useState(
    "-- Pilih Bulan Akhir Tagihan --",
  );
  const [jumlahTagihanJatuhTempo, setJumlahTagihanJatuhTempo] = useState(
    "-- Pilih Jumlah Tagihan Jatuh Tempo --",
  );
  const [tampilkanKontak, setTampilkanKontak] = useState(false);
  const [tampilkanDenda, setTampilkanDenda] = useState("-- Semua --");
  const [selectedFormat, setSelectedFormat] = useState("HTML");
  const [useKop, setUseKop] = useState(true);

  // Preview State
  const [showPreview, setShowPreview] = useState(false);

  // Currency helper
  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(num);
  };

  // Mock data tagihan perwalian
  const mockReportData: PerwalianRowData[] = [
    {
      no: 1,
      nim: "231106051399",
      nama: "ZIYAD RAIS",
      prodi: "S1 - Teknik Informatika",
      angkatan: "2023",
      statusSemester: "Aktif",
      jenisTagihan:
        selectedJenisTagihan === "-- Pilih Jenis Tagihan --"
          ? "UKT"
          : selectedJenisTagihan,
      jatuhTempo: "15-10-2026",
      nominal: 4500000,
      sisaTagihan: 0,
      status: "Lunas",
      kontak: "081289123456",
      denda: 0,
    },
    {
      no: 2,
      nim: "231105060041",
      nama: "ANNISA AGUSTIN",
      prodi: "S1 - Sistem Informasi",
      angkatan: "2023",
      statusSemester: "Aktif",
      jenisTagihan:
        selectedJenisTagihan === "-- Pilih Jenis Tagihan --"
          ? "SKS"
          : selectedJenisTagihan,
      jatuhTempo: "15-10-2026",
      nominal: 3200000,
      sisaTagihan: 500000,
      status: "Belum Lunas",
      kontak: "085712345678",
      denda: 25000,
    },
    {
      no: 3,
      nim: "221105031312",
      nama: "MUHAMMAD JABAR",
      prodi: "S1 - Manajemen",
      angkatan: "2022",
      statusSemester: "Aktif",
      jenisTagihan:
        selectedJenisTagihan === "-- Pilih Jenis Tagihan --"
          ? "Cicilan Ke-1"
          : selectedJenisTagihan,
      jatuhTempo: "10-10-2026",
      nominal: 2500000,
      sisaTagihan: 1500000,
      status: "Belum Lunas",
      kontak: "087890123456",
      denda: 50000,
    },
    {
      no: 4,
      nim: "241020510521",
      nama: "AHID MUHAMMAD RIDWAN",
      prodi: "S1 - Ilmu Hukum",
      angkatan: "2024",
      statusSemester: "Aktif",
      jenisTagihan:
        selectedJenisTagihan === "-- Pilih Jenis Tagihan --"
          ? "Biaya Awal Masuk"
          : selectedJenisTagihan,
      jatuhTempo: "05-10-2026",
      nominal: 5000000,
      sisaTagihan: 5000000,
      status: "Belum Bayar",
      kontak: "081345678901",
      denda: 100000,
    },
    {
      no: 5,
      nim: "211010310214",
      nama: "FATHUR RAHMAN",
      prodi: "S1 - Akuntansi",
      angkatan: "2021",
      statusSemester: "Cuti",
      jenisTagihan:
        selectedJenisTagihan === "-- Pilih Jenis Tagihan --"
          ? "SPP Cuti Akademik"
          : selectedJenisTagihan,
      jatuhTempo: "01-10-2026",
      nominal: 750000,
      sisaTagihan: 750000,
      status: "Belum Bayar",
      kontak: "082134567890",
      denda: 0,
    },
  ];

  // Handler Tampilkan Preview
  const handleTampilkan = () => {
    setShowPreview(true);
    setTimeout(() => {
      document.getElementById("perwalian-preview-section")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };

  // Handler Lihat di Tab Baru
  const handleLihatTabBaru = () => {
    const reportHtml = generateTagihanPerwalianHtml({
      useKop,
      periodePerwalian:
        periodePerwalian === "-- Semua --" ? "" : periodePerwalian,
      selectedProdi,
      angkatan: angkatan === "-- Pilih Angkatan --" ? "" : angkatan,
      statusSemester:
        statusSemester === "-- Pilih Status Semester --" ? "" : statusSemester,
      statusTagihan: statusTagihan === "-- Semua --" ? "" : statusTagihan,
      jenisTagihan:
        selectedJenisTagihan === "-- Pilih Jenis Tagihan --"
          ? ""
          : selectedJenisTagihan,
      tampilkanKontak,
      tampilkanDenda,
      reportData: mockReportData,
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
          Perwalian Tagihan
        </h1>
      </div>

      {/* Main Filter Card */}
      <div className="bg-white rounded shadow-md border-t-4 border-t-emerald-600 p-5 sm:p-6 mb-8">
        <div className="space-y-4">
          {/* Row 1: Mahasiswa */}
          <FormFieldRow id="mahasiswa-input" label="Mahasiswa">
            <input
              id="mahasiswa-input"
              type="text"
              value={mahasiswaSearch}
              onChange={(e) => setMahasiswaSearch(e.target.value)}
              placeholder="Cari Mahasiswa"
              className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
            />
          </FormFieldRow>

          {/* Row 2: Periode Perwalian */}
          <FormFieldRow id="periode-perwalian-select" label="Periode Perwalian">
            <FormSelect
              id="periode-perwalian-select"
              value={periodePerwalian}
              onChange={setPeriodePerwalian}
              options={periodePerwalianOptions}
            />
          </FormFieldRow>

          {/* Row 3: Program Studi */}
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

          {/* Row 4: Angkatan */}
          <FormFieldRow id="angkatan-select" label="Angkatan">
            <FormSelect
              id="angkatan-select"
              value={angkatan}
              onChange={setAngkatan}
              options={angkatanOptions}
            />
          </FormFieldRow>

          {/* Row 5: Status Semester */}
          <FormFieldRow id="status-semester-select" label="Status Semester">
            <FormSelect
              id="status-semester-select"
              value={statusSemester}
              onChange={setStatusSemester}
              options={statusSemesterOptions}
            />
          </FormFieldRow>

          {/* Row 6: Status Tagihan */}
          <FormFieldRow id="status-tagihan-select" label="Status Tagihan">
            <FormSelect
              id="status-tagihan-select"
              value={statusTagihan}
              onChange={setStatusTagihan}
              options={statusTagihanPerwalianOptions}
            />
          </FormFieldRow>

          {/* Row 7: Jenis Tagihan */}
          <FormFieldRow id="jenis-tagihan-select" label="Jenis Tagihan">
            <FormSelect
              id="jenis-tagihan-select"
              value={selectedJenisTagihan}
              onChange={setSelectedJenisTagihan}
              options={jenisTagihanRekapOptions}
            />
          </FormFieldRow>

          {/* Row 8: Tahun Awal Tagihan */}
          <FormFieldRow
            id="tahun-awal-tagihan-select"
            label="Tahun Awal Tagihan"
          >
            <FormSelect
              id="tahun-awal-tagihan-select"
              value={tahunAwalTagihan}
              onChange={setTahunAwalTagihan}
              options={tahunAwalTagihanOptions}
            />
          </FormFieldRow>

          {/* Row 9: Bulan Awal Tagihan */}
          <FormFieldRow
            id="bulan-awal-tagihan-select"
            label="Bulan Awal Tagihan"
          >
            <FormSelect
              id="bulan-awal-tagihan-select"
              value={bulanAwalTagihan}
              onChange={setBulanAwalTagihan}
              options={bulanAwalTagihanOptions}
            />
          </FormFieldRow>

          {/* Row 10: Tahun Akhir Tagihan */}
          <FormFieldRow
            id="tahun-akhir-tagihan-select"
            label="Tahun Akhir Tagihan"
          >
            <FormSelect
              id="tahun-akhir-tagihan-select"
              value={tahunAkhirTagihan}
              onChange={setTahunAkhirTagihan}
              options={tahunAkhirTagihanOptions}
            />
          </FormFieldRow>

          {/* Row 11: Bulan Akhir Tagihan */}
          <FormFieldRow
            id="bulan-akhir-tagihan-select"
            label="Bulan Akhir Tagihan"
          >
            <FormSelect
              id="bulan-akhir-tagihan-select"
              value={bulanAkhirTagihan}
              onChange={setBulanAkhirTagihan}
              options={bulanAkhirTagihanOptions}
            />
          </FormFieldRow>

          {/* Row 12: Jumlah Tagihan Jatuh Tempo */}
          <FormFieldRow
            id="jumlah-tagihan-jatuh-tempo-select"
            label="Jumlah Tagihan Jatuh Tempo"
          >
            <FormSelect
              id="jumlah-tagihan-jatuh-tempo-select"
              value={jumlahTagihanJatuhTempo}
              onChange={setJumlahTagihanJatuhTempo}
              options={jumlahTagihanJatuhTempoOptions}
            />
          </FormFieldRow>

          {/* Row 13: Tampilkan Kontak? */}
          <FormFieldRow
            id="tampilkan-kontak-checkbox"
            label="Tampilkan Kontak?"
            alignCenter
          >
            <input
              id="tampilkan-kontak-checkbox"
              type="checkbox"
              checked={tampilkanKontak}
              onChange={(e) => setTampilkanKontak(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer accent-[#1e3a8a]"
            />
          </FormFieldRow>

          {/* Row 14: Tampilkan Denda */}
          <FormFieldRow id="tampilkan-denda-select" label="Tampilkan Denda">
            <FormSelect
              id="tampilkan-denda-select"
              value={tampilkanDenda}
              onChange={setTampilkanDenda}
              options={tampilkanDendaOptions}
            />
          </FormFieldRow>

          {/* Row 15: Format */}
          <FormFieldRow id="format-select" label="Format">
            <FormSelect
              id="format-select"
              value={selectedFormat}
              onChange={setSelectedFormat}
              options={formatOptions}
            />
          </FormFieldRow>

          {/* Row 16: KOP */}
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
        <TagihanPerwalianPreview
          periodePerwalian={
            periodePerwalian === "-- Semua --" ? "" : periodePerwalian
          }
          selectedProdi={selectedProdi}
          selectedFormat={selectedFormat}
          tampilkanKontak={tampilkanKontak}
          tampilkanDenda={tampilkanDenda}
          reportData={mockReportData}
          formatRupiah={formatRupiah}
          onLihatTabBaru={handleLihatTabBaru}
        />
      )}
    </div>
  );
}

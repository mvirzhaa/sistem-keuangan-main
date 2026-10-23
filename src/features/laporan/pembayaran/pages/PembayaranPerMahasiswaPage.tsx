import React, { useState } from "react";
import { IoEye, IoOpenOutline } from "react-icons/io5";
import {
  academicPeriods,
  metodePembayaranOptions,
  channelPembayaranOptions,
  penerimaPembayaranOptions,
  statusPembatalanPerMhsOptions,
  jenisTagihanOptions,
  formatOptions,
} from "../constants/laporanPembayaranData";
import { FormFieldRow } from "../../tagihan/components/FormFieldRow";
import { FormDatePicker } from "../../tagihan/components/FormDatePicker";
import { FormSelect } from "../../tagihan/components/FormSelect";
import { PembayaranPerMahasiswaPreview } from "../components/PembayaranPerMahasiswaPreview";
import {
  generatePembayaranPerMahasiswaHtml,
  type PembayaranPerMahasiswaRowData,
} from "../utils/generatePembayaranLanjutanHtml";
import {
  exportPembayaranPerMahasiswaToPdf,
  exportPembayaranPerMahasiswaToExcel,
} from "../utils/exportPembayaranLanjutan";

export default function PembayaranPerMahasiswaPage() {
  document.title = "Laporan Pembayaran Per Mahasiswa - Sistem Informasi Keuangan UIKA";

  // Form State
  const [periodePembayaran, setPeriodePembayaran] = useState("");
  const [metodePembayaran, setMetodePembayaran] = useState("");
  const [channel, setChannel] = useState("");
  const [tglAwal, setTglAwal] = useState("");
  const [tglAkhir, setTglAkhir] = useState("");
  const [jenisTagihan, setJenisTagihan] = useState("");
  const [penerima, setPenerima] = useState("");
  const [searchPegawai, setSearchPegawai] = useState("");
  const [statusPembatalan, setStatusPembatalan] = useState("TIDAK");
  const [tampilkanKelompokUkt, setTampilkanKelompokUkt] = useState(false);
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

  // Mock data pembayaran per mahasiswa
  const getMockData = (): PembayaranPerMahasiswaRowData[] => {
    const rawData: PembayaranPerMahasiswaRowData[] = [
      {
        no: 1,
        nim: "231106040901",
        idPendaftar: "REG-2023-0192",
        nama: "Ahmad Fauzi",
        semesterAktif: "Semester 5",
        prodi: "S1 - Teknik Informatika",
        pembayaran: "Bank Syariah Indonesia",
        tanggal: "12-10-2026",
        nominalTransaksi: 4750000,
        kodeTagihan: "TAG-2026-001",
        jenisTagihan: "Biaya Kuliah (SPP Tetap)",
        cicilanKe: "1",
        bulan: "Oktober",
        nominalDetail: 4750000,
        batal: "Tidak",
        semesterTa: "2026/2027 Ganjil",
        totalTagihan: 4750000,
        totalPembayaran: 4750000,
        periode: periodePembayaran || "2026 Ganjil",
        kodePembayaran: "PAY-20261-00821",
        tanggalBayar: "12-10-2026",
        metodePembayaran: "Virtual Account",
        channel: "Bank BSI",
        nominal: 4750000,
        status: "Sukses",
      },
      {
        no: 2,
        nim: "231106040902",
        idPendaftar: "REG-2023-0245",
        nama: "Siti Rahmawati",
        semesterAktif: "Semester 3",
        prodi: "S1 - Manajemen",
        pembayaran: "Kasir BASK UIKA",
        tanggal: "12-10-2026",
        nominalTransaksi: 3500000,
        kodeTagihan: "TAG-2026-002",
        jenisTagihan: "SPP Variabel",
        cicilanKe: "1",
        bulan: "Oktober",
        nominalDetail: 3500000,
        batal: "Tidak",
        semesterTa: "2026/2027 Ganjil",
        totalTagihan: 3500000,
        totalPembayaran: 3500000,
        periode: periodePembayaran || "2026 Ganjil",
        kodePembayaran: "PAY-20261-00822",
        tanggalBayar: "12-10-2026",
        metodePembayaran: "SevimaPay",
        channel: "Bank BNI",
        nominal: 3500000,
        status: "Sukses",
      },
      {
        no: 3,
        nim: "231106040903",
        idPendaftar: "REG-2023-0312",
        nama: "Budi Santoso",
        semesterAktif: "Semester 7",
        prodi: "S1 - Ilmu Hukum",
        pembayaran: "Bank Amanah Ummah",
        tanggal: "13-10-2026",
        nominalTransaksi: 5200000,
        kodeTagihan: "TAG-2026-003",
        jenisTagihan: "Biaya Kuliah Mandiri",
        cicilanKe: "2",
        bulan: "November",
        nominalDetail: 5200000,
        batal: "Tidak",
        semesterTa: "2026/2027 Ganjil",
        totalTagihan: 5200000,
        totalPembayaran: 5200000,
        periode: periodePembayaran || "2026 Ganjil",
        kodePembayaran: "PAY-20261-00823",
        tanggalBayar: "13-10-2026",
        metodePembayaran: "Virtual Account",
        channel: "Bank Mandiri",
        nominal: 5200000,
        status: "Sukses",
      },
      {
        no: 4,
        nim: "231106040904",
        idPendaftar: "-",
        nama: "Dewi Lestari",
        semesterAktif: "Semester 1",
        prodi: "S1 - Akuntansi",
        pembayaran: "Host to Host",
        tanggal: "13-10-2026",
        nominalTransaksi: 3500000,
        kodeTagihan: "TAG-2026-004",
        jenisTagihan: "Uang Gedung Tahap 1",
        cicilanKe: "1",
        bulan: "September",
        nominalDetail: 3500000,
        batal: "Tidak",
        semesterTa: "2026/2027 Ganjil",
        totalTagihan: 7000000,
        totalPembayaran: 3500000,
        periode: periodePembayaran || "2026 Ganjil",
        kodePembayaran: "PAY-20261-00824",
        tanggalBayar: "13-10-2026",
        metodePembayaran: "Transfer Bank",
        channel: "Bank Muamalat",
        nominal: 3500000,
        status: "Sukses",
      },
      {
        no: 5,
        nim: "231106040905",
        idPendaftar: "REG-2023-0582",
        nama: "Eko Prasetyo",
        semesterAktif: "Semester 5",
        prodi: "S1 - Teknik Elektro",
        pembayaran: "EduFin",
        tanggal: "14-10-2026",
        nominalTransaksi: 1250000,
        kodeTagihan: "TAG-2026-005",
        jenisTagihan: "Praktikum Rekayasa Perangkat Lunak",
        cicilanKe: "1",
        bulan: "Oktober",
        nominalDetail: 1250000,
        batal: "Tidak",
        semesterTa: "2026/2027 Ganjil",
        totalTagihan: 1250000,
        totalPembayaran: 1250000,
        periode: periodePembayaran || "2026 Ganjil",
        kodePembayaran: "PAY-20261-00825",
        tanggalBayar: "14-10-2026",
        metodePembayaran: "QRIS",
        channel: "Shopee",
        nominal: 1250000,
        status: "Sukses",
      },
      {
        no: 6,
        nim: "231106040906",
        idPendaftar: "-",
        nama: "Fitri Handayani",
        semesterAktif: "Semester 8",
        prodi: "S1 - Pendidikan Agama Islam",
        pembayaran: "Kasir BASK UIKA",
        tanggal: "14-10-2026",
        nominalTransaksi: 2800000,
        kodeTagihan: "TAG-2026-006",
        jenisTagihan: "Ujian Akhir Semester",
        cicilanKe: "1",
        bulan: "Januari",
        nominalDetail: 2800000,
        batal: "Ya",
        semesterTa: "2026/2027 Ganjil",
        totalTagihan: 2800000,
        totalPembayaran: 0,
        periode: periodePembayaran || "2026 Ganjil",
        kodePembayaran: "PAY-20261-00826",
        tanggalBayar: "14-10-2026",
        metodePembayaran: "Cash / Teller",
        channel: "Teller Kampus",
        nominal: 2800000,
        status: "Batal",
      },
      {
        no: 7,
        nim: "231106040907",
        idPendaftar: "REG-2023-0789",
        nama: "Gilang Ramadhan",
        semesterAktif: "Semester 3",
        prodi: "S1 - Sistem Informasi",
        pembayaran: "SIMPONI",
        tanggal: "15-10-2026",
        nominalTransaksi: 4750000,
        kodeTagihan: "TAG-2026-007",
        jenisTagihan: "Heregistrasi",
        cicilanKe: "1",
        bulan: "September",
        nominalDetail: 4750000,
        batal: "Tidak",
        semesterTa: "2026/2027 Ganjil",
        totalTagihan: 4750000,
        totalPembayaran: 4750000,
        periode: periodePembayaran || "2026 Ganjil",
        kodePembayaran: "PAY-20261-00827",
        tanggalBayar: "15-10-2026",
        metodePembayaran: "Virtual Account",
        channel: "Bank BRI",
        nominal: 4750000,
        status: "Sukses",
      },
      {
        no: 8,
        nim: "231106040908",
        idPendaftar: "REG-2023-0891",
        nama: "Haniifah Nurul",
        semesterAktif: "Semester 1",
        prodi: "S1 - Pendidikan Bahasa Inggris",
        pembayaran: "Deposit",
        tanggal: "15-10-2026",
        nominalTransaksi: 3100000,
        kodeTagihan: "TAG-2026-008",
        jenisTagihan: "SPP",
        cicilanKe: "1",
        bulan: "Oktober",
        nominalDetail: 3100000,
        batal: "Tidak",
        semesterTa: "2026/2027 Ganjil",
        totalTagihan: 3100000,
        totalPembayaran: 3100000,
        periode: periodePembayaran || "2026 Ganjil",
        kodePembayaran: "PAY-20261-00828",
        tanggalBayar: "15-10-2026",
        metodePembayaran: "SevimaPay",
        channel: "Tokopedia",
        nominal: 3100000,
        status: "Sukses",
      },
    ];

    if (statusPembatalan === "YA") {
      return rawData.filter((i) => i.status === "Batal");
    }
    if (statusPembatalan === "TIDAK") {
      return rawData.filter((i) => i.status !== "Batal");
    }
    return rawData;
  };

  const handleTampilkan = () => {
    setShowPreview(true);
    setTimeout(() => {
      document.getElementById("per-mhs-preview-section")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };

  const handleLihatTabBaru = async () => {
    const data = getMockData();
    const formattedPeriode =
      periodePembayaran === "-- Pilih Periode Pembayaran --"
        ? ""
        : periodePembayaran;

    if (selectedFormat === "PDF") {
      await exportPembayaranPerMahasiswaToPdf({
        useKop,
        periodePembayaran: formattedPeriode,
        data,
        tampilkanKelompokUkt,
        formatRupiah,
      });
      return;
    }

    if (selectedFormat === "EXCEL") {
      exportPembayaranPerMahasiswaToExcel({
        useKop,
        periodePembayaran: formattedPeriode,
        data,
        tampilkanKelompokUkt,
      });
      return;
    }

    const reportHtml = generatePembayaranPerMahasiswaHtml({
      useKop,
      periodePembayaran: formattedPeriode,
      metodePembayaran,
      channel,
      tglAwal,
      tglAkhir,
      jenisTagihan,
      penerima,
      statusPembatalan,
      tampilkanKelompokUkt,
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
          Laporan Pembayaran Per Mahasiswa
        </h1>
      </div>

      {/* Main Filter Card */}
      <div className="bg-white rounded shadow-md border-t-4 border-t-emerald-600 p-5 sm:p-6 mb-8">
        <div className="space-y-4">
          {/* Row 1: Periode Pembayaran */}
          <FormFieldRow id="periode-pembayaran-select" label="Periode Pembayaran">
            <FormSelect
              id="periode-pembayaran-select"
              value={periodePembayaran}
              onChange={setPeriodePembayaran}
              placeholder="-- Pilih Periode Pembayaran --"
              options={academicPeriods}
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

          {/* Row 3: Channel */}
          <FormFieldRow id="channel-select" label="Channel">
            <FormSelect
              id="channel-select"
              value={channel}
              onChange={setChannel}
              placeholder="-- Pilih Channel --"
              options={channelPembayaranOptions.filter(
                (o) => o !== "-- Pilih Channel --"
              )}
            />
          </FormFieldRow>

          {/* Row 4: Periode Tanggal (Inline s.d.) */}
          <FormFieldRow id="tgl-awal-input" label="Periode Tanggal">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <FormDatePicker
                  id="tgl-awal-input"
                  value={tglAwal}
                  onChange={setTglAwal}
                />
              </div>
              <span className="text-sm text-gray-500 font-medium select-none">
                s.d.
              </span>
              <div className="flex-1">
                <FormDatePicker
                  id="tgl-akhir-input"
                  value={tglAkhir}
                  onChange={setTglAkhir}
                />
              </div>
            </div>
          </FormFieldRow>

          {/* Row 5: Jenis Tagihan */}
          <FormFieldRow id="jenis-tagihan-select" label="Jenis Tagihan">
            <FormSelect
              id="jenis-tagihan-select"
              value={jenisTagihan}
              onChange={setJenisTagihan}
              placeholder="-- Pilih Jenis Tagihan --"
              options={jenisTagihanOptions.filter(
                (o) => o !== "-- Semua Jenis Tagihan --"
              )}
            />
          </FormFieldRow>

          {/* Row 6: Penerima */}
          <FormFieldRow id="penerima-select" label="Penerima">
            <FormSelect
              id="penerima-select"
              value={penerima}
              onChange={setPenerima}
              placeholder="-- Pilih Penerima --"
              options={penerimaPembayaranOptions.filter(
                (o) => o !== "-- Pilih Penerima --"
              )}
            />
          </FormFieldRow>

          {/* Row 7: Pegawai */}
          <FormFieldRow id="pegawai-input" label="Pegawai">
            <input
              id="pegawai-input"
              type="text"
              value={searchPegawai}
              onChange={(e) => setSearchPegawai(e.target.value)}
              placeholder="Cari Pegawai"
              className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
            />
          </FormFieldRow>

          {/* Row 8: Status Pembatalan */}
          <FormFieldRow id="status-pembatalan-select" label="Status Pembatalan">
            <FormSelect
              id="status-pembatalan-select"
              value={statusPembatalan}
              onChange={setStatusPembatalan}
              options={statusPembatalanPerMhsOptions}
            />
          </FormFieldRow>

          {/* Row 9: Kelompok UKT */}
          <FormFieldRow id="kelompok-ukt-checkbox" label="Kelompok UKT" alignCenter>
            <label className="flex items-center gap-2 cursor-pointer select-none text-sm text-gray-800">
              <input
                id="kelompok-ukt-checkbox"
                type="checkbox"
                checked={tampilkanKelompokUkt}
                onChange={(e) => setTampilkanKelompokUkt(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
              />
              <span>Tampilkan Kelompok UKT</span>
            </label>
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
        <PembayaranPerMahasiswaPreview
          useKop={useKop}
          periodePembayaran={periodePembayaran}
          metodePembayaran={metodePembayaran}
          channel={channel}
          jenisTagihan={jenisTagihan}
          penerima={penerima}
          tampilkanKelompokUkt={tampilkanKelompokUkt}
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

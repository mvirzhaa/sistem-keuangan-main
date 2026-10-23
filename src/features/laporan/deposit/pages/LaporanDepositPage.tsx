import React, { useState } from "react";
import { IoEye, IoOpenOutline } from "react-icons/io5";
import {
  academicPeriods,
  programStudiGroups,
  metodePembayaranOptions,
  channelPembayaranOptions,
  penerimaDepositOptions,
  formatOptions,
} from "../constants/laporanDepositData";
import { FormFieldRow } from "../../tagihan/components/FormFieldRow";
import { FormSelect } from "../../tagihan/components/FormSelect";
import { LaporanDepositPreview } from "../components/LaporanDepositPreview";
import {
  generateLaporanDepositHtml,
  type LaporanDepositRowData,
} from "../utils/generateLaporanDepositHtml";
import {
  exportLaporanDepositToPdf,
  exportLaporanDepositToExcel,
} from "../utils/exportLaporanDeposit";

export default function LaporanDepositPage() {
  document.title = "Laporan Deposit - Sistem Informasi Keuangan UIKA";

  // Form State matching Image 1
  const [tahunAkademik, setTahunAkademik] = useState("2026 Ganjil");
  const [programStudi, setProgramStudi] = useState("-- Pilih Program Studi --");
  const [metodePembayaran, setMetodePembayaran] = useState(
    "-- Pilih Metode Pembayaran --"
  );
  const [channel, setChannel] = useState("-- Pilih Channel --");
  const [penerima, setPenerima] = useState("Mahasiswa");
  const [mahasiswaQuery, setMahasiswaQuery] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("HTML");
  const [useKop, setUseKop] = useState(true);

  // Preview State
  const [showPreview, setShowPreview] = useState(false);

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(num);
  };

  // Mock data for Laporan Deposit
  const getMockData = (): LaporanDepositRowData[] => {
    const rawData: LaporanDepositRowData[] = [
      {
        no: 1,
        kodeDeposit: "DEP-2026-001",
        nim: "2311010001",
        nama: "Ahmad Fauzi",
        prodi: "S1 - Teknik Informatika",
        periode: "2026/2027 Ganjil",
        metodePembayaran: "Virtual Account",
        channel: "Bank BSI",
        keterangan: "Deposit Awal Mahasiswa Baru",
        tanggal: "14-10-2026",
        tanggalDeposit: "14-10-2026",
        masuk: 1500000,
        keluar: 0,
        nominalDeposit: 1500000,
        status: "Tersedia",
      },
      {
        no: 2,
        kodeDeposit: "DEP-2026-002",
        nim: "2311010014",
        nama: "Siti Rahmawati",
        prodi: "S1 - Teknik Informatika",
        periode: "2026/2027 Ganjil",
        metodePembayaran: "Transfer Bank",
        channel: "Bank BNI",
        keterangan: "Kelebihan Pembayaran SPP",
        tanggal: "12-10-2026",
        tanggalDeposit: "12-10-2026",
        masuk: 750000,
        keluar: 250000,
        nominalDeposit: 750000,
        status: "Terpakai Sebagian",
      },
      {
        no: 3,
        kodeDeposit: "DEP-2026-003",
        nim: "2312020023",
        nama: "Muhammad Rizky",
        prodi: "S1 - Manajemen",
        periode: "2026/2027 Ganjil",
        metodePembayaran: "SevimaPay",
        channel: "Bank Mandiri",
        keterangan: "Deposit Biaya Praktikum",
        tanggal: "10-10-2026",
        tanggalDeposit: "10-10-2026",
        masuk: 2000000,
        keluar: 0,
        nominalDeposit: 2000000,
        status: "Tersedia",
      },
      {
        no: 4,
        kodeDeposit: "DEP-2026-004",
        nim: "2312020045",
        nama: "Nurul Hidayah",
        prodi: "S1 - Manajemen",
        periode: "2026/2027 Ganjil",
        metodePembayaran: "Cash / Teller",
        channel: "Teller Kampus",
        keterangan: "Deposit Pembayaran Tagihan",
        tanggal: "08-10-2026",
        tanggalDeposit: "08-10-2026",
        masuk: 500000,
        keluar: 500000,
        nominalDeposit: 500000,
        status: "Habis",
      },
      {
        no: 5,
        kodeDeposit: "DEP-2026-005",
        nim: "2313030012",
        nama: "Dimas Pratama",
        prodi: "S1 - Ilmu Hukum",
        periode: "2026/2027 Ganjil",
        metodePembayaran: "Virtual Account",
        channel: "Bank Muamalat",
        keterangan: "Topup Saldo Deposit",
        tanggal: "05-10-2026",
        tanggalDeposit: "05-10-2026",
        masuk: 3000000,
        keluar: 0,
        nominalDeposit: 3000000,
        status: "Tersedia",
      },
      {
        no: 6,
        kodeDeposit: "DEP-2026-006",
        nim: "2314040008",
        nama: "Fathimah Azzahra",
        prodi: "S1 - Pendidikan Agama Islam",
        periode: "2026/2027 Ganjil",
        metodePembayaran: "QRIS",
        channel: "Bank BSI",
        keterangan: "Deposit Dana Kegiatan",
        tanggal: "04-10-2026",
        tanggalDeposit: "04-10-2026",
        masuk: 1200000,
        keluar: 400000,
        nominalDeposit: 1200000,
        status: "Terpakai Sebagian",
      },
      {
        no: 7,
        kodeDeposit: "DEP-2026-007",
        nim: "2311050019",
        nama: "Bagas Setiawan",
        prodi: "S1 - Sistem Informasi",
        periode: "2026/2027 Ganjil",
        metodePembayaran: "Virtual Account",
        channel: "Bank Mandiri",
        keterangan: "Deposit Awal Mahasiswa Baru",
        tanggal: "03-10-2026",
        tanggalDeposit: "03-10-2026",
        masuk: 2500000,
        keluar: 0,
        nominalDeposit: 2500000,
        status: "Tersedia",
      },
      {
        no: 8,
        kodeDeposit: "DEP-2026-008",
        nim: "2312060031",
        nama: "Anisa Putri",
        prodi: "S1 - Akuntansi",
        periode: "2026/2027 Ganjil",
        metodePembayaran: "SevimaPay",
        channel: "Bank BNI",
        keterangan: "Kelebihan Uang Kuliah",
        tanggal: "02-10-2026",
        tanggalDeposit: "02-10-2026",
        masuk: 1800000,
        keluar: 0,
        nominalDeposit: 1800000,
        status: "Tersedia",
      },
      {
        no: 9,
        kodeDeposit: "DEP-2026-009",
        nim: "2315070005",
        nama: "Reza Firmansyah",
        prodi: "S1 - Kesehatan Masyarakat",
        periode: "2026/2027 Ganjil",
        metodePembayaran: "Transfer Bank",
        channel: "Bank Muamalat",
        keterangan: "Deposit Pembayaran Tagihan",
        tanggal: "01-10-2026",
        tanggalDeposit: "01-10-2026",
        masuk: 900000,
        keluar: 300000,
        nominalDeposit: 900000,
        status: "Terpakai Sebagian",
      },
    ];

    return rawData
      .filter((item) => {
        if (
          programStudi &&
          programStudi !== "-- Pilih Program Studi --" &&
          !item.prodi.includes(programStudi)
        ) {
          return false;
        }
        if (
          metodePembayaran &&
          metodePembayaran !== "-- Pilih Metode Pembayaran --" &&
          item.metodePembayaran !== metodePembayaran
        ) {
          return false;
        }
        if (
          channel &&
          channel !== "-- Pilih Channel --" &&
          item.channel !== channel
        ) {
          return false;
        }
        if (mahasiswaQuery.trim()) {
          const q = mahasiswaQuery.toLowerCase();
          return (
            item.nama.toLowerCase().includes(q) ||
            item.nim.toLowerCase().includes(q)
          );
        }
        return true;
      })
      .map((item, idx) => ({ ...item, no: idx + 1 }));
  };

  const handleTampilkan = () => {
    setShowPreview(true);
    setTimeout(() => {
      document
        .getElementById("laporan-deposit-preview")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleLihatTabBaru = async () => {
    const data = getMockData();

    if (selectedFormat === "PDF") {
      await exportLaporanDepositToPdf({
        useKop,
        tahunAkademik,
        programStudi:
          programStudi === "-- Pilih Program Studi --" ? "" : programStudi,
        metodePembayaran:
          metodePembayaran === "-- Pilih Metode Pembayaran --"
            ? ""
            : metodePembayaran,
        channel: channel === "-- Pilih Channel --" ? "" : channel,
        penerima,
        data,
        formatRupiah,
      });
      return;
    }

    if (selectedFormat === "EXCEL") {
      exportLaporanDepositToExcel({
        useKop,
        tahunAkademik,
        programStudi:
          programStudi === "-- Pilih Program Studi --" ? "" : programStudi,
        metodePembayaran:
          metodePembayaran === "-- Pilih Metode Pembayaran --"
            ? ""
            : metodePembayaran,
        channel: channel === "-- Pilih Channel --" ? "" : channel,
        penerima,
        data,
      });
      return;
    }

    // Default HTML Preview
    const html = generateLaporanDepositHtml({
      useKop,
      tahunAkademik,
      programStudi:
        programStudi === "-- Pilih Program Studi --" ? "" : programStudi,
      metodePembayaran:
        metodePembayaran === "-- Pilih Metode Pembayaran --"
          ? ""
          : metodePembayaran,
      channel: channel === "-- Pilih Channel --" ? "" : channel,
      penerima,
      data,
      formatRupiah,
    });

    const newWindow = window.open("", "_blank");
    if (newWindow) {
      newWindow.document.write(html);
      newWindow.document.close();
    }
  };

  return (
    <div className="w-full">
      {/* Title */}
      <div className="mb-4">
        <h1 className="text-2xl font-medium text-gray-800">Laporan Deposit</h1>
      </div>

      {/* Main Filter Card */}
      <div className="bg-white rounded shadow-md border-t-4 border-t-emerald-600 p-5 sm:p-6 mb-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleTampilkan();
          }}
        >
          {/* 1. Tahun Akademik */}
          <FormFieldRow id="tahun-akademik-select" label="Tahun Akademik">
            <FormSelect
              id="tahun-akademik-select"
              value={tahunAkademik}
              options={academicPeriods}
              onChange={setTahunAkademik}
            />
          </FormFieldRow>

          {/* 2. Program Studi */}
          <FormFieldRow id="program-studi-select" label="Program Studi">
            <select
              id="program-studi-select"
              value={programStudi}
              onChange={(e) => setProgramStudi(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
            >
              <option value="-- Pilih Program Studi --">
                -- Pilih Program Studi --
              </option>
              <option value="Universitas Ibn Khaldun">
                Universitas Ibn Khaldun
              </option>
              {programStudiGroups.map((group, idx) => (
                <optgroup key={idx} label={group.fakultas}>
                  <option value={group.fakultas}>-- {group.fakultas} --</option>
                  {group.prodiList.map((prodi, pIdx) => (
                    <option key={pIdx} value={prodi}>
                      {prodi}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </FormFieldRow>

          {/* 3. Metode Pembayaran */}
          <FormFieldRow
            id="metode-pembayaran-select"
            label="Metode Pembayaran"
          >
            <FormSelect
              id="metode-pembayaran-select"
              value={metodePembayaran}
              options={metodePembayaranOptions}
              onChange={setMetodePembayaran}
            />
          </FormFieldRow>

          {/* 4. Channel */}
          <FormFieldRow id="channel-select" label="Channel">
            <FormSelect
              id="channel-select"
              value={channel}
              options={channelPembayaranOptions}
              onChange={setChannel}
            />
          </FormFieldRow>

          {/* 5. Penerima */}
          <FormFieldRow id="penerima-select" label="Penerima">
            <FormSelect
              id="penerima-select"
              value={penerima}
              options={penerimaDepositOptions}
              onChange={setPenerima}
            />
          </FormFieldRow>

          {/* 6. Mahasiswa */}
          <FormFieldRow id="mahasiswa-input" label="Mahasiswa">
            <input
              id="mahasiswa-input"
              type="text"
              value={mahasiswaQuery}
              onChange={(e) => setMahasiswaQuery(e.target.value)}
              placeholder="Cari Mahasiswa"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
            />
          </FormFieldRow>

          {/* 7. Format */}
          <FormFieldRow id="format-select" label="Format">
            <FormSelect
              id="format-select"
              value={selectedFormat}
              options={formatOptions}
              onChange={setSelectedFormat}
            />
          </FormFieldRow>

          {/* 8. KOP */}
          <FormFieldRow label="KOP">
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="useKop"
                checked={useKop}
                onChange={(e) => setUseKop(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
              />
              <label
                htmlFor="useKop"
                className="text-sm font-medium text-gray-700 cursor-pointer select-none"
              >
                Gunakan KOP
              </label>
            </div>
          </FormFieldRow>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-6 mt-4 border-t border-gray-100">
            <button
              type="submit"
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
        </form>
      </div>

      {/* Preview Section */}
      {showPreview && (
        <LaporanDepositPreview
          useKop={useKop}
          tahunAkademik={tahunAkademik}
          programStudi={programStudi}
          metodePembayaran={metodePembayaran}
          channel={channel}
          penerima={penerima}
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

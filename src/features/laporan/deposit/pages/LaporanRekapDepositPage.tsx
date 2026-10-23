import React, { useState } from "react";
import { IoEye, IoOpenOutline } from "react-icons/io5";
import {
  academicPeriods,
  programStudiGroups,
  metodePembayaranOptions,
  channelPembayaranOptions,
  formatOptions,
} from "../constants/laporanDepositData";
import { FormFieldRow } from "../../tagihan/components/FormFieldRow";
import { FormSelect } from "../../tagihan/components/FormSelect";
import { FormDatePicker } from "../../tagihan/components/FormDatePicker";
import { LaporanRekapDepositPreview } from "../components/LaporanRekapDepositPreview";
import {
  generateLaporanRekapDepositHtml,
  type LaporanRekapDepositRowData,
} from "../utils/generateLaporanDepositHtml";
import {
  exportLaporanRekapDepositToPdf,
  exportLaporanRekapDepositToExcel,
} from "../utils/exportLaporanDeposit";

export default function LaporanRekapDepositPage() {
  document.title = "Laporan Rekap Deposit - Sistem Informasi Keuangan UIKA";

  // Form State matching Image 2
  const [tahunAkademik, setTahunAkademik] = useState("2026 Ganjil");
  const [programStudi, setProgramStudi] = useState("Universitas Ibn Khaldun");
  const [metodePembayaran, setMetodePembayaran] = useState(
    "-- Pilih Metode Pembayaran --"
  );
  const [channel, setChannel] = useState("-- Pilih Channel --");
  const [tglAwal, setTglAwal] = useState("");
  const [tglAkhir, setTglAkhir] = useState("");
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

  // Mock data for Laporan Rekap Deposit
  const getMockData = (): LaporanRekapDepositRowData[] => {
    const rawData: LaporanRekapDepositRowData[] = [
      {
        no: 1,
        prodi: "S1 - Teknik Informatika",
        metodePembayaran: "Virtual Account",
        channel: "Bank BSI",
        jumlahTransaksi: 45,
        masuk: 95000000,
        keluar: 72000000,
        totalDepositMasuk: 95000000,
        totalTerpakai: 72000000,
        sisaSaldo: 23000000,
      },
      {
        no: 2,
        prodi: "S1 - Manajemen",
        metodePembayaran: "SevimaPay",
        channel: "Bank Mandiri",
        jumlahTransaksi: 62,
        masuk: 124000000,
        keluar: 88500000,
        totalDepositMasuk: 124000000,
        totalTerpakai: 88500000,
        sisaSaldo: 35500000,
      },
      {
        no: 3,
        prodi: "S1 - Ilmu Hukum",
        metodePembayaran: "Virtual Account",
        channel: "Bank Muamalat",
        jumlahTransaksi: 38,
        masuk: 82500000,
        keluar: 61000000,
        totalDepositMasuk: 82500000,
        totalTerpakai: 61000000,
        sisaSaldo: 21500000,
      },
      {
        no: 4,
        prodi: "S1 - Pendidikan Agama Islam",
        metodePembayaran: "Transfer Bank",
        channel: "Bank BNI",
        jumlahTransaksi: 50,
        masuk: 75000000,
        keluar: 56000000,
        totalDepositMasuk: 75000000,
        totalTerpakai: 56000000,
        sisaSaldo: 19000000,
      },
      {
        no: 5,
        prodi: "S1 - Sistem Informasi",
        metodePembayaran: "Virtual Account",
        channel: "Bank Mandiri",
        jumlahTransaksi: 28,
        masuk: 62000000,
        keluar: 44500000,
        totalDepositMasuk: 62000000,
        totalTerpakai: 44500000,
        sisaSaldo: 17500000,
      },
      {
        no: 6,
        prodi: "S1 - Akuntansi",
        metodePembayaran: "Cash / Teller",
        channel: "Teller Kampus",
        jumlahTransaksi: 22,
        masuk: 48000000,
        keluar: 39000000,
        totalDepositMasuk: 48000000,
        totalTerpakai: 39000000,
        sisaSaldo: 9000000,
      },
      {
        no: 7,
        prodi: "S1 - Kesehatan Masyarakat",
        metodePembayaran: "QRIS",
        channel: "Bank BSI",
        jumlahTransaksi: 19,
        masuk: 41500000,
        keluar: 29500000,
        totalDepositMasuk: 41500000,
        totalTerpakai: 29500000,
        sisaSaldo: 12000000,
      },
      {
        no: 8,
        prodi: "S1 - Bisnis Digital",
        metodePembayaran: "SevimaPay",
        channel: "Bank BNI",
        jumlahTransaksi: 26,
        masuk: 57000000,
        keluar: 42000000,
        totalDepositMasuk: 57000000,
        totalTerpakai: 42000000,
        sisaSaldo: 15000000,
      },
    ];

    return rawData
      .filter((item) => {
        if (
          programStudi &&
          programStudi !== "Universitas Ibn Khaldun" &&
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
        return true;
      })
      .map((item, idx) => ({ ...item, no: idx + 1 }));
  };

  const handleTampilkan = () => {
    setShowPreview(true);
    setTimeout(() => {
      document
        .getElementById("laporan-rekap-deposit-preview")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleLihatTabBaru = async () => {
    const data = getMockData();

    if (selectedFormat === "PDF") {
      await exportLaporanRekapDepositToPdf({
        useKop,
        tahunAkademik,
        programStudi:
          programStudi === "Universitas Ibn Khaldun" ? "" : programStudi,
        metodePembayaran:
          metodePembayaran === "-- Pilih Metode Pembayaran --"
            ? ""
            : metodePembayaran,
        channel: channel === "-- Pilih Channel --" ? "" : channel,
        tglAwal,
        tglAkhir,
        data,
        formatRupiah,
      });
      return;
    }

    if (selectedFormat === "EXCEL") {
      exportLaporanRekapDepositToExcel({
        useKop,
        tahunAkademik,
        programStudi:
          programStudi === "Universitas Ibn Khaldun" ? "" : programStudi,
        metodePembayaran:
          metodePembayaran === "-- Pilih Metode Pembayaran --"
            ? ""
            : metodePembayaran,
        channel: channel === "-- Pilih Channel --" ? "" : channel,
        tglAwal,
        tglAkhir,
        data,
      });
      return;
    }

    // Default HTML Preview
    const html = generateLaporanRekapDepositHtml({
      useKop,
      tahunAkademik,
      programStudi:
        programStudi === "Universitas Ibn Khaldun" ? "" : programStudi,
      metodePembayaran:
        metodePembayaran === "-- Pilih Metode Pembayaran --"
          ? ""
          : metodePembayaran,
      channel: channel === "-- Pilih Channel --" ? "" : channel,
      tglAwal,
      tglAkhir,
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
        <h1 className="text-2xl font-medium text-gray-800">
          Laporan Rekap Deposit
        </h1>
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

          {/* 5. Tanggal Awal */}
          <FormFieldRow id="tanggal-awal-input" label="Tanggal Awal">
            <FormDatePicker
              id="tanggal-awal-input"
              value={tglAwal}
              onChange={setTglAwal}
            />
          </FormFieldRow>

          {/* 6. Tanggal Akhir */}
          <FormFieldRow id="tanggal-akhir-input" label="Tanggal Akhir">
            <FormDatePicker
              id="tanggal-akhir-input"
              value={tglAkhir}
              onChange={setTglAkhir}
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
        <LaporanRekapDepositPreview
          useKop={useKop}
          tahunAkademik={tahunAkademik}
          programStudi={programStudi}
          metodePembayaran={metodePembayaran}
          channel={channel}
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

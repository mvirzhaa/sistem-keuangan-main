import React, { useState } from "react";
import { IoEye, IoOpenOutline } from "react-icons/io5";
import {
  academicPeriods,
  metodePembayaranOptions,
  channelPembayaranOptions,
  penerimaPembayaranOptions,
  jalurPendaftaranOptions,
  gelombangOptions,
  sistemKuliahOptions,
  formatOptions,
  programStudiGroups,
} from "../constants/laporanPembayaranData";
import { FormFieldRow } from "../../tagihan/components/FormFieldRow";
import { FormDatePicker } from "../../tagihan/components/FormDatePicker";
import { FormSelect } from "../../tagihan/components/FormSelect";
import { LaporanRekapPembayaranPreview } from "../components/LaporanRekapPembayaranPreview";
import {
  generateLaporanRekapPembayaranHtml,
  type RekapPembayaranRowData,
} from "../utils/generateLaporanRekapPembayaranHtml";
import {
  exportRekapPembayaranToPdf,
  exportRekapPembayaranToExcel,
} from "../utils/exportLaporanRekapPembayaran";

export default function LaporanRekapPembayaranPage() {
  document.title = "Laporan Rekapitulasi Pembayaran - Sistem Informasi Keuangan UIKA";

  // Form State
  const [periodePembayaran, setPeriodePembayaran] = useState("");
  const [prodi, setProdi] = useState("");
  const [metodePembayaran, setMetodePembayaran] = useState("");
  const [channel, setChannel] = useState("");
  const [tglAwal, setTglAwal] = useState("");
  const [tglAkhir, setTglAkhir] = useState("");
  const [periodeMasuk, setPeriodeMasuk] = useState("");
  const [jalurPendaftaran, setJalurPendaftaran] = useState("");
  const [gelombang, setGelombang] = useState("");
  const [sistemKuliah, setSistemKuliah] = useState("");
  const [penerima, setPenerima] = useState("");
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

  // Mock data rekapitulasi pembayaran per program studi
  const getMockRekapData = (): RekapPembayaranRowData[] => {
    const rawData: RekapPembayaranRowData[] = [
      {
        no: 1,
        kodeProdi: "55201",
        prodi: "S1 - Teknik Informatika",
        fakultas: "Fakultas Teknik dan Sains",
        bankSyariahIndonesia: 450000000,
        kasirBaskUika: 120000000,
        bankAmanahUmmah: 85000000,
        hostToHost: 310000000,
        eduFin: 180000000,
        deposit: 25000000,
        simponi: 140000000,
        total: 1310000000,
        jumlahPembayaran: 320,
      },
      {
        no: 2,
        kodeProdi: "57201",
        prodi: "S1 - Sistem Informasi",
        fakultas: "Fakultas Teknik dan Sains",
        bankSyariahIndonesia: 320000000,
        kasirBaskUika: 85000000,
        bankAmanahUmmah: 60000000,
        hostToHost: 210000000,
        eduFin: 120000000,
        deposit: 15000000,
        simponi: 95000000,
        total: 905000000,
        jumlahPembayaran: 215,
      },
      {
        no: 3,
        kodeProdi: "61201",
        prodi: "S1 - Manajemen",
        fakultas: "Fakultas Ekonomi dan Bisnis",
        bankSyariahIndonesia: 480000000,
        kasirBaskUika: 150000000,
        bankAmanahUmmah: 95000000,
        hostToHost: 340000000,
        eduFin: 160000000,
        deposit: 30000000,
        simponi: 125000000,
        total: 1380000000,
        jumlahPembayaran: 410,
      },
      {
        no: 4,
        kodeProdi: "62201",
        prodi: "S1 - Akuntansi",
        fakultas: "Fakultas Ekonomi dan Bisnis",
        bankSyariahIndonesia: 310000000,
        kasirBaskUika: 75000000,
        bankAmanahUmmah: 45000000,
        hostToHost: 190000000,
        eduFin: 110000000,
        deposit: 18000000,
        simponi: 80000000,
        total: 828000000,
        jumlahPembayaran: 260,
      },
      {
        no: 5,
        kodeProdi: "74201",
        prodi: "S1 - Ilmu Hukum",
        fakultas: "Fakultas Hukum",
        bankSyariahIndonesia: 520000000,
        kasirBaskUika: 160000000,
        bankAmanahUmmah: 110000000,
        hostToHost: 390000000,
        eduFin: 210000000,
        deposit: 35000000,
        simponi: 165000000,
        total: 1590000000,
        jumlahPembayaran: 345,
      },
      {
        no: 6,
        kodeProdi: "86208",
        prodi: "S1 - Pendidikan Agama Islam",
        fakultas: "Fakultas Agama Islam",
        bankSyariahIndonesia: 350000000,
        kasirBaskUika: 90000000,
        bankAmanahUmmah: 65000000,
        hostToHost: 230000000,
        eduFin: 130000000,
        deposit: 20000000,
        simponi: 105000000,
        total: 990000000,
        jumlahPembayaran: 380,
      },
      {
        no: 7,
        kodeProdi: "60202",
        prodi: "S1 - Ekonomi Syariah",
        fakultas: "Fakultas Agama Islam",
        bankSyariahIndonesia: 220000000,
        kasirBaskUika: 55000000,
        bankAmanahUmmah: 40000000,
        hostToHost: 150000000,
        eduFin: 85000000,
        deposit: 12000000,
        simponi: 68000000,
        total: 630000000,
        jumlahPembayaran: 190,
      },
      {
        no: 8,
        kodeProdi: "13201",
        prodi: "S1 - Kesehatan Masyarakat",
        fakultas: "Fakultas Ilmu Kesehatan",
        bankSyariahIndonesia: 240000000,
        kasirBaskUika: 60000000,
        bankAmanahUmmah: 45000000,
        hostToHost: 165000000,
        eduFin: 90000000,
        deposit: 14000000,
        simponi: 72000000,
        total: 686000000,
        jumlahPembayaran: 175,
      },
      {
        no: 9,
        kodeProdi: "22201",
        prodi: "S1 - Teknik Sipil",
        fakultas: "Fakultas Teknik dan Sains",
        bankSyariahIndonesia: 215000000,
        kasirBaskUika: 55000000,
        bankAmanahUmmah: 40000000,
        hostToHost: 145000000,
        eduFin: 80000000,
        deposit: 12000000,
        simponi: 65000000,
        total: 612000000,
        jumlahPembayaran: 140,
      },
      {
        no: 10,
        kodeProdi: "88203",
        prodi: "S1 - Pendidikan Bahasa Inggris",
        fakultas: "Fakultas Keguruan dan Ilmu Pendidikan",
        bankSyariahIndonesia: 180000000,
        kasirBaskUika: 40000000,
        bankAmanahUmmah: 30000000,
        hostToHost: 110000000,
        eduFin: 65000000,
        deposit: 8000000,
        simponi: 50000000,
        total: 483000000,
        jumlahPembayaran: 130,
      },
    ];

    if (
      prodi &&
      prodi !== "-- Pilih Semua Program Studi --" &&
      prodi !== "-- Pilih Program Studi --"
    ) {
      return rawData.filter((item) => item.prodi === prodi);
    }
    return rawData;
  };

  // Handler Tampilkan Preview
  const handleTampilkan = () => {
    setShowPreview(true);
    setTimeout(() => {
      document.getElementById("rekap-pembayaran-preview-section")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };

  // Handler Lihat di Tab Baru & Auto Download
  const handleLihatTabBaru = async () => {
    const data = getMockRekapData();
    const formattedPeriode =
      periodePembayaran === "-- Pilih Semua Periode Akademik --"
        ? ""
        : periodePembayaran;
    const formattedProdi =
      prodi === "-- Pilih Semua Program Studi --" ? "" : prodi;
    const formattedMetode =
      metodePembayaran === "-- Pilih Semua Metode Pembayaran --"
        ? ""
        : metodePembayaran;
    const formattedChannel =
      channel === "-- Pilih Semua Channel --" ? "" : channel;
    const formattedPenerima =
      penerima === "-- Pilih Semua Penerima --" ? "" : penerima;

    if (selectedFormat === "PDF") {
      await exportRekapPembayaranToPdf({
        useKop,
        periodePembayaran: formattedPeriode,
        prodi: formattedProdi,
        metodePembayaran: formattedMetode,
        channel: formattedChannel,
        tglAwal,
        tglAkhir,
        penerima: formattedPenerima,
        data,
        formatRupiah,
      });
      return;
    }

    if (selectedFormat === "EXCEL") {
      exportRekapPembayaranToExcel({
        useKop,
        periodePembayaran: formattedPeriode,
        prodi: formattedProdi,
        metodePembayaran: formattedMetode,
        channel: formattedChannel,
        tglAwal,
        tglAkhir,
        penerima: formattedPenerima,
        data,
      });
      return;
    }

    // Default HTML
    const reportHtml = generateLaporanRekapPembayaranHtml({
      useKop,
      periodePembayaran: formattedPeriode,
      prodi: formattedProdi,
      metodePembayaran: formattedMetode,
      channel: formattedChannel,
      tglAwal,
      tglAkhir,
      periodeMasuk,
      jalurPendaftaran,
      gelombang,
      sistemKuliah,
      penerima: formattedPenerima,
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
          Laporan Rekapitulasi Pembayaran
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
              placeholder="-- Pilih Semua Periode Akademik --"
              options={academicPeriods}
            />
          </FormFieldRow>

          {/* Row 2: Program Studi */}
          <FormFieldRow id="program-studi-select" label="Program Studi">
            <FormSelect
              id="program-studi-select"
              value={prodi}
              onChange={setProdi}
              placeholder="-- Pilih Semua Program Studi --"
              optGroups={programStudiGroups.map((g) => ({
                label: g.fakultas,
                options: g.prodiList,
              }))}
            />
          </FormFieldRow>

          {/* Row 3: Metode Pembayaran */}
          <FormFieldRow id="metode-pembayaran-select" label="Metode Pembayaran">
            <FormSelect
              id="metode-pembayaran-select"
              value={metodePembayaran}
              onChange={setMetodePembayaran}
              placeholder="-- Pilih Semua Metode Pembayaran --"
              options={metodePembayaranOptions.filter(
                (o) => o !== "-- Semua Metode Pembayaran --"
              )}
            />
          </FormFieldRow>

          {/* Row 4: Channel */}
          <FormFieldRow id="channel-select" label="Channel">
            <FormSelect
              id="channel-select"
              value={channel}
              onChange={setChannel}
              placeholder="-- Pilih Semua Channel --"
              options={channelPembayaranOptions.filter(
                (o) => o !== "-- Pilih Channel --"
              )}
            />
          </FormFieldRow>

          {/* Row 5: Tanggal (Inline s.d.) */}
          <FormFieldRow id="tgl-awal-input" label="Tanggal">
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

          {/* Row 6: Periode Masuk */}
          <FormFieldRow id="periode-masuk-select" label="Periode Masuk">
            <FormSelect
              id="periode-masuk-select"
              value={periodeMasuk}
              onChange={setPeriodeMasuk}
              placeholder="-- Pilih Semua Periode Masuk --"
              options={academicPeriods}
            />
          </FormFieldRow>

          {/* Row 7: Jalur Pendaftaran */}
          <FormFieldRow id="jalur-pendaftaran-select" label="Jalur Pendaftaran">
            <FormSelect
              id="jalur-pendaftaran-select"
              value={jalurPendaftaran}
              onChange={setJalurPendaftaran}
              placeholder="-- Pilih Semua Jalur Pendaftaran --"
              options={jalurPendaftaranOptions.filter(
                (o) => o !== "-- Semua Jalur Pendaftaran --"
              )}
            />
          </FormFieldRow>

          {/* Row 8: Gelombang */}
          <FormFieldRow id="gelombang-select" label="Gelombang">
            <FormSelect
              id="gelombang-select"
              value={gelombang}
              onChange={setGelombang}
              placeholder="-- Pilih Semua Gelombang --"
              options={gelombangOptions.filter(
                (o) => o !== "-- Semua Gelombang --"
              )}
            />
          </FormFieldRow>

          {/* Row 9: Sistem Kuliah */}
          <FormFieldRow id="sistem-kuliah-select" label="Sistem Kuliah">
            <FormSelect
              id="sistem-kuliah-select"
              value={sistemKuliah}
              onChange={setSistemKuliah}
              placeholder="-- Pilih Semua Sistem Kuliah --"
              options={sistemKuliahOptions.filter(
                (o) => o !== "-- Semua Sistem Kuliah --"
              )}
            />
          </FormFieldRow>

          {/* Row 10: Penerima */}
          <FormFieldRow id="penerima-select" label="Penerima">
            <FormSelect
              id="penerima-select"
              value={penerima}
              onChange={setPenerima}
              placeholder="-- Pilih Semua Penerima --"
              options={penerimaPembayaranOptions.filter(
                (o) => o !== "-- Pilih Penerima --"
              )}
            />
          </FormFieldRow>

          {/* Row 11: Format */}
          <FormFieldRow id="format-select" label="Format">
            <FormSelect
              id="format-select"
              value={selectedFormat}
              onChange={setSelectedFormat}
              options={formatOptions}
            />
          </FormFieldRow>

          {/* Row 12: KOP */}
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
        <LaporanRekapPembayaranPreview
          useKop={useKop}
          periodePembayaran={periodePembayaran}
          prodi={prodi}
          metodePembayaran={metodePembayaran}
          channel={channel}
          penerima={penerima}
          selectedFormat={selectedFormat}
          data={getMockRekapData()}
          formatRupiah={formatRupiah}
          onLihatTabBaru={handleLihatTabBaru}
          onCetakFormat={handleLihatTabBaru}
        />
      )}
    </div>
  );
}

import React, { useState, useRef } from "react";
import {
  IoEye,
  IoOpenOutline,
  IoInformationCircleOutline,
} from "react-icons/io5";
import {
  academicPeriods,
  metodePembayaranOptions,
  channelPembayaranOptions,
  penerimaPembayaranOptions,
  statusPembatalanOptions,
  jalurPendaftaranOptions,
  gelombangOptions,
  sistemKuliahOptions,
  kelasKuliahPembayaranOptions,
  formatOptions,
} from "../constants/laporanPembayaranData";
import { FormFieldRow } from "../../tagihan/components/FormFieldRow";
import { FormDatePicker } from "../../tagihan/components/FormDatePicker";
import { FormSelect } from "../../tagihan/components/FormSelect";
import { PeriodeAkademikSelect, type PeriodeAkademikSelectRef } from "../../tagihan/components/PeriodeAkademikSelect";
import { CollapsibleSection } from "../../tagihan/components/CollapsibleSection";
import { ValidationModal } from "../../tagihan/components/ValidationModal";
import { LaporanPembayaranPreview } from "../components/LaporanPembayaranPreview";
import {
  generateLaporanPembayaranHtml,
  type PembayaranRowData,
} from "../utils/generateLaporanPembayaranHtml";
import {
  exportPembayaranToPdf,
  exportPembayaranToExcel,
} from "../utils/exportLaporanPembayaran";

export default function LaporanPembayaranPage() {
  document.title = "Laporan Pembayaran - Sistem Informasi Keuangan UIKA";

  // Form State
  const [selectedPeriods, setSelectedPeriods] = useState<string[]>([]);
  const [metodePembayaran, setMetodePembayaran] = useState("");
  const [channel, setChannel] = useState("");
  const [tglAwal, setTglAwal] = useState("");
  const [tglAkhir, setTglAkhir] = useState("");
  const [penerima, setPenerima] = useState("");

  // Detail Penerima Toggle & Fields
  const [isDetailPenerimaOpen, setIsDetailPenerimaOpen] = useState(false);
  const [periodeMasuk, setPeriodeMasuk] = useState("");
  const [jalurPendaftaran, setJalurPendaftaran] = useState("");
  const [gelombang, setGelombang] = useState("");
  const [sistemKuliah, setSistemKuliah] = useState("");
  const [kelasKuliah, setKelasKuliah] = useState("Semua Kelas Perkuliahan");
  const [searchPegawai, setSearchPegawai] = useState("");

  // State Output
  const [statusPembatalan, setStatusPembatalan] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("HTML");
  const [useKop, setUseKop] = useState(true);

  // Validation State
  const [hasValidationError, setHasValidationError] = useState(false);
  const [showValidationModal, setShowValidationModal] = useState(false);

  // Preview State
  const [showPreview, setShowPreview] = useState(false);

  // Ref untuk accessibility fokus label Periode
  const periodeSelectRef = useRef<PeriodeAkademikSelectRef>(null);

  // Multi-select Periode handler (maksimal 2 periode)
  const handleTogglePeriod = (period: string) => {
    setHasValidationError(false);
    if (selectedPeriods.includes(period)) {
      setSelectedPeriods(selectedPeriods.filter((p) => p !== period));
    } else {
      if (selectedPeriods.length >= 2) {
        setSelectedPeriods([selectedPeriods[1], period]);
      } else {
        setSelectedPeriods([...selectedPeriods, period]);
      }
    }
  };

  const handleRemovePeriod = (period: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedPeriods(selectedPeriods.filter((p) => p !== period));
  };

  // Validasi isian wajib (Periode Pembayaran)
  const validateForm = (): boolean => {
    if (selectedPeriods.length === 0) {
      setHasValidationError(true);
      setShowValidationModal(true);
      return false;
    }
    return true;
  };

  // Format currency helper
  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(num);
  };

  // Mock data transaksi pembayaran realistis
  const getMockPembayaranData = (): PembayaranRowData[] => {
    const rawData: PembayaranRowData[] = [
      {
        no: 1,
        kodePembayaran: "PAY-20261-00821",
        tanggalBayar: "12-10-2026",
        nim: "231106040901",
        nama: "Ahmad Fauzi",
        prodi: "S1 - Teknik Informatika",
        periode: selectedPeriods[0] || "2026 Ganjil",
        metodePembayaran: "Virtual Account",
        channel: "Bank BSI",
        nominal: 4750000,
        status: "Sukses",
      },
      {
        no: 2,
        kodePembayaran: "PAY-20261-00822",
        tanggalBayar: "12-10-2026",
        nim: "231106040902",
        nama: "Siti Rahmawati",
        prodi: "S1 - Manajemen",
        periode: selectedPeriods[0] || "2026 Ganjil",
        metodePembayaran: "SevimaPay",
        channel: "Bank BNI",
        nominal: 3500000,
        status: "Sukses",
      },
      {
        no: 3,
        kodePembayaran: "PAY-20261-00823",
        tanggalBayar: "13-10-2026",
        nim: "231106040903",
        nama: "Budi Santoso",
        prodi: "S1 - Ilmu Hukum",
        periode: selectedPeriods[0] || "2026 Ganjil",
        metodePembayaran: "Virtual Account",
        channel: "Bank Mandiri",
        nominal: 5200000,
        status: "Sukses",
      },
      {
        no: 4,
        kodePembayaran: "PAY-20261-00824",
        tanggalBayar: "13-10-2026",
        nim: "231106040904",
        nama: "Dewi Lestari",
        prodi: "S1 - Akuntansi",
        periode: selectedPeriods[1] || selectedPeriods[0] || "2026 Ganjil",
        metodePembayaran: "Transfer Bank",
        channel: "Bank Muamalat",
        nominal: 3500000,
        status: "Sukses",
      },
      {
        no: 5,
        kodePembayaran: "PAY-20261-00825",
        tanggalBayar: "14-10-2026",
        nim: "231106040905",
        nama: "Eko Prasetyo",
        prodi: "S1 - Teknik Elektro",
        periode: selectedPeriods[0] || "2026 Ganjil",
        metodePembayaran: "QRIS",
        channel: "Shopee",
        nominal: 1250000,
        status: "Sukses",
      },
      {
        no: 6,
        kodePembayaran: "PAY-20261-00826",
        tanggalBayar: "14-10-2026",
        nim: "231106040906",
        nama: "Fitri Handayani",
        prodi: "S1 - Pendidikan Agama Islam",
        periode: selectedPeriods[0] || "2026 Ganjil",
        metodePembayaran: "Cash / Teller",
        channel: "Teller Kampus",
        nominal: 2800000,
        status: "Batal",
      },
      {
        no: 7,
        kodePembayaran: "PAY-20261-00827",
        tanggalBayar: "15-10-2026",
        nim: "231106040907",
        nama: "Gilang Ramadhan",
        prodi: "S1 - Sistem Informasi",
        periode: selectedPeriods[1] || selectedPeriods[0] || "2026 Ganjil",
        metodePembayaran: "Virtual Account",
        channel: "Bank BRI",
        nominal: 4750000,
        status: "Sukses",
      },
      {
        no: 8,
        kodePembayaran: "PAY-20261-00828",
        tanggalBayar: "15-10-2026",
        nim: "231106040908",
        nama: "Haniifah Nurul",
        prodi: "S1 - Pendidikan Bahasa Inggris",
        periode: selectedPeriods[0] || "2026 Ganjil",
        metodePembayaran: "SevimaPay",
        channel: "Tokopedia",
        nominal: 3100000,
        status: "Sukses",
      },
      {
        no: 9,
        kodePembayaran: "PAY-20261-00829",
        tanggalBayar: "16-10-2026",
        nim: "231106040909",
        nama: "Ilham Syahputra",
        prodi: "S1 - Teknik Mesin",
        periode: selectedPeriods[0] || "2026 Ganjil",
        metodePembayaran: "Virtual Account",
        channel: "Bank BSI",
        nominal: 4500000,
        status: "Sukses",
      },
      {
        no: 10,
        kodePembayaran: "PAY-20261-00830",
        tanggalBayar: "16-10-2026",
        nim: "231106040910",
        nama: "Jasmine Khairunnisa",
        prodi: "S1 - Kesehatan Masyarakat",
        periode: selectedPeriods[0] || "2026 Ganjil",
        metodePembayaran: "Transfer Bank",
        channel: "Bank BNI",
        nominal: 4200000,
        status: "Sukses",
      },
    ];

    // Filter berdasarkan opsi aktif jika dipilih
    return rawData.filter((item) => {
      if (
        metodePembayaran &&
        metodePembayaran !== "-- Semua Metode Pembayaran --" &&
        item.metodePembayaran !== metodePembayaran
      ) {
        return false;
      }
      if (
        channel &&
        channel !== "-- Pilih Channel --" &&
        channel !== "Semua Channel" &&
        item.channel !== channel
      ) {
        return false;
      }
      if (statusPembatalan === "Batal" && item.status !== "Batal") {
        return false;
      }
      if (
        statusPembatalan === "Tidak Batal (Aktif)" &&
        item.status === "Batal"
      ) {
        return false;
      }
      return true;
    });
  };

  // Handler Tampilkan Preview
  const handleTampilkan = () => {
    if (!validateForm()) return;
    setShowPreview(true);
    setTimeout(() => {
      document.getElementById("pembayaran-preview-section")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };

  // Handler Lihat di Tab Baru & Auto Download
  const handleLihatTabBaru = async () => {
    if (!validateForm()) return;

    const data = getMockPembayaranData();
    const formattedMetode =
      metodePembayaran === "-- Semua Metode Pembayaran --"
        ? ""
        : metodePembayaran;
    const formattedChannel =
      channel === "-- Pilih Channel --" ? "" : channel;
    const formattedPenerima =
      penerima === "-- Pilih Penerima --" ? "" : penerima;
    const formattedStatus =
      statusPembatalan === "-- Pilih Status Pembatalan --"
        ? ""
        : statusPembatalan;

    if (selectedFormat === "PDF") {
      await exportPembayaranToPdf({
        useKop,
        selectedPeriods,
        metodePembayaran: formattedMetode,
        channel: formattedChannel,
        tglAwal,
        tglAkhir,
        penerima: formattedPenerima,
        statusPembatalan: formattedStatus,
        pembayaranData: data,
        formatRupiah,
      });
      return;
    }

    if (selectedFormat === "EXCEL") {
      exportPembayaranToExcel({
        useKop,
        selectedPeriods,
        metodePembayaran: formattedMetode,
        channel: formattedChannel,
        tglAwal,
        tglAkhir,
        penerima: formattedPenerima,
        statusPembatalan: formattedStatus,
        pembayaranData: data,
      });
      return;
    }

    // Default HTML: Buka di tab baru
    const reportHtml = generateLaporanPembayaranHtml({
      useKop,
      selectedPeriods,
      metodePembayaran: formattedMetode,
      channel: formattedChannel,
      tglAwal,
      tglAkhir,
      penerima: formattedPenerima,
      statusPembatalan: formattedStatus,
      pembayaranData: data,
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
          Laporan Pembayaran
        </h1>
      </div>

      {/* Main Filter Card */}
      <div className="bg-white rounded shadow-md border-t-4 border-t-emerald-600 p-5 sm:p-6 mb-8">
        <div className="space-y-4">
          {/* Row 1: Periode Pembayaran* (Required) */}
          <FormFieldRow
            id="periode-pembayaran-input"
            label="Periode Pembayaran"
            required
            onLabelClick={() => periodeSelectRef.current?.openDropdown()}
          >
            <PeriodeAkademikSelect
              ref={periodeSelectRef}
              id="periode-pembayaran-input"
              periods={academicPeriods}
              selectedPeriods={selectedPeriods}
              onTogglePeriod={handleTogglePeriod}
              onRemovePeriod={handleRemovePeriod}
              hasError={hasValidationError && selectedPeriods.length === 0}
            />
          </FormFieldRow>

          {/* Row 2: Metode Pembayaran */}
          <FormFieldRow id="metode-pembayaran-select" label="Metode Pembayaran">
            <FormSelect
              id="metode-pembayaran-select"
              value={metodePembayaran}
              onChange={setMetodePembayaran}
              options={metodePembayaranOptions}
            />
          </FormFieldRow>

          {/* Row 3: Channel */}
          <FormFieldRow id="channel-select" label="Channel">
            <FormSelect
              id="channel-select"
              value={channel}
              onChange={setChannel}
              options={channelPembayaranOptions}
            />
          </FormFieldRow>

          {/* Row 4: Dari Tgl. */}
          <FormFieldRow id="dari-tgl-input" label="Dari Tgl.">
            <FormDatePicker
              id="dari-tgl-input"
              value={tglAwal}
              onChange={setTglAwal}
            />
          </FormFieldRow>

          {/* Row 5: Sampai Tgl. */}
          <FormFieldRow id="sampai-tgl-input" label="Sampai Tgl.">
            <FormDatePicker
              id="sampai-tgl-input"
              value={tglAkhir}
              onChange={setTglAkhir}
            />
          </FormFieldRow>

          {/* Row 6: Penerima */}
          <FormFieldRow id="penerima-select" label="Penerima">
            <FormSelect
              id="penerima-select"
              value={penerima}
              onChange={setPenerima}
              options={penerimaPembayaranOptions}
            />
          </FormFieldRow>

          {/* Row 7: Detail Penerima (Collapsible Section) */}
          <CollapsibleSection
            id="detail-penerima-toggle"
            title="Detail Penerima"
            isOpen={isDetailPenerimaOpen}
            onToggle={() => setIsDetailPenerimaOpen(!isDetailPenerimaOpen)}
          >
            <FormFieldRow id="periode-masuk-select" label="Periode Masuk">
              <FormSelect
                id="periode-masuk-select"
                value={periodeMasuk}
                onChange={setPeriodeMasuk}
                placeholder="-- Pilih Periode Masuk --"
                options={academicPeriods}
              />
            </FormFieldRow>

            <FormFieldRow
              id="jalur-pendaftaran-select"
              label="Jalur Pendaftaran"
            >
              <FormSelect
                id="jalur-pendaftaran-select"
                value={jalurPendaftaran}
                onChange={setJalurPendaftaran}
                options={jalurPendaftaranOptions}
              />
            </FormFieldRow>

            <FormFieldRow id="gelombang-select" label="Gelombang">
              <FormSelect
                id="gelombang-select"
                value={gelombang}
                onChange={setGelombang}
                options={gelombangOptions}
              />
            </FormFieldRow>

            <FormFieldRow id="sistem-kuliah-select" label="Sistem Kuliah">
              <FormSelect
                id="sistem-kuliah-select"
                value={sistemKuliah}
                onChange={setSistemKuliah}
                options={sistemKuliahOptions}
              />
            </FormFieldRow>

            <FormFieldRow id="kelas-kuliah-select" label="Kelas Kuliah">
              <FormSelect
                id="kelas-kuliah-select"
                value={kelasKuliah}
                onChange={setKelasKuliah}
                options={kelasKuliahPembayaranOptions}
              />
            </FormFieldRow>

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
          </CollapsibleSection>

          {/* Row 8: Status Pembatalan */}
          <FormFieldRow
            id="status-pembatalan-select"
            label="Status Pembatalan"
          >
            <FormSelect
              id="status-pembatalan-select"
              value={statusPembatalan}
              onChange={setStatusPembatalan}
              options={statusPembatalanOptions}
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

      {/* Validation Information Modal */}
      <ValidationModal
        isOpen={showValidationModal}
        onClose={() => setShowValidationModal(false)}
      />

      {/* Preview Section */}
      {showPreview && (
        <LaporanPembayaranPreview
          useKop={useKop}
          periodePembayaran={selectedPeriods}
          metodePembayaran={metodePembayaran}
          channel={channel}
          penerima={penerima}
          selectedFormat={selectedFormat}
          data={getMockPembayaranData()}
          formatRupiah={formatRupiah}
          onLihatTabBaru={handleLihatTabBaru}
          onCetakFormat={handleLihatTabBaru}
        />
      )}
    </div>
  );
}

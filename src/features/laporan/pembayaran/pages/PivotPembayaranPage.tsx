import React, { useState } from "react";
import { IoEye, IoOpenOutline } from "react-icons/io5";
import {
  metodePembayaranOptions,
  kolomPivotPembayaranOptions,
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
import { ValidationModal } from "../../tagihan/components/ValidationModal";
import { PivotPembayaranPreview } from "../components/PivotPembayaranPreview";
import {
  generatePivotPembayaranHtml,
  type PivotPembayaranRowData,
} from "../utils/generatePembayaranAkhirHtml";
import {
  exportPivotPembayaranToPdf,
  exportPivotPembayaranToExcel,
} from "../utils/exportPembayaranAkhir";

export default function PivotPembayaranPage() {
  document.title =
    "Laporan Pivot Pembayaran - Sistem Informasi Keuangan UIKA";

  // Form State (Default values matching Image 2)
  const [unitKerja, setUnitKerja] = useState("Universitas Ibn Khaldun");
  const [metodePembayaran, setMetodePembayaran] = useState("");
  const [tglAwal, setTglAwal] = useState("01-10-2026");
  const [tglAkhir, setTglAkhir] = useState("21-10-2026");
  const [kolomPivot, setKolomPivot] = useState("");
  const [angkatan, setAngkatan] = useState("");
  const [jalurPendaftaran, setJalurPendaftaran] = useState("");
  const [gelombang, setGelombang] = useState("");
  const [sistemKuliah, setSistemKuliah] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("HTML");
  const [useKop, setUseKop] = useState(true);

  // Validation State
  const [hasValidationError, setHasValidationError] = useState(false);
  const [showValidationModal, setShowValidationModal] = useState(false);

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

  const validateForm = (): boolean => {
    const isPivotValid =
      kolomPivot.trim() !== "" && kolomPivot !== "-- Pilih Kolom Pivot --";

    if (!isPivotValid) {
      setHasValidationError(true);
      setShowValidationModal(true);
      return false;
    }
    return true;
  };

  // Mock data pivot pembayaran (3 kolom sesuai Gambar 4)
  const getMockData = (): PivotPembayaranRowData[] => {
    return [
      {
        no: 1,
        namaMahasiswa: "Ahmad Dahlan",
        totalNominal: 8500000,
      },
      {
        no: 2,
        namaMahasiswa: "Siti Nurhaliza",
        totalNominal: 6250000,
      },
      {
        no: 3,
        namaMahasiswa: "Muhammad Rizky Pratama",
        totalNominal: 7800000,
      },
      {
        no: 4,
        namaMahasiswa: "Dewi Lestari",
        totalNominal: 5400000,
      },
      {
        no: 5,
        namaMahasiswa: "Budi Santoso",
        totalNominal: 9100000,
      },
      {
        no: 6,
        namaMahasiswa: "Nurul Hidayah",
        totalNominal: 6750000,
      },
      {
        no: 7,
        namaMahasiswa: "Fajar Maulana",
        totalNominal: 8200000,
      },
      {
        no: 8,
        namaMahasiswa: "Anisa Rahmawati",
        totalNominal: 5900000,
      },
    ];
  };

  const handleTampilkan = () => {
    if (!validateForm()) return;
    setShowPreview(true);
    setTimeout(() => {
      document
        .getElementById("pivot-pembayaran-preview-section")
        ?.scrollIntoView({
          behavior: "smooth",
        });
    }, 100);
  };

  const handleLihatTabBaru = async () => {
    if (!validateForm()) return;
    const data = getMockData();

    if (selectedFormat === "PDF") {
      await exportPivotPembayaranToPdf({
        useKop,
        unitKerja,
        kolomPivot,
        data,
        formatRupiah,
      });
      return;
    }

    if (selectedFormat === "EXCEL") {
      exportPivotPembayaranToExcel({
        useKop,
        unitKerja,
        kolomPivot,
        data,
      });
      return;
    }

    const reportHtml = generatePivotPembayaranHtml({
      useKop,
      unitKerja,
      metodePembayaran,
      tglAwal,
      tglAkhir,
      kolomPivot,
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
          Laporan Pivot Pembayaran
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

          {/* Row 5: Kolom Pivot* (Required) */}
          <FormFieldRow id="kolom-pivot-select" label="Kolom Pivot" required>
            <FormSelect
              id="kolom-pivot-select"
              value={kolomPivot}
              onChange={(val) => {
                setKolomPivot(val);
                setHasValidationError(false);
              }}
              placeholder="-- Pilih Kolom Pivot --"
              options={kolomPivotPembayaranOptions.filter(
                (o) => o !== "-- Pilih Kolom Pivot --"
              )}
            />
          </FormFieldRow>

          {/* Row 6: Angkatan */}
          <FormFieldRow id="angkatan-select" label="Angkatan">
            <FormSelect
              id="angkatan-select"
              value={angkatan}
              onChange={setAngkatan}
              placeholder="-- Pilih Angkatan --"
              options={angkatanOptions.filter((o) => o !== "-- Pilih Angkatan --")}
            />
          </FormFieldRow>

          {/* Row 7: Jalur Pendaftaran */}
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

          {/* Row 8: Gelombang */}
          <FormFieldRow id="gelombang-select" label="Gelombang">
            <FormSelect
              id="gelombang-select"
              value={gelombang}
              onChange={setGelombang}
              placeholder="-- Pilih Gelombang --"
              options={gelombangOptions.filter((o) => o !== "-- Semua Gelombang --")}
            />
          </FormFieldRow>

          {/* Row 9: Sistem Kuliah */}
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

      {/* Validation Information Modal */}
      <ValidationModal
        isOpen={showValidationModal}
        onClose={() => setShowValidationModal(false)}
      />

      {/* Preview Section */}
      {showPreview && (
        <PivotPembayaranPreview
          useKop={useKop}
          unitKerja={unitKerja}
          kolomPivot={kolomPivot || "Program Studi"}
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

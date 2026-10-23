import React, { useState, useRef } from "react";
import {
  IoEye,
  IoOpenOutline,
  IoInformationCircleOutline,
} from "react-icons/io5";
import {
  academicPeriods,
  programStudiGroups,
  jenisTagihanRekapOptions,
  penerimaOptions,
  formatOptions,
  kolomPivotOptions,
} from "../constants/laporanTagihanData";
import { FormFieldRow } from "../components/FormFieldRow";
import { FormDatePicker } from "../components/FormDatePicker";
import { FormSelect } from "../components/FormSelect";
import {
  PeriodeAkademikSelect,
  type PeriodeAkademikSelectRef,
} from "../components/PeriodeAkademikSelect";
import { ValidationModal } from "../components/ValidationModal";
import { LaporanPivotPreview } from "../components/LaporanPivotPreview";
import {
  generateLaporanPivotHtml,
  type PivotRowData,
} from "../utils/generateLaporanPivotHtml";
import {
  exportPivotToPdf,
  exportPivotToExcel,
} from "../utils/exportLaporan";

export default function LaporanPivotTagihanPage() {
  document.title = "Laporan Pivot Tagihan - Sistem Informasi Keuangan UIKA";

  // Form State
  const [selectedPeriods, setSelectedPeriods] = useState<string[]>([]);
  const [unitKerja, setUnitKerja] = useState("Universitas Ibn Khaldun");
  const [selectedJenisTagihan, setSelectedJenisTagihan] = useState(
    "-- Pilih Jenis tagihan --",
  );
  const [tglCutOff, setTglCutOff] = useState("");
  const [selectedPenerima, setSelectedPenerima] = useState(
    "-- Pilih Penerima --",
  );
  const [kolomPivot, setKolomPivot] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("HTML");
  const [useKop, setUseKop] = useState(true);

  // Validation & Modal State
  const [hasValidationError, setHasValidationError] = useState(false);
  const [showValidationModal, setShowValidationModal] = useState(false);

  // Preview State
  const [showPreview, setShowPreview] = useState(false);

  // Ref untuk accessibility fokus label Periode Tagihan
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

  // Validasi isian wajib (yang bergaris merah / bertanda bintang)
  const validateForm = (): boolean => {
    const isPeriodValid = selectedPeriods.length > 0;
    const isPivotValid =
      kolomPivot.trim() !== "" && kolomPivot !== "-- Pilih Kolom Pivot --";

    if (!isPeriodValid || !isPivotValid) {
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

  // Mock data pivot tagihan (9 kolom sesuai Gambar 3)
  const getMockPivotData = (): PivotRowData[] => {
    return [
      {
        no: 1,
        namaMahasiswa: "ZIYAD RAIS",
        jumlahTagihan: 2,
        nominalTagihan: 4500000,
        denda: 0,
        potongan: 0,
        totalTagihan: 4500000,
        nominalBayar: 4500000,
        sisaTagihan: 0,
      },
      {
        no: 2,
        namaMahasiswa: "ANNISA AGUSTIN",
        jumlahTagihan: 1,
        nominalTagihan: 3200000,
        denda: 25000,
        potongan: 500000,
        totalTagihan: 2725000,
        nominalBayar: 2225000,
        sisaTagihan: 500000,
      },
      {
        no: 3,
        namaMahasiswa: "MUHAMMAD JABAR",
        jumlahTagihan: 3,
        nominalTagihan: 2500000,
        denda: 50000,
        potongan: 0,
        totalTagihan: 2550000,
        nominalBayar: 1050000,
        sisaTagihan: 1500000,
      },
      {
        no: 4,
        namaMahasiswa: "AHID MUHAMMAD RIDWAN",
        jumlahTagihan: 1,
        nominalTagihan: 5000000,
        denda: 100000,
        potongan: 0,
        totalTagihan: 5100000,
        nominalBayar: 100000,
        sisaTagihan: 5000000,
      },
      {
        no: 5,
        namaMahasiswa: "FATHUR RAHMAN",
        jumlahTagihan: 1,
        nominalTagihan: 750000,
        denda: 0,
        potongan: 0,
        totalTagihan: 750000,
        nominalBayar: 0,
        sisaTagihan: 750000,
      },
    ];
  };

  // Handler Tampilkan Preview
  const handleTampilkan = () => {
    if (!validateForm()) return;
    setShowPreview(true);
    setTimeout(() => {
      document.getElementById("pivot-preview-section")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };

  // Handler Lihat di Tab Baru & Auto Download sesuai format
  const handleLihatTabBaru = async () => {
    if (!validateForm()) return;

    const formattedJenis =
      selectedJenisTagihan === "-- Pilih Jenis tagihan --"
        ? ""
        : selectedJenisTagihan;
    const formattedPenerima =
      selectedPenerima === "-- Pilih Penerima --" ? "" : selectedPenerima;

    if (selectedFormat === "PDF") {
      await exportPivotToPdf({
        useKop,
        periodeTagihan: selectedPeriods,
        unitKerja,
        jenisTagihan: formattedJenis,
        tglCutOff,
        penerima: formattedPenerima,
        kolomPivot: kolomPivot || "Program Studi",
        pivotData: getMockPivotData(),
        formatRupiah,
      });
      return;
    }

    if (selectedFormat === "EXCEL") {
      exportPivotToExcel({
        useKop,
        periodeTagihan: selectedPeriods,
        unitKerja,
        jenisTagihan: formattedJenis,
        tglCutOff,
        penerima: formattedPenerima,
        kolomPivot: kolomPivot || "Program Studi",
        pivotData: getMockPivotData(),
      });
      return;
    }

    // Default HTML: Buka di tab baru
    const reportHtml = generateLaporanPivotHtml({
      useKop,
      periodeTagihan: selectedPeriods,
      unitKerja,
      jenisTagihan: formattedJenis,
      tglCutOff,
      penerima: formattedPenerima,
      kolomPivot,
      pivotData: getMockPivotData(),
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
          Laporan Pivot Tagihan
        </h1>
      </div>

      {/* Main Filter Card */}
      <div className="bg-white rounded shadow-md border-t-4 border-t-emerald-600 p-5 sm:p-6 mb-8">
        <div className="space-y-4">
          {/* Row 1: Periode Tagihan* (Required) */}
          <FormFieldRow
            id="periode-tagihan-input"
            label="Periode Tagihan"
            required
            onLabelClick={() => periodeSelectRef.current?.openDropdown()}
          >
            <PeriodeAkademikSelect
              ref={periodeSelectRef}
              id="periode-tagihan-input"
              periods={academicPeriods}
              selectedPeriods={selectedPeriods}
              onTogglePeriod={handleTogglePeriod}
              onRemovePeriod={handleRemovePeriod}
              hasError={hasValidationError && selectedPeriods.length === 0}
            />
          </FormFieldRow>

          {/* Row 2: Unit Kerja */}
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

          {/* Row 3: Jenis tagihan */}
          <FormFieldRow id="jenis-tagihan-select" label="Jenis tagihan">
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
            <p className="text-blue-600 text-xs mt-1.5 flex items-center gap-1 font-normal">
              <IoInformationCircleOutline className="text-sm shrink-0" />
              <span>Kosongkan untuk status pembayaran real-time (terkini)</span>
            </p>
          </FormFieldRow>

          {/* Row 5: Penerima */}
          <FormFieldRow id="penerima-select" label="Penerima">
            <FormSelect
              id="penerima-select"
              value={selectedPenerima}
              onChange={setSelectedPenerima}
              options={["-- Pilih Penerima --", ...penerimaOptions]}
            />
          </FormFieldRow>

          {/* Row 6: Kolom Pivot* (Required) */}
          <FormFieldRow id="kolom-pivot-select" label="Kolom Pivot" required>
            <select
              id="kolom-pivot-select"
              value={kolomPivot}
              onChange={(e) => {
                setKolomPivot(e.target.value);
                setHasValidationError(false);
              }}
              className={`w-full px-3 py-2 border rounded bg-white text-sm text-gray-800 focus:outline-none cursor-pointer transition-colors ${
                hasValidationError &&
                (!kolomPivot || kolomPivot === "-- Pilih Kolom Pivot --")
                  ? "border-red-500 ring-1 ring-red-500"
                  : "border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              }`}
            >
              {kolomPivotOptions.map((opt) => (
                <option key={opt} value={opt === "-- Pilih Kolom Pivot --" ? "" : opt}>
                  {opt}
                </option>
              ))}
            </select>
          </FormFieldRow>

          {/* Row 7: Format */}
          <FormFieldRow id="format-select" label="Format">
            <FormSelect
              id="format-select"
              value={selectedFormat}
              onChange={setSelectedFormat}
              options={formatOptions}
            />
          </FormFieldRow>

          {/* Row 8: KOP */}
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

      {/* Validation Information Modal (Muncul saat Periode Tagihan atau Kolom Pivot belum diisi) */}
      <ValidationModal
        isOpen={showValidationModal}
        onClose={() => setShowValidationModal(false)}
      />

      {/* Preview Section */}
      {showPreview && (
        <LaporanPivotPreview
          useKop={useKop}
          periodeTagihan={selectedPeriods}
          unitKerja={unitKerja}
          selectedFormat={selectedFormat}
          kolomPivot={kolomPivot || "Program Studi"}
          pivotData={getMockPivotData()}
          formatRupiah={formatRupiah}
          onLihatTabBaru={handleLihatTabBaru}
          onCetakFormat={handleLihatTabBaru}
        />
      )}
    </div>
  );
}

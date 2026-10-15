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

  // Mock data pivot tagihan berdasarkan kolom pivot terpilih
  const getMockPivotData = (): PivotRowData[] => {
    const activeDimension = kolomPivot || "Program Studi";

    if (activeDimension === "Angkatan") {
      return [
        {
          no: 1,
          pivotKey: "2026",
          belumBayar: 1200000000,
          belumLunas: 450000000,
          lunas: 3800000000,
          dispensasi: 150000000,
          totalTagihan: 5600000000,
          totalTerbayar: 3950000000,
          sisaPiutang: 1650000000,
          persentaseTerbayar: 70.5,
        },
        {
          no: 2,
          pivotKey: "2025",
          belumBayar: 850000000,
          belumLunas: 320000000,
          lunas: 4100000000,
          dispensasi: 100000000,
          totalTagihan: 5370000000,
          totalTerbayar: 4200000000,
          sisaPiutang: 1170000000,
          persentaseTerbayar: 78.2,
        },
        {
          no: 3,
          pivotKey: "2024",
          belumBayar: 620000000,
          belumLunas: 210000000,
          lunas: 4500000000,
          dispensasi: 80000000,
          totalTagihan: 5410000000,
          totalTerbayar: 4580000000,
          sisaPiutang: 830000000,
          persentaseTerbayar: 84.7,
        },
        {
          no: 4,
          pivotKey: "2023",
          belumBayar: 410000000,
          belumLunas: 150000000,
          lunas: 4800000000,
          dispensasi: 50000000,
          totalTagihan: 5410000000,
          totalTerbayar: 4850000000,
          sisaPiutang: 560000000,
          persentaseTerbayar: 89.6,
        },
      ];
    }

    // Default Program Studi
    return [
      {
        no: 1,
        pivotKey: "S1 - Teknik Informatika",
        belumBayar: 350000000,
        belumLunas: 180000000,
        lunas: 1850000000,
        dispensasi: 45000000,
        totalTagihan: 2425000000,
        totalTerbayar: 1895000000,
        sisaPiutang: 530000000,
        persentaseTerbayar: 78.1,
      },
      {
        no: 2,
        pivotKey: "S1 - Sistem Informasi",
        belumBayar: 280000000,
        belumLunas: 140000000,
        lunas: 1350000000,
        dispensasi: 30000000,
        totalTagihan: 1800000000,
        totalTerbayar: 1380000000,
        sisaPiutang: 420000000,
        persentaseTerbayar: 76.7,
      },
      {
        no: 3,
        pivotKey: "S1 - Manajemen",
        belumBayar: 450000000,
        belumLunas: 220000000,
        lunas: 2400000000,
        dispensasi: 60000000,
        totalTagihan: 3130000000,
        totalTerbayar: 2460000000,
        sisaPiutang: 670000000,
        persentaseTerbayar: 78.6,
      },
      {
        no: 4,
        pivotKey: "S1 - Akuntansi",
        belumBayar: 210000000,
        belumLunas: 110000000,
        lunas: 1150000000,
        dispensasi: 25000000,
        totalTagihan: 1495000000,
        totalTerbayar: 1175000000,
        sisaPiutang: 320000000,
        persentaseTerbayar: 78.6,
      },
      {
        no: 5,
        pivotKey: "S1 - Ilmu Hukum",
        belumBayar: 320000000,
        belumLunas: 160000000,
        lunas: 1650000000,
        dispensasi: 40000000,
        totalTagihan: 2170000000,
        totalTerbayar: 1690000000,
        sisaPiutang: 480000000,
        persentaseTerbayar: 77.9,
      },
      {
        no: 6,
        pivotKey: "S1 - Pendidikan Agama Islam",
        belumBayar: 390000000,
        belumLunas: 190000000,
        lunas: 1950000000,
        dispensasi: 50000000,
        totalTagihan: 2580000000,
        totalTerbayar: 2000000000,
        sisaPiutang: 580000000,
        persentaseTerbayar: 77.5,
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

  // Handler Lihat di Tab Baru
  const handleLihatTabBaru = () => {
    if (!validateForm()) return;

    const reportHtml = generateLaporanPivotHtml({
      useKop,
      periodeTagihan: selectedPeriods,
      unitKerja,
      jenisTagihan:
        selectedJenisTagihan === "-- Pilih Jenis tagihan --"
          ? ""
          : selectedJenisTagihan,
      tglCutOff,
      penerima:
        selectedPenerima === "-- Pilih Penerima --" ? "" : selectedPenerima,
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
          periodeTagihan={selectedPeriods}
          unitKerja={unitKerja}
          selectedFormat={selectedFormat}
          kolomPivot={kolomPivot || "Program Studi"}
          pivotData={getMockPivotData()}
          formatRupiah={formatRupiah}
          onLihatTabBaru={handleLihatTabBaru}
        />
      )}
    </div>
  );
}

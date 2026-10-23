import React, { useState, useRef } from "react";
import { IoEye, IoOpenOutline } from "react-icons/io5";
import {
  academicPeriods,
  programStudiGroups,
  jenisTagihanOptions,
  statusOptions,
  penerimaOptions,
  formatOptions,
  bulanAwalOptions,
  bulanAkhirOptions,
  tahunOptions,
  cicilanOptions,
  kelasKuliahOptions,
  jalurPendaftaranOptions,
  gelombangOptions,
  sistemKuliahOptions,
} from "../constants/laporanTagihanData";
import { FormFieldRow } from "../components/FormFieldRow";
import { FormDatePicker } from "../components/FormDatePicker";
import { FormSelect } from "../components/FormSelect";
import {
  PeriodeAkademikSelect,
  type PeriodeAkademikSelectRef,
} from "../components/PeriodeAkademikSelect";
import {
  SearchableJenisTagihan,
  type SearchableJenisTagihanRef,
} from "../components/SearchableJenisTagihan";
import { CollapsibleSection } from "../components/CollapsibleSection";
import { ValidationModal } from "../components/ValidationModal";
import { LaporanTagihanPreview } from "../components/LaporanTagihanPreview";
import {
  generateLaporanHtml,
  type ReportRowData,
} from "../utils/generateLaporanHtml";
import {
  exportLaporanToPdf,
  exportLaporanToExcel,
} from "../utils/exportLaporan";

export default function LaporanTagihanPage() {
  document.title = "Laporan Tagihan - Sistem Informasi Keuangan UIKA";

  // State Form Utama
  const [selectedPeriods, setSelectedPeriods] = useState<string[]>([]);
  const [selectedProdi, setSelectedProdi] = useState("");
  const [selectedJenisTagihan, setSelectedJenisTagihan] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [tglCutOff, setTglCutOff] = useState("");
  const [tglTagihanAwal, setTglTagihanAwal] = useState("");
  const [tglTagihanAkhir, setTglTagihanAkhir] = useState("");
  const [selectedPenerima, setSelectedPenerima] = useState("Mahasiswa");

  // State Detail Tagihan (Collapsible)
  const [isDetailTagihanOpen, setIsDetailTagihanOpen] = useState(false);
  const [selectedBulanAwal, setSelectedBulanAwal] = useState("");
  const [selectedBulanAkhir, setSelectedBulanAkhir] = useState("");
  const [selectedTahunAwal, setSelectedTahunAwal] = useState("");
  const [selectedTahunAkhir, setSelectedTahunAkhir] = useState("");
  const [selectedCicilan, setSelectedCicilan] = useState("-- Semua --");

  // State Detail Penerima (Collapsible)
  const [isDetailPenerimaOpen, setIsDetailPenerimaOpen] = useState(false);
  const [searchMahasiswa, setSearchMahasiswa] = useState("");
  const [selectedKelasKuliah, setSelectedKelasKuliah] = useState("");
  const [selectedPeriodeMasuk, setSelectedPeriodeMasuk] = useState("");
  const [selectedJalurPendaftaran, setSelectedJalurPendaftaran] = useState("");
  const [selectedGelombang, setSelectedGelombang] = useState("");
  const [selectedSistemKuliah, setSelectedSistemKuliah] = useState("");

  // State Output & Format
  const [useFormatRupiah, setUseFormatRupiah] = useState(true);
  const [selectedFormat, setSelectedFormat] = useState("HTML");
  const [useKop, setUseKop] = useState(true);

  // Validation & Modal State
  const [hasValidationError, setHasValidationError] = useState(false);
  const [showValidationModal, setShowValidationModal] = useState(false);

  // Preview State
  const [showPreview, setShowPreview] = useState(false);

  // Refs untuk accessibility klik label
  const periodeSelectRef = useRef<PeriodeAkademikSelectRef>(null);
  const jenisTagihanSelectRef = useRef<SearchableJenisTagihanRef>(null);

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

  // Validasi Form sebelum aksi
  const validateForm = (): boolean => {
    if (selectedPeriods.length === 0) {
      setHasValidationError(true);
      setShowValidationModal(true);
      return false;
    }
    return true;
  };

  // Format mata uang helper
  const formatRupiahDisplay = (num: number) => {
    if (!useFormatRupiah) return num.toString();
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(num);
  };

  // Mock data tagihan untuk preview laporan
  const mockReportData: ReportRowData[] = [
    {
      no: 1,
      kodeTagihan: "INV/20262/0000001",
      nim: "231106051399",
      nama: "ZIYAD RAIS",
      prodi: selectedProdi || "S1 - Teknik Informatika",
      periode: selectedPeriods[0] || "2026 Genap",
      jenisTagihan: selectedJenisTagihan || "UKT",
      cicilan: "-",
      bulan: "-",
      nominal: 4500000,
      denda: 0,
      potongan: 0,
      bayar: 4500000,
      status: "Lunas",
      sisa: 0,
      suspend: "Tidak",
    },
    {
      no: 2,
      kodeTagihan: "INV/20262/0000002",
      nim: "231105060041",
      nama: "ANNISA AGUSTIN",
      prodi: selectedProdi || "S1 - Sistem Informasi",
      periode: selectedPeriods[0] || "2026 Genap",
      jenisTagihan: selectedJenisTagihan || "SKS",
      cicilan: "-",
      bulan: "-",
      nominal: 3200000,
      denda: 0,
      potongan: 500000,
      bayar: 2700000,
      status: "Lunas",
      sisa: 0,
      suspend: "Tidak",
    },
    {
      no: 3,
      kodeTagihan: "INV/20262/0000003",
      nim: "221105031312",
      nama: "MUHAMMAD JABAR",
      prodi: selectedProdi || "S1 - Manajemen",
      periode: selectedPeriods[0] || "2026 Genap",
      jenisTagihan: selectedJenisTagihan || "Cicilan Ke-1",
      cicilan: "1",
      bulan: "-",
      nominal: 2500000,
      denda: 0,
      potongan: 0,
      bayar: 1000000,
      status: "Belum",
      sisa: 1500000,
      suspend: "Tidak",
    },
    {
      no: 4,
      kodeTagihan: "INV/20262/0000004",
      nim: "241020510521",
      nama: "AHID MUHAMMAD RIDWAN",
      prodi: selectedProdi || "S1 - Ilmu Hukum",
      periode: selectedPeriods[0] || "2026 Genap",
      jenisTagihan: selectedJenisTagihan || "Biaya Awal Masuk",
      cicilan: "-",
      bulan: "-",
      nominal: 5000000,
      denda: 0,
      potongan: 0,
      bayar: 0,
      status: "Belum",
      sisa: 5000000,
      suspend: "Tidak",
    },
  ];

  // Handler Tampilkan Laporan
  const handleTampilkan = () => {
    if (!validateForm()) return;
    setShowPreview(true);
    setTimeout(() => {
      document.getElementById("report-preview-section")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };

  // Handler Lihat di Tab Baru & Auto Download sesuai format
  const handleLihatTabBaru = async () => {
    if (!validateForm()) return;

    if (selectedFormat === "PDF") {
      await exportLaporanToPdf({
        useKop,
        selectedPenerima,
        selectedPeriods,
        selectedStatus,
        selectedProdi,
        selectedJenisTagihan,
        reportData: mockReportData,
        formatRupiah: formatRupiahDisplay,
      });
      return;
    }

    if (selectedFormat === "EXCEL") {
      exportLaporanToExcel({
        useKop,
        selectedPenerima,
        selectedPeriods,
        selectedStatus,
        selectedProdi,
        selectedJenisTagihan,
        reportData: mockReportData,
      });
      return;
    }

    // Default HTML: Buka di tab baru
    const reportHtml = generateLaporanHtml({
      useKop,
      selectedPenerima,
      selectedPeriods,
      selectedStatus,
      selectedProdi,
      selectedJenisTagihan,
      reportData: mockReportData,
      formatRupiah: formatRupiahDisplay,
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
        <h1 className="text-2xl font-medium text-gray-800">Laporan Tagihan</h1>
      </div>

      {/* Main Filter Card */}
      <div className="bg-white rounded shadow-md border-t-4 border-t-emerald-600 p-5 sm:p-6 mb-8">
        <div className="space-y-4">
          {/* Row 1: Periode Akademik */}
          <FormFieldRow
            id="periode-akademik-input"
            label="Periode Akademik"
            required
            onLabelClick={() => periodeSelectRef.current?.openDropdown()}
          >
            <PeriodeAkademikSelect
              ref={periodeSelectRef}
              id="periode-akademik-input"
              periods={academicPeriods}
              selectedPeriods={selectedPeriods}
              onTogglePeriod={handleTogglePeriod}
              onRemovePeriod={handleRemovePeriod}
              hasError={hasValidationError}
            />
          </FormFieldRow>

          {/* Row 2: Program Studi */}
          <FormFieldRow id="program-studi-select" label="Program Studi">
            <FormSelect
              id="program-studi-select"
              value={selectedProdi}
              onChange={setSelectedProdi}
              placeholder="-- Pilih Program Studi --"
              optGroups={programStudiGroups.map((g) => ({
                label: g.fakultas,
                options: g.prodiList,
              }))}
            />
          </FormFieldRow>

          {/* Row 3: Jenis Tagihan (Searchable) */}
          <FormFieldRow
            id="jenis-tagihan-input"
            label="Jenis Tagihan"
            onLabelClick={() => jenisTagihanSelectRef.current?.openDropdown()}
          >
            <SearchableJenisTagihan
              ref={jenisTagihanSelectRef}
              id="jenis-tagihan-input"
              options={jenisTagihanOptions}
              value={selectedJenisTagihan}
              onChange={setSelectedJenisTagihan}
            />
          </FormFieldRow>

          {/* Row 4: Status */}
          <FormFieldRow id="status-select" label="Status">
            <FormSelect
              id="status-select"
              value={selectedStatus}
              onChange={setSelectedStatus}
              options={statusOptions}
            />
          </FormFieldRow>

          {/* Row 5: Tgl. Cut Off */}
          <FormFieldRow id="tgl-cut-off-input" label="Tgl. Cut Off">
            <FormDatePicker
              id="tgl-cut-off-input"
              value={tglCutOff}
              onChange={setTglCutOff}
            />
          </FormFieldRow>

          {/* Row 6: Tgl. Tagihan Awal */}
          <FormFieldRow id="tgl-tagihan-awal-input" label="Tgl. Tagihan Awal">
            <FormDatePicker
              id="tgl-tagihan-awal-input"
              value={tglTagihanAwal}
              onChange={setTglTagihanAwal}
            />
          </FormFieldRow>

          {/* Row 7: Tgl. Tagihan Akhir */}
          <FormFieldRow id="tgl-tagihan-akhir-input" label="Tgl. Tagihan Akhir">
            <FormDatePicker
              id="tgl-tagihan-akhir-input"
              value={tglTagihanAkhir}
              onChange={setTglTagihanAkhir}
            />
          </FormFieldRow>

          {/* Row 8: Penerima */}
          <FormFieldRow id="penerima-select" label="Penerima">
            <FormSelect
              id="penerima-select"
              value={selectedPenerima}
              onChange={setSelectedPenerima}
              options={penerimaOptions}
            />
          </FormFieldRow>

          {/* Row 9: Detail Tagihan (Collapsible) */}
          <CollapsibleSection
            id="detail-tagihan-toggle"
            title="Detail Tagihan"
            isOpen={isDetailTagihanOpen}
            onToggle={() => setIsDetailTagihanOpen(!isDetailTagihanOpen)}
          >
            <FormFieldRow id="bulan-awal-select" label="Bulan Awal">
              <FormSelect
                id="bulan-awal-select"
                value={selectedBulanAwal}
                onChange={setSelectedBulanAwal}
                options={bulanAwalOptions}
              />
            </FormFieldRow>

            <FormFieldRow id="bulan-akhir-select" label="Bulan Akhir">
              <FormSelect
                id="bulan-akhir-select"
                value={selectedBulanAkhir}
                onChange={setSelectedBulanAkhir}
                options={bulanAkhirOptions}
              />
            </FormFieldRow>

            <FormFieldRow id="tahun-awal-select" label="Tahun Awal">
              <FormSelect
                id="tahun-awal-select"
                value={selectedTahunAwal}
                onChange={setSelectedTahunAwal}
                options={tahunOptions}
              />
            </FormFieldRow>

            <FormFieldRow id="tahun-akhir-select" label="Tahun Akhir">
              <FormSelect
                id="tahun-akhir-select"
                value={selectedTahunAkhir}
                onChange={setSelectedTahunAkhir}
                options={tahunOptions}
              />
            </FormFieldRow>

            <FormFieldRow id="cicilan-ke-select" label="Cicilan Ke-">
              <FormSelect
                id="cicilan-ke-select"
                value={selectedCicilan}
                onChange={setSelectedCicilan}
                options={cicilanOptions}
              />
            </FormFieldRow>
          </CollapsibleSection>

          {/* Row 10: Detail Penerima (Collapsible) */}
          <CollapsibleSection
            id="detail-penerima-toggle"
            title="Detail Penerima"
            isOpen={isDetailPenerimaOpen}
            onToggle={() => setIsDetailPenerimaOpen(!isDetailPenerimaOpen)}
          >
            <FormFieldRow id="mahasiswa-input" label="Mahasiswa">
              <input
                id="mahasiswa-input"
                type="text"
                value={searchMahasiswa}
                onChange={(e) => setSearchMahasiswa(e.target.value)}
                placeholder="Cari Mahasiswa"
                className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
              />
            </FormFieldRow>

            <FormFieldRow id="kelas-kuliah-select" label="Kelas Kuliah">
              <FormSelect
                id="kelas-kuliah-select"
                value={selectedKelasKuliah}
                onChange={setSelectedKelasKuliah}
                options={kelasKuliahOptions}
              />
            </FormFieldRow>

            <FormFieldRow id="periode-masuk-select" label="Periode Masuk">
              <FormSelect
                id="periode-masuk-select"
                value={selectedPeriodeMasuk}
                onChange={setSelectedPeriodeMasuk}
                placeholder="-- Pilih Periode Masuk --"
                options={academicPeriods}
              />
            </FormFieldRow>

            <FormFieldRow id="jalur-pendaftaran-select" label="Jalur Pendaftaran">
              <FormSelect
                id="jalur-pendaftaran-select"
                value={selectedJalurPendaftaran}
                onChange={setSelectedJalurPendaftaran}
                options={jalurPendaftaranOptions}
              />
            </FormFieldRow>

            <FormFieldRow id="gelombang-select" label="Gelombang">
              <FormSelect
                id="gelombang-select"
                value={selectedGelombang}
                onChange={setSelectedGelombang}
                options={gelombangOptions}
              />
            </FormFieldRow>

            <FormFieldRow id="sistem-kuliah-select" label="Sistem Kuliah">
              <FormSelect
                id="sistem-kuliah-select"
                value={selectedSistemKuliah}
                onChange={setSelectedSistemKuliah}
                options={sistemKuliahOptions}
              />
            </FormFieldRow>
          </CollapsibleSection>

          {/* Row 11: Format Rupiah */}
          <FormFieldRow
            id="format-rupiah-checkbox"
            label="Format Rupiah"
            alignCenter
          >
            <label
              htmlFor="format-rupiah-checkbox"
              className="inline-flex items-center gap-2 cursor-pointer select-none text-sm text-gray-700 font-medium"
            >
              <input
                id="format-rupiah-checkbox"
                type="checkbox"
                checked={useFormatRupiah}
                onChange={(e) => setUseFormatRupiah(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer accent-[#1e3a8a]"
              />
              <span>Gunakan Format</span>
            </label>
          </FormFieldRow>

          {/* Row 12: Format */}
          <FormFieldRow id="format-select" label="Format">
            <FormSelect
              id="format-select"
              value={selectedFormat}
              onChange={setSelectedFormat}
              options={formatOptions}
            />
          </FormFieldRow>

          {/* Row 13: KOP */}
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

      {/* Validation Information Modal */}
      <ValidationModal
        isOpen={showValidationModal}
        onClose={() => setShowValidationModal(false)}
      />

      {/* Preview Section */}
      {showPreview && (
        <LaporanTagihanPreview
          useKop={useKop}
          selectedPenerima={selectedPenerima}
          selectedPeriods={selectedPeriods}
          selectedFormat={selectedFormat}
          reportData={mockReportData}
          formatRupiah={formatRupiahDisplay}
          onLihatTabBaru={handleLihatTabBaru}
          onCetakFormat={handleLihatTabBaru}
        />
      )}
    </div>
  );
}

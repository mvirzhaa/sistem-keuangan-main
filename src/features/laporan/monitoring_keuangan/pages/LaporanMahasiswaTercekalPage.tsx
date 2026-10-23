import React, { useState } from "react";
import { IoEye, IoOpenOutline } from "react-icons/io5";
import {
  academicPeriods,
  programStudiGroups,
  aturanAkademikOptions,
  periodeMasukTercekalOptions,
  statusSemesterTercekalOptions,
  formatOptions,
} from "../constants/laporanMahasiswaTercekalData";
import { FormFieldRow } from "../../tagihan/components/FormFieldRow";
import { FormSelect } from "../../tagihan/components/FormSelect";
import { LaporanMahasiswaTercekalPreview } from "../components/LaporanMahasiswaTercekalPreview";
import {
  generateLaporanMahasiswaTercekalHtml,
  type LaporanMahasiswaTercekalRowData,
} from "../utils/generateLaporanMahasiswaTercekalHtml";
import {
  exportLaporanMahasiswaTercekalToPdf,
  exportLaporanMahasiswaTercekalToExcel,
} from "../utils/exportLaporanMahasiswaTercekal";

export default function LaporanMahasiswaTercekalPage() {
  document.title =
    "Laporan Mahasiswa Tercekal Aturan Akademik - Sistem Informasi Keuangan UIKA";

  // Form State matching Image 5
  const [unitKerja, setUnitKerja] = useState("Universitas Ibn Khaldun");
  const [periodeAkademik, setPeriodeAkademik] = useState("2027 Genap");
  const [aturanAkademik, setAturanAkademik] = useState("KHS - Melihat KHS");
  const [periodeMasuk, setPeriodeMasuk] = useState("--- Semua ---");
  const [statusSemester, setStatusSemester] = useState("--- Semua ---");
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

  // Mock data for Laporan Mahasiswa Tercekal
  const getMockData = (): LaporanMahasiswaTercekalRowData[] => {
    const rawData: LaporanMahasiswaTercekalRowData[] = [
      {
        no: 1,
        nim: "2211010045",
        nama: "Budi Santoso",
        prodi: "S1 - Teknik Informatika",
        aturanAkademik: "KHS - Melihat KHS",
        alasanTercekal: "Belum lunas tagihan BPP Semester Ganjil",
        tunggakan: 3200000,
        status: "Tercekal",
      },
      {
        no: 2,
        nim: "2211010088",
        nama: "Dian Wahyuni",
        prodi: "S1 - Teknik Informatika",
        aturanAkademik: "KHS - Melihat KHS",
        alasanTercekal: "Tunggakan biaya praktikum laboratorium",
        tunggakan: 750000,
        status: "Tercekal",
      },
      {
        no: 3,
        nim: "2112020019",
        nama: "Rizki Maulana",
        prodi: "S1 - Manajemen",
        aturanAkademik: "KRS - Pengisian KRS",
        alasanTercekal: "Tunggakan cicilan DPP / Uang Gedung tahap 2",
        tunggakan: 2500000,
        status: "Tercekal",
      },
      {
        no: 4,
        nim: "2112020054",
        nama: "Fitri Handayani",
        prodi: "S1 - Manajemen",
        aturanAkademik: "KHS - Melihat KHS",
        alasanTercekal: "Belum lunas SPP Semester Ganjil",
        tunggakan: 2800000,
        status: "Tercekal",
      },
      {
        no: 5,
        nim: "2013030021",
        nama: "Bayu Segara",
        prodi: "S1 - Ilmu Hukum",
        aturanAkademik: "UAS - Mengikuti Ujian Akhir Semester",
        alasanTercekal: "Belum menyelesaikan tagihan SKS berjalan",
        tunggakan: 1500000,
        status: "Tercekal",
      },
      {
        no: 6,
        nim: "2014040032",
        nama: "Hasan Basri",
        prodi: "S1 - Pendidikan Agama Islam",
        aturanAkademik: "KHS - Melihat KHS",
        alasanTercekal: "Belum lunas BPP Pokok",
        tunggakan: 2100000,
        status: "Tercekal",
      },
      {
        no: 7,
        nim: "1911050014",
        nama: "Rio Saputra",
        prodi: "S1 - Sistem Informasi",
        aturanAkademik: "Wisuda - Pendaftaran Wisuda",
        alasanTercekal: "Tunggakan administrasi dan biaya ujian skripsi",
        tunggakan: 1850000,
        status: "Tercekal",
      },
    ];

    return rawData
      .filter((item) => {
        if (
          unitKerja &&
          unitKerja !== "Universitas Ibn Khaldun" &&
          !item.prodi.includes(unitKerja)
        ) {
          return false;
        }
        if (aturanAkademik && item.aturanAkademik !== aturanAkademik) {
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
        .getElementById("laporan-mahasiswa-tercekal-preview")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleLihatTabBaru = async () => {
    const data = getMockData();

    if (selectedFormat === "PDF") {
      await exportLaporanMahasiswaTercekalToPdf({
        useKop,
        unitKerja,
        periodeAkademik,
        aturanAkademik,
        periodeMasuk:
          periodeMasuk === "--- Semua ---" ? "" : periodeMasuk,
        statusSemester:
          statusSemester === "--- Semua ---" ? "" : statusSemester,
        data,
        formatRupiah,
      });
      return;
    }

    if (selectedFormat === "EXCEL") {
      exportLaporanMahasiswaTercekalToExcel({
        unitKerja,
        periodeAkademik,
        aturanAkademik,
        periodeMasuk:
          periodeMasuk === "--- Semua ---" ? "" : periodeMasuk,
        statusSemester:
          statusSemester === "--- Semua ---" ? "" : statusSemester,
        data,
      });
      return;
    }

    // Default HTML
    const html = generateLaporanMahasiswaTercekalHtml({
      useKop,
      unitKerja,
      periodeAkademik,
      aturanAkademik,
      periodeMasuk:
        periodeMasuk === "--- Semua ---" ? "" : periodeMasuk,
      statusSemester:
        statusSemester === "--- Semua ---" ? "" : statusSemester,
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
          Laporan Mahasiswa Tercekal Aturan Akademik
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
          {/* 1. Unit Kerja */}
          <FormFieldRow id="unit-kerja-select" label="Unit Kerja">
            <select
              id="unit-kerja-select"
              value={unitKerja}
              onChange={(e) => setUnitKerja(e.target.value)}
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

          {/* 2. Periode Akademik */}
          <FormFieldRow id="periode-akademik-select" label="Periode Akademik">
            <FormSelect
              id="periode-akademik-select"
              value={periodeAkademik}
              options={academicPeriods}
              onChange={setPeriodeAkademik}
            />
          </FormFieldRow>

          {/* 3. Aturan Akademik */}
          <FormFieldRow id="aturan-akademik-select" label="Aturan Akademik">
            <FormSelect
              id="aturan-akademik-select"
              value={aturanAkademik}
              options={aturanAkademikOptions}
              onChange={setAturanAkademik}
            />
          </FormFieldRow>

          {/* 4. Periode Masuk */}
          <FormFieldRow id="periode-masuk-select" label="Periode Masuk">
            <FormSelect
              id="periode-masuk-select"
              value={periodeMasuk}
              options={periodeMasukTercekalOptions}
              onChange={setPeriodeMasuk}
            />
          </FormFieldRow>

          {/* 5. Status Semester */}
          <FormFieldRow id="status-semester-select" label="Status Semester">
            <FormSelect
              id="status-semester-select"
              value={statusSemester}
              options={statusSemesterTercekalOptions}
              onChange={setStatusSemester}
            />
          </FormFieldRow>

          {/* 6. Format */}
          <FormFieldRow id="format-select" label="Format">
            <FormSelect
              id="format-select"
              value={selectedFormat}
              options={formatOptions}
              onChange={setSelectedFormat}
            />
          </FormFieldRow>

          {/* 7. KOP */}
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
        <LaporanMahasiswaTercekalPreview
          useKop={useKop}
          unitKerja={unitKerja}
          periodeAkademik={periodeAkademik}
          aturanAkademik={aturanAkademik}
          periodeMasuk={periodeMasuk}
          statusSemester={statusSemester}
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

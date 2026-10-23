import React, { useState } from "react";
import { IoEye, IoSearchOutline, IoOpenOutline } from "react-icons/io5";
import {
  namaLaporanManualOptions,
  periodeMasukOptions,
  gelombangManualOptions,
  jalurPendaftaranManualOptions,
  sistemKuliahManualOptions,
  formatOptions,
  programStudiGroups,
} from "../constants/laporanManualData";
import { FormFieldRow } from "../../tagihan/components/FormFieldRow";
import { FormSelect } from "../../tagihan/components/FormSelect";
import { CetakLaporanManualPreview } from "../components/CetakLaporanManualPreview";
import {
  generateLaporanManualHtml,
  type LaporanManualRowData,
} from "../utils/generateLaporanManualHtml";
import {
  exportLaporanManualToPdf,
  exportLaporanManualToExcel,
} from "../utils/exportLaporanManual";

export default function CetakLaporanManualPage() {
  document.title = "Laporan Manual - Sistem Informasi Keuangan UIKA";

  // Card 1 State
  const [namaLaporan, setNamaLaporan] = useState("-- Pilih Nama Laporan --");

  // Card 2 Filter State
  const [periodeMasuk, setPeriodeMasuk] = useState("-- Semua Pilihan --");
  const [programStudi, setProgramStudi] = useState("-- Semua Pilihan --");
  const [gelombang, setGelombang] = useState("-- Semua Pilihan --");
  const [jalur, setJalur] = useState("-- Semua Pilihan --");
  const [sistemKuliah, setSistemKuliah] = useState("-- Semua Pilihan --");
  const [selectedFormat, setSelectedFormat] = useState("HTML");
  const [useKop, setUseKop] = useState(true);

  // Preview State
  const [showPreview, setShowPreview] = useState(false);

  // Mock data for Cetak Laporan Manual
  const getMockData = (): LaporanManualRowData[] => {
    const rawData: LaporanManualRowData[] = [
      {
        no: 1,
        nim: "2311010001",
        nama: "Ahmad Fauzi",
        prodi: "S1 - Teknik Informatika",
        periodeMasuk: "2023 Ganjil",
        jalur: "SNMPTN / SNBP",
        gelombang: "Gelombang 1",
        sistemKuliah: "Reguler",
        status: "Aktif",
      },
      {
        no: 2,
        nim: "2311010014",
        nama: "Siti Rahmawati",
        prodi: "S1 - Teknik Informatika",
        periodeMasuk: "2023 Ganjil",
        jalur: "SBMPTN / SNBT",
        gelombang: "Gelombang 1",
        sistemKuliah: "Reguler",
        status: "Aktif",
      },
      {
        no: 3,
        nim: "2312020023",
        nama: "Muhammad Rizky",
        prodi: "S1 - Manajemen",
        periodeMasuk: "2023 Ganjil",
        jalur: "Mandiri Reguler",
        gelombang: "Gelombang 2",
        sistemKuliah: "Reguler",
        status: "Aktif",
      },
      {
        no: 4,
        nim: "2312020045",
        nama: "Nurul Hidayah",
        prodi: "S1 - Manajemen",
        periodeMasuk: "2023 Ganjil",
        jalur: "Prestasi Tahfidz & Keagamaan",
        gelombang: "Gelombang 1",
        sistemKuliah: "Reguler",
        status: "Aktif",
      },
      {
        no: 5,
        nim: "2313030012",
        nama: "Dimas Pratama",
        prodi: "S1 - Ilmu Hukum",
        periodeMasuk: "2023 Ganjil",
        jalur: "SNMPTN / SNBP",
        gelombang: "Gelombang 1",
        sistemKuliah: "Reguler",
        status: "Aktif",
      },
      {
        no: 6,
        nim: "2314040008",
        nama: "Fathimah Azzahra",
        prodi: "S1 - Pendidikan Agama Islam",
        periodeMasuk: "2023 Ganjil",
        jalur: "SBMPTN / SNBT",
        gelombang: "Gelombang 1",
        sistemKuliah: "Reguler",
        status: "Aktif",
      },
      {
        no: 7,
        nim: "2311050019",
        nama: "Bagas Setiawan",
        prodi: "S1 - Sistem Informasi",
        periodeMasuk: "2023 Ganjil",
        jalur: "Mandiri Reguler",
        gelombang: "Gelombang 2",
        sistemKuliah: "Kelas Karyawan",
        status: "Aktif",
      },
    ];

    return rawData
      .filter((item) => {
        if (
          programStudi &&
          programStudi !== "-- Semua Pilihan --" &&
          !item.prodi.includes(programStudi)
        ) {
          return false;
        }
        if (
          gelombang &&
          gelombang !== "-- Semua Pilihan --" &&
          item.gelombang !== gelombang
        ) {
          return false;
        }
        if (
          jalur &&
          jalur !== "-- Semua Pilihan --" &&
          item.jalur !== jalur
        ) {
          return false;
        }
        if (
          sistemKuliah &&
          sistemKuliah !== "-- Semua Pilihan --" &&
          item.sistemKuliah !== sistemKuliah
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
        .getElementById("cetak-laporan-manual-preview")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleLihatTabBaru = async () => {
    const data = getMockData();

    if (selectedFormat === "PDF") {
      await exportLaporanManualToPdf({
        useKop,
        namaLaporan:
          namaLaporan === "-- Pilih Nama Laporan --"
            ? "Laporan Manual"
            : namaLaporan,
        periodeMasuk:
          periodeMasuk === "-- Semua Pilihan --" ? "" : periodeMasuk,
        programStudi:
          programStudi === "-- Semua Pilihan --" ? "" : programStudi,
        gelombang: gelombang === "-- Semua Pilihan --" ? "" : gelombang,
        jalur: jalur === "-- Semua Pilihan --" ? "" : jalur,
        sistemKuliah:
          sistemKuliah === "-- Semua Pilihan --" ? "" : sistemKuliah,
        data,
      });
      return;
    }

    if (selectedFormat === "EXCEL") {
      exportLaporanManualToExcel({
        namaLaporan:
          namaLaporan === "-- Pilih Nama Laporan --"
            ? "Laporan Manual"
            : namaLaporan,
        periodeMasuk:
          periodeMasuk === "-- Semua Pilihan --" ? "" : periodeMasuk,
        programStudi:
          programStudi === "-- Semua Pilihan --" ? "" : programStudi,
        gelombang: gelombang === "-- Semua Pilihan --" ? "" : gelombang,
        jalur: jalur === "-- Semua Pilihan --" ? "" : jalur,
        sistemKuliah:
          sistemKuliah === "-- Semua Pilihan --" ? "" : sistemKuliah,
        data,
      });
      return;
    }

    // Default HTML
    const html = generateLaporanManualHtml({
      useKop,
      namaLaporan:
        namaLaporan === "-- Pilih Nama Laporan --"
          ? "Laporan Manual"
          : namaLaporan,
      periodeMasuk:
        periodeMasuk === "-- Semua Pilihan --" ? "" : periodeMasuk,
      programStudi:
        programStudi === "-- Semua Pilihan --" ? "" : programStudi,
      gelombang: gelombang === "-- Semua Pilihan --" ? "" : gelombang,
      jalur: jalur === "-- Semua Pilihan --" ? "" : jalur,
      sistemKuliah:
        sistemKuliah === "-- Semua Pilihan --" ? "" : sistemKuliah,
      data,
    });

    const newWindow = window.open("", "_blank");
    if (newWindow) {
      newWindow.document.write(html);
      newWindow.document.close();
    }
  };

  const isLaporanSelected =
    namaLaporan && namaLaporan !== "-- Pilih Nama Laporan --";

  return (
    <div className="w-full">
      {/* Title */}
      <div className="mb-4">
        <h1 className="text-2xl font-medium text-gray-800">Laporan Manual</h1>
      </div>

      {/* Card 1: Select Nama Laporan */}
      <div className="bg-white rounded shadow-md border-t-4 border-t-amber-500 p-5 sm:p-6 mb-8">
        <FormFieldRow id="nama-laporan-select" label="Nama Laporan">
          <select
            id="nama-laporan-select"
            value={namaLaporan}
            onChange={(e) => {
              setNamaLaporan(e.target.value);
              setShowPreview(false);
            }}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
          >
            {namaLaporanManualOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </FormFieldRow>
      </div>

      {/* Card 2: Filter Parameters */}
      {isLaporanSelected && (
        <div className="bg-white rounded shadow-md border-t-4 border-t-emerald-600 p-5 sm:p-6 mb-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleTampilkan();
            }}
          >
            {/* 1. Periode Masuk (WAJIB DIPILIH) */}
            <FormFieldRow
              id="periode-masuk-select"
              label={
                <span>
                  Periode Masuk
                  <span className="text-red-600 font-bold ml-1">
                    (WAJIB DIPILIH)
                  </span>
                </span>
              }
            >
              <select
                id="periode-masuk-select"
                value={periodeMasuk}
                onChange={(e) => setPeriodeMasuk(e.target.value)}
                className="w-full border border-emerald-500 rounded px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 cursor-pointer"
              >
                {periodeMasukOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </FormFieldRow>

            {/* 2. Program Studi */}
            <FormFieldRow id="program-studi-select" label="Program Studi">
              <select
                id="program-studi-select"
                value={programStudi}
                onChange={(e) => setProgramStudi(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
              >
                <option value="-- Semua Pilihan --">-- Semua Pilihan --</option>
                <option value="Universitas Ibn Khaldun">
                  Universitas Ibn Khaldun
                </option>
                {programStudiGroups.map((group, idx) => (
                  <optgroup key={idx} label={group.fakultas}>
                    <option value={group.fakultas}>
                      -- {group.fakultas} --
                    </option>
                    {group.prodiList.map((prodi, pIdx) => (
                      <option key={pIdx} value={prodi}>
                        {prodi}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </FormFieldRow>

            {/* 3. Gelombang */}
            <FormFieldRow id="gelombang-select" label="Gelombang">
              <FormSelect
                id="gelombang-select"
                value={gelombang}
                options={gelombangManualOptions}
                onChange={setGelombang}
              />
            </FormFieldRow>

            {/* 4. Jalur Pendaftaran */}
            <FormFieldRow id="jalur-select" label="Jalur Pendaftaran">
              <FormSelect
                id="jalur-select"
                value={jalur}
                options={jalurPendaftaranManualOptions}
                onChange={setJalur}
              />
            </FormFieldRow>

            {/* 5. Sistem Kuliah */}
            <FormFieldRow id="sistem-kuliah-select" label="Sistem Kuliah">
              <FormSelect
                id="sistem-kuliah-select"
                value={sistemKuliah}
                options={sistemKuliahManualOptions}
                onChange={setSistemKuliah}
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

            {/* 8. Keterangan */}
            <FormFieldRow label="Keterangan">
              <div className="text-xs text-gray-500 pt-1">
                Silakan pilih filter yang diinginkan lalu klik Tampilkan untuk
                melihat pratinjau data.
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
      )}

      {/* Preview Section */}
      {showPreview && isLaporanSelected && (
        <CetakLaporanManualPreview
          useKop={useKop}
          namaLaporan={namaLaporan}
          periodeMasuk={periodeMasuk}
          programStudi={programStudi}
          gelombang={gelombang}
          jalur={jalur}
          sistemKuliah={sistemKuliah}
          selectedFormat={selectedFormat}
          data={getMockData()}
          onLihatTabBaru={handleLihatTabBaru}
          onCetakFormat={handleLihatTabBaru}
        />
      )}
    </div>
  );
}

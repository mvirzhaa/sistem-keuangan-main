import React, { useState } from "react";
import { IoEye, IoOpenOutline } from "react-icons/io5";
import {
  academicPeriods,
  sistemKuliahUktOptions,
  jalurPendaftaranUktOptions,
  gelombangUktOptions,
  jenisTagihanUktOptions,
  formatOptions,
  programStudiGroups,
} from "../constants/laporanUktData";
import { FormFieldRow } from "../../tagihan/components/FormFieldRow";
import { FormSelect } from "../../tagihan/components/FormSelect";
import { LaporanTarifTagihanPreview } from "../components/LaporanTarifTagihanPreview";
import {
  generateLaporanTarifTagihanHtml,
  type LaporanTarifTagihanRowData,
} from "../utils/generateLaporanUktHtml";
import {
  exportLaporanTarifTagihanToPdf,
  exportLaporanTarifTagihanToExcel,
} from "../utils/exportLaporanUkt";

export default function LaporanTarifTagihanPage() {
  document.title = "Laporan Tarif Tagihan - Sistem Informasi Keuangan UIKA";

  // Form State matching Image 3
  const [tahunAkademik, setTahunAkademik] = useState("2026 Ganjil");
  const [programStudi, setProgramStudi] = useState("Universitas Ibn Khaldun");
  const [sistemKuliah, setSistemKuliah] = useState("-- Pilih Sistem Kuliah --");
  const [jalurPendaftaran, setJalurPendaftaran] = useState(
    "-- Pilih Jalur Pendaftaran --"
  );
  const [gelombang, setGelombang] = useState("-- Pilih Gelombang --");
  const [jenisTagihan, setJenisTagihan] = useState(
    "-- Pilih Jenis Tagihan --"
  );
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

  // Mock data for Laporan Tarif Tagihan
  const getMockData = (): LaporanTarifTagihanRowData[] => {
    const rawData: LaporanTarifTagihanRowData[] = [
      {
        no: 1,
        prodi: "S1 - Teknik Informatika",
        jenisAkun: "BPP Pokok",
        jenisTagihan: "BPP Pokok",
        jalurPendaftaran: "SNMPTN / SNBP",
        sistemKuliah: "Reguler",
        gelombang: "Gelombang 1",
        frekuensi: "Per Semester",
        nominalTarif: 3200000,
        besaranTarif: 3200000,
        jmlCicilan: 1,
        semester: "1",
      },
      {
        no: 2,
        prodi: "S1 - Teknik Informatika",
        jenisAkun: "Biaya SKS",
        jenisTagihan: "Biaya SKS",
        jalurPendaftaran: "SNMPTN / SNBP",
        sistemKuliah: "Reguler",
        gelombang: "Gelombang 1",
        frekuensi: "Per SKS",
        nominalTarif: 125000,
        besaranTarif: 125000,
        jmlCicilan: 1,
        semester: "1",
      },
      {
        no: 3,
        prodi: "S1 - Teknik Informatika",
        jenisAkun: "DPP / Uang Gedung",
        jenisTagihan: "DPP / Uang Gedung",
        jalurPendaftaran: "Mandiri Reguler",
        sistemKuliah: "Reguler",
        gelombang: "Gelombang 1",
        frekuensi: "Satu Kali",
        nominalTarif: 6500000,
        besaranTarif: 6500000,
        jmlCicilan: 3,
        semester: "1",
      },
      {
        no: 4,
        prodi: "S1 - Teknik Informatika",
        jenisAkun: "Biaya Praktikum Laboratorium",
        jenisTagihan: "Biaya Praktikum Laboratorium",
        jalurPendaftaran: "Semua Jalur",
        sistemKuliah: "Reguler",
        gelombang: "Gelombang 1",
        frekuensi: "Per Semester",
        nominalTarif: 750000,
        besaranTarif: 750000,
        jmlCicilan: 1,
        semester: "1",
      },
      {
        no: 5,
        prodi: "S1 - Manajemen",
        jenisAkun: "BPP Pokok",
        jenisTagihan: "BPP Pokok",
        jalurPendaftaran: "SNMPTN / SNBP",
        sistemKuliah: "Reguler",
        gelombang: "Gelombang 1",
        frekuensi: "Per Semester",
        nominalTarif: 2800000,
        besaranTarif: 2800000,
        jmlCicilan: 1,
        semester: "1",
      },
      {
        no: 6,
        prodi: "S1 - Manajemen",
        jenisAkun: "Biaya SKS",
        jenisTagihan: "Biaya SKS",
        jalurPendaftaran: "SBMPTN / SNBT",
        sistemKuliah: "Reguler",
        gelombang: "Gelombang 1",
        frekuensi: "Per SKS",
        nominalTarif: 110000,
        besaranTarif: 110000,
        jmlCicilan: 1,
        semester: "1",
      },
      {
        no: 7,
        prodi: "S1 - Manajemen",
        jenisAkun: "DPP / Uang Gedung",
        jenisTagihan: "DPP / Uang Gedung",
        jalurPendaftaran: "Mandiri Reguler",
        sistemKuliah: "Kelas Karyawan",
        gelombang: "Gelombang 2",
        frekuensi: "Satu Kali",
        nominalTarif: 5500000,
        besaranTarif: 5500000,
        jmlCicilan: 3,
        semester: "1",
      },
      {
        no: 8,
        prodi: "S1 - Ilmu Hukum",
        jenisAkun: "BPP Pokok",
        jenisTagihan: "BPP Pokok",
        jalurPendaftaran: "SNMPTN / SNBP",
        sistemKuliah: "Reguler",
        gelombang: "Gelombang 1",
        frekuensi: "Per Semester",
        nominalTarif: 2900000,
        besaranTarif: 2900000,
        jmlCicilan: 1,
        semester: "1",
      },
      {
        no: 9,
        prodi: "S1 - Ilmu Hukum",
        jenisAkun: "Biaya Ujian Skripsi / Tesis",
        jenisTagihan: "Biaya Ujian Skripsi / Tesis",
        jalurPendaftaran: "Semua Jalur",
        sistemKuliah: "Reguler",
        gelombang: "Semua Gelombang",
        frekuensi: "Satu Kali",
        nominalTarif: 1500000,
        besaranTarif: 1500000,
        jmlCicilan: 1,
        semester: "7",
      },
      {
        no: 10,
        prodi: "S1 - Pendidikan Agama Islam",
        jenisAkun: "SPP / UKT",
        jenisTagihan: "SPP / UKT",
        jalurPendaftaran: "Prestasi Tahfidz & Keagamaan",
        sistemKuliah: "Reguler",
        gelombang: "Gelombang 1",
        frekuensi: "Per Semester",
        nominalTarif: 2100000,
        besaranTarif: 2100000,
        jmlCicilan: 1,
        semester: "1",
      },
      {
        no: 11,
        prodi: "S1 - Kesehatan Masyarakat",
        jenisAkun: "BPP Pokok",
        jenisTagihan: "BPP Pokok",
        jalurPendaftaran: "Mandiri Reguler",
        sistemKuliah: "Reguler",
        gelombang: "Gelombang 2",
        frekuensi: "Per Semester",
        nominalTarif: 3400000,
        besaranTarif: 3400000,
        jmlCicilan: 1,
        semester: "1",
      },
      {
        no: 12,
        prodi: "Universitas Ibn Khaldun",
        jenisAkun: "Biaya Wisuda",
        jenisTagihan: "Biaya Wisuda",
        jalurPendaftaran: "Semua Jalur",
        sistemKuliah: "Semua Sistem",
        gelombang: "Semua Gelombang",
        frekuensi: "Satu Kali",
        nominalTarif: 2250000,
        besaranTarif: 2250000,
        jmlCicilan: 1,
        semester: "8",
      },
      {
        no: 13,
        prodi: "Universitas Ibn Khaldun",
        jenisAkun: "Dana Kemahasiswaan & Jas Almamater",
        jenisTagihan: "Dana Kemahasiswaan & Jas Almamater",
        jalurPendaftaran: "Semua Jalur",
        sistemKuliah: "Reguler",
        gelombang: "Gelombang 1",
        frekuensi: "Satu Kali",
        nominalTarif: 850000,
        besaranTarif: 850000,
        jmlCicilan: 1,
        semester: "1",
      },
    ];

    return rawData
      .filter((item) => {
        if (
          programStudi &&
          programStudi !== "Universitas Ibn Khaldun" &&
          !item.prodi.includes(programStudi) &&
          item.prodi !== "Universitas Ibn Khaldun"
        ) {
          return false;
        }
        if (
          jenisTagihan &&
          jenisTagihan !== "-- Pilih Jenis Tagihan --" &&
          item.jenisTagihan !== jenisTagihan
        ) {
          return false;
        }
        if (
          sistemKuliah &&
          sistemKuliah !== "-- Pilih Sistem Kuliah --" &&
          item.sistemKuliah !== sistemKuliah &&
          item.sistemKuliah !== "Semua Sistem"
        ) {
          return false;
        }
        if (
          jalurPendaftaran &&
          jalurPendaftaran !== "-- Pilih Jalur Pendaftaran --" &&
          item.jalurPendaftaran !== jalurPendaftaran &&
          item.jalurPendaftaran !== "Semua Jalur"
        ) {
          return false;
        }
        if (
          gelombang &&
          gelombang !== "-- Pilih Gelombang --" &&
          item.gelombang !== gelombang &&
          item.gelombang !== "Semua Gelombang"
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
        .getElementById("laporan-tarif-tagihan-preview")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleLihatTabBaru = async () => {
    const data = getMockData();

    if (selectedFormat === "PDF") {
      await exportLaporanTarifTagihanToPdf({
        useKop,
        tahunAkademik,
        programStudi,
        sistemKuliah:
          sistemKuliah === "-- Pilih Sistem Kuliah --" ? "" : sistemKuliah,
        jalurPendaftaran:
          jalurPendaftaran === "-- Pilih Jalur Pendaftaran --"
            ? ""
            : jalurPendaftaran,
        gelombang: gelombang === "-- Pilih Gelombang --" ? "" : gelombang,
        jenisTagihan:
          jenisTagihan === "-- Pilih Jenis Tagihan --" ? "" : jenisTagihan,
        data,
        formatRupiah,
      });
      return;
    }

    if (selectedFormat === "EXCEL") {
      exportLaporanTarifTagihanToExcel({
        useKop,
        tahunAkademik,
        programStudi,
        sistemKuliah:
          sistemKuliah === "-- Pilih Sistem Kuliah --" ? "" : sistemKuliah,
        jalurPendaftaran:
          jalurPendaftaran === "-- Pilih Jalur Pendaftaran --"
            ? ""
            : jalurPendaftaran,
        gelombang: gelombang === "-- Pilih Gelombang --" ? "" : gelombang,
        jenisTagihan:
          jenisTagihan === "-- Pilih Jenis Tagihan --" ? "" : jenisTagihan,
        data,
      });
      return;
    }

    // HTML Preview in new tab
    const html = generateLaporanTarifTagihanHtml({
      useKop,
      tahunAkademik,
      programStudi,
      sistemKuliah:
        sistemKuliah === "-- Pilih Sistem Kuliah --" ? "" : sistemKuliah,
      jalurPendaftaran:
        jalurPendaftaran === "-- Pilih Jalur Pendaftaran --"
          ? ""
          : jalurPendaftaran,
      gelombang: gelombang === "-- Pilih Gelombang --" ? "" : gelombang,
      jenisTagihan:
        jenisTagihan === "-- Pilih Jenis Tagihan --" ? "" : jenisTagihan,
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
          Laporan Tarif Tagihan
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

          {/* 3. Sistem Kuliah */}
          <FormFieldRow id="sistem-kuliah-select" label="Sistem Kuliah">
            <FormSelect
              id="sistem-kuliah-select"
              value={sistemKuliah}
              options={sistemKuliahUktOptions}
              onChange={setSistemKuliah}
            />
          </FormFieldRow>

          {/* 4. Jalur Pendaftaran */}
          <FormFieldRow id="jalur-pendaftaran-select" label="Jalur Pendaftaran">
            <FormSelect
              id="jalur-pendaftaran-select"
              value={jalurPendaftaran}
              options={jalurPendaftaranUktOptions}
              onChange={setJalurPendaftaran}
            />
          </FormFieldRow>

          {/* 5. Gelombang */}
          <FormFieldRow id="gelombang-select" label="Gelombang">
            <FormSelect
              id="gelombang-select"
              value={gelombang}
              options={gelombangUktOptions}
              onChange={setGelombang}
            />
          </FormFieldRow>

          {/* 6. Jenis Tagihan */}
          <FormFieldRow id="jenis-tagihan-select" label="Jenis Tagihan">
            <FormSelect
              id="jenis-tagihan-select"
              value={jenisTagihan}
              options={jenisTagihanUktOptions}
              onChange={setJenisTagihan}
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
        <LaporanTarifTagihanPreview
          useKop={useKop}
          tahunAkademik={tahunAkademik}
          programStudi={programStudi}
          sistemKuliah={sistemKuliah}
          jalurPendaftaran={jalurPendaftaran}
          gelombang={gelombang}
          jenisTagihan={jenisTagihan}
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

import React, { useState } from "react";
import { IoEye, IoOpenOutline } from "react-icons/io5";
import {
  academicPeriods,
  kelompokUktOptions,
  sistemKuliahUktOptions,
  jalurPendaftaranUktOptions,
  gelombangUktOptions,
  formatOptions,
  programStudiGroups,
} from "../constants/laporanUktData";
import { FormFieldRow } from "../../tagihan/components/FormFieldRow";
import { FormSelect } from "../../tagihan/components/FormSelect";
import { LaporanTarifUktPreview } from "../components/LaporanTarifUktPreview";
import {
  generateLaporanTarifUktHtml,
  type LaporanTarifUktRowData,
} from "../utils/generateLaporanUktHtml";
import {
  exportLaporanTarifUktToPdf,
  exportLaporanTarifUktToExcel,
} from "../utils/exportLaporanUkt";

export default function LaporanTarifUktPage() {
  document.title = "Laporan Tarif UKT - Sistem Informasi Keuangan UIKA";

  // Form State matching Image 2
  const [tahunAkademik, setTahunAkademik] = useState("2026 Ganjil");
  const [programStudi, setProgramStudi] = useState("Universitas Ibn Khaldun");
  const [kelompokUkt, setKelompokUkt] = useState("-- Pilih Kelompok UKT --");
  const [sistemKuliah, setSistemKuliah] = useState("-- Pilih Sistem Kuliah --");
  const [jalurPendaftaran, setJalurPendaftaran] = useState(
    "-- Pilih Jalur Pendaftaran --"
  );
  const [gelombang, setGelombang] = useState("-- Pilih Gelombang --");
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

  // Mock data for Laporan Tarif UKT
  const getMockData = (): LaporanTarifUktRowData[] => {
    const rawData: LaporanTarifUktRowData[] = [
      {
        no: 1,
        prodi: "S1 - Teknik Informatika",
        jalurPendaftaran: "SNMPTN / SNBP",
        sistemKuliah: "Reguler",
        gelombang: "Gelombang 1",
        kelompokUkt: "Kelompok 1",
        nominalTarif: 500000,
        besaranTarif: 500000,
        kuota: 30,
      },
      {
        no: 2,
        prodi: "S1 - Teknik Informatika",
        jalurPendaftaran: "SNMPTN / SNBP",
        sistemKuliah: "Reguler",
        gelombang: "Gelombang 1",
        kelompokUkt: "Kelompok 2",
        nominalTarif: 1000000,
        besaranTarif: 1000000,
        kuota: 45,
      },
      {
        no: 3,
        prodi: "S1 - Teknik Informatika",
        jalurPendaftaran: "SBMPTN / SNBT",
        sistemKuliah: "Reguler",
        gelombang: "Gelombang 1",
        kelompokUkt: "Kelompok 3",
        nominalTarif: 2500000,
        besaranTarif: 2500000,
        kuota: 50,
      },
      {
        no: 4,
        prodi: "S1 - Teknik Informatika",
        jalurPendaftaran: "Mandiri Reguler",
        sistemKuliah: "Reguler",
        gelombang: "Gelombang 2",
        kelompokUkt: "Kelompok 4",
        nominalTarif: 3800000,
        besaranTarif: 3800000,
        kuota: 40,
      },
      {
        no: 5,
        prodi: "S1 - Teknik Informatika",
        jalurPendaftaran: "Mandiri Reguler",
        sistemKuliah: "Kelas Karyawan",
        gelombang: "Gelombang 2",
        kelompokUkt: "Kelompok 5",
        nominalTarif: 4500000,
        besaranTarif: 4500000,
        kuota: 25,
      },
      {
        no: 6,
        prodi: "S1 - Manajemen",
        jalurPendaftaran: "SNMPTN / SNBP",
        sistemKuliah: "Reguler",
        gelombang: "Gelombang 1",
        kelompokUkt: "Kelompok 1",
        nominalTarif: 500000,
        besaranTarif: 500000,
        kuota: 35,
      },
      {
        no: 7,
        prodi: "S1 - Manajemen",
        jalurPendaftaran: "SBMPTN / SNBT",
        sistemKuliah: "Reguler",
        gelombang: "Gelombang 1",
        kelompokUkt: "Kelompok 2",
        nominalTarif: 1000000,
        besaranTarif: 1000000,
        kuota: 40,
      },
      {
        no: 8,
        prodi: "S1 - Manajemen",
        jalurPendaftaran: "Mandiri Reguler",
        sistemKuliah: "Reguler",
        gelombang: "Gelombang 2",
        kelompokUkt: "Kelompok 3",
        nominalTarif: 2200000,
        besaranTarif: 2200000,
        kuota: 30,
      },
      {
        no: 9,
        prodi: "S1 - Ilmu Hukum",
        jalurPendaftaran: "SNMPTN / SNBP",
        sistemKuliah: "Reguler",
        gelombang: "Gelombang 1",
        kelompokUkt: "Kelompok 1",
        nominalTarif: 500000,
        besaranTarif: 500000,
        kuota: 20,
      },
      {
        no: 10,
        prodi: "S1 - Ilmu Hukum",
        jalurPendaftaran: "Mandiri Reguler",
        sistemKuliah: "Reguler",
        gelombang: "Gelombang 2",
        kelompokUkt: "Kelompok 4",
        nominalTarif: 3500000,
        besaranTarif: 3500000,
        kuota: 25,
      },
      {
        no: 11,
        prodi: "S1 - Pendidikan Agama Islam",
        jalurPendaftaran: "Prestasi Tahfidz & Keagamaan",
        sistemKuliah: "Reguler",
        gelombang: "Gelombang 1",
        kelompokUkt: "KIP Kuliah",
        nominalTarif: 0,
        besaranTarif: 0,
        kuota: 15,
      },
      {
        no: 12,
        prodi: "S1 - Kesehatan Masyarakat",
        jalurPendaftaran: "Mandiri Reguler",
        sistemKuliah: "Reguler",
        gelombang: "Gelombang 2",
        kelompokUkt: "Kelompok 6",
        nominalTarif: 5200000,
        besaranTarif: 5200000,
        kuota: 20,
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
          kelompokUkt &&
          kelompokUkt !== "-- Pilih Kelompok UKT --" &&
          item.kelompokUkt !== kelompokUkt
        ) {
          return false;
        }
        if (
          sistemKuliah &&
          sistemKuliah !== "-- Pilih Sistem Kuliah --" &&
          item.sistemKuliah !== sistemKuliah
        ) {
          return false;
        }
        if (
          jalurPendaftaran &&
          jalurPendaftaran !== "-- Pilih Jalur Pendaftaran --" &&
          item.jalurPendaftaran !== jalurPendaftaran
        ) {
          return false;
        }
        if (
          gelombang &&
          gelombang !== "-- Pilih Gelombang --" &&
          item.gelombang !== gelombang
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
        .getElementById("laporan-tarif-ukt-preview")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleLihatTabBaru = async () => {
    const data = getMockData();

    if (selectedFormat === "PDF") {
      await exportLaporanTarifUktToPdf({
        useKop,
        tahunAkademik,
        programStudi,
        kelompokUkt:
          kelompokUkt === "-- Pilih Kelompok UKT --" ? "" : kelompokUkt,
        sistemKuliah:
          sistemKuliah === "-- Pilih Sistem Kuliah --" ? "" : sistemKuliah,
        jalurPendaftaran:
          jalurPendaftaran === "-- Pilih Jalur Pendaftaran --"
            ? ""
            : jalurPendaftaran,
        gelombang: gelombang === "-- Pilih Gelombang --" ? "" : gelombang,
        data,
        formatRupiah,
      });
      return;
    }

    if (selectedFormat === "EXCEL") {
      exportLaporanTarifUktToExcel({
        useKop,
        tahunAkademik,
        programStudi,
        kelompokUkt:
          kelompokUkt === "-- Pilih Kelompok UKT --" ? "" : kelompokUkt,
        sistemKuliah:
          sistemKuliah === "-- Pilih Sistem Kuliah --" ? "" : sistemKuliah,
        jalurPendaftaran:
          jalurPendaftaran === "-- Pilih Jalur Pendaftaran --"
            ? ""
            : jalurPendaftaran,
        gelombang: gelombang === "-- Pilih Gelombang --" ? "" : gelombang,
        data,
      });
      return;
    }

    // HTML Preview in new tab
    const html = generateLaporanTarifUktHtml({
      useKop,
      tahunAkademik,
      programStudi,
      kelompokUkt:
        kelompokUkt === "-- Pilih Kelompok UKT --" ? "" : kelompokUkt,
      sistemKuliah:
        sistemKuliah === "-- Pilih Sistem Kuliah --" ? "" : sistemKuliah,
      jalurPendaftaran:
        jalurPendaftaran === "-- Pilih Jalur Pendaftaran --"
          ? ""
          : jalurPendaftaran,
      gelombang: gelombang === "-- Pilih Gelombang --" ? "" : gelombang,
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
          Laporan Tarif UKT
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

          {/* 3. Kelompok UKT */}
          <FormFieldRow id="kelompok-ukt-select" label="Kelompok UKT">
            <FormSelect
              id="kelompok-ukt-select"
              value={kelompokUkt}
              options={kelompokUktOptions}
              onChange={setKelompokUkt}
            />
          </FormFieldRow>

          {/* 4. Sistem Kuliah */}
          <FormFieldRow id="sistem-kuliah-select" label="Sistem Kuliah">
            <FormSelect
              id="sistem-kuliah-select"
              value={sistemKuliah}
              options={sistemKuliahUktOptions}
              onChange={setSistemKuliah}
            />
          </FormFieldRow>

          {/* 5. Jalur Pendaftaran */}
          <FormFieldRow id="jalur-pendaftaran-select" label="Jalur Pendaftaran">
            <FormSelect
              id="jalur-pendaftaran-select"
              value={jalurPendaftaran}
              options={jalurPendaftaranUktOptions}
              onChange={setJalurPendaftaran}
            />
          </FormFieldRow>

          {/* 6. Gelombang */}
          <FormFieldRow id="gelombang-select" label="Gelombang">
            <FormSelect
              id="gelombang-select"
              value={gelombang}
              options={gelombangUktOptions}
              onChange={setGelombang}
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
        <LaporanTarifUktPreview
          useKop={useKop}
          tahunAkademik={tahunAkademik}
          programStudi={programStudi}
          kelompokUkt={kelompokUkt}
          sistemKuliah={sistemKuliah}
          jalurPendaftaran={jalurPendaftaran}
          gelombang={gelombang}
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

import React, { useState } from "react";
import { IoEye, IoOpenOutline } from "react-icons/io5";
import {
  academicPeriods,
  kelompokUktOptions,
  sistemKuliahUktOptions,
  jalurPendaftaranUktOptions,
  gelombangUktOptions,
  penerimaUktOptions,
  formatOptions,
  programStudiGroups,
} from "../constants/laporanUktData";
import { FormFieldRow } from "../../tagihan/components/FormFieldRow";
import { FormSelect } from "../../tagihan/components/FormSelect";
import { LaporanPenerimaUktPreview } from "../components/LaporanPenerimaUktPreview";
import {
  generateLaporanPenerimaUktHtml,
  type LaporanPenerimaUktRowData,
} from "../utils/generateLaporanUktHtml";
import {
  exportLaporanPenerimaUktToPdf,
  exportLaporanPenerimaUktToExcel,
} from "../utils/exportLaporanUkt";

export default function LaporanPenerimaUktPage() {
  document.title = "Laporan Penerima UKT - Sistem Informasi Keuangan UIKA";

  // Form State matching Image 1
  const [tahunAkademik, setTahunAkademik] = useState("2026 Ganjil");
  const [programStudi, setProgramStudi] = useState("Universitas Ibn Khaldun");
  const [kelompokUkt, setKelompokUkt] = useState("-- Pilih Kelompok UKT --");
  const [sistemKuliah, setSistemKuliah] = useState("-- Pilih Sistem Kuliah --");
  const [jalurPendaftaran, setJalurPendaftaran] = useState(
    "-- Pilih Jalur Pendaftaran --"
  );
  const [gelombang, setGelombang] = useState("-- Pilih Gelombang --");
  const [penerima, setPenerima] = useState("Mahasiswa");
  const [mahasiswaQuery, setMahasiswaQuery] = useState("");
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

  // Realistic mock data for Laporan Penerima UKT
  const getMockData = (): LaporanPenerimaUktRowData[] => {
    const rawData: LaporanPenerimaUktRowData[] = [
      {
        no: 1,
        nim: "2311010001",
        nama: "Ahmad Fauzi",
        prodi: "S1 - Teknik Informatika",
        jalurPendaftaran: "SNMPTN / SNBP",
        sistemKuliah: "Reguler",
        kelompokUkt: "Kelompok 1",
        nominalUkt: 500000,
        tarifNominal: 500000,
        valid: "Ya",
        status: "Lunas",
      },
      {
        no: 2,
        nim: "2311010014",
        nama: "Siti Rahmawati",
        prodi: "S1 - Teknik Informatika",
        jalurPendaftaran: "SBMPTN / SNBT",
        sistemKuliah: "Reguler",
        kelompokUkt: "Kelompok 2",
        nominalUkt: 1000000,
        tarifNominal: 1000000,
        valid: "Ya",
        status: "Lunas",
      },
      {
        no: 3,
        nim: "2312020023",
        nama: "Muhammad Rizky",
        prodi: "S1 - Manajemen",
        jalurPendaftaran: "Mandiri Reguler",
        sistemKuliah: "Reguler",
        kelompokUkt: "Kelompok 3",
        nominalUkt: 2500000,
        tarifNominal: 2500000,
        valid: "Ya",
        status: "Aktif",
      },
      {
        no: 4,
        nim: "2312020045",
        nama: "Nurul Hidayah",
        prodi: "S1 - Manajemen",
        jalurPendaftaran: "Prestasi Tahfidz & Keagamaan",
        sistemKuliah: "Reguler",
        kelompokUkt: "Kelompok 1",
        nominalUkt: 500000,
        tarifNominal: 500000,
        valid: "Ya",
        status: "Lunas",
      },
      {
        no: 5,
        nim: "2313030012",
        nama: "Dimas Pratama",
        prodi: "S1 - Ilmu Hukum",
        jalurPendaftaran: "SNMPTN / SNBP",
        sistemKuliah: "Reguler",
        kelompokUkt: "Kelompok 4",
        nominalUkt: 3500000,
        tarifNominal: 3500000,
        valid: "Ya",
        status: "Aktif",
      },
      {
        no: 6,
        nim: "2314040008",
        nama: "Fathimah Azzahra",
        prodi: "S1 - Pendidikan Agama Islam",
        jalurPendaftaran: "SBMPTN / SNBT",
        sistemKuliah: "Reguler",
        kelompokUkt: "KIP Kuliah",
        nominalUkt: 0,
        tarifNominal: 0,
        valid: "Ya",
        status: "Disetujui",
      },
      {
        no: 7,
        nim: "2311050019",
        nama: "Bagas Setiawan",
        prodi: "S1 - Sistem Informasi",
        jalurPendaftaran: "Mandiri Reguler",
        sistemKuliah: "Kelas Karyawan",
        kelompokUkt: "Kelompok 5",
        nominalUkt: 4500000,
        tarifNominal: 4500000,
        valid: "Ya",
        status: "Aktif",
      },
      {
        no: 8,
        nim: "2312060031",
        nama: "Anisa Putri",
        prodi: "S1 - Akuntansi",
        jalurPendaftaran: "Prestasi Akademik / Olahraga",
        sistemKuliah: "Reguler",
        kelompokUkt: "Kelompok 3",
        nominalUkt: 2500000,
        tarifNominal: 2500000,
        valid: "Ya",
        status: "Lunas",
      },
      {
        no: 9,
        nim: "2315070005",
        nama: "Reza Firmansyah",
        prodi: "S1 - Kesehatan Masyarakat",
        jalurPendaftaran: "Kerjasama / Kemitraan",
        sistemKuliah: "Reguler",
        kelompokUkt: "Kelompok 6",
        nominalUkt: 5500000,
        tarifNominal: 5500000,
        valid: "Ya",
        status: "Aktif",
      },
      {
        no: 10,
        nim: "2311080027",
        nama: "Zahra Amelia",
        prodi: "S1 - Teknologi Pendidikan",
        jalurPendaftaran: "SNMPTN / SNBP",
        sistemKuliah: "Reguler",
        kelompokUkt: "Kelompok 2",
        nominalUkt: 1000000,
        tarifNominal: 1000000,
        valid: "Ya",
        status: "Lunas",
      },
      {
        no: 11,
        nim: "2312090011",
        nama: "Ilham Ramadhan",
        prodi: "S1 - Bisnis Digital",
        jalurPendaftaran: "Mandiri Reguler",
        sistemKuliah: "Reguler",
        kelompokUkt: "Kelompok 4",
        nominalUkt: 3500000,
        tarifNominal: 3500000,
        valid: "Ya",
        status: "Aktif",
      },
      {
        no: 12,
        nim: "2314100034",
        nama: "Aisyah Nuraini",
        prodi: "S1 - Ekonomi Syariah",
        jalurPendaftaran: "Prestasi Tahfidz & Keagamaan",
        sistemKuliah: "Reguler",
        kelompokUkt: "KIP Kuliah",
        nominalUkt: 0,
        tarifNominal: 0,
        valid: "Ya",
        status: "Disetujui",
      },
    ];

    // Filter mock data based on selection
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
        if (mahasiswaQuery.trim()) {
          const q = mahasiswaQuery.toLowerCase();
          return (
            item.nama.toLowerCase().includes(q) ||
            item.nim.toLowerCase().includes(q)
          );
        }
        return true;
      })
      .map((item, idx) => ({ ...item, no: idx + 1 }));
  };

  const handleTampilkan = () => {
    setShowPreview(true);
    setTimeout(() => {
      document
        .getElementById("laporan-penerima-ukt-preview")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleLihatTabBaru = async () => {
    const data = getMockData();

    if (selectedFormat === "PDF") {
      await exportLaporanPenerimaUktToPdf({
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
        penerima,
        data,
        formatRupiah,
      });
      return;
    }

    if (selectedFormat === "EXCEL") {
      exportLaporanPenerimaUktToExcel({
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
        penerima,
        data,
      });
      return;
    }

    // Default HTML
    const html = generateLaporanPenerimaUktHtml({
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
      penerima,
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
          Laporan Penerima UKT
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

          {/* 7. Penerima */}
          <FormFieldRow id="penerima-select" label="Penerima">
            <FormSelect
              id="penerima-select"
              value={penerima}
              options={penerimaUktOptions}
              onChange={setPenerima}
            />
          </FormFieldRow>

          {/* 8. Mahasiswa */}
          <FormFieldRow id="mahasiswa-input" label="Mahasiswa">
            <input
              id="mahasiswa-input"
              type="text"
              value={mahasiswaQuery}
              onChange={(e) => setMahasiswaQuery(e.target.value)}
              placeholder="Cari Mahasiswa"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
            />
          </FormFieldRow>

          {/* 9. Format */}
          <FormFieldRow id="format-select" label="Format">
            <FormSelect
              id="format-select"
              value={selectedFormat}
              options={formatOptions}
              onChange={setSelectedFormat}
            />
          </FormFieldRow>

          {/* 10. KOP */}
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
        <LaporanPenerimaUktPreview
          useKop={useKop}
          tahunAkademik={tahunAkademik}
          programStudi={programStudi}
          kelompokUkt={kelompokUkt}
          sistemKuliah={sistemKuliah}
          jalurPendaftaran={jalurPendaftaran}
          gelombang={gelombang}
          penerima={penerima}
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

import React, { useState } from "react";
import { IoEye, IoOpenOutline } from "react-icons/io5";
import {
  academicPeriods,
  programStudiGroups,
  jenisPotonganOptions,
  namaPotonganOptions,
  penerimaPotonganOptions,
  formatOptions,
} from "../constants/laporanPotonganData";
import { FormFieldRow } from "../../tagihan/components/FormFieldRow";
import { FormSelect } from "../../tagihan/components/FormSelect";
import { LaporanPenerimaPotonganPreview } from "../components/LaporanPenerimaPotonganPreview";
import {
  generateLaporanPenerimaPotonganHtml,
  type LaporanPenerimaPotonganRowData,
} from "../utils/generateLaporanPotonganHtml";
import {
  exportLaporanPenerimaPotonganToPdf,
  exportLaporanPenerimaPotonganToExcel,
} from "../utils/exportLaporanPotongan";

export default function LaporanPenerimaPotonganPage() {
  document.title =
    "Laporan Penerima Potongan - Sistem Informasi Keuangan UIKA";

  // Form State matching Image 1
  const [tahunAkademik, setTahunAkademik] = useState("2026 Ganjil");
  const [programStudi, setProgramStudi] = useState("Universitas Ibn Khaldun");
  const [jenisPotongan, setJenisPotongan] = useState("Potongan");
  const [namaPotongan, setNamaPotongan] = useState("-- Pilih Nama Potongan --");
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

  // Mock data for Laporan Penerima Potongan
  const getMockData = (): LaporanPenerimaPotonganRowData[] => {
    const rawData: LaporanPenerimaPotonganRowData[] = [
      {
        no: 1,
        nim: "2311010005",
        nama: "Muhammad Ilham",
        prodi: "S1 - Teknik Informatika",
        sumber: "Internal UIKA",
        potongan: "Potongan Hafidz Al-Qur'an",
        nominal: 2500000,
        persentase: 50,
        digunakan: "Ya",
        jenisPotongan: "Potongan",
        namaPotongan: "Potongan Hafidz Al-Qur'an",
        nominalPotongan: 2500000,
        status: "Aktif",
      },
      {
        no: 2,
        nim: "2311010022",
        nama: "Dewi Lestari",
        prodi: "S1 - Teknik Informatika",
        sumber: "Internal UIKA",
        potongan: "Potongan Alumni UIKA",
        nominal: 1000000,
        persentase: 20,
        digunakan: "Ya",
        jenisPotongan: "Potongan",
        namaPotongan: "Potongan Alumni UIKA",
        nominalPotongan: 1000000,
        status: "Aktif",
      },
      {
        no: 3,
        nim: "2312020015",
        nama: "Fajar Nugraha",
        prodi: "S1 - Manajemen",
        sumber: "Pemerintah (Kemenag/Kemdikbud)",
        potongan: "Beasiswa KIP Kuliah",
        nominal: 4500000,
        persentase: 100,
        digunakan: "Ya",
        jenisPotongan: "Beasiswa",
        namaPotongan: "Beasiswa KIP Kuliah",
        nominalPotongan: 4500000,
        status: "Aktif",
      },
      {
        no: 4,
        nim: "2312020038",
        nama: "Rina Salsabila",
        prodi: "S1 - Manajemen",
        sumber: "Internal UIKA",
        potongan: "Potongan Prestasi Akademik",
        nominal: 1500000,
        persentase: 30,
        digunakan: "Ya",
        jenisPotongan: "Potongan",
        namaPotongan: "Potongan Prestasi Akademik",
        nominalPotongan: 1500000,
        status: "Aktif",
      },
      {
        no: 5,
        nim: "2313030009",
        nama: "Hendra Wijaya",
        prodi: "S1 - Ilmu Hukum",
        sumber: "Internal UIKA",
        potongan: "Potongan Saudara Kandung",
        nominal: 750000,
        persentase: 15,
        digunakan: "Ya",
        jenisPotongan: "Potongan",
        namaPotongan: "Potongan Saudara Kandung",
        nominalPotongan: 750000,
        status: "Aktif",
      },
      {
        no: 6,
        nim: "2314040017",
        nama: "Khadijah Al-Kubro",
        prodi: "S1 - Pendidikan Agama Islam",
        sumber: "Yayasan Pendidikan Islam UIKA",
        potongan: "Beasiswa Yayasan UIKA",
        nominal: 3000000,
        persentase: 60,
        digunakan: "Ya",
        jenisPotongan: "Beasiswa",
        namaPotongan: "Beasiswa Yayasan UIKA",
        nominalPotongan: 3000000,
        status: "Aktif",
      },
      {
        no: 7,
        nim: "2311050012",
        nama: "Aditya Pratama",
        prodi: "S1 - Sistem Informasi",
        sumber: "Mitra Perbankan (Bank BSI)",
        potongan: "Beasiswa Bank Syariah Indonesia",
        nominal: 3500000,
        persentase: 70,
        digunakan: "Ya",
        jenisPotongan: "Beasiswa",
        namaPotongan: "Beasiswa Bank Syariah Indonesia",
        nominalPotongan: 3500000,
        status: "Aktif",
      },
      {
        no: 8,
        nim: "2315070014",
        nama: "Zaskia Nurhaliza",
        prodi: "S1 - Kesehatan Masyarakat",
        sumber: "Mitra Kerjasama Pemda",
        potongan: "Potongan Kerjasama / Kemitraan",
        nominal: 1250000,
        persentase: 25,
        digunakan: "Ya",
        jenisPotongan: "Potongan",
        namaPotongan: "Potongan Kerjasama / Kemitraan",
        nominalPotongan: 1250000,
        status: "Aktif",
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
          jenisPotongan &&
          jenisPotongan !== "Semua" &&
          item.jenisPotongan !== jenisPotongan
        ) {
          return false;
        }
        if (
          namaPotongan &&
          namaPotongan !== "-- Pilih Nama Potongan --" &&
          item.namaPotongan !== namaPotongan
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
        .getElementById("laporan-penerima-potongan-preview")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleLihatTabBaru = async () => {
    const data = getMockData();

    if (selectedFormat === "PDF") {
      await exportLaporanPenerimaPotonganToPdf({
        useKop,
        tahunAkademik,
        programStudi,
        jenisPotongan,
        namaPotongan:
          namaPotongan === "-- Pilih Nama Potongan --" ? "" : namaPotongan,
        penerima,
        data,
        formatRupiah,
      });
      return;
    }

    if (selectedFormat === "EXCEL") {
      exportLaporanPenerimaPotonganToExcel({
        useKop,
        tahunAkademik,
        programStudi,
        jenisPotongan,
        namaPotongan:
          namaPotongan === "-- Pilih Nama Potongan --" ? "" : namaPotongan,
        penerima,
        data,
      });
      return;
    }

    // Default HTML
    const html = generateLaporanPenerimaPotonganHtml({
      useKop,
      tahunAkademik,
      programStudi,
      jenisPotongan,
      namaPotongan:
        namaPotongan === "-- Pilih Nama Potongan --" ? "" : namaPotongan,
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
          Laporan Penerima Potongan
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

          {/* 3. Jenis Potongan */}
          <FormFieldRow id="jenis-potongan-select" label="Jenis Potongan">
            <FormSelect
              id="jenis-potongan-select"
              value={jenisPotongan}
              options={jenisPotonganOptions}
              onChange={setJenisPotongan}
            />
          </FormFieldRow>

          {/* 4. Nama Potongan */}
          <FormFieldRow id="nama-potongan-select" label="Nama Potongan">
            <FormSelect
              id="nama-potongan-select"
              value={namaPotongan}
              options={namaPotonganOptions}
              onChange={setNamaPotongan}
            />
          </FormFieldRow>

          {/* 5. Penerima */}
          <FormFieldRow id="penerima-select" label="Penerima">
            <FormSelect
              id="penerima-select"
              value={penerima}
              options={penerimaPotonganOptions}
              onChange={setPenerima}
            />
          </FormFieldRow>

          {/* 6. Mahasiswa */}
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
        <LaporanPenerimaPotonganPreview
          useKop={useKop}
          tahunAkademik={tahunAkademik}
          programStudi={programStudi}
          jenisPotongan={jenisPotongan}
          namaPotongan={namaPotongan}
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

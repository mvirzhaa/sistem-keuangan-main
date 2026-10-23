import React, { useState } from "react";
import { IoEye, IoOpenOutline } from "react-icons/io5";
import {
  jenisPotonganOptions,
  rekananOptions,
  periodeAwalOptions,
  periodeAkhirOptions,
  formatOptions,
} from "../constants/laporanPotonganData";
import { FormFieldRow } from "../../tagihan/components/FormFieldRow";
import { FormSelect } from "../../tagihan/components/FormSelect";
import { RekapPotonganBeasiswaPreview } from "../components/RekapPotonganBeasiswaPreview";
import {
  generateRekapPotonganBeasiswaHtml,
  type RekapPotonganBeasiswaRowData,
} from "../utils/generateLaporanPotonganHtml";
import {
  exportRekapPotonganBeasiswaToPdf,
  exportRekapPotonganBeasiswaToExcel,
} from "../utils/exportLaporanPotongan";

export default function RekapPotonganBeasiswaPage() {
  document.title =
    "Rekap Potongan / Beasiswa - Sistem Informasi Keuangan UIKA";

  // Form State matching Image 2
  const [jenisPotongan, setJenisPotongan] = useState("Potongan");
  const [rekanan, setRekanan] = useState("-- Pilih Rekanan --");
  const [periodeAwal, setPeriodeAwal] = useState("-- Semua --");
  const [periodeAkhir, setPeriodeAkhir] = useState("-- Semua --");
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

  // Mock data for Rekap Potongan / Beasiswa
  const getMockData = (): RekapPotonganBeasiswaRowData[] => {
    const rawData: RekapPotonganBeasiswaRowData[] = [
      {
        no: 1,
        namaPotongan: "Potongan Hafidz Al-Qur'an 30 Juz",
        jenis: "Potongan",
        rekanan: "Internal UIKA Bogor",
        periodeAwal: "2024/2025 Ganjil",
        periodeAkhir: "2024/2025 Genap",
        nominal: 2500000,
        persentase: "50%",
        anggaran: 105000000,
        digunakan: 85000000,
        jumlahPenerima: 42,
        totalNominal: 105000000,
      },
      {
        no: 2,
        namaPotongan: "Potongan Alumni UIKA & Keluarga",
        jenis: "Potongan",
        rekanan: "Internal UIKA Bogor",
        periodeAwal: "2024/2025 Ganjil",
        periodeAkhir: "2024/2025 Genap",
        nominal: 1000000,
        persentase: "20%",
        anggaran: 85000000,
        digunakan: 70000000,
        jumlahPenerima: 85,
        totalNominal: 85000000,
      },
      {
        no: 3,
        namaPotongan: "Beasiswa KIP Kuliah Kemendikbud",
        jenis: "Beasiswa",
        rekanan: "Kemendikbudristek (KIP-K)",
        periodeAwal: "2023/2024 Ganjil",
        periodeAkhir: "2024/2025 Genap",
        nominal: 4500000,
        persentase: "100%",
        anggaran: 810000000,
        digunakan: 720000000,
        jumlahPenerima: 180,
        totalNominal: 810000000,
      },
      {
        no: 4,
        namaPotongan: "Beasiswa BAZNAS Cendekia",
        jenis: "Beasiswa",
        rekanan: "BAZNAS RI",
        periodeAwal: "2024/2025 Ganjil",
        periodeAkhir: "2024/2025 Genap",
        nominal: 4000000,
        persentase: "75%",
        anggaran: 140000000,
        digunakan: 120000000,
        jumlahPenerima: 35,
        totalNominal: 140000000,
      },
      {
        no: 5,
        namaPotongan: "Potongan Prestasi Akademik & Tahfidz",
        jenis: "Potongan",
        rekanan: "Internal UIKA Bogor",
        periodeAwal: "2024/2025 Ganjil",
        periodeAkhir: "2024/2025 Genap",
        nominal: 1500000,
        persentase: "30%",
        anggaran: 90000000,
        digunakan: 65000000,
        jumlahPenerima: 60,
        totalNominal: 90000000,
      },
      {
        no: 6,
        namaPotongan: "Beasiswa Bank Syariah Indonesia (BSI)",
        jenis: "Beasiswa",
        rekanan: "Bank Syariah Indonesia (BSI)",
        periodeAwal: "2024/2025 Ganjil",
        periodeAkhir: "2024/2025 Genap",
        nominal: 3500000,
        persentase: "60%",
        anggaran: 175000000,
        digunakan: 150000000,
        jumlahPenerima: 50,
        totalNominal: 175000000,
      },
      {
        no: 7,
        namaPotongan: "Beasiswa Pemda Jabar Juara",
        jenis: "Beasiswa",
        rekanan: "Pemerintah Provinsi Jawa Barat",
        periodeAwal: "2024/2025 Ganjil",
        periodeAkhir: "2024/2025 Genap",
        nominal: 5000000,
        persentase: "100%",
        anggaran: 200000000,
        digunakan: 180000000,
        jumlahPenerima: 40,
        totalNominal: 200000000,
      },
      {
        no: 8,
        namaPotongan: "Beasiswa Yayasan Pendidikan Islam Ibn Khaldun",
        jenis: "Beasiswa",
        rekanan: "Yayasan Pendidikan Islam Ibn Khaldun",
        periodeAwal: "2024/2025 Ganjil",
        periodeAkhir: "2024/2025 Genap",
        nominal: 3000000,
        persentase: "50%",
        anggaran: 195000000,
        digunakan: 160000000,
        jumlahPenerima: 65,
        totalNominal: 195000000,
      },
    ];

    return rawData
      .filter((item) => {
        if (
          jenisPotongan &&
          jenisPotongan !== "Semua" &&
          item.jenis !== jenisPotongan
        ) {
          return false;
        }
        if (
          rekanan &&
          rekanan !== "-- Pilih Rekanan --" &&
          item.rekanan !== rekanan
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
        .getElementById("rekap-potongan-beasiswa-preview")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleLihatTabBaru = async () => {
    const data = getMockData();

    if (selectedFormat === "PDF") {
      await exportRekapPotonganBeasiswaToPdf({
        useKop,
        jenisPotongan,
        rekanan: rekanan === "-- Pilih Rekanan --" ? "" : rekanan,
        periodeAwal: periodeAwal === "-- Semua --" ? "" : periodeAwal,
        periodeAkhir: periodeAkhir === "-- Semua --" ? "" : periodeAkhir,
        data,
        formatRupiah,
      });
      return;
    }

    if (selectedFormat === "EXCEL") {
      exportRekapPotonganBeasiswaToExcel({
        useKop,
        jenisPotongan,
        rekanan: rekanan === "-- Pilih Rekanan --" ? "" : rekanan,
        periodeAwal: periodeAwal === "-- Semua --" ? "" : periodeAwal,
        periodeAkhir: periodeAkhir === "-- Semua --" ? "" : periodeAkhir,
        data,
      });
      return;
    }

    // Default HTML
    const html = generateRekapPotonganBeasiswaHtml({
      useKop,
      jenisPotongan,
      rekanan: rekanan === "-- Pilih Rekanan --" ? "" : rekanan,
      periodeAwal: periodeAwal === "-- Semua --" ? "" : periodeAwal,
      periodeAkhir: periodeAkhir === "-- Semua --" ? "" : periodeAkhir,
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
          Rekap Potongan / Beasiswa
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
          {/* 1. Jenis Potongan */}
          <FormFieldRow id="jenis-potongan-select" label="Jenis Potongan">
            <FormSelect
              id="jenis-potongan-select"
              value={jenisPotongan}
              options={jenisPotonganOptions}
              onChange={setJenisPotongan}
            />
          </FormFieldRow>

          {/* 2. Rekanan */}
          <FormFieldRow id="rekanan-select" label="Rekanan">
            <FormSelect
              id="rekanan-select"
              value={rekanan}
              options={rekananOptions}
              onChange={setRekanan}
            />
          </FormFieldRow>

          {/* 3. Periode Awal */}
          <FormFieldRow id="periode-awal-select" label="Periode Awal">
            <FormSelect
              id="periode-awal-select"
              value={periodeAwal}
              options={periodeAwalOptions}
              onChange={setPeriodeAwal}
            />
          </FormFieldRow>

          {/* 4. Periode Akhir */}
          <FormFieldRow id="periode-akhir-select" label="Periode Akhir">
            <FormSelect
              id="periode-akhir-select"
              value={periodeAkhir}
              options={periodeAkhirOptions}
              onChange={setPeriodeAkhir}
            />
          </FormFieldRow>

          {/* 5. Format */}
          <FormFieldRow id="format-select" label="Format">
            <FormSelect
              id="format-select"
              value={selectedFormat}
              options={formatOptions}
              onChange={setSelectedFormat}
            />
          </FormFieldRow>

          {/* 6. KOP */}
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
        <RekapPotonganBeasiswaPreview
          useKop={useKop}
          jenisPotongan={jenisPotongan}
          rekanan={rekanan}
          periodeAwal={periodeAwal}
          periodeAkhir={periodeAkhir}
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

import {
  academicPeriods,
  formatOptions,
  programStudiGroups,
  type FakultasProdiGroup,
} from "../../tagihan/constants/laporanTagihanData";

export { academicPeriods, formatOptions, programStudiGroups };
export type { FakultasProdiGroup };

export const namaLaporanManualOptions = [
  "-- Pilih Nama Laporan --",
  "Laporan Biodata Mahasiswa",
  "Laporan Pembayaran Manual",
  "Laporan Tagihan Mahasiswa Manual",
  "Laporan Rekap Mahasiswa Manual",
];

export const periodeMasukOptions = ["-- Semua Pilihan --", ...academicPeriods];

export const gelombangManualOptions = [
  "-- Semua Pilihan --",
  "Gelombang 1",
  "Gelombang 2",
  "Gelombang 3",
  "Gelombang Khusus",
];

export const jalurPendaftaranManualOptions = [
  "-- Semua Pilihan --",
  "SNMPTN / SNBP",
  "SBMPTN / SNBT",
  "Mandiri Reguler",
  "Prestasi Tahfidz & Keagamaan",
  "Prestasi Akademik / Olahraga",
  "Kerjasama / Kemitraan",
];

export const sistemKuliahManualOptions = [
  "-- Semua Pilihan --",
  "Reguler",
  "Non-Reguler",
  "Kelas Karyawan",
  "Eksekutif",
];

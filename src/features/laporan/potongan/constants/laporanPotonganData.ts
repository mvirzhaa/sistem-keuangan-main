import {
  academicPeriods,
  formatOptions,
  programStudiGroups,
  type FakultasProdiGroup,
} from "../../tagihan/constants/laporanTagihanData";

export { academicPeriods, formatOptions, programStudiGroups };
export type { FakultasProdiGroup };

export const jenisPotonganOptions = ["Potongan", "Beasiswa", "Semua"];

export const namaPotonganOptions = [
  "-- Pilih Nama Potongan --",
  "Potongan Hafidz Al-Qur'an",
  "Potongan Alumni UIKA",
  "Potongan Prestasi Akademik",
  "Potongan Prestasi Olahraga / Seni",
  "Potongan Kerjasama / Kemitraan",
  "Potongan Saudara Kandung",
  "Beasiswa KIP Kuliah",
  "Beasiswa Pemda Jawa Barat / Bogor",
  "Beasiswa Yayasan UIKA",
  "Beasiswa Bank Syariah Indonesia",
  "Beasiswa BAZNAS",
];

export const penerimaPotonganOptions = ["Mahasiswa", "Calon Mahasiswa"];

export const rekananOptions = [
  "-- Pilih Rekanan --",
  "Internal UIKA Bogor",
  "Pemerintah Daerah Kota / Kab Bogor",
  "Pemerintah Provinsi Jawa Barat",
  "Kementerian Agama RI",
  "Kemendikbudristek (KIP-K)",
  "Yayasan Pendidikan Islam Ibn Khaldun",
  "Bank Syariah Indonesia (BSI)",
  "Bank Muamalat Indonesia",
  "BAZNAS RI",
];

export const periodeAwalOptions = ["-- Semua --", ...academicPeriods];
export const periodeAkhirOptions = ["-- Semua --", ...academicPeriods];

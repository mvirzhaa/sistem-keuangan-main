import {
  academicPeriods,
  jalurPendaftaranOptions,
  gelombangOptions,
  sistemKuliahOptions,
  kelasKuliahOptions,
  formatOptions,
  programStudiGroups,
  jenisTagihanOptions,
  angkatanOptions,
} from "../../tagihan/constants/laporanTagihanData";

export {
  academicPeriods,
  jalurPendaftaranOptions,
  gelombangOptions,
  sistemKuliahOptions,
  kelasKuliahOptions,
  formatOptions,
  programStudiGroups,
  jenisTagihanOptions,
  angkatanOptions,
};

export const metodePembayaranOptions = [
  "-- Semua Metode Pembayaran --",
  "SevimaPay",
  "Transfer Bank",
  "Virtual Account",
  "Cash / Teller",
  "QRIS",
];

export const channelPembayaranOptions = [
  "-- Pilih Channel --",
  "Bank Muamalat",
  "Bank BNI",
  "Bank Mandiri",
  "Bank BSI",
  "Bank BRI",
  "Shopee",
  "Tokopedia",
  "Teller Kampus",
];

export const penerimaPembayaranOptions = [
  "-- Pilih Penerima --",
  "Mahasiswa",
  "Calon Mahasiswa",
  "Pegawai",
  "Dosen",
  "Rekanan / Lainnya",
];

export const statusPembatalanOptions = [
  "-- Pilih Status Pembatalan --",
  "Tidak Batal (Aktif)",
  "Batal",
  "Semua",
];

export const statusPembatalanPerMhsOptions = ["TIDAK", "YA", "SEMUA"];

export const tingkatDistribusiOptions = [
  "Fakultas",
  "Program Studi",
  "Metode Pembayaran",
  "Channel",
];

export const kelasKuliahPembayaranOptions = [
  "Semua Kelas Perkuliahan",
  "Reguler Pagi A",
  "Reguler Pagi B",
  "Reguler Sore / Karyawan",
  "Kelas Eksekutif",
  "Kelas Internasional",
];

export const kolomPivotPembayaranOptions = [
  "-- Pilih Kolom Pivot --",
  "Program Studi",
  "Fakultas",
  "Metode Pembayaran",
  "Channel",
  "Angkatan",
  "Jalur Pendaftaran",
  "Gelombang",
  "Sistem Kuliah",
];

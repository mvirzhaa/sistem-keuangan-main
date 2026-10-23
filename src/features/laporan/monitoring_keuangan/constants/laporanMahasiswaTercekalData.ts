import {
  academicPeriods,
  formatOptions,
  programStudiGroups,
  type FakultasProdiGroup,
} from "../../tagihan/constants/laporanTagihanData";

export { academicPeriods, formatOptions, programStudiGroups };
export type { FakultasProdiGroup };

export const aturanAkademikOptions = [
  "KHS - Melihat KHS",
  "KRS - Pengisian KRS",
  "UTS - Mengikuti Ujian Tengah Semester",
  "UAS - Mengikuti Ujian Akhir Semester",
  "Wisuda - Pendaftaran Wisuda",
  "Yudisium - Pendaftaran Yudisium",
];

export const periodeMasukTercekalOptions = [
  "--- Semua ---",
  ...academicPeriods,
];

export const statusSemesterTercekalOptions = [
  "--- Semua ---",
  "Aktif",
  "Cuti",
  "Non-Aktif",
];

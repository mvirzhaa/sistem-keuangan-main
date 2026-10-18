import { create } from "zustand";
import { persist } from "zustand/middleware";
import { apiService } from "../services/apiService";

export interface JenisTagihanDetail {
  kode: string;
  nama: string;
  label?: string;
}

export interface ReferensiData {
  penerima: string[];
  periode: string[];
  gelombang: string[];
  jalurPendaftaran: string[];
  sistemKuliah: string[];
  programStudi: string[];
  unitKerja: string[];
  statusMahasiswa: string[];
  aturanAkademik: string[];
  jenisAkun: string[];
  frekuensi: string[];
  kelompok: string[];
  kelompokUkt: string[];
  angkatan: string[];
  statusKuliah: string[];
  statusTagihan: string[];
  jenisTagihan: string[];
  metodePembayaran?: string[];
  statusVA?: string[];
  jenisTagihanDetails: JenisTagihanDetail[];
}

export const defaultJenisTagihanDetails: JenisTagihanDetail[] = [
  // Halaman 1 (Gambar 3 & 4)
  { kode: "1000", nama: "UKT KIP Kuliah (A)" },
  { kode: "1001", nama: "UKT KIP Kuliah (B)" },
  { kode: "1002", nama: "UKT KIP Kuliah (C)" },
  { kode: "1011", nama: "Uang Gedung Tahap 1" },
  { kode: "1012", nama: "Uang Gedung Tahap 2" },
  { kode: "1016", nama: "Wakaf Masjid Ibn Khaldun" },
  { kode: "1017", nama: "Wakaf Uang Tunai" },
  { kode: "1018", nama: "TOEFL (Unit Pengembangan Bahasa)" },
  { kode: "1020", nama: "SPP" },
  { kode: "1022", nama: "SPP Cuti Akademik" },
  { kode: "1023", nama: "WORKSHOP TEKNOLOGI PEMBEKALAN PLP" },
  { kode: "1030", nama: "Ta'aruf" },
  { kode: "1040", nama: "Heregistrasi" },
  { kode: "1050", nama: "UPM (Uang Pembinaan Mahasiswa)" },
  { kode: "1060", nama: "Ijazah" },
  { kode: "1061", nama: "Biaya Pemeliharaan Ijazah" },
  { kode: "1070", nama: "Wisuda" },
  { kode: "1080", nama: "Perpustakaan Pusat" },
  { kode: "1090", nama: "Sumbangan Fasilitas" },
  { kode: "1119", nama: "Biaya Pendaftaran Rusunawa" },
  { kode: "1120", nama: "Rusunawa" },
  { kode: "1160", nama: "KKN" },
  { kode: "1200", nama: "SKS Semester 1" },
  { kode: "1210", nama: "Ujian Akhir Semester" },
  { kode: "1220", nama: "SKS RPL Konversi" },
  { kode: "1250", nama: "UKT MHB" },
  { kode: "1251", nama: "UKT Afirmasi UIKA" },
  { kode: "1252", nama: "UKT" },
  { kode: "1253", nama: "UKT Orang Tua Asuh" },
  { kode: "2010", nama: "PRAKTEK KOMPUTER (FKIP)" },
  { kode: "2011", nama: "PRAKTEK FOTOGRAFI (FKIP)" },
  { kode: "2015", nama: "PRAKTEK PENGEMBANGAN MEDIA GRAFIS (FKIP)" },
  { kode: "2017", nama: "BIMBINGAN SKRIPSI (FKIP)" },
  { kode: "2018", nama: "UJIAN SIDANG SKRIPSI (FKIP)" },
  { kode: "2019", nama: "BIMBINGAN SKRIPSI LEWAT WAKTU (FKIP)" },
  { kode: "2020", nama: "PESANTREN CALON WISUDAWAN (FKIP)" },
  { kode: "2021", nama: "PLP (FKIP)" },
  { kode: "2024", nama: "PRAKTEK PENGELOLAAN PUSAT SUMBER BELAJAR" },
  { kode: "2027", nama: "Praktek Media Audio (FKIP)" },
  { kode: "2032", nama: "SUMBANGAN ALUMNI (FKIP)" },
  { kode: "2034", nama: "PRAKTEK MEDIA ANIMASI" },
  { kode: "2035", nama: "PRAKTEK PENGEMBANGAN WEB PEMBELAJARAN" },
  { kode: "2038", nama: "PRAKTEK PENGEMBANGAN MEDIA VIDEO" },
  { kode: "2040", nama: "iTELL (FKIP)" },
  { kode: "2041", nama: "MICRO TEACHING (FKIP)" },
  { kode: "2042", nama: "TOEFL (FKIP)" },
  { kode: "2043", nama: "SEMINAR PROPOSAL (FKIP)" },
  { kode: "2045", nama: "PRAKTEK MEDIA AUGMENTED (FKIP)" },
  { kode: "2046", nama: "PRAKTEK BAHAN PEMBELAJARAN CETAK DAN DIGITAL(FKIP)" },
  { kode: "2048", nama: "ENGLISH SCORE BRITISH COUNSIL (FKIP)" },
  { kode: "2049", nama: "PRAKTEK E-LEARNING (FKIP)" },
  { kode: "2050", nama: "PRAKTIKUM PVDF" },
  { kode: "2051", nama: "PRAKTEK DASAR TEKNIK MENJAHIT" },
  { kode: "2052", nama: "PRAKTEK TEKNIK MENJAHIT LANJUTAN" },
  { kode: "2053", nama: "PRAKTEK BUSANA WANITA" },
  { kode: "2054", nama: "PRAKTEK BUSANA PRIA" },
  { kode: "2055", nama: "PRAKTEK TAILORING" },
  { kode: "2056", nama: "Biaya Kuliah Mandiri" },
  { kode: "2057", nama: "PRAKTEK GAMES PEMBELAJARAN" },
  { kode: "3202", nama: "Buku Panduan Penulisan Skripsi (FH)" },
  { kode: "3203", nama: "Seminar Pra Skripsi (FH)" },
  { kode: "3204", nama: "SK Bimbingan Skripsi )FH)" },
  { kode: "3205", nama: "Sidang Skripsi (FH)" },
  { kode: "3206", nama: "Yudicium (FH)" },
  { kode: "3207", nama: "Alumni (FH)" },
  { kode: "3212", nama: "UTS Susulan (FH)" },
  { kode: "3213", nama: "UAS Susulan (FH)" },
  { kode: "3214", nama: "Remedial Teaching (FH)" },
  { kode: "3215", nama: "Kelas Khusus (FH)" },
  { kode: "3216", nama: "Publish Jurnal (FH)" },
  { kode: "4017", nama: "Remedial Teaching" },
  { kode: "4030", nama: "Seminar Proposal" },
  { kode: "4040", nama: "Sidang Skripsi" },
  { kode: "4051", nama: "Sumbangan Alumni" },
  { kode: "4085", nama: "Biaya Buku Panduan Skripsi" },
  { kode: "4096", nama: "Ujian Sidang Komprehensif" },
  { kode: "4102", nama: "Biaya Seminar Hasil" },
  { kode: "4103", nama: "TOEFL" },
  { kode: "5010", nama: "PPL/PPK/PPA" },
  { kode: "5030", nama: "Komprehensif" },
  { kode: "5040", nama: "Munaqasah" },
  { kode: "5063", nama: "Program Kuliah Pare (B.Inggris)" },
  { kode: "5066", nama: "TA AWUN" },
  { kode: "5067", nama: "Remedial Teaching" },
  { kode: "5068", nama: "Yudisium FAI" },
  { kode: "6010", nama: "Praktikum Basis Data" },

  // Halaman 2 (Gambar 5)
  { kode: "6023", nama: "Praktikum Komputasi Berbasis Jaringan" },
  { kode: "6032", nama: "Kerja Praktik" },
  { kode: "6033", nama: "Seminar Proposal" },
  { kode: "6034", nama: "Seminar Hasil" },
  { kode: "6035", nama: "Sidang Skripsi" },
  { kode: "6047", nama: "Praktikum Penginderaan Jauh I" },
  { kode: "6049", nama: "Praktikum Proses Produksi" },
  { kode: "6051", nama: "Praktikum Teknologi Beton" },
  { kode: "6052", nama: "Praktikum Ilmu Ukur Tanah" },
  { kode: "6053", nama: "Praktikum Hidrolika" },
  { kode: "6054", nama: "Praktikum Fisika Fluida" },
  { kode: "6055", nama: "Praktikum Fisika Dasar" },
  { kode: "6056", nama: "Praktikum Teknik Tenaga Listrik" },
  { kode: "6057", nama: "Praktikum CAD/CAM" },
  { kode: "6062", nama: "Praktikum Rangkaian Listrik" },
  { kode: "6066", nama: "Praktikum Elektronika Daya" },
  { kode: "6067", nama: "Praktikum Mesin-Mesin Elektrik" },
  { kode: "6071", nama: "Praktikum Perancangan & Pemrograman Web" },
  { kode: "6073", nama: "Praktikum Rekayasa Perangkat Lunak" },
  { kode: "6075", nama: "Praktikum Jaringan Komputer" },
  { kode: "6077", nama: "Praktikum Desain & Pemograman Berorientasi Obyek" },
  { kode: "6078", nama: "Praktikum Rekayasa Perangkat Lunak Lanjut" },
  { kode: "6082", nama: "Praktikum Aplikasi Jaringan" },
  { kode: "6083", nama: "Praktikum Sistem Embedded & Waktu Nyata" },
  { kode: "6085", nama: "Praktikum Sistem Informasi Geografis" },
  { kode: "6086", nama: "Praktikum Penginderaan Jauh II" },
  { kode: "6088", nama: "Praktikum Pengembangan Sistem Enterprice" },
  { kode: "6089", nama: "Praktikum Manajemen Jaringan" },
  { kode: "6095", nama: "Kolokium" },
  { kode: "6096", nama: "Praktikum Mekanika Tanah" },
  { kode: "6097", nama: "Praktikum pengenalan sistem kontrol" },
  { kode: "6098", nama: "Praktikum Teknik Digital dan Rangkaian Logika" },
  { kode: "6104", nama: "Praktikum Bahasa Pemrograman Komputer" },
  { kode: "6105", nama: "Yudisium (FTS)" },
  { kode: "6112", nama: "Praktikum Menggambar Teknik" },
  { kode: "6113", nama: "Praktikum Fisika Dasar II" },
  { kode: "6114", nama: "Praktikum Menggambar Mesin dan Peng Dsr. Cad" },
  { kode: "6115", nama: "Praktikum Material Teknik" },
  { kode: "6116", nama: "Praktikum Fisika 1" },
  { kode: "6118", nama: "Praktikum Pengenalan Elektronika" },
  { kode: "6119", nama: "Praktikum Algoritma dan pemrograman" },
  { kode: "6122", nama: "Praktikum Fisika Listrik dan Magnet" },
  { kode: "6123", nama: "Praktikum Pemeteaan GIS" },
  { kode: "6124", nama: "Praktikum Teknologi Bahan Kontruksi" },
  { kode: "6125", nama: "Prak. Teknik Digital & Rangkaian Logika" },
  { kode: "6127", nama: "Prak. Mekatronika" },
  { kode: "6129", nama: "Prak. Rangkaian Listrik II" },
  { kode: "6131", nama: "Prak. Pengukuran Teknik" },
  { kode: "6132", nama: "Praktikum Metode Numerik" },
  { kode: "6133", nama: "Praktikum Sistem Informasi" },
  { kode: "6134", nama: "Praktikum Pemrograman Berorientasi Obyek" },
  { kode: "6135", nama: "Prak. Rekayasa Lalu Lintas" },
  { kode: "61351", nama: "Praktikum Kimia Lingkungan Lanjut" },
  { kode: "6136", nama: "Praktikum Mekanika Tanah II" },
  { kode: "6137", nama: "Prak. Sistem Transportasi" },
  { kode: "6138", nama: "Pengantar Teknik Komputer" },
  { kode: "6139", nama: "Praktikum Dasar Bahasa Pemrograman" },
  { kode: "6140", nama: "Prak. Perpindahan Kalor dan Massa" },
  { kode: "6141", nama: "Prak. Sistem Fluida" },
  { kode: "6142", nama: "Prak. Getaran Mekanik" },
  { kode: "6147", nama: "Praktikum Perancangan Geometrik Jalan" },
  { kode: "6148", nama: "Praktikum Teknologi Multimedia" },
  { kode: "6149", nama: "Praktikum Pemrograman Perangkat Bergerak" },
  { kode: "6150", nama: "Praktikum Mesin Konversi Energi" },
  { kode: "6151", nama: "Praktikum Keamanan Jaringan Komputer" },
  { kode: "6152", nama: "Praktikum Pemrograman Spasial" },
  { kode: "6154", nama: "Praktikum Perkerasa Jalan" },
  { kode: "6158", nama: "Praktikum Fisika Teknik" },
  { kode: "6160", nama: "Praktikum Bahasa Inggris" },
  { kode: "6162", nama: "Praktikum Menggambar Rekayasa" },
  { kode: "6164", nama: "Praktikum Analisis Struktur Metode Matrik" },
  { kode: "6168", nama: "Praktikum Instrumentasi & Pengukuran Besaran Listrik" },
  { kode: "6170", nama: "Praktikum Keamanan Informasi" },
  { kode: "6171", nama: "Praktikum Pengenalan PLC" },
  { kode: "6172", nama: "Praktikum Augmented Reality" },
  { kode: "6173", nama: "Praktikum Cloud Computing" },
  { kode: "6174", nama: "Praktikum Teknik Iluminasi dan Instalasi Listrik" },
  { kode: "6175", nama: "Praktikum Organisasi Komputer dan Sistem Operasi" },
  { kode: "6176", nama: "Praktikum Struktur Data dan Algortima" },
  { kode: "6178", nama: "Praktikum Permodelan dan Simulasi" },
  { kode: "6179", nama: "Praktikum Dasar Pemrograman WEB" },
  { kode: "6180", nama: "Praktikum Konfigurasi Sistem Operasi dan Pengaguna" },
  { kode: "6181", nama: "Praktikum Perancangan Basis Data" },

  // Halaman 3 & 4 (Gambar Tambahan)
  { kode: "6182", nama: "Praktikum Dasar Agronomi" },
  { kode: "6183", nama: "Praktikum Menggambar Teknik RPB" },
  { kode: "6184", nama: "Praktikum Mekanika Fluida RPB" },
  { kode: "6185", nama: "Praktikum Permodelan Spasial" },
  { kode: "6186", nama: "Praktikum Data Mining" },
  { kode: "6187", nama: "Praktikum Machine Learning" },
  { kode: "6188", nama: "Praktikum Transformasi Digital" },
  { kode: "6189", nama: "Praktikum Visualisasi Data" },
  { kode: "6190", nama: "Praktikum Statistik Terapan" },
  { kode: "6191", nama: "Praktikum Desain Antar Muka Pengguna" },
  { kode: "6192", nama: "Praktikum Jaringan dan Komunikasi Komputer" },
  { kode: "6193", nama: "Praktikum Manajemen Data dan Informasi" },
  { kode: "6194", nama: "Praktikum Deep Learning" },
  { kode: "6195", nama: "Praktikum Kontrol Mesin Industri" },
  { kode: "6196", nama: "Praktikum Data Warehouse dan Data Mining" },
  { kode: "6197", nama: "Praktikum Analisa dan Desain Sistem Informasi" },
  { kode: "6198", nama: "Praktikum Analisis Bisnis" },
  { kode: "6199", nama: "Praktikum Data dan DBMS" },
  { kode: "6201", nama: "Praktikum Geospasial Artificial Int" },
  { kode: "6202", nama: "Praktikum Knowledge Graph" },
  { kode: "6204", nama: "Praktikum Pengenalan Pola" },
  { kode: "6205", nama: "Praktikum Perencanaan Irigasi dan Bangunan Air" },
  { kode: "6206", nama: "Praktikum Mesin-Mesin Elektrik II" },
  { kode: "6207", nama: "Praktikum Perancangan dan Pemrograman E-Business" },
  { kode: "6208", nama: "Praktikum Proyek Manajemen Bidang Sistem Informasi" },
  { kode: "6209", nama: "Praktikum Metode Penelitian Bidang Sistem Informas" },
  { kode: "6210", nama: "Praktikum Proyek Aplikasi Bisnis" },
  { kode: "6211", nama: "Praktikum Komputasi Kolaboratif" },
  { kode: "6216", nama: "Praktikum Fisika Dasar RPB" },
  { kode: "6218", nama: "Praktikum Pengolahan Citra" },
  { kode: "6220", nama: "Praktikum Pengujian dan Implementasi Sistem" },
  { kode: "6221", nama: "Praktikum Keamanan Sistem Informasi" },
  { kode: "6222", nama: "Praktikum Inovasi SI dan Teknologi" },
  { kode: "6223", nama: "Praktikum Sistem Enterprise" },
  { kode: "6224", nama: "Praktikum Business Intelligence" },
  { kode: "6225", nama: "Praktikum Aplikasi Komputer Teknik Sipil" },
  { kode: "6226", nama: "Praktikum Manajemen Proses Bisnis" },
  { kode: "6227", nama: "Praktikum Teknik Penyimpanan dan Pengemasan" },
  { kode: "6228", nama: "Praktikum Mekatronika dan Robotika Pertanian" },
  { kode: "6229", nama: "Praktikum Rancangan Teknik" },
  { kode: "6230", nama: "Praktikum Ilmu Ukur Wilayah RPB" },
  { kode: "6231", nama: "Praktikum Listrik dan Elektronika RPB" },
  { kode: "6232", nama: "Praktikum Algoritma dan Pemrograman Komputer TE" },
  { kode: "6233", nama: "Praktikum Elektronika Dasar" },
  { kode: "6234", nama: "Praktikum Fisika II TE" },
  { kode: "6235", nama: "Praktikum Toksikologi Lingkungan" },
  { kode: "6237", nama: "Praktikum Produk Bersih" },
  { kode: "6333", nama: "Praktikum Menggambar Struktur Bangunan Teknik Sipil" },
  { kode: "6334", nama: "Praktikum Algoritma dan Dasar Pemrograman SI" },
  { kode: "6335", nama: "Praktikum Kimia Dasal IL" },
  { kode: "6336", nama: "Praktikum Biologi Dasar IL" },
  { kode: "6338", nama: "Praktikum - Mikrobiologi Lingkungan" },
  { kode: "6339", nama: "Praktikum Biokimia Bioproses" },
  { kode: "6340", nama: "Praktikum Alat dan Mesin Pertanian" },
  { kode: "6341", nama: "Praktikum Teknik Pasca Panen" },
  { kode: "6342", nama: "Praktikum Instrumentasi dan Kontrol" },
  { kode: "6343", nama: "Praktikum Evaluasi Non Destruktif" },
  { kode: "6344", nama: "Praktikum Pengetahuan Bahan Teknik RPB" },
  { kode: "6345", nama: "Praktikum Hidrologi Untuk Pertanian RPB" },
  { kode: "6346", nama: "Praktikum Menggambar Mesin" },
  { kode: "6347", nama: "Praktikum Sistem Pengolahan Limbah" },
  { kode: "6348", nama: "Praktikum Geostatistik Lingkungan" },
  { kode: "6349", nama: "Praktikum Analisis dan Monitoring Kualitias Lingkungan" },
  { kode: "6350", nama: "Praktikum SQL" },
  { kode: "6352", nama: "Praktikum Ekologi Dasar" },
  { kode: "6353", nama: "Internet of Things" },
  { kode: "6354", nama: "praktikum Struktur Data" },
  { kode: "6355", nama: "Praktikum Permodelan Proses Bisnis" },
  { kode: "6356", nama: "Praktikum Phyton Object Oriented Programming" },
  { kode: "6357", nama: "Praktikum English For IT Business Communication" },
  { kode: "6358", nama: "Praktikum Perancangan Sistem" },
  { kode: "6359", nama: "Praktikum Dasar Komputer Teknik Sipil" },
  { kode: "7104", nama: "Bimbingan Skripsi" },
  { kode: "7107", nama: "Seminar Proposal (FIKES)" },
  { kode: "7110", nama: "Sidang Skripsi (FIKES)" },
  { kode: "7123", nama: "Praktikum Gizi" },
  { kode: "7124", nama: "Praktikum Biomedik" },
  { kode: "7126", nama: "PBL dan LKP" },
  { kode: "7133", nama: "Praktikum Kesling" },
  { kode: "7134", nama: "SKS Skripsi" },
  { kode: "7135", nama: "TOEFL (FIKES)" },
  { kode: "7136", nama: "Pelatiham TOEFL FIKES" },
  { kode: "9800", nama: "Biaya Awal Masuk - Pasca" },
  { kode: "FRM", nama: "Formulir" },
  { kode: "Maba", nama: "Uang Pendaftaran (Tidak digunakan)" },
  { kode: "PPG", nama: "Biaya Awal Perkuliahan" },
  { kode: "SKS", nama: "SKS" },
  { kode: "UAS", nama: "UAS (Tidak digunakan)" },
  { kode: "UKT", nama: "UKT" },
  { kode: "UPM", nama: "UPM (Tidak digunakan)" },
];

const defaultReferensiData: ReferensiData = {
  penerima: ["Mahasiswa", "Pendaftar"],
  periode: [
    "-- Semua --",
    "2026 Ganjil",
    "2026 Genap",
    "2025 Ganjil",
    "2025 Genap",
    "2024 Ganjil",
    "2024 Genap",
    "2023 Ganjil",
    "2023 Genap",
  ],
  gelombang: [
    "-- Semua Gelombang --",
    "Gelombang 1",
    "Gelombang 2",
    "Gelombang 3",
  ],
  jalurPendaftaran: [
    "-- Semua --",
    "BEASISWA KIP",
    "SELEKSI MANDIRI",
    "BEASISWA PRESTASI",
    "SBMPTN",
    "SNMPTN",
    "PMDK",
    "Undangan",
    "Reguler",
    "Transfer",
  ],
  sistemKuliah: [
    "-- Semua Sistem Kuliah --",
    "Reguler",
    "Non Reguler",
    "Kelas Karyawan",
    "Online",
    "Reguler Sore",
  ],
  programStudi: [
    "-- Semua --",
    "Universitas Ibn Khaldun",
    "S1 - Akuntansi",
    "S1 - Ilmu Hukum",
    "S1 - Teknik Sipil",
    "S1 - Teknik Informatika",
    "S1 - Sistem Informasi",
    "S1 - Manajemen",
    "S2 - Pendidikan Agama Islam (S2)",
  ],
  unitKerja: [
    "Universitas Ibn Khaldun",
    "Fakultas Agama Islam",
    "Fakultas Keguruan dan Ilmu Pendidikan",
    "Fakultas Ekonomi dan Bisnis",
    "Fakultas Teknik dan Sains",
    "Fakultas Hukum",
    "Fakultas Ilmu Kesehatan",
    "Sekolah Pascasarjana",
  ],
  statusMahasiswa: [
    "-- Semua --",
    "Aktif",
    "Cuti",
    "Non Aktif",
    "Lulus",
    "Keluar",
    "Drop Out",
  ],
  aturanAkademik: [
    "KHS - Melihat KHS",
    "KRS - Melakukan KRS",
    "UAS - Mengikuti UAS",
    "UTS - Mengikuti UTS",
    "Perwalian - Melakukan Perwalian",
    "KKN - Mengikuti KKN",
  ],
  jenisAkun: [
    "-- Semua --",
    "Biaya Kuliah",
    "Biaya Registrasi",
    "Biaya Wisuda",
    "UKT",
  ],
  frekuensi: ["-- Semua --", "Harian", "Bulanan", "Semesteran", "Tahunan"],
  kelompok: [
    "-- Semua Kelompok --",
    "01 - Kuliah",
    "UKT",
    "SPP",
    "Denda",
    "Wisuda",
    "Praktikum",
  ],
  kelompokUkt: [
    "-- Semua Kelompok UKT --",
    "Kelompok UKT 1",
    "Kelompok UKT 2",
    "Kelompok UKT 3",
    "Kelompok UKT 4",
    "Kelompok UKT 5",
  ],
  angkatan: [
    "-- Semua --",
    "2027 Ganjil",
    "2026 Ganjil",
    "2026 Genap",
    "2025 Ganjil",
    "2025 Genap",
    "2024 Ganjil",
    "2023 Ganjil",
    "2022 Ganjil",
  ],
  statusKuliah: [
    "-- Semua Status Kuliah --",
    "Aktif",
    "Cuti",
    "Non Aktif",
    "Lulus",
    "Keluar",
    "Drop Out",
  ],
  statusTagihan: [
    "-- Semua Status Tagihan --",
    "Lunas",
    "Belum Lunas",
    "Menunggu Pembayaran",
    "Dibatalkan",
  ],
  jenisTagihan: [
    "-- Semua Jenis Tagihan --",
    "BPP Pokok",
    "BPP SKS",
    "UKT",
    "Praktikum",
    "Wisuda",
  ],
  metodePembayaran: [
    "-- Semua Metode Pembayaran --",
    "Bank Muamalat",
    "Shopee",
    "Tokopedia",
    "Transfer",
    "QRIS",
    "Virtual Account",
  ],
  statusVA: [
    "-- Semua Status --",
    "Aktif",
    "Lunas",
    "Batal",
  ],
  jenisTagihanDetails: defaultJenisTagihanDetails,
};

interface ReferensiState {
  data: ReferensiData;
  isLoading: boolean;
  error: string | null;
  lastFetched: number | null;
  fetchReferensi: (force?: boolean) => Promise<void>;
}

export const useReferensiStore = create<ReferensiState>()(
  persist(
    (set, get) => ({
      data: defaultReferensiData,
      isLoading: false,
      error: null,
      lastFetched: null,

      fetchReferensi: async (force = false) => {
        const { lastFetched, isLoading } = get();
        // Cache selama 5 menit jika tidak dipaksa (force)
        if (!force && lastFetched && Date.now() - lastFetched < 5 * 60 * 1000) {
          return;
        }

        if (isLoading) return;

        set({ isLoading: true, error: null });

        try {
          const response = await apiService.get<ReferensiData>("/referensi");
          if (response && response.data) {
            set((state) => ({
              data: {
                ...state.data,
                ...response.data,
                jenisTagihanDetails:
                  response.data.jenisTagihanDetails &&
                  response.data.jenisTagihanDetails.length > 0
                    ? response.data.jenisTagihanDetails
                    : defaultReferensiData.jenisTagihanDetails,
              },
              isLoading: false,
              lastFetched: Date.now(),
            }));
          } else {
            set({ isLoading: false });
          }
        } catch (err: any) {
          console.warn("Gagal memuat master referensi dari API:", err);
          set({
            error: err?.message || "Gagal memuat master referensi",
            isLoading: false,
          });
        }
      },
    }),
    {
      name: "referensi-store",
      partialize: (state) => ({
        data: state.data,
        lastFetched: state.lastFetched,
      }),
      merge: (persistedState: any, currentState: ReferensiState) => {
        const mergedData: ReferensiData = {
          ...defaultReferensiData,
          ...(persistedState?.data || {}),
        };

        // Pastikan jenisTagihanDetails tidak kosong jika di-load dari cache lama
        if (
          !mergedData.jenisTagihanDetails ||
          mergedData.jenisTagihanDetails.length < defaultJenisTagihanDetails.length
        ) {
          mergedData.jenisTagihanDetails = defaultJenisTagihanDetails;
        }

        return {
          ...currentState,
          ...persistedState,
          data: mergedData,
        };
      },
    },
  ),
);

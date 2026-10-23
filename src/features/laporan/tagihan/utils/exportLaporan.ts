import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import type { ReportRowData } from "./generateLaporanHtml";
import type { RekapRowData } from "./generateLaporanRekapHtml";
import type { PerwalianRowData } from "./generateTagihanPerwalianHtml";
import type { PivotRowData } from "./generateLaporanPivotHtml";

interface ExportLaporanParams {
  useKop?: boolean;
  selectedPenerima: string;
  selectedPeriods: string[];
  selectedStatus?: string;
  selectedProdi?: string;
  selectedJenisTagihan?: string;
  reportData: ReportRowData[];
  formatRupiah?: (num: number) => string;
}

// Helper untuk load image ke base64 agar bisa dirender di PDF
const loadImageAsBase64 = (url: string): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL("image/png"));
        } else {
          resolve("");
        }
      } catch (e) {
        console.warn("Gagal konversi gambar ke Base64:", e);
        resolve("");
      }
    };
    img.onerror = () => resolve("");
    img.src = url;
  });
};

/**
 * Export Laporan Tagihan ke PDF dengan KOP Resmi UIKA
 */
export async function exportLaporanToPdf(params: ExportLaporanParams): Promise<void> {
  const {
    useKop = true,
    selectedPenerima,
    selectedPeriods,
    selectedStatus,
    selectedProdi,
    selectedJenisTagihan,
    reportData,
    formatRupiah = (n) => `Rp ${n.toLocaleString("id-ID")}`,
  } = params;

  // Orientasi Landscape untuk tabel data tagihan agar proporsional
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let currentY = 12;

  // Render KOP jika useKop === true
  if (useKop) {
    try {
      const logoBase64 = await loadImageAsBase64("/images/logo-uika.png");
      if (logoBase64) {
        // Logo di sebelah kiri KOP
        doc.addImage(logoBase64, "PNG", 18, currentY - 5, 20, 20);
      }
    } catch {
      // Jika logo gagal dimuat, tetap lanjutkan render teks
    }

    // Teks KOP UIKA
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(20, 20, 20);
    doc.text("UNIVERSITAS IBN KHALDUN BOGOR", pageWidth / 2, currentY + 3, {
      align: "center",
    });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    doc.text(
      "Jl KH Sholeh Iskandar KM 2 Kedung Badak Bogor",
      pageWidth / 2,
      currentY + 8.5,
      { align: "center" }
    );
    doc.setFontSize(8.5);
    doc.text(
      "Website : uika-bogor.ac.id/ e-Mail :mail@uika-bogor.ac.id / Telepon :0251-8356884",
      pageWidth / 2,
      currentY + 13.5,
      { align: "center" }
    );

    // Garis Ganda Pembatas KOP
    currentY += 18;
    doc.setDrawColor(20, 20, 20);
    doc.setLineWidth(0.6); // Garis tebal atas
    doc.line(15, currentY, pageWidth - 15, currentY);
    doc.setLineWidth(0.2); // Garis tipis bawah
    doc.line(15, currentY + 0.8, pageWidth - 15, currentY + 0.8);

    currentY += 5;
  }

  // Judul Laporan
  const periodeStr =
    selectedPeriods.length > 0 ? selectedPeriods.join(", ") : "SEMUA PERIODE";
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(20, 20, 20);
  doc.text(
    `TAGIHAN ${selectedPenerima.toUpperCase()} PERIODE ${periodeStr.toUpperCase()}`,
    pageWidth / 2,
    currentY + 2,
    { align: "center" }
  );

  currentY += 8;

  // Metadata Filter Ringkas
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(80, 80, 80);

  const filterTextLeft = `Program Studi : ${selectedProdi || "Semua Program Studi"} | Jenis : ${selectedJenisTagihan || "Semua Jenis Tagihan"}`;
  const filterTextRight = `Status : ${selectedStatus || "Semua Status"} | Tgl Cetak : ${new Date().toLocaleDateString("id-ID")}`;

  doc.text(filterTextLeft, 15, currentY);
  doc.text(filterTextRight, pageWidth - 15, currentY, { align: "right" });

  currentY += 3;

  // Persiapan data tabel untuk autoTable (16 kolom sesuai spesifikasi)
  const tableHeaders = [
    [
      "No.",
      "Kode Tagihan",
      "NIM",
      "Nama",
      "Program Studi",
      "Periode",
      "Jenis Tagihan",
      "Cicilan",
      "Bulan",
      "Tagihan",
      "Denda",
      "Potongan",
      "Pembayaran",
      "Lunas?",
      "Sisa Tagihan",
      "Suspend?",
    ],
  ];

  const tableBody = reportData.map((row) => [
    row.no.toString(),
    row.kodeTagihan,
    row.nim,
    row.nama,
    row.prodi,
    row.periode,
    row.jenisTagihan,
    row.cicilan,
    row.bulan,
    formatRupiah(row.nominal),
    formatRupiah(row.denda),
    formatRupiah(row.potongan),
    formatRupiah(row.bayar),
    row.status,
    formatRupiah(row.sisa),
    row.suspend,
  ]);

  // Generate tabel dengan autoTable
  autoTable(doc, {
    startY: currentY,
    head: tableHeaders,
    body: tableBody,
    margin: { left: 12, right: 12 },
    styles: {
      fontSize: 7.5,
      cellPadding: 1.8,
      lineColor: [210, 215, 220],
      lineWidth: 0.1,
      textColor: [35, 40, 50],
    },
    headStyles: {
      fillColor: [30, 58, 138], // Navy #1e3a8a
      textColor: [255, 255, 255],
      fontStyle: "bold",
      halign: "center",
      valign: "middle",
      fontSize: 7.5,
    },
    columnStyles: {
      0: { halign: "center", cellWidth: 8 },
      1: { halign: "center", cellWidth: 23 },
      2: { halign: "center", cellWidth: 20 },
      3: { halign: "left", cellWidth: 28, fontStyle: "bold" },
      4: { halign: "left", cellWidth: 27 },
      5: { halign: "center", cellWidth: 16 },
      6: { halign: "left", cellWidth: 18 },
      7: { halign: "center", cellWidth: 12 },
      8: { halign: "center", cellWidth: 12 },
      9: { halign: "right", cellWidth: 20 },
      10: { halign: "right", cellWidth: 14 },
      11: { halign: "right", cellWidth: 15 },
      12: { halign: "right", cellWidth: 20 },
      13: { halign: "center", cellWidth: 14 },
      14: { halign: "right", cellWidth: 20, fontStyle: "bold" },
      15: { halign: "center", cellWidth: 14 },
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
    didDrawPage: (data) => {
      // Footer halaman
      const str = `Halaman ${data.pageNumber} | Dicetak oleh Sistem Informasi Keuangan UIKA pada ${new Date().toLocaleString("id-ID")}`;
      doc.setFontSize(7.5);
      doc.setTextColor(130, 130, 130);
      doc.text(str, 12, doc.internal.pageSize.getHeight() - 6);
    },
  });

  // Nama file hasil download
  const cleanPeriode = (selectedPeriods[0] || "Semua_Periode").replace(/\s+/g, "_");
  const fileName = `Laporan_Tagihan_${selectedPenerima}_${cleanPeriode}.pdf`;

  // Auto download file PDF
  doc.save(fileName);
}

/**
 * Export Laporan Tagihan ke Excel (.xlsx) dengan KOP & Header Terstruktur
 */
export function exportLaporanToExcel(params: ExportLaporanParams): void {
  const {
    useKop = true,
    selectedPenerima,
    selectedPeriods,
    selectedStatus,
    selectedProdi,
    selectedJenisTagihan,
    reportData,
  } = params;

  const rows: (string | number)[][] = [];

  // Baris KOP jika useKop === true
  if (useKop) {
    rows.push(["UNIVERSITAS IBN KHALDUN BOGOR"]);
    rows.push(["Jl KH Sholeh Iskandar KM 2 Kedung Badak Bogor"]);
    rows.push(["Website : uika-bogor.ac.id/ e-Mail :mail@uika-bogor.ac.id / Telepon :0251-8356884"]);
    rows.push([]);
  }

  // Judul Laporan
  const periodeStr =
    selectedPeriods.length > 0 ? selectedPeriods.join(", ") : "SEMUA PERIODE";
  rows.push([`TAGIHAN ${selectedPenerima.toUpperCase()} PERIODE ${periodeStr.toUpperCase()}`]);
  rows.push([`Tanggal Cetak: ${new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}`]);
  rows.push([]);

  // Baris Info Filter
  rows.push(["Periode Akademik", selectedPeriods.join(", ") || "Semua", "", "Status", selectedStatus || "Semua"]);
  rows.push(["Program Studi", selectedProdi || "Semua", "", "Penerima", selectedPenerima]);
  rows.push(["Jenis Tagihan", selectedJenisTagihan || "Semua"]);
  rows.push([]);

  // Header Kolom Tabel (16 kolom sesuai spesifikasi)
  rows.push([
    "No.",
    "Kode Tagihan",
    "NIM",
    "Nama",
    "Program Studi",
    "Periode",
    "Jenis Tagihan",
    "Cicilan",
    "Bulan",
    "Tagihan",
    "Denda",
    "Potongan",
    "Pembayaran",
    "Lunas?",
    "Sisa Tagihan",
    "Suspend?",
  ]);

  // Data Baris
  reportData.forEach((item) => {
    rows.push([
      item.no,
      item.kodeTagihan,
      item.nim,
      item.nama,
      item.prodi,
      item.periode,
      item.jenisTagihan,
      item.cicilan,
      item.bulan,
      item.nominal,
      item.denda,
      item.potongan,
      item.bayar,
      item.status,
      item.sisa,
      item.suspend,
    ]);
  });

  // Buat Sheet & Workbook
  const worksheet = XLSX.utils.aoa_to_sheet(rows);

  // Atur lebar kolom agar rapi
  worksheet["!cols"] = [
    { wch: 6 },  // No.
    { wch: 22 }, // Kode Tagihan
    { wch: 16 }, // NIM
    { wch: 28 }, // Nama
    { wch: 28 }, // Program Studi
    { wch: 14 }, // Periode
    { wch: 18 }, // Jenis Tagihan
    { wch: 10 }, // Cicilan
    { wch: 10 }, // Bulan
    { wch: 16 }, // Tagihan
    { wch: 14 }, // Denda
    { wch: 14 }, // Potongan
    { wch: 16 }, // Pembayaran
    { wch: 12 }, // Lunas?
    { wch: 16 }, // Sisa Tagihan
    { wch: 12 }, // Suspend?
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan Tagihan");

  // Nama file unduhan
  const cleanPeriode = (selectedPeriods[0] || "Semua_Periode").replace(/\s+/g, "_");
  const fileName = `Laporan_Tagihan_${selectedPenerima}_${cleanPeriode}.xlsx`;

  // Auto download file Excel
  XLSX.writeFile(workbook, fileName);
}

export interface ExportRekapParams {
  useKop?: boolean;
  tahunAkademik?: string;
  selectedProdi?: string;
  selectedJenisTagihan?: string;
  tglCutOff?: string;
  periodeMasuk?: string;
  jalurPendaftaran?: string;
  gelombang?: string;
  sistemKuliah?: string;
  selectedPenerima?: string;
  rekapData: RekapRowData[];
  formatRupiah?: (num: number) => string;
}

/**
 * Export Laporan Rekapitulasi Tagihan ke PDF dengan KOP Resmi UIKA
 */
export async function exportRekapToPdf(params: ExportRekapParams): Promise<void> {
  const {
    useKop = true,
    tahunAkademik,
    selectedProdi,
    selectedJenisTagihan,
    selectedPenerima,
    rekapData,
    formatRupiah = (n) => `Rp ${n.toLocaleString("id-ID")}`,
  } = params;

  // Hitung total keseluruhan
  const totalNominal = rekapData.reduce((acc, curr) => acc + curr.nominal, 0);
  const totalPotongan = rekapData.reduce((acc, curr) => acc + curr.potongan, 0);
  const totalDenda = rekapData.reduce((acc, curr) => acc + curr.denda, 0);
  const totalTagihan = rekapData.reduce((acc, curr) => acc + curr.totalTagihan, 0);
  const totalBayar = rekapData.reduce((acc, curr) => acc + curr.bayar, 0);
  const totalSisa = rekapData.reduce((acc, curr) => acc + curr.sisa, 0);
  const totalJumlahTagihan = rekapData.reduce(
    (acc, curr) => acc + curr.jumlahTagihan,
    0
  );
  const totalJumlahLunas = rekapData.reduce(
    (acc, curr) => acc + curr.jumlahLunas,
    0
  );

  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let currentY = 12;

  // Render KOP jika useKop === true
  if (useKop) {
    try {
      const logoBase64 = await loadImageAsBase64("/images/logo-uika.png");
      if (logoBase64) {
        doc.addImage(logoBase64, "PNG", 18, currentY - 5, 20, 20);
      }
    } catch {
      // Continue even if logo fails
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(20, 20, 20);
    doc.text("UNIVERSITAS IBN KHALDUN BOGOR", pageWidth / 2, currentY + 3, {
      align: "center",
    });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    doc.text(
      "Jl KH Sholeh Iskandar KM 2 Kedung Badak Bogor",
      pageWidth / 2,
      currentY + 8.5,
      { align: "center" }
    );
    doc.setFontSize(8.5);
    doc.text(
      "Website : uika-bogor.ac.id/ e-Mail :mail@uika-bogor.ac.id / Telepon :0251-8356884",
      pageWidth / 2,
      currentY + 13.5,
      { align: "center" }
    );

    // Garis Ganda Pembatas KOP
    currentY += 18;
    doc.setDrawColor(20, 20, 20);
    doc.setLineWidth(0.6);
    doc.line(15, currentY, pageWidth - 15, currentY);
    doc.setLineWidth(0.2);
    doc.line(15, currentY + 0.8, pageWidth - 15, currentY + 0.8);

    currentY += 5;
  }

  // Judul Laporan
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(20, 20, 20);
  doc.text(
    `REKAPITULASI TAGIHAN ${tahunAkademik ? `TAHUN AKADEMIK ${tahunAkademik.toUpperCase()}` : ""}`,
    pageWidth / 2,
    currentY + 2,
    { align: "center" }
  );

  currentY += 8;

  // Metadata Filter Ringkas
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(80, 80, 80);

  const filterTextLeft = `Program Studi : ${selectedProdi || "Universitas Ibn Khaldun"} | Jenis : ${selectedJenisTagihan || "Semua"}`;
  const filterTextRight = `Penerima : ${selectedPenerima || "Semua"} | Tgl Cetak : ${new Date().toLocaleDateString("id-ID")}`;

  doc.text(filterTextLeft, 15, currentY);
  doc.text(filterTextRight, pageWidth - 15, currentY, { align: "right" });

  currentY += 3;

  // Persiapan data tabel (12 kolom sesuai Gambar 1)
  const tableHeaders = [
    [
      "No.",
      "Kode Prodi",
      "Program Studi",
      "Jenis Tagihan",
      "Tagihan",
      "Potongan",
      "Denda",
      "Total Tagihan",
      "Pembayaran",
      "Sisa Tagihan",
      "Jumlah Tagihan",
      "Jumlah Lunas",
    ],
  ];

  const tableBody = rekapData.map((row) => [
    row.no.toString(),
    row.kodeProdi,
    row.prodi,
    row.jenisTagihan,
    formatRupiah(row.nominal),
    formatRupiah(row.potongan),
    formatRupiah(row.denda),
    formatRupiah(row.totalTagihan),
    formatRupiah(row.bayar),
    formatRupiah(row.sisa),
    row.jumlahTagihan.toLocaleString("id-ID"),
    row.jumlahLunas.toLocaleString("id-ID"),
  ]);

  const tableFoot = [
    [
      "TOTAL KESELURUHAN",
      "",
      "",
      "",
      formatRupiah(totalNominal),
      formatRupiah(totalPotongan),
      formatRupiah(totalDenda),
      formatRupiah(totalTagihan),
      formatRupiah(totalBayar),
      formatRupiah(totalSisa),
      totalJumlahTagihan.toLocaleString("id-ID"),
      totalJumlahLunas.toLocaleString("id-ID"),
    ],
  ];

  autoTable(doc, {
    startY: currentY,
    head: tableHeaders,
    body: tableBody,
    foot: tableFoot,
    showFoot: "lastPage",
    margin: { left: 12, right: 12 },
    styles: {
      fontSize: 7.5,
      cellPadding: 1.8,
      lineColor: [210, 215, 220],
      lineWidth: 0.1,
      textColor: [35, 40, 50],
    },
    headStyles: {
      fillColor: [30, 58, 138], // Navy
      textColor: [255, 255, 255],
      fontStyle: "bold",
      halign: "center",
      valign: "middle",
      fontSize: 7.5,
    },
    footStyles: {
      fillColor: [240, 243, 246],
      textColor: [20, 25, 35],
      fontStyle: "bold",
      fontSize: 7.5,
    },
    columnStyles: {
      0: { halign: "center", cellWidth: 8 },
      1: { halign: "center", cellWidth: 18 },
      2: { halign: "left", cellWidth: 40, fontStyle: "bold" },
      3: { halign: "left", cellWidth: 25 },
      4: { halign: "right", cellWidth: 24 },
      5: { halign: "right", cellWidth: 22 },
      6: { halign: "right", cellWidth: 18 },
      7: { halign: "right", cellWidth: 25, fontStyle: "bold" },
      8: { halign: "right", cellWidth: 25 },
      9: { halign: "right", cellWidth: 25, fontStyle: "bold" },
      10: { halign: "center", cellWidth: 20 },
      11: { halign: "center", cellWidth: 20 },
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
    didDrawPage: (data) => {
      const str = `Halaman ${data.pageNumber} | Dicetak oleh Sistem Informasi Keuangan UIKA pada ${new Date().toLocaleString("id-ID")}`;
      doc.setFontSize(7.5);
      doc.setTextColor(130, 130, 130);
      doc.text(str, 12, doc.internal.pageSize.getHeight() - 6);
    },
  });

  const cleanTahun = (tahunAkademik || "Semua_Tahun").replace(/\s+/g, "_");
  const fileName = `Laporan_Rekap_Tagihan_${cleanTahun}.pdf`;

  doc.save(fileName);
}

/**
 * Export Laporan Rekapitulasi Tagihan ke Excel (.xlsx) dengan KOP Resmi UIKA
 */
export function exportRekapToExcel(params: ExportRekapParams): void {
  const {
    useKop = true,
    tahunAkademik,
    selectedProdi,
    selectedJenisTagihan,
    selectedPenerima,
    rekapData,
  } = params;

  // Hitung total
  const totalNominal = rekapData.reduce((acc, curr) => acc + curr.nominal, 0);
  const totalPotongan = rekapData.reduce((acc, curr) => acc + curr.potongan, 0);
  const totalDenda = rekapData.reduce((acc, curr) => acc + curr.denda, 0);
  const totalTagihan = rekapData.reduce((acc, curr) => acc + curr.totalTagihan, 0);
  const totalBayar = rekapData.reduce((acc, curr) => acc + curr.bayar, 0);
  const totalSisa = rekapData.reduce((acc, curr) => acc + curr.sisa, 0);
  const totalJumlahTagihan = rekapData.reduce(
    (acc, curr) => acc + curr.jumlahTagihan,
    0
  );
  const totalJumlahLunas = rekapData.reduce(
    (acc, curr) => acc + curr.jumlahLunas,
    0
  );

  const rows: (string | number)[][] = [];

  if (useKop) {
    rows.push(["UNIVERSITAS IBN KHALDUN BOGOR"]);
    rows.push(["Jl KH Sholeh Iskandar KM 2 Kedung Badak Bogor"]);
    rows.push(["Website : uika-bogor.ac.id/ e-Mail :mail@uika-bogor.ac.id / Telepon :0251-8356884"]);
    rows.push([]);
  }

  rows.push([`REKAPITULASI TAGIHAN ${tahunAkademik ? `TAHUN AKADEMIK ${tahunAkademik.toUpperCase()}` : ""}`]);
  rows.push([`Tanggal Cetak: ${new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}`]);
  rows.push([]);

  rows.push(["Tahun Akademik", tahunAkademik || "Semua", "", "Program Studi", selectedProdi || "Universitas Ibn Khaldun"]);
  rows.push(["Jenis Tagihan", selectedJenisTagihan || "Semua", "", "Penerima", selectedPenerima || "Semua"]);
  rows.push([]);

  // Header Kolom Tabel (12 kolom sesuai Gambar 1)
  rows.push([
    "No.",
    "Kode Prodi",
    "Program Studi",
    "Jenis Tagihan",
    "Tagihan",
    "Potongan",
    "Denda",
    "Total Tagihan",
    "Pembayaran",
    "Sisa Tagihan",
    "Jumlah Tagihan",
    "Jumlah Lunas",
  ]);

  rekapData.forEach((item) => {
    rows.push([
      item.no,
      item.kodeProdi,
      item.prodi,
      item.jenisTagihan,
      item.nominal,
      item.potongan,
      item.denda,
      item.totalTagihan,
      item.bayar,
      item.sisa,
      item.jumlahTagihan,
      item.jumlahLunas,
    ]);
  });

  // Baris Total
  rows.push([
    "TOTAL KESELURUHAN",
    "",
    "",
    "",
    totalNominal,
    totalPotongan,
    totalDenda,
    totalTagihan,
    totalBayar,
    totalSisa,
    totalJumlahTagihan,
    totalJumlahLunas,
  ]);

  const worksheet = XLSX.utils.aoa_to_sheet(rows);

  worksheet["!cols"] = [
    { wch: 6 },  // No.
    { wch: 14 }, // Kode Prodi
    { wch: 32 }, // Program Studi
    { wch: 20 }, // Jenis Tagihan
    { wch: 18 }, // Tagihan
    { wch: 16 }, // Potongan
    { wch: 14 }, // Denda
    { wch: 18 }, // Total Tagihan
    { wch: 18 }, // Pembayaran
    { wch: 18 }, // Sisa Tagihan
    { wch: 16 }, // Jumlah Tagihan
    { wch: 16 }, // Jumlah Lunas
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Rekapitulasi Tagihan");

  const cleanTahun = (tahunAkademik || "Semua_Tahun").replace(/\s+/g, "_");
  const fileName = `Laporan_Rekap_Tagihan_${cleanTahun}.xlsx`;

  XLSX.writeFile(workbook, fileName);
}

export interface ExportPerwalianParams {
  useKop?: boolean;
  periodePerwalian?: string;
  selectedProdi?: string;
  angkatan?: string;
  statusSemester?: string;
  statusTagihan?: string;
  jenisTagihan?: string;
  tampilkanKontak?: boolean;
  tampilkanDenda?: string;
  reportData: PerwalianRowData[];
  formatRupiah?: (num: number) => string;
}

/**
 * Export Laporan Perwalian Tagihan ke PDF dengan KOP Resmi UIKA
 */
export async function exportPerwalianToPdf(params: ExportPerwalianParams): Promise<void> {
  const {
    useKop = true,
    periodePerwalian,
    selectedProdi,
    angkatan,
    statusSemester,
    statusTagihan,
    jenisTagihan,
    tampilkanKontak = false,
    tampilkanDenda = "Tidak",
    reportData,
    formatRupiah = (n) => `Rp ${n.toLocaleString("id-ID")}`,
  } = params;

  const totalNominal = reportData.reduce((acc, curr) => acc + curr.nominalTagihan, 0);
  const totalDenda = reportData.reduce((acc, curr) => acc + curr.denda, 0);
  const totalPotongan = reportData.reduce((acc, curr) => acc + curr.potongan, 0);
  const totalTagihan = reportData.reduce((acc, curr) => acc + curr.totalTagihan, 0);
  const totalBayar = reportData.reduce((acc, curr) => acc + curr.totalBayar, 0);
  const totalSisa = reportData.reduce((acc, curr) => acc + curr.sisaTagihan, 0);

  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let currentY = 12;

  // Render KOP jika useKop === true
  if (useKop) {
    try {
      const logoBase64 = await loadImageAsBase64("/images/logo-uika.png");
      if (logoBase64) {
        doc.addImage(logoBase64, "PNG", 18, currentY - 5, 20, 20);
      }
    } catch {
      // Continue even if logo fails
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(20, 20, 20);
    doc.text("UNIVERSITAS IBN KHALDUN BOGOR", pageWidth / 2, currentY + 3, {
      align: "center",
    });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    doc.text(
      "Jl KH Sholeh Iskandar KM 2 Kedung Badak Bogor",
      pageWidth / 2,
      currentY + 8.5,
      { align: "center" }
    );
    doc.setFontSize(8.5);
    doc.text(
      "Website : uika-bogor.ac.id/ e-Mail :mail@uika-bogor.ac.id / Telepon :0251-8356884",
      pageWidth / 2,
      currentY + 13.5,
      { align: "center" }
    );

    // Garis Ganda Pembatas KOP
    currentY += 18;
    doc.setDrawColor(20, 20, 20);
    doc.setLineWidth(0.6);
    doc.line(15, currentY, pageWidth - 15, currentY);
    doc.setLineWidth(0.2);
    doc.line(15, currentY + 0.8, pageWidth - 15, currentY + 0.8);

    currentY += 5;
  }

  // Judul Laporan
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(20, 20, 20);
  doc.text(
    `LAPORAN PERWALIAN TAGIHAN ${periodePerwalian ? `PERIODE ${periodePerwalian.toUpperCase()}` : ""}`,
    pageWidth / 2,
    currentY + 2,
    { align: "center" }
  );

  currentY += 8;

  // Metadata Filter Ringkas
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(80, 80, 80);

  const filterTextLeft = `Program Studi : ${selectedProdi || "Universitas Ibn Khaldun"} | Angkatan : ${angkatan || "Semua"} | Jenis : ${jenisTagihan || "Semua"}`;
  const filterTextRight = `Status : ${statusTagihan || "Semua"} | Status Smt : ${statusSemester || "Semua"} | Tgl : ${new Date().toLocaleDateString("id-ID")}`;

  doc.text(filterTextLeft, 15, currentY);
  doc.text(filterTextRight, pageWidth - 15, currentY, { align: "right" });

  currentY += 3;

  // Header Kolom (17 kolom sesuai Gambar 2)
  const tableHeaders = [
    [
      "No.",
      "NIM",
      "Nama",
      "Program Studi",
      "Periode / Semester",
      "Status Semester",
      "SKS",
      "Jenis Tagihan",
      "ID Tagihan",
      "Bulan Tagihan",
      "Nominal Tagihan",
      "Denda",
      "Potongan",
      "Total Tagihan",
      "Total Bayar",
      "Sisa Tagihan",
      "Status",
    ],
  ];

  const tableBody = reportData.map((row) => [
    row.no.toString(),
    row.nim,
    row.nama,
    row.prodi,
    row.periodeSemester,
    row.statusSemester,
    row.sks.toString(),
    row.jenisTagihan,
    row.idTagihan,
    row.bulanTagihan,
    formatRupiah(row.nominalTagihan),
    formatRupiah(row.denda),
    formatRupiah(row.potongan),
    formatRupiah(row.totalTagihan),
    formatRupiah(row.totalBayar),
    formatRupiah(row.sisaTagihan),
    row.status,
  ]);

  const tableFoot = [
    [
      "TOTAL",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      formatRupiah(totalNominal),
      formatRupiah(totalDenda),
      formatRupiah(totalPotongan),
      formatRupiah(totalTagihan),
      formatRupiah(totalBayar),
      formatRupiah(totalSisa),
      "",
    ],
  ];

  autoTable(doc, {
    startY: currentY,
    head: tableHeaders,
    body: tableBody,
    foot: tableFoot,
    showFoot: "lastPage",
    margin: { left: 12, right: 12 },
    styles: {
      fontSize: 7,
      cellPadding: 1.6,
      lineColor: [210, 215, 220],
      lineWidth: 0.1,
      textColor: [35, 40, 50],
    },
    headStyles: {
      fillColor: [30, 58, 138], // Navy
      textColor: [255, 255, 255],
      fontStyle: "bold",
      halign: "center",
      valign: "middle",
      fontSize: 7,
    },
    footStyles: {
      fillColor: [240, 243, 246],
      textColor: [20, 25, 35],
      fontStyle: "bold",
      fontSize: 7,
    },
    columnStyles: {
      0: { halign: "center", cellWidth: 8 },
      1: { halign: "center", cellWidth: 19 },
      2: { halign: "left", cellWidth: 24, fontStyle: "bold" },
      3: { halign: "left", cellWidth: 24 },
      4: { halign: "center", cellWidth: 16 },
      5: { halign: "center", cellWidth: 14 },
      6: { halign: "center", cellWidth: 10 },
      7: { halign: "left", cellWidth: 17 },
      8: { halign: "center", cellWidth: 18 },
      9: { halign: "center", cellWidth: 12 },
      10: { halign: "right", cellWidth: 19 },
      11: { halign: "right", cellWidth: 14 },
      12: { halign: "right", cellWidth: 15 },
      13: { halign: "right", cellWidth: 20, fontStyle: "bold" },
      14: { halign: "right", cellWidth: 19 },
      15: { halign: "right", cellWidth: 19, fontStyle: "bold" },
      16: { halign: "center", cellWidth: 13 },
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
    didDrawPage: (data) => {
      const str = `Halaman ${data.pageNumber} | Dicetak oleh Sistem Informasi Keuangan UIKA pada ${new Date().toLocaleString("id-ID")}`;
      doc.setFontSize(7.5);
      doc.setTextColor(130, 130, 130);
      doc.text(str, 12, doc.internal.pageSize.getHeight() - 6);
    },
  });

  const cleanPeriode = (periodePerwalian || "Semua_Periode").replace(/\s+/g, "_");
  const fileName = `Laporan_Perwalian_Tagihan_${cleanPeriode}.pdf`;

  doc.save(fileName);
}

/**
 * Export Laporan Perwalian Tagihan ke Excel (.xlsx) dengan KOP Resmi UIKA
 */
export function exportPerwalianToExcel(params: ExportPerwalianParams): void {
  const {
    useKop = true,
    periodePerwalian,
    selectedProdi,
    angkatan,
    statusSemester,
    statusTagihan,
    jenisTagihan,
    tampilkanKontak = false,
    tampilkanDenda = "Tidak",
    reportData,
  } = params;

  const totalNominal = reportData.reduce((acc, curr) => acc + curr.nominalTagihan, 0);
  const totalDenda = reportData.reduce((acc, curr) => acc + curr.denda, 0);
  const totalPotongan = reportData.reduce((acc, curr) => acc + curr.potongan, 0);
  const totalTagihan = reportData.reduce((acc, curr) => acc + curr.totalTagihan, 0);
  const totalBayar = reportData.reduce((acc, curr) => acc + curr.totalBayar, 0);
  const totalSisa = reportData.reduce((acc, curr) => acc + curr.sisaTagihan, 0);

  const rows: (string | number)[][] = [];

  if (useKop) {
    rows.push(["UNIVERSITAS IBN KHALDUN BOGOR"]);
    rows.push(["Jl KH Sholeh Iskandar KM 2 Kedung Badak Bogor"]);
    rows.push(["Website : uika-bogor.ac.id/ e-Mail :mail@uika-bogor.ac.id / Telepon :0251-8356884"]);
    rows.push([]);
  }

  rows.push([`LAPORAN PERWALIAN TAGIHAN ${periodePerwalian ? `PERIODE ${periodePerwalian.toUpperCase()}` : ""}`]);
  rows.push([`Tanggal Cetak: ${new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}`]);
  rows.push([]);

  rows.push(["Periode Perwalian", periodePerwalian || "Semua", "", "Program Studi", selectedProdi || "Universitas Ibn Khaldun"]);
  rows.push(["Angkatan", angkatan || "Semua", "", "Status Tagihan", statusTagihan || "Semua"]);
  rows.push(["Jenis Tagihan", jenisTagihan || "Semua", "", "Status Semester", statusSemester || "Semua"]);
  rows.push([]);

  // Header Kolom Tabel (17 kolom sesuai Gambar 2)
  rows.push([
    "No.",
    "NIM",
    "Nama",
    "Program Studi",
    "Periode / Semester",
    "Status Semester",
    "SKS",
    "Jenis Tagihan",
    "ID Tagihan",
    "Bulan Tagihan",
    "Nominal Tagihan",
    "Denda",
    "Potongan",
    "Total Tagihan",
    "Total Bayar",
    "Sisa Tagihan",
    "Status",
  ]);

  reportData.forEach((item) => {
    rows.push([
      item.no,
      item.nim,
      item.nama,
      item.prodi,
      item.periodeSemester,
      item.statusSemester,
      item.sks,
      item.jenisTagihan,
      item.idTagihan,
      item.bulanTagihan,
      item.nominalTagihan,
      item.denda,
      item.potongan,
      item.totalTagihan,
      item.totalBayar,
      item.sisaTagihan,
      item.status,
    ]);
  });

  // Baris Total
  rows.push([
    "TOTAL",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    totalNominal,
    totalDenda,
    totalPotongan,
    totalTagihan,
    totalBayar,
    totalSisa,
    "",
  ]);

  const worksheet = XLSX.utils.aoa_to_sheet(rows);

  worksheet["!cols"] = [
    { wch: 6 },  // No.
    { wch: 16 }, // NIM
    { wch: 26 }, // Nama
    { wch: 26 }, // Program Studi
    { wch: 16 }, // Periode / Semester
    { wch: 14 }, // Status Semester
    { wch: 8 },  // SKS
    { wch: 18 }, // Jenis Tagihan
    { wch: 16 }, // ID Tagihan
    { wch: 14 }, // Bulan Tagihan
    { wch: 16 }, // Nominal Tagihan
    { wch: 14 }, // Denda
    { wch: 14 }, // Potongan
    { wch: 16 }, // Total Tagihan
    { wch: 16 }, // Total Bayar
    { wch: 16 }, // Sisa Tagihan
    { wch: 14 }, // Status
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Perwalian Tagihan");

  const cleanPeriode = (periodePerwalian || "Semua_Periode").replace(/\s+/g, "_");
  const fileName = `Laporan_Perwalian_Tagihan_${cleanPeriode}.xlsx`;

  XLSX.writeFile(workbook, fileName);
}

export interface ExportPivotParams {
  useKop?: boolean;
  periodeTagihan?: string[];
  unitKerja?: string;
  jenisTagihan?: string;
  tglCutOff?: string;
  penerima?: string;
  kolomPivot?: string;
  pivotData: PivotRowData[];
  formatRupiah?: (num: number) => string;
}

/**
 * Export Laporan Pivot Tagihan ke PDF dengan KOP Resmi UIKA
 */
export async function exportPivotToPdf(params: ExportPivotParams): Promise<void> {
  const {
    useKop = true,
    periodeTagihan = [],
    unitKerja,
    jenisTagihan,
    penerima,
    kolomPivot = "Program Studi",
    pivotData,
    formatRupiah = (n) => `Rp ${n.toLocaleString("id-ID")}`,
  } = params;

  const totalJumlahTagihan = pivotData.reduce(
    (acc, curr) => acc + curr.jumlahTagihan,
    0
  );
  const totalNominalTagihan = pivotData.reduce(
    (acc, curr) => acc + curr.nominalTagihan,
    0
  );
  const totalDenda = pivotData.reduce((acc, curr) => acc + curr.denda, 0);
  const totalPotongan = pivotData.reduce((acc, curr) => acc + curr.potongan, 0);
  const totalTagihan = pivotData.reduce(
    (acc, curr) => acc + curr.totalTagihan,
    0
  );
  const totalNominalBayar = pivotData.reduce(
    (acc, curr) => acc + curr.nominalBayar,
    0
  );
  const totalSisaTagihan = pivotData.reduce(
    (acc, curr) => acc + curr.sisaTagihan,
    0
  );

  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let currentY = 12;

  // Render KOP jika useKop === true
  if (useKop) {
    try {
      const logoBase64 = await loadImageAsBase64("/images/logo-uika.png");
      if (logoBase64) {
        doc.addImage(logoBase64, "PNG", 18, currentY - 5, 20, 20);
      }
    } catch {
      // Continue even if logo fails
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(20, 20, 20);
    doc.text("UNIVERSITAS IBN KHALDUN BOGOR", pageWidth / 2, currentY + 3, {
      align: "center",
    });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    doc.text(
      "Jl KH Sholeh Iskandar KM 2 Kedung Badak Bogor",
      pageWidth / 2,
      currentY + 8.5,
      { align: "center" }
    );
    doc.setFontSize(8.5);
    doc.text(
      "Website : uika-bogor.ac.id/ e-Mail :mail@uika-bogor.ac.id / Telepon :0251-8356884",
      pageWidth / 2,
      currentY + 13.5,
      { align: "center" }
    );

    // Garis Ganda Pembatas KOP
    currentY += 18;
    doc.setDrawColor(20, 20, 20);
    doc.setLineWidth(0.6);
    doc.line(15, currentY, pageWidth - 15, currentY);
    doc.setLineWidth(0.2);
    doc.line(15, currentY + 0.8, pageWidth - 15, currentY + 0.8);

    currentY += 5;
  }

  // Judul Laporan
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(20, 20, 20);
  const periodeStr =
    periodeTagihan.length > 0 ? periodeTagihan.join(", ") : "SEMUA PERIODE";
  doc.text(
    `LAPORAN PIVOT TAGIHAN PERIODE ${periodeStr.toUpperCase()}`,
    pageWidth / 2,
    currentY + 2,
    { align: "center" }
  );

  currentY += 8;

  // Metadata Filter Ringkas
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(80, 80, 80);

  const filterTextLeft = `Berdasarkan : ${kolomPivot} | Unit Kerja : ${unitKerja || "Universitas Ibn Khaldun"} | Jenis : ${jenisTagihan || "Semua"}`;
  const filterTextRight = `Penerima : ${penerima || "Semua"} | Tgl Cetak : ${new Date().toLocaleDateString("id-ID")}`;

  doc.text(filterTextLeft, 15, currentY);
  doc.text(filterTextRight, pageWidth - 15, currentY, { align: "right" });

  currentY += 3;

  // Header Kolom (9 kolom sesuai Gambar 3)
  const tableHeaders = [
    [
      "No.",
      "Nama Mahasiswa",
      "Jumlah Tagihan",
      "Nominal Tagihan",
      "Denda",
      "Potongan / Beasiswa",
      "Total Tagihan",
      "Nominal Bayar",
      "Sisa Tagihan",
    ],
  ];

  const tableBody = pivotData.map((row) => [
    row.no.toString(),
    row.namaMahasiswa,
    row.jumlahTagihan.toLocaleString("id-ID"),
    formatRupiah(row.nominalTagihan),
    formatRupiah(row.denda),
    formatRupiah(row.potongan),
    formatRupiah(row.totalTagihan),
    formatRupiah(row.nominalBayar),
    formatRupiah(row.sisaTagihan),
  ]);

  const tableFoot = [
    [
      "TOTAL KESELURUHAN",
      "",
      totalJumlahTagihan.toLocaleString("id-ID"),
      formatRupiah(totalNominalTagihan),
      formatRupiah(totalDenda),
      formatRupiah(totalPotongan),
      formatRupiah(totalTagihan),
      formatRupiah(totalNominalBayar),
      formatRupiah(totalSisaTagihan),
    ],
  ];

  autoTable(doc, {
    startY: currentY,
    head: tableHeaders,
    body: tableBody,
    foot: tableFoot,
    showFoot: "lastPage",
    margin: { left: 12, right: 12 },
    styles: {
      fontSize: 7.5,
      cellPadding: 2,
      lineColor: [210, 215, 220],
      lineWidth: 0.1,
      textColor: [35, 40, 50],
    },
    headStyles: {
      fillColor: [30, 58, 138], // Navy
      textColor: [255, 255, 255],
      fontStyle: "bold",
      halign: "center",
      valign: "middle",
    },
    footStyles: {
      fillColor: [240, 243, 246],
      textColor: [20, 25, 35],
      fontStyle: "bold",
    },
    columnStyles: {
      0: { halign: "center", cellWidth: 8 },
      1: { halign: "left", cellWidth: 45, fontStyle: "bold" },
      2: { halign: "center", cellWidth: 25 },
      3: { halign: "right", cellWidth: 32 },
      4: { halign: "right", cellWidth: 25 },
      5: { halign: "right", cellWidth: 32 },
      6: { halign: "right", cellWidth: 35, fontStyle: "bold" },
      7: { halign: "right", cellWidth: 35 },
      8: { halign: "right", cellWidth: 35, fontStyle: "bold" },
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
    didDrawPage: (data) => {
      const str = `Halaman ${data.pageNumber} | Dicetak oleh Sistem Informasi Keuangan UIKA pada ${new Date().toLocaleString("id-ID")}`;
      doc.setFontSize(7.5);
      doc.setTextColor(130, 130, 130);
      doc.text(str, 12, doc.internal.pageSize.getHeight() - 6);
    },
  });

  const cleanPeriode = (periodeTagihan[0] || "Semua_Periode").replace(/\s+/g, "_");
  const fileName = `Laporan_Pivot_Tagihan_${cleanPeriode}.pdf`;

  doc.save(fileName);
}

/**
 * Export Laporan Pivot Tagihan ke Excel (.xlsx) dengan KOP Resmi UIKA
 */
export function exportPivotToExcel(params: ExportPivotParams): void {
  const {
    useKop = true,
    periodeTagihan = [],
    unitKerja,
    jenisTagihan,
    penerima,
    kolomPivot = "Program Studi",
    pivotData,
  } = params;

  const totalJumlahTagihan = pivotData.reduce(
    (acc, curr) => acc + curr.jumlahTagihan,
    0
  );
  const totalNominalTagihan = pivotData.reduce(
    (acc, curr) => acc + curr.nominalTagihan,
    0
  );
  const totalDenda = pivotData.reduce((acc, curr) => acc + curr.denda, 0);
  const totalPotongan = pivotData.reduce((acc, curr) => acc + curr.potongan, 0);
  const totalTagihan = pivotData.reduce(
    (acc, curr) => acc + curr.totalTagihan,
    0
  );
  const totalNominalBayar = pivotData.reduce(
    (acc, curr) => acc + curr.nominalBayar,
    0
  );
  const totalSisaTagihan = pivotData.reduce(
    (acc, curr) => acc + curr.sisaTagihan,
    0
  );

  const rows: (string | number)[][] = [];

  if (useKop) {
    rows.push(["UNIVERSITAS IBN KHALDUN BOGOR"]);
    rows.push(["Jl KH Sholeh Iskandar KM 2 Kedung Badak Bogor"]);
    rows.push(["Website : uika-bogor.ac.id/ e-Mail :mail@uika-bogor.ac.id / Telepon :0251-8356884"]);
    rows.push([]);
  }

  const periodeStr =
    periodeTagihan.length > 0 ? periodeTagihan.join(", ") : "SEMUA PERIODE";
  rows.push([`LAPORAN PIVOT TAGIHAN PERIODE ${periodeStr.toUpperCase()}`]);
  rows.push([`Tanggal Cetak: ${new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}`]);
  rows.push([]);

  rows.push(["Berdasarkan", kolomPivot, "", "Unit Kerja", unitKerja || "Universitas Ibn Khaldun"]);
  rows.push(["Periode Tagihan", periodeStr, "", "Penerima", penerima || "Semua"]);
  rows.push(["Jenis Tagihan", jenisTagihan || "Semua"]);
  rows.push([]);

  // Header Kolom (9 kolom sesuai Gambar 3)
  rows.push([
    "No.",
    "Nama Mahasiswa",
    "Jumlah Tagihan",
    "Nominal Tagihan",
    "Denda",
    "Potongan / Beasiswa",
    "Total Tagihan",
    "Nominal Bayar",
    "Sisa Tagihan",
  ]);

  pivotData.forEach((item) => {
    rows.push([
      item.no,
      item.namaMahasiswa,
      item.jumlahTagihan,
      item.nominalTagihan,
      item.denda,
      item.potongan,
      item.totalTagihan,
      item.nominalBayar,
      item.sisaTagihan,
    ]);
  });

  // Baris Total
  rows.push([
    "TOTAL KESELURUHAN",
    "",
    totalJumlahTagihan,
    totalNominalTagihan,
    totalDenda,
    totalPotongan,
    totalTagihan,
    totalNominalBayar,
    totalSisaTagihan,
  ]);

  const worksheet = XLSX.utils.aoa_to_sheet(rows);

  worksheet["!cols"] = [
    { wch: 6 },  // No.
    { wch: 30 }, // Nama Mahasiswa
    { wch: 16 }, // Jumlah Tagihan
    { wch: 20 }, // Nominal Tagihan
    { wch: 16 }, // Denda
    { wch: 22 }, // Potongan / Beasiswa
    { wch: 20 }, // Total Tagihan
    { wch: 20 }, // Nominal Bayar
    { wch: 20 }, // Sisa Tagihan
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Pivot Tagihan");

  const cleanPeriode = (periodeTagihan[0] || "Semua_Periode").replace(/\s+/g, "_");
  const fileName = `Laporan_Pivot_Tagihan_${cleanPeriode}.xlsx`;

  XLSX.writeFile(workbook, fileName);
}

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import type { PembayaranRowData } from "./generateLaporanPembayaranHtml";

export interface ExportPembayaranParams {
  useKop?: boolean;
  selectedPeriods: string[];
  metodePembayaran?: string;
  channel?: string;
  tglAwal?: string;
  tglAkhir?: string;
  penerima?: string;
  statusPembatalan?: string;
  pembayaranData: PembayaranRowData[];
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
 * Export Laporan Pembayaran ke PDF dengan KOP Resmi UIKA
 */
export async function exportPembayaranToPdf(
  params: ExportPembayaranParams
): Promise<void> {
  const {
    useKop = true,
    selectedPeriods,
    metodePembayaran,
    channel,
    tglAwal,
    tglAkhir,
    penerima,
    statusPembatalan,
    pembayaranData,
    formatRupiah = (n) => `Rp ${n.toLocaleString("id-ID")}`,
  } = params;

  // Orientasi Landscape untuk tabel data pembayaran agar proporsional
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
      // Abaikan jika gambar tidak bisa dimuat
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
    doc.setLineWidth(0.8);
    doc.line(14, currentY, pageWidth - 14, currentY);
    doc.setLineWidth(0.3);
    doc.line(14, currentY + 1.2, pageWidth - 14, currentY + 1.2);
    currentY += 6;
  } else {
    currentY = 15;
  }

  // Judul Dokumen di Tengah
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(20, 20, 20);

  const periodeText =
    selectedPeriods.length > 0
      ? `PERIODE ${selectedPeriods.join(", ").toUpperCase()}`
      : "SEMUA PERIODE";
  doc.text(`LAPORAN PEMBAYARAN ${periodeText}`, pageWidth / 2, currentY, {
    align: "center",
  });
  currentY += 6;

  // Metadata Filter Ringkas
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(70, 70, 70);

  const col1X = 14;
  const col2X = 90;
  const col3X = 180;

  doc.text(
    `Periode: ${selectedPeriods.length > 0 ? selectedPeriods.join(", ") : "Semua"}`,
    col1X,
    currentY
  );
  doc.text(`Penerima: ${penerima || "Semua"}`, col2X, currentY);
  doc.text(
    `Metode / Channel: ${metodePembayaran || "Semua"} / ${channel || "Semua"}`,
    col3X,
    currentY
  );
  currentY += 4.5;

  const rentangTgl =
    tglAwal || tglAkhir ? `${tglAwal || "-"} s/d ${tglAkhir || "-"}` : "Semua Tanggal";
  doc.text(`Rentang Tanggal: ${rentangTgl}`, col1X, currentY);
  doc.text(`Status: ${statusPembatalan || "Semua"}`, col2X, currentY);
  currentY += 5;

  // Siapkan Data Tabel (11 kolom sesuai Gambar 1)
  const tableHeaders = [
    [
      "No.",
      "Kode Pembayaran",
      "NIM / Kode Pendaftar",
      "Nama",
      "Program Studi",
      "Periode",
      "Metode Pembayaran",
      "Channel",
      "Tanggal",
      "Nominal",
      "Status Pembatalan",
    ],
  ];

  const tableBody = pembayaranData.map((item) => [
    item.no,
    item.kodePembayaran,
    item.nim,
    item.nama,
    item.prodi,
    item.periode,
    item.metodePembayaran,
    item.channel,
    item.tanggalBayar,
    formatRupiah(item.nominal),
    item.status,
  ]);

  // Hitung Total
  const totalNominal = pembayaranData.reduce(
    (acc, curr) => acc + (curr.status === "Batal" || curr.status === "Ya" ? 0 : curr.nominal),
    0
  );

  autoTable(doc, {
    head: tableHeaders,
    body: tableBody,
    startY: currentY,
    theme: "grid",
    headStyles: {
      fillColor: [30, 58, 138], // Navy blue (#1e3a8a)
      textColor: [255, 255, 255],
      fontSize: 7.5,
      fontStyle: "bold",
      halign: "center",
      valign: "middle",
      cellPadding: 2,
    },
    bodyStyles: {
      fontSize: 7.5,
      textColor: [30, 30, 30],
      cellPadding: 2,
    },
    columnStyles: {
      0: { halign: "center", cellWidth: 8 },
      1: { cellWidth: 26, fontStyle: "bold" },
      2: { halign: "center", cellWidth: 26 },
      3: { cellWidth: 34 },
      4: { cellWidth: 36 },
      5: { halign: "center", cellWidth: 18 },
      6: { cellWidth: 26 },
      7: { cellWidth: 24 },
      8: { halign: "center", cellWidth: 20 },
      9: { halign: "right", fontStyle: "bold", cellWidth: 26 },
      10: { halign: "center", cellWidth: 24 },
    },
    foot: [
      [
        {
          content: "TOTAL KESELURUHAN (AKTIF)",
          colSpan: 9,
          styles: { halign: "center", fontStyle: "bold" },
        },
        {
          content: formatRupiah(totalNominal),
          styles: { halign: "right", fontStyle: "bold", textColor: [30, 58, 138] },
        },
        { content: "", styles: { halign: "center" } },
      ],
    ],
    footStyles: {
      fillColor: [243, 244, 246],
      textColor: [20, 20, 20],
      fontSize: 8,
      fontStyle: "bold",
    },
    margin: { left: 14, right: 14 },
    didDrawPage: (data) => {
      // Footer Nomor Halaman
      const pageCount = (doc as unknown as { internal: { getNumberOfPages: () => number } }).internal.getNumberOfPages();
      doc.setFontSize(8);
      doc.setTextColor(130, 130, 130);
      doc.text(
        `Halaman ${data.pageNumber} dari ${pageCount}`,
        pageWidth - 14,
        doc.internal.pageSize.getHeight() - 8,
        { align: "right" }
      );
    },
  });

  // Trigger Download
  const filename = `Laporan_Pembayaran_${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(filename);
}

/**
 * Export Laporan Pembayaran ke Excel (.xlsx)
 */
export function exportPembayaranToExcel(params: ExportPembayaranParams): void {
  const {
    useKop = true,
    selectedPeriods,
    metodePembayaran,
    channel,
    tglAwal,
    tglAkhir,
    penerima,
    statusPembatalan,
    pembayaranData,
  } = params;

  const rows: (string | number)[][] = [];

  // Baris KOP jika useKop === true
  if (useKop) {
    rows.push(["UNIVERSITAS IBN KHALDUN BOGOR"]);
    rows.push(["Jl KH Sholeh Iskandar KM 2 Kedung Badak Bogor"]);
    rows.push([
      "Website : uika-bogor.ac.id / e-Mail : mail@uika-bogor.ac.id / Telepon : 0251-8356884",
    ]);
    rows.push([]);
  }

  // Judul Laporan
  const periodeStr =
    selectedPeriods.length > 0 ? selectedPeriods.join(", ") : "SEMUA PERIODE";
  rows.push([`LAPORAN PEMBAYARAN PERIODE ${periodeStr.toUpperCase()}`]);
  rows.push([
    `Tanggal Cetak: ${new Date().toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })}`,
  ]);
  rows.push([]);

  // Baris Info Filter
  rows.push([
    "Periode Pembayaran",
    selectedPeriods.join(", ") || "Semua",
    "",
    "Penerima",
    penerima || "Semua",
  ]);
  rows.push([
    "Metode Pembayaran",
    metodePembayaran || "Semua",
    "",
    "Channel",
    channel || "Semua",
  ]);
  rows.push([
    "Rentang Tanggal",
    tglAwal || tglAkhir ? `${tglAwal || "-"} s/d ${tglAkhir || "-"}` : "Semua",
    "",
    "Status Pembatalan",
    statusPembatalan || "Semua",
  ]);
  rows.push([]);

  // Header Kolom Tabel
  rows.push([
    "No.",
    "Kode Pembayaran",
    "NIM / Kode Pendaftar",
    "Nama",
    "Program Studi",
    "Periode",
    "Metode Pembayaran",
    "Channel",
    "Tanggal",
    "Nominal",
    "Status Pembatalan",
  ]);

  // Data Baris
  let totalNominal = 0;
  pembayaranData.forEach((item) => {
    if (item.status !== "Batal") {
      totalNominal += item.nominal;
    }
    rows.push([
      item.no,
      item.kodePembayaran,
      item.nim,
      item.nama,
      item.prodi,
      item.periode,
      item.metodePembayaran,
      item.channel,
      item.tanggalBayar,
      item.nominal,
      item.status,
    ]);
  });

  // Baris Total
  rows.push([]);
  rows.push([
    "TOTAL KESELURUHAN (AKTIF)",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    totalNominal,
    "",
  ]);

  const worksheet = XLSX.utils.aoa_to_sheet(rows);

  // Set lebar kolom otomatis / teratur
  worksheet["!cols"] = [
    { wch: 6 },
    { wch: 22 },
    { wch: 22 },
    { wch: 28 },
    { wch: 30 },
    { wch: 14 },
    { wch: 20 },
    { wch: 20 },
    { wch: 15 },
    { wch: 16 },
    { wch: 18 },
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan Pembayaran");

  const filename = `Laporan_Pembayaran_${new Date().toISOString().slice(0, 10)}.xlsx`;
  XLSX.writeFile(workbook, filename);
}

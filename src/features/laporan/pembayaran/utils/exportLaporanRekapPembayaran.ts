import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import type { RekapPembayaranRowData } from "./generateLaporanRekapPembayaranHtml";

export interface ExportRekapPembayaranParams {
  useKop?: boolean;
  periodePembayaran?: string;
  prodi?: string;
  metodePembayaran?: string;
  channel?: string;
  tglAwal?: string;
  tglAkhir?: string;
  periodeMasuk?: string;
  jalurPendaftaran?: string;
  gelombang?: string;
  sistemKuliah?: string;
  penerima?: string;
  data: RekapPembayaranRowData[];
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
 * Export Laporan Rekapitulasi Pembayaran ke PDF dengan KOP Resmi UIKA
 */
export async function exportRekapPembayaranToPdf(
  params: ExportRekapPembayaranParams
): Promise<void> {
  const {
    useKop = true,
    periodePembayaran,
    prodi,
    metodePembayaran,
    channel,
    tglAwal,
    tglAkhir,
    penerima,
    data,
    formatRupiah = (n) => `Rp ${n.toLocaleString("id-ID")}`,
  } = params;

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
      // Abaikan jika gambar gagal dimuat
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
      "Website : uika-bogor.ac.id / e-Mail : mail@uika-bogor.ac.id / Telepon : 0251-8356884",
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

  const periodeText = periodePembayaran ? `PERIODE ${periodePembayaran.toUpperCase()}` : "SEMUA PERIODE";
  doc.text(`LAPORAN REKAPITULASI PEMBAYARAN ${periodeText}`, pageWidth / 2, currentY, {
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

  doc.text(`Periode: ${periodePembayaran || "Semua"}`, col1X, currentY);
  doc.text(`Program Studi: ${prodi || "Semua"}`, col2X, currentY);
  doc.text(`Metode / Channel: ${metodePembayaran || "Semua"} / ${channel || "Semua"}`, col3X, currentY);
  currentY += 4.5;

  const rentangTgl = tglAwal || tglAkhir ? `${tglAwal || "-"} s.d. ${tglAkhir || "-"}` : "Semua Tanggal";
  doc.text(`Rentang Tanggal: ${rentangTgl}`, col1X, currentY);
  doc.text(`Penerima: ${penerima || "Semua"}`, col2X, currentY);
  currentY += 5;

  // Siapkan Data Tabel (12 Kolom sesuai Gambar 2)
  const tableHeaders = [
    [
      "No.",
      "Kode Prodi",
      "Program Studi",
      "Bank Syariah Indonesia",
      "Kasir BASK UIKA",
      "Bank Amanah Ummah",
      "Host to Host",
      "EduFin",
      "Deposit",
      "SIMPONI",
      "Total",
      "Jumlah Pembayaran",
    ],
  ];

  const tableBody = data.map((item) => [
    item.no,
    item.kodeProdi,
    item.prodi,
    formatRupiah(item.bankSyariahIndonesia || 0),
    formatRupiah(item.kasirBaskUika || 0),
    formatRupiah(item.bankAmanahUmmah || 0),
    formatRupiah(item.hostToHost || 0),
    formatRupiah(item.eduFin || 0),
    formatRupiah(item.deposit || 0),
    formatRupiah(item.simponi || 0),
    formatRupiah(item.total || 0),
    (item.jumlahPembayaran || 0).toLocaleString("id-ID"),
  ]);

  const totalBsi = data.reduce((acc, curr) => acc + (curr.bankSyariahIndonesia || 0), 0);
  const totalBask = data.reduce((acc, curr) => acc + (curr.kasirBaskUika || 0), 0);
  const totalAmanah = data.reduce((acc, curr) => acc + (curr.bankAmanahUmmah || 0), 0);
  const totalH2h = data.reduce((acc, curr) => acc + (curr.hostToHost || 0), 0);
  const totalEdufin = data.reduce((acc, curr) => acc + (curr.eduFin || 0), 0);
  const totalDeposit = data.reduce((acc, curr) => acc + (curr.deposit || 0), 0);
  const totalSimponi = data.reduce((acc, curr) => acc + (curr.simponi || 0), 0);
  const grandTotal = data.reduce((acc, curr) => acc + (curr.total || 0), 0);
  const totalJumlahPembayaran = data.reduce((acc, curr) => acc + (curr.jumlahPembayaran || 0), 0);

  autoTable(doc, {
    head: tableHeaders,
    body: tableBody,
    startY: currentY,
    theme: "grid",
    headStyles: {
      fillColor: [30, 58, 138],
      textColor: [255, 255, 255],
      fontSize: 7.5,
      fontStyle: "bold",
      halign: "center",
      valign: "middle",
      cellPadding: 2,
    },
    bodyStyles: {
      fontSize: 7,
      textColor: [30, 30, 30],
      cellPadding: 2,
    },
    columnStyles: {
      0: { halign: "center", cellWidth: 10 },
      1: { halign: "center", cellWidth: 16 },
      2: { cellWidth: 44, fontStyle: "bold" },
      3: { halign: "right", cellWidth: 25 },
      4: { halign: "right", cellWidth: 23 },
      5: { halign: "right", cellWidth: 25 },
      6: { halign: "right", cellWidth: 23 },
      7: { halign: "right", cellWidth: 22 },
      8: { halign: "right", cellWidth: 22 },
      9: { halign: "right", cellWidth: 22 },
      10: { halign: "right", cellWidth: 26, fontStyle: "bold", textColor: [30, 58, 138] },
      11: { halign: "center", cellWidth: 19, fontStyle: "bold" },
    },
    foot: [
      [
        {
          content: "TOTAL KESELURUHAN",
          colSpan: 3,
          styles: { halign: "center", fontStyle: "bold" },
        },
        {
          content: formatRupiah(totalBsi),
          styles: { halign: "right", fontStyle: "bold" },
        },
        {
          content: formatRupiah(totalBask),
          styles: { halign: "right", fontStyle: "bold" },
        },
        {
          content: formatRupiah(totalAmanah),
          styles: { halign: "right", fontStyle: "bold" },
        },
        {
          content: formatRupiah(totalH2h),
          styles: { halign: "right", fontStyle: "bold" },
        },
        {
          content: formatRupiah(totalEdufin),
          styles: { halign: "right", fontStyle: "bold" },
        },
        {
          content: formatRupiah(totalDeposit),
          styles: { halign: "right", fontStyle: "bold" },
        },
        {
          content: formatRupiah(totalSimponi),
          styles: { halign: "right", fontStyle: "bold" },
        },
        {
          content: formatRupiah(grandTotal),
          styles: { halign: "right", fontStyle: "bold", textColor: [30, 58, 138] },
        },
        {
          content: totalJumlahPembayaran.toLocaleString("id-ID"),
          styles: { halign: "center", fontStyle: "bold" },
        },
      ],
    ],
    footStyles: {
      fillColor: [243, 244, 246],
      textColor: [20, 20, 20],
      fontSize: 7.5,
      fontStyle: "bold",
    },
    margin: { left: 10, right: 10 },
    didDrawPage: (pageData) => {
      const pageCount = (doc as unknown as { internal: { getNumberOfPages: () => number } }).internal.getNumberOfPages();
      doc.setFontSize(8);
      doc.setTextColor(130, 130, 130);
      doc.text(
        `Halaman ${pageData.pageNumber} dari ${pageCount}`,
        pageWidth - 14,
        doc.internal.pageSize.getHeight() - 8,
        { align: "right" }
      );
    },
  });

  const filename = `Laporan_Rekap_Pembayaran_${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(filename);
}

/**
 * Export Laporan Rekapitulasi Pembayaran ke Excel (.xlsx)
 */
export function exportRekapPembayaranToExcel(
  params: ExportRekapPembayaranParams
): void {
  const {
    useKop = true,
    periodePembayaran,
    prodi,
    metodePembayaran,
    channel,
    tglAwal,
    tglAkhir,
    penerima,
    data,
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
  const periodeStr = periodePembayaran || "SEMUA PERIODE";
  rows.push([`LAPORAN REKAPITULASI PEMBAYARAN PERIODE ${periodeStr.toUpperCase()}`]);
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
    periodePembayaran || "Semua",
    "",
    "Program Studi",
    prodi || "Semua",
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
    tglAwal || tglAkhir ? `${tglAwal || "-"} s.d. ${tglAkhir || "-"}` : "Semua",
    "",
    "Penerima",
    penerima || "Semua",
  ]);
  rows.push([]);

  // Header Kolom Tabel (12 Kolom sesuai Gambar 2)
  rows.push([
    "No.",
    "Kode Prodi",
    "Program Studi",
    "Bank Syariah Indonesia",
    "Kasir BASK UIKA",
    "Bank Amanah Ummah",
    "Host to Host",
    "EduFin",
    "Deposit",
    "SIMPONI",
    "Total",
    "Jumlah Pembayaran",
  ]);

  let totalBsi = 0;
  let totalBask = 0;
  let totalAmanah = 0;
  let totalH2h = 0;
  let totalEdufin = 0;
  let totalDeposit = 0;
  let totalSimponi = 0;
  let grandTotal = 0;
  let totalTrx = 0;

  data.forEach((item) => {
    totalBsi += item.bankSyariahIndonesia || 0;
    totalBask += item.kasirBaskUika || 0;
    totalAmanah += item.bankAmanahUmmah || 0;
    totalH2h += item.hostToHost || 0;
    totalEdufin += item.eduFin || 0;
    totalDeposit += item.deposit || 0;
    totalSimponi += item.simponi || 0;
    grandTotal += item.total || 0;
    totalTrx += item.jumlahPembayaran || 0;

    rows.push([
      item.no,
      item.kodeProdi,
      item.prodi,
      item.bankSyariahIndonesia || 0,
      item.kasirBaskUika || 0,
      item.bankAmanahUmmah || 0,
      item.hostToHost || 0,
      item.eduFin || 0,
      item.deposit || 0,
      item.simponi || 0,
      item.total || 0,
      item.jumlahPembayaran || 0,
    ]);
  });

  // Baris Total
  rows.push([]);
  rows.push([
    "TOTAL KESELURUHAN",
    "",
    "",
    totalBsi,
    totalBask,
    totalAmanah,
    totalH2h,
    totalEdufin,
    totalDeposit,
    totalSimponi,
    grandTotal,
    totalTrx,
  ]);

  const worksheet = XLSX.utils.aoa_to_sheet(rows);

  worksheet["!cols"] = [
    { wch: 6 },
    { wch: 14 },
    { wch: 35 },
    { wch: 22 },
    { wch: 20 },
    { wch: 22 },
    { wch: 20 },
    { wch: 18 },
    { wch: 18 },
    { wch: 18 },
    { wch: 24 },
    { wch: 20 },
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Rekap Pembayaran");

  const filename = `Laporan_Rekap_Pembayaran_${new Date().toISOString().slice(0, 10)}.xlsx`;
  XLSX.writeFile(workbook, filename);
}

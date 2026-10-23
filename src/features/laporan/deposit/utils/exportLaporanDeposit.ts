import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import type {
  LaporanDepositRowData,
  LaporanRekapDepositRowData,
} from "./generateLaporanDepositHtml";

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

const drawKop = async (doc: jsPDF, pageWidth: number): Promise<number> => {
  let currentY = 12;
  try {
    const logoBase64 = await loadImageAsBase64("/images/logo-uika.png");
    if (logoBase64) {
      doc.addImage(logoBase64, "PNG", 18, currentY - 5, 20, 20);
    }
  } catch {
    // ignore
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
    "Jl KH Sholeh Iskandar KM 2 Kedung Badak Bogor 16162 Jawa Barat Indonesia",
    pageWidth / 2,
    currentY + 8,
    { align: "center" }
  );
  doc.text(
    "Telp: (0251) 8356884 | Email: info@uika-bogor.ac.id | Website: https://uika-bogor.ac.id",
    pageWidth / 2,
    currentY + 12,
    { align: "center" }
  );

  doc.setDrawColor(20, 20, 20);
  doc.setLineWidth(0.8);
  doc.line(14, currentY + 17, pageWidth - 14, currentY + 17);
  doc.setLineWidth(0.3);
  doc.line(14, currentY + 18.2, pageWidth - 14, currentY + 18.2);

  return currentY + 24;
};

// -------------------------------------------------------------
// 1. LAPORAN DEPOSIT
// -------------------------------------------------------------
export interface ExportDepositParams {
  useKop?: boolean;
  tahunAkademik: string;
  programStudi: string;
  metodePembayaran: string;
  channel: string;
  penerima: string;
  data: LaporanDepositRowData[];
  formatRupiah?: (n: number) => string;
}

export async function exportLaporanDepositToPdf(
  params: ExportDepositParams
): Promise<void> {
  const {
    useKop = true,
    tahunAkademik,
    programStudi,
    metodePembayaran,
    channel,
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

  if (useKop) {
    currentY = await drawKop(doc, pageWidth);
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(30, 41, 59);
  doc.text("LAPORAN DEPOSIT", pageWidth / 2, currentY, { align: "center" });

  currentY += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(50, 50, 50);

  const col1X = 14;
  const col2X = pageWidth / 2 + 10;
  doc.text(`Tahun Akademik: ${tahunAkademik}`, col1X, currentY);
  doc.text(`Metode Pembayaran: ${metodePembayaran || "Semua"}`, col2X, currentY);
  currentY += 4.5;
  doc.text(`Program Studi: ${programStudi || "Semua"}`, col1X, currentY);
  doc.text(`Channel: ${channel || "Semua"}`, col2X, currentY);
  currentY += 4.5;
  doc.text(`Penerima: ${penerima}`, col1X, currentY);
  doc.text(`Total Transaksi: ${data.length} Transaksi`, col2X, currentY);

  currentY += 6;

  const tableHeaders = [
    "No.",
    "Kode Deposit",
    "NIM",
    "Nama",
    "Program Studi",
    "Periode",
    "Metode Pembayaran",
    "Keterangan",
    "Tanggal",
    "Masuk",
    "Keluar",
  ];

  const tableRows = data.map((row) => [
    row.no,
    row.kodeDeposit || "-",
    row.nim,
    row.nama,
    row.prodi,
    row.periode || "-",
    row.metodePembayaran,
    row.keterangan || "-",
    row.tanggal || row.tanggalDeposit || "-",
    formatRupiah(row.masuk ?? row.nominalDeposit ?? 0),
    formatRupiah(row.keluar ?? 0),
  ]);

  const totalMasuk = data.reduce(
    (acc, curr) => acc + (curr.masuk ?? curr.nominalDeposit ?? 0),
    0
  );
  const totalKeluar = data.reduce((acc, curr) => acc + (curr.keluar ?? 0), 0);

  autoTable(doc, {
    startY: currentY,
    head: [tableHeaders],
    body: tableRows,
    foot: [
      [
        {
          content: `TOTAL KESELURUHAN DEPOSIT (${data.length} TRANSAKSI)`,
          colSpan: 9,
          styles: { halign: "center", fontStyle: "bold" },
        },
        {
          content: formatRupiah(totalMasuk),
          styles: { halign: "right", fontStyle: "bold", textColor: [30, 58, 138] },
        },
        {
          content: formatRupiah(totalKeluar),
          styles: { halign: "right", fontStyle: "bold", textColor: [185, 28, 28] },
        },
      ],
    ],
    theme: "grid",
    headStyles: {
      fillColor: [30, 58, 138],
      textColor: 255,
      fontSize: 8,
      halign: "center",
      valign: "middle",
    },
    bodyStyles: {
      fontSize: 7.5,
      textColor: [40, 40, 40],
      valign: "middle",
    },
    columnStyles: {
      0: { halign: "center", cellWidth: 10 },
      1: { cellWidth: 26 },
      2: { halign: "center", cellWidth: 24 },
      3: { fontStyle: "bold", cellWidth: 32 },
      4: { cellWidth: 36 },
      5: { halign: "center", cellWidth: 24 },
      6: { cellWidth: 26 },
      7: { cellWidth: 30 },
      8: { halign: "center", cellWidth: 19 },
      9: { halign: "right", fontStyle: "bold", cellWidth: 21 },
      10: { halign: "right", fontStyle: "bold", cellWidth: 21 },
    },
    styles: { overflow: "linebreak", cellPadding: 2 },
    margin: { left: 14, right: 14 },
  });

  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(7.5);
    doc.setTextColor(130, 130, 130);
    doc.text(
      `Halaman ${i} dari ${pageCount} | Laporan Deposit UIKA`,
      pageWidth - 14,
      doc.internal.pageSize.getHeight() - 8,
      { align: "right" }
    );
  }

  doc.save(`Laporan_Deposit_${tahunAkademik.replace(/\s+/g, "_")}.pdf`);
}

export function exportLaporanDepositToExcel(params: ExportDepositParams): void {
  const {
    tahunAkademik,
    programStudi,
    metodePembayaran,
    channel,
    penerima,
    data,
  } = params;

  const rows: (string | number)[][] = [
    ["UNIVERSITAS IBN KHALDUN BOGOR"],
    ["LAPORAN DEPOSIT"],
    [],
    ["Tahun Akademik", tahunAkademik],
    ["Program Studi", programStudi || "Semua"],
    ["Metode Pembayaran", metodePembayaran || "Semua"],
    ["Channel", channel || "Semua"],
    ["Penerima", penerima],
    [],
    [
      "No.",
      "Kode Deposit",
      "NIM",
      "Nama",
      "Program Studi",
      "Periode",
      "Metode Pembayaran",
      "Keterangan",
      "Tanggal",
      "Masuk",
      "Keluar",
    ],
  ];

  let totalMasuk = 0;
  let totalKeluar = 0;
  data.forEach((item) => {
    const masuk = item.masuk ?? item.nominalDeposit ?? 0;
    const keluar = item.keluar ?? 0;
    totalMasuk += masuk;
    totalKeluar += keluar;
    rows.push([
      item.no,
      item.kodeDeposit || "-",
      item.nim,
      item.nama,
      item.prodi,
      item.periode || "-",
      item.metodePembayaran,
      item.keterangan || "-",
      item.tanggal || item.tanggalDeposit || "-",
      masuk,
      keluar,
    ]);
  });

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
    totalMasuk,
    totalKeluar,
  ]);

  const worksheet = XLSX.utils.aoa_to_sheet(rows);
  worksheet["!cols"] = [
    { wch: 6 },
    { wch: 18 },
    { wch: 16 },
    { wch: 28 },
    { wch: 30 },
    { wch: 18 },
    { wch: 22 },
    { wch: 28 },
    { wch: 14 },
    { wch: 18 },
    { wch: 18 },
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Deposit");
  XLSX.writeFile(
    workbook,
    `Laporan_Deposit_${tahunAkademik.replace(/\s+/g, "_")}.xlsx`
  );
}

// -------------------------------------------------------------
// 2. LAPORAN REKAP DEPOSIT
// -------------------------------------------------------------
export interface ExportRekapDepositParams {
  useKop?: boolean;
  tahunAkademik: string;
  programStudi: string;
  metodePembayaran: string;
  channel: string;
  tglAwal?: string;
  tglAkhir?: string;
  data: LaporanRekapDepositRowData[];
  formatRupiah?: (n: number) => string;
}

export async function exportLaporanRekapDepositToPdf(
  params: ExportRekapDepositParams
): Promise<void> {
  const {
    useKop = true,
    tahunAkademik,
    programStudi,
    metodePembayaran,
    channel,
    tglAwal,
    tglAkhir,
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

  if (useKop) {
    currentY = await drawKop(doc, pageWidth);
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(30, 41, 59);
  doc.text("LAPORAN REKAP DEPOSIT", pageWidth / 2, currentY, {
    align: "center",
  });

  currentY += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(50, 50, 50);

  const col1X = 14;
  const col2X = pageWidth / 2 + 10;
  doc.text(`Tahun Akademik: ${tahunAkademik}`, col1X, currentY);
  doc.text(`Metode Pembayaran: ${metodePembayaran || "Semua"}`, col2X, currentY);
  currentY += 4.5;
  doc.text(`Program Studi: ${programStudi || "Semua"}`, col1X, currentY);
  doc.text(`Channel: ${channel || "Semua"}`, col2X, currentY);
  currentY += 4.5;
  doc.text(
    `Periode Tanggal: ${tglAwal && tglAkhir ? `${tglAwal} s/d ${tglAkhir}` : "Semua Periode"}`,
    col1X,
    currentY
  );
  doc.text(`Total Entitas: ${data.length} Rekap`, col2X, currentY);

  currentY += 6;

  const tableHeaders = [
    "No.",
    "Program Studi",
    "Masuk",
    "Keluar",
  ];

  const tableRows = data.map((row) => [
    row.no,
    row.prodi,
    formatRupiah(row.masuk ?? row.totalDepositMasuk ?? 0),
    formatRupiah(row.keluar ?? row.totalTerpakai ?? 0),
  ]);

  const totalMasuk = data.reduce(
    (acc, curr) => acc + (curr.masuk ?? curr.totalDepositMasuk ?? 0),
    0
  );
  const totalKeluar = data.reduce(
    (acc, curr) => acc + (curr.keluar ?? curr.totalTerpakai ?? 0),
    0
  );

  autoTable(doc, {
    startY: currentY,
    head: [tableHeaders],
    body: tableRows,
    foot: [
      [
        {
          content: "TOTAL KESELURUHAN REKAP",
          colSpan: 2,
          styles: { halign: "center", fontStyle: "bold" },
        },
        {
          content: formatRupiah(totalMasuk),
          styles: { halign: "right", fontStyle: "bold", textColor: [30, 58, 138] },
        },
        {
          content: formatRupiah(totalKeluar),
          styles: { halign: "right", fontStyle: "bold", textColor: [185, 28, 28] },
        },
      ],
    ],
    theme: "grid",
    headStyles: {
      fillColor: [30, 58, 138],
      textColor: 255,
      fontSize: 8,
      halign: "center",
      valign: "middle",
    },
    bodyStyles: {
      fontSize: 7.5,
      textColor: [40, 40, 40],
      valign: "middle",
    },
    columnStyles: {
      0: { halign: "center", cellWidth: 15 },
      1: { fontStyle: "bold", cellWidth: 144 },
      2: { halign: "right", fontStyle: "bold", cellWidth: 55 },
      3: { halign: "right", fontStyle: "bold", cellWidth: 55 },
    },
    styles: { overflow: "linebreak", cellPadding: 2 },
    margin: { left: 14, right: 14 },
  });

  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(7.5);
    doc.setTextColor(130, 130, 130);
    doc.text(
      `Halaman ${i} dari ${pageCount} | Laporan Rekap Deposit UIKA`,
      pageWidth - 14,
      doc.internal.pageSize.getHeight() - 8,
      { align: "right" }
    );
  }

  doc.save(`Laporan_Rekap_Deposit_${tahunAkademik.replace(/\s+/g, "_")}.pdf`);
}

export function exportLaporanRekapDepositToExcel(
  params: ExportRekapDepositParams
): void {
  const {
    tahunAkademik,
    programStudi,
    metodePembayaran,
    channel,
    tglAwal,
    tglAkhir,
    data,
  } = params;

  const rows: (string | number)[][] = [
    ["UNIVERSITAS IBN KHALDUN BOGOR"],
    ["LAPORAN REKAP DEPOSIT"],
    [],
    ["Tahun Akademik", tahunAkademik],
    ["Program Studi", programStudi || "Semua"],
    ["Metode Pembayaran", metodePembayaran || "Semua"],
    ["Channel", channel || "Semua"],
    ["Periode Tanggal", tglAwal && tglAkhir ? `${tglAwal} s/d ${tglAkhir}` : "Semua"],
    [],
    [
      "No.",
      "Program Studi",
      "Masuk",
      "Keluar",
    ],
  ];

  let totalMasuk = 0;
  let totalKeluar = 0;

  data.forEach((item) => {
    const masuk = item.masuk ?? item.totalDepositMasuk ?? 0;
    const keluar = item.keluar ?? item.totalTerpakai ?? 0;
    totalMasuk += masuk;
    totalKeluar += keluar;

    rows.push([
      item.no,
      item.prodi,
      masuk,
      keluar,
    ]);
  });

  rows.push([
    "TOTAL",
    "",
    totalMasuk,
    totalKeluar,
  ]);

  const worksheet = XLSX.utils.aoa_to_sheet(rows);
  worksheet["!cols"] = [
    { wch: 6 },
    { wch: 40 },
    { wch: 24 },
    { wch: 24 },
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Rekap Deposit");
  XLSX.writeFile(
    workbook,
    `Laporan_Rekap_Deposit_${tahunAkademik.replace(/\s+/g, "_")}.xlsx`
  );
}

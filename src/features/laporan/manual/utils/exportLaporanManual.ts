import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import type { LaporanManualRowData } from "./generateLaporanManualHtml";

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

export interface ExportLaporanManualParams {
  useKop?: boolean;
  namaLaporan: string;
  periodeMasuk: string;
  programStudi: string;
  gelombang: string;
  jalur: string;
  sistemKuliah: string;
  data: LaporanManualRowData[];
}

export async function exportLaporanManualToPdf(
  params: ExportLaporanManualParams
): Promise<void> {
  const {
    useKop = true,
    namaLaporan,
    periodeMasuk,
    programStudi,
    gelombang,
    jalur,
    sistemKuliah,
    data,
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
  doc.text(namaLaporan.toUpperCase(), pageWidth / 2, currentY, {
    align: "center",
  });

  currentY += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(50, 50, 50);

  const col1X = 14;
  const col2X = pageWidth / 2 + 10;
  doc.text(`Periode Masuk: ${periodeMasuk || "Semua"}`, col1X, currentY);
  doc.text(`Gelombang: ${gelombang || "Semua"}`, col2X, currentY);
  currentY += 4.5;
  doc.text(`Program Studi: ${programStudi || "Semua"}`, col1X, currentY);
  doc.text(`Jalur: ${jalur || "Semua"}`, col2X, currentY);
  currentY += 4.5;
  doc.text(`Sistem Kuliah: ${sistemKuliah || "Semua"}`, col1X, currentY);
  doc.text(`Total Mahasiswa: ${data.length} Orang`, col2X, currentY);

  currentY += 6;

  const tableHeaders = [
    "NO.",
    "Nama",
    "Nim",
    "Prodi",
    "Periode Masuk",
    "Gelombang",
    "Jalur Pendaftaran",
    "Sistem Kuliah",
  ];

  const tableRows = data.map((row) => [
    row.no,
    row.nama,
    row.nim,
    row.prodi,
    row.periodeMasuk,
    row.gelombang,
    row.jalur,
    row.sistemKuliah,
  ]);

  autoTable(doc, {
    startY: currentY,
    head: [tableHeaders],
    body: tableRows,
    foot: [
      [
        {
          content: `TOTAL KESELURUHAN: ${data.length} MAHASISWA`,
          colSpan: 8,
          styles: { halign: "center", fontStyle: "bold" },
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
      1: { fontStyle: "bold", cellWidth: 44 },
      2: { halign: "center", cellWidth: 26 },
      3: { cellWidth: 48 },
      4: { halign: "center", cellWidth: 26 },
      5: { halign: "center", cellWidth: 26 },
      6: { cellWidth: 38 },
      7: { halign: "center", cellWidth: 28 },
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
      `Halaman ${i} dari ${pageCount} | ${namaLaporan} UIKA`,
      pageWidth - 14,
      doc.internal.pageSize.getHeight() - 8,
      { align: "right" }
    );
  }

  doc.save(`${namaLaporan.replace(/\s+/g, "_")}.pdf`);
}

export function exportLaporanManualToExcel(
  params: ExportLaporanManualParams
): void {
  const {
    namaLaporan,
    periodeMasuk,
    programStudi,
    gelombang,
    jalur,
    sistemKuliah,
    data,
  } = params;

  const rows: (string | number)[][] = [
    ["UNIVERSITAS IBN KHALDUN BOGOR"],
    [namaLaporan.toUpperCase()],
    [],
    ["Periode Masuk", periodeMasuk || "Semua"],
    ["Program Studi", programStudi || "Semua"],
    ["Gelombang", gelombang || "Semua"],
    ["Jalur Pendaftaran", jalur || "Semua"],
    ["Sistem Kuliah", sistemKuliah || "Semua"],
    [],
    [
      "NO.",
      "Nama",
      "Nim",
      "Prodi",
      "Periode Masuk",
      "Gelombang",
      "Jalur Pendaftaran",
      "Sistem Kuliah",
    ],
  ];

  data.forEach((item) => {
    rows.push([
      item.no,
      item.nama,
      item.nim,
      item.prodi,
      item.periodeMasuk,
      item.gelombang,
      item.jalur,
      item.sistemKuliah,
    ]);
  });

  rows.push(["TOTAL", `${data.length} Mahasiswa`, "", "", "", "", "", ""]);

  const worksheet = XLSX.utils.aoa_to_sheet(rows);
  worksheet["!cols"] = [
    { wch: 6 },
    { wch: 28 },
    { wch: 16 },
    { wch: 32 },
    { wch: 18 },
    { wch: 16 },
    { wch: 28 },
    { wch: 18 },
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan Manual");
  XLSX.writeFile(workbook, `${namaLaporan.replace(/\s+/g, "_")}.xlsx`);
}

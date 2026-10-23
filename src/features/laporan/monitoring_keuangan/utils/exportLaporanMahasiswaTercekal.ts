import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import type { LaporanMahasiswaTercekalRowData } from "./generateLaporanMahasiswaTercekalHtml";

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

export interface ExportMahasiswaTercekalParams {
  useKop?: boolean;
  unitKerja: string;
  periodeAkademik: string;
  aturanAkademik: string;
  periodeMasuk: string;
  statusSemester: string;
  data: LaporanMahasiswaTercekalRowData[];
  formatRupiah?: (n: number) => string;
}

export async function exportLaporanMahasiswaTercekalToPdf(
  params: ExportMahasiswaTercekalParams
): Promise<void> {
  const {
    useKop = true,
    unitKerja,
    periodeAkademik,
    aturanAkademik,
    periodeMasuk,
    statusSemester,
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
  doc.text("LAPORAN MAHASISWA TERCEKAL ATURAN AKADEMIK", pageWidth / 2, currentY, {
    align: "center",
  });

  currentY += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(50, 50, 50);

  const col1X = 14;
  const col2X = pageWidth / 2 + 10;
  doc.text(`Unit Kerja: ${unitKerja}`, col1X, currentY);
  doc.text(`Aturan Akademik: ${aturanAkademik}`, col2X, currentY);
  currentY += 4.5;
  doc.text(`Periode Akademik: ${periodeAkademik}`, col1X, currentY);
  doc.text(`Periode Masuk: ${periodeMasuk || "Semua"}`, col2X, currentY);
  currentY += 4.5;
  doc.text(`Status Semester: ${statusSemester || "Semua"}`, col1X, currentY);
  doc.text(`Total Tercekal: ${data.length} Orang`, col2X, currentY);

  currentY += 6;

  const tableHeaders = [
    "No",
    "NIM",
    "Nama Mahasiswa",
    "Program Studi",
    "Aturan Akademik",
    "Alasan Tercekal",
    "Tunggakan (Rp)",
    "Status",
  ];

  const tableRows = data.map((row) => [
    row.no,
    row.nim,
    row.nama,
    row.prodi,
    row.aturanAkademik,
    row.alasanTercekal,
    formatRupiah(row.tunggakan),
    row.status,
  ]);

  const totalTunggakan = data.reduce((acc, curr) => acc + curr.tunggakan, 0);

  autoTable(doc, {
    startY: currentY,
    head: [tableHeaders],
    body: tableRows,
    foot: [
      [
        {
          content: `TOTAL TUNGGAKAN (${data.length} MAHASISWA TERCEKAL)`,
          colSpan: 6,
          styles: { halign: "center", fontStyle: "bold" },
        },
        {
          content: formatRupiah(totalTunggakan),
          styles: { halign: "right", fontStyle: "bold", textColor: [185, 28, 28] },
        },
        { content: "" },
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
      1: { cellWidth: 24 },
      2: { fontStyle: "bold", cellWidth: 40 },
      3: { cellWidth: 46 },
      4: { cellWidth: 36 },
      5: { cellWidth: 50 },
      6: { halign: "right", fontStyle: "bold", cellWidth: 34 },
      7: { halign: "center", cellWidth: 20 },
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
      `Halaman ${i} dari ${pageCount} | Mahasiswa Tercekal UIKA`,
      pageWidth - 14,
      doc.internal.pageSize.getHeight() - 8,
      { align: "right" }
    );
  }

  doc.save(
    `Laporan_Mahasiswa_Tercekal_${periodeAkademik.replace(/\s+/g, "_")}.pdf`
  );
}

export function exportLaporanMahasiswaTercekalToExcel(
  params: ExportMahasiswaTercekalParams
): void {
  const {
    unitKerja,
    periodeAkademik,
    aturanAkademik,
    periodeMasuk,
    statusSemester,
    data,
  } = params;

  const rows: (string | number)[][] = [
    ["UNIVERSITAS IBN KHALDUN BOGOR"],
    ["LAPORAN MAHASISWA TERCEKAL ATURAN AKADEMIK"],
    [],
    ["Unit Kerja", unitKerja],
    ["Periode Akademik", periodeAkademik],
    ["Aturan Akademik", aturanAkademik],
    ["Periode Masuk", periodeMasuk || "Semua"],
    ["Status Semester", statusSemester || "Semua"],
    [],
    [
      "No",
      "NIM",
      "Nama Mahasiswa",
      "Program Studi",
      "Aturan Akademik",
      "Alasan Tercekal",
      "Tunggakan",
      "Status",
    ],
  ];

  let totalTunggakan = 0;
  data.forEach((item) => {
    totalTunggakan += item.tunggakan;
    rows.push([
      item.no,
      item.nim,
      item.nama,
      item.prodi,
      item.aturanAkademik,
      item.alasanTercekal,
      item.tunggakan,
      item.status,
    ]);
  });

  rows.push([
    "TOTAL",
    "",
    "",
    "",
    "",
    "",
    totalTunggakan,
    `${data.length} Orang`,
  ]);

  const worksheet = XLSX.utils.aoa_to_sheet(rows);
  worksheet["!cols"] = [
    { wch: 6 },
    { wch: 16 },
    { wch: 28 },
    { wch: 32 },
    { wch: 22 },
    { wch: 36 },
    { wch: 20 },
    { wch: 16 },
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Mahasiswa Tercekal");
  XLSX.writeFile(
    workbook,
    `Laporan_Mahasiswa_Tercekal_${periodeAkademik.replace(/\s+/g, "_")}.xlsx`
  );
}

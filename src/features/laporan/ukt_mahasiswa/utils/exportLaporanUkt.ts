import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import type {
  LaporanPenerimaUktRowData,
  LaporanTarifUktRowData,
  LaporanTarifTagihanRowData,
} from "./generateLaporanUktHtml";

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
// 1. LAPORAN PENERIMA UKT
// -------------------------------------------------------------
export interface ExportPenerimaUktParams {
  useKop?: boolean;
  tahunAkademik: string;
  programStudi: string;
  kelompokUkt: string;
  sistemKuliah: string;
  jalurPendaftaran: string;
  gelombang: string;
  penerima: string;
  data: LaporanPenerimaUktRowData[];
  formatRupiah?: (n: number) => string;
}

export async function exportLaporanPenerimaUktToPdf(
  params: ExportPenerimaUktParams
): Promise<void> {
  const {
    useKop = true,
    tahunAkademik,
    programStudi,
    kelompokUkt,
    sistemKuliah,
    jalurPendaftaran,
    gelombang,
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
  doc.text("LAPORAN PENERIMA UKT", pageWidth / 2, currentY, { align: "center" });

  currentY += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(50, 50, 50);

  const col1X = 14;
  const col2X = pageWidth / 2 + 10;
  doc.text(`Tahun Akademik: ${tahunAkademik}`, col1X, currentY);
  doc.text(`Kelompok UKT: ${kelompokUkt || "Semua"}`, col2X, currentY);
  currentY += 4.5;
  doc.text(`Program Studi: ${programStudi}`, col1X, currentY);
  doc.text(`Sistem Kuliah: ${sistemKuliah || "Semua"}`, col2X, currentY);
  currentY += 4.5;
  doc.text(`Jalur Pendaftaran: ${jalurPendaftaran || "Semua"}`, col1X, currentY);
  doc.text(`Gelombang: ${gelombang || "Semua"}`, col2X, currentY);
  currentY += 4.5;
  doc.text(`Penerima: ${penerima}`, col1X, currentY);
  doc.text(`Total Mahasiswa: ${data.length} Orang`, col2X, currentY);

  currentY += 6;

  const tableHeaders = [
    "No.",
    "NIM",
    "Nama",
    "Program Studi",
    "Kelompok UKT",
    "Nominal UKT",
    "Valid?",
  ];

  const tableRows = data.map((row) => [
    row.no,
    row.nim,
    row.nama,
    row.prodi,
    row.kelompokUkt,
    formatRupiah(row.nominalUkt || row.tarifNominal || 0),
    row.valid || row.status || "Ya",
  ]);

  const totalTarif = data.reduce(
    (acc, curr) => acc + (curr.nominalUkt || curr.tarifNominal || 0),
    0
  );

  autoTable(doc, {
    startY: currentY,
    head: [tableHeaders],
    body: tableRows,
    foot: [
      [
        {
          content: `TOTAL KESELURUHAN (${data.length} MAHASISWA)`,
          colSpan: 5,
          styles: { halign: "center", fontStyle: "bold" },
        },
        {
          content: formatRupiah(totalTarif),
          styles: { halign: "right", fontStyle: "bold", textColor: [30, 58, 138] },
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
      0: { halign: "center", cellWidth: 12 },
      1: { halign: "center", cellWidth: 28 },
      2: { fontStyle: "bold", cellWidth: 55 },
      3: { cellWidth: 70 },
      4: { halign: "center", fontStyle: "bold", cellWidth: 35 },
      5: { halign: "right", fontStyle: "bold", cellWidth: 42 },
      6: { halign: "center", cellWidth: 25 },
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
      `Halaman ${i} dari ${pageCount} | Laporan Penerima UKT UIKA`,
      pageWidth - 14,
      doc.internal.pageSize.getHeight() - 8,
      { align: "right" }
    );
  }

  doc.save(`Laporan_Penerima_UKT_${tahunAkademik.replace(/\s+/g, "_")}.pdf`);
}

export function exportLaporanPenerimaUktToExcel(
  params: ExportPenerimaUktParams
): void {
  const {
    tahunAkademik,
    programStudi,
    kelompokUkt,
    sistemKuliah,
    jalurPendaftaran,
    gelombang,
    penerima,
    data,
  } = params;

  const rows: (string | number)[][] = [
    ["UNIVERSITAS IBN KHALDUN BOGOR"],
    ["LAPORAN PENERIMA UKT"],
    [],
    ["Tahun Akademik", tahunAkademik],
    ["Program Studi", programStudi],
    ["Kelompok UKT", kelompokUkt || "Semua"],
    ["Sistem Kuliah", sistemKuliah || "Semua"],
    ["Jalur Pendaftaran", jalurPendaftaran || "Semua"],
    ["Gelombang", gelombang || "Semua"],
    ["Penerima", penerima],
    [],
    [
      "No.",
      "NIM",
      "Nama",
      "Program Studi",
      "Kelompok UKT",
      "Nominal UKT",
      "Valid?",
    ],
  ];

  let totalNominal = 0;
  data.forEach((item) => {
    const nom = item.nominalUkt || item.tarifNominal || 0;
    totalNominal += nom;
    rows.push([
      item.no,
      item.nim,
      item.nama,
      item.prodi,
      item.kelompokUkt,
      nom,
      item.valid || item.status || "Ya",
    ]);
  });

  rows.push([
    "TOTAL",
    "",
    "",
    "",
    "",
    totalNominal,
    `${data.length} Mahasiswa`,
  ]);

  const worksheet = XLSX.utils.aoa_to_sheet(rows);
  worksheet["!cols"] = [
    { wch: 6 },
    { wch: 16 },
    { wch: 30 },
    { wch: 35 },
    { wch: 18 },
    { wch: 20 },
    { wch: 12 },
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Penerima UKT");
  XLSX.writeFile(
    workbook,
    `Laporan_Penerima_UKT_${tahunAkademik.replace(/\s+/g, "_")}.xlsx`
  );
}

// -------------------------------------------------------------
// 2. LAPORAN TARIF UKT
// -------------------------------------------------------------
export interface ExportTarifUktParams {
  useKop?: boolean;
  tahunAkademik: string;
  programStudi: string;
  kelompokUkt: string;
  sistemKuliah: string;
  jalurPendaftaran: string;
  gelombang: string;
  data: LaporanTarifUktRowData[];
  formatRupiah?: (n: number) => string;
}

export async function exportLaporanTarifUktToPdf(
  params: ExportTarifUktParams
): Promise<void> {
  const {
    useKop = true,
    tahunAkademik,
    programStudi,
    kelompokUkt,
    sistemKuliah,
    jalurPendaftaran,
    gelombang,
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
  doc.text("LAPORAN TARIF UKT", pageWidth / 2, currentY, { align: "center" });

  currentY += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(50, 50, 50);

  const col1X = 14;
  const col2X = pageWidth / 2 + 10;
  doc.text(`Tahun Akademik: ${tahunAkademik}`, col1X, currentY);
  doc.text(`Kelompok UKT: ${kelompokUkt || "Semua"}`, col2X, currentY);
  currentY += 4.5;
  doc.text(`Program Studi: ${programStudi}`, col1X, currentY);
  doc.text(`Sistem Kuliah: ${sistemKuliah || "Semua"}`, col2X, currentY);
  currentY += 4.5;
  doc.text(`Jalur Pendaftaran: ${jalurPendaftaran || "Semua"}`, col1X, currentY);
  doc.text(`Gelombang: ${gelombang || "Semua"}`, col2X, currentY);

  currentY += 6;

  const tableHeaders = [
    "No.",
    "Program Studi",
    "Gelombang",
    "Jalur Pendaftaran",
    "Sistem Kuliah",
    "Kelompok UKT",
    "Nominal Tarif",
    "kuota",
  ];

  const tableRows = data.map((row) => [
    row.no,
    row.prodi,
    row.gelombang,
    row.jalurPendaftaran,
    row.sistemKuliah,
    row.kelompokUkt,
    formatRupiah(row.nominalTarif || row.besaranTarif || 0),
    row.kuota ?? "-",
  ]);

  const totalTarif = data.reduce(
    (acc, curr) => acc + (curr.nominalTarif || curr.besaranTarif || 0),
    0
  );

  autoTable(doc, {
    startY: currentY,
    head: [tableHeaders],
    body: tableRows,
    foot: [
      [
        {
          content: `TOTAL BESARAN TARIF (${data.length} TARIF)`,
          colSpan: 6,
          styles: { halign: "center", fontStyle: "bold" },
        },
        {
          content: formatRupiah(totalTarif),
          styles: { halign: "right", fontStyle: "bold", textColor: [30, 58, 138] },
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
      0: { halign: "center", cellWidth: 12 },
      1: { fontStyle: "bold", cellWidth: 55 },
      2: { halign: "center", cellWidth: 28 },
      3: { cellWidth: 48 },
      4: { halign: "center", cellWidth: 32 },
      5: { halign: "center", fontStyle: "bold", cellWidth: 32 },
      6: { halign: "right", fontStyle: "bold", cellWidth: 38 },
      7: { halign: "center", cellWidth: 22 },
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
      `Halaman ${i} dari ${pageCount} | Laporan Tarif UKT UIKA`,
      pageWidth - 14,
      doc.internal.pageSize.getHeight() - 8,
      { align: "right" }
    );
  }

  doc.save(`Laporan_Tarif_UKT_${tahunAkademik.replace(/\s+/g, "_")}.pdf`);
}

export function exportLaporanTarifUktToExcel(
  params: ExportTarifUktParams
): void {
  const {
    tahunAkademik,
    programStudi,
    kelompokUkt,
    sistemKuliah,
    jalurPendaftaran,
    gelombang,
    data,
  } = params;

  const rows: (string | number)[][] = [
    ["UNIVERSITAS IBN KHALDUN BOGOR"],
    ["LAPORAN TARIF UKT"],
    [],
    ["Tahun Akademik", tahunAkademik],
    ["Program Studi", programStudi],
    ["Kelompok UKT", kelompokUkt || "Semua"],
    ["Sistem Kuliah", sistemKuliah || "Semua"],
    ["Jalur Pendaftaran", jalurPendaftaran || "Semua"],
    ["Gelombang", gelombang || "Semua"],
    [],
    [
      "No.",
      "Program Studi",
      "Gelombang",
      "Jalur Pendaftaran",
      "Sistem Kuliah",
      "Kelompok UKT",
      "Nominal Tarif",
      "kuota",
    ],
  ];

  let total = 0;
  data.forEach((item) => {
    const tarif = item.nominalTarif || item.besaranTarif || 0;
    total += tarif;
    rows.push([
      item.no,
      item.prodi,
      item.gelombang,
      item.jalurPendaftaran,
      item.sistemKuliah,
      item.kelompokUkt,
      tarif,
      item.kuota ?? "-",
    ]);
  });

  rows.push(["TOTAL", "", "", "", "", "", total, ""]);

  const worksheet = XLSX.utils.aoa_to_sheet(rows);
  worksheet["!cols"] = [
    { wch: 6 },
    { wch: 34 },
    { wch: 18 },
    { wch: 25 },
    { wch: 18 },
    { wch: 18 },
    { wch: 22 },
    { wch: 12 },
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Tarif UKT");
  XLSX.writeFile(
    workbook,
    `Laporan_Tarif_UKT_${tahunAkademik.replace(/\s+/g, "_")}.xlsx`
  );
}

// -------------------------------------------------------------
// 3. LAPORAN TARIF TAGIHAN
// -------------------------------------------------------------
export interface ExportTarifTagihanParams {
  useKop?: boolean;
  tahunAkademik: string;
  programStudi: string;
  sistemKuliah: string;
  jalurPendaftaran: string;
  gelombang: string;
  jenisTagihan: string;
  data: LaporanTarifTagihanRowData[];
  formatRupiah?: (n: number) => string;
}

export async function exportLaporanTarifTagihanToPdf(
  params: ExportTarifTagihanParams
): Promise<void> {
  const {
    useKop = true,
    tahunAkademik,
    programStudi,
    sistemKuliah,
    jalurPendaftaran,
    gelombang,
    jenisTagihan,
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
  doc.text("LAPORAN TARIF TAGIHAN", pageWidth / 2, currentY, {
    align: "center",
  });

  currentY += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(50, 50, 50);

  const col1X = 14;
  const col2X = pageWidth / 2 + 10;
  doc.text(`Tahun Akademik: ${tahunAkademik}`, col1X, currentY);
  doc.text(`Sistem Kuliah: ${sistemKuliah || "Semua"}`, col2X, currentY);
  currentY += 4.5;
  doc.text(`Program Studi: ${programStudi}`, col1X, currentY);
  doc.text(`Jalur Pendaftaran: ${jalurPendaftaran || "Semua"}`, col2X, currentY);
  currentY += 4.5;
  doc.text(`Jenis Tagihan: ${jenisTagihan || "Semua"}`, col1X, currentY);
  doc.text(`Gelombang: ${gelombang || "Semua"}`, col2X, currentY);

  currentY += 6;

  const tableHeaders = [
    "No.",
    "Program Studi",
    "Gelombang",
    "Jalur Pendaftaran",
    "Sistem Kuliah",
    "Jenis Akun",
    "Nominal Tarif",
    "Jml. Cicilan",
    "Semester",
  ];

  const tableRows = data.map((row) => [
    row.no,
    row.prodi,
    row.gelombang,
    row.jalurPendaftaran,
    row.sistemKuliah,
    row.jenisAkun || row.jenisTagihan || "-",
    formatRupiah(row.nominalTarif || row.besaranTarif || 0),
    row.jmlCicilan ?? 1,
    row.semester || "-",
  ]);

  const totalTarif = data.reduce(
    (acc, curr) => acc + (curr.nominalTarif || curr.besaranTarif || 0),
    0
  );

  autoTable(doc, {
    startY: currentY,
    head: [tableHeaders],
    body: tableRows,
    foot: [
      [
        {
          content: `TOTAL BESARAN TARIF (${data.length} TARIF)`,
          colSpan: 6,
          styles: { halign: "center", fontStyle: "bold" },
        },
        {
          content: formatRupiah(totalTarif),
          styles: { halign: "right", fontStyle: "bold", textColor: [30, 58, 138] },
        },
        { content: "" },
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
      0: { halign: "center", cellWidth: 12 },
      1: { fontStyle: "bold", cellWidth: 48 },
      2: { halign: "center", cellWidth: 26 },
      3: { cellWidth: 42 },
      4: { halign: "center", cellWidth: 26 },
      5: { fontStyle: "bold", cellWidth: 40 },
      6: { halign: "right", fontStyle: "bold", cellWidth: 35 },
      7: { halign: "center", cellWidth: 20 },
      8: { halign: "center", cellWidth: 20 },
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
      `Halaman ${i} dari ${pageCount} | Laporan Tarif Tagihan UIKA`,
      pageWidth - 14,
      doc.internal.pageSize.getHeight() - 8,
      { align: "right" }
    );
  }

  doc.save(`Laporan_Tarif_Tagihan_${tahunAkademik.replace(/\s+/g, "_")}.pdf`);
}

export function exportLaporanTarifTagihanToExcel(
  params: ExportTarifTagihanParams
): void {
  const {
    tahunAkademik,
    programStudi,
    sistemKuliah,
    jalurPendaftaran,
    gelombang,
    jenisTagihan,
    data,
  } = params;

  const rows: (string | number)[][] = [
    ["UNIVERSITAS IBN KHALDUN BOGOR"],
    ["LAPORAN TARIF TAGIHAN"],
    [],
    ["Tahun Akademik", tahunAkademik],
    ["Program Studi", programStudi],
    ["Sistem Kuliah", sistemKuliah || "Semua"],
    ["Jalur Pendaftaran", jalurPendaftaran || "Semua"],
    ["Gelombang", gelombang || "Semua"],
    ["Jenis Tagihan", jenisTagihan || "Semua"],
    [],
    [
      "No.",
      "Program Studi",
      "Gelombang",
      "Jalur Pendaftaran",
      "Sistem Kuliah",
      "Jenis Akun",
      "Nominal Tarif",
      "Jml. Cicilan",
      "Semester",
    ],
  ];

  let total = 0;
  data.forEach((item) => {
    const tarif = item.nominalTarif || item.besaranTarif || 0;
    total += tarif;
    rows.push([
      item.no,
      item.prodi,
      item.gelombang,
      item.jalurPendaftaran,
      item.sistemKuliah,
      item.jenisAkun || item.jenisTagihan || "-",
      tarif,
      item.jmlCicilan ?? 1,
      item.semester || "-",
    ]);
  });

  rows.push(["TOTAL", "", "", "", "", "", total, "", ""]);

  const worksheet = XLSX.utils.aoa_to_sheet(rows);
  worksheet["!cols"] = [
    { wch: 6 },
    { wch: 32 },
    { wch: 18 },
    { wch: 24 },
    { wch: 18 },
    { wch: 26 },
    { wch: 22 },
    { wch: 14 },
    { wch: 14 },
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Tarif Tagihan");
  XLSX.writeFile(
    workbook,
    `Laporan_Tarif_Tagihan_${tahunAkademik.replace(/\s+/g, "_")}.xlsx`
  );
}

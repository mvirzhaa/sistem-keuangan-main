import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import type {
  LaporanPenerimaPotonganRowData,
  RekapPotonganBeasiswaRowData,
} from "./generateLaporanPotonganHtml";

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

// 1. LAPORAN PENERIMA POTONGAN
export interface ExportPenerimaPotonganParams {
  useKop?: boolean;
  tahunAkademik: string;
  programStudi: string;
  jenisPotongan: string;
  namaPotongan: string;
  penerima: string;
  data: LaporanPenerimaPotonganRowData[];
  formatRupiah?: (n: number) => string;
}

export async function exportLaporanPenerimaPotonganToPdf(
  params: ExportPenerimaPotonganParams
): Promise<void> {
  const {
    useKop = true,
    tahunAkademik,
    programStudi,
    jenisPotongan,
    namaPotongan,
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
  doc.text("LAPORAN PENERIMA POTONGAN", pageWidth / 2, currentY, {
    align: "center",
  });

  currentY += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(50, 50, 50);

  const col1X = 14;
  const col2X = pageWidth / 2 + 10;
  doc.text(`Tahun Akademik: ${tahunAkademik}`, col1X, currentY);
  doc.text(`Jenis Potongan: ${jenisPotongan}`, col2X, currentY);
  currentY += 4.5;
  doc.text(`Program Studi: ${programStudi}`, col1X, currentY);
  doc.text(`Nama Potongan: ${namaPotongan || "Semua"}`, col2X, currentY);
  currentY += 4.5;
  doc.text(`Penerima: ${penerima}`, col1X, currentY);
  doc.text(`Total Penerima: ${data.length} Orang`, col2X, currentY);

  currentY += 6;

  const tableHeaders = [
    "No.",
    "NIM",
    "Nama",
    "Program Studi",
    "Sumber",
    "Potongan",
    "Nominal",
    "Persentase",
    "Digunakan",
  ];

  const tableRows = data.map((row) => [
    row.no,
    row.nim,
    row.nama,
    row.prodi,
    row.sumber || row.jenisPotongan || "-",
    row.potongan || row.namaPotongan || "-",
    formatRupiah(row.nominal ?? row.nominalPotongan ?? 0),
    row.persentase
      ? typeof row.persentase === "number"
        ? `${row.persentase}%`
        : row.persentase
      : "-",
    row.digunakan || row.status || "-",
  ]);

  const totalNominal = data.reduce(
    (acc, curr) => acc + (curr.nominal ?? curr.nominalPotongan ?? 0),
    0
  );

  autoTable(doc, {
    startY: currentY,
    head: [tableHeaders],
    body: tableRows,
    foot: [
      [
        {
          content: `TOTAL KESELURUHAN (${data.length} PENERIMA)`,
          colSpan: 6,
          styles: { halign: "center", fontStyle: "bold" },
        },
        {
          content: formatRupiah(totalNominal),
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
      0: { halign: "center", cellWidth: 10 },
      1: { halign: "center", cellWidth: 24 },
      2: { fontStyle: "bold", cellWidth: 38 },
      3: { cellWidth: 42 },
      4: { cellWidth: 28 },
      5: { cellWidth: 38 },
      6: { halign: "right", fontStyle: "bold", cellWidth: 30 },
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
      `Halaman ${i} dari ${pageCount} | Laporan Penerima Potongan UIKA`,
      pageWidth - 14,
      doc.internal.pageSize.getHeight() - 8,
      { align: "right" }
    );
  }

  doc.save(
    `Laporan_Penerima_Potongan_${tahunAkademik.replace(/\s+/g, "_")}.pdf`
  );
}

export function exportLaporanPenerimaPotonganToExcel(
  params: ExportPenerimaPotonganParams
): void {
  const {
    tahunAkademik,
    programStudi,
    jenisPotongan,
    namaPotongan,
    penerima,
    data,
  } = params;

  const rows: (string | number)[][] = [
    ["UNIVERSITAS IBN KHALDUN BOGOR"],
    ["LAPORAN PENERIMA POTONGAN"],
    [],
    ["Tahun Akademik", tahunAkademik],
    ["Program Studi", programStudi],
    ["Jenis Potongan", jenisPotongan],
    ["Nama Potongan", namaPotongan || "Semua"],
    ["Penerima", penerima],
    [],
    [
      "No.",
      "NIM",
      "Nama",
      "Program Studi",
      "Sumber",
      "Potongan",
      "Nominal",
      "Persentase",
      "Digunakan",
    ],
  ];

  let totalNominal = 0;
  data.forEach((item) => {
    const nom = item.nominal ?? item.nominalPotongan ?? 0;
    totalNominal += nom;
    rows.push([
      item.no,
      item.nim,
      item.nama,
      item.prodi,
      item.sumber || item.jenisPotongan || "-",
      item.potongan || item.namaPotongan || "-",
      nom,
      item.persentase
        ? typeof item.persentase === "number"
          ? `${item.persentase}%`
          : item.persentase
        : "-",
      item.digunakan || item.status || "-",
    ]);
  });

  rows.push([
    "TOTAL",
    "",
    "",
    "",
    "",
    "",
    totalNominal,
    "",
    `${data.length} Orang`,
  ]);

  const worksheet = XLSX.utils.aoa_to_sheet(rows);
  worksheet["!cols"] = [
    { wch: 6 },
    { wch: 16 },
    { wch: 28 },
    { wch: 32 },
    { wch: 20 },
    { wch: 30 },
    { wch: 20 },
    { wch: 14 },
    { wch: 16 },
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Penerima Potongan");
  XLSX.writeFile(
    workbook,
    `Laporan_Penerima_Potongan_${tahunAkademik.replace(/\s+/g, "_")}.xlsx`
  );
}

// 2. REKAP POTONGAN BEASISWA
export interface ExportRekapPotonganParams {
  useKop?: boolean;
  jenisPotongan: string;
  rekanan: string;
  periodeAwal: string;
  periodeAkhir: string;
  data: RekapPotonganBeasiswaRowData[];
  formatRupiah?: (n: number) => string;
}

export async function exportRekapPotonganBeasiswaToPdf(
  params: ExportRekapPotonganParams
): Promise<void> {
  const {
    useKop = true,
    jenisPotongan,
    rekanan,
    periodeAwal,
    periodeAkhir,
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
  doc.text("REKAP POTONGAN / BEASISWA", pageWidth / 2, currentY, {
    align: "center",
  });

  currentY += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(50, 50, 50);

  const col1X = 14;
  const col2X = pageWidth / 2 + 10;
  doc.text(`Jenis Potongan: ${jenisPotongan}`, col1X, currentY);
  doc.text(`Rekanan: ${rekanan || "Semua"}`, col2X, currentY);
  currentY += 4.5;
  doc.text(
    `Periode: ${periodeAwal || "Semua"} s/d ${periodeAkhir || "Semua"}`,
    col1X,
    currentY
  );
  doc.text(`Total Program: ${data.length}`, col2X, currentY);

  currentY += 6;

  const tableHeaders = [
    "No.",
    "Nama Potongan",
    "Rekanan",
    "Periode Awal",
    "Periode Akhir",
    "Nominal",
    "Persentase",
    "Anggaran",
    "Digunakan",
  ];

  const tableRows = data.map((row) => [
    row.no,
    row.namaPotongan,
    row.rekanan,
    row.periodeAwal || "-",
    row.periodeAkhir || "-",
    formatRupiah(row.nominal ?? row.totalNominal ?? 0),
    row.persentase
      ? typeof row.persentase === "number"
        ? `${row.persentase}%`
        : row.persentase
      : "-",
    row.anggaran ? formatRupiah(row.anggaran) : "-",
    typeof row.digunakan === "number"
      ? formatRupiah(row.digunakan)
      : row.digunakan || `${row.jumlahPenerima || 0} Orang`,
  ]);

  const totalNominal = data.reduce(
    (acc, curr) => acc + (curr.nominal ?? curr.totalNominal ?? 0),
    0
  );
  const totalAnggaran = data.reduce(
    (acc, curr) => acc + (typeof curr.anggaran === "number" ? curr.anggaran : 0),
    0
  );
  const totalDigunakan = data.reduce(
    (acc, curr) => acc + (typeof curr.digunakan === "number" ? curr.digunakan : 0),
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
          colSpan: 5,
          styles: { halign: "center", fontStyle: "bold" },
        },
        {
          content: formatRupiah(totalNominal),
          styles: { halign: "right", fontStyle: "bold", textColor: [30, 58, 138] },
        },
        { content: "" },
        {
          content: totalAnggaran > 0 ? formatRupiah(totalAnggaran) : "-",
          styles: { halign: "right", fontStyle: "bold" },
        },
        {
          content: totalDigunakan > 0 ? formatRupiah(totalDigunakan) : "-",
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
      1: { fontStyle: "bold", cellWidth: 46 },
      2: { cellWidth: 40 },
      3: { halign: "center", cellWidth: 26 },
      4: { halign: "center", cellWidth: 26 },
      5: { halign: "right", fontStyle: "bold", cellWidth: 30 },
      6: { halign: "center", cellWidth: 22 },
      7: { halign: "right", fontStyle: "bold", cellWidth: 30 },
      8: { halign: "center", cellWidth: 26 },
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
      `Halaman ${i} dari ${pageCount} | Rekap Potongan Beasiswa UIKA`,
      pageWidth - 14,
      doc.internal.pageSize.getHeight() - 8,
      { align: "right" }
    );
  }

  doc.save(`Rekap_Potongan_Beasiswa.pdf`);
}

export function exportRekapPotonganBeasiswaToExcel(
  params: ExportRekapPotonganParams
): void {
  const { jenisPotongan, rekanan, periodeAwal, periodeAkhir, data } = params;

  const rows: (string | number)[][] = [
    ["UNIVERSITAS IBN KHALDUN BOGOR"],
    ["REKAP POTONGAN / BEASISWA"],
    [],
    ["Jenis Potongan", jenisPotongan],
    ["Rekanan", rekanan || "Semua"],
    ["Periode", `${periodeAwal || "Semua"} s/d ${periodeAkhir || "Semua"}`],
    [],
    [
      "No.",
      "Nama Potongan",
      "Rekanan",
      "Periode Awal",
      "Periode Akhir",
      "Nominal",
      "Persentase",
      "Anggaran",
      "Digunakan",
    ],
  ];

  let totalNominal = 0;
  let totalAnggaran = 0;
  let totalDigunakan = 0;

  data.forEach((item) => {
    const nom = item.nominal ?? item.totalNominal ?? 0;
    const angg = typeof item.anggaran === "number" ? item.anggaran : 0;
    const dig = typeof item.digunakan === "number" ? item.digunakan : 0;
    totalNominal += nom;
    totalAnggaran += angg;
    totalDigunakan += dig;

    rows.push([
      item.no,
      item.namaPotongan,
      item.rekanan,
      item.periodeAwal || "-",
      item.periodeAkhir || "-",
      nom,
      item.persentase
        ? typeof item.persentase === "number"
          ? `${item.persentase}%`
          : item.persentase
        : "-",
      item.anggaran ?? "-",
      item.digunakan ?? "-",
    ]);
  });

  rows.push([
    "TOTAL",
    "",
    "",
    "",
    "",
    totalNominal,
    "",
    totalAnggaran > 0 ? totalAnggaran : "-",
    totalDigunakan > 0 ? totalDigunakan : "-",
  ]);

  const worksheet = XLSX.utils.aoa_to_sheet(rows);
  worksheet["!cols"] = [
    { wch: 6 },
    { wch: 34 },
    { wch: 30 },
    { wch: 18 },
    { wch: 18 },
    { wch: 18 },
    { wch: 14 },
    { wch: 18 },
    { wch: 18 },
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Rekap Potongan");
  XLSX.writeFile(workbook, `Rekap_Potongan_Beasiswa.xlsx`);
}

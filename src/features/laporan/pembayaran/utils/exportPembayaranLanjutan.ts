import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import type {
  PembayaranPerMahasiswaRowData,
  DistribusiPembayaranRowData,
  DistribusiJenisTagihanRowData,
} from "./generatePembayaranLanjutanHtml";

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
      } catch {
        resolve("");
      }
    };
    img.onerror = () => resolve("");
    img.src = url;
  });
};

const renderKopPdf = async (doc: jsPDF, pageWidth: number, currentY: number): Promise<number> => {
  try {
    const logoBase64 = await loadImageAsBase64("/images/logo-uika.png");
    if (logoBase64) {
      doc.addImage(logoBase64, "PNG", 18, currentY - 5, 20, 20);
    }
  } catch {
    // Ignore
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

  currentY += 18;
  doc.setDrawColor(20, 20, 20);
  doc.setLineWidth(0.8);
  doc.line(14, currentY, pageWidth - 14, currentY);
  doc.setLineWidth(0.3);
  doc.line(14, currentY + 1.2, pageWidth - 14, currentY + 1.2);
  return currentY + 6;
};

// ==========================================
// 1. PEMBAYARAN PER MAHASISWA
// ==========================================
export async function exportPembayaranPerMahasiswaToPdf(params: {
  useKop?: boolean;
  periodePembayaran?: string;
  data: PembayaranPerMahasiswaRowData[];
  tampilkanKelompokUkt?: boolean;
  formatRupiah?: (n: number) => string;
}): Promise<void> {
  const {
    useKop = true,
    periodePembayaran,
    data,
    tampilkanKelompokUkt = false,
    formatRupiah = (n) => `Rp ${n.toLocaleString("id-ID")}`,
  } = params;

  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  let currentY = 12;

  if (useKop) {
    currentY = await renderKopPdf(doc, pageWidth, currentY);
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(20, 20, 20);
  doc.text(
    `LAPORAN PEMBAYARAN PER MAHASISWA ${periodePembayaran ? `PERIODE ${periodePembayaran.toUpperCase()}` : ""}`,
    pageWidth / 2,
    currentY,
    { align: "center" }
  );
  currentY += 8;

  const headers = [
    [
      "No.",
      "NIM",
      "ID Pendaftar",
      "Nama",
      "Semester Aktif",
      "Prodi",
      "Pembayaran",
      "Tanggal",
      "Nominal Transaksi",
      "Kode Tagihan",
      "Jenis Tagihan",
      "Cicilan Ke-",
      "Bulan",
      "Nominal Detail",
      "Batal",
      "Semester / TA",
      "Total Tagihan",
      "Total Pembayaran",
    ],
  ];

  const body = data.map((item) => [
    item.no,
    item.nim,
    item.idPendaftar || "-",
    item.nama,
    item.semesterAktif || "-",
    item.prodi,
    item.pembayaran || item.metodePembayaran || "-",
    item.tanggal || item.tanggalBayar || "-",
    formatRupiah(item.nominalTransaksi || item.nominal || 0),
    item.kodeTagihan || "-",
    item.jenisTagihan || "-",
    item.cicilanKe ?? "-",
    item.bulan || "-",
    formatRupiah(item.nominalDetail || item.nominal || 0),
    item.batal || (item.status === "Batal" ? "Ya" : "Tidak"),
    item.semesterTa || "-",
    formatRupiah(item.totalTagihan || item.nominal || 0),
    formatRupiah(item.totalPembayaran || item.nominal || 0),
  ]);

  const totalNominalTrx = data.reduce(
    (acc, curr) => acc + (curr.batal === "Ya" || curr.status === "Batal" ? 0 : (curr.nominalTransaksi || curr.nominal || 0)),
    0
  );
  const totalNomDetail = data.reduce(
    (acc, curr) => acc + (curr.batal === "Ya" || curr.status === "Batal" ? 0 : (curr.nominalDetail || curr.nominal || 0)),
    0
  );
  const totalTagihanSemua = data.reduce(
    (acc, curr) => acc + (curr.totalTagihan || curr.nominal || 0),
    0
  );
  const totalPembayaranSemua = data.reduce(
    (acc, curr) => acc + (curr.batal === "Ya" || curr.status === "Batal" ? 0 : (curr.totalPembayaran || curr.nominal || 0)),
    0
  );

  autoTable(doc, {
    head: headers,
    body: body,
    startY: currentY,
    theme: "grid",
    headStyles: {
      fillColor: [30, 58, 138],
      textColor: [255, 255, 255],
      fontSize: 6,
      fontStyle: "bold",
      halign: "center",
      valign: "middle",
      cellPadding: 1.5,
    },
    bodyStyles: { fontSize: 5.5, cellPadding: 1.5 },
    columnStyles: {
      0: { halign: "center", cellWidth: 7 },
      1: { halign: "center", cellWidth: 16 },
      2: { halign: "center", cellWidth: 16 },
      3: { cellWidth: 22, fontStyle: "bold" },
      4: { halign: "center", cellWidth: 14 },
      5: { cellWidth: 18 },
      6: { cellWidth: 18 },
      7: { halign: "center", cellWidth: 14 },
      8: { halign: "right", cellWidth: 18 },
      9: { halign: "center", cellWidth: 16 },
      10: { cellWidth: 20 },
      11: { halign: "center", cellWidth: 10 },
      12: { halign: "center", cellWidth: 12 },
      13: { halign: "right", cellWidth: 16 },
      14: { halign: "center", cellWidth: 10 },
      15: { halign: "center", cellWidth: 16 },
      16: { halign: "right", cellWidth: 17 },
      17: { halign: "right", cellWidth: 18, fontStyle: "bold", textColor: [30, 58, 138] },
    },
    foot: [
      [
        {
          content: "TOTAL KESELURUHAN (AKTIF)",
          colSpan: 8,
          styles: { halign: "center", fontStyle: "bold" },
        },
        {
          content: formatRupiah(totalNominalTrx),
          styles: { halign: "right", fontStyle: "bold" },
        },
        { content: "", colSpan: 4 },
        {
          content: formatRupiah(totalNomDetail),
          styles: { halign: "right", fontStyle: "bold" },
        },
        { content: "", colSpan: 2 },
        {
          content: formatRupiah(totalTagihanSemua),
          styles: { halign: "right", fontStyle: "bold" },
        },
        {
          content: formatRupiah(totalPembayaranSemua),
          styles: { halign: "right", fontStyle: "bold", textColor: [30, 58, 138] },
        },
      ],
    ],
    footStyles: { fillColor: [243, 244, 246], fontSize: 6, fontStyle: "bold" },
    margin: { left: 8, right: 8 },
  });

  doc.save(`Laporan_Pembayaran_Per_Mahasiswa_${new Date().toISOString().slice(0, 10)}.pdf`);
}

export function exportPembayaranPerMahasiswaToExcel(params: {
  useKop?: boolean;
  periodePembayaran?: string;
  data: PembayaranPerMahasiswaRowData[];
  tampilkanKelompokUkt?: boolean;
}): void {
  const { useKop = true, periodePembayaran, data } = params;
  const rows: (string | number)[][] = [];

  if (useKop) {
    rows.push(["UNIVERSITAS IBN KHALDUN BOGOR"]);
    rows.push(["Jl KH Sholeh Iskandar KM 2 Kedung Badak Bogor"]);
    rows.push([]);
  }

  rows.push([`LAPORAN PEMBAYARAN PER MAHASISWA ${periodePembayaran || "SEMUA PERIODE"}`]);
  rows.push([`Tanggal Cetak: ${new Date().toLocaleDateString("id-ID")}`]);
  rows.push([]);

  // 18 Kolom sesuai Gambar 3
  rows.push([
    "No.",
    "NIM",
    "ID Pendaftar",
    "Nama",
    "Semester Aktif",
    "Prodi",
    "Pembayaran",
    "Tanggal",
    "Nominal Transaksi",
    "Kode Tagihan",
    "Jenis Tagihan",
    "Cicilan Ke-",
    "Bulan",
    "Nominal Detail",
    "Batal",
    "Semester / TA",
    "Total Tagihan",
    "Total Pembayaran",
  ]);

  let totalNominalTrx = 0;
  let totalNomDetail = 0;
  let totalTagihanSemua = 0;
  let totalPembayaranSemua = 0;

  data.forEach((item) => {
    const isBatal = item.batal === "Ya" || item.status === "Batal";
    if (!isBatal) {
      totalNominalTrx += item.nominalTransaksi || item.nominal || 0;
      totalNomDetail += item.nominalDetail || item.nominal || 0;
      totalPembayaranSemua += item.totalPembayaran || item.nominal || 0;
    }
    totalTagihanSemua += item.totalTagihan || item.nominal || 0;

    rows.push([
      item.no,
      item.nim,
      item.idPendaftar || "-",
      item.nama,
      item.semesterAktif || "-",
      item.prodi,
      item.pembayaran || item.metodePembayaran || "-",
      item.tanggal || item.tanggalBayar || "-",
      item.nominalTransaksi || item.nominal || 0,
      item.kodeTagihan || "-",
      item.jenisTagihan || "-",
      item.cicilanKe ?? "-",
      item.bulan || "-",
      item.nominalDetail || item.nominal || 0,
      item.batal || (isBatal ? "Ya" : "Tidak"),
      item.semesterTa || "-",
      item.totalTagihan || item.nominal || 0,
      item.totalPembayaran || item.nominal || 0,
    ]);
  });

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
    totalNominalTrx,
    "",
    "",
    "",
    "",
    totalNomDetail,
    "",
    "",
    totalTagihanSemua,
    totalPembayaranSemua,
  ]);

  const worksheet = XLSX.utils.aoa_to_sheet(rows);
  worksheet["!cols"] = [
    { wch: 6 },
    { wch: 18 },
    { wch: 18 },
    { wch: 25 },
    { wch: 16 },
    { wch: 25 },
    { wch: 22 },
    { wch: 14 },
    { wch: 18 },
    { wch: 18 },
    { wch: 26 },
    { wch: 12 },
    { wch: 14 },
    { wch: 18 },
    { wch: 10 },
    { wch: 18 },
    { wch: 18 },
    { wch: 18 },
  ];
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Pembayaran Per Mahasiswa");
  XLSX.writeFile(
    workbook,
    `Laporan_Pembayaran_Per_Mahasiswa_${new Date().toISOString().slice(0, 10)}.xlsx`
  );
}

// ==========================================
// 2. DISTRIBUSI PEMBAYARAN
// ==========================================
export async function exportDistribusiPembayaranToPdf(params: {
  useKop?: boolean;
  unitKerja?: string;
  tingkatDistribusi?: string;
  data: DistribusiPembayaranRowData[];
  formatRupiah?: (n: number) => string;
}): Promise<void> {
  const {
    useKop = true,
    unitKerja,
    tingkatDistribusi = "Fakultas",
    data,
    formatRupiah = (n) => `Rp ${n.toLocaleString("id-ID")}`,
  } = params;

  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  let currentY = 12;

  if (useKop) {
    currentY = await renderKopPdf(doc, pageWidth, currentY);
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(20, 20, 20);
  doc.text("LAPORAN DISTRIBUSI PEMBAYARAN", pageWidth / 2, currentY, {
    align: "center",
  });
  currentY += 6;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(`Unit Kerja: ${unitKerja || "Universitas Ibn Khaldun"} | Tingkat: ${tingkatDistribusi}`, 14, currentY);
  currentY += 6;

  const headers = [
    [
      "Kode Fakultas",
      "Nama Fakultas",
      "Sumber Data",
      "Uang Gedung Tahap 1",
      "SPP",
      "Heregistrasi",
      "UPM (Uang Pembinaan Mahasiswa)",
      "Ujian Akhir Semester",
      "UKT Afirmasi UIKA",
      "Praktikum Rekayasa Perangkat Lunak",
      "Praktikum Jaringan Komputer",
      "Praktikum Sistem Embedded & Waktu Nyata",
      "Praktikum Metode Numerik",
      "Praktikum Augmented Reality",
      "Praktikum Knowledge Graph",
      "Praktikum Pengenalan Pola",
      "praktikum Struktur Data",
      "SKS",
    ],
  ];

  const body = data.map((item) => [
    item.kodeFakultas,
    item.namaFakultas,
    item.sumberData,
    formatRupiah(item.uangGedungTahap1 || 0),
    formatRupiah(item.spp || 0),
    formatRupiah(item.heregistrasi || 0),
    formatRupiah(item.upm || 0),
    formatRupiah(item.ujianAkhirSemester || 0),
    formatRupiah(item.uktAfirmasiUika || 0),
    formatRupiah(item.praktikumRpl || 0),
    formatRupiah(item.praktikumJarkom || 0),
    formatRupiah(item.praktikumEmbedded || 0),
    formatRupiah(item.praktikumMetodeNumerik || 0),
    formatRupiah(item.praktikumAr || 0),
    formatRupiah(item.praktikumKnowledgeGraph || 0),
    formatRupiah(item.praktikumPengenalanPola || 0),
    formatRupiah(item.praktikumStrukturData || 0),
    formatRupiah(item.sks || 0),
  ]);

  const totalUangGedung = data.reduce((acc, curr) => acc + (curr.uangGedungTahap1 || 0), 0);
  const totalSpp = data.reduce((acc, curr) => acc + (curr.spp || 0), 0);
  const totalHeregistrasi = data.reduce((acc, curr) => acc + (curr.heregistrasi || 0), 0);
  const totalUpm = data.reduce((acc, curr) => acc + (curr.upm || 0), 0);
  const totalUas = data.reduce((acc, curr) => acc + (curr.ujianAkhirSemester || 0), 0);
  const totalUktAfirmasi = data.reduce((acc, curr) => acc + (curr.uktAfirmasiUika || 0), 0);
  const totalRpl = data.reduce((acc, curr) => acc + (curr.praktikumRpl || 0), 0);
  const totalJarkom = data.reduce((acc, curr) => acc + (curr.praktikumJarkom || 0), 0);
  const totalEmbedded = data.reduce((acc, curr) => acc + (curr.praktikumEmbedded || 0), 0);
  const totalMetNum = data.reduce((acc, curr) => acc + (curr.praktikumMetodeNumerik || 0), 0);
  const totalAr = data.reduce((acc, curr) => acc + (curr.praktikumAr || 0), 0);
  const totalKg = data.reduce((acc, curr) => acc + (curr.praktikumKnowledgeGraph || 0), 0);
  const totalPola = data.reduce((acc, curr) => acc + (curr.praktikumPengenalanPola || 0), 0);
  const totalStrukdat = data.reduce((acc, curr) => acc + (curr.praktikumStrukturData || 0), 0);
  const totalSks = data.reduce((acc, curr) => acc + (curr.sks || 0), 0);

  autoTable(doc, {
    head: headers,
    body: body,
    startY: currentY,
    theme: "grid",
    headStyles: {
      fillColor: [30, 58, 138],
      textColor: [255, 255, 255],
      fontSize: 6,
      fontStyle: "bold",
      halign: "center",
      valign: "middle",
      cellPadding: 1.5,
    },
    bodyStyles: { fontSize: 5.5, cellPadding: 1.5 },
    columnStyles: {
      0: { halign: "center", cellWidth: 12 },
      1: { cellWidth: 26, fontStyle: "bold" },
      2: { halign: "center", cellWidth: 14 },
      3: { halign: "right", cellWidth: 16 },
      4: { halign: "right", cellWidth: 16 },
      5: { halign: "right", cellWidth: 16 },
      6: { halign: "right", cellWidth: 16 },
      7: { halign: "right", cellWidth: 16 },
      8: { halign: "right", cellWidth: 16 },
      9: { halign: "right", cellWidth: 16 },
      10: { halign: "right", cellWidth: 16 },
      11: { halign: "right", cellWidth: 16 },
      12: { halign: "right", cellWidth: 16 },
      13: { halign: "right", cellWidth: 16 },
      14: { halign: "right", cellWidth: 16 },
      15: { halign: "right", cellWidth: 16 },
      16: { halign: "right", cellWidth: 16 },
      17: { halign: "right", cellWidth: 18, fontStyle: "bold", textColor: [30, 58, 138] },
    },
    foot: [
      [
        { content: "TOTAL KESELURUHAN", colSpan: 3, styles: { halign: "center", fontStyle: "bold" } },
        { content: formatRupiah(totalUangGedung), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(totalSpp), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(totalHeregistrasi), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(totalUpm), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(totalUas), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(totalUktAfirmasi), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(totalRpl), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(totalJarkom), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(totalEmbedded), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(totalMetNum), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(totalAr), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(totalKg), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(totalPola), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(totalStrukdat), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(totalSks), styles: { halign: "right", fontStyle: "bold", textColor: [30, 58, 138] } },
      ],
    ],
    footStyles: { fillColor: [243, 244, 246], fontSize: 6, fontStyle: "bold" },
    margin: { left: 8, right: 8 },
  });

  doc.save(`Laporan_Distribusi_Pembayaran_${new Date().toISOString().slice(0, 10)}.pdf`);
}

export function exportDistribusiPembayaranToExcel(params: {
  useKop?: boolean;
  unitKerja?: string;
  tingkatDistribusi?: string;
  data: DistribusiPembayaranRowData[];
}): void {
  const { useKop = true, unitKerja, tingkatDistribusi = "Fakultas", data } = params;
  const rows: (string | number)[][] = [];

  if (useKop) {
    rows.push(["UNIVERSITAS IBN KHALDUN BOGOR"]);
    rows.push(["Jl KH Sholeh Iskandar KM 2 Kedung Badak Bogor"]);
    rows.push([]);
  }

  rows.push(["LAPORAN DISTRIBUSI PEMBAYARAN"]);
  rows.push([`Unit Kerja: ${unitKerja || "Universitas Ibn Khaldun"}`]);
  rows.push([`Tingkat Distribusi: ${tingkatDistribusi}`]);
  rows.push([]);

  // 18 Kolom sesuai Gambar 4
  rows.push([
    "Kode Fakultas",
    "Nama Fakultas",
    "Sumber Data",
    "Uang Gedung Tahap 1",
    "SPP",
    "Heregistrasi",
    "UPM (Uang Pembinaan Mahasiswa)",
    "Ujian Akhir Semester",
    "UKT Afirmasi UIKA",
    "Praktikum Rekayasa Perangkat Lunak",
    "Praktikum Jaringan Komputer",
    "Praktikum Sistem Embedded & Waktu Nyata",
    "Praktikum Metode Numerik",
    "Praktikum Augmented Reality",
    "Praktikum Knowledge Graph",
    "Praktikum Pengenalan Pola",
    "praktikum Struktur Data",
    "SKS",
  ]);

  let totalUangGedung = 0;
  let totalSpp = 0;
  let totalHeregistrasi = 0;
  let totalUpm = 0;
  let totalUas = 0;
  let totalUktAfirmasi = 0;
  let totalRpl = 0;
  let totalJarkom = 0;
  let totalEmbedded = 0;
  let totalMetNum = 0;
  let totalAr = 0;
  let totalKg = 0;
  let totalPola = 0;
  let totalStrukdat = 0;
  let totalSks = 0;

  data.forEach((item) => {
    totalUangGedung += item.uangGedungTahap1 || 0;
    totalSpp += item.spp || 0;
    totalHeregistrasi += item.heregistrasi || 0;
    totalUpm += item.upm || 0;
    totalUas += item.ujianAkhirSemester || 0;
    totalUktAfirmasi += item.uktAfirmasiUika || 0;
    totalRpl += item.praktikumRpl || 0;
    totalJarkom += item.praktikumJarkom || 0;
    totalEmbedded += item.praktikumEmbedded || 0;
    totalMetNum += item.praktikumMetodeNumerik || 0;
    totalAr += item.praktikumAr || 0;
    totalKg += item.praktikumKnowledgeGraph || 0;
    totalPola += item.praktikumPengenalanPola || 0;
    totalStrukdat += item.praktikumStrukturData || 0;
    totalSks += item.sks || 0;

    rows.push([
      item.kodeFakultas,
      item.namaFakultas,
      item.sumberData,
      item.uangGedungTahap1 || 0,
      item.spp || 0,
      item.heregistrasi || 0,
      item.upm || 0,
      item.ujianAkhirSemester || 0,
      item.uktAfirmasiUika || 0,
      item.praktikumRpl || 0,
      item.praktikumJarkom || 0,
      item.praktikumEmbedded || 0,
      item.praktikumMetodeNumerik || 0,
      item.praktikumAr || 0,
      item.praktikumKnowledgeGraph || 0,
      item.praktikumPengenalanPola || 0,
      item.praktikumStrukturData || 0,
      item.sks || 0,
    ]);
  });

  rows.push([]);
  rows.push([
    "TOTAL KESELURUHAN",
    "",
    "",
    totalUangGedung,
    totalSpp,
    totalHeregistrasi,
    totalUpm,
    totalUas,
    totalUktAfirmasi,
    totalRpl,
    totalJarkom,
    totalEmbedded,
    totalMetNum,
    totalAr,
    totalKg,
    totalPola,
    totalStrukdat,
    totalSks,
  ]);

  const worksheet = XLSX.utils.aoa_to_sheet(rows);
  worksheet["!cols"] = [
    { wch: 14 },
    { wch: 32 },
    { wch: 14 },
    { wch: 20 },
    { wch: 18 },
    { wch: 18 },
    { wch: 28 },
    { wch: 20 },
    { wch: 20 },
    { wch: 32 },
    { wch: 28 },
    { wch: 36 },
    { wch: 26 },
    { wch: 26 },
    { wch: 26 },
    { wch: 26 },
    { wch: 26 },
    { wch: 18 },
  ];
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Distribusi Pembayaran");
  XLSX.writeFile(workbook, `Laporan_Distribusi_Pembayaran_${new Date().toISOString().slice(0, 10)}.xlsx`);
}

// ==========================================
// 3. DISTRIBUSI PEMBAYARAN TAGIHAN PER TANGGAL (34 Kolom sesuai Gambar 1 & 2)
// ==========================================
export async function exportDistribusiJenisTagihanToPdf(params: {
  useKop?: boolean;
  unitKerja?: string;
  data: DistribusiJenisTagihanRowData[];
  formatRupiah?: (n: number) => string;
}): Promise<void> {
  const {
    useKop = true,
    unitKerja,
    data,
    formatRupiah = (n) => `Rp ${n.toLocaleString("id-ID")}`,
  } = params;

  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a3" });
  const pageWidth = doc.internal.pageSize.getWidth();
  let currentY = 12;

  if (useKop) {
    currentY = await renderKopPdf(doc, pageWidth, currentY);
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(20, 20, 20);
  doc.text("LAPORAN DISTRIBUSI PEMBAYARAN TAGIHAN PER TANGGAL", pageWidth / 2, currentY, {
    align: "center",
  });
  currentY += 6;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(`Unit Kerja: ${unitKerja || "Universitas Ibn Khaldun"}`, 14, currentY);
  currentY += 6;

  const headers = [
    [
      "Tanggal",
      "SPP",
      "Heregistrasi",
      "UPM (Uang Pembinaan Mahasiswa)",
      "UKT Afirmasi UIKA",
      "Ujian Akhir Semester",
      "Praktikum Rekayasa Perangkat Lunak",
      "Praktikum Jaringan Komputer",
      "Praktikum Metode Numerik",
      "praktikum Struktur Data",
      "SKS",
      "Wakaf Masjid Ibn Khaldun",
      "Ta'aruf",
      "SKS Semester 1",
      "Kolokium",
      "Uang Gedung Tahap 1",
      "Praktikum Knowledge Graph",
      "Praktikum Pengenalan Pola",
      "Praktikum Algoritma dan pemrograman",
      "Kerja Praktik",
      "Praktikum Sistem Embedded & Waktu Nyata",
      "Praktikum Augmented Reality",
      "Sumbangan Fasilitas",
      "Biaya Pendaftaran Rusunawa",
      "Rusunawa",
      "Praktikum Penginderaan Jauh I",
      "Praktikum Pemrograman Perangkat Bergerak",
      "Praktikum Bahasa Inggris",
      "Praktikum Keamanan Informasi",
      "Praktikum Permodelan Spasial",
      "Praktikum Perancangan & Pemrograman Web",
      "Praktikum Sistem Informasi Geografis",
      "Praktikum Permodelan dan Simulasi",
      "Total",
    ],
  ];

  const body = data.map((item) => [
    item.tanggal,
    formatRupiah(item.spp || 0),
    formatRupiah(item.heregistrasi || 0),
    formatRupiah(item.upm || 0),
    formatRupiah(item.uktAfirmasiUika || 0),
    formatRupiah(item.ujianAkhirSemester || 0),
    formatRupiah(item.praktikumRpl || 0),
    formatRupiah(item.praktikumJarkom || 0),
    formatRupiah(item.praktikumMetodeNumerik || 0),
    formatRupiah(item.praktikumStrukturData || 0),
    formatRupiah(item.sks || 0),
    formatRupiah(item.wakafMasjid || 0),
    formatRupiah(item.taaruf || 0),
    formatRupiah(item.sksSemester1 || 0),
    formatRupiah(item.kolokium || 0),
    formatRupiah(item.uangGedungTahap1 || 0),
    formatRupiah(item.praktikumKnowledgeGraph || 0),
    formatRupiah(item.praktikumPengenalanPola || 0),
    formatRupiah(item.praktikumAlgoritma || 0),
    formatRupiah(item.kerjaPraktik || 0),
    formatRupiah(item.praktikumEmbedded || 0),
    formatRupiah(item.praktikumAr || 0),
    formatRupiah(item.sumbanganFasilitas || 0),
    formatRupiah(item.biayaPendaftaranRusunawa || 0),
    formatRupiah(item.rusunawa || 0),
    formatRupiah(item.praktikumPenginderaanJauh || 0),
    formatRupiah(item.praktikumPerangkatBergerak || 0),
    formatRupiah(item.praktikumBahasaInggris || 0),
    formatRupiah(item.praktikumKeamananInformasi || 0),
    formatRupiah(item.praktikumPermodelanSpasial || 0),
    formatRupiah(item.praktikumPemrogramanWeb || 0),
    formatRupiah(item.praktikumSig || 0),
    formatRupiah(item.praktikumPermodelanSimulasi || 0),
    formatRupiah(item.total || item.totalPembayaran || 0),
  ]);

  const totalSpp = data.reduce((acc, curr) => acc + (curr.spp || 0), 0);
  const totalHeregistrasi = data.reduce((acc, curr) => acc + (curr.heregistrasi || 0), 0);
  const totalUpm = data.reduce((acc, curr) => acc + (curr.upm || 0), 0);
  const totalUktAfirmasi = data.reduce((acc, curr) => acc + (curr.uktAfirmasiUika || 0), 0);
  const totalUas = data.reduce((acc, curr) => acc + (curr.ujianAkhirSemester || 0), 0);
  const totalRpl = data.reduce((acc, curr) => acc + (curr.praktikumRpl || 0), 0);
  const totalJarkom = data.reduce((acc, curr) => acc + (curr.praktikumJarkom || 0), 0);
  const totalMetNum = data.reduce((acc, curr) => acc + (curr.praktikumMetodeNumerik || 0), 0);
  const totalStrukdat = data.reduce((acc, curr) => acc + (curr.praktikumStrukturData || 0), 0);
  const totalSks = data.reduce((acc, curr) => acc + (curr.sks || 0), 0);
  const totalWakaf = data.reduce((acc, curr) => acc + (curr.wakafMasjid || 0), 0);
  const totalTaaruf = data.reduce((acc, curr) => acc + (curr.taaruf || 0), 0);
  const totalSksSem1 = data.reduce((acc, curr) => acc + (curr.sksSemester1 || 0), 0);
  const totalKolokium = data.reduce((acc, curr) => acc + (curr.kolokium || 0), 0);
  const totalUangGedung = data.reduce((acc, curr) => acc + (curr.uangGedungTahap1 || 0), 0);
  const totalKg = data.reduce((acc, curr) => acc + (curr.praktikumKnowledgeGraph || 0), 0);
  const totalPola = data.reduce((acc, curr) => acc + (curr.praktikumPengenalanPola || 0), 0);
  const totalAlgoritma = data.reduce((acc, curr) => acc + (curr.praktikumAlgoritma || 0), 0);
  const totalKp = data.reduce((acc, curr) => acc + (curr.kerjaPraktik || 0), 0);
  const totalEmbedded = data.reduce((acc, curr) => acc + (curr.praktikumEmbedded || 0), 0);
  const totalAr = data.reduce((acc, curr) => acc + (curr.praktikumAr || 0), 0);
  const totalSumbangan = data.reduce((acc, curr) => acc + (curr.sumbanganFasilitas || 0), 0);
  const totalDaftarRusunawa = data.reduce((acc, curr) => acc + (curr.biayaPendaftaranRusunawa || 0), 0);
  const totalRusunawa = data.reduce((acc, curr) => acc + (curr.rusunawa || 0), 0);
  const totalInderaJauh = data.reduce((acc, curr) => acc + (curr.praktikumPenginderaanJauh || 0), 0);
  const totalPerangkatBergerak = data.reduce((acc, curr) => acc + (curr.praktikumPerangkatBergerak || 0), 0);
  const totalBhsInggris = data.reduce((acc, curr) => acc + (curr.praktikumBahasaInggris || 0), 0);
  const totalKeamanan = data.reduce((acc, curr) => acc + (curr.praktikumKeamananInformasi || 0), 0);
  const totalModelSpasial = data.reduce((acc, curr) => acc + (curr.praktikumPermodelanSpasial || 0), 0);
  const totalWeb = data.reduce((acc, curr) => acc + (curr.praktikumPemrogramanWeb || 0), 0);
  const totalSig = data.reduce((acc, curr) => acc + (curr.praktikumSig || 0), 0);
  const totalModelSimulasi = data.reduce((acc, curr) => acc + (curr.praktikumPermodelanSimulasi || 0), 0);
  const grandTotal = data.reduce((acc, curr) => acc + (curr.total || curr.totalPembayaran || 0), 0);

  autoTable(doc, {
    head: headers,
    body: body,
    startY: currentY,
    theme: "grid",
    headStyles: {
      fillColor: [30, 58, 138],
      textColor: [255, 255, 255],
      fontStyle: "bold",
      fontSize: 5,
      halign: "center",
      valign: "middle",
      cellPadding: 1,
    },
    bodyStyles: { fontSize: 4.5, cellPadding: 1 },
    foot: [
      [
        { content: "TOTAL KESELURUHAN", styles: { halign: "center", fontStyle: "bold" } },
        { content: formatRupiah(totalSpp), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(totalHeregistrasi), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(totalUpm), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(totalUktAfirmasi), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(totalUas), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(totalRpl), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(totalJarkom), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(totalMetNum), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(totalStrukdat), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(totalSks), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(totalWakaf), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(totalTaaruf), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(totalSksSem1), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(totalKolokium), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(totalUangGedung), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(totalKg), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(totalPola), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(totalAlgoritma), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(totalKp), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(totalEmbedded), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(totalAr), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(totalSumbangan), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(totalDaftarRusunawa), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(totalRusunawa), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(totalInderaJauh), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(totalPerangkatBergerak), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(totalBhsInggris), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(totalKeamanan), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(totalModelSpasial), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(totalWeb), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(totalSig), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(totalModelSimulasi), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(grandTotal), styles: { halign: "right", fontStyle: "bold", textColor: [30, 58, 138] } },
      ],
    ],
    footStyles: { fillColor: [243, 244, 246], fontSize: 5, fontStyle: "bold" },
    margin: { left: 6, right: 6 },
  });

  doc.save(`Laporan_Distribusi_Tagihan_Per_Tanggal_${new Date().toISOString().slice(0, 10)}.pdf`);
}

export function exportDistribusiJenisTagihanToExcel(params: {
  useKop?: boolean;
  unitKerja?: string;
  data: DistribusiJenisTagihanRowData[];
}): void {
  const { useKop = true, unitKerja, data } = params;
  const rows: (string | number)[][] = [];

  if (useKop) {
    rows.push(["UNIVERSITAS IBN KHALDUN BOGOR"]);
    rows.push(["Jl KH Sholeh Iskandar KM 2 Kedung Badak Bogor"]);
    rows.push([]);
  }

  rows.push(["LAPORAN DISTRIBUSI PEMBAYARAN TAGIHAN PER TANGGAL"]);
  rows.push([`Unit Kerja: ${unitKerja || "Universitas Ibn Khaldun"}`]);
  rows.push([]);

  rows.push([
    "Tanggal",
    "SPP",
    "Heregistrasi",
    "UPM (Uang Pembinaan Mahasiswa)",
    "UKT Afirmasi UIKA",
    "Ujian Akhir Semester",
    "Praktikum Rekayasa Perangkat Lunak",
    "Praktikum Jaringan Komputer",
    "Praktikum Metode Numerik",
    "praktikum Struktur Data",
    "SKS",
    "Wakaf Masjid Ibn Khaldun",
    "Ta'aruf",
    "SKS Semester 1",
    "Kolokium",
    "Uang Gedung Tahap 1",
    "Praktikum Knowledge Graph",
    "Praktikum Pengenalan Pola",
    "Praktikum Algoritma dan pemrograman",
    "Kerja Praktik",
    "Praktikum Sistem Embedded & Waktu Nyata",
    "Praktikum Augmented Reality",
    "Sumbangan Fasilitas",
    "Biaya Pendaftaran Rusunawa",
    "Rusunawa",
    "Praktikum Penginderaan Jauh I",
    "Praktikum Pemrograman Perangkat Bergerak",
    "Praktikum Bahasa Inggris",
    "Praktikum Keamanan Informasi",
    "Praktikum Permodelan Spasial",
    "Praktikum Perancangan & Pemrograman Web",
    "Praktikum Sistem Informasi Geografis",
    "Praktikum Permodelan dan Simulasi",
    "Total",
  ]);

  let totalSpp = 0;
  let totalHeregistrasi = 0;
  let totalUpm = 0;
  let totalUktAfirmasi = 0;
  let totalUas = 0;
  let totalRpl = 0;
  let totalJarkom = 0;
  let totalMetNum = 0;
  let totalStrukdat = 0;
  let totalSks = 0;
  let totalWakaf = 0;
  let totalTaaruf = 0;
  let totalSksSem1 = 0;
  let totalKolokium = 0;
  let totalUangGedung = 0;
  let totalKg = 0;
  let totalPola = 0;
  let totalAlgoritma = 0;
  let totalKp = 0;
  let totalEmbedded = 0;
  let totalAr = 0;
  let totalSumbangan = 0;
  let totalDaftarRusunawa = 0;
  let totalRusunawa = 0;
  let totalInderaJauh = 0;
  let totalPerangkatBergerak = 0;
  let totalBhsInggris = 0;
  let totalKeamanan = 0;
  let totalModelSpasial = 0;
  let totalWeb = 0;
  let totalSig = 0;
  let totalModelSimulasi = 0;
  let grandTotal = 0;

  data.forEach((item) => {
    totalSpp += item.spp || 0;
    totalHeregistrasi += item.heregistrasi || 0;
    totalUpm += item.upm || 0;
    totalUktAfirmasi += item.uktAfirmasiUika || 0;
    totalUas += item.ujianAkhirSemester || 0;
    totalRpl += item.praktikumRpl || 0;
    totalJarkom += item.praktikumJarkom || 0;
    totalMetNum += item.praktikumMetodeNumerik || 0;
    totalStrukdat += item.praktikumStrukturData || 0;
    totalSks += item.sks || 0;
    totalWakaf += item.wakafMasjid || 0;
    totalTaaruf += item.taaruf || 0;
    totalSksSem1 += item.sksSemester1 || 0;
    totalKolokium += item.kolokium || 0;
    totalUangGedung += item.uangGedungTahap1 || 0;
    totalKg += item.praktikumKnowledgeGraph || 0;
    totalPola += item.praktikumPengenalanPola || 0;
    totalAlgoritma += item.praktikumAlgoritma || 0;
    totalKp += item.kerjaPraktik || 0;
    totalEmbedded += item.praktikumEmbedded || 0;
    totalAr += item.praktikumAr || 0;
    totalSumbangan += item.sumbanganFasilitas || 0;
    totalDaftarRusunawa += item.biayaPendaftaranRusunawa || 0;
    totalRusunawa += item.rusunawa || 0;
    totalInderaJauh += item.praktikumPenginderaanJauh || 0;
    totalPerangkatBergerak += item.praktikumPerangkatBergerak || 0;
    totalBhsInggris += item.praktikumBahasaInggris || 0;
    totalKeamanan += item.praktikumKeamananInformasi || 0;
    totalModelSpasial += item.praktikumPermodelanSpasial || 0;
    totalWeb += item.praktikumPemrogramanWeb || 0;
    totalSig += item.praktikumSig || 0;
    totalModelSimulasi += item.praktikumPermodelanSimulasi || 0;
    grandTotal += item.total || item.totalPembayaran || 0;

    rows.push([
      item.tanggal,
      item.spp || 0,
      item.heregistrasi || 0,
      item.upm || 0,
      item.uktAfirmasiUika || 0,
      item.ujianAkhirSemester || 0,
      item.praktikumRpl || 0,
      item.praktikumJarkom || 0,
      item.praktikumMetodeNumerik || 0,
      item.praktikumStrukturData || 0,
      item.sks || 0,
      item.wakafMasjid || 0,
      item.taaruf || 0,
      item.sksSemester1 || 0,
      item.kolokium || 0,
      item.uangGedungTahap1 || 0,
      item.praktikumKnowledgeGraph || 0,
      item.praktikumPengenalanPola || 0,
      item.praktikumAlgoritma || 0,
      item.kerjaPraktik || 0,
      item.praktikumEmbedded || 0,
      item.praktikumAr || 0,
      item.sumbanganFasilitas || 0,
      item.biayaPendaftaranRusunawa || 0,
      item.rusunawa || 0,
      item.praktikumPenginderaanJauh || 0,
      item.praktikumPerangkatBergerak || 0,
      item.praktikumBahasaInggris || 0,
      item.praktikumKeamananInformasi || 0,
      item.praktikumPermodelanSpasial || 0,
      item.praktikumPemrogramanWeb || 0,
      item.praktikumSig || 0,
      item.praktikumPermodelanSimulasi || 0,
      item.total || item.totalPembayaran || 0,
    ]);
  });

  rows.push([]);
  rows.push([
    "TOTAL KESELURUHAN",
    totalSpp,
    totalHeregistrasi,
    totalUpm,
    totalUktAfirmasi,
    totalUas,
    totalRpl,
    totalJarkom,
    totalMetNum,
    totalStrukdat,
    totalSks,
    totalWakaf,
    totalTaaruf,
    totalSksSem1,
    totalKolokium,
    totalUangGedung,
    totalKg,
    totalPola,
    totalAlgoritma,
    totalKp,
    totalEmbedded,
    totalAr,
    totalSumbangan,
    totalDaftarRusunawa,
    totalRusunawa,
    totalInderaJauh,
    totalPerangkatBergerak,
    totalBhsInggris,
    totalKeamanan,
    totalModelSpasial,
    totalWeb,
    totalSig,
    totalModelSimulasi,
    grandTotal,
  ]);

  const worksheet = XLSX.utils.aoa_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Distribusi Tagihan Per Tanggal");
  XLSX.writeFile(workbook, `Laporan_Distribusi_Tagihan_Per_Tanggal_${new Date().toISOString().slice(0, 10)}.xlsx`);
}

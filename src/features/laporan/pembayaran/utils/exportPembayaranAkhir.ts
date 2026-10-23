import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import type {
  DistribusiPembayaranPerTanggalRowData,
  PivotPembayaranRowData,
} from "./generatePembayaranAkhirHtml";

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
// 1. DISTRIBUSI PEMBAYARAN AKUN CHANNEL PER TANGGAL (15 Kolom sesuai Gambar 3)
// ==========================================
export async function exportDistribusiPembayaranPerTanggalToPdf(params: {
  useKop?: boolean;
  unitKerja?: string;
  data: DistribusiPembayaranPerTanggalRowData[];
  formatRupiah?: (n: number) => string;
}): Promise<void> {
  const {
    useKop = true,
    unitKerja,
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
  doc.text(
    "LAPORAN DISTRIBUSI PEMBAYARAN AKUN CHANNEL PER TANGGAL",
    pageWidth / 2,
    currentY,
    { align: "center" }
  );
  currentY += 6;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(`Unit Kerja: ${unitKerja || "Universitas Ibn Khaldun"}`, 14, currentY);
  currentY += 6;

  const headers = [
    [
      "Tanggal",
      "Bank Syariah Indonesia",
      "BPRS Amanah Ummah",
      "Tokopedia",
      "Bank Amanah Ummah Formulir",
      "Bank Aceh",
      "Bank Central Asia",
      "BTN Syariah",
      "Kasir BASK UIKA",
      "Bank Muamalat",
      "Bank Nagari",
      "OVO",
      "Shopee",
      "MPN G3",
      "Total",
    ],
  ];

  const body = data.map((item) => [
    item.tanggal,
    formatRupiah(item.bankSyariahIndonesia || 0),
    formatRupiah(item.bprsAmanahUmmah || 0),
    formatRupiah(item.tokopedia || 0),
    formatRupiah(item.bankAmanahUmmahFormulir || 0),
    formatRupiah(item.bankAceh || 0),
    formatRupiah(item.bankCentralAsia || 0),
    formatRupiah(item.btnSyariah || 0),
    formatRupiah(item.kasirBaskUika || 0),
    formatRupiah(item.bankMuamalat || 0),
    formatRupiah(item.bankNagari || 0),
    formatRupiah(item.ovo || 0),
    formatRupiah(item.shopee || 0),
    formatRupiah(item.mpnG3 || 0),
    formatRupiah(item.total || item.totalPembayaran || 0),
  ]);

  const totalBsi = data.reduce((acc, curr) => acc + (curr.bankSyariahIndonesia || 0), 0);
  const totalBprs = data.reduce((acc, curr) => acc + (curr.bprsAmanahUmmah || 0), 0);
  const totalTokped = data.reduce((acc, curr) => acc + (curr.tokopedia || 0), 0);
  const totalAmanahFormulir = data.reduce((acc, curr) => acc + (curr.bankAmanahUmmahFormulir || 0), 0);
  const totalAceh = data.reduce((acc, curr) => acc + (curr.bankAceh || 0), 0);
  const totalBca = data.reduce((acc, curr) => acc + (curr.bankCentralAsia || 0), 0);
  const totalBtn = data.reduce((acc, curr) => acc + (curr.btnSyariah || 0), 0);
  const totalKasirBask = data.reduce((acc, curr) => acc + (curr.kasirBaskUika || 0), 0);
  const totalMuamalat = data.reduce((acc, curr) => acc + (curr.bankMuamalat || 0), 0);
  const totalNagari = data.reduce((acc, curr) => acc + (curr.bankNagari || 0), 0);
  const totalOvo = data.reduce((acc, curr) => acc + (curr.ovo || 0), 0);
  const totalShopee = data.reduce((acc, curr) => acc + (curr.shopee || 0), 0);
  const totalMpn = data.reduce((acc, curr) => acc + (curr.mpnG3 || 0), 0);
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
      fontSize: 6,
      halign: "center",
      valign: "middle",
      cellPadding: 1.5,
    },
    bodyStyles: { fontSize: 5.5, cellPadding: 1.5 },
    columnStyles: {
      0: { halign: "center", cellWidth: 16 },
      1: { halign: "right", cellWidth: 18 },
      2: { halign: "right", cellWidth: 18 },
      3: { halign: "right", cellWidth: 16 },
      4: { halign: "right", cellWidth: 19 },
      5: { halign: "right", cellWidth: 16 },
      6: { halign: "right", cellWidth: 18 },
      7: { halign: "right", cellWidth: 16 },
      8: { halign: "right", cellWidth: 18 },
      9: { halign: "right", cellWidth: 18 },
      10: { halign: "right", cellWidth: 16 },
      11: { halign: "right", cellWidth: 15 },
      12: { halign: "right", cellWidth: 15 },
      13: { halign: "right", cellWidth: 15 },
      14: { halign: "right", cellWidth: 20, fontStyle: "bold", textColor: [30, 58, 138] },
    },
    foot: [
      [
        { content: "TOTAL KESELURUHAN", styles: { halign: "center", fontStyle: "bold" } },
        { content: formatRupiah(totalBsi), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(totalBprs), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(totalTokped), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(totalAmanahFormulir), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(totalAceh), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(totalBca), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(totalBtn), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(totalKasirBask), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(totalMuamalat), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(totalNagari), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(totalOvo), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(totalShopee), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(totalMpn), styles: { halign: "right", fontStyle: "bold" } },
        { content: formatRupiah(grandTotal), styles: { halign: "right", fontStyle: "bold", textColor: [30, 58, 138] } },
      ],
    ],
    footStyles: { fillColor: [243, 244, 246], fontSize: 6, fontStyle: "bold" },
    margin: { left: 8, right: 8 },
  });

  doc.save(
    `Laporan_Distribusi_Akun_Channel_${new Date().toISOString().slice(0, 10)}.pdf`
  );
}

export function exportDistribusiPembayaranPerTanggalToExcel(params: {
  useKop?: boolean;
  unitKerja?: string;
  data: DistribusiPembayaranPerTanggalRowData[];
}): void {
  const { useKop = true, unitKerja, data } = params;
  const rows: (string | number)[][] = [];

  if (useKop) {
    rows.push(["UNIVERSITAS IBN KHALDUN BOGOR"]);
    rows.push(["Jl KH Sholeh Iskandar KM 2 Kedung Badak Bogor"]);
    rows.push([]);
  }

  rows.push(["LAPORAN DISTRIBUSI PEMBAYARAN AKUN CHANNEL PER TANGGAL"]);
  rows.push([`Unit Kerja: ${unitKerja || "Universitas Ibn Khaldun"}`]);
  rows.push([]);

  rows.push([
    "Tanggal",
    "Bank Syariah Indonesia",
    "BPRS Amanah Ummah",
    "Tokopedia",
    "Bank Amanah Ummah Formulir",
    "Bank Aceh",
    "Bank Central Asia",
    "BTN Syariah",
    "Kasir BASK UIKA",
    "Bank Muamalat",
    "Bank Nagari",
    "OVO",
    "Shopee",
    "MPN G3",
    "Total",
  ]);

  let totalBsi = 0;
  let totalBprs = 0;
  let totalTokped = 0;
  let totalAmanahFormulir = 0;
  let totalAceh = 0;
  let totalBca = 0;
  let totalBtn = 0;
  let totalKasirBask = 0;
  let totalMuamalat = 0;
  let totalNagari = 0;
  let totalOvo = 0;
  let totalShopee = 0;
  let totalMpn = 0;
  let grandTotal = 0;

  data.forEach((item) => {
    totalBsi += item.bankSyariahIndonesia || 0;
    totalBprs += item.bprsAmanahUmmah || 0;
    totalTokped += item.tokopedia || 0;
    totalAmanahFormulir += item.bankAmanahUmmahFormulir || 0;
    totalAceh += item.bankAceh || 0;
    totalBca += item.bankCentralAsia || 0;
    totalBtn += item.btnSyariah || 0;
    totalKasirBask += item.kasirBaskUika || 0;
    totalMuamalat += item.bankMuamalat || 0;
    totalNagari += item.bankNagari || 0;
    totalOvo += item.ovo || 0;
    totalShopee += item.shopee || 0;
    totalMpn += item.mpnG3 || 0;
    grandTotal += item.total || item.totalPembayaran || 0;

    rows.push([
      item.tanggal,
      item.bankSyariahIndonesia || 0,
      item.bprsAmanahUmmah || 0,
      item.tokopedia || 0,
      item.bankAmanahUmmahFormulir || 0,
      item.bankAceh || 0,
      item.bankCentralAsia || 0,
      item.btnSyariah || 0,
      item.kasirBaskUika || 0,
      item.bankMuamalat || 0,
      item.bankNagari || 0,
      item.ovo || 0,
      item.shopee || 0,
      item.mpnG3 || 0,
      item.total || item.totalPembayaran || 0,
    ]);
  });

  rows.push([]);
  rows.push([
    "TOTAL KESELURUHAN",
    totalBsi,
    totalBprs,
    totalTokped,
    totalAmanahFormulir,
    totalAceh,
    totalBca,
    totalBtn,
    totalKasirBask,
    totalMuamalat,
    totalNagari,
    totalOvo,
    totalShopee,
    totalMpn,
    grandTotal,
  ]);

  const worksheet = XLSX.utils.aoa_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Distribusi Akun Channel"
  );
  XLSX.writeFile(
    workbook,
    `Laporan_Distribusi_Akun_Channel_${new Date().toISOString().slice(0, 10)}.xlsx`
  );
}

// ==========================================
// 2. PIVOT PEMBAYARAN (3 Kolom sesuai Gambar 4)
// ==========================================
export async function exportPivotPembayaranToPdf(params: {
  useKop?: boolean;
  unitKerja?: string;
  kolomPivot?: string;
  data: PivotPembayaranRowData[];
  formatRupiah?: (n: number) => string;
}): Promise<void> {
  const {
    useKop = true,
    unitKerja,
    kolomPivot = "Nama Mahasiswa",
    data,
    formatRupiah = (n) => `Rp ${n.toLocaleString("id-ID")}`,
  } = params;

  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  let currentY = 12;

  if (useKop) {
    currentY = await renderKopPdf(doc, pageWidth, currentY);
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(20, 20, 20);
  doc.text("LAPORAN PIVOT PEMBAYARAN", pageWidth / 2, currentY, {
    align: "center",
  });
  currentY += 6;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(
    `Unit Kerja: ${unitKerja || "Universitas Ibn Khaldun"} | Kolom Pivot: ${kolomPivot}`,
    14,
    currentY
  );
  currentY += 6;

  const headers = [
    [
      "No.",
      "Nama Mahasiswa",
      "Total Nominal",
    ],
  ];

  const body = data.map((item) => [
    item.no,
    item.namaMahasiswa || item.pivotKey || "",
    formatRupiah(item.totalNominal || 0),
  ]);

  const grandTotalNominal = data.reduce((acc, curr) => acc + (curr.totalNominal || 0), 0);

  autoTable(doc, {
    head: headers,
    body: body,
    startY: currentY,
    theme: "grid",
    headStyles: {
      fillColor: [30, 58, 138],
      textColor: [255, 255, 255],
      fontSize: 9,
      fontStyle: "bold",
      halign: "center",
      cellPadding: 2.5,
    },
    bodyStyles: { fontSize: 8.5, cellPadding: 2.5 },
    columnStyles: {
      0: { halign: "center", cellWidth: 15 },
      1: { cellWidth: 110, fontStyle: "bold" },
      2: { halign: "right", cellWidth: 55, fontStyle: "bold", textColor: [30, 58, 138] },
    },
    foot: [
      [
        {
          content: "TOTAL KESELURUHAN",
          colSpan: 2,
          styles: { halign: "center", fontStyle: "bold" },
        },
        {
          content: formatRupiah(grandTotalNominal),
          styles: { halign: "right", fontStyle: "bold", textColor: [30, 58, 138] },
        },
      ],
    ],
    footStyles: { fillColor: [243, 244, 246], fontSize: 9, fontStyle: "bold" },
    margin: { left: 14, right: 14 },
  });

  doc.save(
    `Laporan_Pivot_Pembayaran_${new Date().toISOString().slice(0, 10)}.pdf`
  );
}

export function exportPivotPembayaranToExcel(params: {
  useKop?: boolean;
  unitKerja?: string;
  kolomPivot?: string;
  data: PivotPembayaranRowData[];
}): void {
  const { useKop = true, unitKerja, kolomPivot = "Nama Mahasiswa", data } = params;
  const rows: (string | number)[][] = [];

  if (useKop) {
    rows.push(["UNIVERSITAS IBN KHALDUN BOGOR"]);
    rows.push(["Jl KH Sholeh Iskandar KM 2 Kedung Badak Bogor"]);
    rows.push([]);
  }

  rows.push(["LAPORAN PIVOT PEMBAYARAN"]);
  rows.push([`Unit Kerja: ${unitKerja || "Universitas Ibn Khaldun"}`]);
  rows.push([`Kolom Pivot: ${kolomPivot}`]);
  rows.push([]);

  rows.push([
    "No.",
    "Nama Mahasiswa",
    "Total Nominal",
  ]);

  let grandTotalNominal = 0;

  data.forEach((item) => {
    grandTotalNominal += item.totalNominal || 0;

    rows.push([
      item.no,
      item.namaMahasiswa || item.pivotKey || "",
      item.totalNominal || 0,
    ]);
  });

  rows.push([]);
  rows.push([
    "TOTAL KESELURUHAN",
    "",
    grandTotalNominal,
  ]);

  const worksheet = XLSX.utils.aoa_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Pivot Pembayaran");
  XLSX.writeFile(
    workbook,
    `Laporan_Pivot_Pembayaran_${new Date().toISOString().slice(0, 10)}.xlsx`
  );
}

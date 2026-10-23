export interface PembayaranRowData {
  no: number;
  kodePembayaran: string;
  nim: string; // NIM / Kode Pendaftar
  nama: string;
  prodi: string;
  periode: string;
  metodePembayaran: string;
  channel: string;
  tanggalBayar: string; // Tanggal
  nominal: number;
  status: string; // Status Pembatalan ("Tidak" / "Batal")
}

export interface GenerateLaporanPembayaranParams {
  useKop: boolean;
  selectedPeriods: string[];
  metodePembayaran: string;
  channel: string;
  tglAwal: string;
  tglAkhir: string;
  penerima: string;
  statusPembatalan: string;
  pembayaranData: PembayaranRowData[];
  formatRupiah: (num: number) => string;
}

export function generateLaporanPembayaranHtml(
  params: GenerateLaporanPembayaranParams
): string {
  const {
    useKop,
    selectedPeriods,
    metodePembayaran,
    channel,
    tglAwal,
    tglAkhir,
    penerima,
    statusPembatalan,
    pembayaranData,
    formatRupiah,
  } = params;

  const totalNominal = pembayaranData.reduce(
    (acc, curr) => acc + (curr.status === "Batal" || curr.status === "Ya" ? 0 : curr.nominal),
    0
  );

  return `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <title>Laporan Pembayaran - Universitas Ibn Khaldun Bogor</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 30px; color: #252a38; }
        .header { margin-bottom: 20px; }
        .header-content { display: flex; align-items: center; justify-content: center; gap: 20px; }
        .header-logo { width: 75px; height: 75px; object-fit: contain; }
        .header-text { text-align: center; }
        .header-text h2 { margin: 0; font-size: 20px; font-weight: bold; color: #111827; letter-spacing: 0.5px; }
        .header-text p { margin: 2px 0; font-size: 12px; color: #374151; }
        .header-line { border-bottom: 3px double #111827; margin-top: 10px; }
        .report-title { text-align: center; margin: 15px 0 20px 0; }
        .report-title h3 { margin: 0; font-size: 15px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; color: #111827; }
        .info-table { width: 100%; margin-bottom: 20px; font-size: 13px; }
        .info-table td { padding: 4px 8px; }
        .info-table td.label { font-weight: bold; width: 180px; color: #1e3a8a; }
        table.data-table { width: 100%; border-collapse: collapse; font-size: 12px; margin-top: 10px; }
        table.data-table th, table.data-table td { border: 1px solid #d1d5db; padding: 8px 10px; text-align: left; }
        table.data-table th { background-color: #1e3a8a; color: white; font-weight: 600; text-align: center; }
        table.data-table tr:nth-child(even) { background-color: #f9fafb; }
        .text-right { text-align: right; }
        .text-center { text-align: center; }
        .font-mono { font-family: monospace; }
        .badge { display: inline-block; padding: 2px 8px; border-radius: 9999px; font-size: 11px; font-weight: 600; }
        .badge-sukses { background: #d1fae5; color: #065f46; }
        .badge-batal { background: #fee2e2; color: #991b1b; }
        .footer { margin-top: 40px; text-align: right; font-size: 12px; color: #6b7280; }
        @media print {
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="no-print" style="margin-bottom: 20px; text-align: right;">
        <button onclick="window.print()" style="padding: 8px 16px; background: #1e3a8a; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">
          Cetak Laporan
        </button>
      </div>
      ${
        useKop
          ? `
        <div class="header">
          <div class="header-content">
            <img src="/images/logo-uika.png" alt="Logo UIKA" class="header-logo" />
            <div class="header-text">
              <h2>UNIVERSITAS IBN KHALDUN BOGOR</h2>
              <p>Jl KH Sholeh Iskandar KM 2 Kedung Badak Bogor</p>
              <p>Website : uika-bogor.ac.id/ e-Mail :mail@uika-bogor.ac.id / Telepon :0251-8356884</p>
            </div>
          </div>
          <div class="header-line"></div>
        </div>
      `
          : ""
      }
      <div class="report-title">
        <h3>LAPORAN PEMBAYARAN ${selectedPeriods.length > 0 ? `PERIODE ${selectedPeriods.join(", ").toUpperCase()}` : "SEMUA PERIODE"}</h3>
      </div>

      <table class="info-table">
        <tr>
          <td class="label">Periode Pembayaran</td>
          <td>: ${selectedPeriods.length > 0 ? selectedPeriods.join(", ") : "Semua Periode"}</td>
          <td class="label">Penerima</td>
          <td>: ${penerima || "Semua Penerima"}</td>
        </tr>
        <tr>
          <td class="label">Metode Pembayaran</td>
          <td>: ${metodePembayaran || "Semua Metode"}</td>
          <td class="label">Channel</td>
          <td>: ${channel || "Semua Channel"}</td>
        </tr>
        <tr>
          <td class="label">Rentang Tanggal</td>
          <td>: ${tglAwal ? tglAwal : "-"} s/d ${tglAkhir ? tglAkhir : "-"}</td>
          <td class="label">Status Pembatalan</td>
          <td>: ${statusPembatalan || "Semua Status"}</td>
        </tr>
      </table>

      <table class="data-table">
        <thead>
          <tr>
            <th style="width: 40px;">No.</th>
            <th>Kode Pembayaran</th>
            <th>NIM / Kode Pendaftar</th>
            <th>Nama</th>
            <th>Program Studi</th>
            <th>Periode</th>
            <th>Metode Pembayaran</th>
            <th>Channel</th>
            <th>Tanggal</th>
            <th class="text-right">Nominal</th>
            <th class="text-center" style="width: 120px;">Status Pembatalan</th>
          </tr>
        </thead>
        <tbody>
          ${
            pembayaranData.length > 0
              ? pembayaranData
                  .map(
                    (row) => `
              <tr>
                <td class="text-center">${row.no}</td>
                <td><strong>${row.kodePembayaran}</strong></td>
                <td class="text-center font-mono">${row.nim}</td>
                <td>${row.nama}</td>
                <td>${row.prodi}</td>
                <td class="text-center">${row.periode}</td>
                <td>${row.metodePembayaran}</td>
                <td>${row.channel}</td>
                <td class="text-center">${row.tanggalBayar}</td>
                <td class="text-right font-mono" style="font-weight: 600;">${formatRupiah(row.nominal)}</td>
                <td class="text-center">
                  <span class="badge ${row.status === "Batal" || row.status === "Ya" ? "badge-batal" : "badge-sukses"}">
                    ${row.status}
                  </span>
                </td>
              </tr>
            `
                  )
                  .join("")
              : `<tr><td colspan="11" class="text-center">Tidak ada data pembayaran yang sesuai</td></tr>`
          }
        </tbody>
        <tfoot>
          <tr style="background-color: #f3f4f6; font-weight: bold;">
            <td colspan="9" class="text-center">TOTAL KESELURUHAN (AKTIF)</td>
            <td class="text-right font-mono" style="color: #1e3a8a;">${formatRupiah(totalNominal)}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>

      <div class="footer">
        <p>Dicetak pada: ${new Date().toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}</p>
      </div>
    </body>
    </html>
  `;
}

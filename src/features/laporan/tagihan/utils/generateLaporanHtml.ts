export interface ReportRowData {
  no: number;
  kodeTagihan: string;
  nim: string;
  nama: string;
  prodi: string;
  periode: string;
  jenisTagihan: string;
  cicilan: string;
  bulan: string;
  nominal: number; // Tagihan
  denda: number;
  potongan: number;
  bayar: number; // Pembayaran
  status: string; // Lunas?
  sisa: number; // Sisa Tagihan
  suspend: string; // Suspend?
}

export interface GenerateLaporanHtmlParams {
  useKop: boolean;
  selectedPenerima: string;
  selectedPeriods: string[];
  selectedStatus: string;
  selectedProdi: string;
  selectedJenisTagihan: string;
  reportData: ReportRowData[];
  formatRupiah: (num: number) => string;
}

export function generateLaporanHtml(params: GenerateLaporanHtmlParams): string {
  const {
    useKop,
    selectedPenerima,
    selectedPeriods,
    selectedStatus,
    selectedProdi,
    selectedJenisTagihan,
    reportData,
    formatRupiah,
  } = params;

  return `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <title>Laporan Tagihan - Universitas Ibn Khaldun Bogor</title>
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
        .report-title p { margin: 5px 0 0 0; font-size: 11px; color: #6b7280; }
        .info-table { width: 100%; margin-bottom: 20px; font-size: 13px; }
        .info-table td { padding: 4px 8px; }
        .info-table td.label { font-weight: bold; width: 180px; color: #1e3a8a; }
        table.data-table { width: 100%; border-collapse: collapse; font-size: 12px; margin-top: 10px; }
        table.data-table th, table.data-table td { border: 1px solid #d1d5db; padding: 8px 10px; text-align: left; }
        table.data-table th { background-color: #1e3a8a; color: white; font-weight: 600; text-align: center; }
        table.data-table tr:nth-child(even) { background-color: #f9fafb; }
        .text-right { text-align: right; }
        .text-center { text-align: center; }
        .badge { display: inline-block; padding: 2px 8px; border-radius: 9999px; font-size: 11px; font-weight: 600; }
        .badge-lunas { background: #d1fae5; color: #065f46; }
        .badge-belum { background: #fee2e2; color: #991b1b; }
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
        <h3>TAGIHAN ${selectedPenerima.toUpperCase()} PERIODE ${(selectedPeriods.length > 0 ? selectedPeriods.join(", ") : "SEMUA PERIODE").toUpperCase()}</h3>
      </div>

      <table class="info-table">
        <tr>
          <td class="label">Periode Akademik:</td>
          <td>${selectedPeriods.length > 0 ? selectedPeriods.join(", ") : "Semua Periode"}</td>
          <td class="label">Status:</td>
          <td>${selectedStatus || "Semua Status"}</td>
        </tr>
        <tr>
          <td class="label">Program Studi:</td>
          <td>${selectedProdi || "Semua Program Studi"}</td>
          <td class="label">Penerima:</td>
          <td>${selectedPenerima}</td>
        </tr>
        <tr>
          <td class="label">Jenis Tagihan:</td>
          <td colspan="3">${selectedJenisTagihan || "Semua Jenis Tagihan"}</td>
        </tr>
      </table>

      <table class="data-table">
        <thead>
          <tr>
            <th width="35">No.</th>
            <th>Kode Tagihan</th>
            <th>NIM</th>
            <th>Nama</th>
            <th>Program Studi</th>
            <th>Periode</th>
            <th>Jenis Tagihan</th>
            <th class="text-center">Cicilan</th>
            <th class="text-center">Bulan</th>
            <th class="text-right">Tagihan</th>
            <th class="text-right">Denda</th>
            <th class="text-right">Potongan</th>
            <th class="text-right">Pembayaran</th>
            <th class="text-center">Lunas?</th>
            <th class="text-right">Sisa Tagihan</th>
            <th class="text-center">Suspend?</th>
          </tr>
        </thead>
        <tbody>
          ${reportData
            .map(
              (row) => `
            <tr>
              <td class="text-center">${row.no}</td>
              <td class="text-center font-mono">${row.kodeTagihan}</td>
              <td class="text-center font-mono">${row.nim}</td>
              <td><b>${row.nama}</b></td>
              <td>${row.prodi}</td>
              <td class="text-center">${row.periode}</td>
              <td>${row.jenisTagihan}</td>
              <td class="text-center">${row.cicilan}</td>
              <td class="text-center">${row.bulan}</td>
              <td class="text-right">${formatRupiah(row.nominal)}</td>
              <td class="text-right">${formatRupiah(row.denda)}</td>
              <td class="text-right">${formatRupiah(row.potongan)}</td>
              <td class="text-right">${formatRupiah(row.bayar)}</td>
              <td class="text-center">
                <span class="badge ${row.status === "Lunas" || row.status === "Ya" ? "badge-lunas" : "badge-belum"}">
                  ${row.status}
                </span>
              </td>
              <td class="text-right font-semibold">${formatRupiah(row.sisa)}</td>
              <td class="text-center">${row.suspend}</td>
            </tr>
          `,
            )
            .join("")}
        </tbody>
      </table>

      <div class="footer">
        <p>Dicetak otomatis oleh Sistem Keuangan UIKA pada ${new Date().toLocaleString("id-ID")}</p>
      </div>
    </body>
    </html>
  `;
}

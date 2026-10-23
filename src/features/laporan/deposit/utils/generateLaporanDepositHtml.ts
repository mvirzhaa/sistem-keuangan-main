export interface LaporanDepositRowData {
  no: number;
  kodeDeposit: string;
  nim: string;
  nama: string;
  prodi: string;
  periode: string;
  metodePembayaran: string;
  keterangan: string;
  tanggal: string;
  masuk: number;
  keluar: number;
  // compatibility:
  channel?: string;
  tanggalDeposit?: string;
  nominalDeposit?: number;
  status?: string;
}

export interface LaporanRekapDepositRowData {
  no: number;
  prodi: string;
  masuk: number;
  keluar: number;
  // compatibility:
  metodePembayaran?: string;
  channel?: string;
  jumlahTransaksi?: number;
  totalDepositMasuk?: number;
  totalTerpakai?: number;
  sisaSaldo?: number;
}

const kopHtml = `
  <div class="header">
    <div class="header-content">
      <img src="/images/logo-uika.png" alt="Logo UIKA" class="header-logo" onerror="this.style.display='none'" />
      <div class="header-text">
        <h2>UNIVERSITAS IBN KHALDUN BOGOR</h2>
        <p>Jl KH Sholeh Iskandar KM 2 Kedung Badak Bogor</p>
        <p>Website : uika-bogor.ac.id/ e-Mail :mail@uika-bogor.ac.id / Telepon :0251-8356884</p>
      </div>
    </div>
    <div class="header-line"></div>
  </div>
`;

const commonStyles = `
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
  table.data-table th { background-color: #1e3a8a; font-weight: 600; color: white; text-align: center; }
  table.data-table tr:nth-child(even) { background-color: #f9fafb; }
  table.data-table tfoot td { font-weight: bold; background-color: #f3f4f6; }
  .text-right { text-align: right; }
  .text-center { text-align: center; }
  .badge { display: inline-block; padding: 2px 8px; border-radius: 9999px; font-size: 11px; font-weight: 600; }
  .badge-success { background-color: #d1fae5; color: #065f46; }
  .badge-warning { background-color: #fef9c3; color: #854d0e; }
  .badge-primary { background-color: #dbeafe; color: #1e40af; }
  .footer { margin-top: 40px; text-align: right; font-size: 12px; color: #6b7280; }
  @media print {
    .no-print { display: none; }
  }
`;

const printButtonHtml = `
  <div class="no-print" style="margin-bottom: 20px; text-align: right;">
    <button onclick="window.print()" style="padding: 8px 16px; background: #1e3a8a; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">
      Cetak Laporan
    </button>
  </div>
`;

// 1. Generate HTML Laporan Deposit
export function generateLaporanDepositHtml(params: {
  useKop: boolean;
  tahunAkademik: string;
  programStudi: string;
  metodePembayaran: string;
  channel: string;
  penerima: string;
  data: LaporanDepositRowData[];
  formatRupiah: (num: number) => string;
}): string {
  const {
    useKop,
    tahunAkademik,
    programStudi,
    metodePembayaran,
    channel,
    penerima,
    data,
    formatRupiah,
  } = params;

  const totalMasuk = data.reduce(
    (acc, curr) => acc + (curr.masuk ?? curr.nominalDeposit ?? 0),
    0
  );
  const totalKeluar = data.reduce(
    (acc, curr) => acc + (curr.keluar ?? 0),
    0
  );

  return `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <title>Laporan Deposit - UIKA Bogor</title>
      <style>${commonStyles}</style>
    </head>
    <body>
      ${printButtonHtml}
      ${useKop ? kopHtml : ""}
      
      <div class="report-title">
        <h3>LAPORAN DEPOSIT</h3>
      </div>

      <table class="info-table">
        <tr>
          <td class="label">Tahun Akademik:</td>
          <td>${tahunAkademik}</td>
          <td class="label">Metode Pembayaran:</td>
          <td>${metodePembayaran || "Semua Metode"}</td>
        </tr>
        <tr>
          <td class="label">Program Studi:</td>
          <td>${programStudi || "Semua Program Studi"}</td>
          <td class="label">Channel:</td>
          <td>${channel || "Semua Channel"}</td>
        </tr>
        <tr>
          <td class="label">Penerima:</td>
          <td>${penerima}</td>
          <td class="label">Total Transaksi:</td>
          <td>${data.length} Transaksi</td>
        </tr>
      </table>

      <table class="data-table">
        <thead>
          <tr>
            <th style="width: 40px;" class="text-center">No.</th>
            <th>Kode Deposit</th>
            <th class="text-center">NIM</th>
            <th>Nama</th>
            <th>Program Studi</th>
            <th class="text-center">Periode</th>
            <th>Metode Pembayaran</th>
            <th>Keterangan</th>
            <th class="text-center">Tanggal</th>
            <th class="text-right">Masuk</th>
            <th class="text-right">Keluar</th>
          </tr>
        </thead>
        <tbody>
          ${
            data.length > 0
              ? data
                  .map(
                    (row) => `
                <tr>
                  <td class="text-center">${row.no}</td>
                  <td class="font-mono">${row.kodeDeposit || "-"}</td>
                  <td class="text-center font-mono">${row.nim}</td>
                  <td style="font-weight: 500;">${row.nama}</td>
                  <td>${row.prodi}</td>
                  <td class="text-center">${row.periode || "-"}</td>
                  <td>${row.metodePembayaran}</td>
                  <td>${row.keterangan || "-"}</td>
                  <td class="text-center">${row.tanggal || row.tanggalDeposit || "-"}</td>
                  <td class="text-right font-mono" style="font-weight: 600; color: #1e3a8a;">${formatRupiah(row.masuk ?? row.nominalDeposit ?? 0)}</td>
                  <td class="text-right font-mono" style="font-weight: 600; color: #b91c1c;">${formatRupiah(row.keluar ?? 0)}</td>
                </tr>
              `
                  )
                  .join("")
              : `<tr><td colspan="11" class="text-center" style="padding: 20px;">Tidak ada data deposit yang sesuai.</td></tr>`
          }
        </tbody>
        <tfoot>
          <tr>
            <td colspan="9" class="text-center">TOTAL KESELURUHAN DEPOSIT (${data.length} TRANSAKSI)</td>
            <td class="text-right font-mono" style="color: #1e3a8a;">${formatRupiah(totalMasuk)}</td>
            <td class="text-right font-mono" style="color: #b91c1c;">${formatRupiah(totalKeluar)}</td>
          </tr>
        </tfoot>
      </table>
      
      <div class="footer">
        <p>Dicetak otomatis oleh Sistem Keuangan UIKA pada ${new Date().toLocaleString("id-ID")}</p>
      </div>
    </body>
    </html>
  `;
}

// 2. Generate HTML Laporan Rekap Deposit
export function generateLaporanRekapDepositHtml(params: {
  useKop: boolean;
  tahunAkademik: string;
  programStudi: string;
  metodePembayaran: string;
  channel: string;
  tglAwal?: string;
  tglAkhir?: string;
  data: LaporanRekapDepositRowData[];
  formatRupiah: (num: number) => string;
}): string {
  const {
    useKop,
    tahunAkademik,
    programStudi,
    metodePembayaran,
    channel,
    tglAwal,
    tglAkhir,
    data,
    formatRupiah,
  } = params;

  const totalMasuk = data.reduce(
    (acc, curr) => acc + (curr.masuk ?? curr.totalDepositMasuk ?? 0),
    0
  );
  const totalKeluar = data.reduce(
    (acc, curr) => acc + (curr.keluar ?? curr.totalTerpakai ?? 0),
    0
  );

  return `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <title>Laporan Rekap Deposit - UIKA Bogor</title>
      <style>${commonStyles}</style>
    </head>
    <body>
      ${printButtonHtml}
      ${useKop ? kopHtml : ""}
      
      <div class="report-title">
        <h3>LAPORAN REKAP DEPOSIT</h3>
      </div>

      <table class="info-table">
        <tr>
          <td class="label">Tahun Akademik:</td>
          <td>${tahunAkademik}</td>
          <td class="label">Metode Pembayaran:</td>
          <td>${metodePembayaran || "Semua Metode"}</td>
        </tr>
        <tr>
          <td class="label">Program Studi:</td>
          <td>${programStudi || "Universitas Ibn Khaldun"}</td>
          <td class="label">Channel:</td>
          <td>${channel || "Semua Channel"}</td>
        </tr>
        <tr>
          <td class="label">Periode Tanggal:</td>
          <td>${tglAwal && tglAkhir ? `${tglAwal} s/d ${tglAkhir}` : "Semua Periode"}</td>
          <td class="label">Total Entitas:</td>
          <td>${data.length} Rekap</td>
        </tr>
      </table>

      <table class="data-table">
        <thead>
          <tr>
            <th style="width: 40px;" class="text-center">No.</th>
            <th>Program Studi</th>
            <th class="text-right">Masuk</th>
            <th class="text-right">Keluar</th>
          </tr>
        </thead>
        <tbody>
          ${
            data.length > 0
              ? data
                  .map(
                    (row) => `
                <tr>
                  <td class="text-center">${row.no}</td>
                  <td style="font-weight: 500;">${row.prodi}</td>
                  <td class="text-right font-mono" style="color: #1e3a8a; font-weight: 600;">${formatRupiah(row.masuk ?? row.totalDepositMasuk ?? 0)}</td>
                  <td class="text-right font-mono" style="color: #b91c1c; font-weight: 600;">${formatRupiah(row.keluar ?? row.totalTerpakai ?? 0)}</td>
                </tr>
              `
                  )
                  .join("")
              : `<tr><td colspan="4" class="text-center" style="padding: 20px;">Tidak ada data rekap deposit yang sesuai.</td></tr>`
          }
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" class="text-center">TOTAL KESELURUHAN REKAP</td>
            <td class="text-right font-mono" style="color: #1e3a8a; font-weight: bold;">${formatRupiah(totalMasuk)}</td>
            <td class="text-right font-mono" style="color: #b91c1c; font-weight: bold;">${formatRupiah(totalKeluar)}</td>
          </tr>
        </tfoot>
      </table>
      
      <div class="footer">
        <p>Dicetak otomatis oleh Sistem Keuangan UIKA pada ${new Date().toLocaleString("id-ID")}</p>
      </div>
    </body>
    </html>
  `;
}

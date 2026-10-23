export interface PivotRowData {
  no: number;
  namaMahasiswa: string;
  jumlahTagihan: number;
  nominalTagihan: number;
  denda: number;
  potongan: number; // Potongan / Beasiswa
  totalTagihan: number;
  nominalBayar: number;
  sisaTagihan: number;
}

export interface GenerateLaporanPivotHtmlParams {
  useKop: boolean;
  periodeTagihan: string[];
  unitKerja: string;
  jenisTagihan: string;
  tglCutOff: string;
  penerima: string;
  kolomPivot: string;
  pivotData: PivotRowData[];
  formatRupiah: (num: number) => string;
}

export function generateLaporanPivotHtml(
  params: GenerateLaporanPivotHtmlParams,
): string {
  const {
    useKop,
    periodeTagihan,
    unitKerja,
    jenisTagihan,
    tglCutOff,
    penerima,
    kolomPivot,
    pivotData,
    formatRupiah,
  } = params;

  const totalJumlahTagihan = pivotData.reduce(
    (acc, curr) => acc + curr.jumlahTagihan,
    0,
  );
  const totalNominalTagihan = pivotData.reduce(
    (acc, curr) => acc + curr.nominalTagihan,
    0,
  );
  const totalDenda = pivotData.reduce((acc, curr) => acc + curr.denda, 0);
  const totalPotongan = pivotData.reduce((acc, curr) => acc + curr.potongan, 0);
  const totalTagihan = pivotData.reduce(
    (acc, curr) => acc + curr.totalTagihan,
    0,
  );
  const totalNominalBayar = pivotData.reduce(
    (acc, curr) => acc + curr.nominalBayar,
    0,
  );
  const totalSisaTagihan = pivotData.reduce(
    (acc, curr) => acc + curr.sisaTagihan,
    0,
  );

  return `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <title>Laporan Pivot Tagihan - Universitas Ibn Khaldun Bogor</title>
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
        table.data-table tfoot tr { background-color: #f3f4f6; font-weight: bold; }
        .text-right { text-align: right; }
        .text-center { text-align: center; }
        .font-mono { font-family: monospace; }
        .footer { margin-top: 40px; text-align: right; font-size: 12px; color: #6b7280; }
        @media print {
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="no-print" style="margin-bottom: 20px; text-align: right;">
        <button onclick="window.print()" style="padding: 8px 16px; background: #1e3a8a; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">
          Cetak Pivot
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
        <h3>LAPORAN PIVOT TAGIHAN PERIODE ${(periodeTagihan.length > 0 ? periodeTagihan.join(", ") : "SEMUA PERIODE").toUpperCase()}</h3>
      </div>

      <table class="info-table">
        <tr>
          <td class="label">Periode Tagihan:</td>
          <td>${periodeTagihan.length > 0 ? periodeTagihan.join(", ") : "Semua Periode"}</td>
          <td class="label">Unit Kerja:</td>
          <td>${unitKerja || "Universitas Ibn Khaldun"}</td>
        </tr>
        <tr>
          <td class="label">Jenis Tagihan:</td>
          <td>${jenisTagihan || "Semua Jenis Tagihan"}</td>
          <td class="label">Penerima:</td>
          <td>${penerima || "Semua Penerima"}</td>
        </tr>
        <tr>
          <td class="label">Kolom Pivot:</td>
          <td><b>${kolomPivot}</b></td>
          <td class="label">Tgl. Cut Off:</td>
          <td>${tglCutOff || "Real-time (Terkini)"}</td>
        </tr>
      </table>

      <table class="data-table">
        <thead>
          <tr>
            <th width="35">No.</th>
            <th>Nama Mahasiswa</th>
            <th class="text-center">Jumlah Tagihan</th>
            <th class="text-right">Nominal Tagihan</th>
            <th class="text-right">Denda</th>
            <th class="text-right">Potongan / Beasiswa</th>
            <th class="text-right">Total Tagihan</th>
            <th class="text-right">Nominal Bayar</th>
            <th class="text-right">Sisa Tagihan</th>
          </tr>
        </thead>
        <tbody>
          ${pivotData
            .map(
              (row) => `
            <tr>
              <td class="text-center">${row.no}</td>
              <td><b>${row.namaMahasiswa}</b></td>
              <td class="text-center font-mono">${row.jumlahTagihan.toLocaleString("id-ID")}</td>
              <td class="text-right font-mono">${formatRupiah(row.nominalTagihan)}</td>
              <td class="text-right font-mono">${formatRupiah(row.denda)}</td>
              <td class="text-right font-mono">${formatRupiah(row.potongan)}</td>
              <td class="text-right font-mono font-semibold">${formatRupiah(row.totalTagihan)}</td>
              <td class="text-right font-mono text-emerald-700">${formatRupiah(row.nominalBayar)}</td>
              <td class="text-right font-mono font-bold text-rose-700">${formatRupiah(row.sisaTagihan)}</td>
            </tr>
          `,
            )
            .join("")}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" class="text-center"><b>TOTAL KESELURUHAN</b></td>
            <td class="text-center font-mono"><b>${totalJumlahTagihan.toLocaleString("id-ID")}</b></td>
            <td class="text-right font-mono"><b>${formatRupiah(totalNominalTagihan)}</b></td>
            <td class="text-right font-mono"><b>${formatRupiah(totalDenda)}</b></td>
            <td class="text-right font-mono"><b>${formatRupiah(totalPotongan)}</b></td>
            <td class="text-right font-mono"><b>${formatRupiah(totalTagihan)}</b></td>
            <td class="text-right font-mono text-emerald-700"><b>${formatRupiah(totalNominalBayar)}</b></td>
            <td class="text-right font-mono text-rose-700"><b>${formatRupiah(totalSisaTagihan)}</b></td>
          </tr>
        </tfoot>
      </table>

      <div class="footer">
        <p>Dicetak otomatis oleh Sistem Informasi Keuangan UIKA pada ${new Date().toLocaleString("id-ID")}</p>
      </div>
    </body>
    </html>
  `;
}

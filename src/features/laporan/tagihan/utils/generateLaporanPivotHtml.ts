export interface PivotRowData {
  no: number;
  pivotKey: string; // Misal nama prodi, angkatan, atau jenis tagihan
  belumBayar: number;
  belumLunas: number;
  lunas: number;
  dispensasi: number;
  totalTagihan: number;
  totalTerbayar: number;
  sisaPiutang: number;
  persentaseTerbayar: number;
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

  const totalBelumBayar = pivotData.reduce(
    (acc, curr) => acc + curr.belumBayar,
    0,
  );
  const totalBelumLunas = pivotData.reduce(
    (acc, curr) => acc + curr.belumLunas,
    0,
  );
  const totalLunas = pivotData.reduce((acc, curr) => acc + curr.lunas, 0);
  const totalDispensasi = pivotData.reduce(
    (acc, curr) => acc + curr.dispensasi,
    0,
  );
  const totalTagihan = pivotData.reduce(
    (acc, curr) => acc + curr.totalTagihan,
    0,
  );
  const totalTerbayar = pivotData.reduce(
    (acc, curr) => acc + curr.totalTerbayar,
    0,
  );
  const totalSisa = pivotData.reduce((acc, curr) => acc + curr.sisaPiutang, 0);
  const overallPct =
    totalTagihan > 0 ? ((totalTerbayar / totalTagihan) * 100).toFixed(1) : "0";

  return `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <title>Laporan Pivot Tagihan - Universitas Ibn Khaldun Bogor</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 30px; color: #252a38; }
        .header { text-align: center; margin-bottom: 25px; border-bottom: ${useKop ? "3px double #10ac84" : "none"}; padding-bottom: ${useKop ? "15px" : "0"}; }
        .header h2 { margin: 0; font-size: 20px; color: #1e3a8a; }
        .header h1 { margin: 5px 0; font-size: 24px; color: #10ac84; }
        .header p { margin: 3px 0; font-size: 13px; color: #4b5563; }
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
        .badge { display: inline-block; padding: 2px 8px; border-radius: 9999px; font-size: 11px; font-weight: 600; }
        .badge-success { background: #d1fae5; color: #065f46; }
        .badge-warning { background: #fef3c7; color: #92400e; }
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
          <h2>UNIVERSITAS IBN KHALDUN BOGOR</h2>
          <h1>SISTEM INFORMASI KEUANGAN</h1>
          <p>Jl. KH. Sholeh Iskandar KM.2, Kedung Badak, Tanah Sereal, Kota Bogor, Jawa Barat 16162</p>
          <p>Telepon: (0251) 8356884 | Email: info@uika-bogor.ac.id</p>
        </div>
      `
          : ""
      }
      <div style="text-align: center; margin: 20px 0;">
        <h3 style="margin: 0; text-transform: uppercase; letter-spacing: 1px; color: #1e3a8a;">Laporan Pivot Tagihan</h3>
        <p style="margin: 5px 0 0 0; font-size: 12px; color: #6b7280;">Berdasarkan: ${kolomPivot} | Tanggal Cetak: ${new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</p>
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
            <th width="35">No</th>
            <th>${kolomPivot}</th>
            <th class="text-right">Belum Bayar</th>
            <th class="text-right">Belum Lunas</th>
            <th class="text-right">Lunas</th>
            <th class="text-right">Dispensasi</th>
            <th class="text-right">Total Tagihan</th>
            <th class="text-right">Total Terbayar</th>
            <th class="text-right">Sisa Piutang</th>
            <th class="text-center">% Terbayar</th>
          </tr>
        </thead>
        <tbody>
          ${pivotData
            .map(
              (row) => `
            <tr>
              <td class="text-center">${row.no}</td>
              <td><b>${row.pivotKey}</b></td>
              <td class="text-right text-rose-600">${formatRupiah(row.belumBayar)}</td>
              <td class="text-right text-amber-600">${formatRupiah(row.belumLunas)}</td>
              <td class="text-right text-emerald-600">${formatRupiah(row.lunas)}</td>
              <td class="text-right">${formatRupiah(row.dispensasi)}</td>
              <td class="text-right font-semibold">${formatRupiah(row.totalTagihan)}</td>
              <td class="text-right font-semibold text-emerald-700">${formatRupiah(row.totalTerbayar)}</td>
              <td class="text-right font-semibold text-rose-700">${formatRupiah(row.sisaPiutang)}</td>
              <td class="text-center">
                <span class="badge ${row.persentaseTerbayar >= 70 ? "badge-success" : "badge-warning"}">
                  ${row.persentaseTerbayar}%
                </span>
              </td>
            </tr>
          `,
            )
            .join("")}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" class="text-center"><b>TOTAL KESELURUHAN</b></td>
            <td class="text-right text-rose-600"><b>${formatRupiah(totalBelumBayar)}</b></td>
            <td class="text-right text-amber-600"><b>${formatRupiah(totalBelumLunas)}</b></td>
            <td class="text-right text-emerald-600"><b>${formatRupiah(totalLunas)}</b></td>
            <td class="text-right"><b>${formatRupiah(totalDispensasi)}</b></td>
            <td class="text-right"><b>${formatRupiah(totalTagihan)}</b></td>
            <td class="text-right text-emerald-700"><b>${formatRupiah(totalTerbayar)}</b></td>
            <td class="text-right text-rose-700"><b>${formatRupiah(totalSisa)}</b></td>
            <td class="text-center"><b>${overallPct}%</b></td>
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

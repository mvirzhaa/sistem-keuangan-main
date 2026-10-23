export interface PerwalianRowData {
  no: number;
  nim: string;
  nama: string;
  prodi: string;
  periodeSemester: string; // Periode / Semester
  statusSemester: string;
  sks: number;
  jenisTagihan: string;
  idTagihan: string;
  bulanTagihan: string;
  nominalTagihan: number;
  denda: number;
  potongan: number;
  totalTagihan: number;
  totalBayar: number;
  sisaTagihan: number;
  status: string;
}

export interface GenerateTagihanPerwalianHtmlParams {
  useKop: boolean;
  periodePerwalian: string;
  selectedProdi: string;
  angkatan: string;
  statusSemester: string;
  statusTagihan: string;
  jenisTagihan: string;
  tampilkanKontak?: boolean;
  tampilkanDenda?: string;
  reportData: PerwalianRowData[];
  formatRupiah: (num: number) => string;
}

export function generateTagihanPerwalianHtml(
  params: GenerateTagihanPerwalianHtmlParams,
): string {
  const {
    useKop,
    periodePerwalian,
    selectedProdi,
    angkatan,
    statusSemester,
    statusTagihan,
    jenisTagihan,
    reportData,
    formatRupiah,
  } = params;

  const totalNominal = reportData.reduce((acc, curr) => acc + curr.nominalTagihan, 0);
  const totalDenda = reportData.reduce((acc, curr) => acc + curr.denda, 0);
  const totalPotongan = reportData.reduce((acc, curr) => acc + curr.potongan, 0);
  const totalTagihan = reportData.reduce((acc, curr) => acc + curr.totalTagihan, 0);
  const totalBayar = reportData.reduce((acc, curr) => acc + curr.totalBayar, 0);
  const totalSisa = reportData.reduce(
    (acc, curr) => acc + curr.sisaTagihan,
    0,
  );

  return `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <title>Laporan Perwalian Tagihan - Universitas Ibn Khaldun Bogor</title>
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
        table.data-table th, table.data-table td { border: 1px solid #d1d5db; padding: 7px 8px; text-align: left; }
        table.data-table th { background-color: #1e3a8a; color: white; font-weight: 600; text-align: center; font-size: 11px; }
        table.data-table tr:nth-child(even) { background-color: #f9fafb; }
        table.data-table tfoot tr { background-color: #f3f4f6; font-weight: bold; }
        .text-right { text-align: right; }
        .text-center { text-align: center; }
        .font-mono { font-family: monospace; }
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
        <h3>LAPORAN PERWALIAN TAGIHAN ${periodePerwalian ? `PERIODE ${periodePerwalian.toUpperCase()}` : ""}</h3>
      </div>

      <table class="info-table">
        <tr>
          <td class="label">Periode Perwalian:</td>
          <td>${periodePerwalian || "Semua Periode"}</td>
          <td class="label">Program Studi:</td>
          <td>${selectedProdi || "Universitas Ibn Khaldun"}</td>
        </tr>
        <tr>
          <td class="label">Angkatan:</td>
          <td>${angkatan || "Semua Angkatan"}</td>
          <td class="label">Status Semester:</td>
          <td>${statusSemester || "Semua Status"}</td>
        </tr>
        <tr>
          <td class="label">Status Tagihan:</td>
          <td>${statusTagihan || "Semua Status"}</td>
          <td class="label">Jenis Tagihan:</td>
          <td>${jenisTagihan || "Semua Jenis Tagihan"}</td>
        </tr>
      </table>

      <table class="data-table">
        <thead>
          <tr>
            <th width="35">No.</th>
            <th>NIM</th>
            <th>Nama</th>
            <th>Program Studi</th>
            <th>Periode / Semester</th>
            <th class="text-center">Status Semester</th>
            <th class="text-center">SKS</th>
            <th>Jenis Tagihan</th>
            <th>ID Tagihan</th>
            <th>Bulan Tagihan</th>
            <th class="text-right">Nominal Tagihan</th>
            <th class="text-right">Denda</th>
            <th class="text-right">Potongan</th>
            <th class="text-right">Total Tagihan</th>
            <th class="text-right">Total Bayar</th>
            <th class="text-right">Sisa Tagihan</th>
            <th class="text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          ${reportData
            .map(
              (row) => `
            <tr>
              <td class="text-center">${row.no}</td>
              <td class="text-center font-mono">${row.nim}</td>
              <td><b>${row.nama}</b></td>
              <td>${row.prodi}</td>
              <td class="text-center">${row.periodeSemester}</td>
              <td class="text-center">${row.statusSemester}</td>
              <td class="text-center font-mono">${row.sks}</td>
              <td>${row.jenisTagihan}</td>
              <td class="text-center font-mono">${row.idTagihan}</td>
              <td class="text-center">${row.bulanTagihan}</td>
              <td class="text-right font-mono">${formatRupiah(row.nominalTagihan)}</td>
              <td class="text-right font-mono">${formatRupiah(row.denda)}</td>
              <td class="text-right font-mono">${formatRupiah(row.potongan)}</td>
              <td class="text-right font-mono font-semibold">${formatRupiah(row.totalTagihan)}</td>
              <td class="text-right font-mono text-emerald-700">${formatRupiah(row.totalBayar)}</td>
              <td class="text-right font-mono font-bold text-rose-700">${formatRupiah(row.sisaTagihan)}</td>
              <td class="text-center">
                <span class="badge ${row.status === "Lunas" ? "badge-lunas" : "badge-belum"}">
                  ${row.status}
                </span>
              </td>
            </tr>
          `,
            )
            .join("")}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="10" class="text-center"><b>TOTAL</b></td>
            <td class="text-right"><b>${formatRupiah(totalNominal)}</b></td>
            <td class="text-right"><b>${formatRupiah(totalDenda)}</b></td>
            <td class="text-right"><b>${formatRupiah(totalPotongan)}</b></td>
            <td class="text-right"><b>${formatRupiah(totalTagihan)}</b></td>
            <td class="text-right text-emerald-700"><b>${formatRupiah(totalBayar)}</b></td>
            <td class="text-right text-rose-700"><b>${formatRupiah(totalSisa)}</b></td>
            <td></td>
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

export interface PerwalianRowData {
  no: number;
  nim: string;
  nama: string;
  prodi: string;
  angkatan: string;
  statusSemester: string;
  jenisTagihan: string;
  jatuhTempo: string;
  nominal: number;
  sisaTagihan: number;
  status: string;
  kontak?: string;
  denda?: number;
}

export interface GenerateTagihanPerwalianHtmlParams {
  useKop: boolean;
  periodePerwalian: string;
  selectedProdi: string;
  angkatan: string;
  statusSemester: string;
  statusTagihan: string;
  jenisTagihan: string;
  tampilkanKontak: boolean;
  tampilkanDenda: string;
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
    tampilkanKontak,
    tampilkanDenda,
    reportData,
    formatRupiah,
  } = params;

  const totalNominal = reportData.reduce((acc, curr) => acc + curr.nominal, 0);
  const totalSisa = reportData.reduce(
    (acc, curr) => acc + curr.sisaTagihan,
    0,
  );
  const totalDenda = reportData.reduce(
    (acc, curr) => acc + (curr.denda || 0),
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
          <h2>UNIVERSITAS IBN KHALDUN BOGOR</h2>
          <h1>SISTEM INFORMASI KEUANGAN</h1>
          <p>Jl. KH. Sholeh Iskandar KM.2, Kedung Badak, Tanah Sereal, Kota Bogor, Jawa Barat 16162</p>
          <p>Telepon: (0251) 8356884 | Email: info@uika-bogor.ac.id</p>
        </div>
      `
          : ""
      }
      <div style="text-align: center; margin: 20px 0;">
        <h3 style="margin: 0; text-transform: uppercase; letter-spacing: 1px; color: #1e3a8a;">Laporan Perwalian Tagihan</h3>
        <p style="margin: 5px 0 0 0; font-size: 12px; color: #6b7280;">Tanggal Cetak: ${new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</p>
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
            <th width="35">No</th>
            <th>NIM</th>
            <th>Nama Mahasiswa</th>
            <th>Program Studi</th>
            <th class="text-center">Angkatan</th>
            <th class="text-center">Status Smt</th>
            <th>Jenis Tagihan</th>
            <th class="text-center">Jatuh Tempo</th>
            ${tampilkanKontak ? `<th>Kontak</th>` : ""}
            <th class="text-right">Nominal Tagihan</th>
            ${tampilkanDenda !== "Tidak" ? `<th class="text-right">Denda</th>` : ""}
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
              <td class="text-center">${row.nim}</td>
              <td><b>${row.nama}</b></td>
              <td>${row.prodi}</td>
              <td class="text-center">${row.angkatan}</td>
              <td class="text-center">${row.statusSemester}</td>
              <td>${row.jenisTagihan}</td>
              <td class="text-center">${row.jatuhTempo}</td>
              ${tampilkanKontak ? `<td>${row.kontak || "-"}</td>` : ""}
              <td class="text-right">${formatRupiah(row.nominal)}</td>
              ${tampilkanDenda !== "Tidak" ? `<td class="text-right">${formatRupiah(row.denda || 0)}</td>` : ""}
              <td class="text-right font-semibold">${formatRupiah(row.sisaTagihan)}</td>
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
            <td colspan="${tampilkanKontak ? 9 : 8}" class="text-center"><b>TOTAL</b></td>
            <td class="text-right"><b>${formatRupiah(totalNominal)}</b></td>
            ${tampilkanDenda !== "Tidak" ? `<td class="text-right"><b>${formatRupiah(totalDenda)}</b></td>` : ""}
            <td class="text-right text-red-600"><b>${formatRupiah(totalSisa)}</b></td>
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

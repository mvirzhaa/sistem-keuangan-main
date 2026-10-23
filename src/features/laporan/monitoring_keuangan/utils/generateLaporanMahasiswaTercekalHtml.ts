export interface LaporanMahasiswaTercekalRowData {
  no: number;
  nim: string;
  nama: string;
  prodi: string;
  aturanAkademik: string;
  alasanTercekal: string;
  tunggakan: number;
  status: string;
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
  .badge-danger { background-color: #fee2e2; color: #991b1b; }
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

export function generateLaporanMahasiswaTercekalHtml(params: {
  useKop: boolean;
  unitKerja: string;
  periodeAkademik: string;
  aturanAkademik: string;
  periodeMasuk: string;
  statusSemester: string;
  data: LaporanMahasiswaTercekalRowData[];
  formatRupiah: (num: number) => string;
}): string {
  const {
    useKop,
    unitKerja,
    periodeAkademik,
    aturanAkademik,
    periodeMasuk,
    statusSemester,
    data,
    formatRupiah,
  } = params;

  const totalTunggakan = data.reduce((acc, curr) => acc + curr.tunggakan, 0);

  return `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <title>Laporan Mahasiswa Tercekal Aturan Akademik - UIKA Bogor</title>
      <style>${commonStyles}</style>
    </head>
    <body>
      ${printButtonHtml}
      ${useKop ? kopHtml : ""}
      
      <div class="report-title">
        <h3>LAPORAN MAHASISWA TERCEKAL ATURAN AKADEMIK</h3>
      </div>

      <table class="info-table">
        <tr>
          <td class="label">Unit Kerja:</td>
          <td>${unitKerja}</td>
          <td class="label">Aturan Akademik:</td>
          <td>${aturanAkademik}</td>
        </tr>
        <tr>
          <td class="label">Periode Akademik:</td>
          <td>${periodeAkademik}</td>
          <td class="label">Periode Masuk:</td>
          <td>${periodeMasuk || "Semua"}</td>
        </tr>
        <tr>
          <td class="label">Status Semester:</td>
          <td>${statusSemester || "Semua"}</td>
          <td class="label">Total Mahasiswa Tercekal:</td>
          <td>${data.length} Orang</td>
        </tr>
      </table>

      <table class="data-table">
        <thead>
          <tr>
            <th style="width: 40px;">No</th>
            <th>NIM</th>
            <th>Nama Mahasiswa</th>
            <th>Program Studi</th>
            <th>Aturan Akademik</th>
            <th>Alasan Tercekal</th>
            <th class="text-right">Tunggakan Tagihan</th>
            <th class="text-center">Status</th>
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
                  <td>${row.nim}</td>
                  <td style="font-weight: 500;">${row.nama}</td>
                  <td>${row.prodi}</td>
                  <td>${row.aturanAkademik}</td>
                  <td>${row.alasanTercekal}</td>
                  <td class="text-right" style="font-weight: 600; color: #b91c1c;">${formatRupiah(row.tunggakan)}</td>
                  <td class="text-center"><span class="badge badge-danger">${row.status}</span></td>
                </tr>
              `
                  )
                  .join("")
              : `<tr><td colspan="8" class="text-center" style="padding: 20px;">Tidak ada data mahasiswa tercekal yang sesuai.</td></tr>`
          }
        </tbody>
        <tfoot>
          <tr>
            <td colspan="6" class="text-center">TOTAL TUNGGAKAN (${data.length} MAHASISWA TERCEKAL)</td>
            <td class="text-right" style="color: #b91c1c;">${formatRupiah(totalTunggakan)}</td>
            <td></td>
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

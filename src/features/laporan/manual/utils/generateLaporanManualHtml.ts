export interface LaporanManualRowData {
  no: number;
  nim: string;
  nama: string;
  prodi: string;
  periodeMasuk: string;
  jalur: string;
  gelombang: string;
  sistemKuliah: string;
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
  .badge-success { background-color: #d1fae5; color: #065f46; }
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

export function generateLaporanManualHtml(params: {
  useKop: boolean;
  namaLaporan: string;
  periodeMasuk: string;
  programStudi: string;
  gelombang: string;
  jalur: string;
  sistemKuliah: string;
  data: LaporanManualRowData[];
}): string {
  const {
    useKop,
    namaLaporan,
    periodeMasuk,
    programStudi,
    gelombang,
    jalur,
    sistemKuliah,
    data,
  } = params;

  return `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <title>${namaLaporan} - UIKA Bogor</title>
      <style>${commonStyles}</style>
    </head>
    <body>
      ${printButtonHtml}
      ${useKop ? kopHtml : ""}
      
      <div class="report-title">
        <h3>${namaLaporan.toUpperCase()}</h3>
      </div>

      <table class="info-table">
        <tr>
          <td class="label">Periode Masuk:</td>
          <td>${periodeMasuk || "Semua"}</td>
          <td class="label">Gelombang:</td>
          <td>${gelombang || "Semua"}</td>
        </tr>
        <tr>
          <td class="label">Program Studi:</td>
          <td>${programStudi || "Semua Program Studi"}</td>
          <td class="label">Jalur Pendaftaran:</td>
          <td>${jalur || "Semua"}</td>
        </tr>
        <tr>
          <td class="label">Sistem Kuliah:</td>
          <td>${sistemKuliah || "Semua"}</td>
          <td class="label">Total Mahasiswa:</td>
          <td>${data.length} Orang</td>
        </tr>
      </table>

      <table class="data-table">
        <thead>
          <tr>
            <th style="width: 40px;" class="text-center">NO.</th>
            <th>Nama</th>
            <th class="text-center">Nim</th>
            <th>Prodi</th>
            <th class="text-center">Periode Masuk</th>
            <th class="text-center">Gelombang</th>
            <th>Jalur Pendaftaran</th>
            <th class="text-center">Sistem Kuliah</th>
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
                  <td style="font-weight: 500;">${row.nama}</td>
                  <td class="text-center font-mono">${row.nim}</td>
                  <td>${row.prodi}</td>
                  <td class="text-center font-medium">${row.periodeMasuk}</td>
                  <td class="text-center">${row.gelombang}</td>
                  <td>${row.jalur}</td>
                  <td class="text-center">${row.sistemKuliah}</td>
                </tr>
              `
                  )
                  .join("")
              : `<tr><td colspan="8" class="text-center" style="padding: 20px;">Tidak ada data yang sesuai filter.</td></tr>`
          }
        </tbody>
        <tfoot>
          <tr>
            <td colspan="8" class="text-center">TOTAL KESELURUHAN: ${data.length} MAHASISWA</td>
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

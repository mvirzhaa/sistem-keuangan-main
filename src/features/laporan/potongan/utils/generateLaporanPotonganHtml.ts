export interface LaporanPenerimaPotonganRowData {
  no: number;
  nim: string;
  nama: string;
  prodi: string;
  sumber: string;
  potongan: string;
  nominal: number;
  persentase: number | string;
  digunakan: number | string;
  // compatibility:
  jenisPotongan?: string;
  namaPotongan?: string;
  nominalPotongan?: number;
  status?: string;
}

export interface RekapPotonganBeasiswaRowData {
  no: number;
  namaPotongan: string;
  rekanan: string;
  periodeAwal: string;
  periodeAkhir: string;
  nominal: number;
  persentase: number | string;
  anggaran: number;
  digunakan: number | string;
  // compatibility:
  jenis?: string;
  jumlahPenerima?: number;
  totalNominal?: number;
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

// 1. Generate HTML Laporan Penerima Potongan
export function generateLaporanPenerimaPotonganHtml(params: {
  useKop: boolean;
  tahunAkademik: string;
  programStudi: string;
  jenisPotongan: string;
  namaPotongan: string;
  penerima: string;
  data: LaporanPenerimaPotonganRowData[];
  formatRupiah: (num: number) => string;
}): string {
  const {
    useKop,
    tahunAkademik,
    programStudi,
    jenisPotongan,
    namaPotongan,
    penerima,
    data,
    formatRupiah,
  } = params;

  const totalNominal = data.reduce(
    (acc, curr) => acc + (curr.nominal ?? curr.nominalPotongan ?? 0),
    0
  );

  return `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <title>Laporan Penerima Potongan - UIKA Bogor</title>
      <style>${commonStyles}</style>
    </head>
    <body>
      ${printButtonHtml}
      ${useKop ? kopHtml : ""}
      
      <div class="report-title">
        <h3>LAPORAN PENERIMA POTONGAN</h3>
      </div>

      <table class="info-table">
        <tr>
          <td class="label">Tahun Akademik:</td>
          <td>${tahunAkademik}</td>
          <td class="label">Jenis Potongan:</td>
          <td>${jenisPotongan}</td>
        </tr>
        <tr>
          <td class="label">Program Studi:</td>
          <td>${programStudi}</td>
          <td class="label">Nama Potongan:</td>
          <td>${namaPotongan || "Semua Potongan"}</td>
        </tr>
        <tr>
          <td class="label">Penerima:</td>
          <td>${penerima}</td>
          <td class="label">Total Penerima:</td>
          <td>${data.length} Orang</td>
        </tr>
      </table>

      <table class="data-table">
        <thead>
          <tr>
            <th style="width: 40px;" class="text-center">No.</th>
            <th class="text-center">NIM</th>
            <th>Nama</th>
            <th>Program Studi</th>
            <th>Sumber</th>
            <th>Potongan</th>
            <th class="text-right">Nominal</th>
            <th class="text-center">Persentase</th>
            <th class="text-center">Digunakan</th>
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
                  <td class="text-center font-mono">${row.nim}</td>
                  <td style="font-weight: 500;">${row.nama}</td>
                  <td>${row.prodi}</td>
                  <td>${row.sumber || row.jenisPotongan || "-"}</td>
                  <td>${row.potongan || row.namaPotongan || "-"}</td>
                  <td class="text-right font-mono" style="font-weight: 600; color: #1e3a8a;">${formatRupiah(row.nominal ?? row.nominalPotongan ?? 0)}</td>
                  <td class="text-center font-mono">${row.persentase ? (typeof row.persentase === "number" ? `${row.persentase}%` : row.persentase) : "-"}</td>
                  <td class="text-center">
                    <span class="badge ${
                      row.digunakan === "Ya" || row.status === "Aktif" || row.status === "Disetujui"
                        ? "badge-success"
                        : "badge-primary"
                    }">
                      ${row.digunakan || row.status || "Ya"}
                    </span>
                  </td>
                </tr>
              `
                  )
                  .join("")
              : `<tr><td colspan="9" class="text-center" style="padding: 20px;">Tidak ada data penerima potongan yang sesuai.</td></tr>`
          }
        </tbody>
        <tfoot>
          <tr>
            <td colspan="6" class="text-center">TOTAL KESELURUHAN (${data.length} PENERIMA)</td>
            <td class="text-right font-mono" style="color: #1e3a8a;">${formatRupiah(totalNominal)}</td>
            <td></td>
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

// 2. Generate HTML Rekap Potongan / Beasiswa
export function generateRekapPotonganBeasiswaHtml(params: {
  useKop: boolean;
  jenisPotongan: string;
  rekanan: string;
  periodeAwal: string;
  periodeAkhir: string;
  data: RekapPotonganBeasiswaRowData[];
  formatRupiah: (num: number) => string;
}): string {
  const {
    useKop,
    jenisPotongan,
    rekanan,
    periodeAwal,
    periodeAkhir,
    data,
    formatRupiah,
  } = params;

  const totalNominal = data.reduce(
    (acc, curr) => acc + (curr.nominal ?? curr.totalNominal ?? 0),
    0
  );
  const totalAnggaran = data.reduce(
    (acc, curr) => acc + (typeof curr.anggaran === "number" ? curr.anggaran : 0),
    0
  );
  const totalDigunakan = data.reduce(
    (acc, curr) => acc + (typeof curr.digunakan === "number" ? curr.digunakan : 0),
    0
  );

  return `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <title>Rekap Potongan / Beasiswa - UIKA Bogor</title>
      <style>${commonStyles}</style>
    </head>
    <body>
      ${printButtonHtml}
      ${useKop ? kopHtml : ""}
      
      <div class="report-title">
        <h3>REKAP POTONGAN / BEASISWA</h3>
      </div>

      <table class="info-table">
        <tr>
          <td class="label">Jenis Potongan:</td>
          <td>${jenisPotongan}</td>
          <td class="label">Rekanan / Mitra:</td>
          <td>${rekanan || "Semua Rekanan"}</td>
        </tr>
        <tr>
          <td class="label">Periode:</td>
          <td>${periodeAwal || "Semua"} s/d ${periodeAkhir || "Semua"}</td>
          <td class="label">Total Skema:</td>
          <td>${data.length} Program</td>
        </tr>
      </table>

      <table class="data-table">
        <thead>
          <tr>
            <th style="width: 40px;" class="text-center">No.</th>
            <th>Nama Potongan</th>
            <th>Rekanan</th>
            <th class="text-center">Periode Awal</th>
            <th class="text-center">Periode Akhir</th>
            <th class="text-right">Nominal</th>
            <th class="text-center">Persentase</th>
            <th class="text-right">Anggaran</th>
            <th class="text-center">Digunakan</th>
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
                  <td style="font-weight: 500;">${row.namaPotongan}</td>
                  <td>${row.rekanan}</td>
                  <td class="text-center font-mono">${row.periodeAwal || "-"}</td>
                  <td class="text-center font-mono">${row.periodeAkhir || "-"}</td>
                  <td class="text-right font-mono" style="font-weight: 600; color: #1e3a8a;">${formatRupiah(row.nominal ?? row.totalNominal ?? 0)}</td>
                  <td class="text-center font-mono">${row.persentase ? (typeof row.persentase === "number" ? `${row.persentase}%` : row.persentase) : "-"}</td>
                  <td class="text-right font-mono" style="font-weight: 600; color: #047857;">${row.anggaran ? formatRupiah(row.anggaran) : "-"}</td>
                  <td class="text-center font-mono">${typeof row.digunakan === "number" ? formatRupiah(row.digunakan) : (row.digunakan || `${row.jumlahPenerima || 0} Orang`)}</td>
                </tr>
              `
                  )
                  .join("")
              : `<tr><td colspan="9" class="text-center" style="padding: 20px;">Tidak ada data rekap potongan yang sesuai.</td></tr>`
          }
        </tbody>
        <tfoot>
          <tr>
            <td colspan="5" class="text-center">TOTAL KESELURUHAN REKAP</td>
            <td class="text-right font-mono" style="color: #1e3a8a; font-weight: bold;">${formatRupiah(totalNominal)}</td>
            <td></td>
            <td class="text-right font-mono" style="color: #047857; font-weight: bold;">${totalAnggaran > 0 ? formatRupiah(totalAnggaran) : "-"}</td>
            <td class="text-center font-mono" style="font-weight: bold;">${totalDigunakan > 0 ? formatRupiah(totalDigunakan) : "-"}</td>
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

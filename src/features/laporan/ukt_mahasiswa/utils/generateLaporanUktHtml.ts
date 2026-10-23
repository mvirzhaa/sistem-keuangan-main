export interface LaporanPenerimaUktRowData {
  no: number;
  nim: string;
  nama: string;
  prodi: string;
  kelompokUkt: string;
  nominalUkt: number;
  valid: string;
  // compatibility:
  tarifNominal?: number;
  status?: string;
  jalurPendaftaran?: string;
  sistemKuliah?: string;
}

export interface LaporanTarifUktRowData {
  no: number;
  prodi: string;
  gelombang: string;
  jalurPendaftaran: string;
  sistemKuliah: string;
  kelompokUkt: string;
  nominalTarif: number;
  kuota: number | string;
  // compatibility:
  besaranTarif?: number;
}

export interface LaporanTarifTagihanRowData {
  no: number;
  prodi: string;
  gelombang: string;
  jalurPendaftaran: string;
  sistemKuliah: string;
  jenisAkun: string;
  nominalTarif: number;
  jmlCicilan: number | string;
  semester: string;
  // compatibility:
  jenisTagihan?: string;
  frekuensi?: string;
  besaranTarif?: number;
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

// 1. Generate HTML Laporan Penerima UKT (7 Kolom sesuai Gambar 1)
export function generateLaporanPenerimaUktHtml(params: {
  useKop: boolean;
  tahunAkademik: string;
  programStudi: string;
  kelompokUkt: string;
  sistemKuliah: string;
  jalurPendaftaran: string;
  gelombang: string;
  penerima: string;
  data: LaporanPenerimaUktRowData[];
  formatRupiah: (num: number) => string;
}): string {
  const {
    useKop,
    tahunAkademik,
    programStudi,
    kelompokUkt,
    sistemKuliah,
    jalurPendaftaran,
    gelombang,
    penerima,
    data,
    formatRupiah,
  } = params;

  const totalTarif = data.reduce(
    (acc, curr) => acc + (curr.nominalUkt || curr.tarifNominal || 0),
    0
  );

  return `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <title>Laporan Penerima UKT - UIKA Bogor</title>
      <style>${commonStyles}</style>
    </head>
    <body>
      ${printButtonHtml}
      ${useKop ? kopHtml : ""}
      
      <div class="report-title">
        <h3>LAPORAN PENERIMA UKT</h3>
      </div>

      <table class="info-table">
        <tr>
          <td class="label">Tahun Akademik:</td>
          <td>${tahunAkademik}</td>
          <td class="label">Kelompok UKT:</td>
          <td>${kelompokUkt || "Semua Kelompok"}</td>
        </tr>
        <tr>
          <td class="label">Program Studi:</td>
          <td>${programStudi}</td>
          <td class="label">Sistem Kuliah:</td>
          <td>${sistemKuliah || "Semua Sistem"}</td>
        </tr>
        <tr>
          <td class="label">Jalur Pendaftaran:</td>
          <td>${jalurPendaftaran || "Semua Jalur"}</td>
          <td class="label">Gelombang:</td>
          <td>${gelombang || "Semua Gelombang"}</td>
        </tr>
        <tr>
          <td class="label">Penerima:</td>
          <td>${penerima}</td>
          <td class="label">Total Mahasiswa:</td>
          <td>${data.length} Orang</td>
        </tr>
      </table>

      <table class="data-table">
        <thead>
          <tr>
            <th style="width: 45px;" class="text-center">No.</th>
            <th style="width: 120px;" class="text-center">NIM</th>
            <th>Nama</th>
            <th>Program Studi</th>
            <th class="text-center">Kelompok UKT</th>
            <th class="text-right" style="width: 150px;">Nominal UKT</th>
            <th class="text-center" style="width: 80px;">Valid?</th>
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
                  <td class="text-center font-bold">${row.kelompokUkt}</td>
                  <td class="text-right font-mono" style="font-weight: 600; color: #1e3a8a;">${formatRupiah(row.nominalUkt || row.tarifNominal || 0)}</td>
                  <td class="text-center">
                    <span class="badge ${row.valid === "Ya" || row.valid === "Valid" ? "badge-success" : "badge-primary"}">
                      ${row.valid || "Ya"}
                    </span>
                  </td>
                </tr>
              `
                  )
                  .join("")
              : `<tr><td colspan="7" class="text-center" style="padding: 20px;">Tidak ada data penerima UKT yang ditemukan.</td></tr>`
          }
        </tbody>
        <tfoot>
          <tr>
            <td colspan="5" class="text-center">TOTAL KESELURUHAN (${data.length} MAHASISWA)</td>
            <td class="text-right font-mono" style="color: #1e3a8a;">${formatRupiah(totalTarif)}</td>
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

// 2. Generate HTML Laporan Tarif UKT (8 Kolom sesuai Gambar 2)
export function generateLaporanTarifUktHtml(params: {
  useKop: boolean;
  tahunAkademik: string;
  programStudi: string;
  kelompokUkt: string;
  sistemKuliah: string;
  jalurPendaftaran: string;
  gelombang: string;
  data: LaporanTarifUktRowData[];
  formatRupiah: (num: number) => string;
}): string {
  const {
    useKop,
    tahunAkademik,
    programStudi,
    kelompokUkt,
    sistemKuliah,
    jalurPendaftaran,
    gelombang,
    data,
    formatRupiah,
  } = params;

  const totalTarif = data.reduce(
    (acc, curr) => acc + (curr.nominalTarif || curr.besaranTarif || 0),
    0
  );

  return `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <title>Laporan Tarif UKT - UIKA Bogor</title>
      <style>${commonStyles}</style>
    </head>
    <body>
      ${printButtonHtml}
      ${useKop ? kopHtml : ""}
      
      <div class="report-title">
        <h3>LAPORAN TARIF UKT</h3>
      </div>

      <table class="info-table">
        <tr>
          <td class="label">Tahun Akademik:</td>
          <td>${tahunAkademik}</td>
          <td class="label">Kelompok UKT:</td>
          <td>${kelompokUkt || "Semua Kelompok"}</td>
        </tr>
        <tr>
          <td class="label">Program Studi:</td>
          <td>${programStudi}</td>
          <td class="label">Sistem Kuliah:</td>
          <td>${sistemKuliah || "Semua Sistem"}</td>
        </tr>
        <tr>
          <td class="label">Jalur Pendaftaran:</td>
          <td>${jalurPendaftaran || "Semua Jalur"}</td>
          <td class="label">Gelombang:</td>
          <td>${gelombang || "Semua Gelombang"}</td>
        </tr>
      </table>

      <table class="data-table">
        <thead>
          <tr>
            <th style="width: 45px;" class="text-center">No.</th>
            <th>Program Studi</th>
            <th class="text-center">Gelombang</th>
            <th>Jalur Pendaftaran</th>
            <th class="text-center">Sistem Kuliah</th>
            <th class="text-center">Kelompok UKT</th>
            <th class="text-right" style="width: 150px;">Nominal Tarif</th>
            <th class="text-center" style="width: 80px;">kuota</th>
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
                  <td class="text-center">${row.gelombang}</td>
                  <td>${row.jalurPendaftaran}</td>
                  <td class="text-center">${row.sistemKuliah}</td>
                  <td class="text-center font-bold">${row.kelompokUkt}</td>
                  <td class="text-right font-mono" style="font-weight: 600; color: #1e3a8a;">${formatRupiah(row.nominalTarif || row.besaranTarif || 0)}</td>
                  <td class="text-center font-mono">${row.kuota ?? "-"}</td>
                </tr>
              `
                  )
                  .join("")
              : `<tr><td colspan="8" class="text-center" style="padding: 20px;">Tidak ada data tarif UKT yang sesuai.</td></tr>`
          }
        </tbody>
        <tfoot>
          <tr>
            <td colspan="6" class="text-center">TOTAL BESARAN TARIF (${data.length} TARIF)</td>
            <td class="text-right font-mono" style="color: #1e3a8a;">${formatRupiah(totalTarif)}</td>
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

// 3. Generate HTML Laporan Tarif Tagihan (9 Kolom sesuai Gambar 3)
export function generateLaporanTarifTagihanHtml(params: {
  useKop: boolean;
  tahunAkademik: string;
  programStudi: string;
  sistemKuliah: string;
  jalurPendaftaran: string;
  gelombang: string;
  jenisTagihan?: string;
  data: LaporanTarifTagihanRowData[];
  formatRupiah: (num: number) => string;
}): string {
  const {
    useKop,
    tahunAkademik,
    programStudi,
    sistemKuliah,
    jalurPendaftaran,
    gelombang,
    jenisTagihan,
    data,
    formatRupiah,
  } = params;

  const totalTarif = data.reduce(
    (acc, curr) => acc + (curr.nominalTarif || curr.besaranTarif || 0),
    0
  );

  return `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <title>Laporan Tarif Tagihan - UIKA Bogor</title>
      <style>${commonStyles}</style>
    </head>
    <body>
      ${printButtonHtml}
      ${useKop ? kopHtml : ""}
      
      <div class="report-title">
        <h3>LAPORAN TARIF TAGIHAN</h3>
      </div>

      <table class="info-table">
        <tr>
          <td class="label">Tahun Akademik:</td>
          <td>${tahunAkademik}</td>
          <td class="label">Sistem Kuliah:</td>
          <td>${sistemKuliah || "Semua Sistem"}</td>
        </tr>
        <tr>
          <td class="label">Program Studi:</td>
          <td>${programStudi}</td>
          <td class="label">Jalur Pendaftaran:</td>
          <td>${jalurPendaftaran || "Semua Jalur"}</td>
        </tr>
        <tr>
          <td class="label">Jenis Tagihan:</td>
          <td>${jenisTagihan || "Semua Tagihan"}</td>
          <td class="label">Gelombang:</td>
          <td>${gelombang || "Semua Gelombang"}</td>
        </tr>
      </table>

      <table class="data-table">
        <thead>
          <tr>
            <th style="width: 45px;" class="text-center">No.</th>
            <th>Program Studi</th>
            <th class="text-center">Gelombang</th>
            <th>Jalur Pendaftaran</th>
            <th class="text-center">Sistem Kuliah</th>
            <th>Jenis Akun</th>
            <th class="text-right" style="width: 150px;">Nominal Tarif</th>
            <th class="text-center" style="width: 100px;">Jml. Cicilan</th>
            <th class="text-center" style="width: 90px;">Semester</th>
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
                  <td class="text-center">${row.gelombang}</td>
                  <td>${row.jalurPendaftaran}</td>
                  <td class="text-center">${row.sistemKuliah}</td>
                  <td>${row.jenisAkun || row.jenisTagihan || "-"}</td>
                  <td class="text-right font-mono" style="font-weight: 600; color: #1e3a8a;">${formatRupiah(row.nominalTarif || row.besaranTarif || 0)}</td>
                  <td class="text-center font-mono">${row.jmlCicilan ?? 1}</td>
                  <td class="text-center">${row.semester || "-"}</td>
                </tr>
              `
                  )
                  .join("")
              : `<tr><td colspan="9" class="text-center" style="padding: 20px;">Tidak ada data tarif tagihan yang sesuai.</td></tr>`
          }
        </tbody>
        <tfoot>
          <tr>
            <td colspan="6" class="text-center">TOTAL BESARAN TARIF (${data.length} TARIF)</td>
            <td class="text-right font-mono" style="color: #1e3a8a;">${formatRupiah(totalTarif)}</td>
            <td colspan="2"></td>
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

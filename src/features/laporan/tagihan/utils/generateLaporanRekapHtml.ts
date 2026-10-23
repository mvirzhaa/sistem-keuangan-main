export interface RekapRowData {
  no: number;
  kodeProdi: string;
  prodi: string;
  jenisTagihan: string;
  nominal: number; // Tagihan
  potongan: number;
  denda: number;
  totalTagihan: number;
  bayar: number; // Pembayaran
  sisa: number; // Sisa Tagihan
  jumlahTagihan: number; // Jumlah Tagihan
  jumlahLunas: number; // Jumlah Lunas
}

export interface GenerateLaporanRekapHtmlParams {
  useKop: boolean;
  tahunAkademik: string;
  selectedProdi: string;
  selectedJenisTagihan: string;
  tglCutOff: string;
  periodeMasuk: string;
  jalurPendaftaran: string;
  gelombang: string;
  sistemKuliah: string;
  selectedPenerima: string;
  rekapData: RekapRowData[];
  formatRupiah: (num: number) => string;
}

export function generateLaporanRekapHtml(
  params: GenerateLaporanRekapHtmlParams,
): string {
  const {
    useKop,
    tahunAkademik,
    selectedProdi,
    selectedJenisTagihan,
    tglCutOff,
    periodeMasuk,
    jalurPendaftaran,
    gelombang,
    sistemKuliah,
    selectedPenerima,
    rekapData,
    formatRupiah,
  } = params;

  // Hitung total keseluruhan
  const totalNominal = rekapData.reduce((acc, curr) => acc + curr.nominal, 0);
  const totalPotongan = rekapData.reduce((acc, curr) => acc + curr.potongan, 0);
  const totalDenda = rekapData.reduce((acc, curr) => acc + curr.denda, 0);
  const totalTagihan = rekapData.reduce((acc, curr) => acc + curr.totalTagihan, 0);
  const totalBayar = rekapData.reduce((acc, curr) => acc + curr.bayar, 0);
  const totalSisa = rekapData.reduce((acc, curr) => acc + curr.sisa, 0);
  const totalJumlahTagihan = rekapData.reduce(
    (acc, curr) => acc + curr.jumlahTagihan,
    0,
  );
  const totalJumlahLunas = rekapData.reduce(
    (acc, curr) => acc + curr.jumlahLunas,
    0,
  );

  return `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <title>Laporan Rekapitulasi Tagihan - Universitas Ibn Khaldun Bogor</title>
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
          Cetak Rekap
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
        <h3>REKAPITULASI TAGIHAN ${tahunAkademik ? `TAHUN AKADEMIK ${tahunAkademik.toUpperCase()}` : ""}</h3>
      </div>

      <table class="info-table">
        <tr>
          <td class="label">Tahun Akademik:</td>
          <td>${tahunAkademik || "Semua Tahun"}</td>
          <td class="label">Program Studi:</td>
          <td>${selectedProdi || "Universitas Ibn Khaldun"}</td>
        </tr>
        <tr>
          <td class="label">Jenis Tagihan:</td>
          <td>${selectedJenisTagihan || "Semua Jenis Tagihan"}</td>
          <td class="label">Penerima:</td>
          <td>${selectedPenerima || "Semua Penerima"}</td>
        </tr>
        <tr>
          <td class="label">Periode Masuk:</td>
          <td>${periodeMasuk || "Semua"}</td>
          <td class="label">Jalur Pendaftaran:</td>
          <td>${jalurPendaftaran || "Semua"}</td>
        </tr>
        <tr>
          <td class="label">Gelombang:</td>
          <td>${gelombang || "Semua"}</td>
          <td class="label">Sistem Kuliah:</td>
          <td>${sistemKuliah || "Semua"}</td>
        </tr>
        ${
          tglCutOff
            ? `
        <tr>
          <td class="label">Tgl. Cut Off:</td>
          <td colspan="3">${tglCutOff}</td>
        </tr>
        `
            : ""
        }
      </table>

      <table class="data-table">
        <thead>
          <tr>
            <th width="35">No.</th>
            <th>Kode Prodi</th>
            <th>Program Studi</th>
            <th>Jenis Tagihan</th>
            <th class="text-right">Tagihan</th>
            <th class="text-right">Potongan</th>
            <th class="text-right">Denda</th>
            <th class="text-right">Total Tagihan</th>
            <th class="text-right">Pembayaran</th>
            <th class="text-right">Sisa Tagihan</th>
            <th class="text-center">Jumlah Tagihan</th>
            <th class="text-center">Jumlah Lunas</th>
          </tr>
        </thead>
        <tbody>
          ${rekapData
            .map(
              (row) => `
            <tr>
              <td class="text-center">${row.no}</td>
              <td class="text-center font-mono">${row.kodeProdi}</td>
              <td><b>${row.prodi}</b></td>
              <td>${row.jenisTagihan}</td>
              <td class="text-right font-mono">${formatRupiah(row.nominal)}</td>
              <td class="text-right font-mono">${formatRupiah(row.potongan)}</td>
              <td class="text-right font-mono">${formatRupiah(row.denda)}</td>
              <td class="text-right font-mono font-semibold">${formatRupiah(row.totalTagihan)}</td>
              <td class="text-right font-mono text-emerald-700">${formatRupiah(row.bayar)}</td>
              <td class="text-right font-mono font-bold text-rose-700">${formatRupiah(row.sisa)}</td>
              <td class="text-center font-mono">${row.jumlahTagihan.toLocaleString("id-ID")}</td>
              <td class="text-center font-mono font-semibold text-emerald-700">${row.jumlahLunas.toLocaleString("id-ID")}</td>
            </tr>
          `,
            )
            .join("")}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="4" class="text-center"><b>TOTAL KESELURUHAN</b></td>
            <td class="text-right"><b>${formatRupiah(totalNominal)}</b></td>
            <td class="text-right"><b>${formatRupiah(totalPotongan)}</b></td>
            <td class="text-right"><b>${formatRupiah(totalDenda)}</b></td>
            <td class="text-right"><b>${formatRupiah(totalTagihan)}</b></td>
            <td class="text-right"><b>${formatRupiah(totalBayar)}</b></td>
            <td class="text-right text-rose-700"><b>${formatRupiah(totalSisa)}</b></td>
            <td class="text-center"><b>${totalJumlahTagihan.toLocaleString("id-ID")}</b></td>
            <td class="text-center"><b>${totalJumlahLunas.toLocaleString("id-ID")}</b></td>
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

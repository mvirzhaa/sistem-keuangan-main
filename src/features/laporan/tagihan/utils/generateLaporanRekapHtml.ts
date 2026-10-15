export interface RekapRowData {
  no: number;
  prodi: string;
  jenisTagihan: string;
  jumlahTagihan: number;
  nominalTagihan: number;
  potongan: number;
  terbayar: number;
  sisaPiutang: number;
  persentaseTerbayar: number;
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
  const totalTagihanCount = rekapData.reduce(
    (acc, curr) => acc + curr.jumlahTagihan,
    0,
  );
  const totalNominal = rekapData.reduce(
    (acc, curr) => acc + curr.nominalTagihan,
    0,
  );
  const totalPotongan = rekapData.reduce((acc, curr) => acc + curr.potongan, 0);
  const totalTerbayar = rekapData.reduce((acc, curr) => acc + curr.terbayar, 0);
  const totalSisa = rekapData.reduce((acc, curr) => acc + curr.sisaPiutang, 0);
  const overallPercentage =
    totalNominal > 0 ? ((totalTerbayar / totalNominal) * 100).toFixed(1) : "0";

  return `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <title>Laporan Rekap Tagihan - Universitas Ibn Khaldun Bogor</title>
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
          Cetak Rekap
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
        <h3 style="margin: 0; text-transform: uppercase; letter-spacing: 1px; color: #1e3a8a;">Laporan Rekapitulasi Tagihan</h3>
        <p style="margin: 5px 0 0 0; font-size: 12px; color: #6b7280;">Tanggal Cetak: ${new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</p>
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
            <th width="40">No</th>
            <th>Program Studi</th>
            <th>Jenis Tagihan</th>
            <th class="text-center">Jml Tagihan</th>
            <th class="text-right">Total Nominal</th>
            <th class="text-right">Total Potongan</th>
            <th class="text-right">Total Terbayar</th>
            <th class="text-right">Sisa Piutang</th>
            <th class="text-center">% Terbayar</th>
          </tr>
        </thead>
        <tbody>
          ${rekapData
            .map(
              (row) => `
            <tr>
              <td class="text-center">${row.no}</td>
              <td><b>${row.prodi}</b></td>
              <td>${row.jenisTagihan}</td>
              <td class="text-center">${row.jumlahTagihan.toLocaleString("id-ID")}</td>
              <td class="text-right">${formatRupiah(row.nominalTagihan)}</td>
              <td class="text-right">${formatRupiah(row.potongan)}</td>
              <td class="text-right">${formatRupiah(row.terbayar)}</td>
              <td class="text-right font-semibold">${formatRupiah(row.sisaPiutang)}</td>
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
            <td colspan="3" class="text-center"><b>TOTAL KESELURUHAN</b></td>
            <td class="text-center"><b>${totalTagihanCount.toLocaleString("id-ID")}</b></td>
            <td class="text-right"><b>${formatRupiah(totalNominal)}</b></td>
            <td class="text-right"><b>${formatRupiah(totalPotongan)}</b></td>
            <td class="text-right"><b>${formatRupiah(totalTerbayar)}</b></td>
            <td class="text-right text-red-600"><b>${formatRupiah(totalSisa)}</b></td>
            <td class="text-center"><b>${overallPercentage}%</b></td>
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

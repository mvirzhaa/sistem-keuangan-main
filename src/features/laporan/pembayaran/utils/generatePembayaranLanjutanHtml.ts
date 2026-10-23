export interface PembayaranPerMahasiswaRowData {
  no: number;
  nim: string;
  idPendaftar: string;
  nama: string;
  semesterAktif: string;
  prodi: string;
  pembayaran: string;
  tanggal: string;
  nominalTransaksi: number;
  kodeTagihan: string;
  jenisTagihan: string;
  cicilanKe: string | number;
  bulan: string;
  nominalDetail: number;
  batal: string;
  semesterTa: string;
  totalTagihan: number;
  totalPembayaran: number;
  // compatibility fields:
  periode?: string;
  kodePembayaran?: string;
  tanggalBayar?: string;
  kelompokUkt?: string;
  metodePembayaran?: string;
  channel?: string;
  nominal?: number;
  status?: string;
}

export interface DistribusiPembayaranRowData {
  no?: number;
  kodeFakultas: string;
  namaFakultas: string;
  sumberData: string;
  uangGedungTahap1: number;
  spp: number;
  heregistrasi: number;
  upm: number;
  ujianAkhirSemester: number;
  uktAfirmasiUika: number;
  praktikumRpl: number;
  praktikumJarkom: number;
  praktikumEmbedded: number;
  praktikumMetodeNumerik: number;
  praktikumAr: number;
  praktikumKnowledgeGraph: number;
  praktikumPengenalanPola: number;
  praktikumStrukturData: number;
  sks: number;
  // compatibility fields:
  label?: string;
  jumlahTransaksi?: number;
  totalNominal?: number;
  persentase?: number;
}

export interface DistribusiJenisTagihanRowData {
  no?: number;
  tanggal: string;
  spp: number;
  heregistrasi: number;
  upm: number;
  uktAfirmasiUika: number;
  ujianAkhirSemester: number;
  praktikumRpl: number;
  praktikumJarkom: number;
  praktikumMetodeNumerik: number;
  praktikumStrukturData: number;
  sks: number;
  wakafMasjid: number;
  taaruf: number;
  sksSemester1: number;
  kolokium: number;
  uangGedungTahap1: number;
  praktikumKnowledgeGraph: number;
  praktikumPengenalanPola: number;
  praktikumAlgoritma: number;
  kerjaPraktik: number;
  praktikumEmbedded: number;
  praktikumAr: number;
  sumbanganFasilitas: number;
  biayaPendaftaranRusunawa: number;
  rusunawa: number;
  praktikumPenginderaanJauh: number;
  praktikumPerangkatBergerak: number;
  praktikumBahasaInggris: number;
  praktikumKeamananInformasi: number;
  praktikumPermodelanSpasial: number;
  praktikumPemrogramanWeb: number;
  praktikumSig: number;
  praktikumPermodelanSimulasi: number;
  total: number;
  // compatibility:
  jenisTagihan?: string;
  jumlahTransaksi?: number;
  totalPembayaran?: number;
  persentase?: number;
}

// 1. Generate HTML Pembayaran Per Mahasiswa
export function generatePembayaranPerMahasiswaHtml(params: {
  useKop: boolean;
  periodePembayaran: string;
  metodePembayaran: string;
  channel: string;
  tglAwal: string;
  tglAkhir: string;
  jenisTagihan: string;
  penerima: string;
  statusPembatalan: string;
  tampilkanKelompokUkt?: boolean;
  data: PembayaranPerMahasiswaRowData[];
  formatRupiah: (num: number) => string;
}): string {
  const {
    useKop,
    periodePembayaran,
    metodePembayaran,
    channel,
    tglAwal,
    tglAkhir,
    jenisTagihan,
    penerima,
    statusPembatalan,
    data,
    formatRupiah,
  } = params;

  const totalNominalTrx = data.reduce(
    (acc, curr) => acc + (curr.batal === "Ya" || curr.status === "Batal" ? 0 : (curr.nominalTransaksi || curr.nominal || 0)),
    0
  );
  const totalNomDetail = data.reduce(
    (acc, curr) => acc + (curr.batal === "Ya" || curr.status === "Batal" ? 0 : (curr.nominalDetail || curr.nominal || 0)),
    0
  );
  const totalTagihanSemua = data.reduce(
    (acc, curr) => acc + (curr.totalTagihan || curr.nominal || 0),
    0
  );
  const totalPembayaranSemua = data.reduce(
    (acc, curr) => acc + (curr.batal === "Ya" || curr.status === "Batal" ? 0 : (curr.totalPembayaran || curr.nominal || 0)),
    0
  );

  return `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <title>Laporan Pembayaran Per Mahasiswa - UIKA Bogor</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 20px; color: #252a38; }
        .header { margin-bottom: 20px; }
        .header-content { display: flex; align-items: center; justify-content: center; gap: 20px; }
        .header-logo { width: 75px; height: 75px; object-fit: contain; }
        .header-text { text-align: center; }
        .header-text h2 { margin: 0; font-size: 20px; font-weight: bold; color: #111827; }
        .header-text p { margin: 2px 0; font-size: 12px; color: #374151; }
        .header-line { border-bottom: 3px double #111827; margin-top: 10px; }
        .report-title { text-align: center; margin: 15px 0 20px 0; }
        .report-title h3 { margin: 0; font-size: 15px; font-weight: bold; text-transform: uppercase; color: #111827; }
        .info-table { width: 100%; margin-bottom: 20px; font-size: 13px; }
        .info-table td { padding: 4px 8px; }
        .info-table td.label { font-weight: bold; width: 180px; color: #1e3a8a; }
        table.data-table { width: 100%; border-collapse: collapse; font-size: 10px; margin-top: 10px; }
        table.data-table th, table.data-table td { border: 1px solid #d1d5db; padding: 6px 7px; text-align: left; }
        table.data-table th { background-color: #1e3a8a; color: white; font-weight: 600; text-align: center; vertical-align: middle; }
        table.data-table tr:nth-child(even) { background-color: #f9fafb; }
        .text-right { text-align: right; }
        .text-center { text-align: center; }
        .badge { display: inline-block; padding: 2px 6px; border-radius: 9999px; font-size: 9px; font-weight: 600; }
        .badge-sukses { background: #d1fae5; color: #065f46; }
        .badge-batal { background: #fee2e2; color: #991b1b; }
        @media print { .no-print { display: none; } }
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
            <img src="/images/logo-uika.png" alt="Logo UIKA" class="header-logo" onerror="this.style.display='none'">
            <div class="header-text">
              <h2>UNIVERSITAS IBN KHALDUN BOGOR</h2>
              <p>Jl. KH. Sholeh Iskandar KM. 2, Kedung Badak, Tanah Sareal, Kota Bogor, Jawa Barat 16162</p>
              <p>Telepon: (0251) 8356884 | Email: info@uika-bogor.ac.id | Website: www.uika-bogor.ac.id</p>
            </div>
          </div>
          <div class="header-line"></div>
        </div>
      `
          : ""
      }
      <div class="report-title">
        <h3>LAPORAN PEMBAYARAN PER MAHASISWA</h3>
      </div>
      <table class="info-table">
        <tr>
          <td class="label">Periode Pembayaran</td>
          <td>: ${periodePembayaran || "Semua"}</td>
          <td class="label">Metode / Channel</td>
          <td>: ${metodePembayaran || "Semua"} / ${channel || "Semua"}</td>
        </tr>
        <tr>
          <td class="label">Periode Tanggal</td>
          <td>: ${tglAwal || tglAkhir ? `${tglAwal || "-"} s.d. ${tglAkhir || "-"}` : "Semua Tanggal"}</td>
          <td class="label">Jenis Tagihan</td>
          <td>: ${jenisTagihan || "Semua"}</td>
        </tr>
        <tr>
          <td class="label">Penerima</td>
          <td>: ${penerima || "Semua"}</td>
          <td class="label">Status Pembatalan</td>
          <td>: ${statusPembatalan || "Semua"}</td>
        </tr>
      </table>

      <table class="data-table">
        <thead>
          <tr>
            <th style="width: 25px;">No.</th>
            <th>NIM</th>
            <th>ID Pendaftar</th>
            <th>Nama</th>
            <th>Semester Aktif</th>
            <th>Prodi</th>
            <th>Pembayaran</th>
            <th>Tanggal</th>
            <th class="text-right">Nominal Transaksi</th>
            <th>Kode Tagihan</th>
            <th>Jenis Tagihan</th>
            <th>Cicilan Ke-</th>
            <th>Bulan</th>
            <th class="text-right">Nominal Detail</th>
            <th class="text-center">Batal</th>
            <th>Semester / TA</th>
            <th class="text-right">Total Tagihan</th>
            <th class="text-right">Total Pembayaran</th>
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
                <td class="text-center font-mono">${row.idPendaftar || "-"}</td>
                <td><strong>${row.nama}</strong></td>
                <td class="text-center">${row.semesterAktif || "-"}</td>
                <td>${row.prodi}</td>
                <td>${row.pembayaran || row.metodePembayaran || "-"}</td>
                <td class="text-center">${row.tanggal || row.tanggalBayar || "-"}</td>
                <td class="text-right font-mono" style="font-weight: 600;">${formatRupiah(row.nominalTransaksi || row.nominal || 0)}</td>
                <td class="font-mono text-center">${row.kodeTagihan || "-"}</td>
                <td>${row.jenisTagihan || "-"}</td>
                <td class="text-center">${row.cicilanKe ?? "-"}</td>
                <td class="text-center">${row.bulan || "-"}</td>
                <td class="text-right font-mono">${formatRupiah(row.nominalDetail || row.nominal || 0)}</td>
                <td class="text-center">
                  <span class="badge ${row.batal === "Ya" || row.status === "Batal" ? "badge-batal" : "badge-sukses"}">
                    ${row.batal || (row.status === "Batal" ? "Ya" : "Tidak")}
                  </span>
                </td>
                <td class="text-center">${row.semesterTa || "-"}</td>
                <td class="text-right font-mono">${formatRupiah(row.totalTagihan || row.nominal || 0)}</td>
                <td class="text-right font-mono" style="font-weight: 600; color: #1e3a8a;">${formatRupiah(row.totalPembayaran || row.nominal || 0)}</td>
              </tr>
            `
                  )
                  .join("")
              : `<tr><td colspan="18" class="text-center">Tidak ada data pembayaran per mahasiswa</td></tr>`
          }
        </tbody>
        <tfoot>
          <tr style="background-color: #f3f4f6; font-weight: bold;">
            <td colspan="8" class="text-center">TOTAL KESELURUHAN (AKTIF)</td>
            <td class="text-right font-mono">${formatRupiah(totalNominalTrx)}</td>
            <td colspan="4"></td>
            <td class="text-right font-mono">${formatRupiah(totalNomDetail)}</td>
            <td colspan="2"></td>
            <td class="text-right font-mono">${formatRupiah(totalTagihanSemua)}</td>
            <td class="text-right font-mono" style="color: #1e3a8a;">${formatRupiah(totalPembayaranSemua)}</td>
          </tr>
        </tfoot>
      </table>
    </body>
    </html>
  `;
}

// 2. Generate HTML Distribusi Pembayaran
export function generateDistribusiPembayaranHtml(params: {
  useKop: boolean;
  unitKerja: string;
  metodePembayaran: string;
  tglAwal: string;
  tglAkhir: string;
  tingkatDistribusi: string;
  data: DistribusiPembayaranRowData[];
  formatRupiah: (num: number) => string;
}): string {
  const {
    useKop,
    unitKerja,
    metodePembayaran,
    tglAwal,
    tglAkhir,
    tingkatDistribusi,
    data,
    formatRupiah,
  } = params;

  const totalUangGedung = data.reduce((acc, curr) => acc + (curr.uangGedungTahap1 || 0), 0);
  const totalSpp = data.reduce((acc, curr) => acc + (curr.spp || 0), 0);
  const totalHeregistrasi = data.reduce((acc, curr) => acc + (curr.heregistrasi || 0), 0);
  const totalUpm = data.reduce((acc, curr) => acc + (curr.upm || 0), 0);
  const totalUas = data.reduce((acc, curr) => acc + (curr.ujianAkhirSemester || 0), 0);
  const totalUktAfirmasi = data.reduce((acc, curr) => acc + (curr.uktAfirmasiUika || 0), 0);
  const totalRpl = data.reduce((acc, curr) => acc + (curr.praktikumRpl || 0), 0);
  const totalJarkom = data.reduce((acc, curr) => acc + (curr.praktikumJarkom || 0), 0);
  const totalEmbedded = data.reduce((acc, curr) => acc + (curr.praktikumEmbedded || 0), 0);
  const totalMetNum = data.reduce((acc, curr) => acc + (curr.praktikumMetodeNumerik || 0), 0);
  const totalAr = data.reduce((acc, curr) => acc + (curr.praktikumAr || 0), 0);
  const totalKg = data.reduce((acc, curr) => acc + (curr.praktikumKnowledgeGraph || 0), 0);
  const totalPola = data.reduce((acc, curr) => acc + (curr.praktikumPengenalanPola || 0), 0);
  const totalStrukdat = data.reduce((acc, curr) => acc + (curr.praktikumStrukturData || 0), 0);
  const totalSks = data.reduce((acc, curr) => acc + (curr.sks || 0), 0);

  return `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <title>Laporan Distribusi Pembayaran - UIKA Bogor</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 20px; color: #252a38; }
        .header { margin-bottom: 20px; }
        .header-content { display: flex; align-items: center; justify-content: center; gap: 20px; }
        .header-logo { width: 75px; height: 75px; object-fit: contain; }
        .header-text { text-align: center; }
        .header-text h2 { margin: 0; font-size: 20px; font-weight: bold; color: #111827; }
        .header-text p { margin: 2px 0; font-size: 12px; color: #374151; }
        .header-line { border-bottom: 3px double #111827; margin-top: 10px; }
        .report-title { text-align: center; margin: 15px 0 20px 0; }
        .report-title h3 { margin: 0; font-size: 15px; font-weight: bold; text-transform: uppercase; color: #111827; }
        .info-table { width: 100%; margin-bottom: 20px; font-size: 13px; }
        .info-table td { padding: 4px 8px; }
        .info-table td.label { font-weight: bold; width: 180px; color: #1e3a8a; }
        table.data-table { width: 100%; border-collapse: collapse; font-size: 10px; margin-top: 10px; }
        table.data-table th, table.data-table td { border: 1px solid #d1d5db; padding: 6px 7px; text-align: left; }
        table.data-table th { background-color: #1e3a8a; color: white; font-weight: 600; text-align: center; vertical-align: middle; }
        table.data-table tr:nth-child(even) { background-color: #f9fafb; }
        .text-right { text-align: right; }
        .text-center { text-align: center; }
        @media print { .no-print { display: none; } }
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
            <img src="/images/logo-uika.png" alt="Logo UIKA" class="header-logo" onerror="this.style.display='none'">
            <div class="header-text">
              <h2>UNIVERSITAS IBN KHALDUN BOGOR</h2>
              <p>Jl. KH. Sholeh Iskandar KM. 2, Kedung Badak, Tanah Sareal, Kota Bogor, Jawa Barat 16162</p>
              <p>Telepon: (0251) 8356884 | Email: info@uika-bogor.ac.id | Website: www.uika-bogor.ac.id</p>
            </div>
          </div>
          <div class="header-line"></div>
        </div>
      `
          : ""
      }
      <div class="report-title">
        <h3>LAPORAN DISTRIBUSI PEMBAYARAN</h3>
      </div>
      <table class="info-table">
        <tr>
          <td class="label">Unit Kerja</td>
          <td>: ${unitKerja || "Universitas Ibn Khaldun"}</td>
          <td class="label">Tingkat Distribusi</td>
          <td>: ${tingkatDistribusi || "Fakultas"}</td>
        </tr>
        <tr>
          <td class="label">Rentang Tanggal</td>
          <td>: ${tglAwal || "-"} s.d. ${tglAkhir || "-"}</td>
          <td class="label">Metode Pembayaran</td>
          <td>: ${metodePembayaran || "Semua"}</td>
        </tr>
      </table>

      <table class="data-table">
        <thead>
          <tr>
            <th>Kode Fakultas</th>
            <th>Nama Fakultas</th>
            <th>Sumber Data</th>
            <th class="text-right">Uang Gedung Tahap 1</th>
            <th class="text-right">SPP</th>
            <th class="text-right">Heregistrasi</th>
            <th class="text-right">UPM (Uang Pembinaan Mahasiswa)</th>
            <th class="text-right">Ujian Akhir Semester</th>
            <th class="text-right">UKT Afirmasi UIKA</th>
            <th class="text-right">Praktikum Rekayasa Perangkat Lunak</th>
            <th class="text-right">Praktikum Jaringan Komputer</th>
            <th class="text-right">Praktikum Sistem Embedded & Waktu Nyata</th>
            <th class="text-right">Praktikum Metode Numerik</th>
            <th class="text-right">Praktikum Augmented Reality</th>
            <th class="text-right">Praktikum Knowledge Graph</th>
            <th class="text-right">Praktikum Pengenalan Pola</th>
            <th class="text-right">praktikum Struktur Data</th>
            <th class="text-right">SKS</th>
          </tr>
        </thead>
        <tbody>
          ${
            data.length > 0
              ? data
                  .map(
                    (row) => `
              <tr>
                <td class="text-center font-mono font-semibold">${row.kodeFakultas}</td>
                <td><strong>${row.namaFakultas}</strong></td>
                <td class="text-center">${row.sumberData}</td>
                <td class="text-right font-mono">${formatRupiah(row.uangGedungTahap1 || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.spp || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.heregistrasi || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.upm || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.ujianAkhirSemester || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.uktAfirmasiUika || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.praktikumRpl || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.praktikumJarkom || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.praktikumEmbedded || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.praktikumMetodeNumerik || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.praktikumAr || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.praktikumKnowledgeGraph || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.praktikumPengenalanPola || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.praktikumStrukturData || 0)}</td>
                <td class="text-right font-mono" style="font-weight: 600; color: #1e3a8a;">${formatRupiah(row.sks || 0)}</td>
              </tr>
            `
                  )
                  .join("")
              : `<tr><td colspan="18" class="text-center">Tidak ada data distribusi pembayaran</td></tr>`
          }
        </tbody>
        <tfoot>
          <tr style="background-color: #f3f4f6; font-weight: bold;">
            <td colspan="3" class="text-center">TOTAL KESELURUHAN</td>
            <td class="text-right font-mono">${formatRupiah(totalUangGedung)}</td>
            <td class="text-right font-mono">${formatRupiah(totalSpp)}</td>
            <td class="text-right font-mono">${formatRupiah(totalHeregistrasi)}</td>
            <td class="text-right font-mono">${formatRupiah(totalUpm)}</td>
            <td class="text-right font-mono">${formatRupiah(totalUas)}</td>
            <td class="text-right font-mono">${formatRupiah(totalUktAfirmasi)}</td>
            <td class="text-right font-mono">${formatRupiah(totalRpl)}</td>
            <td class="text-right font-mono">${formatRupiah(totalJarkom)}</td>
            <td class="text-right font-mono">${formatRupiah(totalEmbedded)}</td>
            <td class="text-right font-mono">${formatRupiah(totalMetNum)}</td>
            <td class="text-right font-mono">${formatRupiah(totalAr)}</td>
            <td class="text-right font-mono">${formatRupiah(totalKg)}</td>
            <td class="text-right font-mono">${formatRupiah(totalPola)}</td>
            <td class="text-right font-mono">${formatRupiah(totalStrukdat)}</td>
            <td class="text-right font-mono" style="color: #1e3a8a;">${formatRupiah(totalSks)}</td>
          </tr>
        </tfoot>
      </table>
    </body>
    </html>
  `;
}

// 3. Generate HTML Distribusi Pembayaran Tagihan Per Tanggal (34 Kolom sesuai Gambar 1 & 2)
export function generateDistribusiJenisTagihanHtml(params: {
  useKop: boolean;
  unitKerja: string;
  metodePembayaran: string;
  tglAwal: string;
  tglAkhir: string;
  data: DistribusiJenisTagihanRowData[];
  formatRupiah: (num: number) => string;
}): string {
  const {
    useKop,
    unitKerja,
    metodePembayaran,
    tglAwal,
    tglAkhir,
    data,
    formatRupiah,
  } = params;

  const totalSpp = data.reduce((acc, curr) => acc + (curr.spp || 0), 0);
  const totalHeregistrasi = data.reduce((acc, curr) => acc + (curr.heregistrasi || 0), 0);
  const totalUpm = data.reduce((acc, curr) => acc + (curr.upm || 0), 0);
  const totalUktAfirmasi = data.reduce((acc, curr) => acc + (curr.uktAfirmasiUika || 0), 0);
  const totalUas = data.reduce((acc, curr) => acc + (curr.ujianAkhirSemester || 0), 0);
  const totalRpl = data.reduce((acc, curr) => acc + (curr.praktikumRpl || 0), 0);
  const totalJarkom = data.reduce((acc, curr) => acc + (curr.praktikumJarkom || 0), 0);
  const totalMetNum = data.reduce((acc, curr) => acc + (curr.praktikumMetodeNumerik || 0), 0);
  const totalStrukdat = data.reduce((acc, curr) => acc + (curr.praktikumStrukturData || 0), 0);
  const totalSks = data.reduce((acc, curr) => acc + (curr.sks || 0), 0);
  const totalWakaf = data.reduce((acc, curr) => acc + (curr.wakafMasjid || 0), 0);
  const totalTaaruf = data.reduce((acc, curr) => acc + (curr.taaruf || 0), 0);
  const totalSksSem1 = data.reduce((acc, curr) => acc + (curr.sksSemester1 || 0), 0);
  const totalKolokium = data.reduce((acc, curr) => acc + (curr.kolokium || 0), 0);
  const totalUangGedung = data.reduce((acc, curr) => acc + (curr.uangGedungTahap1 || 0), 0);
  const totalKg = data.reduce((acc, curr) => acc + (curr.praktikumKnowledgeGraph || 0), 0);
  const totalPola = data.reduce((acc, curr) => acc + (curr.praktikumPengenalanPola || 0), 0);
  const totalAlgoritma = data.reduce((acc, curr) => acc + (curr.praktikumAlgoritma || 0), 0);
  const totalKp = data.reduce((acc, curr) => acc + (curr.kerjaPraktik || 0), 0);
  const totalEmbedded = data.reduce((acc, curr) => acc + (curr.praktikumEmbedded || 0), 0);
  const totalAr = data.reduce((acc, curr) => acc + (curr.praktikumAr || 0), 0);
  const totalSumbangan = data.reduce((acc, curr) => acc + (curr.sumbanganFasilitas || 0), 0);
  const totalDaftarRusunawa = data.reduce((acc, curr) => acc + (curr.biayaPendaftaranRusunawa || 0), 0);
  const totalRusunawa = data.reduce((acc, curr) => acc + (curr.rusunawa || 0), 0);
  const totalInderaJauh = data.reduce((acc, curr) => acc + (curr.praktikumPenginderaanJauh || 0), 0);
  const totalPerangkatBergerak = data.reduce((acc, curr) => acc + (curr.praktikumPerangkatBergerak || 0), 0);
  const totalBhsInggris = data.reduce((acc, curr) => acc + (curr.praktikumBahasaInggris || 0), 0);
  const totalKeamanan = data.reduce((acc, curr) => acc + (curr.praktikumKeamananInformasi || 0), 0);
  const totalModelSpasial = data.reduce((acc, curr) => acc + (curr.praktikumPermodelanSpasial || 0), 0);
  const totalWeb = data.reduce((acc, curr) => acc + (curr.praktikumPemrogramanWeb || 0), 0);
  const totalSig = data.reduce((acc, curr) => acc + (curr.praktikumSig || 0), 0);
  const totalModelSimulasi = data.reduce((acc, curr) => acc + (curr.praktikumPermodelanSimulasi || 0), 0);
  const grandTotal = data.reduce((acc, curr) => acc + (curr.total || curr.totalPembayaran || 0), 0);

  return `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <title>Laporan Distribusi Pembayaran Tagihan Per Tanggal - UIKA Bogor</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 15px; color: #252a38; }
        .header { margin-bottom: 20px; }
        .header-content { display: flex; align-items: center; justify-content: center; gap: 20px; }
        .header-logo { width: 75px; height: 75px; object-fit: contain; }
        .header-text { text-align: center; }
        .header-text h2 { margin: 0; font-size: 20px; font-weight: bold; color: #111827; }
        .header-text p { margin: 2px 0; font-size: 12px; color: #374151; }
        .header-line { border-bottom: 3px double #111827; margin-top: 10px; }
        .report-title { text-align: center; margin: 15px 0 20px 0; }
        .report-title h3 { margin: 0; font-size: 15px; font-weight: bold; text-transform: uppercase; color: #111827; }
        .info-table { width: 100%; margin-bottom: 20px; font-size: 13px; }
        .info-table td { padding: 4px 8px; }
        .info-table td.label { font-weight: bold; width: 180px; color: #1e3a8a; }
        table.data-table { width: 100%; border-collapse: collapse; font-size: 9px; margin-top: 10px; }
        table.data-table th, table.data-table td { border: 1px solid #d1d5db; padding: 5px 6px; text-align: left; }
        table.data-table th { background-color: #1e3a8a; color: white; font-weight: 600; text-align: center; vertical-align: middle; }
        table.data-table tr:nth-child(even) { background-color: #f9fafb; }
        .text-right { text-align: right; }
        .text-center { text-align: center; }
        @media print { .no-print { display: none; } }
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
            <img src="/images/logo-uika.png" alt="Logo UIKA" class="header-logo" onerror="this.style.display='none'">
            <div class="header-text">
              <h2>UNIVERSITAS IBN KHALDUN BOGOR</h2>
              <p>Jl. KH. Sholeh Iskandar KM. 2, Kedung Badak, Tanah Sareal, Kota Bogor, Jawa Barat 16162</p>
              <p>Telepon: (0251) 8356884 | Email: info@uika-bogor.ac.id | Website: www.uika-bogor.ac.id</p>
            </div>
          </div>
          <div class="header-line"></div>
        </div>
      `
          : ""
      }
      <div class="report-title">
        <h3>LAPORAN DISTRIBUSI PEMBAYARAN TAGIHAN PER TANGGAL</h3>
      </div>
      <table class="info-table">
        <tr>
          <td class="label">Unit Kerja</td>
          <td>: ${unitKerja || "Universitas Ibn Khaldun"}</td>
          <td class="label">Metode Pembayaran</td>
          <td>: ${metodePembayaran || "Semua"}</td>
        </tr>
        <tr>
          <td class="label">Rentang Tanggal</td>
          <td>: ${tglAwal || "-"} s.d. ${tglAkhir || "-"}</td>
          <td class="label">Tanggal Cetak</td>
          <td>: ${new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</td>
        </tr>
      </table>

      <table class="data-table">
        <thead>
          <tr>
            <th>Tanggal</th>
            <th class="text-right">SPP</th>
            <th class="text-right">Heregistrasi</th>
            <th class="text-right">UPM (Uang Pembinaan Mahasiswa)</th>
            <th class="text-right">UKT Afirmasi UIKA</th>
            <th class="text-right">Ujian Akhir Semester</th>
            <th class="text-right">Praktikum Rekayasa Perangkat Lunak</th>
            <th class="text-right">Praktikum Jaringan Komputer</th>
            <th class="text-right">Praktikum Metode Numerik</th>
            <th class="text-right">praktikum Struktur Data</th>
            <th class="text-right">SKS</th>
            <th class="text-right">Wakaf Masjid Ibn Khaldun</th>
            <th class="text-right">Ta'aruf</th>
            <th class="text-right">SKS Semester 1</th>
            <th class="text-right">Kolokium</th>
            <th class="text-right">Uang Gedung Tahap 1</th>
            <th class="text-right">Praktikum Knowledge Graph</th>
            <th class="text-right">Praktikum Pengenalan Pola</th>
            <th class="text-right">Praktikum Algoritma dan pemrograman</th>
            <th class="text-right">Kerja Praktik</th>
            <th class="text-right">Praktikum Sistem Embedded & Waktu Nyata</th>
            <th class="text-right">Praktikum Augmented Reality</th>
            <th class="text-right">Sumbangan Fasilitas</th>
            <th class="text-right">Biaya Pendaftaran Rusunawa</th>
            <th class="text-right">Rusunawa</th>
            <th class="text-right">Praktikum Penginderaan Jauh I</th>
            <th class="text-right">Praktikum Pemrograman Perangkat Bergerak</th>
            <th class="text-right">Praktikum Bahasa Inggris</th>
            <th class="text-right">Praktikum Keamanan Informasi</th>
            <th class="text-right">Praktikum Permodelan Spasial</th>
            <th class="text-right">Praktikum Perancangan & Pemrograman Web</th>
            <th class="text-right">Praktikum Sistem Informasi Geografis</th>
            <th class="text-right">Praktikum Permodelan dan Simulasi</th>
            <th class="text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          ${
            data.length > 0
              ? data
                  .map(
                    (row) => `
              <tr>
                <td class="text-center font-mono font-semibold">${row.tanggal}</td>
                <td class="text-right font-mono">${formatRupiah(row.spp || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.heregistrasi || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.upm || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.uktAfirmasiUika || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.ujianAkhirSemester || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.praktikumRpl || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.praktikumJarkom || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.praktikumMetodeNumerik || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.praktikumStrukturData || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.sks || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.wakafMasjid || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.taaruf || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.sksSemester1 || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.kolokium || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.uangGedungTahap1 || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.praktikumKnowledgeGraph || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.praktikumPengenalanPola || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.praktikumAlgoritma || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.kerjaPraktik || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.praktikumEmbedded || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.praktikumAr || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.sumbanganFasilitas || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.biayaPendaftaranRusunawa || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.rusunawa || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.praktikumPenginderaanJauh || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.praktikumPerangkatBergerak || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.praktikumBahasaInggris || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.praktikumKeamananInformasi || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.praktikumPermodelanSpasial || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.praktikumPemrogramanWeb || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.praktikumSig || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.praktikumPermodelanSimulasi || 0)}</td>
                <td class="text-right font-mono" style="font-weight: 600; color: #1e3a8a;">${formatRupiah(row.total || row.totalPembayaran || 0)}</td>
              </tr>
            `
                  )
                  .join("")
              : `<tr><td colspan="34" class="text-center">Tidak ada data distribusi pembayaran tagihan</td></tr>`
          }
        </tbody>
        <tfoot>
          <tr style="background-color: #f3f4f6; font-weight: bold;">
            <td class="text-center">TOTAL KESELURUHAN</td>
            <td class="text-right font-mono">${formatRupiah(totalSpp)}</td>
            <td class="text-right font-mono">${formatRupiah(totalHeregistrasi)}</td>
            <td class="text-right font-mono">${formatRupiah(totalUpm)}</td>
            <td class="text-right font-mono">${formatRupiah(totalUktAfirmasi)}</td>
            <td class="text-right font-mono">${formatRupiah(totalUas)}</td>
            <td class="text-right font-mono">${formatRupiah(totalRpl)}</td>
            <td class="text-right font-mono">${formatRupiah(totalJarkom)}</td>
            <td class="text-right font-mono">${formatRupiah(totalMetNum)}</td>
            <td class="text-right font-mono">${formatRupiah(totalStrukdat)}</td>
            <td class="text-right font-mono">${formatRupiah(totalSks)}</td>
            <td class="text-right font-mono">${formatRupiah(totalWakaf)}</td>
            <td class="text-right font-mono">${formatRupiah(totalTaaruf)}</td>
            <td class="text-right font-mono">${formatRupiah(totalSksSem1)}</td>
            <td class="text-right font-mono">${formatRupiah(totalKolokium)}</td>
            <td class="text-right font-mono">${formatRupiah(totalUangGedung)}</td>
            <td class="text-right font-mono">${formatRupiah(totalKg)}</td>
            <td class="text-right font-mono">${formatRupiah(totalPola)}</td>
            <td class="text-right font-mono">${formatRupiah(totalAlgoritma)}</td>
            <td class="text-right font-mono">${formatRupiah(totalKp)}</td>
            <td class="text-right font-mono">${formatRupiah(totalEmbedded)}</td>
            <td class="text-right font-mono">${formatRupiah(totalAr)}</td>
            <td class="text-right font-mono">${formatRupiah(totalSumbangan)}</td>
            <td class="text-right font-mono">${formatRupiah(totalDaftarRusunawa)}</td>
            <td class="text-right font-mono">${formatRupiah(totalRusunawa)}</td>
            <td class="text-right font-mono">${formatRupiah(totalInderaJauh)}</td>
            <td class="text-right font-mono">${formatRupiah(totalPerangkatBergerak)}</td>
            <td class="text-right font-mono">${formatRupiah(totalBhsInggris)}</td>
            <td class="text-right font-mono">${formatRupiah(totalKeamanan)}</td>
            <td class="text-right font-mono">${formatRupiah(totalModelSpasial)}</td>
            <td class="text-right font-mono">${formatRupiah(totalWeb)}</td>
            <td class="text-right font-mono">${formatRupiah(totalSig)}</td>
            <td class="text-right font-mono">${formatRupiah(totalModelSimulasi)}</td>
            <td class="text-right font-mono" style="color: #1e3a8a;">${formatRupiah(grandTotal)}</td>
          </tr>
        </tfoot>
      </table>
    </body>
    </html>
  `;
}

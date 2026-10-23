export interface DistribusiPembayaranPerTanggalRowData {
  no?: number;
  tanggal: string;
  bankSyariahIndonesia: number;
  bprsAmanahUmmah: number;
  tokopedia: number;
  bankAmanahUmmahFormulir: number;
  bankAceh: number;
  bankCentralAsia: number;
  btnSyariah: number;
  kasirBaskUika: number;
  bankMuamalat: number;
  bankNagari: number;
  ovo: number;
  shopee: number;
  mpnG3: number;
  total: number;
  // compatibility:
  channel?: string;
  akunBank?: string;
  jumlahTransaksi?: number;
  totalPembayaran?: number;
  persentase?: number;
}

export interface PivotPembayaranRowData {
  no: number;
  namaMahasiswa: string;
  totalNominal: number;
  // compatibility:
  pivotKey?: string;
  suksesCount?: number;
  batalCount?: number;
  totalCount?: number;
  suksesNominal?: number;
  batalNominal?: number;
  persentaseSukses?: number;
}

// 1. Generate HTML Distribusi Pembayaran Akun Channel Per Tanggal (15 Kolom sesuai Gambar 3)
export function generateDistribusiPembayaranPerTanggalHtml(params: {
  useKop: boolean;
  unitKerja: string;
  metodePembayaran: string;
  tglAwal: string;
  tglAkhir: string;
  data: DistribusiPembayaranPerTanggalRowData[];
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

  const totalBsi = data.reduce((acc, curr) => acc + (curr.bankSyariahIndonesia || 0), 0);
  const totalBprs = data.reduce((acc, curr) => acc + (curr.bprsAmanahUmmah || 0), 0);
  const totalTokped = data.reduce((acc, curr) => acc + (curr.tokopedia || 0), 0);
  const totalAmanahFormulir = data.reduce((acc, curr) => acc + (curr.bankAmanahUmmahFormulir || 0), 0);
  const totalAceh = data.reduce((acc, curr) => acc + (curr.bankAceh || 0), 0);
  const totalBca = data.reduce((acc, curr) => acc + (curr.bankCentralAsia || 0), 0);
  const totalBtn = data.reduce((acc, curr) => acc + (curr.btnSyariah || 0), 0);
  const totalKasirBask = data.reduce((acc, curr) => acc + (curr.kasirBaskUika || 0), 0);
  const totalMuamalat = data.reduce((acc, curr) => acc + (curr.bankMuamalat || 0), 0);
  const totalNagari = data.reduce((acc, curr) => acc + (curr.bankNagari || 0), 0);
  const totalOvo = data.reduce((acc, curr) => acc + (curr.ovo || 0), 0);
  const totalShopee = data.reduce((acc, curr) => acc + (curr.shopee || 0), 0);
  const totalMpn = data.reduce((acc, curr) => acc + (curr.mpnG3 || 0), 0);
  const grandTotal = data.reduce((acc, curr) => acc + (curr.total || curr.totalPembayaran || 0), 0);

  return `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <title>Laporan Distribusi Pembayaran Akun Channel Per Tanggal - UIKA Bogor</title>
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
        <h3>LAPORAN DISTRIBUSI PEMBAYARAN AKUN CHANNEL PER TANGGAL</h3>
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
            <th class="text-right">Bank Syariah Indonesia</th>
            <th class="text-right">BPRS Amanah Ummah</th>
            <th class="text-right">Tokopedia</th>
            <th class="text-right">Bank Amanah Ummah Formulir</th>
            <th class="text-right">Bank Aceh</th>
            <th class="text-right">Bank Central Asia</th>
            <th class="text-right">BTN Syariah</th>
            <th class="text-right">Kasir BASK UIKA</th>
            <th class="text-right">Bank Muamalat</th>
            <th class="text-right">Bank Nagari</th>
            <th class="text-right">OVO</th>
            <th class="text-right">Shopee</th>
            <th class="text-right">MPN G3</th>
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
                <td class="text-right font-mono">${formatRupiah(row.bankSyariahIndonesia || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.bprsAmanahUmmah || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.tokopedia || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.bankAmanahUmmahFormulir || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.bankAceh || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.bankCentralAsia || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.btnSyariah || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.kasirBaskUika || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.bankMuamalat || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.bankNagari || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.ovo || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.shopee || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.mpnG3 || 0)}</td>
                <td class="text-right font-mono" style="font-weight: 600; color: #1e3a8a;">${formatRupiah(row.total || currRowTotal(row))}</td>
              </tr>
            `
                  )
                  .join("")
              : `<tr><td colspan="15" class="text-center">Tidak ada data distribusi akun channel</td></tr>`
          }
        </tbody>
        <tfoot>
          <tr style="background-color: #f3f4f6; font-weight: bold;">
            <td class="text-center">TOTAL KESELURUHAN</td>
            <td class="text-right font-mono">${formatRupiah(totalBsi)}</td>
            <td class="text-right font-mono">${formatRupiah(totalBprs)}</td>
            <td class="text-right font-mono">${formatRupiah(totalTokped)}</td>
            <td class="text-right font-mono">${formatRupiah(totalAmanahFormulir)}</td>
            <td class="text-right font-mono">${formatRupiah(totalAceh)}</td>
            <td class="text-right font-mono">${formatRupiah(totalBca)}</td>
            <td class="text-right font-mono">${formatRupiah(totalBtn)}</td>
            <td class="text-right font-mono">${formatRupiah(totalKasirBask)}</td>
            <td class="text-right font-mono">${formatRupiah(totalMuamalat)}</td>
            <td class="text-right font-mono">${formatRupiah(totalNagari)}</td>
            <td class="text-right font-mono">${formatRupiah(totalOvo)}</td>
            <td class="text-right font-mono">${formatRupiah(totalShopee)}</td>
            <td class="text-right font-mono">${formatRupiah(totalMpn)}</td>
            <td class="text-right font-mono" style="color: #1e3a8a;">${formatRupiah(grandTotal)}</td>
          </tr>
        </tfoot>
      </table>
    </body>
    </html>
  `;
}

function currRowTotal(row: DistribusiPembayaranPerTanggalRowData): number {
  return (
    (row.bankSyariahIndonesia || 0) +
    (row.bprsAmanahUmmah || 0) +
    (row.tokopedia || 0) +
    (row.bankAmanahUmmahFormulir || 0) +
    (row.bankAceh || 0) +
    (row.bankCentralAsia || 0) +
    (row.btnSyariah || 0) +
    (row.kasirBaskUika || 0) +
    (row.bankMuamalat || 0) +
    (row.bankNagari || 0) +
    (row.ovo || 0) +
    (row.shopee || 0) +
    (row.mpnG3 || 0)
  );
}

// 2. Generate HTML Pivot Pembayaran (3 Kolom sesuai Gambar 4)
export function generatePivotPembayaranHtml(params: {
  useKop: boolean;
  unitKerja: string;
  metodePembayaran: string;
  tglAwal: string;
  tglAkhir: string;
  kolomPivot?: string;
  data: PivotPembayaranRowData[];
  formatRupiah: (num: number) => string;
}): string {
  const {
    useKop,
    unitKerja,
    metodePembayaran,
    tglAwal,
    tglAkhir,
    kolomPivot,
    data,
    formatRupiah,
  } = params;

  const grandTotalNominal = data.reduce((acc, curr) => acc + (curr.totalNominal || 0), 0);

  return `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <title>Laporan Pivot Pembayaran - UIKA Bogor</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 30px; color: #252a38; }
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
        table.data-table { width: 100%; border-collapse: collapse; font-size: 11px; margin-top: 10px; }
        table.data-table th, table.data-table td { border: 1px solid #d1d5db; padding: 7px 8px; text-align: left; }
        table.data-table th { background-color: #1e3a8a; color: white; font-weight: 600; text-align: center; }
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
        <h3>LAPORAN PIVOT PEMBAYARAN</h3>
      </div>
      <table class="info-table">
        <tr>
          <td class="label">Unit Kerja</td>
          <td>: ${unitKerja || "Universitas Ibn Khaldun"}</td>
          <td class="label">Kolom Pivot</td>
          <td>: ${kolomPivot || "Nama Mahasiswa"}</td>
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
            <th style="width: 45px;" class="text-center">No.</th>
            <th>Nama Mahasiswa</th>
            <th class="text-right" style="width: 180px;">Total Nominal</th>
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
                <td><strong>${row.namaMahasiswa || row.pivotKey || ""}</strong></td>
                <td class="text-right font-mono" style="font-weight: 600; color: #1e3a8a;">${formatRupiah(row.totalNominal || 0)}</td>
              </tr>
            `
                  )
                  .join("")
              : `<tr><td colspan="3" class="text-center">Tidak ada data pivot pembayaran</td></tr>`
          }
        </tbody>
        <tfoot>
          <tr style="background-color: #f3f4f6; font-weight: bold;">
            <td colspan="2" class="text-center">TOTAL KESELURUHAN</td>
            <td class="text-right font-mono" style="color: #1e3a8a;">${formatRupiah(grandTotalNominal)}</td>
          </tr>
        </tfoot>
      </table>
    </body>
    </html>
  `;
}

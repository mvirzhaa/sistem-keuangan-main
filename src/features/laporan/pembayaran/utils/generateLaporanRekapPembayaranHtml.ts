export interface RekapPembayaranRowData {
  no: number;
  kodeProdi: string;
  prodi: string;
  bankSyariahIndonesia: number;
  kasirBaskUika: number;
  bankAmanahUmmah: number;
  hostToHost: number;
  eduFin: number;
  deposit: number;
  simponi: number;
  total: number;
  jumlahPembayaran: number;
  fakultas?: string;
  jumlahTransaksi?: number;
  totalSukses?: number;
  totalBatal?: number;
  penerimaanBersih?: number;
}

export interface GenerateLaporanRekapPembayaranParams {
  useKop: boolean;
  periodePembayaran: string;
  prodi: string;
  metodePembayaran: string;
  channel: string;
  tglAwal: string;
  tglAkhir: string;
  periodeMasuk: string;
  jalurPendaftaran: string;
  gelombang: string;
  sistemKuliah: string;
  penerima: string;
  data: RekapPembayaranRowData[];
  formatRupiah: (num: number) => string;
}

export function generateLaporanRekapPembayaranHtml(
  params: GenerateLaporanRekapPembayaranParams
): string {
  const {
    useKop,
    periodePembayaran,
    prodi,
    metodePembayaran,
    channel,
    tglAwal,
    tglAkhir,
    penerima,
    data,
    formatRupiah,
  } = params;

  const totalBsi = data.reduce((acc, curr) => acc + (curr.bankSyariahIndonesia || 0), 0);
  const totalBask = data.reduce((acc, curr) => acc + (curr.kasirBaskUika || 0), 0);
  const totalAmanah = data.reduce((acc, curr) => acc + (curr.bankAmanahUmmah || 0), 0);
  const totalH2h = data.reduce((acc, curr) => acc + (curr.hostToHost || 0), 0);
  const totalEdufin = data.reduce((acc, curr) => acc + (curr.eduFin || 0), 0);
  const totalDeposit = data.reduce((acc, curr) => acc + (curr.deposit || 0), 0);
  const totalSimponi = data.reduce((acc, curr) => acc + (curr.simponi || 0), 0);
  const grandTotal = data.reduce((acc, curr) => acc + (curr.total || 0), 0);
  const totalJumlahPembayaran = data.reduce((acc, curr) => acc + (curr.jumlahPembayaran || 0), 0);

  return `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <title>Laporan Rekapitulasi Pembayaran - Universitas Ibn Khaldun Bogor</title>
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
        table.data-table { width: 100%; border-collapse: collapse; font-size: 11px; margin-top: 10px; }
        table.data-table th, table.data-table td { border: 1px solid #d1d5db; padding: 7px 8px; text-align: left; }
        table.data-table th { background-color: #1e3a8a; color: white; font-weight: 600; text-align: center; vertical-align: middle; }
        table.data-table tr:nth-child(even) { background-color: #f9fafb; }
        .text-right { text-align: right; }
        .text-center { text-align: center; }
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
        <h3>LAPORAN REKAPITULASI PEMBAYARAN</h3>
      </div>

      <table class="info-table">
        <tr>
          <td class="label">Periode Pembayaran</td>
          <td>: ${periodePembayaran || "Semua Periode"}</td>
          <td class="label">Program Studi</td>
          <td>: ${prodi || "Semua Program Studi"}</td>
        </tr>
        <tr>
          <td class="label">Metode Pembayaran</td>
          <td>: ${metodePembayaran || "Semua Metode"}</td>
          <td class="label">Channel</td>
          <td>: ${channel || "Semua Channel"}</td>
        </tr>
        <tr>
          <td class="label">Rentang Tanggal</td>
          <td>: ${tglAwal || tglAkhir ? `${tglAwal || "-"} s.d. ${tglAkhir || "-"}` : "Semua Tanggal"}</td>
          <td class="label">Penerima</td>
          <td>: ${penerima || "Semua Penerima"}</td>
        </tr>
      </table>

      <table class="data-table">
        <thead>
          <tr>
            <th style="width: 35px;">No.</th>
            <th style="width: 75px;">Kode Prodi</th>
            <th>Program Studi</th>
            <th class="text-right">Bank Syariah Indonesia</th>
            <th class="text-right">Kasir BASK UIKA</th>
            <th class="text-right">Bank Amanah Ummah</th>
            <th class="text-right">Host to Host</th>
            <th class="text-right">EduFin</th>
            <th class="text-right">Deposit</th>
            <th class="text-right">SIMPONI</th>
            <th class="text-right">Total</th>
            <th class="text-center" style="width: 90px;">Jumlah Pembayaran</th>
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
                <td class="text-center font-mono">${row.kodeProdi}</td>
                <td><strong>${row.prodi}</strong></td>
                <td class="text-right font-mono">${formatRupiah(row.bankSyariahIndonesia || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.kasirBaskUika || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.bankAmanahUmmah || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.hostToHost || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.eduFin || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.deposit || 0)}</td>
                <td class="text-right font-mono">${formatRupiah(row.simponi || 0)}</td>
                <td class="text-right font-mono" style="font-weight: 600; color: #1e3a8a;">${formatRupiah(row.total || 0)}</td>
                <td class="text-center font-mono" style="font-weight: 600;">${(row.jumlahPembayaran || 0).toLocaleString("id-ID")}</td>
              </tr>
            `
                  )
                  .join("")
              : `<tr><td colspan="12" class="text-center">Tidak ada data rekapitulasi pembayaran yang sesuai</td></tr>`
          }
        </tbody>
        <tfoot>
          <tr style="background-color: #f3f4f6; font-weight: bold;">
            <td colspan="3" class="text-center">TOTAL KESELURUHAN</td>
            <td class="text-right font-mono">${formatRupiah(totalBsi)}</td>
            <td class="text-right font-mono">${formatRupiah(totalBask)}</td>
            <td class="text-right font-mono">${formatRupiah(totalAmanah)}</td>
            <td class="text-right font-mono">${formatRupiah(totalH2h)}</td>
            <td class="text-right font-mono">${formatRupiah(totalEdufin)}</td>
            <td class="text-right font-mono">${formatRupiah(totalDeposit)}</td>
            <td class="text-right font-mono">${formatRupiah(totalSimponi)}</td>
            <td class="text-right font-mono" style="color: #1e3a8a;">${formatRupiah(grandTotal)}</td>
            <td class="text-center font-mono">${totalJumlahPembayaran.toLocaleString("id-ID")}</td>
          </tr>
        </tfoot>
      </table>

      <div class="footer">
        <p>Dicetak pada: ${new Date().toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}</p>
      </div>
    </body>
    </html>
  `;
}

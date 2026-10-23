import React from "react";
import { IoPrintOutline } from "react-icons/io5";
import ListTable, { type Column } from "../../../../components/tables/ListTable";
import { KopLaporan } from "../../tagihan/components/KopLaporan";
import type { RekapPembayaranRowData } from "../utils/generateLaporanRekapPembayaranHtml";

interface LaporanRekapPembayaranPreviewProps {
  useKop?: boolean;
  periodePembayaran: string;
  prodi: string;
  metodePembayaran: string;
  channel: string;
  penerima: string;
  selectedFormat: string;
  data: RekapPembayaranRowData[];
  formatRupiah: (num: number) => string;
  onLihatTabBaru: () => void;
  onCetakFormat?: () => void;
}

export const LaporanRekapPembayaranPreview: React.FC<
  LaporanRekapPembayaranPreviewProps
> = ({
  useKop = true,
  periodePembayaran,
  prodi,
  metodePembayaran,
  channel,
  penerima,
  selectedFormat,
  data,
  formatRupiah,
  onLihatTabBaru,
  onCetakFormat,
}) => {
  const totalBsi = data.reduce((acc, curr) => acc + (curr.bankSyariahIndonesia || 0), 0);
  const totalBask = data.reduce((acc, curr) => acc + (curr.kasirBaskUika || 0), 0);
  const totalAmanah = data.reduce((acc, curr) => acc + (curr.bankAmanahUmmah || 0), 0);
  const totalH2h = data.reduce((acc, curr) => acc + (curr.hostToHost || 0), 0);
  const totalEdufin = data.reduce((acc, curr) => acc + (curr.eduFin || 0), 0);
  const totalDeposit = data.reduce((acc, curr) => acc + (curr.deposit || 0), 0);
  const totalSimponi = data.reduce((acc, curr) => acc + (curr.simponi || 0), 0);
  const grandTotal = data.reduce((acc, curr) => acc + (curr.total || 0), 0);
  const totalJumlahPembayaran = data.reduce((acc, curr) => acc + (curr.jumlahPembayaran || 0), 0);

  const columns: Column<RekapPembayaranRowData>[] = [
    {
      key: "no",
      header: "No.",
      sortable: true,
      className: "text-center py-2.5 px-2 border border-slate-300 text-xs",
      headerClassName: "text-center py-2.5 px-2 border border-slate-300 font-semibold whitespace-nowrap",
      width: "45px",
      render: (item) => <span>{item.no}</span>,
    },
    {
      key: "kodeProdi",
      header: "Kode Prodi",
      sortable: true,
      className: "text-center py-2.5 px-3 border border-slate-300 text-xs font-mono text-gray-800 whitespace-nowrap",
      headerClassName: "text-center py-2.5 px-3 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => item.kodeProdi,
    },
    {
      key: "prodi",
      header: "Program Studi",
      sortable: true,
      className: "py-2.5 px-3 border border-slate-300 text-xs font-semibold text-gray-900 whitespace-nowrap",
      headerClassName: "text-left py-2.5 px-3 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => item.prodi,
    },
    {
      key: "bankSyariahIndonesia",
      header: "Bank Syariah Indonesia",
      sortable: true,
      className: "text-right py-2.5 px-3 border border-slate-300 text-xs font-mono text-gray-800 whitespace-nowrap",
      headerClassName: "text-right py-2.5 px-3 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => formatRupiah(item.bankSyariahIndonesia || 0),
    },
    {
      key: "kasirBaskUika",
      header: "Kasir BASK UIKA",
      sortable: true,
      className: "text-right py-2.5 px-3 border border-slate-300 text-xs font-mono text-gray-800 whitespace-nowrap",
      headerClassName: "text-right py-2.5 px-3 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => formatRupiah(item.kasirBaskUika || 0),
    },
    {
      key: "bankAmanahUmmah",
      header: "Bank Amanah Ummah",
      sortable: true,
      className: "text-right py-2.5 px-3 border border-slate-300 text-xs font-mono text-gray-800 whitespace-nowrap",
      headerClassName: "text-right py-2.5 px-3 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => formatRupiah(item.bankAmanahUmmah || 0),
    },
    {
      key: "hostToHost",
      header: "Host to Host",
      sortable: true,
      className: "text-right py-2.5 px-3 border border-slate-300 text-xs font-mono text-gray-800 whitespace-nowrap",
      headerClassName: "text-right py-2.5 px-3 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => formatRupiah(item.hostToHost || 0),
    },
    {
      key: "eduFin",
      header: "EduFin",
      sortable: true,
      className: "text-right py-2.5 px-3 border border-slate-300 text-xs font-mono text-gray-800 whitespace-nowrap",
      headerClassName: "text-right py-2.5 px-3 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => formatRupiah(item.eduFin || 0),
    },
    {
      key: "deposit",
      header: "Deposit",
      sortable: true,
      className: "text-right py-2.5 px-3 border border-slate-300 text-xs font-mono text-gray-800 whitespace-nowrap",
      headerClassName: "text-right py-2.5 px-3 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => formatRupiah(item.deposit || 0),
    },
    {
      key: "simponi",
      header: "SIMPONI",
      sortable: true,
      className: "text-right py-2.5 px-3 border border-slate-300 text-xs font-mono text-gray-800 whitespace-nowrap",
      headerClassName: "text-right py-2.5 px-3 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => formatRupiah(item.simponi || 0),
    },
    {
      key: "total",
      header: "Total",
      sortable: true,
      className: "text-right py-2.5 px-3 border border-slate-300 text-xs font-mono font-bold text-blue-900 whitespace-nowrap",
      headerClassName: "text-right py-2.5 px-3 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => formatRupiah(item.total || 0),
    },
    {
      key: "jumlahPembayaran",
      header: "Jumlah Pembayaran",
      sortable: true,
      className: "text-center py-2.5 px-3 border border-slate-300 text-xs font-mono font-semibold text-gray-900 whitespace-nowrap",
      headerClassName: "text-center py-2.5 px-3 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => (item.jumlahPembayaran || 0).toLocaleString("id-ID"),
    },
  ];

  const footerRow = (
    <tr className="bg-gray-100 font-bold text-gray-900 border-t-2 border-gray-300">
      <td
        colSpan={3}
        className="py-2.5 px-3 text-center border border-slate-300 font-semibold"
      >
        TOTAL KESELURUHAN
      </td>
      <td className="py-2.5 px-3 text-right border border-slate-300 font-mono">
        {formatRupiah(totalBsi)}
      </td>
      <td className="py-2.5 px-3 text-right border border-slate-300 font-mono">
        {formatRupiah(totalBask)}
      </td>
      <td className="py-2.5 px-3 text-right border border-slate-300 font-mono">
        {formatRupiah(totalAmanah)}
      </td>
      <td className="py-2.5 px-3 text-right border border-slate-300 font-mono">
        {formatRupiah(totalH2h)}
      </td>
      <td className="py-2.5 px-3 text-right border border-slate-300 font-mono">
        {formatRupiah(totalEdufin)}
      </td>
      <td className="py-2.5 px-3 text-right border border-slate-300 font-mono">
        {formatRupiah(totalDeposit)}
      </td>
      <td className="py-2.5 px-3 text-right border border-slate-300 font-mono">
        {formatRupiah(totalSimponi)}
      </td>
      <td className="py-2.5 px-3 text-right border border-slate-300 font-mono text-blue-900 font-bold">
        {formatRupiah(grandTotal)}
      </td>
      <td className="py-2.5 px-3 text-center border border-slate-300 font-mono">
        {totalJumlahPembayaran.toLocaleString("id-ID")}
      </td>
    </tr>
  );

  const handleAction = onCetakFormat || onLihatTabBaru;

  return (
    <div
      id="rekap-pembayaran-preview-section"
      className="bg-white rounded shadow-md border-t-4 border-t-blue-600 p-6 mb-10 transition-all animate-fade-in"
    >
      {/* Header Preview & Action Button */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Preview Laporan Rekap Pembayaran
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Periode: {periodePembayaran || "Semua Periode"} | Prodi:{" "}
            {prodi || "Semua Prodi"} | Penerima: {penerima || "Semua"} | Metode:{" "}
            {metodePembayaran || "Semua"} | Channel: {channel || "Semua"} |
            Format: {selectedFormat}
          </p>
        </div>

        {/* Tombol Cetak ({selectedFormat}) */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleAction}
            className="px-3.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold rounded flex items-center gap-1.5 transition-colors cursor-pointer border border-blue-200 shadow-sm active:scale-95"
            title={`Cetak dalam format ${selectedFormat}`}
          >
            <IoPrintOutline size={16} />
            <span>Cetak ({selectedFormat})</span>
          </button>
        </div>
      </div>

      {/* Kop Laporan Resmi UIKA jika opsi Gunakan KOP aktif */}
      {useKop && (
        <KopLaporan
          title="LAPORAN REKAPITULASI PEMBAYARAN"
          periode={periodePembayaran || ""}
        />
      )}

      {/* Tabel Data Menggunakan ListTable Reusable Component */}
      <div className="w-full text-xs">
        <ListTable<RekapPembayaranRowData>
          data={data}
          columns={columns}
          rowKey={(row) => `${row.no}-${row.prodi}`}
          pageSize={10}
          pageSizeOptions={[10, 25, 50, 100]}
          emptyMessage="Tidak ada data rekapitulasi pembayaran"
          showFooter={true}
          footerRow={footerRow}
        />
      </div>
    </div>
  );
};

export default LaporanRekapPembayaranPreview;

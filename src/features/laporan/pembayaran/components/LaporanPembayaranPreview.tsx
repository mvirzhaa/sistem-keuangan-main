import React from "react";
import { IoPrintOutline } from "react-icons/io5";
import ListTable, { type Column } from "../../../../components/tables/ListTable";
import { KopLaporan } from "../../tagihan/components/KopLaporan";
import type { PembayaranRowData } from "../utils/generateLaporanPembayaranHtml";

interface LaporanPembayaranPreviewProps {
  useKop?: boolean;
  periodePembayaran: string[];
  metodePembayaran: string;
  channel: string;
  penerima: string;
  selectedFormat: string;
  data: PembayaranRowData[];
  formatRupiah: (num: number) => string;
  onLihatTabBaru: () => void;
  onCetakFormat?: () => void;
}

export const LaporanPembayaranPreview: React.FC<LaporanPembayaranPreviewProps> = ({
  useKop = true,
  periodePembayaran,
  metodePembayaran,
  channel,
  penerima,
  selectedFormat,
  data,
  formatRupiah,
  onLihatTabBaru,
  onCetakFormat,
}) => {
  const totalNominal = data.reduce(
    (acc, curr) => acc + (curr.status === "Batal" || curr.status === "Ya" ? 0 : curr.nominal),
    0
  );

  // Definisi Kolom ListTable (11 kolom sesuai Gambar 1)
  const columns: Column<PembayaranRowData>[] = [
    {
      key: "no",
      header: "No.",
      sortable: true,
      className: "text-center py-2.5 px-2.5 border border-slate-300 text-xs",
      headerClassName: "text-center py-2.5 px-2.5 border border-slate-300 font-semibold whitespace-nowrap",
      width: "45px",
      render: (item) => <span>{item.no}</span>,
    },
    {
      key: "kodePembayaran",
      header: "Kode Pembayaran",
      sortable: true,
      className: "py-2.5 px-3 border border-slate-300 text-xs font-semibold text-blue-900 whitespace-nowrap font-mono",
      headerClassName: "text-left py-2.5 px-3 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => item.kodePembayaran,
    },
    {
      key: "nim",
      header: "NIM / Kode Pendaftar",
      sortable: true,
      className: "text-center py-2.5 px-3 border border-slate-300 text-xs font-mono text-gray-800 whitespace-nowrap",
      headerClassName: "text-center py-2.5 px-3 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => item.nim,
    },
    {
      key: "nama",
      header: "Nama",
      sortable: true,
      className: "py-2.5 px-3 border border-slate-300 text-xs font-medium text-gray-900 whitespace-nowrap",
      headerClassName: "text-left py-2.5 px-3 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => item.nama,
    },
    {
      key: "prodi",
      header: "Program Studi",
      sortable: true,
      className: "py-2.5 px-3 border border-slate-300 text-xs text-gray-700 whitespace-nowrap",
      headerClassName: "text-left py-2.5 px-3 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => item.prodi,
    },
    {
      key: "periode",
      header: "Periode",
      sortable: true,
      className: "text-center py-2.5 px-2.5 border border-slate-300 text-xs whitespace-nowrap",
      headerClassName: "text-center py-2.5 px-2.5 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => item.periode,
    },
    {
      key: "metodePembayaran",
      header: "Metode Pembayaran",
      sortable: true,
      className: "py-2.5 px-3 border border-slate-300 text-xs text-gray-800 whitespace-nowrap",
      headerClassName: "text-left py-2.5 px-3 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => item.metodePembayaran,
    },
    {
      key: "channel",
      header: "Channel",
      sortable: true,
      className: "py-2.5 px-3 border border-slate-300 text-xs text-gray-700 whitespace-nowrap",
      headerClassName: "text-left py-2.5 px-3 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => item.channel,
    },
    {
      key: "tanggalBayar",
      header: "Tanggal",
      sortable: true,
      className: "text-center py-2.5 px-3 border border-slate-300 text-xs text-gray-600 whitespace-nowrap",
      headerClassName: "text-center py-2.5 px-3 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => item.tanggalBayar,
    },
    {
      key: "nominal",
      header: "Nominal",
      sortable: true,
      className: "text-right py-2.5 px-3 border border-slate-300 text-xs font-mono font-semibold text-emerald-700 whitespace-nowrap",
      headerClassName: "text-right py-2.5 px-3 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => formatRupiah(item.nominal),
    },
    {
      key: "status",
      header: "Status Pembatalan",
      sortable: true,
      className: "text-center py-2.5 px-3 border border-slate-300 text-xs whitespace-nowrap",
      headerClassName: "text-center py-2.5 px-3 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => (
        <span
          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
            item.status === "Batal" || item.status === "Ya"
              ? "bg-rose-100 text-rose-800"
              : "bg-emerald-100 text-emerald-800"
          }`}
        >
          {item.status}
        </span>
      ),
    },
  ];

  const footerRow = (
    <tr className="bg-gray-100 font-bold text-gray-900 border-t-2 border-gray-300">
      <td
        colSpan={9}
        className="py-2.5 px-3 text-center border border-slate-300 font-semibold"
      >
        TOTAL KESELURUHAN (AKTIF)
      </td>
      <td className="py-2.5 px-3 text-right border border-slate-300 font-mono text-emerald-700 font-bold">
        {formatRupiah(totalNominal)}
      </td>
      <td className="py-2.5 px-3 text-center border border-slate-300"></td>
    </tr>
  );

  const handleAction = onCetakFormat || onLihatTabBaru;

  return (
    <div
      id="pembayaran-preview-section"
      className="bg-white rounded shadow-md border-t-4 border-t-blue-600 p-6 mb-10 transition-all animate-fade-in"
    >
      {/* Header Preview & Action Button */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Preview Laporan Pembayaran
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Periode:{" "}
            {periodePembayaran.length > 0
              ? periodePembayaran.join(", ")
              : "Semua Periode"}{" "}
            | Penerima: {penerima || "Semua"} | Metode:{" "}
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
          title="LAPORAN PEMBAYARAN"
          periode={
            periodePembayaran.length > 0 ? periodePembayaran.join(", ") : ""
          }
        />
      )}

      {/* Tabel Data Menggunakan ListTable Reusable Component */}
      <div className="w-full text-xs">
        <ListTable<PembayaranRowData>
          data={data}
          columns={columns}
          rowKey={(row) => `${row.no}-${row.kodePembayaran}`}
          pageSize={10}
          pageSizeOptions={[10, 25, 50, 100]}
          emptyMessage="Tidak ada data pembayaran"
          showFooter={true}
          footerRow={footerRow}
        />
      </div>
    </div>
  );
};

export default LaporanPembayaranPreview;

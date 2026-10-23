import React from "react";
import { IoPrintOutline } from "react-icons/io5";
import ListTable, { type Column } from "../../../../components/tables/ListTable";
import { KopLaporan } from "./KopLaporan";
import type { ReportRowData } from "../utils/generateLaporanHtml";

interface LaporanTagihanPreviewProps {
  useKop?: boolean;
  selectedPenerima: string;
  selectedPeriods: string[];
  selectedFormat: string;
  reportData: ReportRowData[];
  formatRupiah: (num: number) => string;
  onLihatTabBaru: () => void;
  onCetakFormat?: () => void;
}

export const LaporanTagihanPreview: React.FC<LaporanTagihanPreviewProps> = ({
  useKop = true,
  selectedPenerima,
  selectedPeriods,
  selectedFormat,
  reportData,
  formatRupiah,
  onLihatTabBaru,
  onCetakFormat,
}) => {
  // Definisi Kolom ListTable matching Image 2
  const columns: Column<ReportRowData>[] = [
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
      key: "kodeTagihan",
      header: "Kode Tagihan",
      sortable: true,
      className: "text-center font-mono py-2.5 px-2.5 border border-slate-300 text-xs text-gray-700 whitespace-nowrap",
      headerClassName: "text-center py-2.5 px-2.5 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => item.kodeTagihan,
    },
    {
      key: "nim",
      header: "NIM",
      sortable: true,
      className: "text-center font-mono py-2.5 px-2.5 border border-slate-300 text-xs text-gray-700 whitespace-nowrap",
      headerClassName: "text-center py-2.5 px-2.5 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => item.nim,
    },
    {
      key: "nama",
      header: "Nama",
      sortable: true,
      className: "py-2.5 px-3 border border-slate-300 text-xs font-semibold text-gray-900 whitespace-nowrap",
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
      className: "text-center py-2.5 px-2.5 border border-slate-300 text-xs text-gray-700 whitespace-nowrap",
      headerClassName: "text-center py-2.5 px-2.5 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => item.periode,
    },
    {
      key: "jenisTagihan",
      header: "Jenis Tagihan",
      sortable: true,
      className: "py-2.5 px-2.5 border border-slate-300 text-xs text-gray-700 whitespace-nowrap",
      headerClassName: "text-left py-2.5 px-2.5 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => item.jenisTagihan,
    },
    {
      key: "cicilan",
      header: "Cicilan",
      sortable: true,
      className: "text-center py-2.5 px-2 border border-slate-300 text-xs text-gray-700 whitespace-nowrap",
      headerClassName: "text-center py-2.5 px-2 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => item.cicilan,
    },
    {
      key: "bulan",
      header: "Bulan",
      sortable: true,
      className: "text-center py-2.5 px-2 border border-slate-300 text-xs text-gray-700 whitespace-nowrap",
      headerClassName: "text-center py-2.5 px-2 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => item.bulan,
    },
    {
      key: "nominal",
      header: "Tagihan",
      sortable: true,
      className: "text-right py-2.5 px-3 border border-slate-300 text-xs font-medium text-gray-800 whitespace-nowrap",
      headerClassName: "text-right py-2.5 px-3 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => formatRupiah(item.nominal),
    },
    {
      key: "denda",
      header: "Denda",
      sortable: true,
      className: "text-right py-2.5 px-2.5 border border-slate-300 text-xs font-medium text-gray-800 whitespace-nowrap",
      headerClassName: "text-right py-2.5 px-2.5 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => formatRupiah(item.denda),
    },
    {
      key: "potongan",
      header: "Potongan",
      sortable: true,
      className: "text-right py-2.5 px-2.5 border border-slate-300 text-xs font-medium text-gray-800 whitespace-nowrap",
      headerClassName: "text-right py-2.5 px-2.5 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => formatRupiah(item.potongan),
    },
    {
      key: "bayar",
      header: "Pembayaran",
      sortable: true,
      className: "text-right py-2.5 px-3 border border-slate-300 text-xs font-medium text-gray-800 whitespace-nowrap",
      headerClassName: "text-right py-2.5 px-3 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => formatRupiah(item.bayar),
    },
    {
      key: "status",
      header: "Lunas?",
      sortable: true,
      className: "text-center py-2.5 px-2.5 border border-slate-300 text-xs whitespace-nowrap",
      headerClassName: "text-center py-2.5 px-2.5 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => {
        const isLunas = item.status === "Lunas" || item.status === "Ya";
        return (
          <span
            className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
              isLunas
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-red-50 text-red-600 border border-red-200"
            }`}
          >
            {item.status}
          </span>
        );
      },
    },
    {
      key: "sisa",
      header: "Sisa Tagihan",
      sortable: true,
      className: "text-right py-2.5 px-3 border border-slate-300 text-xs font-bold text-gray-900 whitespace-nowrap",
      headerClassName: "text-right py-2.5 px-3 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => formatRupiah(item.sisa),
    },
    {
      key: "suspend",
      header: "Suspend?",
      sortable: true,
      className: "text-center py-2.5 px-2.5 border border-slate-300 text-xs text-gray-700 whitespace-nowrap",
      headerClassName: "text-center py-2.5 px-2.5 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => item.suspend,
    },
  ];

  const handleAction = onCetakFormat || onLihatTabBaru;

  return (
    <div
      id="report-preview-section"
      className="bg-white rounded shadow-md border-t-4 border-t-blue-600 p-6 mb-10 transition-all animate-fade-in"
    >
      {/* Header Preview & Action Button */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Preview Laporan Tagihan {selectedPenerima}
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Periode:{" "}
            {selectedPeriods.length > 0
              ? selectedPeriods.join(", ")
              : "Semua Periode"}{" "}
            | Format: {selectedFormat}
          </p>
        </div>

        {/* Tombol Cetak ({format}) sesuai permintaan user: button cetak lama dihapus, export ganti jadi cetak */}
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
          title={`TAGIHAN ${selectedPenerima.toUpperCase()}`}
          periode={selectedPeriods.length > 0 ? selectedPeriods.join(", ") : ""}
        />
      )}

      {/* Tabel Data Menggunakan ListTable Reusable Component */}
      <div className="w-full text-xs">
        <ListTable<ReportRowData>
          data={reportData}
          columns={columns}
          rowKey={(row) => row.no}
          pageSize={10}
          pageSizeOptions={[10, 25, 50, 100]}
          emptyMessage="Tidak ada data laporan tagihan"
          showFooter={true}
        />
      </div>
    </div>
  );
};

export default LaporanTagihanPreview;

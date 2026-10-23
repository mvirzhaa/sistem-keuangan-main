import React from "react";
import { IoPrintOutline } from "react-icons/io5";
import ListTable, { type Column } from "../../../../components/tables/ListTable";
import { KopLaporan } from "./KopLaporan";
import type { PivotRowData } from "../utils/generateLaporanPivotHtml";

interface LaporanPivotPreviewProps {
  useKop?: boolean;
  periodeTagihan: string[];
  unitKerja: string;
  selectedFormat: string;
  kolomPivot: string;
  pivotData: PivotRowData[];
  formatRupiah: (num: number) => string;
  onLihatTabBaru: () => void;
  onCetakFormat?: () => void;
}

export const LaporanPivotPreview: React.FC<LaporanPivotPreviewProps> = ({
  useKop = true,
  periodeTagihan,
  unitKerja,
  selectedFormat,
  kolomPivot,
  pivotData,
  formatRupiah,
  onLihatTabBaru,
  onCetakFormat,
}) => {
  const totalJumlahTagihan = pivotData.reduce(
    (acc, curr) => acc + curr.jumlahTagihan,
    0
  );
  const totalNominalTagihan = pivotData.reduce(
    (acc, curr) => acc + curr.nominalTagihan,
    0
  );
  const totalDenda = pivotData.reduce((acc, curr) => acc + curr.denda, 0);
  const totalPotongan = pivotData.reduce((acc, curr) => acc + curr.potongan, 0);
  const totalTagihan = pivotData.reduce(
    (acc, curr) => acc + curr.totalTagihan,
    0
  );
  const totalNominalBayar = pivotData.reduce(
    (acc, curr) => acc + curr.nominalBayar,
    0
  );
  const totalSisaTagihan = pivotData.reduce(
    (acc, curr) => acc + curr.sisaTagihan,
    0
  );

  // Definisi Kolom ListTable (9 kolom sesuai Gambar 3)
  const columns: Column<PivotRowData>[] = [
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
      key: "namaMahasiswa",
      header: "Nama Mahasiswa",
      sortable: true,
      className: "py-2.5 px-3 border border-slate-300 text-xs font-semibold text-gray-900 whitespace-nowrap",
      headerClassName: "text-left py-2.5 px-3 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => item.namaMahasiswa,
    },
    {
      key: "jumlahTagihan",
      header: "Jumlah Tagihan",
      sortable: true,
      className: "text-center py-2.5 px-2.5 border border-slate-300 text-xs font-mono text-gray-700 whitespace-nowrap",
      headerClassName: "text-center py-2.5 px-2.5 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => item.jumlahTagihan.toLocaleString("id-ID"),
    },
    {
      key: "nominalTagihan",
      header: "Nominal Tagihan",
      sortable: true,
      className: "text-right py-2.5 px-3 border border-slate-300 text-xs font-mono font-medium text-gray-800 whitespace-nowrap",
      headerClassName: "text-right py-2.5 px-3 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => formatRupiah(item.nominalTagihan),
    },
    {
      key: "denda",
      header: "Denda",
      sortable: true,
      className: "text-right py-2.5 px-2.5 border border-slate-300 text-xs font-mono font-medium text-gray-800 whitespace-nowrap",
      headerClassName: "text-right py-2.5 px-2.5 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => formatRupiah(item.denda),
    },
    {
      key: "potongan",
      header: "Potongan / Beasiswa",
      sortable: true,
      className: "text-right py-2.5 px-2.5 border border-slate-300 text-xs font-mono font-medium text-gray-800 whitespace-nowrap",
      headerClassName: "text-right py-2.5 px-2.5 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => formatRupiah(item.potongan),
    },
    {
      key: "totalTagihan",
      header: "Total Tagihan",
      sortable: true,
      className: "text-right py-2.5 px-3 border border-slate-300 text-xs font-mono font-semibold text-gray-900 whitespace-nowrap",
      headerClassName: "text-right py-2.5 px-3 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => formatRupiah(item.totalTagihan),
    },
    {
      key: "nominalBayar",
      header: "Nominal Bayar",
      sortable: true,
      className: "text-right py-2.5 px-3 border border-slate-300 text-xs font-mono font-medium text-emerald-700 whitespace-nowrap",
      headerClassName: "text-right py-2.5 px-3 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => formatRupiah(item.nominalBayar),
    },
    {
      key: "sisaTagihan",
      header: "Sisa Tagihan",
      sortable: true,
      className: "text-right py-2.5 px-3 border border-slate-300 text-xs font-mono font-bold text-rose-700 whitespace-nowrap",
      headerClassName: "text-right py-2.5 px-3 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => formatRupiah(item.sisaTagihan),
    },
  ];

  // Baris Total Keseluruhan untuk Footer ListTable
  const footerRow = (
    <tr className="bg-gray-100 font-bold text-gray-900 border-t-2 border-gray-300">
      <td colSpan={2} className="py-2.5 px-3 text-center border border-slate-300 font-semibold">
        TOTAL KESELURUHAN
      </td>
      <td className="py-2.5 px-3 text-center border border-slate-300 font-mono">
        {totalJumlahTagihan.toLocaleString("id-ID")}
      </td>
      <td className="py-2.5 px-3 text-right border border-slate-300 font-mono">
        {formatRupiah(totalNominalTagihan)}
      </td>
      <td className="py-2.5 px-3 text-right border border-slate-300 font-mono">
        {formatRupiah(totalDenda)}
      </td>
      <td className="py-2.5 px-3 text-right border border-slate-300 font-mono">
        {formatRupiah(totalPotongan)}
      </td>
      <td className="py-2.5 px-3 text-right border border-slate-300 font-mono">
        {formatRupiah(totalTagihan)}
      </td>
      <td className="py-2.5 px-3 text-right border border-slate-300 font-mono text-emerald-700">
        {formatRupiah(totalNominalBayar)}
      </td>
      <td className="py-2.5 px-3 text-right border border-slate-300 font-mono text-rose-700">
        {formatRupiah(totalSisaTagihan)}
      </td>
    </tr>
  );

  const handleAction = onCetakFormat || onLihatTabBaru;

  return (
    <div
      id="pivot-preview-section"
      className="bg-white rounded shadow-md border-t-4 border-t-blue-600 p-6 mb-10 transition-all animate-fade-in"
    >
      {/* Header Preview & Action Button */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Preview Laporan Pivot Tagihan
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Berdasarkan: {kolomPivot || "Program Studi"} | Periode:{" "}
            {periodeTagihan.length > 0
              ? periodeTagihan.join(", ")
              : "Semua Periode"}{" "}
            | Format: {selectedFormat}
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
          title="LAPORAN PIVOT TAGIHAN"
          periode={
            periodeTagihan.length > 0
              ? `PERIODE ${periodeTagihan.join(", ")}`
              : ""
          }
        />
      )}

      {/* Tabel Data Menggunakan ListTable Reusable Component */}
      <div className="w-full text-xs">
        <ListTable<PivotRowData>
          data={pivotData}
          columns={columns}
          rowKey={(row) => row.no}
          pageSize={10}
          pageSizeOptions={[10, 25, 50, 100]}
          emptyMessage="Tidak ada data pivot tagihan"
          showFooter={true}
          footerRow={footerRow}
        />
      </div>
    </div>
  );
};

export default LaporanPivotPreview;

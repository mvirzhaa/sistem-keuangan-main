import React from "react";
import { IoPrintOutline } from "react-icons/io5";
import ListTable, { type Column } from "../../../../components/tables/ListTable";
import { KopLaporan } from "./KopLaporan";
import type { PerwalianRowData } from "../utils/generateTagihanPerwalianHtml";

interface TagihanPerwalianPreviewProps {
  useKop?: boolean;
  periodePerwalian: string;
  selectedProdi: string;
  selectedFormat: string;
  tampilkanKontak?: boolean;
  tampilkanDenda?: string;
  reportData: PerwalianRowData[];
  formatRupiah: (num: number) => string;
  onLihatTabBaru: () => void;
  onCetakFormat?: () => void;
}

export const TagihanPerwalianPreview: React.FC<
  TagihanPerwalianPreviewProps
> = ({
  useKop = true,
  periodePerwalian,
  selectedProdi,
  selectedFormat,
  reportData,
  formatRupiah,
  onLihatTabBaru,
  onCetakFormat,
}) => {
  const totalNominal = reportData.reduce((acc, curr) => acc + curr.nominalTagihan, 0);
  const totalDenda = reportData.reduce((acc, curr) => acc + curr.denda, 0);
  const totalPotongan = reportData.reduce((acc, curr) => acc + curr.potongan, 0);
  const totalTagihan = reportData.reduce((acc, curr) => acc + curr.totalTagihan, 0);
  const totalBayar = reportData.reduce((acc, curr) => acc + curr.totalBayar, 0);
  const totalSisa = reportData.reduce((acc, curr) => acc + curr.sisaTagihan, 0);

  // Definisi Kolom ListTable (17 kolom sesuai Gambar 2)
  const columns: Column<PerwalianRowData>[] = [
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
      key: "periodeSemester",
      header: "Periode / Semester",
      sortable: true,
      className: "text-center py-2.5 px-2.5 border border-slate-300 text-xs text-gray-700 whitespace-nowrap",
      headerClassName: "text-center py-2.5 px-2.5 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => item.periodeSemester,
    },
    {
      key: "statusSemester",
      header: "Status Semester",
      sortable: true,
      className: "text-center py-2.5 px-2.5 border border-slate-300 text-xs whitespace-nowrap",
      headerClassName: "text-center py-2.5 px-2.5 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => (
        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-blue-50 text-blue-800">
          {item.statusSemester}
        </span>
      ),
    },
    {
      key: "sks",
      header: "SKS",
      sortable: true,
      className: "text-center font-mono py-2.5 px-2 border border-slate-300 text-xs text-gray-700 whitespace-nowrap",
      headerClassName: "text-center py-2.5 px-2 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => item.sks,
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
      key: "idTagihan",
      header: "ID Tagihan",
      sortable: true,
      className: "text-center font-mono py-2.5 px-2.5 border border-slate-300 text-xs text-gray-700 whitespace-nowrap",
      headerClassName: "text-center py-2.5 px-2.5 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => item.idTagihan,
    },
    {
      key: "bulanTagihan",
      header: "Bulan Tagihan",
      sortable: true,
      className: "text-center py-2.5 px-2 border border-slate-300 text-xs text-gray-700 whitespace-nowrap",
      headerClassName: "text-center py-2.5 px-2 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => item.bulanTagihan,
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
      header: "Potongan",
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
      key: "totalBayar",
      header: "Total Bayar",
      sortable: true,
      className: "text-right py-2.5 px-3 border border-slate-300 text-xs font-mono font-medium text-emerald-700 whitespace-nowrap",
      headerClassName: "text-right py-2.5 px-3 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => formatRupiah(item.totalBayar),
    },
    {
      key: "sisaTagihan",
      header: "Sisa Tagihan",
      sortable: true,
      className: "text-right py-2.5 px-3 border border-slate-300 text-xs font-mono font-bold text-rose-700 whitespace-nowrap",
      headerClassName: "text-right py-2.5 px-3 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => formatRupiah(item.sisaTagihan),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      className: "text-center py-2.5 px-2.5 border border-slate-300 text-xs whitespace-nowrap",
      headerClassName: "text-center py-2.5 px-2.5 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => {
        const isLunas = item.status === "Lunas";
        return (
          <span
            className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
              isLunas
                ? "bg-emerald-100 text-emerald-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {item.status}
          </span>
        );
      },
    },
  ];

  // Baris Total untuk Footer ListTable
  const footerRow = (
    <tr className="bg-gray-100 font-bold text-gray-900 border-t-2 border-gray-300">
      <td
        colSpan={10}
        className="py-2.5 px-3 text-center border border-slate-300 font-semibold"
      >
        TOTAL
      </td>
      <td className="py-2.5 px-3 text-right border border-slate-300 font-mono">
        {formatRupiah(totalNominal)}
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
        {formatRupiah(totalBayar)}
      </td>
      <td className="py-2.5 px-3 text-right border border-slate-300 font-mono text-rose-700">
        {formatRupiah(totalSisa)}
      </td>
      <td className="border border-slate-300"></td>
    </tr>
  );

  const handleAction = onCetakFormat || onLihatTabBaru;

  return (
    <div
      id="perwalian-preview-section"
      className="bg-white rounded shadow-md border-t-4 border-t-blue-600 p-6 mb-10 transition-all animate-fade-in"
    >
      {/* Header Preview & Action Button */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Preview Laporan Perwalian Tagihan
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Periode: {periodePerwalian || "Semua"} | Unit:{" "}
            {selectedProdi || "Universitas Ibn Khaldun"} | Format:{" "}
            {selectedFormat}
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
          title="LAPORAN PERWALIAN TAGIHAN"
          periode={periodePerwalian ? `PERIODE ${periodePerwalian}` : ""}
        />
      )}

      {/* Tabel Data Menggunakan ListTable Reusable Component */}
      <div className="w-full text-xs">
        <ListTable<PerwalianRowData>
          data={reportData}
          columns={columns}
          rowKey={(row) => row.no}
          pageSize={10}
          pageSizeOptions={[10, 25, 50, 100]}
          emptyMessage="Tidak ada data tagihan perwalian"
          showFooter={true}
          footerRow={footerRow}
        />
      </div>
    </div>
  );
};

export default TagihanPerwalianPreview;

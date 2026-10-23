import React from "react";
import { IoPrintOutline } from "react-icons/io5";
import ListTable, { type Column } from "../../../../components/tables/ListTable";
import { KopLaporan } from "../../tagihan/components/KopLaporan";
import type { LaporanManualRowData } from "../utils/generateLaporanManualHtml";

interface CetakLaporanManualPreviewProps {
  useKop?: boolean;
  namaLaporan: string;
  periodeMasuk: string;
  programStudi: string;
  gelombang: string;
  jalur: string;
  sistemKuliah: string;
  selectedFormat: string;
  data: LaporanManualRowData[];
  onLihatTabBaru: () => void;
  onCetakFormat?: () => void;
}

export const CetakLaporanManualPreview: React.FC<
  CetakLaporanManualPreviewProps
> = ({
  useKop = true,
  namaLaporan,
  periodeMasuk,
  programStudi,
  gelombang,
  jalur,
  sistemKuliah,
  selectedFormat,
  data,
  onLihatTabBaru,
  onCetakFormat,
}) => {
  const columns: Column<LaporanManualRowData>[] = [
    {
      key: "no",
      header: "NO.",
      sortable: true,
      className: "text-center py-2.5 px-3 border border-slate-300 text-xs",
      headerClassName: "text-center py-2.5 px-3 border border-slate-300 font-semibold",
      width: "50px",
      render: (item) => <span>{item.no}</span>,
    },
    {
      key: "nama",
      header: "Nama",
      sortable: true,
      className: "py-2.5 px-3 border border-slate-300 text-xs font-semibold text-gray-900",
      headerClassName: "text-left py-2.5 px-3 border border-slate-300 font-semibold",
      render: (item) => item.nama,
    },
    {
      key: "nim",
      header: "Nim",
      sortable: true,
      className: "text-center py-2.5 px-3 border border-slate-300 text-xs font-mono text-gray-800",
      headerClassName: "text-center py-2.5 px-3 border border-slate-300 font-semibold",
      render: (item) => item.nim,
    },
    {
      key: "prodi",
      header: "Prodi",
      sortable: true,
      className: "py-2.5 px-3 border border-slate-300 text-xs text-gray-700",
      headerClassName: "text-left py-2.5 px-3 border border-slate-300 font-semibold",
      render: (item) => item.prodi,
    },
    {
      key: "periodeMasuk",
      header: "Periode Masuk",
      sortable: true,
      className: "text-center py-2.5 px-3 border border-slate-300 text-xs font-medium text-blue-900",
      headerClassName: "text-center py-2.5 px-3 border border-slate-300 font-semibold",
      render: (item) => item.periodeMasuk,
    },
    {
      key: "gelombang",
      header: "Gelombang",
      sortable: true,
      className: "text-center py-2.5 px-3 border border-slate-300 text-xs text-gray-700",
      headerClassName: "text-center py-2.5 px-3 border border-slate-300 font-semibold",
      render: (item) => item.gelombang,
    },
    {
      key: "jalur",
      header: "Jalur Pendaftaran",
      sortable: true,
      className: "py-2.5 px-3 border border-slate-300 text-xs text-gray-700",
      headerClassName: "text-left py-2.5 px-3 border border-slate-300 font-semibold",
      render: (item) => item.jalur,
    },
    {
      key: "sistemKuliah",
      header: "Sistem Kuliah",
      sortable: true,
      className: "text-center py-2.5 px-3 border border-slate-300 text-xs text-gray-700",
      headerClassName: "text-center py-2.5 px-3 border border-slate-300 font-semibold",
      render: (item) => item.sistemKuliah,
    },
  ];

  const footerRow = (
    <tr className="bg-gray-100 font-bold text-gray-900 border-t-2 border-gray-300">
      <td
        colSpan={8}
        className="py-2.5 px-3 text-center border border-slate-300 font-semibold"
      >
        TOTAL KESELURUHAN: {data.length} MAHASISWA
      </td>
    </tr>
  );

  return (
    <div
      id="cetak-laporan-manual-preview"
      className="bg-white rounded shadow-md border-t-4 border-t-blue-600 p-6 mb-10 transition-all animate-fade-in"
    >
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-gray-200 mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-800">
            Preview {namaLaporan}
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Daftar data laporan manual sesuai parameter pencarian
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onCetakFormat || onLihatTabBaru}
            className="px-3.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold rounded flex items-center gap-1.5 transition-colors cursor-pointer border border-blue-200 shadow-sm active:scale-95"
            title={`Cetak dalam format ${selectedFormat}`}
          >
            <IoPrintOutline size={16} />
            <span>Cetak ({selectedFormat})</span>
          </button>
        </div>
      </div>

      {/* KOP UIKA Resmi */}
      {useKop && <KopLaporan />}

      {/* Header Info */}
      <div className="text-center my-4">
        <h3 className="text-base font-bold text-gray-900 tracking-wide uppercase">
          {namaLaporan}
        </h3>
        <p className="text-xs text-gray-600 mt-1">
          {periodeMasuk && periodeMasuk !== "-- Semua Pilihan --" && (
            <>
              Periode Masuk: <span className="font-semibold">{periodeMasuk}</span>
            </>
          )}
          {programStudi && programStudi !== "-- Semua Pilihan --" && (
            <>
              {" | "}Program Studi:{" "}
              <span className="font-semibold">{programStudi}</span>
            </>
          )}
          {gelombang && gelombang !== "-- Semua Pilihan --" && (
            <>
              {" | "}Gelombang: <span className="font-semibold">{gelombang}</span>
            </>
          )}
        </p>
      </div>

      {/* Data Table with ListTable */}
      <div className="mt-4 text-xs">
        <ListTable
          columns={columns}
          data={data}
          loading={false}
          rowKey={(item) => item.no}
          emptyMessage="Tidak ada data yang ditemukan."
          footerRow={footerRow}
        />
      </div>
    </div>
  );
};

import React from "react";
import { IoPrintOutline } from "react-icons/io5";
import ListTable, { type Column } from "../../../../components/tables/ListTable";
import { KopLaporan } from "../../tagihan/components/KopLaporan";
import type { LaporanPenerimaPotonganRowData } from "../utils/generateLaporanPotonganHtml";

interface LaporanPenerimaPotonganPreviewProps {
  useKop?: boolean;
  tahunAkademik: string;
  programStudi: string;
  jenisPotongan: string;
  namaPotongan: string;
  penerima: string;
  selectedFormat: string;
  data: LaporanPenerimaPotonganRowData[];
  formatRupiah: (num: number) => string;
  onLihatTabBaru: () => void;
  onCetakFormat?: () => void;
}

export const LaporanPenerimaPotonganPreview: React.FC<
  LaporanPenerimaPotonganPreviewProps
> = ({
  useKop = true,
  tahunAkademik,
  programStudi,
  jenisPotongan,
  namaPotongan,
  penerima,
  selectedFormat,
  data,
  formatRupiah,
  onLihatTabBaru,
  onCetakFormat,
}) => {
  const totalNominal = data.reduce(
    (acc, curr) => acc + (curr.nominal ?? curr.nominalPotongan ?? 0),
    0
  );

  const columns: Column<LaporanPenerimaPotonganRowData>[] = [
    {
      key: "no",
      header: "No.",
      sortable: true,
      className: "text-center py-2.5 px-3 border border-slate-300 text-xs",
      headerClassName: "text-center py-2.5 px-3 border border-slate-300 font-semibold",
      width: "50px",
      render: (item) => <span>{item.no}</span>,
    },
    {
      key: "nim",
      header: "NIM",
      sortable: true,
      className: "text-center py-2.5 px-3 border border-slate-300 text-xs font-mono text-gray-800",
      headerClassName: "text-center py-2.5 px-3 border border-slate-300 font-semibold",
      render: (item) => item.nim,
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
      key: "prodi",
      header: "Program Studi",
      sortable: true,
      className: "py-2.5 px-3 border border-slate-300 text-xs text-gray-700",
      headerClassName: "text-left py-2.5 px-3 border border-slate-300 font-semibold",
      render: (item) => item.prodi,
    },
    {
      key: "sumber",
      header: "Sumber",
      sortable: true,
      className: "py-2.5 px-3 border border-slate-300 text-xs text-gray-700 font-medium",
      headerClassName: "text-left py-2.5 px-3 border border-slate-300 font-semibold",
      render: (item) => item.sumber || item.jenisPotongan || "-",
    },
    {
      key: "potongan",
      header: "Potongan",
      sortable: true,
      className: "py-2.5 px-3 border border-slate-300 text-xs text-gray-800 font-medium",
      headerClassName: "text-left py-2.5 px-3 border border-slate-300 font-semibold",
      render: (item) => item.potongan || item.namaPotongan || "-",
    },
    {
      key: "nominal",
      header: "Nominal",
      sortable: true,
      className: "text-right py-2.5 px-3 border border-slate-300 text-xs font-mono font-semibold text-blue-900",
      headerClassName: "text-right py-2.5 px-3 border border-slate-300 font-semibold",
      render: (item) => formatRupiah(item.nominal ?? item.nominalPotongan ?? 0),
    },
    {
      key: "persentase",
      header: "Persentase",
      sortable: true,
      className: "text-center py-2.5 px-3 border border-slate-300 text-xs font-mono text-gray-800",
      headerClassName: "text-center py-2.5 px-3 border border-slate-300 font-semibold",
      render: (item) =>
        item.persentase
          ? typeof item.persentase === "number"
            ? `${item.persentase}%`
            : item.persentase
          : "-",
    },
    {
      key: "digunakan",
      header: "Digunakan",
      sortable: true,
      className: "text-center py-2.5 px-3 border border-slate-300 text-xs font-medium",
      headerClassName: "text-center py-2.5 px-3 border border-slate-300 font-semibold",
      render: (item) => (
        <span
          className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
            item.digunakan === "Ya" || item.status === "Aktif" || item.status === "Disetujui"
              ? "bg-green-100 text-green-800 border border-green-200"
              : "bg-blue-100 text-blue-800 border border-blue-200"
          }`}
        >
          {item.digunakan || item.status || "Ya"}
        </span>
      ),
    },
  ];

  const footerRow = (
    <tr className="bg-gray-100 font-bold text-gray-900 border-t-2 border-gray-300">
      <td
        colSpan={6}
        className="py-2.5 px-3 text-center border border-slate-300 font-semibold"
      >
        TOTAL KESELURUHAN ({data.length} PENERIMA)
      </td>
      <td className="py-2.5 px-3 text-right border border-slate-300 font-mono text-blue-900 font-bold">
        {formatRupiah(totalNominal)}
      </td>
      <td className="py-2.5 px-3 text-center border border-slate-300"></td>
      <td className="py-2.5 px-3 text-center border border-slate-300"></td>
    </tr>
  );

  return (
    <div
      id="laporan-penerima-potongan-preview"
      className="bg-white rounded shadow-md border-t-4 border-t-blue-600 p-6 mb-10 transition-all animate-fade-in"
    >
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-gray-200 mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-800">
            Preview Laporan Penerima Potongan
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Daftar mahasiswa penerima potongan tarif atau beasiswa
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
          LAPORAN PENERIMA POTONGAN
        </h3>
        <p className="text-xs text-gray-600 mt-1">
          Tahun Akademik: <span className="font-semibold">{tahunAkademik}</span>
          {programStudi && (
            <>
              {" | "}Program Studi:{" "}
              <span className="font-semibold">{programStudi}</span>
            </>
          )}
          {jenisPotongan && (
            <>
              {" | "}Jenis:{" "}
              <span className="font-semibold text-blue-700">
                {jenisPotongan}
              </span>
            </>
          )}
          {namaPotongan &&
            namaPotongan !== "-- Pilih Nama Potongan --" && (
              <>
                {" | "}Nama:{" "}
                <span className="font-semibold">{namaPotongan}</span>
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
          emptyMessage="Tidak ada data penerima potongan yang ditemukan."
          footerRow={footerRow}
        />
      </div>
    </div>
  );
};

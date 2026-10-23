import React from "react";
import { IoPrintOutline } from "react-icons/io5";
import ListTable, { type Column } from "../../../../components/tables/ListTable";
import { KopLaporan } from "../../tagihan/components/KopLaporan";
import type { RekapPotonganBeasiswaRowData } from "../utils/generateLaporanPotonganHtml";

interface RekapPotonganBeasiswaPreviewProps {
  useKop?: boolean;
  jenisPotongan: string;
  rekanan: string;
  periodeAwal: string;
  periodeAkhir: string;
  selectedFormat: string;
  data: RekapPotonganBeasiswaRowData[];
  formatRupiah: (num: number) => string;
  onLihatTabBaru: () => void;
  onCetakFormat?: () => void;
}

export const RekapPotonganBeasiswaPreview: React.FC<
  RekapPotonganBeasiswaPreviewProps
> = ({
  useKop = true,
  jenisPotongan,
  rekanan,
  periodeAwal,
  periodeAkhir,
  selectedFormat,
  data,
  formatRupiah,
  onLihatTabBaru,
  onCetakFormat,
}) => {
  const totalNominal = data.reduce(
    (acc, curr) => acc + (curr.nominal ?? curr.totalNominal ?? 0),
    0
  );
  const totalAnggaran = data.reduce(
    (acc, curr) => acc + (typeof curr.anggaran === "number" ? curr.anggaran : 0),
    0
  );
  const totalDigunakan = data.reduce(
    (acc, curr) => acc + (typeof curr.digunakan === "number" ? curr.digunakan : 0),
    0
  );

  const columns: Column<RekapPotonganBeasiswaRowData>[] = [
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
      key: "namaPotongan",
      header: "Nama Potongan",
      sortable: true,
      className: "py-2.5 px-3 border border-slate-300 text-xs font-semibold text-gray-900",
      headerClassName: "text-left py-2.5 px-3 border border-slate-300 font-semibold",
      render: (item) => item.namaPotongan,
    },
    {
      key: "rekanan",
      header: "Rekanan",
      sortable: true,
      className: "py-2.5 px-3 border border-slate-300 text-xs text-gray-700 font-medium",
      headerClassName: "text-left py-2.5 px-3 border border-slate-300 font-semibold",
      render: (item) => item.rekanan,
    },
    {
      key: "periodeAwal",
      header: "Periode Awal",
      sortable: true,
      className: "text-center py-2.5 px-3 border border-slate-300 text-xs font-mono text-gray-700",
      headerClassName: "text-center py-2.5 px-3 border border-slate-300 font-semibold",
      render: (item) => item.periodeAwal || "-",
    },
    {
      key: "periodeAkhir",
      header: "Periode Akhir",
      sortable: true,
      className: "text-center py-2.5 px-3 border border-slate-300 text-xs font-mono text-gray-700",
      headerClassName: "text-center py-2.5 px-3 border border-slate-300 font-semibold",
      render: (item) => item.periodeAkhir || "-",
    },
    {
      key: "nominal",
      header: "Nominal",
      sortable: true,
      className: "text-right py-2.5 px-3 border border-slate-300 text-xs font-mono font-semibold text-blue-900",
      headerClassName: "text-right py-2.5 px-3 border border-slate-300 font-semibold",
      render: (item) => formatRupiah(item.nominal ?? item.totalNominal ?? 0),
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
      key: "anggaran",
      header: "Anggaran",
      sortable: true,
      className: "text-right py-2.5 px-3 border border-slate-300 text-xs font-mono font-semibold text-emerald-700",
      headerClassName: "text-right py-2.5 px-3 border border-slate-300 font-semibold",
      render: (item) => (item.anggaran ? formatRupiah(item.anggaran) : "-"),
    },
    {
      key: "digunakan",
      header: "Digunakan",
      sortable: true,
      className: "text-center py-2.5 px-3 border border-slate-300 text-xs font-mono text-gray-800",
      headerClassName: "text-center py-2.5 px-3 border border-slate-300 font-semibold",
      render: (item) =>
        typeof item.digunakan === "number"
          ? formatRupiah(item.digunakan)
          : item.digunakan || `${item.jumlahPenerima || 0} Orang`,
    },
  ];

  const footerRow = (
    <tr className="bg-gray-100 font-bold text-gray-900 border-t-2 border-gray-300">
      <td
        colSpan={5}
        className="py-2.5 px-3 text-center border border-slate-300 font-semibold"
      >
        TOTAL KESELURUHAN REKAP
      </td>
      <td className="py-2.5 px-3 text-right border border-slate-300 font-mono text-blue-900 font-bold">
        {formatRupiah(totalNominal)}
      </td>
      <td className="py-2.5 px-3 text-center border border-slate-300"></td>
      <td className="py-2.5 px-3 text-right border border-slate-300 font-mono text-emerald-700 font-bold">
        {totalAnggaran > 0 ? formatRupiah(totalAnggaran) : "-"}
      </td>
      <td className="py-2.5 px-3 text-center border border-slate-300 font-mono font-bold">
        {totalDigunakan > 0 ? formatRupiah(totalDigunakan) : "-"}
      </td>
    </tr>
  );

  return (
    <div
      id="rekap-potongan-beasiswa-preview"
      className="bg-white rounded shadow-md border-t-4 border-t-blue-600 p-6 mb-10 transition-all animate-fade-in"
    >
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-gray-200 mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-800">
            Preview Rekap Potongan / Beasiswa
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Rekapitulasi total penerima dan anggaran program potongan atau beasiswa
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
          REKAP POTONGAN / BEASISWA
        </h3>
        <p className="text-xs text-gray-600 mt-1">
          Jenis: <span className="font-semibold text-blue-700">{jenisPotongan}</span>
          {rekanan && rekanan !== "-- Pilih Rekanan --" && (
            <>
              {" | "}Rekanan: <span className="font-semibold">{rekanan}</span>
            </>
          )}
          {periodeAwal && periodeAkhir && (
            <>
              {" | "}Periode:{" "}
              <span className="font-semibold">
                {periodeAwal} s/d {periodeAkhir}
              </span>
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
          emptyMessage="Tidak ada data rekap potongan yang ditemukan."
          footerRow={footerRow}
        />
      </div>
    </div>
  );
};

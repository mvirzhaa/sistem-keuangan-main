import React from "react";
import { IoPrintOutline } from "react-icons/io5";
import ListTable, { type Column } from "../../../../components/tables/ListTable";
import { KopLaporan } from "../../tagihan/components/KopLaporan";
import type { PivotPembayaranRowData } from "../utils/generatePembayaranAkhirHtml";

interface PivotPembayaranPreviewProps {
  useKop?: boolean;
  unitKerja: string;
  kolomPivot: string;
  tglAwal: string;
  tglAkhir: string;
  selectedFormat: string;
  data: PivotPembayaranRowData[];
  formatRupiah: (num: number) => string;
  onLihatTabBaru: () => void;
  onCetakFormat?: () => void;
}

export const PivotPembayaranPreview: React.FC<PivotPembayaranPreviewProps> = ({
  useKop = true,
  unitKerja,
  kolomPivot,
  tglAwal,
  tglAkhir,
  selectedFormat,
  data,
  formatRupiah,
  onLihatTabBaru,
  onCetakFormat,
}) => {
  const grandTotalNominal = data.reduce(
    (acc, curr) => acc + (curr.totalNominal || 0),
    0
  );

  const columns: Column<PivotPembayaranRowData>[] = [
    {
      key: "no",
      header: "No.",
      sortable: true,
      className: "text-center py-2.5 px-3 border border-slate-300 text-xs w-12",
      headerClassName: "text-center py-2.5 px-3 border border-slate-300 font-semibold w-12",
      render: (item) => <span>{item.no}</span>,
    },
    {
      key: "namaMahasiswa",
      header: "Nama Mahasiswa",
      sortable: true,
      className: "py-2.5 px-3 border border-slate-300 text-xs font-semibold text-gray-900",
      headerClassName: "text-left py-2.5 px-3 border border-slate-300 font-semibold",
      render: (item) => item.namaMahasiswa || item.pivotKey || "-",
    },
    {
      key: "totalNominal",
      header: "Total Nominal",
      sortable: true,
      className: "text-right py-2.5 px-3 border border-slate-300 text-xs font-mono font-bold text-blue-900 w-52",
      headerClassName: "text-right py-2.5 px-3 border border-slate-300 font-semibold w-52",
      render: (item) => formatRupiah(item.totalNominal || 0),
    },
  ];

  const footerRow = (
    <tr className="bg-gray-100 font-bold text-gray-900 border-t-2 border-gray-300">
      <td
        colSpan={2}
        className="py-2.5 px-3 text-center border border-slate-300 font-semibold"
      >
        TOTAL KESELURUHAN
      </td>
      <td className="py-2.5 px-3 text-right border border-slate-300 font-mono text-blue-900 font-bold">
        {formatRupiah(grandTotalNominal)}
      </td>
    </tr>
  );

  const handleAction = onCetakFormat || onLihatTabBaru;

  return (
    <div
      id="pivot-pembayaran-preview-section"
      className="bg-white rounded shadow-md border-t-4 border-t-blue-600 p-6 mb-10 transition-all animate-fade-in"
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Preview Laporan Pivot Pembayaran
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Unit: {unitKerja || "Universitas Ibn Khaldun"} | Kolom Pivot:{" "}
            <b className="text-blue-700">{kolomPivot}</b> | Rentang: {tglAwal}{" "}
            s.d. {tglAkhir} | Format: {selectedFormat}
          </p>
        </div>
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

      {useKop && (
        <KopLaporan
          title="LAPORAN PIVOT PEMBAYARAN"
          periode={`${tglAwal} s.d. ${tglAkhir}`}
        />
      )}

      <div className="w-full text-xs">
        <ListTable<PivotPembayaranRowData>
          data={data}
          columns={columns}
          rowKey={(row) => `${row.no}-${row.pivotKey}`}
          pageSize={10}
          pageSizeOptions={[10, 25, 50, 100]}
          emptyMessage="Tidak ada data pivot pembayaran"
          showFooter={true}
          footerRow={footerRow}
        />
      </div>
    </div>
  );
};

export default PivotPembayaranPreview;

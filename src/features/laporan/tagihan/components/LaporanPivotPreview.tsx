import React from "react";
import { IoPrintOutline, IoDownloadOutline } from "react-icons/io5";
import type { PivotRowData } from "../utils/generateLaporanPivotHtml";

interface LaporanPivotPreviewProps {
  periodeTagihan: string[];
  unitKerja: string;
  selectedFormat: string;
  kolomPivot: string;
  pivotData: PivotRowData[];
  formatRupiah: (num: number) => string;
  onLihatTabBaru: () => void;
  onPrint?: () => void;
}

export const LaporanPivotPreview: React.FC<LaporanPivotPreviewProps> = ({
  periodeTagihan,
  unitKerja,
  selectedFormat,
  kolomPivot,
  pivotData,
  formatRupiah,
  onLihatTabBaru,
  onPrint = () => window.print(),
}) => {
  const totalBelumBayar = pivotData.reduce(
    (acc, curr) => acc + curr.belumBayar,
    0,
  );
  const totalBelumLunas = pivotData.reduce(
    (acc, curr) => acc + curr.belumLunas,
    0,
  );
  const totalLunas = pivotData.reduce((acc, curr) => acc + curr.lunas, 0);
  const totalDispensasi = pivotData.reduce(
    (acc, curr) => acc + curr.dispensasi,
    0,
  );
  const totalTagihan = pivotData.reduce(
    (acc, curr) => acc + curr.totalTagihan,
    0,
  );
  const totalTerbayar = pivotData.reduce(
    (acc, curr) => acc + curr.totalTerbayar,
    0,
  );
  const totalSisa = pivotData.reduce((acc, curr) => acc + curr.sisaPiutang, 0);
  const overallPct =
    totalTagihan > 0 ? ((totalTerbayar / totalTagihan) * 100).toFixed(1) : "0";

  return (
    <div
      id="pivot-preview-section"
      className="bg-white rounded shadow-md border-t-4 border-t-blue-600 p-6 mb-10 transition-all animate-fade-in"
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Preview Laporan Pivot Tagihan
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Berdasarkan: <b className="text-blue-700">{kolomPivot}</b> |
            Periode:{" "}
            {periodeTagihan.length > 0
              ? periodeTagihan.join(", ")
              : "Semua Periode"}{" "}
            | Unit: {unitKerja || "Universitas Ibn Khaldun"} | Format:{" "}
            {selectedFormat}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPrint}
            className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded flex items-center gap-1 transition-colors cursor-pointer"
          >
            <IoPrintOutline size={16} />
            <span>Cetak</span>
          </button>
          <button
            type="button"
            onClick={onLihatTabBaru}
            className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-medium rounded flex items-center gap-1 transition-colors cursor-pointer"
          >
            <IoDownloadOutline size={16} />
            <span>Export ({selectedFormat})</span>
          </button>
        </div>
      </div>

      {/* Table Pivot Data */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left border border-gray-200">
          <thead className="bg-[#1e3a8a] text-white">
            <tr>
              <th className="py-2.5 px-3 text-center border">No</th>
              <th className="py-2.5 px-3 border">{kolomPivot}</th>
              <th className="py-2.5 px-3 text-right border">Belum Bayar</th>
              <th className="py-2.5 px-3 text-right border">Belum Lunas</th>
              <th className="py-2.5 px-3 text-right border">Lunas</th>
              <th className="py-2.5 px-3 text-right border">Dispensasi</th>
              <th className="py-2.5 px-3 text-right border">Total Tagihan</th>
              <th className="py-2.5 px-3 text-right border">Total Terbayar</th>
              <th className="py-2.5 px-3 text-right border">Sisa Piutang</th>
              <th className="py-2.5 px-3 text-center border">% Terbayar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {pivotData.map((row) => (
              <tr key={row.no} className="hover:bg-gray-50">
                <td className="py-2 px-3 text-center border">{row.no}</td>
                <td className="py-2 px-3 font-semibold text-gray-900 border">
                  {row.pivotKey}
                </td>
                <td className="py-2 px-3 text-right border font-mono text-rose-600">
                  {formatRupiah(row.belumBayar)}
                </td>
                <td className="py-2 px-3 text-right border font-mono text-amber-600">
                  {formatRupiah(row.belumLunas)}
                </td>
                <td className="py-2 px-3 text-right border font-mono text-emerald-600">
                  {formatRupiah(row.lunas)}
                </td>
                <td className="py-2 px-3 text-right border font-mono">
                  {formatRupiah(row.dispensasi)}
                </td>
                <td className="py-2 px-3 text-right border font-mono font-medium">
                  {formatRupiah(row.totalTagihan)}
                </td>
                <td className="py-2 px-3 text-right border font-mono font-semibold text-emerald-700">
                  {formatRupiah(row.totalTerbayar)}
                </td>
                <td className="py-2 px-3 text-right border font-mono font-semibold text-rose-700">
                  {formatRupiah(row.sisaPiutang)}
                </td>
                <td className="py-2 px-3 text-center border">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      row.persentaseTerbayar >= 70
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {row.persentaseTerbayar}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-100 font-semibold text-gray-900 border-t-2 border-gray-300">
            <tr>
              <td colSpan={2} className="py-2.5 px-3 text-center border">
                TOTAL KESELURUHAN
              </td>
              <td className="py-2.5 px-3 text-right border font-mono text-rose-600">
                {formatRupiah(totalBelumBayar)}
              </td>
              <td className="py-2.5 px-3 text-right border font-mono text-amber-600">
                {formatRupiah(totalBelumLunas)}
              </td>
              <td className="py-2.5 px-3 text-right border font-mono text-emerald-600">
                {formatRupiah(totalLunas)}
              </td>
              <td className="py-2.5 px-3 text-right border font-mono">
                {formatRupiah(totalDispensasi)}
              </td>
              <td className="py-2.5 px-3 text-right border font-mono">
                {formatRupiah(totalTagihan)}
              </td>
              <td className="py-2.5 px-3 text-right border font-mono text-emerald-700">
                {formatRupiah(totalTerbayar)}
              </td>
              <td className="py-2.5 px-3 text-right border font-mono text-rose-700">
                {formatRupiah(totalSisa)}
              </td>
              <td className="py-2.5 px-3 text-center border">
                {overallPct}%
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

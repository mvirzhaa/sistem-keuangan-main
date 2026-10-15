import React from "react";
import { IoPrintOutline, IoDownloadOutline } from "react-icons/io5";
import type { RekapRowData } from "../utils/generateLaporanRekapHtml";

interface LaporanRekapTagihanPreviewProps {
  tahunAkademik: string;
  selectedProdi: string;
  selectedFormat: string;
  rekapData: RekapRowData[];
  formatRupiah: (num: number) => string;
  onLihatTabBaru: () => void;
  onPrint?: () => void;
}

export const LaporanRekapTagihanPreview: React.FC<
  LaporanRekapTagihanPreviewProps
> = ({
  tahunAkademik,
  selectedProdi,
  selectedFormat,
  rekapData,
  formatRupiah,
  onLihatTabBaru,
  onPrint = () => window.print(),
}) => {
  const totalTagihanCount = rekapData.reduce(
    (acc, curr) => acc + curr.jumlahTagihan,
    0,
  );
  const totalNominal = rekapData.reduce(
    (acc, curr) => acc + curr.nominalTagihan,
    0,
  );
  const totalPotongan = rekapData.reduce((acc, curr) => acc + curr.potongan, 0);
  const totalTerbayar = rekapData.reduce((acc, curr) => acc + curr.terbayar, 0);
  const totalSisa = rekapData.reduce((acc, curr) => acc + curr.sisaPiutang, 0);
  const overallPercentage =
    totalNominal > 0 ? ((totalTerbayar / totalNominal) * 100).toFixed(1) : "0";

  return (
    <div
      id="rekap-preview-section"
      className="bg-white rounded shadow-md border-t-4 border-t-blue-600 p-6 mb-10 transition-all animate-fade-in"
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Preview Laporan Rekapitulasi Tagihan
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Tahun: {tahunAkademik || "Semua"} | Unit:{" "}
            {selectedProdi || "Universitas Ibn Khaldun"} | Format:{" "}
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

      {/* Table Rekap Data */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left border border-gray-200">
          <thead className="bg-[#1e3a8a] text-white">
            <tr>
              <th className="py-2.5 px-3 text-center border">No</th>
              <th className="py-2.5 px-3 border">Program Studi</th>
              <th className="py-2.5 px-3 border">Jenis Tagihan</th>
              <th className="py-2.5 px-3 text-center border">Jml Tagihan</th>
              <th className="py-2.5 px-3 text-right border">Total Nominal</th>
              <th className="py-2.5 px-3 text-right border">Total Potongan</th>
              <th className="py-2.5 px-3 text-right border">Total Terbayar</th>
              <th className="py-2.5 px-3 text-right border">Sisa Piutang</th>
              <th className="py-2.5 px-3 text-center border">% Terbayar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rekapData.map((row) => (
              <tr key={row.no} className="hover:bg-gray-50">
                <td className="py-2 px-3 text-center border">{row.no}</td>
                <td className="py-2 px-3 font-semibold text-gray-900 border">
                  {row.prodi}
                </td>
                <td className="py-2 px-3 border">{row.jenisTagihan}</td>
                <td className="py-2 px-3 text-center border font-mono">
                  {row.jumlahTagihan.toLocaleString("id-ID")}
                </td>
                <td className="py-2 px-3 text-right border font-mono">
                  {formatRupiah(row.nominalTagihan)}
                </td>
                <td className="py-2 px-3 text-right border font-mono">
                  {formatRupiah(row.potongan)}
                </td>
                <td className="py-2 px-3 text-right border font-mono text-emerald-700">
                  {formatRupiah(row.terbayar)}
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
              <td colSpan={3} className="py-2.5 px-3 text-center border">
                TOTAL KESELURUHAN
              </td>
              <td className="py-2.5 px-3 text-center border font-mono">
                {totalTagihanCount.toLocaleString("id-ID")}
              </td>
              <td className="py-2.5 px-3 text-right border font-mono">
                {formatRupiah(totalNominal)}
              </td>
              <td className="py-2.5 px-3 text-right border font-mono">
                {formatRupiah(totalPotongan)}
              </td>
              <td className="py-2.5 px-3 text-right border font-mono text-emerald-700">
                {formatRupiah(totalTerbayar)}
              </td>
              <td className="py-2.5 px-3 text-right border font-mono text-rose-700">
                {formatRupiah(totalSisa)}
              </td>
              <td className="py-2.5 px-3 text-center border">
                {overallPercentage}%
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

import React from "react";
import { IoPrintOutline, IoDownloadOutline } from "react-icons/io5";
import type { ReportRowData } from "../utils/generateLaporanHtml";

interface LaporanTagihanPreviewProps {
  selectedPenerima: string;
  selectedPeriods: string[];
  selectedFormat: string;
  reportData: ReportRowData[];
  formatRupiah: (num: number) => string;
  onLihatTabBaru: () => void;
  onPrint?: () => void;
}

export const LaporanTagihanPreview: React.FC<LaporanTagihanPreviewProps> = ({
  selectedPenerima,
  selectedPeriods,
  selectedFormat,
  reportData,
  formatRupiah,
  onLihatTabBaru,
  onPrint = () => window.print(),
}) => {
  return (
    <div
      id="report-preview-section"
      className="bg-white rounded shadow-md border-t-4 border-t-blue-600 p-6 mb-10 transition-all animate-fade-in"
    >
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

      {/* Table Data Preview */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left border border-gray-200">
          <thead className="bg-[#1e3a8a] text-white">
            <tr>
              <th className="py-2.5 px-3 text-center border">No</th>
              <th className="py-2.5 px-3 border">NIM / ID</th>
              <th className="py-2.5 px-3 border">Nama Mahasiswa</th>
              <th className="py-2.5 px-3 border">Program Studi</th>
              <th className="py-2.5 px-3 border">Jenis Tagihan</th>
              <th className="py-2.5 px-3 text-center border">Periode</th>
              <th className="py-2.5 px-3 text-right border">Nominal</th>
              <th className="py-2.5 px-3 text-right border">Potongan</th>
              <th className="py-2.5 px-3 text-right border">Pembayaran</th>
              <th className="py-2.5 px-3 text-right border">Sisa Tagihan</th>
              <th className="py-2.5 px-3 text-center border">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reportData.map((row) => (
              <tr key={row.no} className="hover:bg-gray-50">
                <td className="py-2 px-3 text-center border">{row.no}</td>
                <td className="py-2 px-3 font-mono border">{row.nim}</td>
                <td className="py-2 px-3 font-medium text-gray-900 border">
                  {row.nama}
                </td>
                <td className="py-2 px-3 border">{row.prodi}</td>
                <td className="py-2 px-3 border">{row.jenisTagihan}</td>
                <td className="py-2 px-3 text-center border">{row.periode}</td>
                <td className="py-2 px-3 text-right border">
                  {formatRupiah(row.nominal)}
                </td>
                <td className="py-2 px-3 text-right border">
                  {formatRupiah(row.potongan)}
                </td>
                <td className="py-2 px-3 text-right border">
                  {formatRupiah(row.bayar)}
                </td>
                <td className="py-2 px-3 text-right font-semibold text-gray-900 border">
                  {formatRupiah(row.sisa)}
                </td>
                <td className="py-2 px-3 text-center border">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      row.status === "Lunas"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

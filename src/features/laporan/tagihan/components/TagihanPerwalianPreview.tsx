import React from "react";
import { IoPrintOutline, IoDownloadOutline } from "react-icons/io5";
import type { PerwalianRowData } from "../utils/generateTagihanPerwalianHtml";

interface TagihanPerwalianPreviewProps {
  periodePerwalian: string;
  selectedProdi: string;
  selectedFormat: string;
  tampilkanKontak: boolean;
  tampilkanDenda: string;
  reportData: PerwalianRowData[];
  formatRupiah: (num: number) => string;
  onLihatTabBaru: () => void;
  onPrint?: () => void;
}

export const TagihanPerwalianPreview: React.FC<
  TagihanPerwalianPreviewProps
> = ({
  periodePerwalian,
  selectedProdi,
  selectedFormat,
  tampilkanKontak,
  tampilkanDenda,
  reportData,
  formatRupiah,
  onLihatTabBaru,
  onPrint = () => window.print(),
}) => {
  const totalNominal = reportData.reduce((acc, curr) => acc + curr.nominal, 0);
  const totalSisa = reportData.reduce((acc, curr) => acc + curr.sisaTagihan, 0);
  const totalDenda = reportData.reduce(
    (acc, curr) => acc + (curr.denda || 0),
    0,
  );

  return (
    <div
      id="perwalian-preview-section"
      className="bg-white rounded shadow-md border-t-4 border-t-blue-600 p-6 mb-10 transition-all animate-fade-in"
    >
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

      {/* Table Data */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left border border-gray-200">
          <thead className="bg-[#1e3a8a] text-white">
            <tr>
              <th className="py-2.5 px-3 text-center border">No</th>
              <th className="py-2.5 px-3 border">NIM</th>
              <th className="py-2.5 px-3 border">Nama Mahasiswa</th>
              <th className="py-2.5 px-3 border">Program Studi</th>
              <th className="py-2.5 px-3 text-center border">Angkatan</th>
              <th className="py-2.5 px-3 text-center border">Status Smt</th>
              <th className="py-2.5 px-3 border">Jenis Tagihan</th>
              <th className="py-2.5 px-3 text-center border">Jatuh Tempo</th>
              {tampilkanKontak && (
                <th className="py-2.5 px-3 border">Kontak</th>
              )}
              <th className="py-2.5 px-3 text-right border">Nominal Tagihan</th>
              {tampilkanDenda !== "Tidak" && (
                <th className="py-2.5 px-3 text-right border">Denda</th>
              )}
              <th className="py-2.5 px-3 text-right border">Sisa Tagihan</th>
              <th className="py-2.5 px-3 text-center border">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reportData.map((row) => (
              <tr key={row.no} className="hover:bg-gray-50">
                <td className="py-2 px-3 text-center border">{row.no}</td>
                <td className="py-2 px-3 font-mono text-center border">
                  {row.nim}
                </td>
                <td className="py-2 px-3 font-semibold text-gray-900 border">
                  {row.nama}
                </td>
                <td className="py-2 px-3 border">{row.prodi}</td>
                <td className="py-2 px-3 text-center border">{row.angkatan}</td>
                <td className="py-2 px-3 text-center border">
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-blue-50 text-blue-800">
                    {row.statusSemester}
                  </span>
                </td>
                <td className="py-2 px-3 border">{row.jenisTagihan}</td>
                <td className="py-2 px-3 text-center border text-gray-500">
                  {row.jatuhTempo}
                </td>
                {tampilkanKontak && (
                  <td className="py-2 px-3 border text-gray-600 font-mono">
                    {row.kontak || "-"}
                  </td>
                )}
                <td className="py-2 px-3 text-right border font-mono">
                  {formatRupiah(row.nominal)}
                </td>
                {tampilkanDenda !== "Tidak" && (
                  <td className="py-2 px-3 text-right border font-mono text-amber-700">
                    {formatRupiah(row.denda || 0)}
                  </td>
                )}
                <td className="py-2 px-3 text-right border font-mono font-semibold text-rose-700">
                  {formatRupiah(row.sisaTagihan)}
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
          <tfoot className="bg-gray-100 font-semibold text-gray-900 border-t-2 border-gray-300">
            <tr>
              <td
                colSpan={tampilkanKontak ? 9 : 8}
                className="py-2.5 px-3 text-center border"
              >
                TOTAL
              </td>
              <td className="py-2.5 px-3 text-right border font-mono">
                {formatRupiah(totalNominal)}
              </td>
              {tampilkanDenda !== "Tidak" && (
                <td className="py-2.5 px-3 text-right border font-mono text-amber-700">
                  {formatRupiah(totalDenda)}
                </td>
              )}
              <td className="py-2.5 px-3 text-right border font-mono text-rose-700">
                {formatRupiah(totalSisa)}
              </td>
              <td className="border"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

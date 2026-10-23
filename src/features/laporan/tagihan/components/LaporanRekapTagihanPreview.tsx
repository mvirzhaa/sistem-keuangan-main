import React from "react";
import { IoPrintOutline } from "react-icons/io5";
import ListTable, { type Column } from "../../../../components/tables/ListTable";
import { KopLaporan } from "./KopLaporan";
import type { RekapRowData } from "../utils/generateLaporanRekapHtml";

interface LaporanRekapTagihanPreviewProps {
  useKop?: boolean;
  tahunAkademik: string;
  selectedProdi: string;
  selectedFormat: string;
  rekapData: RekapRowData[];
  formatRupiah: (num: number) => string;
  onLihatTabBaru: () => void;
  onCetakFormat?: () => void;
}

export const LaporanRekapTagihanPreview: React.FC<
  LaporanRekapTagihanPreviewProps
> = ({
  useKop = true,
  tahunAkademik,
  selectedProdi,
  selectedFormat,
  rekapData,
  formatRupiah,
  onLihatTabBaru,
  onCetakFormat,
}) => {
  const totalNominal = rekapData.reduce((acc, curr) => acc + curr.nominal, 0);
  const totalPotongan = rekapData.reduce((acc, curr) => acc + curr.potongan, 0);
  const totalDenda = rekapData.reduce((acc, curr) => acc + curr.denda, 0);
  const totalTagihan = rekapData.reduce((acc, curr) => acc + curr.totalTagihan, 0);
  const totalBayar = rekapData.reduce((acc, curr) => acc + curr.bayar, 0);
  const totalSisa = rekapData.reduce((acc, curr) => acc + curr.sisa, 0);
  const totalJumlahTagihan = rekapData.reduce(
    (acc, curr) => acc + curr.jumlahTagihan,
    0
  );
  const totalJumlahLunas = rekapData.reduce(
    (acc, curr) => acc + curr.jumlahLunas,
    0
  );

  // Definisi Kolom ListTable (12 kolom sesuai Gambar 1)
  const columns: Column<RekapRowData>[] = [
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
      key: "kodeProdi",
      header: "Kode Prodi",
      sortable: true,
      className: "text-center font-mono py-2.5 px-2.5 border border-slate-300 text-xs text-gray-700 whitespace-nowrap",
      headerClassName: "text-center py-2.5 px-2.5 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => item.kodeProdi,
    },
    {
      key: "prodi",
      header: "Program Studi",
      sortable: true,
      className: "py-2.5 px-3 border border-slate-300 text-xs font-semibold text-gray-900 whitespace-nowrap",
      headerClassName: "text-left py-2.5 px-3 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => item.prodi,
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
      key: "nominal",
      header: "Tagihan",
      sortable: true,
      className: "text-right py-2.5 px-3 border border-slate-300 text-xs font-mono font-medium text-gray-800 whitespace-nowrap",
      headerClassName: "text-right py-2.5 px-3 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => formatRupiah(item.nominal),
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
      key: "denda",
      header: "Denda",
      sortable: true,
      className: "text-right py-2.5 px-2.5 border border-slate-300 text-xs font-mono font-medium text-gray-800 whitespace-nowrap",
      headerClassName: "text-right py-2.5 px-2.5 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => formatRupiah(item.denda),
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
      key: "bayar",
      header: "Pembayaran",
      sortable: true,
      className: "text-right py-2.5 px-3 border border-slate-300 text-xs font-mono font-medium text-emerald-700 whitespace-nowrap",
      headerClassName: "text-right py-2.5 px-3 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => formatRupiah(item.bayar),
    },
    {
      key: "sisa",
      header: "Sisa Tagihan",
      sortable: true,
      className: "text-right py-2.5 px-3 border border-slate-300 text-xs font-mono font-bold text-rose-700 whitespace-nowrap",
      headerClassName: "text-right py-2.5 px-3 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => formatRupiah(item.sisa),
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
      key: "jumlahLunas",
      header: "Jumlah Lunas",
      sortable: true,
      className: "text-center py-2.5 px-2.5 border border-slate-300 text-xs font-mono font-semibold text-emerald-700 whitespace-nowrap",
      headerClassName: "text-center py-2.5 px-2.5 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => item.jumlahLunas.toLocaleString("id-ID"),
    },
  ];

  // Baris Total Keseluruhan untuk Footer ListTable
  const footerRow = (
    <tr className="bg-gray-100 font-bold text-gray-900 border-t-2 border-gray-300">
      <td colSpan={4} className="py-2.5 px-3 text-center border border-slate-300 font-semibold">
        TOTAL KESELURUHAN
      </td>
      <td className="py-2.5 px-3 text-right border border-slate-300 font-mono">
        {formatRupiah(totalNominal)}
      </td>
      <td className="py-2.5 px-3 text-right border border-slate-300 font-mono">
        {formatRupiah(totalPotongan)}
      </td>
      <td className="py-2.5 px-3 text-right border border-slate-300 font-mono">
        {formatRupiah(totalDenda)}
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
      <td className="py-2.5 px-3 text-center border border-slate-300 font-mono">
        {totalJumlahTagihan.toLocaleString("id-ID")}
      </td>
      <td className="py-2.5 px-3 text-center border border-slate-300 font-mono text-emerald-700">
        {totalJumlahLunas.toLocaleString("id-ID")}
      </td>
    </tr>
  );

  const handleAction = onCetakFormat || onLihatTabBaru;

  return (
    <div
      id="rekap-preview-section"
      className="bg-white rounded shadow-md border-t-4 border-t-blue-600 p-6 mb-10 transition-all animate-fade-in"
    >
      {/* Header Preview & Action Button */}
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
          title="REKAPITULASI TAGIHAN"
          periode={tahunAkademik ? `TAHUN AKADEMIK ${tahunAkademik}` : ""}
        />
      )}

      {/* Tabel Data Menggunakan ListTable Reusable Component */}
      <div className="w-full text-xs">
        <ListTable<RekapRowData>
          data={rekapData}
          columns={columns}
          rowKey={(row) => row.no}
          pageSize={10}
          pageSizeOptions={[10, 25, 50, 100]}
          emptyMessage="Tidak ada data rekapitulasi tagihan"
          showFooter={true}
          footerRow={footerRow}
        />
      </div>
    </div>
  );
};

export default LaporanRekapTagihanPreview;

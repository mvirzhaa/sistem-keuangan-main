import React from "react";
import { IoPrintOutline } from "react-icons/io5";
import ListTable, { type Column } from "../../../../components/tables/ListTable";
import { KopLaporan } from "../../tagihan/components/KopLaporan";
import type { LaporanDepositRowData } from "../utils/generateLaporanDepositHtml";

interface LaporanDepositPreviewProps {
  useKop?: boolean;
  tahunAkademik: string;
  programStudi: string;
  metodePembayaran: string;
  channel: string;
  penerima: string;
  selectedFormat: string;
  data: LaporanDepositRowData[];
  formatRupiah: (num: number) => string;
  onLihatTabBaru: () => void;
  onCetakFormat?: () => void;
}

export const LaporanDepositPreview: React.FC<LaporanDepositPreviewProps> = ({
  useKop = true,
  tahunAkademik,
  programStudi,
  metodePembayaran,
  channel,
  penerima,
  selectedFormat,
  data,
  formatRupiah,
  onLihatTabBaru,
  onCetakFormat,
}) => {
  const totalMasuk = data.reduce(
    (acc, curr) => acc + (curr.masuk ?? curr.nominalDeposit ?? 0),
    0
  );
  const totalKeluar = data.reduce((acc, curr) => acc + (curr.keluar ?? 0), 0);

  const columns: Column<LaporanDepositRowData>[] = [
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
      key: "kodeDeposit",
      header: "Kode Deposit",
      sortable: true,
      className: "text-center py-2.5 px-3 border border-slate-300 text-xs font-mono text-gray-800",
      headerClassName: "text-center py-2.5 px-3 border border-slate-300 font-semibold",
      render: (item) => item.kodeDeposit || "-",
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
      key: "periode",
      header: "Periode",
      sortable: true,
      className: "text-center py-2.5 px-3 border border-slate-300 text-xs text-gray-700",
      headerClassName: "text-center py-2.5 px-3 border border-slate-300 font-semibold",
      render: (item) => item.periode || "-",
    },
    {
      key: "metodePembayaran",
      header: "Metode Pembayaran",
      sortable: true,
      className: "py-2.5 px-3 border border-slate-300 text-xs text-gray-700 font-medium",
      headerClassName: "text-left py-2.5 px-3 border border-slate-300 font-semibold",
      render: (item) => item.metodePembayaran,
    },
    {
      key: "keterangan",
      header: "Keterangan",
      sortable: true,
      className: "py-2.5 px-3 border border-slate-300 text-xs text-gray-700",
      headerClassName: "text-left py-2.5 px-3 border border-slate-300 font-semibold",
      render: (item) => item.keterangan || "-",
    },
    {
      key: "tanggal",
      header: "Tanggal",
      sortable: true,
      className: "text-center py-2.5 px-3 border border-slate-300 text-xs text-gray-700 font-mono",
      headerClassName: "text-center py-2.5 px-3 border border-slate-300 font-semibold",
      render: (item) => item.tanggal || item.tanggalDeposit || "-",
    },
    {
      key: "masuk",
      header: "Masuk",
      sortable: true,
      className: "text-right py-2.5 px-3 border border-slate-300 text-xs font-mono font-semibold text-blue-900",
      headerClassName: "text-right py-2.5 px-3 border border-slate-300 font-semibold",
      render: (item) => formatRupiah(item.masuk ?? item.nominalDeposit ?? 0),
    },
    {
      key: "keluar",
      header: "Keluar",
      sortable: true,
      className: "text-right py-2.5 px-3 border border-slate-300 text-xs font-mono font-semibold text-red-700",
      headerClassName: "text-right py-2.5 px-3 border border-slate-300 font-semibold",
      render: (item) => formatRupiah(item.keluar ?? 0),
    },
  ];

  const footerRow = (
    <tr className="bg-gray-100 font-bold text-gray-900 border-t-2 border-gray-300">
      <td
        colSpan={9}
        className="py-2.5 px-3 text-center border border-slate-300 font-semibold"
      >
        TOTAL KESELURUHAN DEPOSIT ({data.length} TRANSAKSI)
      </td>
      <td className="py-2.5 px-3 text-right border border-slate-300 font-mono text-blue-900 font-bold">
        {formatRupiah(totalMasuk)}
      </td>
      <td className="py-2.5 px-3 text-right border border-slate-300 font-mono text-red-700 font-bold">
        {formatRupiah(totalKeluar)}
      </td>
    </tr>
  );

  return (
    <div
      id="laporan-deposit-preview"
      className="bg-white rounded shadow-md border-t-4 border-t-blue-600 p-6 mb-10 transition-all animate-fade-in"
    >
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-gray-200 mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-800">
            Preview Laporan Deposit
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Daftar saldo dan transaksi deposit mahasiswa
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
          LAPORAN DEPOSIT
        </h3>
        <p className="text-xs text-gray-600 mt-1">
          Tahun Akademik: <span className="font-semibold">{tahunAkademik}</span>
          {programStudi && programStudi !== "-- Pilih Program Studi --" && (
            <>
              {" | "}Program Studi:{" "}
              <span className="font-semibold">{programStudi}</span>
            </>
          )}
          {metodePembayaran &&
            metodePembayaran !== "-- Pilih Metode Pembayaran --" && (
              <>
                {" | "}Metode:{" "}
                <span className="font-semibold">{metodePembayaran}</span>
              </>
            )}
          {channel && channel !== "-- Pilih Channel --" && (
            <>
              {" | "}Channel: <span className="font-semibold">{channel}</span>
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
          emptyMessage="Tidak ada data deposit yang ditemukan."
          footerRow={footerRow}
        />
      </div>
    </div>
  );
};

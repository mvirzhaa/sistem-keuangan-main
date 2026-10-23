import React from "react";
import { IoPrintOutline } from "react-icons/io5";
import ListTable, { type Column } from "../../../../components/tables/ListTable";
import { KopLaporan } from "../../tagihan/components/KopLaporan";
import type { LaporanMahasiswaTercekalRowData } from "../utils/generateLaporanMahasiswaTercekalHtml";

interface LaporanMahasiswaTercekalPreviewProps {
  useKop?: boolean;
  unitKerja: string;
  periodeAkademik: string;
  aturanAkademik: string;
  periodeMasuk: string;
  statusSemester: string;
  selectedFormat: string;
  data: LaporanMahasiswaTercekalRowData[];
  formatRupiah: (num: number) => string;
  onLihatTabBaru: () => void;
  onCetakFormat?: () => void;
}

export const LaporanMahasiswaTercekalPreview: React.FC<
  LaporanMahasiswaTercekalPreviewProps
> = ({
  useKop = true,
  unitKerja,
  periodeAkademik,
  aturanAkademik,
  periodeMasuk,
  statusSemester,
  selectedFormat,
  data,
  formatRupiah,
  onLihatTabBaru,
  onCetakFormat,
}) => {
  const totalTunggakan = data.reduce((acc, curr) => acc + curr.tunggakan, 0);

  const columns: Column<LaporanMahasiswaTercekalRowData>[] = [
    {
      key: "no",
      header: "No",
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
      header: "Nama Mahasiswa",
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
      key: "aturanAkademik",
      header: "Aturan Akademik",
      sortable: true,
      className: "py-2.5 px-3 border border-slate-300 text-xs text-blue-900 font-medium",
      headerClassName: "text-left py-2.5 px-3 border border-slate-300 font-semibold",
      render: (item) => item.aturanAkademik,
    },
    {
      key: "alasanTercekal",
      header: "Alasan Tercekal",
      sortable: true,
      className: "py-2.5 px-3 border border-slate-300 text-xs text-gray-700",
      headerClassName: "text-left py-2.5 px-3 border border-slate-300 font-semibold",
      render: (item) => item.alasanTercekal,
    },
    {
      key: "tunggakan",
      header: "Tunggakan (Rp)",
      sortable: true,
      className: "text-right py-2.5 px-3 border border-slate-300 text-xs font-mono font-semibold text-red-700",
      headerClassName: "text-right py-2.5 px-3 border border-slate-300 font-semibold",
      render: (item) => formatRupiah(item.tunggakan),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      className: "text-center py-2.5 px-3 border border-slate-300 text-xs font-medium",
      headerClassName: "text-center py-2.5 px-3 border border-slate-300 font-semibold",
      render: (item) => (
        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-red-100 text-red-800 border border-red-200">
          {item.status}
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
        TOTAL TUNGGAKAN ({data.length} MAHASISWA TERCEKAL)
      </td>
      <td className="py-2.5 px-3 text-right border border-slate-300 font-mono text-red-700 font-bold">
        {formatRupiah(totalTunggakan)}
      </td>
      <td className="py-2.5 px-3 text-center border border-slate-300"></td>
    </tr>
  );

  return (
    <div
      id="laporan-mahasiswa-tercekal-preview"
      className="bg-white rounded shadow-md border-t-4 border-t-blue-600 p-6 mb-10 transition-all animate-fade-in"
    >
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-gray-200 mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-800">
            Preview Laporan Mahasiswa Tercekal Aturan Akademik
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Daftar mahasiswa yang tercekal layanan akademik akibat tunggakan administrasi keuangan
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
          LAPORAN MAHASISWA TERCEKAL ATURAN AKADEMIK
        </h3>
        <p className="text-xs text-gray-600 mt-1">
          Periode Akademik: <span className="font-semibold">{periodeAkademik}</span>
          {unitKerja && (
            <>
              {" | "}Unit Kerja: <span className="font-semibold">{unitKerja}</span>
            </>
          )}
          {aturanAkademik && (
            <>
              {" | "}Aturan:{" "}
              <span className="font-semibold text-red-700">{aturanAkademik}</span>
            </>
          )}
          {statusSemester && statusSemester !== "--- Semua ---" && (
            <>
              {" | "}Status Semester:{" "}
              <span className="font-semibold">{statusSemester}</span>
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
          emptyMessage="Tidak ada data mahasiswa tercekal yang ditemukan."
          footerRow={footerRow}
        />
      </div>
    </div>
  );
};

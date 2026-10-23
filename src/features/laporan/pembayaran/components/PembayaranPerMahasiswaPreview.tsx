import React from "react";
import { IoPrintOutline } from "react-icons/io5";
import ListTable, { type Column } from "../../../../components/tables/ListTable";
import { KopLaporan } from "../../tagihan/components/KopLaporan";
import type { PembayaranPerMahasiswaRowData } from "../utils/generatePembayaranLanjutanHtml";

interface PembayaranPerMahasiswaPreviewProps {
  useKop?: boolean;
  periodePembayaran: string;
  metodePembayaran: string;
  channel: string;
  jenisTagihan: string;
  penerima: string;
  tampilkanKelompokUkt: boolean;
  selectedFormat: string;
  data: PembayaranPerMahasiswaRowData[];
  formatRupiah: (num: number) => string;
  onLihatTabBaru: () => void;
  onCetakFormat?: () => void;
}

export const PembayaranPerMahasiswaPreview: React.FC<
  PembayaranPerMahasiswaPreviewProps
> = ({
  useKop = true,
  periodePembayaran,
  metodePembayaran,
  channel,
  jenisTagihan,
  penerima,
  tampilkanKelompokUkt,
  selectedFormat,
  data,
  formatRupiah,
  onLihatTabBaru,
  onCetakFormat,
}) => {
  const totalNominalTrx = data.reduce(
    (acc, curr) => acc + (curr.batal === "Ya" || curr.status === "Batal" ? 0 : (curr.nominalTransaksi || curr.nominal || 0)),
    0
  );
  const totalNomDetail = data.reduce(
    (acc, curr) => acc + (curr.batal === "Ya" || curr.status === "Batal" ? 0 : (curr.nominalDetail || curr.nominal || 0)),
    0
  );
  const totalTagihanSemua = data.reduce(
    (acc, curr) => acc + (curr.totalTagihan || curr.nominal || 0),
    0
  );
  const totalPembayaranSemua = data.reduce(
    (acc, curr) => acc + (curr.batal === "Ya" || curr.status === "Batal" ? 0 : (curr.totalPembayaran || curr.nominal || 0)),
    0
  );

  const columns: Column<PembayaranPerMahasiswaRowData>[] = [
    {
      key: "no",
      header: "No.",
      sortable: true,
      className: "text-center py-2 px-2 border border-slate-300 text-xs",
      headerClassName: "text-center py-2 px-2 border border-slate-300 font-semibold whitespace-nowrap",
      width: "40px",
      render: (item) => <span>{item.no}</span>,
    },
    {
      key: "nim",
      header: "NIM",
      sortable: true,
      className: "text-center py-2 px-2.5 border border-slate-300 text-xs font-mono text-gray-800 whitespace-nowrap",
      headerClassName: "text-center py-2 px-2.5 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => item.nim,
    },
    {
      key: "idPendaftar",
      header: "ID Pendaftar",
      sortable: true,
      className: "text-center py-2 px-2.5 border border-slate-300 text-xs font-mono text-gray-700 whitespace-nowrap",
      headerClassName: "text-center py-2 px-2.5 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => item.idPendaftar || "-",
    },
    {
      key: "nama",
      header: "Nama",
      sortable: true,
      className: "py-2 px-3 border border-slate-300 text-xs font-medium text-gray-900 whitespace-nowrap",
      headerClassName: "text-left py-2 px-3 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => item.nama,
    },
    {
      key: "semesterAktif",
      header: "Semester Aktif",
      sortable: true,
      className: "text-center py-2 px-2.5 border border-slate-300 text-xs text-gray-700 whitespace-nowrap",
      headerClassName: "text-center py-2 px-2.5 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => item.semesterAktif || "-",
    },
    {
      key: "prodi",
      header: "Prodi",
      sortable: true,
      className: "py-2 px-2.5 border border-slate-300 text-xs text-gray-700 whitespace-nowrap",
      headerClassName: "text-left py-2 px-2.5 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => item.prodi,
    },
    {
      key: "pembayaran",
      header: "Pembayaran",
      sortable: true,
      className: "py-2 px-2.5 border border-slate-300 text-xs text-gray-700 whitespace-nowrap",
      headerClassName: "text-left py-2 px-2.5 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => item.pembayaran || item.metodePembayaran || "-",
    },
    {
      key: "tanggal",
      header: "Tanggal",
      sortable: true,
      className: "text-center py-2 px-2.5 border border-slate-300 text-xs text-gray-600 whitespace-nowrap",
      headerClassName: "text-center py-2 px-2.5 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => item.tanggal || item.tanggalBayar || "-",
    },
    {
      key: "nominalTransaksi",
      header: "Nominal Transaksi",
      sortable: true,
      className: "text-right py-2 px-2.5 border border-slate-300 text-xs font-mono font-semibold text-emerald-700 whitespace-nowrap",
      headerClassName: "text-right py-2 px-2.5 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => formatRupiah(item.nominalTransaksi || item.nominal || 0),
    },
    {
      key: "kodeTagihan",
      header: "Kode Tagihan",
      sortable: true,
      className: "text-center py-2 px-2.5 border border-slate-300 text-xs font-mono text-blue-900 whitespace-nowrap",
      headerClassName: "text-center py-2 px-2.5 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => item.kodeTagihan || "-",
    },
    {
      key: "jenisTagihan",
      header: "Jenis Tagihan",
      sortable: true,
      className: "py-2 px-2.5 border border-slate-300 text-xs text-gray-800 whitespace-nowrap",
      headerClassName: "text-left py-2 px-2.5 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => item.jenisTagihan || "-",
    },
    {
      key: "cicilanKe",
      header: "Cicilan Ke-",
      sortable: true,
      className: "text-center py-2 px-2 border border-slate-300 text-xs whitespace-nowrap",
      headerClassName: "text-center py-2 px-2 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => item.cicilanKe ?? "-",
    },
    {
      key: "bulan",
      header: "Bulan",
      sortable: true,
      className: "text-center py-2 px-2.5 border border-slate-300 text-xs text-gray-700 whitespace-nowrap",
      headerClassName: "text-center py-2 px-2.5 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => item.bulan || "-",
    },
    {
      key: "nominalDetail",
      header: "Nominal Detail",
      sortable: true,
      className: "text-right py-2 px-2.5 border border-slate-300 text-xs font-mono font-semibold text-gray-800 whitespace-nowrap",
      headerClassName: "text-right py-2 px-2.5 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => formatRupiah(item.nominalDetail || item.nominal || 0),
    },
    {
      key: "batal",
      header: "Batal",
      sortable: true,
      className: "text-center py-2 px-2.5 border border-slate-300 text-xs whitespace-nowrap",
      headerClassName: "text-center py-2 px-2.5 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => {
        const isBatal = item.batal === "Ya" || item.status === "Batal";
        return (
          <span
            className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${
              isBatal ? "bg-rose-100 text-rose-800" : "bg-emerald-100 text-emerald-800"
            }`}
          >
            {item.batal || (isBatal ? "Ya" : "Tidak")}
          </span>
        );
      },
    },
    {
      key: "semesterTa",
      header: "Semester / TA",
      sortable: true,
      className: "text-center py-2 px-2.5 border border-slate-300 text-xs text-gray-700 whitespace-nowrap",
      headerClassName: "text-center py-2 px-2.5 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => item.semesterTa || "-",
    },
    {
      key: "totalTagihan",
      header: "Total Tagihan",
      sortable: true,
      className: "text-right py-2 px-2.5 border border-slate-300 text-xs font-mono text-gray-800 whitespace-nowrap",
      headerClassName: "text-right py-2 px-2.5 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => formatRupiah(item.totalTagihan || item.nominal || 0),
    },
    {
      key: "totalPembayaran",
      header: "Total Pembayaran",
      sortable: true,
      className: "text-right py-2 px-2.5 border border-slate-300 text-xs font-mono font-bold text-blue-900 whitespace-nowrap",
      headerClassName: "text-right py-2 px-2.5 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => formatRupiah(item.totalPembayaran || item.nominal || 0),
    },
  ];

  const footerRow = (
    <tr className="bg-gray-100 font-bold text-gray-900 border-t-2 border-gray-300">
      <td
        colSpan={8}
        className="py-2.5 px-3 text-center border border-slate-300 font-semibold"
      >
        TOTAL KESELURUHAN (AKTIF)
      </td>
      <td className="py-2.5 px-3 text-right border border-slate-300 font-mono text-emerald-700 font-bold">
        {formatRupiah(totalNominalTrx)}
      </td>
      <td colSpan={4} className="border border-slate-300"></td>
      <td className="py-2.5 px-3 text-right border border-slate-300 font-mono font-semibold">
        {formatRupiah(totalNomDetail)}
      </td>
      <td colSpan={2} className="border border-slate-300"></td>
      <td className="py-2.5 px-3 text-right border border-slate-300 font-mono">
        {formatRupiah(totalTagihanSemua)}
      </td>
      <td className="py-2.5 px-3 text-right border border-slate-300 font-mono text-blue-900 font-bold">
        {formatRupiah(totalPembayaranSemua)}
      </td>
    </tr>
  );

  const handleAction = onCetakFormat || onLihatTabBaru;

  return (
    <div
      id="per-mhs-preview-section"
      className="bg-white rounded shadow-md border-t-4 border-t-blue-600 p-6 mb-10 transition-all animate-fade-in"
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Preview Laporan Pembayaran Per Mahasiswa
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Periode: {periodePembayaran || "Semua"} | Tagihan:{" "}
            {jenisTagihan || "Semua"} | Metode: {metodePembayaran || "Semua"} |
            Channel: {channel || "Semua"} | Format: {selectedFormat}
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
          title="LAPORAN PEMBAYARAN PER MAHASISWA"
          periode={periodePembayaran || ""}
        />
      )}

      <div className="w-full text-xs">
        <ListTable<PembayaranPerMahasiswaRowData>
          data={data}
          columns={columns}
          rowKey={(row) => `${row.no}-${row.kodePembayaran}`}
          pageSize={10}
          pageSizeOptions={[10, 25, 50, 100]}
          emptyMessage="Tidak ada data pembayaran mahasiswa"
          showFooter={true}
          footerRow={footerRow}
        />
      </div>
    </div>
  );
};

export default PembayaranPerMahasiswaPreview;

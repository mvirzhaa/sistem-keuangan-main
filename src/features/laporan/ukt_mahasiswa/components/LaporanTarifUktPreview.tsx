import React from "react";
import { IoPrintOutline } from "react-icons/io5";
import ListTable, { type Column } from "../../../../components/tables/ListTable";
import { KopLaporan } from "../../tagihan/components/KopLaporan";
import type { LaporanTarifUktRowData } from "../utils/generateLaporanUktHtml";

interface LaporanTarifUktPreviewProps {
  useKop?: boolean;
  tahunAkademik: string;
  programStudi: string;
  kelompokUkt: string;
  sistemKuliah: string;
  jalurPendaftaran: string;
  gelombang: string;
  selectedFormat: string;
  data: LaporanTarifUktRowData[];
  formatRupiah: (num: number) => string;
  onLihatTabBaru: () => void;
  onCetakFormat?: () => void;
}

export const LaporanTarifUktPreview: React.FC<LaporanTarifUktPreviewProps> = ({
  useKop = true,
  tahunAkademik,
  programStudi,
  kelompokUkt,
  sistemKuliah,
  jalurPendaftaran,
  gelombang,
  selectedFormat,
  data,
  formatRupiah,
  onLihatTabBaru,
  onCetakFormat,
}) => {
  const totalTarif = data.reduce(
    (acc, curr) => acc + (curr.nominalTarif || curr.besaranTarif || 0),
    0
  );

  const columns: Column<LaporanTarifUktRowData>[] = [
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
      key: "prodi",
      header: "Program Studi",
      sortable: true,
      className: "py-2.5 px-3 border border-slate-300 text-xs font-semibold text-gray-900",
      headerClassName: "text-left py-2.5 px-3 border border-slate-300 font-semibold",
      render: (item) => item.prodi,
    },
    {
      key: "gelombang",
      header: "Gelombang",
      sortable: true,
      className: "text-center py-2.5 px-3 border border-slate-300 text-xs text-gray-700",
      headerClassName: "text-center py-2.5 px-3 border border-slate-300 font-semibold",
      render: (item) => item.gelombang,
    },
    {
      key: "jalurPendaftaran",
      header: "Jalur Pendaftaran",
      sortable: true,
      className: "py-2.5 px-3 border border-slate-300 text-xs text-gray-700",
      headerClassName: "text-left py-2.5 px-3 border border-slate-300 font-semibold",
      render: (item) => item.jalurPendaftaran,
    },
    {
      key: "sistemKuliah",
      header: "Sistem Kuliah",
      sortable: true,
      className: "text-center py-2.5 px-3 border border-slate-300 text-xs text-gray-700",
      headerClassName: "text-center py-2.5 px-3 border border-slate-300 font-semibold",
      render: (item) => item.sistemKuliah,
    },
    {
      key: "kelompokUkt",
      header: "Kelompok UKT",
      sortable: true,
      className: "text-center py-2.5 px-3 border border-slate-300 text-xs font-semibold text-emerald-800",
      headerClassName: "text-center py-2.5 px-3 border border-slate-300 font-semibold",
      render: (item) => (
        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
          {item.kelompokUkt}
        </span>
      ),
    },
    {
      key: "nominalTarif",
      header: "Nominal Tarif",
      sortable: true,
      className: "text-right py-2.5 px-3 border border-slate-300 text-xs font-mono font-semibold text-blue-900",
      headerClassName: "text-right py-2.5 px-3 border border-slate-300 font-semibold",
      render: (item) => formatRupiah(item.nominalTarif || item.besaranTarif || 0),
    },
    {
      key: "kuota",
      header: "kuota",
      sortable: true,
      className: "text-center py-2.5 px-3 border border-slate-300 text-xs font-mono text-gray-800",
      headerClassName: "text-center py-2.5 px-3 border border-slate-300 font-semibold",
      render: (item) => item.kuota ?? "-",
    },
  ];

  const footerRow = (
    <tr className="bg-gray-100 font-bold text-gray-900 border-t-2 border-gray-300">
      <td
        colSpan={6}
        className="py-2.5 px-3 text-center border border-slate-300 font-semibold"
      >
        TOTAL BESARAN TARIF ({data.length} TARIF)
      </td>
      <td className="py-2.5 px-3 text-right border border-slate-300 font-mono text-blue-900 font-bold">
        {formatRupiah(totalTarif)}
      </td>
      <td className="py-2.5 px-3 text-center border border-slate-300"></td>
    </tr>
  );

  return (
    <div
      id="laporan-tarif-ukt-preview"
      className="bg-white rounded shadow-md border-t-4 border-t-blue-600 p-6 mb-10 transition-all animate-fade-in"
    >
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-gray-200 mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-800">
            Preview Laporan Tarif UKT
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Daftar besaran tarif UKT berdasarkan kelompok, jalur, dan sistem kuliah
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
          LAPORAN TARIF UKT
        </h3>
        <p className="text-xs text-gray-600 mt-1">
          Tahun Akademik: <span className="font-semibold">{tahunAkademik}</span>
          {programStudi && (
            <>
              {" | "}Program Studi:{" "}
              <span className="font-semibold">{programStudi}</span>
            </>
          )}
          {kelompokUkt && kelompokUkt !== "-- Pilih Kelompok UKT --" && (
            <>
              {" | "}Kelompok UKT:{" "}
              <span className="font-semibold text-emerald-700">
                {kelompokUkt}
              </span>
            </>
          )}
          {sistemKuliah && sistemKuliah !== "-- Pilih Sistem Kuliah --" && (
            <>
              {" | "}Sistem:{" "}
              <span className="font-semibold">{sistemKuliah}</span>
            </>
          )}
          {gelombang && gelombang !== "-- Pilih Gelombang --" && (
            <>
              {" | "}Gelombang:{" "}
              <span className="font-semibold">{gelombang}</span>
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
          emptyMessage="Tidak ada data tarif UKT yang sesuai kriteria pencarian."
          footerRow={footerRow}
        />
      </div>
    </div>
  );
};

import React from "react";
import { IoPrintOutline } from "react-icons/io5";
import ListTable, { type Column } from "../../../../components/tables/ListTable";
import { KopLaporan } from "../../tagihan/components/KopLaporan";
import type { DistribusiPembayaranRowData } from "../utils/generatePembayaranLanjutanHtml";

interface DistribusiPembayaranPreviewProps {
  useKop?: boolean;
  unitKerja: string;
  tingkatDistribusi: string;
  tglAwal: string;
  tglAkhir: string;
  selectedFormat: string;
  data: DistribusiPembayaranRowData[];
  formatRupiah: (num: number) => string;
  onLihatTabBaru: () => void;
  onCetakFormat?: () => void;
}

export const DistribusiPembayaranPreview: React.FC<
  DistribusiPembayaranPreviewProps
> = ({
  useKop = true,
  unitKerja,
  tingkatDistribusi,
  tglAwal,
  tglAkhir,
  selectedFormat,
  data,
  formatRupiah,
  onLihatTabBaru,
  onCetakFormat,
}) => {
  const totalUangGedung = data.reduce((acc, curr) => acc + (curr.uangGedungTahap1 || 0), 0);
  const totalSpp = data.reduce((acc, curr) => acc + (curr.spp || 0), 0);
  const totalHeregistrasi = data.reduce((acc, curr) => acc + (curr.heregistrasi || 0), 0);
  const totalUpm = data.reduce((acc, curr) => acc + (curr.upm || 0), 0);
  const totalUas = data.reduce((acc, curr) => acc + (curr.ujianAkhirSemester || 0), 0);
  const totalUktAfirmasi = data.reduce((acc, curr) => acc + (curr.uktAfirmasiUika || 0), 0);
  const totalRpl = data.reduce((acc, curr) => acc + (curr.praktikumRpl || 0), 0);
  const totalJarkom = data.reduce((acc, curr) => acc + (curr.praktikumJarkom || 0), 0);
  const totalEmbedded = data.reduce((acc, curr) => acc + (curr.praktikumEmbedded || 0), 0);
  const totalMetNum = data.reduce((acc, curr) => acc + (curr.praktikumMetodeNumerik || 0), 0);
  const totalAr = data.reduce((acc, curr) => acc + (curr.praktikumAr || 0), 0);
  const totalKg = data.reduce((acc, curr) => acc + (curr.praktikumKnowledgeGraph || 0), 0);
  const totalPola = data.reduce((acc, curr) => acc + (curr.praktikumPengenalanPola || 0), 0);
  const totalStrukdat = data.reduce((acc, curr) => acc + (curr.praktikumStrukturData || 0), 0);
  const totalSks = data.reduce((acc, curr) => acc + (curr.sks || 0), 0);

  const columns: Column<DistribusiPembayaranRowData>[] = [
    {
      key: "kodeFakultas",
      header: "Kode Fakultas",
      sortable: true,
      className: "text-center py-2 px-2.5 border border-slate-300 text-xs font-mono font-semibold whitespace-nowrap",
      headerClassName: "text-center py-2 px-2.5 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => item.kodeFakultas,
    },
    {
      key: "namaFakultas",
      header: "Nama Fakultas",
      sortable: true,
      className: "py-2 px-3 border border-slate-300 text-xs font-semibold text-gray-900 whitespace-nowrap",
      headerClassName: "text-left py-2 px-3 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => item.namaFakultas,
    },
    {
      key: "sumberData",
      header: "Sumber Data",
      sortable: true,
      className: "text-center py-2 px-2.5 border border-slate-300 text-xs text-gray-700 whitespace-nowrap",
      headerClassName: "text-center py-2 px-2.5 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => item.sumberData,
    },
    {
      key: "uangGedungTahap1",
      header: "Uang Gedung Tahap 1",
      sortable: true,
      className: "text-right py-2 px-2.5 border border-slate-300 text-xs font-mono text-gray-800 whitespace-nowrap",
      headerClassName: "text-right py-2 px-2.5 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => formatRupiah(item.uangGedungTahap1 || 0),
    },
    {
      key: "spp",
      header: "SPP",
      sortable: true,
      className: "text-right py-2 px-2.5 border border-slate-300 text-xs font-mono text-gray-800 whitespace-nowrap",
      headerClassName: "text-right py-2 px-2.5 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => formatRupiah(item.spp || 0),
    },
    {
      key: "heregistrasi",
      header: "Heregistrasi",
      sortable: true,
      className: "text-right py-2 px-2.5 border border-slate-300 text-xs font-mono text-gray-800 whitespace-nowrap",
      headerClassName: "text-right py-2 px-2.5 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => formatRupiah(item.heregistrasi || 0),
    },
    {
      key: "upm",
      header: "UPM (Uang Pembinaan Mahasiswa)",
      sortable: true,
      className: "text-right py-2 px-2.5 border border-slate-300 text-xs font-mono text-gray-800 whitespace-nowrap",
      headerClassName: "text-right py-2 px-2.5 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => formatRupiah(item.upm || 0),
    },
    {
      key: "ujianAkhirSemester",
      header: "Ujian Akhir Semester",
      sortable: true,
      className: "text-right py-2 px-2.5 border border-slate-300 text-xs font-mono text-gray-800 whitespace-nowrap",
      headerClassName: "text-right py-2 px-2.5 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => formatRupiah(item.ujianAkhirSemester || 0),
    },
    {
      key: "uktAfirmasiUika",
      header: "UKT Afirmasi UIKA",
      sortable: true,
      className: "text-right py-2 px-2.5 border border-slate-300 text-xs font-mono text-gray-800 whitespace-nowrap",
      headerClassName: "text-right py-2 px-2.5 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => formatRupiah(item.uktAfirmasiUika || 0),
    },
    {
      key: "praktikumRpl",
      header: "Praktikum Rekayasa Perangkat Lunak",
      sortable: true,
      className: "text-right py-2 px-2.5 border border-slate-300 text-xs font-mono text-gray-800 whitespace-nowrap",
      headerClassName: "text-right py-2 px-2.5 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => formatRupiah(item.praktikumRpl || 0),
    },
    {
      key: "praktikumJarkom",
      header: "Praktikum Jaringan Komputer",
      sortable: true,
      className: "text-right py-2 px-2.5 border border-slate-300 text-xs font-mono text-gray-800 whitespace-nowrap",
      headerClassName: "text-right py-2 px-2.5 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => formatRupiah(item.praktikumJarkom || 0),
    },
    {
      key: "praktikumEmbedded",
      header: "Praktikum Sistem Embedded & Waktu Nyata",
      sortable: true,
      className: "text-right py-2 px-2.5 border border-slate-300 text-xs font-mono text-gray-800 whitespace-nowrap",
      headerClassName: "text-right py-2 px-2.5 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => formatRupiah(item.praktikumEmbedded || 0),
    },
    {
      key: "praktikumMetodeNumerik",
      header: "Praktikum Metode Numerik",
      sortable: true,
      className: "text-right py-2 px-2.5 border border-slate-300 text-xs font-mono text-gray-800 whitespace-nowrap",
      headerClassName: "text-right py-2 px-2.5 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => formatRupiah(item.praktikumMetodeNumerik || 0),
    },
    {
      key: "praktikumAr",
      header: "Praktikum Augmented Reality",
      sortable: true,
      className: "text-right py-2 px-2.5 border border-slate-300 text-xs font-mono text-gray-800 whitespace-nowrap",
      headerClassName: "text-right py-2 px-2.5 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => formatRupiah(item.praktikumAr || 0),
    },
    {
      key: "praktikumKnowledgeGraph",
      header: "Praktikum Knowledge Graph",
      sortable: true,
      className: "text-right py-2 px-2.5 border border-slate-300 text-xs font-mono text-gray-800 whitespace-nowrap",
      headerClassName: "text-right py-2 px-2.5 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => formatRupiah(item.praktikumKnowledgeGraph || 0),
    },
    {
      key: "praktikumPengenalanPola",
      header: "Praktikum Pengenalan Pola",
      sortable: true,
      className: "text-right py-2 px-2.5 border border-slate-300 text-xs font-mono text-gray-800 whitespace-nowrap",
      headerClassName: "text-right py-2 px-2.5 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => formatRupiah(item.praktikumPengenalanPola || 0),
    },
    {
      key: "praktikumStrukturData",
      header: "praktikum Struktur Data",
      sortable: true,
      className: "text-right py-2 px-2.5 border border-slate-300 text-xs font-mono text-gray-800 whitespace-nowrap",
      headerClassName: "text-right py-2 px-2.5 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => formatRupiah(item.praktikumStrukturData || 0),
    },
    {
      key: "sks",
      header: "SKS",
      sortable: true,
      className: "text-right py-2 px-2.5 border border-slate-300 text-xs font-mono font-bold text-blue-900 whitespace-nowrap",
      headerClassName: "text-right py-2 px-2.5 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => formatRupiah(item.sks || 0),
    },
  ];

  const footerRow = (
    <tr className="bg-gray-100 font-bold text-gray-900 border-t-2 border-gray-300">
      <td
        colSpan={3}
        className="py-2.5 px-3 text-center border border-slate-300 font-semibold"
      >
        TOTAL KESELURUHAN
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono">
        {formatRupiah(totalUangGedung)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono">
        {formatRupiah(totalSpp)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono">
        {formatRupiah(totalHeregistrasi)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono">
        {formatRupiah(totalUpm)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono">
        {formatRupiah(totalUas)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono">
        {formatRupiah(totalUktAfirmasi)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono">
        {formatRupiah(totalRpl)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono">
        {formatRupiah(totalJarkom)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono">
        {formatRupiah(totalEmbedded)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono">
        {formatRupiah(totalMetNum)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono">
        {formatRupiah(totalAr)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono">
        {formatRupiah(totalKg)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono">
        {formatRupiah(totalPola)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono">
        {formatRupiah(totalStrukdat)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono text-blue-900 font-bold">
        {formatRupiah(totalSks)}
      </td>
    </tr>
  );

  const handleAction = onCetakFormat || onLihatTabBaru;

  return (
    <div
      id="distribusi-preview-section"
      className="bg-white rounded shadow-md border-t-4 border-t-blue-600 p-6 mb-10 transition-all animate-fade-in"
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Preview Laporan Distribusi Pembayaran
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Unit: {unitKerja || "Universitas Ibn Khaldun"} | Tingkat:{" "}
            {tingkatDistribusi} | Periode: {tglAwal} s.d. {tglAkhir} | Format:{" "}
            {selectedFormat}
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
          title="LAPORAN DISTRIBUSI PEMBAYARAN"
          periode={`${tglAwal} s.d. ${tglAkhir}`}
        />
      )}

      <div className="w-full text-xs">
        <ListTable<DistribusiPembayaranRowData>
          data={data}
          columns={columns}
          rowKey={(row) => `${row.no}-${row.label}`}
          pageSize={10}
          pageSizeOptions={[10, 25, 50, 100]}
          emptyMessage="Tidak ada data distribusi pembayaran"
          showFooter={true}
          footerRow={footerRow}
        />
      </div>
    </div>
  );
};

export default DistribusiPembayaranPreview;

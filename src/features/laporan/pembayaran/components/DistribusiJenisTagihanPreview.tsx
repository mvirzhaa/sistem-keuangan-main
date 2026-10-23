import React from "react";
import { IoPrintOutline } from "react-icons/io5";
import ListTable, { type Column } from "../../../../components/tables/ListTable";
import { KopLaporan } from "../../tagihan/components/KopLaporan";
import type { DistribusiJenisTagihanRowData } from "../utils/generatePembayaranLanjutanHtml";

interface DistribusiJenisTagihanPreviewProps {
  useKop?: boolean;
  unitKerja: string;
  tglAwal: string;
  tglAkhir: string;
  selectedFormat: string;
  data: DistribusiJenisTagihanRowData[];
  formatRupiah: (num: number) => string;
  onLihatTabBaru: () => void;
  onCetakFormat?: () => void;
}

export const DistribusiJenisTagihanPreview: React.FC<
  DistribusiJenisTagihanPreviewProps
> = ({
  useKop = true,
  unitKerja,
  tglAwal,
  tglAkhir,
  selectedFormat,
  data,
  formatRupiah,
  onLihatTabBaru,
  onCetakFormat,
}) => {
  const totalSpp = data.reduce((acc, curr) => acc + (curr.spp || 0), 0);
  const totalHeregistrasi = data.reduce((acc, curr) => acc + (curr.heregistrasi || 0), 0);
  const totalUpm = data.reduce((acc, curr) => acc + (curr.upm || 0), 0);
  const totalUktAfirmasi = data.reduce((acc, curr) => acc + (curr.uktAfirmasiUika || 0), 0);
  const totalUas = data.reduce((acc, curr) => acc + (curr.ujianAkhirSemester || 0), 0);
  const totalRpl = data.reduce((acc, curr) => acc + (curr.praktikumRpl || 0), 0);
  const totalJarkom = data.reduce((acc, curr) => acc + (curr.praktikumJarkom || 0), 0);
  const totalMetNum = data.reduce((acc, curr) => acc + (curr.praktikumMetodeNumerik || 0), 0);
  const totalStrukdat = data.reduce((acc, curr) => acc + (curr.praktikumStrukturData || 0), 0);
  const totalSks = data.reduce((acc, curr) => acc + (curr.sks || 0), 0);
  const totalWakaf = data.reduce((acc, curr) => acc + (curr.wakafMasjid || 0), 0);
  const totalTaaruf = data.reduce((acc, curr) => acc + (curr.taaruf || 0), 0);
  const totalSksSem1 = data.reduce((acc, curr) => acc + (curr.sksSemester1 || 0), 0);
  const totalKolokium = data.reduce((acc, curr) => acc + (curr.kolokium || 0), 0);
  const totalUangGedung = data.reduce((acc, curr) => acc + (curr.uangGedungTahap1 || 0), 0);
  const totalKg = data.reduce((acc, curr) => acc + (curr.praktikumKnowledgeGraph || 0), 0);
  const totalPola = data.reduce((acc, curr) => acc + (curr.praktikumPengenalanPola || 0), 0);
  const totalAlgoritma = data.reduce((acc, curr) => acc + (curr.praktikumAlgoritma || 0), 0);
  const totalKp = data.reduce((acc, curr) => acc + (curr.kerjaPraktik || 0), 0);
  const totalEmbedded = data.reduce((acc, curr) => acc + (curr.praktikumEmbedded || 0), 0);
  const totalAr = data.reduce((acc, curr) => acc + (curr.praktikumAr || 0), 0);
  const totalSumbangan = data.reduce((acc, curr) => acc + (curr.sumbanganFasilitas || 0), 0);
  const totalDaftarRusunawa = data.reduce((acc, curr) => acc + (curr.biayaPendaftaranRusunawa || 0), 0);
  const totalRusunawa = data.reduce((acc, curr) => acc + (curr.rusunawa || 0), 0);
  const totalInderaJauh = data.reduce((acc, curr) => acc + (curr.praktikumPenginderaanJauh || 0), 0);
  const totalPerangkatBergerak = data.reduce((acc, curr) => acc + (curr.praktikumPerangkatBergerak || 0), 0);
  const totalBhsInggris = data.reduce((acc, curr) => acc + (curr.praktikumBahasaInggris || 0), 0);
  const totalKeamanan = data.reduce((acc, curr) => acc + (curr.praktikumKeamananInformasi || 0), 0);
  const totalModelSpasial = data.reduce((acc, curr) => acc + (curr.praktikumPermodelanSpasial || 0), 0);
  const totalWeb = data.reduce((acc, curr) => acc + (curr.praktikumPemrogramanWeb || 0), 0);
  const totalSig = data.reduce((acc, curr) => acc + (curr.praktikumSig || 0), 0);
  const totalModelSimulasi = data.reduce((acc, curr) => acc + (curr.praktikumPermodelanSimulasi || 0), 0);
  const grandTotal = data.reduce((acc, curr) => acc + (curr.total || curr.totalPembayaran || 0), 0);

  const colCls = "text-right py-2 px-2.5 border border-slate-300 text-xs font-mono text-gray-800 whitespace-nowrap";
  const headerCls = "text-right py-2 px-2.5 border border-slate-300 font-semibold whitespace-nowrap";

  const columns: Column<DistribusiJenisTagihanRowData>[] = [
    {
      key: "tanggal",
      header: "Tanggal",
      sortable: true,
      className: "text-center py-2 px-2.5 border border-slate-300 text-xs font-mono font-semibold text-gray-800 whitespace-nowrap",
      headerClassName: "text-center py-2 px-2.5 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => item.tanggal,
    },
    {
      key: "spp",
      header: "SPP",
      sortable: true,
      className: colCls,
      headerClassName: headerCls,
      render: (item) => formatRupiah(item.spp || 0),
    },
    {
      key: "heregistrasi",
      header: "Heregistrasi",
      sortable: true,
      className: colCls,
      headerClassName: headerCls,
      render: (item) => formatRupiah(item.heregistrasi || 0),
    },
    {
      key: "upm",
      header: "UPM (Uang Pembinaan Mahasiswa)",
      sortable: true,
      className: colCls,
      headerClassName: headerCls,
      render: (item) => formatRupiah(item.upm || 0),
    },
    {
      key: "uktAfirmasiUika",
      header: "UKT Afirmasi UIKA",
      sortable: true,
      className: colCls,
      headerClassName: headerCls,
      render: (item) => formatRupiah(item.uktAfirmasiUika || 0),
    },
    {
      key: "ujianAkhirSemester",
      header: "Ujian Akhir Semester",
      sortable: true,
      className: colCls,
      headerClassName: headerCls,
      render: (item) => formatRupiah(item.ujianAkhirSemester || 0),
    },
    {
      key: "praktikumRpl",
      header: "Praktikum Rekayasa Perangkat Lunak",
      sortable: true,
      className: colCls,
      headerClassName: headerCls,
      render: (item) => formatRupiah(item.praktikumRpl || 0),
    },
    {
      key: "praktikumJarkom",
      header: "Praktikum Jaringan Komputer",
      sortable: true,
      className: colCls,
      headerClassName: headerCls,
      render: (item) => formatRupiah(item.praktikumJarkom || 0),
    },
    {
      key: "praktikumMetodeNumerik",
      header: "Praktikum Metode Numerik",
      sortable: true,
      className: colCls,
      headerClassName: headerCls,
      render: (item) => formatRupiah(item.praktikumMetodeNumerik || 0),
    },
    {
      key: "praktikumStrukturData",
      header: "praktikum Struktur Data",
      sortable: true,
      className: colCls,
      headerClassName: headerCls,
      render: (item) => formatRupiah(item.praktikumStrukturData || 0),
    },
    {
      key: "sks",
      header: "SKS",
      sortable: true,
      className: colCls,
      headerClassName: headerCls,
      render: (item) => formatRupiah(item.sks || 0),
    },
    {
      key: "wakafMasjid",
      header: "Wakaf Masjid Ibn Khaldun",
      sortable: true,
      className: colCls,
      headerClassName: headerCls,
      render: (item) => formatRupiah(item.wakafMasjid || 0),
    },
    {
      key: "taaruf",
      header: "Ta'aruf",
      sortable: true,
      className: colCls,
      headerClassName: headerCls,
      render: (item) => formatRupiah(item.taaruf || 0),
    },
    {
      key: "sksSemester1",
      header: "SKS Semester 1",
      sortable: true,
      className: colCls,
      headerClassName: headerCls,
      render: (item) => formatRupiah(item.sksSemester1 || 0),
    },
    {
      key: "kolokium",
      header: "Kolokium",
      sortable: true,
      className: colCls,
      headerClassName: headerCls,
      render: (item) => formatRupiah(item.kolokium || 0),
    },
    {
      key: "uangGedungTahap1",
      header: "Uang Gedung Tahap 1",
      sortable: true,
      className: colCls,
      headerClassName: headerCls,
      render: (item) => formatRupiah(item.uangGedungTahap1 || 0),
    },
    {
      key: "praktikumKnowledgeGraph",
      header: "Praktikum Knowledge Graph",
      sortable: true,
      className: colCls,
      headerClassName: headerCls,
      render: (item) => formatRupiah(item.praktikumKnowledgeGraph || 0),
    },
    {
      key: "praktikumPengenalanPola",
      header: "Praktikum Pengenalan Pola",
      sortable: true,
      className: colCls,
      headerClassName: headerCls,
      render: (item) => formatRupiah(item.praktikumPengenalanPola || 0),
    },
    {
      key: "praktikumAlgoritma",
      header: "Praktikum Algoritma dan pemrograman",
      sortable: true,
      className: colCls,
      headerClassName: headerCls,
      render: (item) => formatRupiah(item.praktikumAlgoritma || 0),
    },
    {
      key: "kerjaPraktik",
      header: "Kerja Praktik",
      sortable: true,
      className: colCls,
      headerClassName: headerCls,
      render: (item) => formatRupiah(item.kerjaPraktik || 0),
    },
    {
      key: "praktikumEmbedded",
      header: "Praktikum Sistem Embedded & Waktu Nyata",
      sortable: true,
      className: colCls,
      headerClassName: headerCls,
      render: (item) => formatRupiah(item.praktikumEmbedded || 0),
    },
    {
      key: "praktikumAr",
      header: "Praktikum Augmented Reality",
      sortable: true,
      className: colCls,
      headerClassName: headerCls,
      render: (item) => formatRupiah(item.praktikumAr || 0),
    },
    {
      key: "sumbanganFasilitas",
      header: "Sumbangan Fasilitas",
      sortable: true,
      className: colCls,
      headerClassName: headerCls,
      render: (item) => formatRupiah(item.sumbanganFasilitas || 0),
    },
    {
      key: "biayaPendaftaranRusunawa",
      header: "Biaya Pendaftaran Rusunawa",
      sortable: true,
      className: colCls,
      headerClassName: headerCls,
      render: (item) => formatRupiah(item.biayaPendaftaranRusunawa || 0),
    },
    {
      key: "rusunawa",
      header: "Rusunawa",
      sortable: true,
      className: colCls,
      headerClassName: headerCls,
      render: (item) => formatRupiah(item.rusunawa || 0),
    },
    {
      key: "praktikumPenginderaanJauh",
      header: "Praktikum Penginderaan Jauh I",
      sortable: true,
      className: colCls,
      headerClassName: headerCls,
      render: (item) => formatRupiah(item.praktikumPenginderaanJauh || 0),
    },
    {
      key: "praktikumPerangkatBergerak",
      header: "Praktikum Pemrograman Perangkat Bergerak",
      sortable: true,
      className: colCls,
      headerClassName: headerCls,
      render: (item) => formatRupiah(item.praktikumPerangkatBergerak || 0),
    },
    {
      key: "praktikumBahasaInggris",
      header: "Praktikum Bahasa Inggris",
      sortable: true,
      className: colCls,
      headerClassName: headerCls,
      render: (item) => formatRupiah(item.praktikumBahasaInggris || 0),
    },
    {
      key: "praktikumKeamananInformasi",
      header: "Praktikum Keamanan Informasi",
      sortable: true,
      className: colCls,
      headerClassName: headerCls,
      render: (item) => formatRupiah(item.praktikumKeamananInformasi || 0),
    },
    {
      key: "praktikumPermodelanSpasial",
      header: "Praktikum Permodelan Spasial",
      sortable: true,
      className: colCls,
      headerClassName: headerCls,
      render: (item) => formatRupiah(item.praktikumPermodelanSpasial || 0),
    },
    {
      key: "praktikumPemrogramanWeb",
      header: "Praktikum Perancangan & Pemrograman Web",
      sortable: true,
      className: colCls,
      headerClassName: headerCls,
      render: (item) => formatRupiah(item.praktikumPemrogramanWeb || 0),
    },
    {
      key: "praktikumSig",
      header: "Praktikum Sistem Informasi Geografis",
      sortable: true,
      className: colCls,
      headerClassName: headerCls,
      render: (item) => formatRupiah(item.praktikumSig || 0),
    },
    {
      key: "praktikumPermodelanSimulasi",
      header: "Praktikum Permodelan dan Simulasi",
      sortable: true,
      className: colCls,
      headerClassName: headerCls,
      render: (item) => formatRupiah(item.praktikumPermodelanSimulasi || 0),
    },
    {
      key: "total",
      header: "Total",
      sortable: true,
      className: "text-right py-2 px-2.5 border border-slate-300 text-xs font-mono font-bold text-blue-900 whitespace-nowrap",
      headerClassName: "text-right py-2 px-2.5 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => formatRupiah(item.total || item.totalPembayaran || 0),
    },
  ];

  const footerRow = (
    <tr className="bg-gray-100 font-bold text-gray-900 border-t-2 border-gray-300">
      <td className="py-2.5 px-3 text-center border border-slate-300 font-semibold whitespace-nowrap">
        TOTAL KESELURUHAN
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono whitespace-nowrap">
        {formatRupiah(totalSpp)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono whitespace-nowrap">
        {formatRupiah(totalHeregistrasi)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono whitespace-nowrap">
        {formatRupiah(totalUpm)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono whitespace-nowrap">
        {formatRupiah(totalUktAfirmasi)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono whitespace-nowrap">
        {formatRupiah(totalUas)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono whitespace-nowrap">
        {formatRupiah(totalRpl)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono whitespace-nowrap">
        {formatRupiah(totalJarkom)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono whitespace-nowrap">
        {formatRupiah(totalMetNum)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono whitespace-nowrap">
        {formatRupiah(totalStrukdat)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono whitespace-nowrap">
        {formatRupiah(totalSks)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono whitespace-nowrap">
        {formatRupiah(totalWakaf)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono whitespace-nowrap">
        {formatRupiah(totalTaaruf)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono whitespace-nowrap">
        {formatRupiah(totalSksSem1)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono whitespace-nowrap">
        {formatRupiah(totalKolokium)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono whitespace-nowrap">
        {formatRupiah(totalUangGedung)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono whitespace-nowrap">
        {formatRupiah(totalKg)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono whitespace-nowrap">
        {formatRupiah(totalPola)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono whitespace-nowrap">
        {formatRupiah(totalAlgoritma)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono whitespace-nowrap">
        {formatRupiah(totalKp)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono whitespace-nowrap">
        {formatRupiah(totalEmbedded)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono whitespace-nowrap">
        {formatRupiah(totalAr)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono whitespace-nowrap">
        {formatRupiah(totalSumbangan)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono whitespace-nowrap">
        {formatRupiah(totalDaftarRusunawa)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono whitespace-nowrap">
        {formatRupiah(totalRusunawa)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono whitespace-nowrap">
        {formatRupiah(totalInderaJauh)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono whitespace-nowrap">
        {formatRupiah(totalPerangkatBergerak)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono whitespace-nowrap">
        {formatRupiah(totalBhsInggris)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono whitespace-nowrap">
        {formatRupiah(totalKeamanan)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono whitespace-nowrap">
        {formatRupiah(totalModelSpasial)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono whitespace-nowrap">
        {formatRupiah(totalWeb)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono whitespace-nowrap">
        {formatRupiah(totalSig)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono whitespace-nowrap">
        {formatRupiah(totalModelSimulasi)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono text-blue-900 font-bold whitespace-nowrap">
        {formatRupiah(grandTotal)}
      </td>
    </tr>
  );

  const handleAction = onCetakFormat || onLihatTabBaru;

  return (
    <div
      id="distribusi-tagihan-preview-section"
      className="bg-white rounded shadow-md border-t-4 border-t-blue-600 p-6 mb-10 transition-all animate-fade-in"
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Preview Laporan Distribusi Pembayaran Tagihan Per Tanggal
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Unit: {unitKerja || "Universitas Ibn Khaldun"} | Rentang: {tglAwal}{" "}
            s.d. {tglAkhir} | Format: {selectedFormat}
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
          title="LAPORAN DISTRIBUSI PEMBAYARAN TAGIHAN PER TANGGAL"
          periode={`${tglAwal} s.d. ${tglAkhir}`}
        />
      )}

      <div className="w-full text-xs">
        <ListTable<DistribusiJenisTagihanRowData>
          data={data}
          columns={columns}
          rowKey={(row) => `${row.tanggal}`}
          pageSize={10}
          pageSizeOptions={[10, 25, 50, 100]}
          emptyMessage="Tidak ada data distribusi tagihan per tanggal"
          showFooter={true}
          footerRow={footerRow}
        />
      </div>
    </div>
  );
};

export default DistribusiJenisTagihanPreview;

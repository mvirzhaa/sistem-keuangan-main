import React from "react";
import { IoPrintOutline } from "react-icons/io5";
import ListTable, { type Column } from "../../../../components/tables/ListTable";
import { KopLaporan } from "../../tagihan/components/KopLaporan";
import type { DistribusiPembayaranPerTanggalRowData } from "../utils/generatePembayaranAkhirHtml";

interface DistribusiPembayaranPerTanggalPreviewProps {
  useKop?: boolean;
  unitKerja: string;
  tglAwal: string;
  tglAkhir: string;
  selectedFormat: string;
  data: DistribusiPembayaranPerTanggalRowData[];
  formatRupiah: (num: number) => string;
  onLihatTabBaru: () => void;
  onCetakFormat?: () => void;
}

export const DistribusiPembayaranPerTanggalPreview: React.FC<
  DistribusiPembayaranPerTanggalPreviewProps
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
  const totalBsi = data.reduce((acc, curr) => acc + (curr.bankSyariahIndonesia || 0), 0);
  const totalBprs = data.reduce((acc, curr) => acc + (curr.bprsAmanahUmmah || 0), 0);
  const totalTokped = data.reduce((acc, curr) => acc + (curr.tokopedia || 0), 0);
  const totalAmanahFormulir = data.reduce((acc, curr) => acc + (curr.bankAmanahUmmahFormulir || 0), 0);
  const totalAceh = data.reduce((acc, curr) => acc + (curr.bankAceh || 0), 0);
  const totalBca = data.reduce((acc, curr) => acc + (curr.bankCentralAsia || 0), 0);
  const totalBtn = data.reduce((acc, curr) => acc + (curr.btnSyariah || 0), 0);
  const totalKasirBask = data.reduce((acc, curr) => acc + (curr.kasirBaskUika || 0), 0);
  const totalMuamalat = data.reduce((acc, curr) => acc + (curr.bankMuamalat || 0), 0);
  const totalNagari = data.reduce((acc, curr) => acc + (curr.bankNagari || 0), 0);
  const totalOvo = data.reduce((acc, curr) => acc + (curr.ovo || 0), 0);
  const totalShopee = data.reduce((acc, curr) => acc + (curr.shopee || 0), 0);
  const totalMpn = data.reduce((acc, curr) => acc + (curr.mpnG3 || 0), 0);
  const grandTotal = data.reduce((acc, curr) => acc + (curr.total || curr.totalPembayaran || 0), 0);

  const colCls = "text-right py-2 px-2.5 border border-slate-300 text-xs font-mono text-gray-800 whitespace-nowrap";
  const headerCls = "text-right py-2 px-2.5 border border-slate-300 font-semibold whitespace-nowrap";

  const columns: Column<DistribusiPembayaranPerTanggalRowData>[] = [
    {
      key: "tanggal",
      header: "Tanggal",
      sortable: true,
      className: "text-center py-2 px-2.5 border border-slate-300 text-xs font-mono font-semibold text-gray-800 whitespace-nowrap",
      headerClassName: "text-center py-2 px-2.5 border border-slate-300 font-semibold whitespace-nowrap",
      render: (item) => item.tanggal,
    },
    {
      key: "bankSyariahIndonesia",
      header: "Bank Syariah Indonesia",
      sortable: true,
      className: colCls,
      headerClassName: headerCls,
      render: (item) => formatRupiah(item.bankSyariahIndonesia || 0),
    },
    {
      key: "bprsAmanahUmmah",
      header: "BPRS Amanah Ummah",
      sortable: true,
      className: colCls,
      headerClassName: headerCls,
      render: (item) => formatRupiah(item.bprsAmanahUmmah || 0),
    },
    {
      key: "tokopedia",
      header: "Tokopedia",
      sortable: true,
      className: colCls,
      headerClassName: headerCls,
      render: (item) => formatRupiah(item.tokopedia || 0),
    },
    {
      key: "bankAmanahUmmahFormulir",
      header: "Bank Amanah Ummah Formulir",
      sortable: true,
      className: colCls,
      headerClassName: headerCls,
      render: (item) => formatRupiah(item.bankAmanahUmmahFormulir || 0),
    },
    {
      key: "bankAceh",
      header: "Bank Aceh",
      sortable: true,
      className: colCls,
      headerClassName: headerCls,
      render: (item) => formatRupiah(item.bankAceh || 0),
    },
    {
      key: "bankCentralAsia",
      header: "Bank Central Asia",
      sortable: true,
      className: colCls,
      headerClassName: headerCls,
      render: (item) => formatRupiah(item.bankCentralAsia || 0),
    },
    {
      key: "btnSyariah",
      header: "BTN Syariah",
      sortable: true,
      className: colCls,
      headerClassName: headerCls,
      render: (item) => formatRupiah(item.btnSyariah || 0),
    },
    {
      key: "kasirBaskUika",
      header: "Kasir BASK UIKA",
      sortable: true,
      className: colCls,
      headerClassName: headerCls,
      render: (item) => formatRupiah(item.kasirBaskUika || 0),
    },
    {
      key: "bankMuamalat",
      header: "Bank Muamalat",
      sortable: true,
      className: colCls,
      headerClassName: headerCls,
      render: (item) => formatRupiah(item.bankMuamalat || 0),
    },
    {
      key: "bankNagari",
      header: "Bank Nagari",
      sortable: true,
      className: colCls,
      headerClassName: headerCls,
      render: (item) => formatRupiah(item.bankNagari || 0),
    },
    {
      key: "ovo",
      header: "OVO",
      sortable: true,
      className: colCls,
      headerClassName: headerCls,
      render: (item) => formatRupiah(item.ovo || 0),
    },
    {
      key: "shopee",
      header: "Shopee",
      sortable: true,
      className: colCls,
      headerClassName: headerCls,
      render: (item) => formatRupiah(item.shopee || 0),
    },
    {
      key: "mpnG3",
      header: "MPN G3",
      sortable: true,
      className: colCls,
      headerClassName: headerCls,
      render: (item) => formatRupiah(item.mpnG3 || 0),
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
        {formatRupiah(totalBsi)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono whitespace-nowrap">
        {formatRupiah(totalBprs)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono whitespace-nowrap">
        {formatRupiah(totalTokped)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono whitespace-nowrap">
        {formatRupiah(totalAmanahFormulir)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono whitespace-nowrap">
        {formatRupiah(totalAceh)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono whitespace-nowrap">
        {formatRupiah(totalBca)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono whitespace-nowrap">
        {formatRupiah(totalBtn)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono whitespace-nowrap">
        {formatRupiah(totalKasirBask)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono whitespace-nowrap">
        {formatRupiah(totalMuamalat)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono whitespace-nowrap">
        {formatRupiah(totalNagari)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono whitespace-nowrap">
        {formatRupiah(totalOvo)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono whitespace-nowrap">
        {formatRupiah(totalShopee)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono whitespace-nowrap">
        {formatRupiah(totalMpn)}
      </td>
      <td className="py-2.5 px-2.5 text-right border border-slate-300 font-mono text-blue-900 font-bold whitespace-nowrap">
        {formatRupiah(grandTotal)}
      </td>
    </tr>
  );

  const handleAction = onCetakFormat || onLihatTabBaru;

  return (
    <div
      id="distribusi-channel-preview-section"
      className="bg-white rounded shadow-md border-t-4 border-t-blue-600 p-6 mb-10 transition-all animate-fade-in"
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Preview Laporan Distribusi Pembayaran Akun Channel Per Tanggal
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
          title="LAPORAN DISTRIBUSI PEMBAYARAN AKUN CHANNEL PER TANGGAL"
          periode={`${tglAwal} s.d. ${tglAkhir}`}
        />
      )}

      <div className="w-full text-xs">
        <ListTable<DistribusiPembayaranPerTanggalRowData>
          data={data}
          columns={columns}
          rowKey={(row) => `${row.tanggal}`}
          pageSize={10}
          pageSizeOptions={[10, 25, 50, 100]}
          emptyMessage="Tidak ada data distribusi akun channel"
          showFooter={true}
          footerRow={footerRow}
        />
      </div>
    </div>
  );
};

export default DistribusiPembayaranPerTanggalPreview;

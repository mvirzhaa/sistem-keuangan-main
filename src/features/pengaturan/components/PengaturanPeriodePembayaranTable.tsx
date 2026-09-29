import React from "react";
import ListTable, { type Column } from "../../../components/tables/ListTable";
import { IoPencil } from "react-icons/io5";

interface PeriodePembayaranRow {
  id: string;
  kode: string;
  namaPeriode: string;
  tglAwalKuliah: string;
  tglAkhirKuliah: string;
  aktif: boolean;
  tglAwalPembayaran?: string;
  tglAkhirPembayaran?: string;
}

const data: PeriodePembayaranRow[] = [
  {
    id: "1",
    kode: "20252",
    namaPeriode: "2025 Genap",
    tglAwalKuliah: "16 Feb 2026",
    tglAkhirKuliah: "13 Jun 2026",
    aktif: false,
    tglAwalPembayaran: "",
    tglAkhirPembayaran: "",
  },
  {
    id: "2",
    kode: "20251",
    namaPeriode: "2025 Ganjil",
    tglAwalKuliah: "15 Sep 2025",
    tglAkhirKuliah: "17 Jan 2026",
    aktif: false,
    tglAwalPembayaran: "1 Des 2024",
    tglAkhirPembayaran: "31 Des 2024",
  },
  {
    id: "3",
    kode: "20242",
    namaPeriode: "2024 Genap",
    tglAwalKuliah: "10 Feb 2025",
    tglAkhirKuliah: "14 Jun 2025",
    aktif: true,
    tglAwalPembayaran: "3 Feb 2025",
    tglAkhirPembayaran: "31 Agu 2025",
  },
  {
    id: "4",
    kode: "20241",
    namaPeriode: "2024 Ganjil",
    tglAwalKuliah: "17 Sep 2024",
    tglAkhirKuliah: "4 Jan 2025",
    aktif: false,
    tglAwalPembayaran: "2 Jan 2024",
    tglAkhirPembayaran: "30 Nov 2024",
  },
];

const columns: Column<PeriodePembayaranRow>[] = [
  {
    key: "kode",
    header: "Kode",
    width: "8%",
    className: "text-center font-bold",
    render: (item) => <span>{item.kode}</span>,
  },
  {
    key: "namaPeriode",
    header: "Nama Periode",
    width: "15%",
    render: (item) => <span>{item.namaPeriode}</span>,
  },
  {
    key: "tglAwalKuliah",
    header: "Tanggal Awal Kuliah",
    width: "15%",
    render: (item) => <span>{item.tglAwalKuliah}</span>,
  },
  {
    key: "tglAkhirKuliah",
    header: "Tanggal Akhir Kuliah",
    width: "15%",
    render: (item) => <span>{item.tglAkhirKuliah}</span>,
  },
  {
    key: "aktif",
    header: "Aktif?",
    width: "7%",
    className: "text-center",
    render: (item) =>
      item.aktif ? (
        <span className="text-green-600 text-lg font-bold">✔</span>
      ) : (
        <span className="text-red-600 text-lg font-bold">✖</span>
      ),
  },
  {
    key: "tglAwalPembayaran",
    header: "Tanggal Awal Pembayaran",
    width: "15%",
    render: (item) => <span>{item.tglAwalPembayaran || ""}</span>,
  },
  {
    key: "tglAkhirPembayaran",
    header: "Tanggal Akhir Pembayaran",
    width: "15%",
    render: (item) => <span>{item.tglAkhirPembayaran || ""}</span>,
  },
  {
    key: "aksi",
    header: "Aksi",
    width: "10%",
    className: "text-center",
    render: () => (
      <button className="p-1.5 bg-amber-500 text-white rounded hover:bg-amber-600">
        <IoPencil size={16} />
      </button>
    ),
  },
];

const PengaturanPeriodePembayaranTable: React.FC = () => {
  return (
    <div className="overflow-x-auto text-xs">
      <ListTable
        data={data}
        columns={columns}
        rowKey={(item) => item.id}
        headerClassName="bg-blue-900 text-white"
        rowClassName={(_, idx) => (idx % 2 === 0 ? "bg-white" : "bg-gray-50")}
        showFooter={true}
        emptyMessage="Tidak ada data periode pembayaran"
      />
    </div>
  );
};

export default PengaturanPeriodePembayaranTable;

import React, { useState } from "react";
import ListTable, { type Column } from "../../../components/tables/ListTable";

interface KeuanganData {
  id: string;
  no: number;
  kodeTransaksi: string;
  jenisTransaksi: string;
  periode: string;
  tanggal: string;
  idPengguna: string;
  nama: string;
  uraian: string;
  debet: number | null;
  kredit: number | null;
}

interface KeuanganTableProps {
  data: KeuanganData[];
  loading?: boolean;
  onView?: (item: KeuanganData) => void;
  onSelectionChange?: (selectedItems: KeuanganData[]) => void;
}

const KeuanganTable: React.FC<KeuanganTableProps> = ({ data, loading = false, onView, onSelectionChange }) => {
  const [selectedItems, setSelectedItems] = useState<KeuanganData[]>([]);

  const handleSelectionChange = (items: KeuanganData[]) => {
    setSelectedItems(items);
    if (onSelectionChange) {
      onSelectionChange(items);
    }
  };

  // Format number to currency
  const formatCurrency = (value: number | null) => {
    if (value === null) return "";
    return value.toLocaleString("id-ID");
  };

  const columns: Column<KeuanganData>[] = [
    {
      key: "no",
      header: "No.",
      width: "60px",
      className: "text-center",
    },
    {
      key: "kodeTransaksi",
      header: "Kode Transaksi",
      sortable: true,
    },
    {
      key: "jenisTransaksi",
      header: "Jenis Transaksi",
      sortable: true,
      className: "text-center",
      render: (item) => <span className={`font-medium ${item.jenisTransaksi === "INV" ? "text-blue-600" : "text-green-600"}`}>{item.jenisTransaksi}</span>,
      width: "120px",
    },
    {
      key: "periode",
      header: "Periode",
      sortable: true,
      className: "text-center",
      width: "100px",
    },
    {
      key: "tanggal",
      header: "Tanggal",
      sortable: true,
      className: "text-center",
      width: "150px",
    },
    {
      key: "idPengguna",
      header: "ID",
      sortable: true,
    },
    {
      key: "nama",
      header: "Nama",
      sortable: true,
    },
    {
      key: "uraian",
      header: "Uraian",
      sortable: true,
    },
    {
      key: "debet",
      header: "Debet",
      sortable: true,
      className: "text-right",
      render: (item) => formatCurrency(item.debet),
    },
    {
      key: "kredit",
      header: "Kredit",
      sortable: true,
      className: "text-right",
      render: (item) => formatCurrency(item.kredit),
    },
  ];

  return (
    <ListTable
      data={data}
      columns={columns}
      rowKey={(item) => item.id}
      initialSortColumn="tanggal"
      initialSortDirection="desc"
      pageSize={10}
      pageSizeOptions={[10, 25, 50, 100]}
      selectable={false}
      onSelectionChange={handleSelectionChange}
      className="w-full text-xs"
      headerClassName="text-xs"
      loading={loading}
      emptyMessage="Tidak ada data transaksi keuangan"
    />
  );
};

export default KeuanganTable;

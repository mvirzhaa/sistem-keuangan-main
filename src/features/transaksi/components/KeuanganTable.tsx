import React, { useState } from "react";
import ListTable, { type Column } from "../../../components/tables/ListTable";
import type { TransaksiKeuanganData } from "../services/transaksi.api";

export type KeuanganData = TransaksiKeuanganData;

interface KeuanganTableProps {
  data: KeuanganData[];
  loading?: boolean;
  onView?: (item: KeuanganData) => void;
  onSelectionChange?: (selectedItems: KeuanganData[]) => void;
}

const KeuanganTable: React.FC<KeuanganTableProps> = ({
  data,
  loading = false,
  onView,
  onSelectionChange,
}) => {
  const [selectedItems, setSelectedItems] = useState<KeuanganData[]>([]);

  const handleSelectionChange = (items: KeuanganData[]) => {
    setSelectedItems(items);
    if (onSelectionChange) {
      onSelectionChange(items);
    }
  };

  // Format number to currency
  const formatCurrency = (value: number | null) => {
    if (value === null || value === undefined) return "";
    return value.toLocaleString("id-ID");
  };

  const getJenisBadge = (jenis: string) => {
    switch (jenis?.toUpperCase()) {
      case "INV":
        return "text-blue-600 font-semibold";
      case "DEP":
        return "text-purple-600 font-semibold";
      case "PAY":
        return "text-emerald-600 font-semibold";
      default:
        return "text-gray-700 font-medium";
    }
  };

  const columns: Column<KeuanganData>[] = [
    {
      key: "no",
      header: "No.",
      width: "50px",
      className: "text-center",
      render: (_item, index) => index + 1,
    },
    {
      key: "kodeTransaksi",
      header: "Kode Transaksi",
      sortable: true,
      className: "text-center",
    },
    {
      key: "jenisTransaksi",
      header: "Jenis Transaksi",
      sortable: true,
      className: "text-center",
      render: (item) => (
        <span className={getJenisBadge(item.jenisTransaksi)}>
          {item.jenisTransaksi}
        </span>
      ),
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
      width: "160px",
    },
    {
      key: "idPengguna",
      header: "ID",
      sortable: true,
      className: "text-center",
    },
    {
      key: "nama",
      header: "Nama",
      sortable: true,
      className: "text-left font-medium",
    },
    {
      key: "uraian",
      header: "Uraian",
      sortable: true,
      className: "text-left",
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
    <div className="w-full bg-white rounded-md overflow-hidden">
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
        className="w-full text-xs bg-white"
        headerClassName="text-xs"
        loading={loading}
        emptyMessage="Tidak ada data transaksi keuangan"
      />
    </div>
  );
};

export default KeuanganTable;

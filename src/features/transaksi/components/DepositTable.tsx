import React, { useState } from "react";
import ListTable, { type Column } from "../../../components/tables/ListTable";
import { IoEye } from "react-icons/io5";

export interface DepositData {
  id: string;
  kodeDeposit: string;
  nim: string;
  nama: string;
  periode: string;
  tanggal: string;
  metodePembayaran: string;
  channel: string;
  masuk: number | null;
  keluar: number | null;
}

interface DepositTableProps {
  data: DepositData[];
  loading?: boolean;
  onView?: (item: DepositData) => void;
  onSelectionChange?: (selectedItems: DepositData[]) => void;
}

const DepositTable: React.FC<DepositTableProps> = ({ data, loading = false, onView, onSelectionChange }) => {
  const [selectedItems, setSelectedItems] = useState<DepositData[]>([]);

  const handleSelectionChange = (items: DepositData[]) => {
    setSelectedItems(items);
    if (onSelectionChange) {
      onSelectionChange(items);
    }
  };

  // Format number to currency
  const formatCurrency = (value: number | null) => {
    if (value === null || value === 0) return "";
    return value.toLocaleString("id-ID");
  };

  const columns: Column<DepositData>[] = [
    {
      key: "kodeDeposit",
      header: "Kode Deposit",
      sortable: true,
    },
    {
      key: "nim",
      header: "NIM",
      sortable: true,
    },
    {
      key: "nama",
      header: "Nama",
      sortable: true,
    },
    {
      key: "periode",
      header: "Periode",
      sortable: true,
      className: "text-center",
    },
    {
      key: "tanggal",
      header: "Tanggal",
      sortable: true,
      className: "text-center",
    },
    {
      key: "metodePembayaran",
      header: "Metode Pembayaran",
      sortable: true,
    },
    {
      key: "channel",
      header: "Channel",
      sortable: true,
    },
    {
      key: "masuk",
      header: "Masuk",
      sortable: true,
      className: "text-right",
      render: (item) => formatCurrency(item.masuk),
    },
    {
      key: "keluar",
      header: "Keluar",
      sortable: true,
      className: "text-right",
      render: (item) => formatCurrency(item.keluar),
    },
    {
      key: "actions",
      header: "Aksi",
      render: (item) => (
        <div className="flex justify-center">
          {onView && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onView(item);
              }}
              className="p-1.5 bg-cyan-500 text-white rounded hover:bg-cyan-600"
              title="Lihat detail"
            >
              <IoEye />
            </button>
          )}
        </div>
      ),
      className: "text-center",
      width: "70px",
    },
  ];

  return (
    <ListTable
      data={data}
      columns={columns}
      rowKey={(item) => item.id}
      initialSortColumn="kodeDeposit"
      initialSortDirection="asc"
      pageSize={10}
      pageSizeOptions={[10, 25, 50, 100]}
      selectable={true}
      onSelectionChange={handleSelectionChange}
      className="w-full text-xs"
      headerClassName="text-xs"
      loading={loading}
      emptyMessage="Tidak ada data deposit"
    />
  );
};

export default DepositTable;

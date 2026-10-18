import React, { useState } from "react";
import ListTable, { type Column } from "../../../components/tables/ListTable";
import { IoEye, IoTrash } from "react-icons/io5";

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
  posisiTransaksi?: string;
}

interface DepositTableProps {
  data: DepositData[];
  loading?: boolean;
  onView?: (item: DepositData) => void;
  onDelete?: (item: DepositData) => void;
  onSelectionChange?: (selectedItems: DepositData[]) => void;
}

const DepositTable: React.FC<DepositTableProps> = ({
  data,
  loading = false,
  onView,
  onDelete,
  onSelectionChange,
}) => {
  const [selectedItems, setSelectedItems] = useState<DepositData[]>([]);

  const handleSelectionChange = (items: DepositData[]) => {
    setSelectedItems(items);
    if (onSelectionChange) {
      onSelectionChange(items);
    }
  };

  // Format number to currency
  const formatCurrency = (value: number | null) => {
    if (value === null || value === undefined) return "";
    return `${value.toLocaleString("id-ID")},00`;
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
        <div className="flex justify-center items-center space-x-1.5">
          {onView && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onView(item);
              }}
              className="p-1.5 bg-[#00c0ef] hover:bg-[#00acd6] active:bg-[#0097bc] text-white rounded cursor-pointer transition-colors"
              title="Lihat detail"
            >
              <IoEye size={13} />
            </button>
          )}
          {onDelete && (item.masuk || item.posisiTransaksi === "Masuk") && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(item);
              }}
              className="p-1.5 bg-[#f4543c] hover:bg-[#dc4232] active:bg-[#c9302c] text-white rounded cursor-pointer transition-colors"
              title="Hapus deposit"
            >
              <IoTrash size={13} />
            </button>
          )}
        </div>
      ),
      className: "text-center",
      width: "85px",
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

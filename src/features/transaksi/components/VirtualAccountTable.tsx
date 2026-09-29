import React, { useState } from "react";
import ListTable, { type Column } from "../../../components/tables/ListTable";
import { IoEye, IoPrint, IoClose } from "react-icons/io5";

export interface VirtualAccountData {
  id: string;
  kodeVA: string;
  nim: string;
  nama: string;
  channel: string;
  tglJatuhTempo: string;
  nominal: number;
  bayar: number | null;
  tglBayar: string | null;
  status: "LUNAS" | "AKTIF" | "BATAL";
}

interface VirtualAccountTableProps {
  data: VirtualAccountData[];
  loading?: boolean;
  onView?: (item: VirtualAccountData) => void;
  onPrint?: (item: VirtualAccountData) => void;
  onCancel?: (item: VirtualAccountData) => void;
  onSelectionChange?: (selectedItems: VirtualAccountData[]) => void;
}

const VirtualAccountTable: React.FC<VirtualAccountTableProps> = ({ data, loading = false, onView, onPrint, onCancel, onSelectionChange }) => {
  const [selectedItems, setSelectedItems] = useState<VirtualAccountData[]>([]);

  const handleSelectionChange = (items: VirtualAccountData[]) => {
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

  const renderStatus = (status: string) => {
    switch (status) {
      case "LUNAS":
        return <span className="py-1 px-2 bg-amber-500 text-white rounded text-xs">LUNAS</span>;
      case "AKTIF":
        return <span className="py-1 px-2 bg-green-500 text-white rounded text-xs">AKTIF</span>;
      case "BATAL":
        return <span className="py-1 px-2 bg-red-500 text-white rounded text-xs">BATAL</span>;
      default:
        return status;
    }
  };

  const columns: Column<VirtualAccountData>[] = [
    {
      key: "kodeVA",
      header: "Kode VA",
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
      render: (item) => <span className="font-medium text-blue-800">{item.nama}</span>,
    },
    {
      key: "channel",
      header: "Channel",
      sortable: true,
    },
    {
      key: "tglJatuhTempo",
      header: "Tgl. Jatuh Tempo",
      sortable: true,
      className: "text-center",
    },
    {
      key: "nominal",
      header: "Nominal",
      sortable: true,
      className: "text-right",
      render: (item) => formatCurrency(item.nominal),
    },
    {
      key: "bayar",
      header: "Bayar",
      sortable: true,
      className: "text-right",
      render: (item) => formatCurrency(item.bayar),
    },
    {
      key: "tglBayar",
      header: "Tgl. Bayar",
      sortable: true,
      className: "text-center",
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      className: "text-center",
      render: (item) => renderStatus(item.status),
    },
    {
      key: "actions",
      header: "Aksi",
      render: (item) => (
        <div className="flex justify-center space-x-1">
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

          {item.status === "AKTIF" && onPrint && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrint(item);
              }}
              className="p-1.5 bg-amber-500 text-white rounded hover:bg-amber-600"
              title="Cetak virtual account"
            >
              <IoPrint />
            </button>
          )}

          {item.status === "AKTIF" && onCancel && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCancel(item);
              }}
              className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600"
              title="Batalkan virtual account"
            >
              <IoClose />
            </button>
          )}
        </div>
      ),
      className: "text-center",
      width: "100px",
    },
  ];

  return (
    <ListTable
      data={data}
      columns={columns}
      rowKey={(item) => item.id}
      initialSortColumn="kodeVA"
      initialSortDirection="asc"
      pageSize={10}
      pageSizeOptions={[10, 25, 50, 100]}
      selectable={true}
      onSelectionChange={handleSelectionChange}
      className="w-full text-xs"
      headerClassName="text-xs"
      loading={loading}
      emptyMessage="Tidak ada data virtual account"
    />
  );
};

export default VirtualAccountTable;

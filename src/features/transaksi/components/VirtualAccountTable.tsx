import React, { useState } from "react";
import ListTable, { type Column } from "../../../components/tables/ListTable";
import { IoEye, IoClose } from "react-icons/io5";
import { IoMdRefresh } from "react-icons/io";
import { type VirtualAccountData } from "../services/transaksi.api";

export type { VirtualAccountData };

interface VirtualAccountTableProps {
  data: VirtualAccountData[];
  loading?: boolean;
  onView?: (item: VirtualAccountData) => void;
  onRefreshItem?: (item: VirtualAccountData) => void;
  onCancel?: (item: VirtualAccountData) => void;
  onSelectionChange?: (selectedItems: VirtualAccountData[]) => void;
}

const VirtualAccountTable: React.FC<VirtualAccountTableProps> = ({
  data,
  loading = false,
  onView,
  onRefreshItem,
  onCancel,
  onSelectionChange,
}) => {
  const [selectedItems, setSelectedItems] = useState<VirtualAccountData[]>([]);

  const handleSelectionChange = (items: VirtualAccountData[]) => {
    setSelectedItems(items);
    if (onSelectionChange) {
      onSelectionChange(items);
    }
  };

  // Format number to currency
  const formatCurrency = (value: number | null) => {
    if (value === null || value === undefined || value === 0) return "";
    return `${value.toLocaleString("id-ID")},00`;
  };

  const renderStatus = (status: string) => {
    switch (status) {
      case "LUNAS":
        return (
          <span className="py-1 px-2.5 bg-[#f39c12] text-white rounded text-xs font-semibold">
            LUNAS
          </span>
        );
      case "AKTIF":
        return (
          <span className="py-1 px-2.5 bg-[#00a65a] text-white rounded text-xs font-semibold">
            AKTIF
          </span>
        );
      case "BATAL":
        return (
          <span className="py-1 px-2.5 bg-[#dd4b39] text-white rounded text-xs font-semibold">
            BATAL
          </span>
        );
      default:
        return status;
    }
  };

  const columns: Column<VirtualAccountData>[] = [
    {
      key: "kodeVA",
      header: "Kode VA",
      sortable: true,
      className: "font-mono text-xs",
    },
    {
      key: "nim",
      header: "NIM",
      sortable: true,
      className: "font-mono text-xs",
    },
    {
      key: "nama",
      header: "Nama",
      sortable: true,
      render: (item) => (
        <span className="font-medium text-blue-800 hover:underline cursor-pointer">
          {item.nama}
        </span>
      ),
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
      className: "text-center text-xs",
    },
    {
      key: "nominal",
      header: "Nominal",
      sortable: true,
      className: "text-right font-medium",
      render: (item) => formatCurrency(item.nominal),
    },
    {
      key: "bayar",
      header: "Bayar",
      sortable: true,
      className: "text-right font-medium",
      render: (item) => formatCurrency(item.bayar),
    },
    {
      key: "tglBayar",
      header: "Tgl. Bayar",
      sortable: true,
      className: "text-center text-xs",
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
        <div className="flex justify-center items-center space-x-1.5">
          {onView && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onView(item);
              }}
              className="p-1.5 bg-[#00c0ef] hover:bg-[#00acd6] text-white rounded cursor-pointer transition-colors"
              title="Lihat detail"
            >
              <IoEye size={13} />
            </button>
          )}

          {item.status === "AKTIF" && onRefreshItem && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRefreshItem(item);
              }}
              className="p-1.5 bg-[#f39c12] hover:bg-[#e08e0b] text-white rounded cursor-pointer transition-colors"
              title="Refresh status VA"
            >
              <IoMdRefresh size={13} />
            </button>
          )}

          {item.status === "AKTIF" && onCancel && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onCancel(item);
              }}
              className="p-1.5 bg-[#dd4b39] hover:bg-[#c9302c] text-white rounded cursor-pointer transition-colors"
              title="Batalkan virtual account"
            >
              <IoClose size={13} />
            </button>
          )}
        </div>
      ),
      className: "text-center",
      width: "110px",
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

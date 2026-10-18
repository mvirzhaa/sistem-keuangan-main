import React, { useState } from "react";
import ListTable, { type Column } from "../../../components/tables/ListTable";
import { IoEye, IoTrash, IoCheckmark, IoClose, IoWarning } from "react-icons/io5";
import type { TagihanItemData } from "../services/transaksi.api";

export type TagihanData = TagihanItemData;

interface TagihanTableProps {
  data: TagihanData[];
  loading?: boolean;
  onView?: (item: TagihanData) => void;
  onDelete?: (item: TagihanData) => void;
  onWarning?: (item: TagihanData) => void;
  onSelectionChange?: (selectedItems: TagihanData[]) => void;
}

const TagihanTable: React.FC<TagihanTableProps> = ({
  data,
  loading = false,
  onView,
  onDelete,
  onWarning,
  onSelectionChange,
}) => {
  const [selectedItems, setSelectedItems] = useState<TagihanData[]>([]);

  const handleSelectionChange = (items: TagihanData[]) => {
    setSelectedItems(items);
    if (onSelectionChange) {
      onSelectionChange(items);
    }
  };

  // Format number to currency
  const formatCurrency = (value: number | null | undefined) => {
    if (value === null || value === undefined || value === 0) return "0";
    return value.toLocaleString("id-ID");
  };

  const columns: Column<TagihanData>[] = [
    {
      key: "kodeTagihan",
      header: "Kode Tagihan",
      sortable: true,
      className: "font-medium text-gray-800",
    },
    {
      key: "nim",
      header: "NIM",
      sortable: true,
      className: "text-center",
    },
    {
      key: "nama",
      header: "Nama",
      sortable: true,
      className: "font-medium text-gray-800",
    },
    {
      key: "jenis",
      header: "Jenis",
      sortable: true,
      className: "text-center",
    },
    {
      key: "cicilan",
      header: "Cicilan",
      sortable: true,
      className: "text-center",
    },
    {
      key: "bulan",
      header: "Bulan",
      sortable: true,
      className: "text-center",
      render: (item) => item.bulan || "-",
    },
    {
      key: "nominal",
      header: "Nominal",
      sortable: true,
      className: "text-right",
      render: (item) => formatCurrency(item.nominal),
    },
    {
      key: "denda",
      header: "Denda",
      sortable: true,
      className: "text-right",
      render: (item) => formatCurrency(item.denda),
    },
    {
      key: "potongan",
      header: "Potongan",
      sortable: true,
      className: "text-right",
      render: (item) => formatCurrency(item.potongan),
    },
    {
      key: "bayar",
      header: "Bayar",
      sortable: true,
      className: "text-right",
      render: (item) => formatCurrency(item.bayar),
    },
    {
      key: "lunas",
      header: "Lunas",
      sortable: true,
      className: "text-center",
      render: (item) => {
        if (
          item.lunas ||
          item.statusPembayaran === "lunas" ||
          item.statusPembayaran === "potongan_penuh"
        ) {
          return (
            <div className="flex justify-center">
              <IoCheckmark className="text-green-500 font-bold" size={18} />
            </div>
          );
        }
        return (
          <div className="flex justify-center">
            <IoClose className="text-red-500" size={18} />
          </div>
        );
      },
    },
    {
      key: "tglAkhirDispensasi",
      header: "Tgl Akhir Dispensasi",
      sortable: true,
      className: "text-center",
      render: (item) => item.tglAkhirDispensasi || "-",
    },
    {
      key: "actions",
      header: "Aksi",
      render: (item) => (
        <div className="flex justify-center space-x-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onView && onView(item);
            }}
            className="p-1.5 bg-cyan-500 text-white rounded hover:bg-cyan-600 cursor-pointer transition-colors"
            title="Lihat detail"
          >
            <IoEye size={16} />
          </button>

          {item.statusPembayaran === "potongan_penuh" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onWarning && onWarning(item);
              }}
              className="p-1.5 bg-amber-500 text-white rounded hover:bg-amber-600 cursor-pointer transition-colors"
              title="Catatan potongan"
            >
              <IoWarning size={16} />
            </button>
          )}

          {(item.statusPembayaran === "belum_lunas" || !item.lunas) && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete && onDelete(item);
              }}
              className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer transition-colors"
              title="Hapus tagihan"
            >
              <IoTrash size={16} />
            </button>
          )}
        </div>
      ),
      className: "text-center",
      width: "100px",
    },
  ];

  return (
    <div className="w-full bg-white rounded-md overflow-hidden">
      <ListTable
        data={data}
        columns={columns}
        rowKey={(item) => item.id}
        initialSortColumn="kodeTagihan"
        initialSortDirection="asc"
        pageSize={10}
        pageSizeOptions={[10, 25, 50, 100]}
        selectable={true}
        onSelectionChange={handleSelectionChange}
        className="w-full text-xs bg-white"
        headerClassName="text-xs"
        loading={loading}
        emptyMessage="Tidak ada data tagihan"
      />
    </div>
  );
};

export default TagihanTable;

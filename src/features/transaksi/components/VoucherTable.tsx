import React, { useState } from "react";
import ListTable, { type Column } from "../../../components/tables/ListTable";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { type VoucherData } from "../services/transaksi.api";

export type { VoucherData };

interface VoucherTableProps {
  data: VoucherData[];
  loading?: boolean;
  onEdit?: (item: VoucherData, newValue: number) => void;
  onSelectionChange?: (selectedItems: VoucherData[]) => void;
}

const VoucherTable: React.FC<VoucherTableProps> = ({
  data,
  loading = false,
  onEdit,
  onSelectionChange,
}) => {
  const [selectedItems, setSelectedItems] = useState<VoucherData[]>([]);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState<string>("");

  const handleSelectionChange = (items: VoucherData[]) => {
    setSelectedItems(items);
    if (onSelectionChange) {
      onSelectionChange(items);
    }
  };

  // Format number to currency
  const formatCurrency = (value: number) => {
    return value.toLocaleString("id-ID");
  };

  const handleEditClick = (item: VoucherData) => {
    setEditingItemId(item.id);
    setEditingValue(String(item.nominal));
  };

  const handleInputChange = (value: string) => {
    // Only allow numbers and separators
    const cleanValue = value.replace(/[^\d]/g, "");
    setEditingValue(cleanValue);
  };

  const handleSaveEdit = (item: VoucherData) => {
    const numericValue = parseFloat(editingValue);

    if (!isNaN(numericValue) && onEdit) {
      onEdit(item, numericValue);
    }

    setEditingItemId(null);
    setEditingValue("");
  };

  const handleCancelEdit = () => {
    setEditingItemId(null);
    setEditingValue("");
  };

  const columns: Column<VoucherData>[] = [
    {
      key: "no",
      header: "No.",
      className: "text-center",
      width: "60px",
      render: (item, index) => item.no || index + 1,
    },
    {
      key: "idPendaftar",
      header: "ID Pendaftar",
      sortable: true,
      className: "font-mono text-xs text-gray-800",
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
      key: "voucher",
      header: "Voucher",
      sortable: true,
      className: "text-xs text-gray-800",
    },
    {
      key: "periode",
      header: "Periode",
      sortable: true,
      className: "text-center text-xs text-gray-800",
    },
    {
      key: "nominal",
      header: "Nominal",
      sortable: true,
      className: "text-right text-xs text-gray-800 font-medium",
      render: (item) => {
        if (editingItemId === item.id) {
          return (
            <div
              className="flex justify-start items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="text"
                value={editingValue}
                onChange={(e) => handleInputChange(e.target.value)}
                autoFocus
                className="w-full max-w-[140px] px-3 py-1.5 text-left border-2 border-[#00c05b] rounded-lg text-sm text-gray-800 bg-white focus:outline-none shadow-xs font-normal"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSaveEdit(item);
                  } else if (e.key === "Escape") {
                    handleCancelEdit();
                  }
                }}
              />
            </div>
          );
        }
        return formatCurrency(item.nominal);
      },
    },
    {
      key: "digunakan",
      header: "Digunakan",
      sortable: true,
      className: "text-right text-xs text-gray-800 font-medium",
      render: (item) => formatCurrency(item.digunakan),
    },
    {
      key: "actions",
      header: "Aksi",
      className: "text-center",
      width: "100px",
      render: (item) => {
        if (editingItemId === item.id) {
          return (
            <div
              className="flex justify-center items-center space-x-1.5"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSaveEdit(item);
                }}
                className="w-8 h-8 flex items-center justify-center bg-[#00c05b] hover:bg-[#00a64e] text-white rounded-lg cursor-pointer transition-colors shadow-xs"
                title="Simpan perubahan"
              >
                <IoMdCheckmark size={18} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCancelEdit();
                }}
                className="w-8 h-8 flex items-center justify-center bg-[#ff3b30] hover:bg-[#e03126] text-white rounded-lg cursor-pointer transition-colors shadow-xs"
                title="Batalkan perubahan"
              >
                <IoMdClose size={18} />
              </button>
            </div>
          );
        }

        return (
          <div className="flex justify-center items-center">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleEditClick(item);
              }}
              className="w-8 h-8 flex items-center justify-center bg-[#f39c12] hover:bg-[#e08e0b] text-white rounded-lg cursor-pointer transition-colors shadow-xs"
              title="Ubah nominal"
            >
              <MdEdit size={16} />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <ListTable
      data={data}
      columns={columns}
      rowKey={(item) => item.id}
      initialSortColumn="no"
      initialSortDirection="asc"
      pageSize={10}
      pageSizeOptions={[10, 25, 50, 100]}
      selectable={true}
      onSelectionChange={handleSelectionChange}
      className="w-full text-xs"
      headerClassName="text-xs bg-[#0c4a6e] text-white"
      loading={loading}
      emptyMessage="Tidak ada data voucher"
    />
  );
};

export default VoucherTable;

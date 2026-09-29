import React, { useState } from "react";
import ListTable, { type Column } from "../../../components/tables/ListTable";
import { IoMdCheckmark, IoMdClose, IoMdPrint } from "react-icons/io";
import TextField from "../../../components/inputs/TextField";
import { MdEdit } from "react-icons/md";

export interface VoucherData {
  id: string;
  no: number;
  idPendaftar: string;
  nama: string;
  voucher: string;
  periode: string;
  nominal: number;
  digunakan: number;
}

interface VoucherTableProps {
  data: VoucherData[];
  loading?: boolean;
  onPrint?: (item: VoucherData) => void;
  onEdit?: (item: VoucherData, newValue: number) => void;
  onSelectionChange?: (selectedItems: VoucherData[]) => void;
}

const VoucherTable: React.FC<VoucherTableProps> = ({ data, loading = false, onPrint, onEdit, onSelectionChange }) => {
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
    const cleanValue = value.replace(/[^\d.,]/g, "");
    setEditingValue(cleanValue);
  };

  const handleSaveEdit = (item: VoucherData) => {
    // Convert string to number, handling both comma and dot as decimal separators
    const numericValue = parseFloat(editingValue.replace(/\./g, "").replace(/,/g, "."));

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
    },
    {
      key: "idPendaftar",
      header: "ID Pendaftar",
      sortable: true,
    },
    {
      key: "nama",
      header: "Nama",
      sortable: true,
      render: (item) => <span className="font-medium text-blue-800">{item.nama}</span>,
    },
    {
      key: "voucher",
      header: "Voucher",
      sortable: true,
    },
    {
      key: "periode",
      header: "Periode",
      sortable: true,
      className: "text-center",
    },
    {
      key: "nominal",
      header: "Nominal",
      sortable: true,
      className: "text-right",
      render: (item) => {
        if (editingItemId === item.id) {
          return (
            <div className="flex">
              <TextField
                value={editingValue}
                onChange={(e) => handleInputChange(e)}
                className="w-full text-right"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSaveEdit(item);
                  } else if (e.key === "Escape") {
                    handleCancelEdit();
                  }
                }}
                onBlur={() => handleSaveEdit(item)}
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
      className: "text-right",
      render: (item) => formatCurrency(item.digunakan),
    },
    {
      key: "actions",
      header: "Aksi",
      render: (item) => {
        // Show different buttons when editing
        if (editingItemId === item.id) {
          return (
            <div className="flex justify-center space-x-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSaveEdit(item);
                }}
                className="p-1.5 bg-green-500 text-white rounded hover:bg-green-600"
                title="Simpan perubahan"
              >
                <IoMdCheckmark size={16} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCancelEdit();
                }}
                className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600"
                title="Batalkan perubahan"
              >
                <IoMdClose size={16} />
              </button>
            </div>
          );
        }

        // Regular buttons when not editing
        return (
          <div className="flex justify-center space-x-1">
            {onPrint && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPrint(item);
                }}
                className="p-1.5 bg-green-500 text-white rounded hover:bg-green-600"
                title="Cetak voucher"
              >
                <IoMdPrint size={16} />
              </button>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEditClick(item);
              }}
              className="p-1.5 bg-amber-500 text-white rounded hover:bg-amber-600"
              title="Ubah nominal"
            >
              <MdEdit size={16} />
            </button>
          </div>
        );
      },
      className: "text-center",
      width: "90px",
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
      headerClassName="text-xs"
      loading={loading}
      emptyMessage="Tidak ada data voucher"
    />
  );
};

export default VoucherTable;

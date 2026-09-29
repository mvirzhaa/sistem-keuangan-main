import React, { useState } from "react";
import ListTable, { type Column } from "../../../components/tables/ListTable";
import { IoEye, IoTrash, IoCheckmark, IoClose, IoWarning } from "react-icons/io5";

export interface TagihanData {
  id: string;
  kodeTagihan: string;
  nim: string;
  nama: string;
  jenis: string;
  cicilan: number;
  bulan: string;
  nominal: number;
  denda: number;
  potongan: number;
  bayar: number;
  lunas: boolean;
  tglAkhirDispensasi: string;
  statusPembayaran: "lunas" | "belum_lunas" | "potongan_penuh";
}

interface TagihanTableProps {
  data: TagihanData[];
  loading?: boolean;
  onView?: (item: TagihanData) => void;
  onDelete?: (item: TagihanData) => void;
  onWarning?: (item: TagihanData) => void;
  onSelectionChange?: (selectedItems: TagihanData[]) => void;
}

const TagihanTable: React.FC<TagihanTableProps> = ({ data, loading = false, onView, onDelete, onWarning, onSelectionChange }) => {
  const [selectedItems, setSelectedItems] = useState<TagihanData[]>([]);

  const handleSelectionChange = (items: TagihanData[]) => {
    setSelectedItems(items);
    if (onSelectionChange) {
      onSelectionChange(items);
    }
  };

  // Format number to currency
  const formatCurrency = (value: number | null) => {
    if (value === null || value === 0) return "0";
    return value.toLocaleString("id-ID");
  };

  const columns: Column<TagihanData>[] = [
    {
      key: "kodeTagihan",
      header: "Kode Tagihan",
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
        if (item.statusPembayaran === "lunas" || item.statusPembayaran === "potongan_penuh") {
          return (
            <div className="flex justify-center">
              <IoCheckmark className="text-green-500" size={18} />
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
            className="p-1.5 bg-cyan-500 text-white rounded hover:bg-cyan-600"
            title="Lihat detail"
          >
            <IoEye />
          </button>

          {item.statusPembayaran === "potongan_penuh" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onWarning && onWarning(item);
              }}
              className="p-1.5 bg-amber-500 text-white rounded hover:bg-amber-600"
              title="Catatan potongan"
            >
              <IoWarning />
            </button>
          )}

          {item.statusPembayaran === "belum_lunas" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete && onDelete(item);
              }}
              className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600"
              title="Hapus tagihan"
            >
              <IoTrash />
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
      initialSortColumn="kodeTagihan"
      initialSortDirection="asc"
      pageSize={10}
      pageSizeOptions={[10, 25, 50, 100]}
      selectable={true}
      onSelectionChange={handleSelectionChange}
      className="w-full text-xs"
      headerClassName="text-xs"
      loading={loading}
      emptyMessage="Tidak ada data tagihan"
    />
  );
};

export default TagihanTable;

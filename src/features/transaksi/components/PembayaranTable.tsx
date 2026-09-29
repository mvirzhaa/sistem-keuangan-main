import React, { useState } from "react";
import ListTable, { type Column } from "../../../components/tables/ListTable";
import { IoEye, IoPrintOutline, IoCheckmark, IoClose } from "react-icons/io5";

export interface PembayaranData {
  id: string;
  kodePembayaran: string;
  nim: string;
  nama: string;
  periode: string;
  metodePembayaran: string;
  channel: string;
  online: boolean;
  tanggal: string;
  nominal: number;
  batal: boolean;
}

interface PembayaranTableProps {
  data: PembayaranData[];
  loading?: boolean;
  onView?: (item: PembayaranData) => void;
  onPrint?: (item: PembayaranData) => void;
  onSelectionChange?: (selectedItems: PembayaranData[]) => void;
}

const PembayaranTable: React.FC<PembayaranTableProps> = ({ data, loading = false, onView, onPrint, onSelectionChange }) => {
  const [selectedItems, setSelectedItems] = useState<PembayaranData[]>([]);

  const handleSelectionChange = (items: PembayaranData[]) => {
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

  const columns: Column<PembayaranData>[] = [
    {
      key: "kodePembayaran",
      header: "Kode Pembayaran",
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
      key: "online",
      header: "Online?",
      sortable: true,
      className: "text-center",
      render: (item) => <div className="flex justify-center">{item.online ? <IoCheckmark className="text-green-500" size={18} /> : <IoClose className="text-red-500" size={18} />}</div>,
    },
    {
      key: "tanggal",
      header: "Tanggal",
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
      key: "batal",
      header: "Batal?",
      sortable: true,
      className: "text-center",
      render: (item) => <div className="flex justify-center">{item.batal ? <IoClose className="text-red-500" size={18} /> : ""}</div>,
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

          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrint && onPrint(item);
            }}
            className="p-1.5 bg-amber-500 text-white rounded hover:bg-amber-600"
            title="Cetak kuitansi"
          >
            <IoPrintOutline />
          </button>
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
      initialSortColumn="kodePembayaran"
      initialSortDirection="asc"
      pageSize={10}
      pageSizeOptions={[10, 25, 50, 100]}
      selectable={true}
      onSelectionChange={handleSelectionChange}
      className="w-full text-xs"
      headerClassName="text-xs"
      loading={loading}
      emptyMessage="Tidak ada data pembayaran"
    />
  );
};

export default PembayaranTable;

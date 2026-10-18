import React, { useState } from "react";
import ListTable, { type Column } from "../../../components/tables/ListTable";
import { IoEye, IoTrash } from "react-icons/io5";

import { type PotonganDanBeasiswaData } from "../services/transaksi.api";

export type { PotonganDanBeasiswaData };

interface PotonganDanBeasiswaTableProps {
  data: PotonganDanBeasiswaData[];
  loading?: boolean;
  onView?: (item: PotonganDanBeasiswaData) => void;
  onDelete?: (item: PotonganDanBeasiswaData) => void;
  onSelectionChange?: (selectedItems: PotonganDanBeasiswaData[]) => void;
}

const PotonganDanBeasiswaTable: React.FC<PotonganDanBeasiswaTableProps> = ({ data, loading = false, onView, onDelete, onSelectionChange }) => {
  const [selectedItems, setSelectedItems] = useState<PotonganDanBeasiswaData[]>([]);

  const handleSelectionChange = (items: PotonganDanBeasiswaData[]) => {
    setSelectedItems(items);
    if (onSelectionChange) {
      onSelectionChange(items);
    }
  };

  // Format number to currency
  const formatCurrency = (value: number) => {
    return value.toLocaleString("id-ID");
  };

  const columns: Column<PotonganDanBeasiswaData>[] = [
    {
      key: "no",
      header: "No",
      width: "60px",
      className: "text-center",
      render: (item, index) => item.no || index + 1,
    },
    {
      key: "nim",
      header: "NIM",
      sortable: true,
      width: "140px",
    },
    {
      key: "nama",
      header: "Nama",
      sortable: true,
      render: (item) => <span className="font-medium text-blue-800">{item.nama}</span>,
    },
    {
      key: "angkatan",
      header: "Angkatan",
      sortable: true,
      width: "100px",
      className: "text-center",
    },
    {
      key: "programStudi",
      header: "Program Studi",
      sortable: true,
    },
    {
      key: "sumber",
      header: "Sumber",
      sortable: true,
    },
    {
      key: "beasiswa",
      header: "Beasiswa",
      sortable: true,
    },
    {
      key: "periode",
      header: "Periode",
      sortable: true,
      width: "120px",
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
      key: "digunakan",
      header: "Digunakan",
      sortable: true,
      className: "text-right",
      render: (item) => formatCurrency(item.digunakan),
    },
    {
      key: "actions",
      header: "Aksi",
      render: (item) => (
        <div className="flex justify-center space-x-1">
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
              <IoEye size={15} />
            </button>
          )}

          {onDelete && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(item);
              }}
              className="p-1.5 bg-[#dd4b39] hover:bg-[#c9302c] text-white rounded cursor-pointer transition-colors"
              title="Hapus data"
            >
              <IoTrash size={15} />
            </button>
          )}
        </div>
      ),
      className: "text-center",
      width: "80px",
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
      emptyMessage="Tidak ada data potongan dan beasiswa"
    />
  );
};

export default PotonganDanBeasiswaTable;

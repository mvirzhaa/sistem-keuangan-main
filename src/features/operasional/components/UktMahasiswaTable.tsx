import React, { useState } from "react";
import ListTable, { type Column } from "../../../components/tables/ListTable";
import { FaEdit } from "react-icons/fa";

interface UktMahasiswaData {
  id: string;
  nim: string;
  nama: string;
  programStudi: string;
  kelompokUkt: string;
  nominalUkt: number;
  valid: boolean;
}

interface UktMahasiswaTableProps {
  data: UktMahasiswaData[];
  loading?: boolean;
  onEdit?: (mahasiswa: UktMahasiswaData) => void;
  onSelectionChange?: (selectedItems: UktMahasiswaData[]) => void;
}

const UktMahasiswaTable: React.FC<UktMahasiswaTableProps> = ({ data, loading = false, onEdit, onSelectionChange }) => {
  const [selectedItems, setSelectedItems] = useState<UktMahasiswaData[]>([]);

  const handleSelectionChange = (items: UktMahasiswaData[]) => {
    setSelectedItems(items);
    if (onSelectionChange) {
      onSelectionChange(items);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const columns: Column<UktMahasiswaData>[] = [
    {
      key: "nim",
      header: "NIM",
      className: "text-center",
    },
    {
      key: "nama",
      header: "Nama Mahasiswa",
      sortable: true,
    },
    {
      key: "programStudi",
      header: "Program Studi",
    },
    {
      key: "kelompokUkt",
      header: "Kelompok UKT",
      className: "text-center",
    },
    {
      key: "nominalUkt",
      header: "Nominal UKT",
      render: (item) => formatCurrency(item.nominalUkt),
      className: "text-right",
    },
    {
      key: "valid",
      header: "Valid?",
      render: (item) => (item.valid ? <span className="text-green-600">✓</span> : <span className="text-red-500">✕</span>),
      className: "text-center",
    },
    {
      key: "actions",
      header: "Aksi",
      render: (item) => (
        <div className="flex justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit && onEdit(item);
            }}
            className="p-1 bg-amber-500 text-white rounded hover:bg-amber-600"
          >
            <FaEdit />
          </button>
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
      initialSortColumn="nama"
      pageSize={10}
      pageSizeOptions={[10, 25, 50, 100]}
      selectable={true}
      onSelectionChange={handleSelectionChange}
      className="w-full text-xs"
      headerClassName="text-sm"
      loading={loading}
      emptyMessage="Tidak ada data mahasiswa"
    />
  );
};

export default UktMahasiswaTable;

import React from "react";
import ListTable, { type Column } from "../../../components/tables/ListTable";
import { IoCheckmark, IoPencil, IoTrash } from "react-icons/io5";
import { IoMdCheckmark } from "react-icons/io";

interface TarifPotongan {
  id: string;
  nim: string;
  nama: string;
  potongan: string;
  periodeMulai: string;
  nominal: number;
  isActive: boolean;
}

interface TarifPotonganTableProps {
  data: TarifPotongan[];
  onEdit?: (potongan: TarifPotongan) => void;
  onDelete?: (potongan: TarifPotongan) => void;
  onSelectionChange?: (selectedItems: TarifPotongan[]) => void;
  loading?: boolean;
  className?: string;
}

const TarifPotonganTable: React.FC<TarifPotonganTableProps> = ({
  data = [],
  onEdit,
  onDelete,
  onSelectionChange,
  loading = false,
  className = "",
}) => {
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format mahasiswa info
  const formatMahasiswa = (nim: string, nama: string) => {
    return (
      <div>
        <span className="font-medium text-blue-800">{nim}</span> -{" "}
        <span>{nama}</span>
      </div>
    );
  };

  // Define columns
  const columns: Column<TarifPotongan>[] = [
    {
      key: "no",
      header: "No",
      className: "text-center",
      width: "50px",
      render: (_, index) => index + 1,
    },
    {
      key: "mahasiswa",
      header: "Mahasiswa",
      sortable: true,
      render: (item) => formatMahasiswa(item.nim, item.nama),
    },
    {
      key: "potongan",
      header: "Potongan",
      sortable: true,
    },
    {
      key: "periodeMulai",
      header: "Periode Mulai",
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
      key: "isActive",
      header: "Aktif?",
      sortable: true,
      className: "text-center",
      render: (item) =>
        item.isActive ? (
          <IoMdCheckmark className="text-green-400 text-xl w-full" />
        ) : null,
    },
    {
      key: "actions",
      header: "Aksi",
      className: "text-center",
      width: "120px",
      render: (item) => (
        <div className="flex justify-center space-x-1">
          {onEdit && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(item);
              }}
              className="p-1.5 bg-amber-500 text-white rounded hover:bg-amber-600"
              title="Edit Potongan"
            >
              <IoPencil size={16} />
            </button>
          )}
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(item);
              }}
              className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600"
              title="Hapus Potongan"
            >
              <IoTrash size={16} />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className={className}>
      <ListTable
        data={data}
        columns={columns}
        rowKey={(item) => item.id}
        selectable={true}
        onSelectionChange={onSelectionChange}
        pageSize={10}
        pageSizeOptions={[10, 25, 50, 100]}
        initialSortColumn="nim"
        initialSortDirection="asc"
        loading={loading}
        emptyMessage="Tidak ada data potongan"
        className="text-xs"
        headerClassName="text-xs"
      />
    </div>
  );
};

export default TarifPotonganTable;

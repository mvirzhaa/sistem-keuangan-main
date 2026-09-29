import React from "react";
import ListTable, { type Column } from "../../../components/tables/ListTable";
import { IoEye, IoTrash } from "react-icons/io5";

interface TarifFormulir {
  id: string;
  jenisAkun: string;
  jenisProgram: string;
  nominalTarif: number;
  tanggalAkhir: string;
}

interface TarifFormulirTableProps {
  data: TarifFormulir[];
  onDetail?: (tarif: TarifFormulir) => void;
  onDelete?: (tarif: TarifFormulir) => void;
  onSelectionChange?: (selectedItems: TarifFormulir[]) => void;
  loading?: boolean;
  className?: string;
}

const TarifFormulirTable: React.FC<TarifFormulirTableProps> = ({
  data = [],
  onDetail,
  onDelete,
  onSelectionChange,
  loading = false,
  className = "",
}) => {
  // Format currency
  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("id-ID");
  };

  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Define columns
  const columns: Column<TarifFormulir>[] = [
    {
      key: "jenisAkun",
      header: "Jenis Akun",
      sortable: true,
      className: "text-left",
    },
    {
      key: "jenisProgram",
      header: "Jenis Program",
      sortable: true,
      className: "text-left",
    },
    {
      key: "nominalTarif",
      header: "Nominal Tarif",
      sortable: true,
      className: "text-right",
      render: (item) => formatCurrency(item.nominalTarif),
    },
    {
      key: "tanggalAkhir",
      header: "Tanggal Akhir",
      sortable: true,
      className: "text-center",
      render: (item) => formatDate(item.tanggalAkhir),
    },
    {
      key: "actions",
      header: "Aksi",
      className: "text-center",
      render: (item) => (
        <div className="flex justify-center space-x-1">
          {onDetail && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDetail(item);
              }}
              className="p-1.5 bg-cyan-500 text-white rounded hover:bg-cyan-600"
              title="Detail tarif"
            >
              <IoEye size={16} />
            </button>
          )}
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(item);
              }}
              className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600"
              title="Hapus tarif"
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
        initialSortColumn="jenisAkun"
        initialSortDirection="asc"
        loading={loading}
        emptyMessage="Data kosong"
        className="text-xs"
      />
    </div>
  );
};

export default TarifFormulirTable;

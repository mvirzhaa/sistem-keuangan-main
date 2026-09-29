import React from "react";
import ListTable, { type Column } from "../../../components/tables/ListTable";
import { IoEye, IoTrash, IoPencil } from "react-icons/io5";

interface TarifUkt {
  id: string;
  periodeMasuk: string;
  gelombang: string;
  jalurPendaftaran: string;
  sistemKuliah: string;
  programStudi: string;
  kelompokUKT: string;
  nominalTarif: number;
  cicilan: number;
  kuota: number;
}

interface TarifUktTableProps {
  data: TarifUkt[];
  onDetail?: (tarif: TarifUkt) => void;
  onEdit?: (tarif: TarifUkt) => void;
  onDelete?: (tarif: TarifUkt) => void;
  onSelectionChange?: (selectedItems: TarifUkt[]) => void;
  loading?: boolean;
  className?: string;
}

const TarifUktTable: React.FC<TarifUktTableProps> = ({
  data = [],
  onDetail,
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

  // Define columns
  const columns: Column<TarifUkt>[] = [
    {
      key: "periodeMasuk",
      header: "Periode Masuk",
      sortable: true,
    },
    {
      key: "gelombang",
      header: "Gelombang",
      sortable: true,
    },
    {
      key: "jalurPendaftaran",
      header: "Jalur Pendaftaran",
      sortable: true,
    },
    {
      key: "sistemKuliah",
      header: "Sistem Kuliah",
      sortable: true,
    },
    {
      key: "programStudi",
      header: "Program Studi",
      sortable: true,
    },
    {
      key: "kelompokUKT",
      header: "Kelompok UKT",
      sortable: true,
      className: "text-center",
    },
    {
      key: "nominalTarif",
      header: "Nominal Tarif",
      sortable: true,
      className: "text-right",
      render: (item) => formatCurrency(item.nominalTarif),
    },
    {
      key: "cicilan",
      header: "Cicilan",
      sortable: true,
      className: "text-center",
    },
    {
      key: "kuota",
      header: "Kuota",
      sortable: true,
      className: "text-center",
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
              title="Detail UKT"
            >
              <IoEye size={16} />
            </button>
          )}
          {onEdit && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(item);
              }}
              className="p-1.5 bg-amber-500 text-white rounded hover:bg-amber-600"
              title="Edit UKT"
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
              title="Hapus UKT"
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
        initialSortColumn="periodeMasuk"
        initialSortDirection="asc"
        loading={loading}
        emptyMessage="Data kosong"
        className="text-xs"
        headerClassName="text-xs"
      />
    </div>
  );
};

export default TarifUktTable;

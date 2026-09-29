import React from "react";
import ListTable, { type Column } from "../../../components/tables/ListTable";
import { BiBullseye, BiDetail, BiPencil } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { IoEye, IoTrash } from "react-icons/io5";

interface TarifTagihan {
  id: string;
  periodeMasuk: string;
  gelombang: string;
  jalurPendaftaran: string;
  sistemKuliah: string;
  programStudi: string;
  jenisAkun: string;
  nominalTarif: number;
  cicilan: string;
}

interface TarifTagihanTableProps {
  data: TarifTagihan[];
  onDetail?: (tarif: TarifTagihan) => void;
  onDelete?: (tarif: TarifTagihan) => void;
  onSelectionChange?: (selectedItems: TarifTagihan[]) => void;
  loading?: boolean;
  className?: string;
}

const TarifTagihanTable: React.FC<TarifTagihanTableProps> = ({ data, onDetail: onDetail, onDelete, onSelectionChange, loading = false, className = "" }) => {
  // Format currency
  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("id-ID");
  };

  // Define columns
  const columns: Column<TarifTagihan>[] = [
    {
      key: "periodeMasuk",
      header: "Periode Masuk",
      sortable: true,
      className: "text-left",
    },
    {
      key: "gelombang",
      header: "Gelombang",
      sortable: true,
      className: "text-left",
    },
    {
      key: "jalurPendaftaran",
      header: "Jalur Pendaftaran",
      sortable: true,
      className: "text-left",
    },
    {
      key: "sistemKuliah",
      header: "Sistem Kuliah",
      sortable: true,
      className: "text-left",
    },
    {
      key: "programStudi",
      header: "Program Studi",
      sortable: true,
      className: "text-left",
    },
    {
      key: "jenisAkun",
      header: "Jenis Akun",
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
      key: "cicilan",
      header: "Cicilan",
      sortable: true,
      className: "text-left",
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
              title="Edit tarif"
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
        initialSortColumn="periodeMasuk"
        initialSortDirection="desc"
        loading={loading}
        emptyMessage="Tidak ada data tarif tagihan"
        className="text-xs"
      />
    </div>
  );
};

export default TarifTagihanTable;

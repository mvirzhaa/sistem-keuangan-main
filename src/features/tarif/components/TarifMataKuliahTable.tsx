import React from "react";
import ListTable, { type Column } from "../../../components/tables/ListTable";

interface MataKuliah {
  id: string;
  no: number;
  kode: string;
  nama: string;
  jenis: string;
  sks: number;
  semester: number;
  wajib: boolean;
  paket: boolean;
  nominalTarif: number;
}

interface TarifMataKuliahTableProps {
  data: MataKuliah[];
  loading?: boolean;
  onRowClick?: (item: MataKuliah) => void;
  onSelectionChange?: (selectedItems: MataKuliah[]) => void;
  className?: string;
}

const TarifMataKuliahTable: React.FC<TarifMataKuliahTableProps> = ({
  data = [],
  loading = false,
  onRowClick,
  onSelectionChange,
  className = "",
}) => {
  const columns: Column<MataKuliah>[] = [
    {
      key: "no",
      header: "No.",
      className: "text-center",
      width: "60px",
    },
    {
      key: "kode",
      header: "Kode",
      sortable: true,
      className: "text-center",
      width: "120px",
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
      width: "120px",
    },
    {
      key: "sks",
      header: "SKS",
      sortable: true,
      className: "text-center",
      width: "80px",
      render: (item) => item.sks,
    },
    {
      key: "semester",
      header: "Sem.",
      sortable: true,
      className: "text-center",
      width: "80px",
    },
    {
      key: "wajib",
      header: "Wajib?",
      sortable: true,
      className: "text-center",
      width: "80px",
      render: (item) => (item.wajib ? "Ya" : "Tidak"),
    },
    {
      key: "paket",
      header: "Paket?",
      sortable: true,
      className: "text-center",
      width: "80px",
      render: (item) => (item.paket ? "Ya" : "Tidak"),
    },
    {
      key: "nominalTarif",
      header: "Nominal Tarif",
      sortable: true,
      className: "text-right",
      width: "150px",
      render: (item) => item.nominalTarif,
    },
  ];

  return (
    <ListTable
      data={data}
      columns={columns}
      rowKey={(item) => item.id}
      initialSortColumn="kode"
      initialSortDirection="asc"
      onRowClick={onRowClick}
      selectable
      onSelectionChange={onSelectionChange}
      className={`text-xs ${className}`}
      headerClassName="text-xs"
      emptyMessage="Data kosong"
      loading={loading}
    />
  );
};

export default TarifMataKuliahTable;

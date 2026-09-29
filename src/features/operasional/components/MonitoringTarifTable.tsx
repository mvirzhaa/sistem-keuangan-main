import React, { useState } from "react";
import ListTable, { type Column } from "../../../components/tables/ListTable";
import { IoEye } from "react-icons/io5";

interface MonitoringTarifData {
  id: string;
  unit: string;
  periode: string;
  jalurPendaftaran: string;
  sistemKuliah: string;
  gelombang: string;
  totalAkun: number;
  sudahDiatur: number;
  belumDiatur: number;
}

interface MonitoringTarifTableProps {
  data: MonitoringTarifData[];
  loading?: boolean;
  onView?: (item: MonitoringTarifData) => void;
  onSelectionChange?: (selectedItems: MonitoringTarifData[]) => void;
}

const MonitoringTarifTable: React.FC<MonitoringTarifTableProps> = ({ data, loading = false, onView, onSelectionChange }) => {
  const [selectedItems, setSelectedItems] = useState<MonitoringTarifData[]>([]);

  const handleSelectionChange = (items: MonitoringTarifData[]) => {
    setSelectedItems(items);
    if (onSelectionChange) {
      onSelectionChange(items);
    }
  };

  const columns: Column<MonitoringTarifData>[] = [
    {
      key: "unit",
      header: "Unit",
      sortable: true,
    },
    {
      key: "periode",
      header: "Periode",
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
      key: "gelombang",
      header: "Gelombang",
      sortable: true,
    },
    {
      key: "totalAkun",
      header: "Total Akun",
      className: "text-right",
      sortable: true,
    },
    {
      key: "sudahDiatur",
      header: "Sudah Diatur",
      className: "text-right",
      sortable: true,
    },
    {
      key: "belumDiatur",
      header: "Belum Diatur",
      className: "text-right",
      sortable: true,
    },
    {
      key: "actions",
      header: "Aksi",
      render: (item) => (
        <div className="flex justify-center">
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
        </div>
      ),
      className: "text-center",
      width: "70px",
    },
  ];

  return (
    <ListTable
      data={data}
      columns={columns}
      rowKey={(item) => item.id}
      initialSortColumn="unit"
      initialSortDirection="asc"
      pageSize={10}
      pageSizeOptions={[10, 25, 50, 100]}
      selectable={false}
      onSelectionChange={handleSelectionChange}
      className="w-full text-xs"
      headerClassName="text-xs"
      loading={loading}
      emptyMessage="Tidak ada data monitoring tarif"
    />
  );
};

export default MonitoringTarifTable;

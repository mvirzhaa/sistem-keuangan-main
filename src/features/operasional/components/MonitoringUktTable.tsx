import React, { useState } from "react";
import ListTable, { type Column } from "../../../components/tables/ListTable";
import { IoEye } from "react-icons/io5";

interface MonitoringUktData {
  id: string;
  programStudi: string;
  kelompokUkt: string;
  kuota: number;
  penerima: number;
}

interface MonitoringUktTableProps {
  data: MonitoringUktData[];
  loading?: boolean;
  onView?: (item: MonitoringUktData) => void;
  onSelectionChange?: (selectedItems: MonitoringUktData[]) => void;
}

const MonitoringUktTable: React.FC<MonitoringUktTableProps> = ({ data, loading = false, onView, onSelectionChange }) => {
  const [selectedItems, setSelectedItems] = useState<MonitoringUktData[]>([]);

  const handleSelectionChange = (items: MonitoringUktData[]) => {
    setSelectedItems(items);
    if (onSelectionChange) {
      onSelectionChange(items);
    }
  };

  const columns: Column<MonitoringUktData>[] = [
    {
      key: "programStudi",
      header: "Program Studi",
      sortable: true,
    },
    {
      key: "kelompokUkt",
      header: "Kelompok UKT",
      sortable: true,
    },
    {
      key: "kuota",
      header: "Kuota",
      sortable: true,
      className: "text-center",
    },
    {
      key: "penerima",
      header: "Penerima",
      sortable: true,
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
      initialSortColumn="programStudi"
      initialSortDirection="asc"
      pageSize={10}
      pageSizeOptions={[10, 25, 50, 100]}
      selectable={false}
      onSelectionChange={handleSelectionChange}
      className="w-full text-xs"
      headerClassName="text-xs"
      loading={loading}
      emptyMessage="Data kosong"
    />
  );
};

export default MonitoringUktTable;

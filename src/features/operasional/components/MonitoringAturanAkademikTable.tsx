import React, { useState } from "react";
import ListTable, { type Column } from "../../../components/tables/ListTable";
import { IoEye } from "react-icons/io5";

interface MonitoringAturanAkademikData {
  id: string;
  kodeProdi: string;
  namaProgram: string;
  angkatan: string;
  jumlahMahasiswa: number;
  jumlahMahasiswaAktif: number;
  jumlahMahasiswaTercekal: number;
}

interface MonitoringAturanAkademikTableProps {
  data: MonitoringAturanAkademikData[];
  loading?: boolean;
  onView?: (item: MonitoringAturanAkademikData) => void;
  onSelectionChange?: (selectedItems: MonitoringAturanAkademikData[]) => void;
}

const MonitoringAturanAkademikTable: React.FC<MonitoringAturanAkademikTableProps> = ({ data, loading = false, onView, onSelectionChange }) => {
  const [selectedItems, setSelectedItems] = useState<MonitoringAturanAkademikData[]>([]);

  const handleSelectionChange = (items: MonitoringAturanAkademikData[]) => {
    setSelectedItems(items);
    if (onSelectionChange) {
      onSelectionChange(items);
    }
  };

  const columns: Column<MonitoringAturanAkademikData>[] = [
    {
      key: "kodeProdi",
      header: "Kode Prodi",
      sortable: true,
      className: "text-center",
    },
    {
      key: "namaProgram",
      header: "Nama Program Studi",
      sortable: true,
    },
    {
      key: "angkatan",
      header: "Angkatan",
      sortable: true,
      className: "text-center",
    },
    {
      key: "jumlahMahasiswa",
      header: "Jumlah Mahasiswa",
      sortable: true,
      className: "text-center",
    },
    {
      key: "jumlahMahasiswaAktif",
      header: "Jumlah Mhs. Aktif",
      sortable: true,
      className: "text-center",
    },
    {
      key: "jumlahMahasiswaTercekal",
      header: "Jumlah Mahasiswa Tercekal",
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
    <div className="flex flex-col">
      <ListTable
        data={data}
        columns={columns}
        rowKey={(item) => item.id}
        initialSortColumn="kodeProdi"
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
    </div>
  );
};

export default MonitoringAturanAkademikTable;

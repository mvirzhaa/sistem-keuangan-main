import React, { useState } from "react";
import ListTable, { type Column } from "../../../components/tables/ListTable";
import { IoEye } from "react-icons/io5";

interface MonitoringTagihanMahasiswaData {
  id: string;
  unit: string;
  jalurPendaftaran: string;
  sistemKuliah: string;
  gelombang: string;
  periodeMasuk: string;
  jumlahMahasiswa: number;
}

interface MonitoringTagihanMahasiswaTableProps {
  data: MonitoringTagihanMahasiswaData[];
  loading?: boolean;
  onView?: (item: MonitoringTagihanMahasiswaData) => void;
  onSelectionChange?: (selectedItems: MonitoringTagihanMahasiswaData[]) => void;
}

const MonitoringTagihanMahasiswaTable: React.FC<MonitoringTagihanMahasiswaTableProps> = ({ data, loading = false, onView, onSelectionChange }) => {
  const [selectedItems, setSelectedItems] = useState<MonitoringTagihanMahasiswaData[]>([]);

  const handleSelectionChange = (items: MonitoringTagihanMahasiswaData[]) => {
    setSelectedItems(items);
    if (onSelectionChange) {
      onSelectionChange(items);
    }
  };

  const columns: Column<MonitoringTagihanMahasiswaData>[] = [
    {
      key: "unit",
      header: "Unit",
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
      key: "periodeMasuk",
      header: "Periode Masuk",
      sortable: true,
    },
    {
      key: "jumlahMahasiswa",
      header: "Jumlah Mahasiswa",
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
    <div className="flex flex-col">
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
        emptyMessage="Tidak ada data monitoring tagihan mahasiswa"
      />

      {data.length > 0 && <div className="mt-2 p-3 bg-blue-50 text-blue-800 text-xs rounded">Hanya menampilkan info mahasiswa yang belum memiliki tagihan sesuai tarif yang sudah di atur</div>}
    </div>
  );
};

export default MonitoringTagihanMahasiswaTable;

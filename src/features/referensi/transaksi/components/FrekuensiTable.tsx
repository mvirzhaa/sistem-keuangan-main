import React from "react";
import ListTable, {
  type Column,
} from "../../../../components/tables/ListTable";

interface Frekuensi {
  kode: string;
  nama: string;
  jumlahHari: number | null;
}

const FrekuensiTable: React.FC = () => {
  // Data frekuensi transaksi
  const frekuensiData: Frekuensi[] = [
    { kode: "KK", nama: "Tiap Transaksi", jumlahHari: null },
    { kode: "KL", nama: "Kelulusan", jumlahHari: null },
    { kode: "KS", nama: "Kuliah SKS", jumlahHari: null },
    { kode: "MC", nama: "Mahasiswa Cuti", jumlahHari: null },
    { kode: "PM", nama: "Pendaftaran", jumlahHari: null },
    { kode: "SL", nama: "Seleksi Pendaftaran", jumlahHari: null },
    { kode: "WB", nama: "Bulanan", jumlahHari: 30 },
    { kode: "WH", nama: "Harian", jumlahHari: 1 },
    { kode: "WM", nama: "Mingguan", jumlahHari: 7 },
    { kode: "WS", nama: "Semester", jumlahHari: 180 },
    { kode: "WT", nama: "Tahunan", jumlahHari: 365 },
  ];

  const columns: Column<Frekuensi>[] = [
    {
      key: "kode",
      header: "Kode",
      width: "20%",
      className: "text-center py-2.5",
      headerClassName: "text-center",
      sortable: true,
      render: (item) => item.kode,
    },
    {
      key: "nama",
      header: "Nama",
      width: "50%",
      className: "text-left py-2.5 px-4",
      headerClassName: "text-center",
      sortable: true,
      render: (item) => item.nama,
    },
    {
      key: "jumlahHari",
      header: "Jumlah Hari",
      width: "30%",
      className: "text-center py-2.5",
      headerClassName: "text-center",
      sortable: true,
      render: (item) => (item.jumlahHari !== null ? item.jumlahHari : ""),
    },
  ];

  return (
    <div className="overflow-x-auto text-xs flex justify-center">
      <div className="w-full sm:w-4/5">
        <ListTable
          data={frekuensiData}
          columns={columns}
          rowKey={(item) => item.kode}
          headerClassName="text-xs text-white"
          rowClassName={(_item, index) =>
            index % 2 === 0 ? "bg-gray-50" : "bg-white"
          }
          showFooter={false}
          pageSize={50}
          emptyMessage="Tidak ada data frekuensi"
        />
      </div>
    </div>
  );
};

export default FrekuensiTable;

